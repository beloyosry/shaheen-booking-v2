import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logFormData } from "../../../utils";
import { useForm } from "react-hook-form";
import Loading from "../../ui/Loading";
import type { FlightForm, HotelsForm, TripTypes } from "./types";
import HotelSearchForm from "./HotelSearchForm";
import FlightSearchForm from "./FlightSearchForm";

const dateRangeSchema = z.object({
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
});

const flightSchema = z.object({
    tripType: z.string(),
    selectedOption: z.string(),
    from: z.string(),
    to: z.string(),
    date: dateRangeSchema,
    travelers: z.string(),
});
const hotelSchema = z.object({
    to: z.string(),
    date: dateRangeSchema,
    travelers: z.string(),
});

const BookingButton = ({
    activeBtn,
    setActiveBtn,
    title,
    icon,
    btnValue,
    btnClassNames,
}: {
    activeBtn: number;
    setActiveBtn: (value: number) => void;
    title: string;
    icon: React.ReactNode;
    btnValue: number;
    btnClassNames?: string;
}) => {
    const isActive = activeBtn === btnValue;

    return (
        <button
            onClick={() => setActiveBtn(btnValue)}
            className={`flex items-center justify-center px-4 py-2 ${btnClassNames} ${
                isActive
                    ? "bg-primary-500 text-white"
                    : "bg-white text-gray-700"
            } `}
        >
            {/* icon */}
            <span className="mr-2">{icon}</span>

            {/* Button text */}
            <span className="font-medium">{title}</span>
        </button>
    );
};

function BookingSearch() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [activeBtn, setActiveBtn] = useState(0);
    const [tripType, setTripType] = useState<TripTypes>("roundtrip");
    const [selectedOption, setSelectedOption] = useState("Economy");

    const {
        handleSubmit: flightSubmit,
        control: flightControl,
        reset: flightReset,
    } = useForm<FlightForm>({
        resolver: zodResolver(flightSchema),
        defaultValues: {
            tripType: "",
            selectedOption: "",
            from: "",
            to: "",
            date: {
                startDate: null,
                endDate: null,
            },
            travelers: "",
        },
        mode: "onChange",
    });

    const {
        control: hotelControl,
        handleSubmit: hotelSubmit,
        reset: hotelReset,
    } = useForm<HotelsForm>({
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

    const onSubmitFlight = async (formData: FlightForm) => {
        // Check each required field individually for better error messages
        if (!formData.from) {
            return;
        }
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

        // Set the tripType from state
        apiFormData.append("tripType", tripType);

        // Set the selectedOption from state
        apiFormData.append("selectedOption", selectedOption);

        apiFormData.append("from", formData.from);
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

        logFormData(apiFormData, "Flight Form Data");

        // Reset the form
        flightReset();

        // Navigate to the next page
        navigate("/planes");

        setIsLoading(false);
    };

    const onSubmitHotel = async (formData: HotelsForm) => {
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
        hotelReset();

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
        <div className="w-full lg:h-fit sm:mb-[118px] relative z-[100] px-3 mt-10 sm:px-0">
            {/* Container for tabs */}
            <div className="flex w-fit bg-white rounded-tl-lg rounded-tr-4xl rounded-bl-lg">
                {/* Stays tab */}
                <BookingButton
                    activeBtn={activeBtn}
                    setActiveBtn={setActiveBtn}
                    btnValue={1}
                    title="Stays"
                    icon={<span className="text-lg">🏨</span>}
                    btnClassNames="rounded-tl-lg rounded-br-2xl"
                />

                {/* Flights tab */}
                <BookingButton
                    activeBtn={activeBtn}
                    setActiveBtn={setActiveBtn}
                    btnValue={0}
                    title="Flights"
                    icon={<span className="text-lg">✈️</span>}
                    btnClassNames="rounded-tr-4xl rounded-bl-2xl"
                />
            </div>

            {/* Container for the selected booking component */}
            <div className="bg-white rounded-b-3xl rounded-tr-3xl shadow-md">
                {/* Render Hotel search if activeBtn is 1 */}
                {activeBtn === 1 ? (
                    <HotelSearchForm
                        handleFormSubmit={onSubmitHotel}
                        handleSubmit={hotelSubmit}
                        control={hotelControl}
                    />
                ) : null}

                {/* Render Flight search if activeBtn is 0 */}
                {activeBtn === 0 ? (
                    <FlightSearchForm
                        handleFormSubmit={onSubmitFlight}
                        handleSubmit={flightSubmit}
                        control={flightControl}
                        setTripType={setTripType}
                        tripType={tripType}
                        setSelectedOption={setSelectedOption}
                        selectedOption={selectedOption}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default BookingSearch;
