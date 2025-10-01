import BrandCard from "@/components/BrandCard";
// Removed unused Hero import
import Image from "next/image";

export default function BrandsPage() {
  const brands = [
    {
      id: 1,
      name: "GlowSkin Care",
      location: "Los Angeles, California, USA",
      service: "Year-Round Service",
      rating: 4.8,
      reviews: 1250,
      category: "Beauty & Wellness",
      description:
        "GlowSkin Care offers organic, dermatologist-approved skincare solutions designed to bring out your natural glow. With cruelty-free products and a focus on sustainability, we make beauty simple and effective.",
      image: "/images/brand-img4.jpg",
      logo: "/images/brand/brand-logo1.png",
    },
    {
      id: 2,
      name: "Zen Spa",
      location: "New York, USA",
      service: "Seasonal Packages",
      rating: 4.6,
      reviews: 890,
      category: "Wellness & Relaxation",
      description:
        "Zen Spa is a sanctuary for relaxation and rejuvenation. Our therapists combine traditional and modern techniques to deliver a holistic healing experience.",
      image: "/images/brand-img3.jpg",
      logo: "/images/brand/brand-logo2.png",
    },
    {
      id: 3,
      name: "Zen Spa",
      location: "New York, USA",
      service: "Seasonal Packages",
      rating: 4.6,
      reviews: 890,
      category: "Wellness & Relaxation",
      description:
        "Zen Spa is a sanctuary for relaxation and rejuvenation. Our therapists combine traditional and modern techniques to deliver a holistic healing experience.",
      image: "/images/brand-img2.jpg",
      logo: "/images/brand/brand-logo3.png",
    },
    {
      id: 4,
      name: "Zen Spa",
      location: "New York, USA",
      service: "Seasonal Packages",
      rating: 4.6,
      reviews: 890,
      category: "Wellness & Relaxation",
      description:
        "Zen Spa is a sanctuary for relaxation and rejuvenation. Our therapists combine traditional and modern techniques to deliver a holistic healing experience.",
      image: "/images/brand-img1.jpg",
      logo: "/images/brand/brand-logo4.png",
    },
  ];

  return (
    <section>
      <section className="bg-gradient-to-b from-[#ffffff] to-[#E9F4FF]">
        <main className="container mx-auto px-4 pt-8 lg:pt-16">
          <div className="grid lg:grid-cols-2 gap-2 items-center">
            {/* Left Content */}
            <div className="lg:col-span-1 space-y-8 flex-1 ">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl  font-bold text-primary leading-tight">
                  Discover Brands You’ll Love Sharing
                </h1>
              </div>

              <p className="text-primary text-[16px] leading-relaxed max-w-lg">
                Browse campaigns from brands that value your authentic voice.
                Choose partnerships that fit your style, share them with your
                audience, and get paid for creating real influence.
              </p>
            </div>

            {/* Right Image (1/3) */}
            <div className="relative">
              <Image
                width={833}
                height={519}
                src={"/images/brand-hero.png"}
                alt="Two stylish women representing micro-influencers"
                className="w-full h-auto max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </main>
      </section>
      <div className="space-y-12 py-20">
        {brands.map((brand) => (
          <BrandCard key={brand.id} {...brand} />
        ))}
      </div>
    </section>
  );
}
