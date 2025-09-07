import Image from "next/image";
import { CiStar } from "react-icons/ci";

export function RecentCollaborations() {
  const collaborations = [
    {
      username: "@beautybyemma",
      followers: "19k followers",
      rating: 4.8,
      avatar:
        "https://i.pinimg.com/236x/db/1f/9a/db1f9a3eaca4758faae5f83947fa807c.jpg",
    },
    {
      username: "@glowgoddess",
      followers: "25k followers",
      rating: 4.9,
      avatar:
        "https://i.pinimg.com/236x/db/1f/9a/db1f9a3eaca4758faae5f83947fa807c.jpg",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        Recent Collaborations
      </h3>

      <div className="space-y-4">
        {collaborations.map((collab, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* ✅ Avatar image instead of span */}
              <Image
                width={40}
                height={40}
                src={collab.avatar}
                alt={collab.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-slate-800">{collab.username}</p>
                <p className="text-sm text-slate-600">{collab.followers}</p>
              </div>
            </div>

            {/* ⭐ Rating */}
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">
                <CiStar size={21} />
              </span>
              <span className="text-sm font-medium text-slate-700">
                {collab.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
