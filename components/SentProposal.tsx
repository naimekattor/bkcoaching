import { apiClient } from "@/lib/apiClient";
import React, { useEffect, useState } from "react";
export interface Attachment {
  id: number;
  link: string;
}

export interface Proposal {
  id: number;
  owner_id: number;
  campaign_id: number;
  hired_influencer_id: number;
  start_date: string; // ISO date string
  end_date: string;   // ISO date string
  proposal_message: string;
  campaign_deliverables: string; // JSON string from backend
  attachments: Attachment[];
  is_accepted_by_influencer: boolean;
  is_rejected_by_influencer: boolean;
  is_completed_marked_by_brand: boolean;
  budget: number;
  rating: number;
  campaign:{
    campaign_name:string;
  }
}

export type ProposalStatus = "Accepted" | "Rejected" | "Pending";

export const getProposalStatus = (proposal: Proposal): ProposalStatus => {
  if (proposal.is_accepted_by_influencer) return "Accepted";
  if (proposal.is_rejected_by_influencer) return "Rejected";
  return "Pending";
};


const SentProposal = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await apiClient("campaign_service/proposals/", {
          method: "GET",
          auth: true,
        });

        // if apiClient already returns JSON
        setProposals(response || []);
      } catch (error) {
        console.error("Failed to fetch proposals", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []); 

  if (loading) {
    return <p>Loading proposals...</p>;
  }

  if (proposals.length === 0) {
    return <p className="bg-white shadow p-4">No proposals sent yet.</p>;
  }

  return (
    <div className="h-[400px] overflow-y-scroll bg-white shadow p-4">
      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className="flex justify-between items-center p-4 border rounded-md mb-3"
        >
          <div>
            <p className="font-medium">
              Campaign ID: {proposal.campaign_id}
            </p>
            <p className="">
              <span className="font-medium">Campaign Title : </span><span className="text-black">{proposal?.campaign?.campaign_name}</span> 
            </p>
            <p className="text-sm text-gray-600">
              Budget: ${proposal.budget}
            </p>
            <p className="text-sm text-gray-600">
              Message: {proposal.proposal_message}
            </p>
          </div>

          <span
            className={`px-3 py-1 text-sm rounded-full ${
              getProposalStatus(proposal) === "Accepted"
                ? "bg-green-100 text-green-700"
                : getProposalStatus(proposal) === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {getProposalStatus(proposal)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SentProposal;
