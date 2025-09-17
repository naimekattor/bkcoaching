import InfluencerMessagesClient from "@/components/influencer/MessagesClient";
import { Suspense } from "react";

export default function MessagesDashboard() {
  return (
    <Suspense fallback={<div>Loading messages...</div>}>
      <InfluencerMessagesClient />
    </Suspense>
  );
}
