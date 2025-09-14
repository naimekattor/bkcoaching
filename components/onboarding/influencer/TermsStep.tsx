import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Shield, Eye } from "lucide-react";

interface TermsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const TermsStep = ({ onNext, onBack }: TermsStepProps) => {
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    contentPolicy: false,
  });

  const allAgreed = Object.values(agreements).every((agreed) => agreed);

  const handleAgreementChange = (field: string, checked: boolean) => {
    setAgreements((prev) => ({ ...prev, [field]: checked }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Terms & Privacy</h1>
        <p className="text-muted-foreground">
          Please review and accept our terms to complete your registration
        </p>
      </div>

      <div className="grid gap-6">
        {/* Terms of Service */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Terms of Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-32 w-full border rounded-lg p-4">
              <div className="text-sm space-y-2">
                <p>
                  <strong>1. Account Registration</strong>
                </p>
                <p>
                  You must be at least 18 years old to create an account. You
                  are responsible for maintaining the security of your account
                  credentials.
                </p>

                <p>
                  <strong>2. Creator Responsibilities</strong>
                </p>
                <p>
                  You agree to create authentic, high-quality content that
                  complies with platform guidelines and brand requirements. You
                  must disclose sponsored content according to FTC guidelines.
                </p>

                <p>
                  <strong>3. Payment Terms</strong>
                </p>
                <p>
                  Payments are processed weekly for completed campaigns.
                  CreatorHub retains a 15% platform fee on all earnings. Dispute
                  resolution process is available for payment issues.
                </p>

                <p>
                  <strong>4. Content Ownership</strong>
                </p>
                <p>
                  You retain ownership of your content but grant brands usage
                  rights as specified in individual campaign agreements.
                </p>

                <p>
                  <strong>5. Platform Usage</strong>
                </p>
                <p>
                  You agree not to circumvent the platform for direct payments
                  or use the platform for any illegal activities.
                </p>
              </div>
            </ScrollArea>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreements.termsOfService}
                onCheckedChange={(checked) =>
                  handleAgreementChange("termsOfService", checked as boolean)
                }
              />
              <Label htmlFor="terms" className="text-sm">
                I have read and agree to the{" "}
                <button className="text-primary hover:underline">
                  Terms of Service
                </button>
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-32 w-full border rounded-lg p-4">
              <div className="text-sm space-y-2">
                <p>
                  <strong>Data Collection</strong>
                </p>
                <p>
                  We collect information you provide during registration,
                  including profile data, social media links, and payment
                  information. We also collect usage data to improve our
                  platform.
                </p>

                <p>
                  <strong>Data Usage</strong>
                </p>
                <p>
                  Your data is used to match you with relevant brands, process
                  payments, and provide customer support. We do not sell your
                  personal information to third parties.
                </p>

                <p>
                  <strong>Data Sharing</strong>
                </p>
                <p>
                  We share necessary information with brands for collaboration
                  purposes and with payment processors for transaction handling.
                  All sharing is done securely and with your consent.
                </p>

                <p>
                  <strong>Data Security</strong>
                </p>
                <p>
                  We use industry-standard encryption and security measures to
                  protect your personal information.
                </p>

                <p>
                  <strong>Your Rights</strong>
                </p>
                <p>
                  You can access, update, or delete your personal data at any
                  time through your account settings.
                </p>
              </div>
            </ScrollArea>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={agreements.privacyPolicy}
                onCheckedChange={(checked) =>
                  handleAgreementChange("privacyPolicy", checked as boolean)
                }
              />
              <Label htmlFor="privacy" className="text-sm">
                I have read and agree to the{" "}
                <button className="text-primary hover:underline">
                  Privacy Policy
                </button>
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Content Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Content Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-32 w-full border rounded-lg p-4">
              <div className="text-sm space-y-2">
                <p>
                  <strong>Content Standards</strong>
                </p>
                <p>
                  All content must be original, authentic, and comply with
                  platform community guidelines. Content should not contain hate
                  speech, harassment, or discriminatory language.
                </p>

                <p>
                  <strong>Prohibited Content</strong>
                </p>
                <p>
                  Content promoting illegal activities, adult content (unless
                  explicitly agreed), violence, or harmful products is
                  prohibited.
                </p>

                <p>
                  <strong>Brand Safety</strong>
                </p>
                <p>
                  Content must align with brand values and guidelines.
                  Controversial or potentially harmful content should be
                  discussed with brands beforehand.
                </p>

                <p>
                  <strong>Intellectual Property</strong>
                </p>
                <p>
                  You must have rights to all content you create and not
                  infringe on others intellectual property.
                </p>

                <p>
                  <strong>Compliance</strong>
                </p>
                <p>
                  All sponsored content must include proper disclosures and
                  comply with relevant advertising regulations.
                </p>
              </div>
            </ScrollArea>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="content"
                checked={agreements.contentPolicy}
                onCheckedChange={(checked) =>
                  handleAgreementChange("contentPolicy", checked as boolean)
                }
              />
              <Label htmlFor="content" className="text-sm">
                I have read and agree to the{" "}
                <button className="text-primary hover:underline">
                  Content Policy
                </button>
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Notice */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            <strong>Important:</strong> By creating an account, you acknowledge
            that you understand these policies and agree to follow them.
            Violation of these terms may result in account suspension or
            termination. You can always review these policies in your account
            settings.
          </p>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" onClick={onNext} disabled={!allAgreed}>
          Accept & Continue
        </Button>
      </div>
    </div>
  );
};

export default TermsStep;
