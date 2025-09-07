// Removed unused Hero import
import Image from "next/image";
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
      categoryColor: "bg-blue-500",
      rating: 5,
      bio: "Robert Smith is a tech Creator known for breaking down complex innovations into simple insights.",
      price: "$150",
      collaborations: "12 Businesses Worked With",
      image: "/images/influencer/influencer4.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* for hero */}
      <section className="bg-gradient-to-b from-[#ffffff] to-[#E9F4FF]">
        <main className="container mx-auto px-4 pt-16 lg:pt-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-8 flex-1">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl  font-bold text-primary leading-tight">
                  Micro-influencers.{" "}
                  <span className="text-primary">Mega results.</span>
                </h1>
              </div>

              <p className="text-primary text-[16px] leading-relaxed max-w-lg">
                The Social Market is where brands and micro-influencers team up.
                Brands get affordable, authentic marketing. Micro-influencers
                get paid to share services. They actually love. It&apos;s
                word-of-mouth, made smarter, faster, and scalable.
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
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          {/* <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Browse Influencers
          </h1> */}

          <div className="grid md:grid-cols-2 gap-8">
            {influencers.map((influencer, index) => (
              <div key={index} className="max-w-md bg-white rounded-xl shadow-lg overflow-hidden border">
                {/* Top Section */}
                <div className="flex items-center">
                  <div className="px-4">
                    {/* Name + Followers */}
                    <h2 className="text-xl font-bold text-gray-900">
                      John Doe
                    </h2>
                    <p className="text-blue-600 font-semibold">
                      520k Followers
                    </p>

                    {/* Stars */}
                    <div className="flex text-yellow-400 mt-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={influencer.image}
                      alt="Creator"
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex items-center bg-white px-3 py-1 rounded-full shadow">
                      <span className="text-pink-500 text-lg mr-1">❤️</span>
                      <span className="text-gray-800 text-sm font-semibold">
                        FASHION
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
                  <div className="flex space-x-3 mt-5">
                    <button className="flex-1 bg-primary text-white font-semibold py-2 rounded-md shadow cursor-pointer transition">
                      View Profile
                    </button>
                    <button className="flex-1 border border-gray-400 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-100 transition">
                      Comment
                    </button>
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
