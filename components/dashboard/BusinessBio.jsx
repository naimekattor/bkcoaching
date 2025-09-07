import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

export function BusinessBio() {
  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Business Bio</h3>

      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed">
          Premium skincare solutions for modern wellness enthusiasts. We believe in clean beauty that delivers real
          results.
        </p>

        <div>
          <h4 className="font-medium text-slate-800 mb-2">Mission:</h4>
          <p className="text-slate-600">Empowering confidence through science-backed skincare</p>
        </div>

        <div className="flex gap-5">
          <h4 className="font-medium text-slate-800 mb-2">Business:</h4>
          <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            Professional & Caring
          </span>
        </div>

        <div className="flex space-x-3 pt-2">
          <TbWorld />
          <FaInstagram color="red" />
          <FaTiktok />
          <FaYoutube color="red" />
        </div>
      </div>
    </div>
  )
}
