import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CreditCard,
  Wallet,
  Shield,
  AlertCircle,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentSetupStepProps {
  onNext: () => void;
  onBack: () => void;
}

const PaymentSetupStep = ({ onBack }: PaymentSetupStepProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId | null>(
    null
  );
  const [formData, setFormData] = useState({
    paypalEmail: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankRoutingNumber: "",
    bankName: "",
    stripeConnected: false,
    taxInfo: {
      hasW9: false,
      businessType: "",
      taxId: "",
    },
  });

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      description: "Fast and secure payments worldwide",
      processingTime: "1-2 business days",
      fees: "2.9% + $0.30 per transaction",
    },
    // {
    //   id: "bank",
    //   name: "Bank Transfer",
    //   icon: Building,
    //   description: "Direct deposit to your bank account",
    //   processingTime: "3-5 business days",
    //   fees: "No fees",
    // },
    {
      id: "stripe",
      name: "Stripe Connect",
      icon: CreditCard,
      description: "Professional payment processing",
      processingTime: "2-3 business days",
      fees: "2.9% + $0.30 per transaction",
    },
  ] as const;
  type PaymentMethodId = (typeof paymentMethods)[number]["id"];

  // const businessTypes = [
  //   { value: "individual", label: "Individual/Sole Proprietor" },
  //   { value: "llc", label: "LLC" },
  //   { value: "corporation", label: "Corporation" },
  //   { value: "partnership", label: "Partnership" },
  // ];

  const isValid =
    paymentMethod &&
    ((paymentMethod === "paypal" && formData.paypalEmail) ||
      (paymentMethod === "stripe" && formData.stripeConnected));

  const handleContinue = () => {
    if (!isValid) return;

    // Save draft campaign to localStorage (optional, so they don’t lose data)
    localStorage.setItem("draftCampaign", JSON.stringify(formData));
    setShowAuthModal(true);

    // Redirect to signup with "returnTo" param
    // router.push(`/auth/signup?role=brand&returnTo=/brand-onboarding?step=6`);
    return;
  };

  return (
    <>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Payment setup</h1>
          <p className="text-muted-foreground">
            Choose how you&apos;d like to receive payments from your
            collaborations
          </p>
        </div>

        {/* Payout Schedule Info */}
        <Alert>
          <DollarSign className="h-4 w-4" />
          <AlertDescription>
            <strong>Payout Schedule:</strong> We process payments every Friday
            for completed campaigns. Payments are held for 48 hours after
            content approval to ensure brand satisfaction.
          </AlertDescription>
        </Alert>

        {/* Payment Method Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select your preferred method to receive payments
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${
                  paymentMethod === method.id
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{method.name}</h3>
                      {paymentMethod === method.id && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {method.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {method.processingTime}
                      </div>
                      <div>{method.fees}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Method Details */}
        {paymentMethod && (
          <Card>
            <CardHeader>
              <CardTitle>
                {paymentMethod === "paypal" && "PayPal Details"}
                {paymentMethod === "stripe" && "Stripe Connect"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethod === "paypal" && (
                <div className="space-y-2">
                  <Label htmlFor="paypalEmail">PayPal Email Address</Label>
                  <Input
                    id="paypalEmail"
                    type="email"
                    value={formData.paypalEmail}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        paypalEmail: e.target.value,
                      }))
                    }
                    placeholder="your-email@example.com"
                  />
                </div>
              )}

              {/* {paymentMethod === "bank" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Holder Name</Label>
                    <Input
                      id="accountName"
                      value={formData.bankAccountName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bankAccountName: e.target.value,
                        }))
                      }
                      placeholder="Full name as it appears on your account"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={formData.bankAccountNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            bankAccountNumber: e.target.value,
                          }))
                        }
                        placeholder="Account number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        value={formData.bankRoutingNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            bankRoutingNumber: e.target.value,
                          }))
                        }
                        placeholder="9-digit routing number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bankName: e.target.value,
                        }))
                      }
                      placeholder="Name of your bank"
                    />
                  </div>
                </div>
              )} */}

              {paymentMethod === "stripe" && (
                <div className="space-y-4">
                  <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
                    <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">
                      Connect your Stripe account
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Securely connect your Stripe account to receive payments
                    </p>
                    <Button
                      variant="primary"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          stripeConnected: true,
                        }))
                      }
                    >
                      {formData.stripeConnected
                        ? "✓ Connected"
                        : "Connect Stripe Account"}
                    </Button>
                  </div>
                </div>
              )}

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your payment information is encrypted and securely stored. We
                  never store sensitive banking details on our servers.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Tax Information */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Tax Information (Optional but Recommended)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Help us prepare your tax documents at the end of the year
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasW9"
                checked={formData.taxInfo.hasW9}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    taxInfo: { ...prev.taxInfo, hasW9: checked as boolean },
                  }))
                }
              />
              <Label htmlFor="hasW9">
                I have a W-9 form or can provide tax information
              </Label>
            </div>

            {formData.taxInfo.hasW9 && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Select
                    value={formData.taxInfo.businessType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxInfo: { ...prev.taxInfo, businessType: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / SSN (Last 4 digits)</Label>
                  <Input
                    id="taxId"
                    value={formData.taxInfo.taxId}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxInfo: { ...prev.taxInfo, taxId: e.target.value },
                      }))
                    }
                    placeholder="XXXX"
                    maxLength={4}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card> */}

        {/* Dispute Process */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Dispute Process:</strong> If there are any issues with
            payments or campaigns, our support team will help resolve them
            within 48 hours. All payments are protected by our platform
            guarantee.
          </AlertDescription>
        </Alert>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={!isValid}
          >
            Continue
          </Button>
        </div>
      </div>
      {/* Auth Required Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign up required</DialogTitle>
            <DialogDescription>
              Please sign up or log in to continue creating your campaign.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  "/auth/login?returnTo=/influencer-onboarding?step=7"
                )
              }
            >
              Log in
            </Button>
            <Button
              onClick={() =>
                router.push(
                  "/auth/signup?role=influencer&returnTo=/influencer-onboarding?step=7"
                )
              }
            >
              Sign up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentSetupStep;
