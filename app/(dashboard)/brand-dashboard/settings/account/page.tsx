"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("Basic");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });
  const [twoFactor, setTwoFactor] = useState(false);

  // Dummy invoices
  const [invoices] = useState([
    {
      id: "inv_001",
      amount: 200,
      currency: "USD",
      status: "paid",
      description: "Campaign Subscription - September",
      issuedAt: "2025-09-01",
      invoiceUrl: "/dummy/invoice-001.pdf",
    },
    {
      id: "inv_002",
      amount: 150,
      currency: "USD",
      status: "unpaid",
      description: "Premium Analytics - August",
      issuedAt: "2025-08-15",
    },
    {
      id: "inv_003",
      amount: 300,
      currency: "USD",
      status: "pending",
      description: "Brand Campaign Collaboration",
      issuedAt: "2025-09-20",
      invoiceUrl: "/dummy/invoice-003.pdf",
    },
  ]);

  const handleSave = () => {
    alert("Settings saved ✅");
  };

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-semibold text-primary mb-8">Settings</h1>

      <div className="space-y-10">
        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        {/* Password Change */}
        <section className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Change Password
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Confirm new password"
              />
            </div>
            <button
              className="px-6 py-2 bg-secondary text-white rounded hover:bg-secondary/80 transition"
              onClick={() => alert("Password updated successfully ✅")}
            >
              Update Password
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-primary">Notifications</h2>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) =>
                setNotifications((prev) => ({
                  ...prev,
                  email: e.target.checked,
                }))
              }
            />
            Email Alerts
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={(e) =>
                setNotifications((prev) => ({
                  ...prev,
                  push: e.target.checked,
                }))
              }
            />
            Push Alerts
          </label>
        </section>

        {/* Privacy & Security */}
        <section className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-primary">
            Privacy & Security
          </h2>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
            />
            Enable Two-Factor Authentication (2FA)
          </label>
        </section>

        {/* Support / Help */}
        <section className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-primary">Support & Help</h2>
          <ul className="list-disc list-inside text-primary/80">
            <li>
              <a href="/faq" className="text-secondary hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="/guides" className="text-secondary hover:underline">
                Guides
              </a>
            </li>
            <li>
              <a
                href="/contact-support"
                className="text-secondary hover:underline"
              >
                Contact Support
              </a>
            </li>
          </ul>
        </section>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-secondary text-white rounded hover:bg-secondary transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
