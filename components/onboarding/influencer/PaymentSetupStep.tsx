// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import {
//   CreditCard,
//   Wallet,
//   Shield,
//   AlertCircle,
//   DollarSign,
//   Calendar,
//   Building,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useInfluencerOnboarding } from "@/contexts/InfluencerOnboardingContext";

// interface PaymentSetupStepProps {
//   onNext: () => void;
//   onBack: () => void;
// }

// const PaymentSetupStep = ({ onBack }: PaymentSetupStepProps) => {
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const router = useRouter();
//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId | null>(
//     null
//   );
//   const { onboardingDataInfluencer, setOnboardingDataInfluencer } =
//     useInfluencerOnboarding();
//   // const [formData, setFormData] = useState({
//   //   paypalEmail: "",
//   //   bankAccountName: "",
//   //   bankAccountNumber: "",
//   //   bankRoutingNumber: "",
//   //   bankName: "",
//   //   stripeConnected: false,
//   //   taxInfo: {
//   //     hasW9: false,
//   //     businessType: "",
//   //     taxId: "",
//   //   },
//   // });

//   const paymentMethods = [
//     {
//       id: "paypal",
//       name: "PayPal",
//       icon: Wallet,
//       description: "Fast and secure payments worldwide",
//       processingTime: "1-2 business days",
//       fees: "2.9% + $0.30 per transaction",
//     },
//     {
//       id: "bank",
//       name: "Bank Transfer",
//       icon: Building,
//       description: "Direct deposit to your bank account",
//       processingTime: "3-5 business days",
//       fees: "No fees",
//     },
//     {
//       id: "stripe",
//       name: "Stripe Connect",
//       icon: CreditCard,
//       description: "Professional payment processing",
//       processingTime: "2-3 business days",
//       fees: "2.9% + $0.30 per transaction",
//     },
//   ] as const;
//   type PaymentMethodId = (typeof paymentMethods)[number]["id"];

//   // const businessTypes = [
//   //   { value: "individual", label: "Individual/Sole Proprietor" },
//   //   { value: "llc", label: "LLC" },
//   //   { value: "corporation", label: "Corporation" },
//   //   { value: "partnership", label: "Partnership" },
//   // ];

//   const isValid =
//     onboardingDataInfluencer.payment_method &&
//     (onboardingDataInfluencer.payment_method === "paypal" ||
//       (onboardingDataInfluencer.paypal_email &&
//         onboardingDataInfluencer.payment_method === "stripe") ||
//       (onboardingDataInfluencer.stripeConnected &&
//         onboardingDataInfluencer.payment_method === "bank") ||
//       (onboardingDataInfluencer.account_holder_name &&
//         onboardingDataInfluencer.account_number &&
//         onboardingDataInfluencer.routing_number &&
//         onboardingDataInfluencer.bank_name));

//   const handleContinue = () => {
//     if (!isValid) return;

//     // Save draft campaign to localStorage (optional, so they don’t lose data)
//     // localStorage.setItem(
//     //   "draftCampaign",
//     //   JSON.stringify(onboardingDataInfluencer)
//     // );
//     // setShowAuthModal(true);

//     // Redirect to signup with "returnTo" param
//     // router.push(`/auth/signup?role=brand&returnTo=/brand-onboarding?step=6`);
//     return;
//   };

//   return (
//     <>
//       <div className="space-y-8">
//         <div className="text-center space-y-4">
//           <h1 className="text-3xl text-primary font-bold">Payment setup</h1>
//           <p className="text-muted-foreground">
//             Choose how you&apos;d like to receive payments from your
//             collaborations
//           </p>
//         </div>

//         {/* Payout Schedule Info */}
//         <Alert>
//           <DollarSign className="h-4 w-4" />
//           <AlertDescription>
//             <strong>Payout Schedule:</strong> We process payments every Friday
//             for completed campaigns. Payments are held for 48 hours after
//             content approval to ensure brand satisfaction.
//           </AlertDescription>
//         </Alert>

