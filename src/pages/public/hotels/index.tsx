import z from "zod";
import HotelSearchForm from "../../../components/home/BookingSearch/HotelSearchForm";
import PageLayout from "../../../layout/PageLayout";
import { hotels } from "./fakeData";
import FilterSidebar from "./FilterSidebar";
import HotelCard from "./HotelCard";
import type { HotelsForm } from "../../../components/home/BookingSearch/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logFormData } from "../../../utils";
import Loading from "../../../components/ui/Loading";

const dateRangeSchema = z.object({
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
});
const hotelSchema = z.object({
    to: z.string(),
    date: dateRangeSchema,
    travelers: z.string(),
});

const HotelsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Recommended");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isHeartClicked, setIsHeartClicked] = useState<boolean[]>(
        Array(hotels.length).fill(false)
    );
    const navigate = useNavigate();

    const dropDownListOptions = [
        { label: "Economy", value: "economy" },
        { label: "Premium Economy", value: "premium economy" },
        { label: "Business", value: "business" },
        { label: "First Class", value: "first class" },
    ];

    const { control, handleSubmit, reset } = useForm<HotelsForm>({
        resolver: zodResolver(hotelSchema),
        defaultValues: {
            to: "",
            date: {
                startDate: null,
                endDate: null,
            },
            travelers: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: HotelsForm) => {
        // Check each required field individually for better error messages
        if (!formData.to) {
            return;
        }
        if (!formData.date || !formData.date.startDate) {
            return;
        }
        if (!formData.date.endDate) {
            return;
        }
        if (formData.travelers < "1") {
            return;
        }

        setIsLoading(true);
        const apiFormData = new FormData();

        apiFormData.append("to", formData.to);
        apiFormData.append(
            "startDate",
            formData.date.startDate?.toISOString() || ""
        );
        apiFormData.append(
            "endDate",
            formData.date.endDate?.toISOString() || ""
        );
        apiFormData.append("travelers", formData.travelers);

        logFormData(apiFormData, "Hotel Form Data");

        // Reset the form
        reset();

        // Navigate to the next page
        navigate("/hotels");

        setIsLoading(false);
        //             title: "Success!",
        //         });
        //         reset();
        //         navigate(-1);
        //         setIsLoading(false);
        //     })
        //     .catch((error) => {
        //         setIsLoading(false);
        //         return setErrors(error);
        //     });
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="bg-[#f4f4f4]">
            <PageLayout className="pb-20 px-5 md:px-0">
                {/* Search Form */}
                <div className="bg-white shadow-md border-gray-200 rounded-3xl mt-30 mb-10 ">
                    <HotelSearchForm
                        handleFormSubmit={onSubmit}
                        handleSubmit={handleSubmit}
                        control={control}
                    />
                </div>

                {/* Hotel Listings */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <FilterSidebar />
                    </div>

                    {/* Hotel Listings */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-400">
                                {hotels.length} properties
                            </h1>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowDropdown(!showDropdown)
                                    }
                                    className="flex justify-between items-center gap-1 bg-secondary-100 border-2 border-secondary-500 text-secondary-500 font-medium py-3 px-6 rounded-full text-lg focus:outline-none cursor-pointer"
                                    id="dropdown-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span className="text-xs">
                                        {selectedOption}
                                    </span>
                                    <span className="text-xs">▼</span>
                                </button>
                                {showDropdown && (
                                    <ul
                                        className="absolute top-15 left-1/2 -translate-x-1/2 z-50 w-full bg-white shadow-lg py-1 rounded-xl"
                                        aria-labelledby="dropdown-button"
                                        role="menu"
                                    >
                                        {dropDownListOptions.map((option) => (
                                            <li
                                                key={option.value}
                                                onClick={() =>
                                                    handleOptionClick(
                                                        option.label
                                                    )
                                                }
                                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                role="menuitem"
                                            >
                                                {option.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {hotels.map((hotel, index) => (
                                <HotelCard
                                    key={hotel.id}
                                    hotel={hotel}
                                    index={index}
                                    isHeartClicked={isHeartClicked}
                                    setIsHeartClicked={setIsHeartClicked}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </PageLayout>
        </div>
    );
};

export default HotelsPage;
