import React, { useEffect, useRef, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { 
  Eye, 
  Calendar, 
  DollarSign, 
  FileText, 
  Paperclip, 
  X, 
  CheckCircle2, 
  XCircle, 
  Clock 
} from "lucide-react";
import Link from "next/link";

// --- Types ---
export interface Attachment {
  id: number;
  link: string;
}

export interface Proposal {
  id: number;
  owner_id: number;
  campaign_id: number;
  hired_influencer_id: number;
  start_date: string;
  end_date: string;
  proposal_message: string;
  campaign_deliverables: string; 
  attachments: Attachment[];
  is_accepted_by_influencer: boolean;
  is_rejected_by_influencer: boolean;
  is_completed_marked_by_brand: boolean;
  budget: number;
  rating: number;
  campaign: {
    campaign_name: string;
  };
}

export type ProposalStatus = "Accepted" | "Rejected" | "Pending";

// --- Helpers ---
export const getProposalStatus = (proposal: Proposal): ProposalStatus => {
  if (proposal.is_accepted_by_influencer) return "Accepted";
  if (proposal.is_rejected_by_influencer) return "Rejected";
  return "Pending";
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const SentProposal = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [hiredInfluenceName,setHiredInfluenceName]=useState("");
const influencerCache = useRef<Record<number, string>>({});

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await apiClient("campaign_service/proposals/", {
          method: "GET",
          auth: true,
        });
        console.log("proposal:",response);
        
        setProposals(response || []);
      } catch (error) {
        console.error("Failed to fetch proposals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, []);

  useEffect(() => {
  const influencerId = selectedProposal?.hired_influencer_id;
  if (!influencerId) return;

  if (influencerCache.current[influencerId]) {
    setHiredInfluenceName(influencerCache.current[influencerId]);
    return;
  }

  const fetchInfluencer = async () => {
    try {
      const res = await apiClient(
        `user_service/get_a_influencer/${influencerId}/`,
        { method: "GET", auth: true }
      );

      const name =
        res?.data?.influencer_profile?.display_name ||
        res?.data?.user?.first_name ||
        "";

      // ✅ Save to cache
      influencerCache.current[influencerId] = name;

      setHiredInfluenceName(name);
    } catch (error) {
      console.error("Failed to fetch influencer", error);
    }
  };

  fetchInfluencer();
}, [selectedProposal?.hired_influencer_id]);



  const StatusBadge = ({ status }: { status: ProposalStatus }) => {
    const styles = {
      Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Rejected: "bg-rose-50 text-rose-700 border-rose-200",
      Pending: "bg-amber-50 text-amber-700 border-amber-200",
    };

    const icons = {
      Accepted: <CheckCircle2 size={14} className="mr-1" />,
      Rejected: <XCircle size={14} className="mr-1" />,
      Pending: <Clock size={14} className="mr-1" />,
    };

    return (
      <span className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm border">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
        <FileText className="text-gray-400 mb-3" size={40} />
        <p className="text-gray-500 font-medium">No proposals sent yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-primary">Your Sent Proposals</h2>
        <p className="text-sm text-gray-500">Track the status of your campaign applications</p>
      </div>

      <div className="max-h-[500px] overflow-y-auto px-2 py-6 space-y-4">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-100 rounded-xl hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {proposal?.campaign?.campaign_name || `Campaign #${proposal.campaign_id}`}
                </h3>
                <StatusBadge status={getProposalStatus(proposal)} />
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} className="text-primary/40" />
                  <span className="font-medium text-gray-900">${proposal.budget}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-gray-400" />
                  {formatDate(proposal.start_date)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedProposal(proposal)}
              className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
            >
              <Eye size={16} />
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* --- Detail Modal --- */}
      {selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h3 className="text-xl font-bold text-primary">Proposal Details</h3>
                <p className="text-sm text-gray-500 font-medium">Proposal ID: #{selectedProposal.id}</p>
              </div>
              <button 
                onClick={() => setSelectedProposal(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
  Influencer Name:
  {hiredInfluenceName ? (
    <Link
      href={`/brand-dashboard/microinfluencerspage/${selectedProposal?.hired_influencer_id}`}
      className="text-primary hover:underline hover:text-primary/80 transition"
    >
      {hiredInfluenceName}
    </Link>
  ) : (
    <span className="text-gray-400 text-sm">Not Set</span>
  )}
</h2>

              <section>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Message</h4>
                <div className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 italic text-sm leading-relaxed">
                  "{selectedProposal.proposal_message}"
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Timeline</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Calendar size={18} className="text-primary" />
                    </div>
                    <span>{formatDate(selectedProposal.start_date)} — {formatDate(selectedProposal.end_date)}</span>
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Budget</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign size={18} className="text-primary" />
                    </div>
                    <span className="font-bold text-lg text-gray-900">${selectedProposal.budget}</span>
                  </div>
                </section>
              </div>

              <section>
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    try {
                      const deliverables = JSON.parse(selectedProposal.campaign_deliverables);
                      return Array.isArray(deliverables) ? (
                        deliverables.map((item: string, idx: number) => (
                          <span key={idx} className="bg-primary/5 text-primary px-3 py-1.5 rounded-lg text-xs font-semibold border border-primary/10">
                            {item}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600">{selectedProposal.campaign_deliverables}</p>
                      );
                    } catch {
                      return <p className="text-sm text-gray-600">{selectedProposal.campaign_deliverables}</p>;
                    }
                  })()}
                </div>
              </section>

              {selectedProposal.attachments?.length > 0 && (
                <section>
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Attachments</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProposal.attachments.map((file) => (
                      <a
                        key={file.id}
                        href={file.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-gray-100 rounded-xl text-sm text-primary hover:bg-primary/5 hover:border-primary/20 transition-all group"
                      >
                        <div className="flex items-center gap-2">
                            <Paperclip size={16} className="text-primary" />
                            <span className="font-medium">View Attachment #{file.id}</span>
                        </div>
                        <Eye size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedProposal(null)}
                className="px-8 py-2.5 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-md shadow-primary/20 active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentProposal;