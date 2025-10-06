"use client";

import { useState } from "react";
import {
  AlertCircle,
  Bell,
  Book,
  Check,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  HelpCircle,
  Lock,
  Mail,
  MessageCircle,
  Shield,
  Smartphone,
} from "lucide-react";
type NotificationKeys = "email" | "push" | "sms" | "marketing";

interface NotificationItem {
  key: NotificationKeys;
  label: string;
  description: string;
}
export default function SettingsPage() {
  // 🔹 State declarations (added missing ones)
  const [email, setEmail] = useState("user@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [notifications, setNotifications] = useState<
    Record<NotificationKeys, boolean>
  >({
    email: true,
    push: false,
    sms: false,
    marketing: true,
  });

  const [twoFactor, setTwoFactor] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(["", "", "", "", "", ""]);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Password strength calculator
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-600";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    if (passwordStrength < 3) {
      alert("Please use a stronger password");
      return;
    }
    alert("Password updated successfully ✅");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handle2FAToggle = (checked: boolean) => {
    if (checked) {
      setShow2FASetup(true);
      generateQRCode();
    } else {
      if (
        confirm(
          "Are you sure you want to disable 2FA? This will make your account less secure."
        )
      ) {
        setTwoFactor(false);
        setShow2FASetup(false);
        setQrGenerated(false);
        setBackupCodes([]);
      }
    }
  };

  const generateQRCode = () => {
    setTimeout(() => setQrGenerated(true), 500);
  };

  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...twoFactorCode];
    newCode[index] = value;
    setTwoFactorCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleVerify2FA = () => {
    const code = twoFactorCode.join("");
    if (code.length === 6) {
      const codes = [
        "A7K9-2M4P-8N6Q-1R5T",
        "B3J8-7L2N-9K4M-6P1R",
        "C5H9-4M7K-2N8L-3Q6P",
        "D8K2-6N9M-1L4J-7R3H",
        "E9M3-5K8L-4J7N-2P6Q",
      ];
      setBackupCodes(codes);
      setTwoFactor(true);
      alert("2FA enabled successfully! ✅");
    }
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join("\n"));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const supportItems = [
    {
      id: "faq",
      title: "FAQs",
      description: "Find answers to commonly asked questions",
      href: "/faq",
      icon: HelpCircle,
    },
    {
      id: "guides",
      title: "Guides & Documentation",
      description: "Step-by-step tutorials and resources",
      href: "#",
      icon: Book,
    },
    {
      id: "contact",
      title: "Contact Support",
      description: "Get help from our support team",
      href: "#",
      icon: MessageCircle,
    },
  ];

  const notificationItems: NotificationItem[] = [
    {
      key: "email",
      label: "Email Notifications",
      description: "Receive updates via email",
    },
    {
      key: "push",
      label: "Push Notifications",
      description: "Browser push notifications",
    },
    {
      key: "sms",
      label: "SMS Alerts",
      description: "Important alerts via text message",
    },
    {
      key: "marketing",
      label: "Marketing Communications",
      description: "News and promotional content",
    },
  ];

  const handleSave = () => {
    alert("Settings saved ✅");
  };

  return (
    <div className=" p-0 mx-auto">
      <h1 className="text-3xl font-semibold text-primary mb-8">Settings</h1>

      <div className="space-y-10">
        {/* Email Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="px-6 py-5 border-b border-gray-200"
            style={{ backgroundColor: "#0d2f4f" }}
          >
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Address
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                  style={
                    { "--tw-ring-color": "#0d2f4f" } as React.CSSProperties
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">
                This email will be used for login and notifications
              </p>
            </div>
          </div>
        </section>

        {/* Password Change Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="px-6 py-5 border-b border-gray-200"
            style={{ backgroundColor: "#0d2f4f" }}
          >
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Ensure your account is using a strong password
            </p>
          </div>
          <div className="p-6 space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                  style={
                    { "--tw-ring-color": "#0d2f4f" } as React.CSSProperties
                  }
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                  style={
                    { "--tw-ring-color": "#0d2f4f" } as React.CSSProperties
                  }
                  value={newPassword}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Password strength:</span>
                    <span
                      className={`font-medium ${
                        passwordStrength <= 1
                          ? "text-red-600"
                          : passwordStrength <= 3
                          ? "text-secondary"
                          : "text-green-600"
                      }`}
                    >
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                  style={
                    { "--tw-ring-color": "#0d2f4f" } as React.CSSProperties
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              onClick={handleUpdatePassword}
              className="w-full px-6 py-3 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              style={{ backgroundColor: "#0d2f4f" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1a4570")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0d2f4f")
              }
            >
              <Lock className="w-4 h-4" />
              Update Password
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="px-6 py-5 border-b border-gray-200"
            style={{ backgroundColor: "#0d2f4f" }}
          >
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Manage how you receive updates and alerts
            </p>
          </div>
          <div className="p-6 space-y-4">
            {notificationItems.map((item) => (
              <label
                key={item.key}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="relative flex items-center h-6">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={(e) =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 rounded border-gray-300 focus:ring-2 cursor-pointer"
                    style={
                      {
                        accentColor: "#0d2f4f",
                        "--tw-ring-color": "#0d2f4f",
                      } as React.CSSProperties
                    }
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-500">
                    {item.description}
                  </div>
                </div>
                {notifications[item.key] && (
                  <Check
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: "#0d2f4f" }}
                  />
                )}
              </label>
            ))}
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="px-6 py-5 border-b border-gray-200"
            style={{ backgroundColor: "#0d2f4f" }}
          >
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Protect your account with advanced security features
            </p>
          </div>
          <div className="p-6 space-y-6">
            {/* 2FA Toggle */}
            <div className="flex items-start justify-between p-4 rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#0d2f4f20" }}
                >
                  <Smartphone
                    className="w-5 h-5"
                    style={{ color: "#0d2f4f" }}
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Two-Factor Authentication (2FA)
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Add an extra layer of security to your account
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => handle2FAToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                  style={
                    {
                      "--tw-ring-color": "#0d2f4f40",
                      backgroundColor: twoFactor ? "#0d2f4f" : undefined,
                    } as React.CSSProperties
                  }
                ></div>
              </label>
            </div>

            {/* 2FA Setup Flow */}
            {show2FASetup && !twoFactor && (
              <div className="space-y-6 p-6 bg-gra rounded-lg borer border-gray-200">
                {/* <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Set Up Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-600">
                    Scan the QR code with your authenticator app
                  </p>
                </div> */}

                {/* QR Code Placeholder */}
                {/* <div className="flex justify-center">
                  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    {qrGenerated ? (
                      <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-40 h-40 bg-white p-2 rounded">
                            <div
                              className="w-full h-full"
                              style={{
                                backgroundColor: "#0d2f4f",
                                backgroundImage: `repeating-linear-gradient(0deg, #0d2f4f, #0d2f4f 3px, white 3px, white 6px),
                                            repeating-linear-gradient(90deg, #0d2f4f, #0d2f4f 3px, white 3px, white 6px)`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-48 h-48 flex items-center justify-center">
                        <div
                          className="animate-spin rounded-full h-12 w-12 border-b-2"
                          style={{ borderColor: "#0d2f4f" }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div> */}

                {/* Manual Code */}
                {/* {qrGenerated && (
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-2">
                      Or enter this code manually:
                    </p>
                    <code className="px-4 py-2 bg-gray-100 rounded text-sm font-mono text-gray-800 border border-gray-300">
                      JBSWY3DPEHPK3PXP
                    </code>
                  </div>
                )} */}

                {/* Verification Code Input */}
                {/* <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 text-center">
                    Enter the 6-digit code from your app
                  </label>
                  <div className="flex justify-center gap-2">
                    {twoFactorCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeInput(index, e.target.value)}
                        className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all outline-none"
                        style={
                          {
                            "--tw-ring-color": "#0d2f4f",
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                </div> */}

                {/* <button
                  onClick={handleVerify2FA}
                  disabled={twoFactorCode.join("").length !== 6}
                  className="w-full px-6 py-3 text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    backgroundColor:
                      twoFactorCode.join("").length === 6
                        ? "#0d2f4f"
                        : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (twoFactorCode.join("").length === 6) {
                      e.currentTarget.style.backgroundColor = "#1a4570";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (twoFactorCode.join("").length === 6) {
                      e.currentTarget.style.backgroundColor = "#0d2f4f";
                    }
                  }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Verify and Enable 2FA
                </button> */}
              </div>
            )}

            {/* Backup Codes */}
            {backupCodes.length > 0 && (
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Save Your Backup Codes
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Store these codes in a safe place. You can use them to
                      access your account if you lose your device.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 font-mono text-sm space-y-2 border border-gray-300">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="text-gray-800">
                      {code}
                    </div>
                  ))}
                </div>
                <button
                  onClick={copyBackupCodes}
                  className="mt-4 w-full px-4 py-2 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0d2f4f" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1a4570")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0d2f4f")
                  }
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Backup Codes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Support / Help */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 bg-primary">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-white" />
              Support & Help
            </h2>
            <p className="text-sm text-white mt-1">
              We&apos;re here to help you get the most out of our platform
            </p>
          </div>

          {/* Support Items */}
          <div className="divide-y divide-gray-100">
            {supportItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="group flex items-center gap-4 px-6 py-4 transition-all duration-200 hover:bg-gray-50 active:bg-gray-100"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/30 flex items-center justify-center group-hover:bg-primary/40 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                </a>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              Still need help?{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary hover:underline"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </section>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-secondary text-primary font-semibold rounded hover:bg-secondary transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