//         {/* Payment Method Selection */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Choose Payment Method</CardTitle>
//             <p className="text-sm text-muted-foreground">
//               Select your preferred method to receive payments
//             </p>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {paymentMethods.map((method) => (
//               <div
//                 key={method.id}
//                 className={`p-4 border rounded-lg cursor-pointer transition-all hover:bg-muted/50 ${
//                   paymentMethod === method.id
//                     ? "border-primary bg-primary/5"
//                     : ""
//                 }`}
//                 onClick={() => setPaymentMethod(method.id)}
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
//                     <method.icon className="w-6 h-6" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="font-semibold">{method.name}</h3>
//                       {paymentMethod === method.id && (
//                         <div className="w-2 h-2 rounded-full bg-primary" />
//                       )}
//                     </div>
//                     <p className="text-sm text-muted-foreground mb-2">
//                       {method.description}
//                     </p>
//                     <div className="flex items-center gap-4 text-xs text-muted-foreground">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-3 h-3" />
//                         {method.processingTime}
//                       </div>
//                       <div>{method.fees}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         {/* Payment Method Details */}
//         {paymentMethod && (
//           <Card>
//             <CardHeader>
//               <CardTitle>
//                 {paymentMethod === "paypal" && "PayPal Details"}
//                 {paymentMethod === "stripe" && "Stripe Connect"}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {paymentMethod === "paypal" && (
//                 <div className="space-y-2">
//                   <Label htmlFor="paypalEmail">PayPal Email Address</Label>
//                   <Input
//                     id="paypalEmail"
//                     type="email"
//                     value={onboardingDataInfluencer.paypal_email}
//                     onChange={(e) =>
//                       setOnboardingDataInfluencer((prev) => ({
//                         ...prev,
//                         paypal_email: e.target.value,
//                       }))
//                     }
//                     placeholder="your-email@example.com"
//                   />
//                 </div>
//               )}

//               {paymentMethod === "bank" && (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="accountName">Account Holder Name</Label>
//                     <Input
//                       id="account_holder_name"
//                       value={onboardingDataInfluencer.account_holder_name}
//                       onChange={(e) =>
//                         setOnboardingDataInfluencer((prev) => ({
//                           ...prev,
//                           account_holder_name: e.target.value,
//                         }))
//                       }
//                       placeholder="Full name as it appears on your account"
//                     />
//                   </div>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="accountNumber">Account Number</Label>
//                       <Input
//                         id="account_number"
//                         value={onboardingDataInfluencer.account_number}
//                         onChange={(e) =>
//                           setOnboardingDataInfluencer((prev) => ({
//                             ...prev,
//                             account_number: e.target.value,
//                           }))
//                         }
//                         placeholder="Account number"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="routingNumber">Routing Number</Label>
//                       <Input
//                         id="routingNumber"
//                         value={onboardingDataInfluencer.routing_number}
//                         onChange={(e) =>
//                           setOnboardingDataInfluencer((prev) => ({
//                             ...prev,
//                             bankRoutingNumber: e.target.value,
//                           }))
//                         }
//                         placeholder="9-digit routing number"
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="bankName">Bank Name</Label>
//                     <Input
//                       id="bank_name"
//                       value={onboardingDataInfluencer.bank_name}
//                       onChange={(e) =>
//                         setOnboardingDataInfluencer((prev) => ({
//                           ...prev,
//                           bank_name: e.target.value,
//                         }))
//                       }
//                       placeholder="Name of your bank"
//                     />
//                   </div>
//                 </div>
//               )}

