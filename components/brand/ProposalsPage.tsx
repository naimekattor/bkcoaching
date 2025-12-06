"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/apiClient";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

type ProposalForm = {
  proposalMessage: string;
  startDate: string;
  endDate: string;
  campaignBrief: File | null;
  productPhotos: File | null;
  deliverables: string[];
  budget: string;
  campaignId:string;
};

interface MyCampaigns {
  id:number;
  campaign_name:string;


}

const deliverableTypes = [
  { id: "repost", label: "Repost", icon: "🔄" },
  { id: "instagramStory", label: "Instagram Story", icon: "📖" },
  { id: "instagramReel", label: "Instagram Reel", icon: "🎬" },
  { id: "tiktokVideo", label: "TikTok Video", icon: "🎵" },
  { id: "youtubeVideo", label: "YouTube Video", icon: "📹" },
  { id: "youtubeShort", label: "YouTube Short", icon: "⏱️" },
  { id: "blogPost", label: "Blog Post", icon: "📝" },
  { id: "podcastMention", label: "Podcast Mention", icon: "🎙️" },
  { id: "liveStream", label: "Live Stream", icon: "🔴" },
  { id: "userGeneratedContent", label: "UGC Creation", icon: "👥" },
  { id: "whatsappStatus", label: "WhatsApp Status", icon: "💬" },
];

