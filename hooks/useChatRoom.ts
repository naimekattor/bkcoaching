"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

interface MessagePayload {
  message: string;
  sender_id: number;
  timestamp?: string;
}

export default function useChatRoom(
  targetUserId: number,
  onMessage: (msg: MessagePayload) => void
) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const {token} = useAuthStore(); 

  // 1️⃣ Get or create room
  useEffect(() => {
    if (!targetUserId || !token) return;

    async function createRoom() {
      try {
        const res = await fetch(
          "https://b436a0944022.ngrok-free.app/api/chat_service/get_or_create_room/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              target_user_id: targetUserId,
            }),
          }
        );

        const data = await res.json();
        setRoomId(data.room_id); // e.g. "325_339"
      } catch (error) {
        console.error("Room creation failed:", error);
      }
    }

    createRoom();
  }, [targetUserId, token]);

  // 2️⃣ Connect WebSocket when roomId becomes available
  useEffect(() => {
    if (!roomId || !token) return;

    const url = `ws://buzz-referral-med-dakota.trycloudflare.com/ws/chat/${roomId}/?token=${token}`;
    const ws = new WebSocket(url);

    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected to room:", roomId);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    ws.onclose = () => console.log("WebSocket closed");
    ws.onerror = (err) => console.error("WebSocket error", err);

    return () => ws.close();
  }, [roomId, token]);

  // 3️⃣ Send message
  const sendMessage = (text: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          message: text,
        })
      );
    }
  };

  return { roomId, sendMessage };
}