//               {paymentMethod === "stripe" && (
//                 <div className="space-y-4">
//                   <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
//                     <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                     <h3 className="font-semibold mb-2">
//                       Connect your Stripe account
//                     </h3>
//                     <p className="text-sm text-muted-foreground mb-4">
//                       Securely connect your Stripe account to receive payments
//                     </p>
//                     <Button
//                       variant="primary"
//                       onClick={() =>
//                         setOnboardingDataInfluencer((prev) => ({
//                           ...prev,
//                           stripeConnected: true,
//                         }))
//                       }
//                     >
//                       {onboardingDataInfluencer.stripeConnected
//                         ? "✓ Connected"
//                         : "Connect Stripe Account"}
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               <Alert>
//                 <Shield className="h-4 w-4" />
//                 <AlertDescription>
//                   Your payment information is encrypted and securely stored. We
//                   never store sensitive banking details on our servers.
//                 </AlertDescription>
//               </Alert>
//             </CardContent>
//           </Card>
//         )}

//         {/* Tax Information */}
//         {/* <Card>
//           <CardHeader>
//             <CardTitle>Tax Information (Optional but Recommended)</CardTitle>
//             <p className="text-sm text-muted-foreground">
//               Help us prepare your tax documents at the end of the year
//             </p>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="hasW9"
//                 checked={onboardingDataInfluencer.taxInfo.hasW9}
//                 onCheckedChange={(checked) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     taxInfo: { ...prev.taxInfo, hasW9: checked as boolean },
//                   }))
//                 }
//               />
//               <Label htmlFor="hasW9">
//                 I have a W-9 form or can provide tax information
//               </Label>
//             </div>

//             {onboardingDataInfluencer.taxInfo.hasW9 && (
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Business Type</Label>
//                   <Select
//                     value={onboardingDataInfluencer.taxInfo.businessType}
//                     onValueChange={(value) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         taxInfo: { ...prev.taxInfo, businessType: value },
//                       }))
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select business type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {businessTypes.map((type) => (
//                         <SelectItem key={type.value} value={type.value}>
//                           {type.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="taxId">Tax ID / SSN (Last 4 digits)</Label>
//                   <Input
//                     id="taxId"
//                     value={onboardingDataInfluencer.taxInfo.taxId}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         taxInfo: { ...prev.taxInfo, taxId: e.target.value },
//                       }))
//                     }
//                     placeholder="XXXX"
//                     maxLength={4}
//                   />
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card> */}

//         {/* Dispute Process */}
//         {/* <Alert>
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>
//             <strong>Dispute Process:</strong> If there are any issues with
//             payments or campaigns, our support team will help resolve them
//             within 48 hours. All payments are protected by our platform
//             guarantee.
//           </AlertDescription>
//         </Alert> */}

//         {/* Navigation */}
//         <div className="flex justify-between pt-6">
//           <Button variant="outline" onClick={onBack}>
//             Back
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleContinue}
//             disabled={!isValid}
//           >
//             Continue
//           </Button>
//         </div>
//       </div>
//       {/* Auth Required Modal */}
//       <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Sign up required</DialogTitle>
//             <DialogDescription>
//               Please sign up or log in to continue creating your campaign.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex justify-end gap-2 pt-4">
//             <Button
//               variant="outline"
//               onClick={() =>
//                 router.push(
//                   "/auth/login?returnTo=/influencer-onboarding?step=7"
//                 )
//               }
//             >
//               Log in
//             </Button>
//             <Button
//               onClick={() =>
//                 router.push(
//                   "/auth/signup?role=influencer&returnTo=/influencer-onboarding?step=7"
//                 )
//               }
//             >
//               Sign up
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default PaymentSetupStep;
"use client";

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
  Building,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useInfluencerOnboarding } from "@/contexts/InfluencerOnboardingContext"; // Adjust path as needed

interface PaymentSetupStepProps {
  onNext: () => void;
  onBack: () => void;
}

