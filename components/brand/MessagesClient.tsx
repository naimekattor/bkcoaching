"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import {
  Search,
  MoreHorizontal,
  Paperclip,
  Send,
  Bell,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";

// Define TypeScript interfaces for mock data
interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
  hasUnread: boolean;
}

interface ChatRequest {
  id: number;
  requester: string;
  email: string;
  message: string;
  warning: string;
  safetyTip: string;
}

interface Message {
  id: number;
  senderId: string | number;
  senderName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

// Mock data
const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Marketing",
    lastMessage: "Re: Collaboration Inquiry",
    avatar:
      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    isOnline: true,
    lastSeen: "Active 4m ago",
    hasUnread: false,
  },
  {
    id: 2,
    name: "Creator Admin",
    lastMessage: "Your profile is now live!",
    avatar:
      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    isOnline: false,
    lastSeen: "2h ago",
    hasUnread: false,
  },
  {
    id: 3,
    name: "Emily Business",
    lastMessage: "Follow up: Tech Gadget Review...",
    avatar:
      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    isOnline: false,
    lastSeen: "1d ago",
    hasUnread: false,
  },
  {
    id: 4,
    name: "David Creator",
    lastMessage: "Proposal for Fashion...",
    avatar:
      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    isOnline: true,
    lastSeen: "Active now",
    hasUnread: false,
  },
];

const mockChatRequest: ChatRequest = {
  id: 1,
  requester: "Market Meetup",
  email: "fashionistaBusiness@gmail.com",
  message: "wants to chat with you",
  warning:
    "Message from unknown or unexpected people could be spam or phishing attempts. Never share your account information or authorize sign-in requests over chat.",
  safetyTip: "To be safe, preview their messages.",
};

const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 1,
    senderName: "Sarah Marketing",
    content: "Lorem ipsum dolor sit amet consectetur.",
    timestamp: "2:30 PM",
    isOwn: false,
  },
  {
    id: 2,
    senderId: "current-user",
    senderName: "You",
    content:
      "ype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
    timestamp: "2:32 PM",
    isOwn: true,
  },
  {
    id: 3,
    senderId: 1,
    senderName: "Sarah Marketing",
    content: "Lorem ipsum dolor sit amet consectetur.",
    timestamp: "2:35 PM",
    isOwn: false,
  },
  {
    id: 4,
    senderId: "current-user",
    senderName: "You",
    content:
      "ype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
    timestamp: "2:37 PM",
    isOwn: true,
  },
];

export default function MessagesClient() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showChatRequest, setShowChatRequest] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { id } = params as { id: string }; // Explicitly type id as string

  useEffect(() => {
    const userId = searchParams.get("userId");
    const userName = searchParams.get("userName");
    const userImage = searchParams.get("userImage");

    if (userId) {
      let contact = mockContacts.find((c) => c.id === Number.parseInt(userId));

      if (!contact && userName) {
        contact = {
          id: Number.parseInt(userId),
          name: decodeURIComponent(userName),
          lastMessage: "Start a new conversation",
          avatar: userImage
            ? decodeURIComponent(userImage)
            : "/placeholder.svg",
          isOnline: true,
          lastSeen: "Active now",
          hasUnread: false,
        };
      }

      if (contact) {
        setSelectedContact(contact);
        setShowChatRequest(false);
      }
    }
  }, [searchParams]);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setShowChatRequest(false);
    setShowSidebar(false);
  };

  const handleAcceptRequest = () => {
    setShowChatRequest(false);
  };

  const handleRejectRequest = () => {
    setShowChatRequest(false);
    setSelectedContact(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        senderId: "current-user",
        senderName: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 flex relative">
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden animate-in fade-in duration-200"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Left Sidebar - Contacts */}
      <div
        className={`w-80 sm:w-72 bg-white border-r border-gray-200 flex flex-col absolute md:relative z-20 md:z-auto h-full transform transition-all duration-300 ease-in-out ${
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
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
                M
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 focus:bg-white transition-all duration-200 text-sm"
            />
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div
            onClick={() => {
              router.push("/brand-dashboard/message-request");
            }}
            className="cursor-pointer flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-sm">💬</span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-semibold text-blue-900">
                1 request
              </span>
              <p className="text-xs text-blue-600">Tap to view</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                selectedContact?.id === contact.id
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500"
                  : ""
              }`}
              onClick={() => handleContactSelect(contact)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 shadow-sm">
                    <Image
                      width={48}
                      height={48}
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate text-gray-900">
                      {contact.name}
                    </p>
                    <span className="text-xs text-gray-400">
                      {contact.lastSeen}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200">
            See more conversations...
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 shadow-sm">
                    <Image
                      width={48}
                      height={48}
                      src={selectedContact.avatar || "/placeholder.svg"}
                      alt={selectedContact.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 truncate">
                      {selectedContact.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          selectedContact.isOnline
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <p className="text-sm text-gray-500 truncate">
                        {selectedContact.lastSeen}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      router.push(
                        `/brand-dashboard/influencers/${id}/send-proposal`
                      );
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-semibold transition-all duration-200 cursor-pointer text-sm shadow-sm"
                  >
                    Hire
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {showChatRequest ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-md w-full text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
                    <div className="w-6 h-6 bg-blue-900 rounded-full -ml-2"></div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {mockChatRequest.requester}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    ({mockChatRequest.email}) {mockChatRequest.message}
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-sm text-gray-600">
                    <p className="mb-2">{mockChatRequest.warning}</p>
                    <p>{mockChatRequest.safetyTip}</p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleAcceptRequest}
                      className="px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-md font-medium transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={handleRejectRequest}
                      className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%] sm:max-w-xs lg:max-w-md">
                      {!message.isOwn && (
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex-shrink-0 shadow-sm">
                          <Image
                            width={32}
                            height={32}
                            src={selectedContact.avatar || "/placeholder.svg"}
                            alt={selectedContact.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 rounded-2xl shadow-sm ${
                          message.isOwn
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md"
                            : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                        }`}
                      >
                        <p className="text-sm break-words leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isOwn
                              ? "text-blue- personally want to see a version where the Suspense boundary is implemented directly in the MessagesClient component, rather than creating a separate server component. Can you provide that version with all type errors fixed, maintaining the same functionality and structure?100"
                              : "text-gray-400"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

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
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-gray-50 focus:bg-white transition-all duration-200"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:electronics-400 text-white rounded-full transition-all duration-200 flex-shrink-0 shadow-sm disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center text-gray-500 max-w-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Welcome to Messages
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Select a conversation from the sidebar to start messaging with
                your contacts
              </p>
              <button
                onClick={() => setShowSidebar(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm shadow-sm transition-all duration-200 md:hidden"
              >
                View Conversations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
