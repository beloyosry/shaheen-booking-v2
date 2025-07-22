import InputField from "../../../components/form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const filterSchema = z.object({
    hotelTypes: z.array(z.string()),
    priceRange: z.object({
        min: z.number(),
        max: z.number(),
    }),
    stayOptions: z.array(z.string()),
    amenities: z.array(z.string()),
    benefits: z.array(z.string()),
    locations: z.array(z.string()),
    neighborhood: z.array(z.string()),
    paymentType: z.array(z.string()),
    propertyType: z.array(z.string()),
    starRating: z.array(z.number()),
});

const SectionWrapper = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="mb-6 bg-[#fafafa] p-2 rounded-t-2xl">
        <h4 className="text-sm font-medium text-gray-500 mb-2">{title}</h4>
        {children}
    </div>
);

const FilterSidebar = () => {
    const { control } = useForm({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            hotelTypes: [],
            priceRange: {
                min: 0,
                max: 1500,
            },
            stayOptions: [],
            starRating: [],
            amenities: [],
            benefits: [],
            locations: [],
            neighborhood: [],
            paymentType: [],
            propertyType: [],
        },
        mode: "onChange",
    });

    return (
        <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Filter By</h3>
            </div>

            {/* Popular Filters */}
            <SectionWrapper title="Popular Filters">
                <div className="space-y-2">
                    {["Hotel", "Motel", "Resort"].map((type) => (
                        <InputField
                            key={type}
                            name={`hotelTypes`}
                            control={control}
                            placeholder={type}
                            type="checkbox"
                            valueToSet={type}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Price Range */}
            <SectionWrapper title="Price Range">
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
            </SectionWrapper>

            {/* Stay options */}
            <SectionWrapper title="Stay options">
                <div className="space-y-2">
                    {["Hotel", "Motel", "Resort"].map((type) => (
                        <InputField
                            key={type}
                            name={`stayOptions`}
                            control={control}
                            placeholder={type}
                            type="checkbox"
                            valueToSet={type}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Amenities */}
            <SectionWrapper title="Amenities">
                <div className="flex flex-wrap gap-2">
                    {[
                        {
                            title: "Breakfast",
                            icon: "fa fa-coffee",
                        },
                        {
                            title: "Pool",
                            icon: "fa fa-swimming-pool",
                        },
                        {
                            title: "Free WiFi",
                            icon: "fa fa-wifi",
                        },
                        {
                            title: "Parking",
                            icon: "fa fa-parking",
                        },
                        {
                            title: "Pet Friendly",
                            icon: "fa fa-paw",
                        },
                        {
                            title: "Spa",
                            icon: "fa fa-spa",
                        },
                        {
                            title: "Gym",
                            icon: "fa fa-dumbbell",
                        },
                        {
                            title: "Restaurant",
                            icon: "fa fa-utensils",
                        },
                        {
                            title: "Room Service",
                            icon: "fa fa-hotel",
                        },
                        {
                            title: "Bar",
                            icon: "fa fa-wine-bottle",
                        },
                    ].map((amenity) => (
                        <InputField
                            key={amenity.title}
                            name={`amenities`}
                            control={control}
                            placeholder={amenity.title}
                            type="checkbox"
                            valueToSet={amenity.title}
                            amenity={{
                                icon: amenity.icon,
                                title: amenity.title,
                            }}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* One Key benefits and discounts */}
            <SectionWrapper title="One Key benefits and discounts">
                <div className="space-y-2">
                    {["Hotel", "Motel", "Resort"].map((type) => (
                        <InputField
                            key={type}
                            name={`benefits`}
                            control={control}
                            placeholder={type}
                            type="checkbox"
                            valueToSet={type}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Popular locations */}
            <SectionWrapper title="Popular locations">
                <div className="space-y-2">
                    {[
                        "Hotel",
                        "Motel",
                        "Resort",
                        "Hotel",
                        "Motel",
                        "Resort",
                    ].map((type) => (
                        <InputField
                            key={type}
                            name={`locations`}
                            control={control}
                            placeholder={type}
                            type="checkbox"
                            valueToSet={type}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Neighborhood */}
            <SectionWrapper title="Neighborhood">
                <div className="space-y-2">
                    {[
                        "Hotel",
                        "Motel",
                        "Resort",
                        "Hotel",
                        "Motel",
                        "Resort",
                    ].map((type) => (
                        <InputField
                            key={type}
                            name={`neighborhood`}
                            control={control}
                            placeholder={type}
                            type="checkbox"
                            valueToSet={type}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Payment type */}
            <SectionWrapper title="Payment type">
                <div className="space-y-2">
                    {[
                        "Hotel",
                        "Motel",
                        "Resort",
                        "Hotel",
                        "Motel",
                        "Resort",
                    ].map((type) => (
                        <InputField
                            key={type}
                            name={`paymentType`}
                            control={control}
                            placeholder={type}
                            type="checkbox"
                            valueToSet={type}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Property type */}
            <SectionWrapper title="Property type">
                <div className="space-y-2">
                    {[
                        "Hotel",
                        "Motel",
                        "Resort",
                        "Hotel",
                        "Motel",
                        "Resort",
                    ].map((type) => (
                        <InputField
                            key={type}
                            name={`propertyType`}
                            control={control}
                            placeholder={type}
                            type="checkbox"
                            valueToSet={type}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Star rating */}
            <SectionWrapper title="Star rating">
                <div className="space-y-2">
                    {[
                        "Hotel",
                        "Motel",
                        "Resort",
                        "Hotel",
                        "Motel",
                        "Resort",
                    ].map((type) => (
                        <InputField
                            key={type}
                            name={`starRating`}
                            control={control}
                            placeholder={type}
                            type="checkbox"
                            valueToSet={type}
                        />
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
};
export default FilterSidebar;
