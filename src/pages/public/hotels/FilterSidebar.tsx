import { FaStar } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

const FilterSidebar = () => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Filter By</h3>
                <IoFilterSharp className="text-primary-500" size={18} />
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Price Range
                </h4>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">0$</span>
                    <span className="text-xs text-gray-500">1,500$</span>
                </div>
                <div className="relative h-1 bg-gray-200 rounded-full">
                    <div className="absolute left-0 right-0 h-full">
                        <div
                            className="absolute bg-primary-500 h-full rounded-full"
                            style={{ width: "70%" }}
                        ></div>
                        <div
                            className="absolute w-4 h-4 bg-white border-2 border-primary-500 rounded-full -mt-1.5"
                            style={{ left: "0%" }}
                        ></div>
                        <div
                            className="absolute w-4 h-4 bg-white border-2 border-primary-500 rounded-full -mt-1.5"
                            style={{ left: "70%" }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Star Rating */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Star Rating
                </h4>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                        <label
                            key={stars}
                            className="flex items-center cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
                            />
                            <span className="ml-2 flex items-center">
                                {Array(stars)
                                    .fill(0)
                                    .map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className="text-yellow-400 text-sm"
                                        />
                                    ))}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Property Type */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Property Type
                </h4>
                <div className="space-y-2">
                    {["Hotel", "Motel", "Resort"].map((type) => (
                        <label
                            key={type}
                            className="flex items-center cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                {type}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Amenities
                </h4>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        "Breakfast",
                        "Pool",
                        "Free WiFi",
                        "Parking",
                        "Pet Friendly",
                        "Spa",
                        "Gym",
                        "Restaurant",
                        "Room Service",
                        "Bar",
                    ].map((amenity) => (
                        <label
                            key={amenity}
                            className="flex items-center cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-xs text-gray-700">
                                {amenity}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Special Features */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Special Features
                </h4>
                <div className="flex flex-wrap gap-2">
                    {[
                        "Beachfront",
                        "City Center",
                        "Family Friendly",
                        "Business",
                    ].map((feature) => (
                        <div
                            key={feature}
                            className="px-3 py-1 bg-gray-100 text-xs text-gray-700 rounded-full"
                        >
                            {feature}
                        </div>
                    ))}
                </div>
            </div>

            {/* Deal Type */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Deal Type
                </h4>
                <div className="space-y-2">
                    {[
                        "Free Cancellation",
                        "Reserve now & pay later",
                        "Properties with special offers",
                    ].map((deal) => (
                        <label
                            key={deal}
                            className="flex items-center cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-primary-500 rounded border-gray-300 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-xs text-gray-700">
                                {deal}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default FilterSidebar;