const PaymentSetupStep = ({ onNext, onBack }: PaymentSetupStepProps) => {
  const { onboardingDataInfluencer, setOnboardingDataInfluencer } =
    useInfluencerOnboarding();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      description: "Fast and secure payments worldwide",
      processingTime: "1-2 business days",
      fees: "2.9% + $0.30 per transaction",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building,
      description: "Direct deposit to your bank account",
      processingTime: "3-5 business days",
      fees: "No fees",
    },
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

  const isValid =
    onboardingDataInfluencer.payment_method &&
    ((onboardingDataInfluencer.payment_method === "paypal" &&
      onboardingDataInfluencer.paypal_email) ||
      (onboardingDataInfluencer.payment_method === "stripe" &&
        onboardingDataInfluencer.stripeConnected) ||
      (onboardingDataInfluencer.payment_method === "bank" &&
        onboardingDataInfluencer.account_holder_name &&
        onboardingDataInfluencer.account_number &&
        onboardingDataInfluencer.routing_number &&
        onboardingDataInfluencer.bank_name));

  const handleContinue = () => {
    if (!isValid) return;

    // Save draft campaign to localStorage (optional, so they don’t lose data)
    localStorage.setItem(
      "draftCampaign",
      JSON.stringify({
        payment_method: onboardingDataInfluencer.payment_method,
        paypal_email: onboardingDataInfluencer.paypal_email,
        account_holder_name: onboardingDataInfluencer.account_holder_name,
        account_number: onboardingDataInfluencer.account_number,
        routing_number: onboardingDataInfluencer.routing_number,
        bank_name: onboardingDataInfluencer.bank_name,
        stripeConnected: onboardingDataInfluencer.stripeConnected,
      })
    );
    setShowAuthModal(true);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl text-primary font-bold">Payment setup</h1>
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
                  onboardingDataInfluencer.payment_method === method.id
                    ? "border-primary bg-primary/5"
                    : ""
                }`}
                onClick={() =>
                  setOnboardingDataInfluencer((prev) => ({
                    ...prev,
                    payment_method: method.id,
                  }))
                }
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{method.name}</h3>
                      {onboardingDataInfluencer.payment_method ===
                        method.id && (
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
        {onboardingDataInfluencer.payment_method && (
          <Card>
            <CardHeader>
              <CardTitle>
                {onboardingDataInfluencer.payment_method === "paypal" &&
                  "PayPal Details"}
                {onboardingDataInfluencer.payment_method === "stripe" &&
                  "Stripe Connect"}
                {onboardingDataInfluencer.payment_method === "bank" &&
                  "Bank Transfer Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {onboardingDataInfluencer.payment_method === "paypal" && (
                <div className="space-y-2">
                  <Label htmlFor="paypalEmail">PayPal Email Address</Label>
                  <Input
                    id="paypalEmail"
                    type="email"
                    value={onboardingDataInfluencer.paypal_email}
                    onChange={(e) =>
                      setOnboardingDataInfluencer((prev) => ({
                        ...prev,
                        paypal_email: e.target.value,
                      }))
                    }
                    placeholder="your-email@example.com"
                  />
                </div>
              )}

              {onboardingDataInfluencer.payment_method === "bank" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Holder Name</Label>
                    <Input
                      id="accountName"
                      value={onboardingDataInfluencer.account_holder_name}
                      onChange={(e) =>
                        setOnboardingDataInfluencer((prev) => ({
                          ...prev,
                          account_holder_name: e.target.value,
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
                        value={onboardingDataInfluencer.account_number}
                        onChange={(e) =>
                          setOnboardingDataInfluencer((prev) => ({
                            ...prev,
                            account_number: parseInt(e.target.value) || 0,
                          }))
                        }
                        placeholder="Account number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        value={onboardingDataInfluencer.routing_number}
                        onChange={(e) =>
                          setOnboardingDataInfluencer((prev) => ({
                            ...prev,
                            routing_number: parseInt(e.target.value) || 0,
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
                      value={onboardingDataInfluencer.bank_name}
                      onChange={(e) =>
                        setOnboardingDataInfluencer((prev) => ({
                          ...prev,
                          bank_name: e.target.value,
                        }))
                      }
                      placeholder="Name of your bank"
                    />
                  </div>
                </div>
              )}

              {onboardingDataInfluencer.payment_method === "stripe" && (
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
                        setOnboardingDataInfluencer((prev) => ({
                          ...prev,
                          stripeConnected: true,
                        }))
                      }
                    >
                      {onboardingDataInfluencer.stripeConnected
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
