import { useCallback, useEffect, useRef, useState } from "react";
import "./Hotels.css";

import { Link } from "react-router-dom";
import { useHotelsStore } from "../../store/hotels.store";

function Hotels() {
    // Get state and actions from Zustand stores
    const { hotels, getHotelCodesByCity } = useHotelsStore();
    const [isLoading, setIsLoading] = useState(false);

    const [retryCount, setRetryCount] = useState(0);
    const [lastCityCode, setLastCityCode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Function to fetch hotels for a specific city
    const fetchHotelsForCity = useCallback(
        async (cityCode: string) => {
            if (cityCode) {
                setIsLoading(true);
                await getHotelCodesByCity(cityCode);
                setLastCityCode(cityCode);
            }
        },
        [getHotelCodesByCity, setIsLoading]
    );

    // Check if city has changed
    const checkForCityChange = useCallback(() => {
        try {
            const currencyData = localStorage.getItem("shaheen-currency");
            if (currencyData) {
                const { code } = JSON.parse(currencyData);
                if (code && code !== lastCityCode) {
                    // Set loading state and fetch hotels for the new city
                    setIsLoading(true);
                    fetchHotelsForCity(code);
                }
            }
        } catch (error) {
            console.error("Error checking for city change:", error);
            setIsLoading(false);
        }
    }, [lastCityCode, fetchHotelsForCity, setIsLoading]);

    // Listen for currency changes
    useEffect(() => {
        // Function to handle storage events
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "shaheen-currency") {
                checkForCityChange();
            }
        };

        // Add event listener
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [checkForCityChange]);

    // Initial load of hotels
    useEffect(() => {
        // Check for city code and fetch hotels
        checkForCityChange();

        // If no hotels after a delay, retry a few times
        if (hotels.length === 0 && retryCount < 3) {
            timeoutRef.current = setTimeout(() => {
                setRetryCount((prev) => prev + 1);
                checkForCityChange();
            }, 1000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [retryCount, checkForCityChange, hotels.length]);

    // Get star rating display
    const getStarRating = (rating: string) => {
        switch (rating) {
            case "OneStar":
                return "⭐";
            case "TwoStar":
                return "⭐⭐";
            case "ThreeStar":
                return "⭐⭐⭐";
            case "FourStar":
                return "⭐⭐⭐⭐";
            case "FiveStar":
                return "⭐⭐⭐⭐⭐";
            default:
                return "";
        }
    };

    return (
        <div className="hotels-container" ref={containerRef}>
            <h2 className="text-[20px] font-bold text-[#252525] pb-3 mb-3 border-b-[2px] border-b-[#D9D9D933]">
                Available Hotels
            </h2>

            {isLoading ? (
                <div className="loading-indicator flex items-center justify-center p-4">
                    <div className="spinner w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin mr-2"></div>
                    <p>Loading hotels...</p>
                </div>
            ) : hotels.length > 0 ? (
                <div className="hotels-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotels.map((hotel, index) => (
                        <Link
                            to={`/hotels/${hotel.HotelCode}`}
                            className="hotel-card p-4 border rounded-lg hover:shadow-md transition-shadow"
                            key={`${hotel.HotelCode}-${index}`}
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                {hotel.HotelName}
                            </h3>
                            <div className="hotel-rating mb-2">
                                {getStarRating(hotel.HotelRating)}
                            </div>
                            <p className="hotel-location text-sm mb-1">
                                <strong>Location:</strong> {hotel.CityName},{" "}
                                {hotel.CountryName}
                            </p>
                            <p className="hotel-address text-sm text-gray-600">
                                <strong>Address:</strong> {hotel.Address}
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="no-hotels-message p-4 text-center bg-gray-100 rounded-lg">
                    <p>No hotels found. Please select a different city.</p>
                </div>
            )}
        </div>
    );
}

export default Hotels;
