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
}: Brand) {
  return (
    <div className="bg-[#F3FAFF] rounded shadow container mx-auto flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
      {/* Image Section */}
      <div className="w-auto flex-shrink-0 relative">
        <div className="relative w-full h-80 lg:h-full rounded overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-[392px] h-[431px] object-cover "
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center text-center lg:text-left p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {name}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 mb-4">
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📍</span>
                <span>{location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">🗓</span>
                <span>{service}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-6 justify-center lg:justify-start">
            <div className="text-center sm:text-left">
              <p className="text-gray-600 text-sm">{category}</p>
              <div className="flex items-center justify-center lg:justify-start space-x-1">
                <p className="text-lg font-bold text-gray-900">{rating}</p>
                <span className="text-gray-500 text-sm">
                  ({reviews.toLocaleString()} Reviews)
                </span>
              </div>
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(rating) ? "fill-current" : "opacity-30"
                    }
                  />
                ))}
              </div>
            </div>
            <img
              src={logo}
              alt={`${name} Logo`}
              className="rounded-full shadow-lg ml-auto hidden lg:block"
            />
          </div>
        </div>

        <p className="font-bold text-gray-900 mb-2">Description</p>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="text-left lg:text-left mt-4">
          <button className="bg-primary text-white font-semibold py-3 px-8 inline-block rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-300">
            Explore Brand
          </button>
        </div>
      </div>
    </div>
  );
}
