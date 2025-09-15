"use client";

import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "1. I’m a brand. How does it work?",
    answer:
      " You tell us what kind of people you’d like representing your product — and we introduce you to micro-influencers who fit. If you see someone you’d like to work with, we call that a Market Match. They share your product with their community in a natural way, and you get results you can actually measure.",
  },
  {
    question: "2. I’m a micro-influencer. How do I get started?",
    answer:
      "Create a profile, share what kinds of products you actually love, and wait for brands to find you. Once a Market Match is made, you’ll receive the product (sometimes plus payment) to post about in your own voice. No scripts, no gimmicks — just you being you.",
  },
  {
    question:
      "3. I don’t consider myself an “influencer,” but I’d post about products if I got paid. Can I join?",
    answer:
      "Yes! That’s exactly who we’re built for. If you’ve got people who trust your recommendations — whether that’s a few hundred Instagram followers, your WhatsApp groups, or your gym buddies — you’re eligible for Market Matches. You don’t need a blue check to be valuable here.",
  },
  {
    question: "4. How do Market Matches actually work?",
    answer:
      " A Market Match happens when a brand and an everyday voice (you!) agree to collaborate. You’ll see the details upfront: what you’ll receive, what kind of post is expected, and when payment (if included) is sent. Clear, simple, no guesswork.",
  },
  {
    question: "5. How do I get paid?",
    answer:
      "Payment terms vary by campaign. Some are product-only, others include payment, and some are a mix. Either way, you’ll always know before you accept a Market Match.",
  },
  {
    question: "6. How much does this cost for brands?",
    answer:
      "Far less than ads or celebrity campaigns. Costs depend on how many Market Matches you’d like and your campaign goals. We make sure brands of all sizes — from new launches to established players — can find the right fit.",
  },
  {
    question: "7. How do I know if it’s working?",
    answer:
      "Every campaign comes with measurable results: engagement, reach, and conversions. You’ll see how your Market Matches perform in real numbers.",
  },
  {
    question:
      "8. Do I need thousands of followers to join as a micro-influencer?",
    answer:
      "Nope. We prioritize trust over follower count. If people pay attention to what you recommend, you’re a good fit.",
  },
  {
    question: "9. What kinds of brands use The Social Market?",
    answer:
      "Mostly lifestyle, beauty, wellness, fashion, parenting, food, and fitness brands — but honestly, any product that real people use and talk about is a good candidate.",
  },
  {
    question: "10. How do I join?",
    answer:
      "Brands: sign up, tell us your goals, and start making Market Matches. Micro-influencers: create your profile, share what excites you, and get ready for brands to find you.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Illustration */}
        <div className="flex justify-center">
          <Image
            src="/images/faq.png"
            alt="FAQ Illustration"
            width={500}
            height={400}
            className="w-full max-w-sm lg:max-w-md"
          />
        </div>

        {/* Right FAQ */}
        <div>
          <h2 className="text-[40px] font-bold mb-8 text-primary">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex justify-between items-center w-full text-left text-primary text-[24px] font-medium  "
                >
                  {faq.question}
                  {/* <span className="">{openIndex === index ? "−" : "+"}</span> */}
                </button>

                {openIndex === index && (
                  <p className="mt-2 text-primary text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
