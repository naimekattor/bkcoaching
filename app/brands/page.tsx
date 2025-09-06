import BrandCard from "@/components/BrandCard";
import Hero from "@/components/hero";

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
      logo: "https://placehold.co/80x80/e0e9d6/658e65?text=Logo",
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
      logo: "https://placehold.co/80x80/cccccc/333333?text=ZS",
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
      logo: "https://placehold.co/80x80/cccccc/333333?text=ZS",
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
      logo: "https://placehold.co/80x80/cccccc/333333?text=ZS",
    },
  ];

  return (
    <section>
      <Hero
        src={"/images/brand-hero.png"}
        heading={"Grow Your Brand with Micro-Influencers"}
        des={
          "Connect with micro-influencers who have loyal, engaged audiences. They bring trust, authenticity, and real conversations that help your brand shine."
        }
      />
      <div className="space-y-12 py-20">
        {brands.map((brand) => (
          <BrandCard key={brand.id} {...brand} />
        ))}
      </div>
    </section>
  );
}
