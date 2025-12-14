import BrandCard from "@/components/BrandCard";
import { apiClient } from "@/lib/apiClient";
import Image from "next/image";
export interface BrandProfile {
  id: number;
  business_name: string | null;
  display_name: string | null;
  business_type: string | null;
  logo: string | null;
  short_bio: string | null;
  keyword_hashtags: string | null;
  audience_demographic: string | null;
  brand_tone: string | null;
  choosen_plan: string | null;
  designation: string | null;
  instagram_handle: string | null;
  linkedin_profile: string | null;
  tiktok_handle: string | null;
  x_handle: string | null;
  whatsapp_business: string | null;
  website: string | null;
  timezone: string | null;
  targeted_audience: string | null;
  mission: string | null;
}
interface Brand{
  id:Number;
}
interface BrandApiResponse {
  id: any;
  brand_profile: BrandProfile;
  brand:Brand;
}
export default async function BrandsPage() {
  async function fetchBrands() {
    const res = await apiClient("user_service/get_all_brands/", {
      method: "GET",
    });

    const items: BrandApiResponse[] = res?.data ?? [];
    console.log(items);

    return items.map((brand: BrandApiResponse) => ({
      id: brand?.id,
      name:
        brand?.brand_profile?.display_name ||
        brand?.brand_profile?.business_name ||
        "Unnamed",
      location: brand?.brand_profile?.timezone || "Not provided",
      category: brand?.brand_profile?.business_type
        ? brand.brand_profile.business_type.split("–")[0].trim()
        : "General",
      description: brand?.brand_profile?.short_bio || "",
      image: brand?.brand_profile?.logo || "/images/placeholder.jpg",
      logo: brand?.brand_profile?.logo || "/images/placeholder.jpg",
      service: "Brand Campaign",
      rating: 4.5,
      reviews: 0,
    }));
  }

  const brands = await fetchBrands();

  return (
    <section>
      <section className="bg-gradient-to-b ">
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
                src={"/images/brand-hero1.png"}
                alt="Two stylish women representing micro-influencers"
                className="w-full h-auto max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </main>
      </section>
      <div className="container mx-auto px-4 space-y-12 py-16 lg:py-[100px]">
        {brands.slice(0, 15).map((brand) => (
          <BrandCard key={brand.id} {...brand} />
        ))}
      </div>
    </section>
  );
}
