import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-[#ffffff] to-[#E9F4FF]">
        <main className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2  items-center">
            {/* Left Content */}
            <div className=" space-y-8 flex-1">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl  font-bold text-primary leading-tight">
                  Empowering Brands and Influencers to{" "}
                  <span className="text-primary">Grow Together</span>
                </h1>
              </div>

              <p className="text-primary text-[16px] leading-relaxed max-w-lg">
                This headline speaks to the essence of your platform,
                emphasizing the collaborative nature.
              </p>
            </div>

            {/* Right Image (1/3) */}
            <div className="relative  pt-6">
              <Image
                width={833}
                height={519}
                src={"/images/privacy-hero.png"}
                alt="Two stylish women representing micro-influencers"
                className="w-[527px] h-[476px] max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </main>
      </section>
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 underline">
              Privacy Policy
            </h1>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="text-sm text-gray-600 mb-8">
              <p>Effective Date: 19/02/2025</p>
              <p>
                Thank you for visiting FLUENCER FLOW Platform. Your privacy is
                important to us. This Privacy Policy explains how we collect,
                use, and protect your personal information when you visit or
                interact with our website www.Creatorflow.com
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Personal Information: such as your name, email address, phone
                  number, etc. (only when you submit it voluntarily, e.g.,
                  through contact forms or account registration)
                </li>
                <li>
                  Usage Data: Information about how you use our website, browser
                  type, device type, pages visited, time spent on the site, and
                  other analytical data
                </li>
                <li>
                  Cookies and Tracking Technologies: we may use cookies to
                  enhance your experience, analyze site traffic, and improve our
                  services
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We may use your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To provide and maintain our website</li>
                <li>
                  To respond to your inquiries and provide customer support
                </li>
                <li>
                  To send you updates, newsletters, or marketing communications
                  (you can opt out)
                </li>
                <li>
                  To analyze and improve the performance and content of our site
                </li>
                <li>To detect and prevent fraudulent or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Sharing Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal data. We may share your information
                with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Service Providers: who assist in operating our site or serving
                  you
                </li>
                <li>
                  Business Partners: for joint marketing or promotional
                  activities
                </li>
                <li>
                  Legal Authorities: if required by law or to protect our legal
                  rights
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Your Rights and Choices
              </h2>
              <p className="text-gray-700 mb-4">You may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>
                  To exercise any of these rights, contact us at:
                  Creatorflow@gmail.com
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Security
              </h2>
              <p className="text-gray-700">
                We take reasonable precautions to protect your personal
                information. However, no method of transmission over the
                Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Third-Party Links
              </h2>
              <p className="text-gray-700">
                Our website may contain links to other websites. We are not
                responsible for their privacy practices or content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Children's Privacy
              </h2>
              <p className="text-gray-700">
                Our website is not directed to children under 13. We do not
                knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated "Effective Date."
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Contact Us
              </h2>
              <p className="text-gray-700">
                If you have any questions or concerns about this Privacy Policy,
                please contact us at:
                <br />
                [your@email.com] [Your Address, City, Country]
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
