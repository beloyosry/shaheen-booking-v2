import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import type { HotelProps } from "./types";

const HotelCard = ({ hotel }: { hotel: HotelProps }) => {
    const [isFavorite, setIsFavorite] = useState(hotel.isFavorite || false);

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                />
                <button
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    {isFavorite ? (
                        <FaHeart className="text-red-500" size={16} />
                    ) : (
                        <FaRegHeart className="text-gray-400" size={16} />
                    )}
                </button>
            </div>

            <div className="p-4">
                <div className="flex items-center mb-1">
                    <div className="flex items-center">
                        <FaStar className="text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-700">
                            {hotel.rating}
                        </span>
                    </div>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">
                        {hotel.location}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {hotel.name}
                </h3>

                <div className="flex flex-wrap gap-1 mb-3">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full"
                        >
                            {amenity}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-lg font-bold text-primary-500">
                            ${hotel.price}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                            / night
                        </span>
                    </div>
                    <button className="px-3 py-1 bg-primary-500 text-white text-sm rounded-full hover:bg-primary-600 transition-colors">
                        Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
