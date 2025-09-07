import MessagesClient from "@/components/dashboard/MessagesClient";
import { Suspense } from "react";

export default function MessagesDashboard() {
  return (
    <Suspense fallback={<div>Loading messages...</div>}>
      <MessagesClient />
    </Suspense>
  );
}