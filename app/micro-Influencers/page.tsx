// Removed unused Hero import
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function InfluencersPage() {
  const influencers = [
    {
      name: "John Doe",
      followers: "520k Followers",
      category: "FASHION",
      categoryColor: "bg-pink-500",
      rating: 5,
      bio: "John Doe is a trend-savvy fashion Creator known for blending streetwear with high-end style.",
      price: "$150",
      collaborations: "12 Businesses Worked With",
      image: "/images/influencer/influencer1.jpg",
    },
    {
      name: "Robert Smith",
      followers: "420k Followers",
      category: "BEAUTY",
      categoryColor: "bg-pink-500",
      rating: 4,
      bio: "Robert Smith is a beauty Creator known for his skincare tips and bold, trendsetting makeup looks.",
      price: "$150",
      collaborations: "12 Businesses Worked With",
      image: "/images/influencer/influencer2.jpg",
    },
    {
      name: "Johan",
      followers: "320k Followers",
      category: "FITNESS",
      categoryColor: "bg-pink-500",
      rating: 4,
      bio: "Johan is a dynamic fitness Creator known for his high-energy workouts and motivational lifestyle content.",
      price: "$150",
      collaborations: "12 Businesses Worked With",
      image: "/images/influencer/influencer3.jpg",
    },
    {
      name: "Robert Smith",
      followers: "520k Followers",
      category: "TECH",
      categoryColor: "bg-primary",
      rating: 5,
      bio: "Robert Smith is a tech Creator known for breaking down complex innovations into simple insights.",
      price: "$150",
      collaborations: "12 Businesses Worked With",
      image: "/images/influencer/influencer4.jpg",
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* for hero */}
      <section className="bg-gradient-to-b from-[#ffffff] to-[#E9F4FF]">
        <main className="container mx-auto px-4 pt-16 lg:pt-24">
          <div className="grid lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-8 flex-1 pb-10">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl  font-bold text-primary leading-tight">
                  Your Brand + Their Audience = A Great Match
                </h1>
              </div>

              <p className="text-primary text-[16px] leading-relaxed max-w-lg">
                Explore micro-influencers who know how to keep it real. Find
                voices your customers already trust—and turn everyday
                conversations into brand growth.
              </p>
            </div>

            {/* Right Image (1/3) */}
            <div className="relative lg:col-span-6">
              <Image
                width={833}
                height={519}
                src={"/images/inf-hero.png"}
                alt="Two stylish women representing micro-influencers"
                className="w-full h-auto max-w-md mx-auto lg:max-w-full"
              />
            </div>
          </div>
        </main>
      </section>
      <main className="container mx-auto  py-16 lg:py-[100px]">
        <div>
          {/* <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Browse Influencers
          </h1> */}

          <div className="grid md:grid-cols-2 gap-8">
            {influencers.map((influencer, index) => (
              <div
                key={index}
                className=" bg-white rounded-xl shadow-lg overflow-hidden border"
              >
                {/* Top Section */}
                <div className="flex items-center justify-between">
                  <div className="px-4">
                    {/* Name + Followers */}
                    <h2 className="text-xl font-bold text-gray-900">
                      John Doe
                    </h2>
                    <p className="text-primary font-semibold">520k Followers</p>

                    {/* Stars */}
                    <div className="flex text-secondary mt-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-lg  overflow-hidden border-4 border-white shadow-md bg-gray-100 flex-shrink-0 mx-4 my-4">
  <Image
    src={influencer.image}
    alt={`${influencer.name} profile`}
    width={192}
    height={192}
    className="object-cover w-full h-full"
  />
  <div className="absolute bottom-2 right-2 flex items-center bg-white px-2 py-1 rounded-full shadow">
    <span className="text-pink-500 text-sm mr-1">❤️</span>
    <span
      className={`text-gray-800 text-xs font-semibold `}
    >
      {influencer.category}
    </span>
  </div>
</div>

                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Bio */}
                  <div className="mt-4">
                    <h3 className="text-gray-900 font-bold mb-1">Bio</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      John Doe is a trend-savvy fashion Creator known for
                      blending streetwear with high-end style.
                    </p>
                    <p className="text-gray-700 mt-2 text-sm">
                      <span className="font-semibold">
                        How much they charge:
                      </span>{" "}
                      $150
                    </p>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Collaborations:</span> 12
                      Businesses Worked With
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="bg-sky-950 rounded-md inline-flex justify-center items-center gap-2.5 mt-4 cursor-pointer">
                    <Link
                      href={"/brand-dashboard/influencers/1"}
                      className="bg-primary text-white font-semibold py-3 px-8 inline-block rounded-lg shadow-md hover:shadow-lg hover:border-2 hover:border-[#001F3F] hover:bg-white hover:text-[#001F3F] transition-all duration-300"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
