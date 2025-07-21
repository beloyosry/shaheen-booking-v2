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
    const navigate = useNavigate();

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

    if (isLoading) return <Loading />;

    return (
        <PageLayout>
            <div className="bg-white shadow-md border-gray-200 rounded-3xl mt-30 mb-10">
                <HotelSearchForm
                    handleFormSubmit={onSubmit}
                    handleSubmit={handleSubmit}
                    control={control}
                />
            </div>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    28 properties
                </h1>
                <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                    <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500">
                        <option>Recommended</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Rating</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Filter Sidebar */}
                <div className="w-full md:w-1/4 lg:w-1/5">
                    <FilterSidebar />
                </div>

                {/* Hotel Listings */}
                <div className="w-full md:w-3/4 lg:w-4/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.map((hotel) => (
                            <HotelCard key={hotel.id} hotel={hotel} />
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default HotelsPage;
