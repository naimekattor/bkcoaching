"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { PricingSection } from "@/components/pricing-section";

type BillingCycle = "monthly" | "yearly";
type Status = "active" | "canceled" | "expired";

interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: BillingCycle;
  renewalDate: string;
  status: Status;
}

// interface Plan {
//   id: string;
//   name: string;
//   price: number;
//   billingCycle: BillingCycle;
//   features: string[];
// }

const mockCurrentSubscription: Subscription = {
  id: "sub_123",
  name: "Pro",
  price: 20,
  billingCycle: "monthly",
  renewalDate: "2025-10-01",
  status: "active",
};

export default function SubscriptionPage() {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription>(
    mockCurrentSubscription
  );
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleCancel = () => {
    setCurrentSubscription((prev) => ({ ...prev, status: "canceled" }));
    setShowCancelModal(false);
  };

  const handleResume = () => {
    setCurrentSubscription((prev) => ({ ...prev, status: "active" }));
  };

  return (
    <div className="  mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Subscription Management
      </h1>

      {/* Current Plan */}
      <div className="bg-white rounded-xl shadow border p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-medium text-gray-900">
              {currentSubscription.name} Plan
            </p>
            <p className="text-gray-600">
              ${currentSubscription.price}/{currentSubscription.billingCycle}
            </p>
            <p className="text-sm text-gray-500">
              Renewal Date: {currentSubscription.renewalDate}
            </p>
            <p className="flex items-center gap-1 text-sm mt-2">
              {currentSubscription.status === "active" && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
              {currentSubscription.status === "canceled" && (
                <XCircle className="w-4 h-4 text-secondary" />
              )}
              {currentSubscription.status === "expired" && (
                <AlertCircle className="w-4 h-4 text-secondary" />
              )}
              Status:{" "}
              <span className="capitalize">{currentSubscription.status}</span>
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            {currentSubscription.status === "active" && (
              <>
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-yellow-600"
                >
                  Update Plan
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  Cancel Plan
                </button>
              </>
            )}
            {currentSubscription.status === "canceled" && (
              <button
                onClick={handleResume}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Resume Plan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Available Plans */}
      {/* <h2 className="text-xl font-semibold mb-4">Available Plans</h2> */}
      <PricingSection />

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Cancel Plan?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your current plan? You will lose
              access at the end of your billing period.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Go Back
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Plan Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Update Plan</h3>
            <p className="text-gray-600 mb-6">
              This will take you to checkout flow to update your plan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-yellow-600">
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
