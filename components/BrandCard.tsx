import { Layers, Map, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

type Brand = {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  image: string;
  logo: string;
};

export default function BrandCard({
  name,
  location,
  service,
  rating,
  reviews,
  category,
  description,
  image,
  logo,
  id
}: Brand) {
  return (
    <div
      className="bg-[#F3FAFF] rounded shadow container mx-auto flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12"
      style={{ padding: 0 }}
    >
      {/* Image Section */}
      <div className="w-auto flex-shrink-0 relative">
        <div className="relative w-full h-80 lg:h-full rounded overflow-hidden group ">
          <Image
            width={392}
            height={431}
            src={image}
            alt={name}
            className="w-[392px] h-[431px]  object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center text-center lg:text-left p-4">
        <div className="flex items-center justify-between">
          <div>
  {/* Name with fallback */}
  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
    {name || "Influencer Name"}
  </h1>

  {/* Meta Data Row */}
  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-sm md:text-base text-gray-600 font-medium">
    
    {/* Location Item */}
    <div className="flex items-center gap-2 group">
      <MapPin className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
      <span>{location || "Location not specified"}</span>
    </div>

    {/* Optional Dot Separator (Visible only on larger screens) */}
    <span className="hidden sm:block text-gray-300">•</span>

    {/* Category Item */}
    <div className="flex items-center gap-2 group">
      {/* 'Layers' or 'Tag' is better for categories than a Calendar */}
      <Layers className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
      <span className="uppercase tracking-wide text-xs md:text-sm">
        {category || "General Creator"}
      </span>
    </div>

  </div>
</div>

          <div className="flex items-center mb-6 justify-center lg:justify-start">
            
            <Image
              width={83}
              height={83}
              src={logo}
              alt={`${name} Logo`}
              className=" w-[83px] h-[83px]  ml-auto hidden lg:block"
            />
          </div>
        </div>

        <p className="font-bold text-gray-900 mb-2">Description</p>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="text-center lg:text-left mt-4">
          <button  className="bg-primary text-white font-semibold py-3 px-8 inline-block rounded-lg shadow-md hover:shadow-lg hover:border-2 hover:border-[#001F3F] hover:bg-white hover:text-[#001F3F] transition-all duration-300 cursor-pointer">
           <Link href={`/brands/${id}`}> Explore Brand</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
