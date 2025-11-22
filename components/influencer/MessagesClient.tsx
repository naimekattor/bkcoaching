"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  MoreHorizontal,
  Paperclip,
  Send,
  Bell,
  ArrowLeft,
  Loader,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { apiClient } from "@/lib/apiClient";

interface Room {
  room_id: string;
  other_user_id: string;
  last_message: string;
  timestamp: string;
  other_user_name?: string;
  other_user_avatar?: string;
}

interface HistoryMessage {
  id: number;
  sender_id: string;
  is_me: boolean;
  message: string;
  timestamp: string;
}

interface Message {
  id: number | string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export default function InfluencerMessagesClient() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);

  const { user } = useAuthStore();
  const currentUserId = user?.id;

  const router = useRouter();
  const searchParams = useSearchParams();
  const otherUserId = searchParams.get("id");

  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create or get room from URL parameter
  useEffect(() => {
    const createRoom = async () => {
      if (!otherUserId) {
        console.log("No otherUserId in URL");
        return;
      }

      try {
        console.log("📝 Creating room for user:", otherUserId);

        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("No access token");
          return;
        }

        const res = await apiClient("chat_service/get_or_create_room/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            target_user_id: otherUserId,
          }),
        });

        console.log("✅ Room creation response:", res);

        if (res?.data?.room_id) {
          const roomId = res.data.room_id;
          console.log("🔑 Room ID:", roomId);

          // Create full Room object
          const newRoom: Room = {
            room_id: roomId,
            other_user_id: otherUserId,
            last_message: res.data.last_message || "Start a conversation",
            timestamp: res.data.timestamp || new Date().toISOString(),
            other_user_name: res.data.other_user_name || `User ${otherUserId}`,
            other_user_avatar: res.data.other_user_avatar,
          };

          console.log("🎯 Setting selected room:", newRoom);
          setSelectedRoom(newRoom);
        } else {
          console.error("No room_id in response:", res);
        }
      } catch (err) {
        console.error("Error creating room:", err);
      }
    };

    createRoom();
  }, [otherUserId]);

  // Fetch rooms for sidebar
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await apiClient("chat_service/get_my_rooms/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data) {
          setRooms(response.data);
          console.log(response.data);
          
        }
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Load chat history when room changes
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!selectedRoom) return;

      setLoadingHistory(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await apiClient(
          `chat_service/get_room_history/${selectedRoom.room_id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data) {
          const formattedMessages: Message[] = response.data.map(
            (msg: HistoryMessage) => ({
              id: msg.id,
              senderId: msg.sender_id,
              senderName: msg.is_me ? "You" : selectedRoom.other_user_name || "User",
              content: msg.message,
              timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isOwn: msg.is_me,
            })
          );
          setMessages(formattedMessages);

          // Scroll to bottom
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      } finally {
        setLoadingHistory(false);
      }
    };

    loadChatHistory();
  }, [selectedRoom]);

  // Initialize WebSocket
  useEffect(() => {
    if (!selectedRoom || !currentUserId) {
      console.log("⏳ Waiting for room or currentUserId. Room:", selectedRoom, "UserId:", currentUserId);
      return;
    }

    let isMounted = true;

    const initiateChat = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("No access token found");
          alert("Login expired");
          router.push("/login");
          return;
        }

        console.log("✨ Initiating WebSocket connection for room:", selectedRoom.room_id);

        // Close any existing connection
        if (wsRef.current) {
          console.log("Closing existing WebSocket");
          wsRef.current.close();
          wsRef.current = null;
        }

        // Build WebSocket URL using existing room
        const wsUrl = `wss://buzz-referral-med-dakota.trycloudflare.com/ws/chat/${selectedRoom.room_id}/?token=${encodeURIComponent(
          token
        )}`;

        console.log("🔗 Connecting to WebSocket:", wsUrl);

        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        const userId = String(currentUserId);

        ws.onopen = () => {
          console.log("✅ WebSocket connected to room:", selectedRoom.room_id);
          if (isMounted) {
            // Trigger a re-render to enable send button
            setMessages(prev => prev);
          }
        };

        ws.onmessage = (event) => {
          if (!isMounted) return;

          try {
            const payload = JSON.parse(event.data);

            console.log("Message received:", {
              sender_id: payload.sender_id,
              current_user: userId,
              is_own: String(payload.sender_id) === userId,
            });

            // Only add messages from other users
            if (payload.message && String(payload.sender_id) !== userId) {
              setMessages((prev) => [
                ...prev,
                {
                  id: payload.id || Date.now(),
                  content: payload.message,
                  senderId: payload.sender_id,
                  isOwn: false,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  senderName: selectedRoom.other_user_name || "User",
                },
              ]);

              // Scroll to bottom
              setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }
          } catch (error) {
            console.error("Error processing message:", error);
          }
        };

        ws.onerror = (err) => {
          console.error("❌ WebSocket error:", err);
        };

        ws.onclose = () => {
          console.log("⚠️ WebSocket disconnected");
        };
      } catch (err) {
        console.error("Failed to initiate chat:", err);
      }
    };

    initiateChat();

    return () => {
      isMounted = false;
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [selectedRoom, currentUserId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn("Cannot send message:", {
        emptyMessage: !newMessage.trim(),
        noWebSocket: !wsRef.current,
        wsNotOpen: wsRef.current?.readyState !== WebSocket.OPEN,
      });
      return;
    }

    wsRef.current.send(
      JSON.stringify({
        type: "chat_message",
        message: newMessage,
      })
    );

    // Optimistic update
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content: newMessage,
        senderId: currentUserId,
        senderName: "You",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      },
    ]);

    setNewMessage("");

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setShowSidebar(false);
  };

  const filteredRooms = rooms.filter((room) =>
    (room.other_user_name || room.other_user_id)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formatLastMessage = (msg: string, timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    return {
      message: msg.length > 50 ? msg.substring(0, 50) + "..." : msg,
      time: isToday
        ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : date.toLocaleDateString([], { month: "short", day: "numeric" }),
    };
  };

  return (
    <div className="h-screen bg-gray-50 flex relative">
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden animate-in fade-in duration-200"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Left Sidebar - Rooms */}
      <div
        className={`w-full sm:w-72 bg-white border-r border-gray-200 flex flex-col absolute md:relative z-20 md:z-auto h-full transform transition-all duration-300 ease-in-out ${
          showSidebar
            ? "translate-x-0"
            : "-translate-x-[1000px] md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(false)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-primary">Messages</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full"></span>
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-gray-50 focus:bg-white transition-all duration-200 text-sm"
            />
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div
            onClick={() => {
              router.push("/influencer-dashboard/message-request");
            }}
            className="cursor-pointer flex items-center gap-3 p-3 bg-primary/20 rounded-xl transition-all duration-200 hover:bg-primary/30"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm">💬</span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-semibold text-primary">
                1 request
              </span>
              <p className="text-xs text-primary">Tap to view</p>
            </div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            filteredRooms.map((room) => {
              const { message, time } = formatLastMessage(
                room.last_message,
                room.timestamp
              );

              return (
                <div
                  key={room.room_id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                    selectedRoom?.room_id === room.room_id
                      ? "border-l-4 border-l-primary bg-gray-50"
                      : ""
                  }`}
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                        {room.other_user_name?.[0] ||
                          room.other_user_id?.[0] ||
                          "?"}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm truncate text-gray-900">
                          {room.other_user_name || room.other_user_id}
                        </p>
                        <span className="text-xs text-gray-400 ml-2">
                          {time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(true)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                {selectedRoom?.other_user_name?.[0] ||
                  selectedRoom?.other_user_id?.[0] ||
                  "?"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 truncate">
                  {selectedRoom?.other_user_name || selectedRoom?.other_user_id}
                </p>
                <p className="text-sm text-gray-500">Active now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {loadingHistory ? (
            <div className="flex items-center justify-center h-full">
              <Loader className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-sm">No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-end gap-2 max-w-[85%] sm:max-w-xs lg:max-w-md">
                  {!message.isOwn && (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                      {selectedRoom?.other_user_name?.[0] ||
                        selectedRoom?.other_user_id?.[0] ||
                        "?"}
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      message.isOwn
                        ? "bg-gradient-to-r from-primary to-primary text-white rounded-br-md"
                        : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                    }`}
                  >
                    <p className="text-sm break-words leading-relaxed">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn
                          ? "text-blue-100"
                          : "text-gray-400"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 flex-shrink-0">
              <Paperclip className="h-5 w-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage()
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm bg-gray-50 focus:bg-white transition-all duration-200"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={
                !newMessage.trim() ||
                !wsRef.current ||
                wsRef.current.readyState !== WebSocket.OPEN
              }
              className="p-3 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white rounded-full transition-all duration-200 flex-shrink-0 shadow-sm disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}