export default function ProposalsPage() {
  const [formData, setFormData] = useState<ProposalForm>({
    proposalMessage: "",
    startDate: "",
    endDate: "",
    campaignBrief: null,
    productPhotos: null,
    deliverables: [],
    budget: "",
    campaignId:"",
  });

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [myCampaigns,setMyCampaigns]=useState<MyCampaigns[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const profileId = params.id; 
  console.log(profileId);
  
    

  const handleInputChange = (field: keyof ProposalForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeliverableChange = (deliverableId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: checked
        ? [...prev.deliverables, deliverableId]
        : prev.deliverables.filter((d) => d !== deliverableId),
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProposalForm
  ) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
    console.log(formData.campaignId);
    
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowReviewModal(true);
  };

  const handleSendProposal = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const formPayload = new FormData();
      formPayload.append("campaign_id", formData.campaignId);
      formPayload.append("start_date", formData.startDate || "");
      formPayload.append("end_date", formData.endDate || "");
      formPayload.append("proposal_message", formData.proposalMessage || "");
      formPayload.append("campaign_deliverables", JSON.stringify(formData.deliverables));
      const cleanBudget = formData.budget.replace(/[^0-9.]/g, ''); 
      formPayload.append("budget", cleanBudget); 
      formPayload.append("influencer_id", profileId);
       if (formData.campaignBrief) {
        formPayload.append("attachments", formData.campaignBrief);
      }

      if (formData.productPhotos) {
        formPayload.append("attachments", formData.productPhotos);
      }
     
      

      console.log("Sending proposal with FormData");

      


      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}campaign_service/hire_influencer/`,
        {
          method: "POST",
          headers: {
           
            Authorization: `Bearer ${token}`,
          },
          body: formPayload,
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.status === "success") {
        console.log("Proposal sent successfully:", result.data);
        setShowReviewModal(false);
        setShowSuccessModal(true);
      } else {
        console.error("Failed to send proposal:", result.error);
        toast("Failed to send proposal. Please try again.");
      }
    } catch (error) {
      console.error("Error sending proposal:", error);
      toast(
        error instanceof Error
          ? error.message
          : "An error occurred while sending the proposal."
      );
    } finally {
      setLoading(false);
    }
  };

  // const handleSaveAsDraft = () => {
  //   console.log("Saved as draft:", formData);
  //   setShowReviewModal(false);
  // };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    // setFormData({
    //   proposalMessage: "",
    //   startDate: "",
    //   endDate: "",
    //   campaignBrief: null,
    //   productPhotos: null,
    //   deliverables: [],
    //   budget: "",
    // });
  };


  useEffect(()=>{
    const fetchMyCampaigns=async()=>{
      try {
        const res=await apiClient('campaign_service/get_my_all_campaigns/',{
          method:"GET",
          auth:true,
        });
        setMyCampaigns(res.data);
      } catch (error) {
        
      }
    }
    fetchMyCampaigns();
  },[]);

  return (
    <div className="flex min-h-screen ">
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Micro-Influencer Hiring Proposal
            </h1>
            <p className="text-gray-600 mt-1">
              Fill out your information to start connecting with
              Micro-Influencer
            </p>
          </div>
        </div>

        <div className="my-6">
           <label className="block text-sm font-medium text-gray-700 mb-2">
    Select Campaign *
  </label>
          <Select onValueChange={(value)=>handleInputChange("campaignId",value)}>
      <SelectTrigger className="w-[250px]">
       <SelectValue placeholder="Select a Campaign" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>All Campaigns</SelectLabel>
          {
            myCampaigns.map((campaign)=>{
              return <SelectItem key={campaign.id} value={String(campaign.id)}>{campaign.campaign_name}</SelectItem>
            })
          }
          
          
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>

        <div className="">
          <form onSubmit={handleSubmitForm} className="mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="px-3">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Project Timeline
                  </h4>

                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          handleInputChange("endDate", e.target.value)
                        }
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget
                  </label>
                  <input
                    type="text"
                    placeholder="$200"
                    value={formData.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proposal Message
              </label>
              <textarea
                placeholder="Write proposal to micro-influencer"
                rows={6}
                value={formData.proposalMessage}
                onChange={(e) =>
                  handleInputChange("proposalMessage", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Content Deliverables *
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select the type of content you want micro-influencers to
                produce
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deliverableTypes.map((deliverable) => (
                  <div
                    key={deliverable.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={deliverable.id}
                      checked={formData.deliverables.includes(deliverable.id)}
                      onChange={(e) =>
                        handleDeliverableChange(
                          deliverable.id,
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    {/* <span className="text-lg">{deliverable.icon}</span> */}
                    <label
                      htmlFor={deliverable.id}
                      className="text-sm font-normal cursor-pointer text-gray-700"
                    >
                      {deliverable.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Attachment
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400">📄</span>
                    <span className="text-sm font-medium text-primary">
                      Campaign brief (PDF only)
                    </span>
                  </div>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "campaignBrief")}
                    className="mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-primary "
                  />
                  <span className="text-xs text-gray-500 block pl-6">
                    (PDF only)
                  </span>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400">📷</span>
                    <span className="text-sm font-medium text-primary">
                      Product photos (Images only)
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    
                    onChange={(e) => handleFileChange(e, "productPhotos")}
                    className="mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-primary "
                  />
                  <span className="text-xs text-gray-500 block pl-6">
                    (Images only)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mb-6">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Decline
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-secondary text-primary font-semibold rounded-md hover:bg-[var(--secondaryhover)] transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Review Proposal</h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    width={60}
                    height={60}
                    src="/placeholder.svg"
                    alt="Influencer"
                    className="w-15 h-15 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Influencer Name
                    </h3>
                    <p className="text-sm text-gray-600">
                      Micro-influencer profile
                    </p>
                  </div>
                </div>

                <div className="mb-4 border-b-2 border-gray-200 pb-3">
                  <h4 className="font-medium text-gray-900 mb-2">Campaign</h4>
                  <p className="text-sm text-gray-600">
                    Campaign details and objectives
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Project Timeline
                  </h4>

                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {formData.startDate || "Start"}
                      </span>
                      <span className="text-gray-600 mt-1 text-xs">Start</span>
                    </div>

                    <div className="flex-1 h-1 bg-gray-300">
                      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {formData.endDate || "End"}
                      </span>
                      <span className="text-gray-600 mt-1 text-xs">End</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-4">
                  Proposal Details
                </h4>

                <div className="mb-4 border-2 border-gray-200 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {formData.proposalMessage ||
                      "Your proposal message will appear here"}
                  </p>
                </div>

                <div className="mb-4 border-2 border-gray-200 rounded-lg p-3">
                  <h5 className="font-medium text-gray-900 mb-2">
                    Campaign Deliverables
                  </h5>
                  <div className="space-y-2">
                    {formData.deliverables.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">
                        No deliverables selected
                      </p>
                    ) : (
                      formData.deliverables.map((delId) => {
                        const deliverable = deliverableTypes.find(
                          (d) => d.id === delId
                        );
                        return (
                          <div key={delId} className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-sm">{deliverable?.label}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-2">
                    Attachments
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 rounded-lg p-2">
                      <span>📄</span>
                      <span className="truncate">
                        {formData.campaignBrief?.name ||
                          "Campaign brief (optional)"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 rounded-lg p-2">
                      <span>📷</span>
                      <span className="truncate">
                        {formData.productPhotos
      ? formData.productPhotos.name
      : "Product photos (optional)"}

                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSendProposal}
                    disabled={loading}
                    className="flex-1 bg-secondary text-primary py-2 px-4 rounded-md hover:bg-[var(--secondaryhover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    {loading ? "Sending..." : "Send Proposal"}
                  </button>
                  {/* <button
                    onClick={handleSaveAsDraft}
                    disabled={loading}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Save as Draft
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✓</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sent Successfully
              </h3>
              <p className="text-gray-600 mb-6">
                Your proposal has been sent to the influencer
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCloseSuccess}
                  className="flex-1 bg-secondary text-primary py-2 px-4 rounded-md hover:bg-[var(--secondaryhover)] transition-colors font-semibold"
                >
                  Continue
                </button>
                {/* <button
                  onClick={handleCloseSuccess}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  View Profile
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}