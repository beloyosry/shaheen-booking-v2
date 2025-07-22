import { type Dispatch, type SetStateAction } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import type { HotelProps } from "./types";
import LikeButton from "../../../components/ui/LikeButton";

const HotelCard = ({
    hotel,
    index,
    isHeartClicked,
    setIsHeartClicked,
}: {
    hotel: HotelProps;
    index: number;
    isHeartClicked: boolean[];
    setIsHeartClicked: Dispatch<SetStateAction<boolean[]>>;
}) => {
    return (
        <div className="flex bg-white rounded-[36px] overflow-hidden p-2 h-62 border-gray-500  shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Hotel Image */}
            <div className="relative w-2/4">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover rounded-t-[30px] rounded-bl-[30px]"
                />
                <LikeButton
                    isHeartClicked={isHeartClicked}
                    setIsHeartClicked={setIsHeartClicked}
                    index={index}
                />
            </div>

            {/* Hotel Details */}
            <div className="flex flex-col gap-2 md:gap-5 p-4 w-2/4">
                {/* Hotel Name */}
                <h3 className="w-full text-lg font-semibold text-gray-800 mb-2">
                    {hotel.name}
                </h3>

                {/* Hotel Rating and Location */}
                <div className="flex items-center mb-1">
                    <div className="flex items-center">
                        <FaStar className="text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-700">
                            {hotel.rating}
                        </span>
                    </div>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="flex justify-center items-center text-sm text-gray-400 font-semibold">
                        <FaMapMarkerAlt className="text-primary-500" />{" "}
                        {hotel.location}
                    </span>
                </div>

                {/* Hotel Price */}
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary-500">
                            {hotel.price}$
                        </span>
                        <span className="text-xs text-secondary-500 ml-1">
                            / night
                        </span>
                    </div>
                </div>

                {/* Hotel Amenities */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-primary-50 border border-primary-500 text-xs text-gray-700 rounded-full"
                        >
                            <i
                                className={`${amenity.icon} text-primary-500 mr-0.5`}
                            />{" "}
                            {amenity.title}
                        </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                        <span className="p-1 flex justify-center items-center bg-primary-50 border border-primary-500 text-xs text-gray-700 rounded-full">
                            +{hotel.amenities.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
