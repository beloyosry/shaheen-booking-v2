import RangeSlider from "react-range-slider-input";
import InputField from "../../../components/form/InputField";
import {
    useForm,
    Controller,
    useFormContext,
    FormProvider,
    useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect } from "react";

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

type FilterFormValues = z.infer<typeof filterSchema>;

const SectionWrapper = ({
    title,
    children,
    name,
}: {
    title: string;
    children: React.ReactNode;
    name: keyof FilterFormValues;
}) => {
    const { control, setValue } = useFormContext<FilterFormValues>();

    const watchedValue = useWatch({
        name: name as any,
        control,
    });

    let hasValues = false;
    if (name === "priceRange") {
        hasValues =
            watchedValue && (watchedValue.min > 0 || watchedValue.max > 0);
    } else {
        hasValues = Array.isArray(watchedValue) && watchedValue.length > 0;
    }

    return (
        <div className="mb-6 bg-[#fafafa] p-2 rounded-t-2xl">
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                    {title}
                </h4>
                {hasValues && (
                    <button
                        type="button"
                        onClick={() => {
                            if (name === "priceRange") {
                                setValue(
                                    name,
                                    { min: 0, max: 0 },
                                    { shouldDirty: true }
                                );
                            } else {
                                setValue(name, [], { shouldDirty: true });
                            }
                            console.log(`Reset ${name} filter`);
                        }}
                        className="text-sm font-medium text-primary-500 mb-2 cursor-pointer hover:underline"
                    >
                        reset
                    </button>
                )}
            </div>
            {children}
        </div>
    );
};

const FilterSidebar = () => {
    const methods = useForm({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            hotelTypes: [],
            priceRange: {
                min: 0,
                max: 0,
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

    const onSubmit = (data: any) => {
        console.log("Filter changed:", data);
    };

    useEffect(() => {
        const subscription = methods.watch((_, { type }) => {
            if (type === "change") {
                methods.handleSubmit(onSubmit)();
            }
        });

        return () => subscription.unsubscribe();
    }, [methods, onSubmit]);

    return (
        <div className="bg-white p-5 rounded-lg shadow-sm">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-800">
                            Filter By
                        </h3>
                    </div>

                    {/* Popular Filters */}
                    <SectionWrapper title="Popular Filters" name="hotelTypes">
                        <div className="space-y-2">
                            {["Hotel", "Motel", "Resort"].map((type, index) => (
                                <InputField
                                    key={`popular-${type}-${index}`}
                                    name={`hotelTypes`}
                                    control={methods.control}
                                    placeholder={type}
                                    type="checkbox"
                                    valueToSet={type}
                                />
                            ))}
                        </div>
                    </SectionWrapper>

                    {/* Price Range */}
                    <SectionWrapper title="Price Range" name="priceRange">
                        <Controller
                            name="priceRange"
                            control={methods.control}
                            render={({ field }) => {
                                const minVal = field.value.min || 0;
                                const maxVal = field.value.max || 1000;

                                return (
                                    <div className="price-range-container">
                                        <div className="w-full flex justify-between items-center mb-5">
                                            <div className="border border-gray-300 rounded-2xl px-5 py-2 text-center">
                                                <p className="text-xs text-gray-500">
                                                    Min
                                                </p>
                                                <p className="text-xs font-medium text-primary-500">
                                                    {minVal}$
                                                </p>
                                            </div>
                                            <div className="border border-gray-300 rounded-2xl px-5 py-2 text-center">
                                                <p className="text-xs text-gray-500">
                                                    Max
                                                </p>
                                                <p className="text-xs font-medium text-primary-500">
                                                    {maxVal}$
                                                </p>
                                            </div>
                                        </div>

                                        <RangeSlider
                                            id="price-range-slider"
                                            className="range-slider"
                                            value={[minVal, maxVal]}
                                            min={0}
                                            max={10000}
                                            step={10}
                                            onInput={(value) => {
                                                if (
                                                    Array.isArray(value) &&
                                                    value.length === 2
                                                ) {
                                                    field.onChange({
                                                        min: Math.round(
                                                            value[0]
                                                        ),
                                                        max: Math.round(
                                                            value[1]
                                                        ),
                                                    });
                                                }
                                            }}
                                        />
                                    </div>
                                );
                            }}
                        />
                    </SectionWrapper>

                    {/* Stay options */}
                    <SectionWrapper title="Stay options" name="stayOptions">
                        <div className="space-y-2">
                            {["Hotel", "Motel", "Resort"].map((type, index) => (
                                <InputField
                                    key={`stay-${type}-${index}`}
                                    name={`stayOptions`}
                                    control={methods.control}
                                    placeholder={type}
                                    type="checkbox"
                                    valueToSet={type}
                                />
                            ))}
                        </div>
                    </SectionWrapper>

                    {/* Amenities */}
                    <SectionWrapper title="Amenities" name="amenities">
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
                                    control={methods.control}
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
                    <SectionWrapper
                        title="One Key benefits and discounts"
                        name="benefits"
                    >
                        <div className="space-y-2">
                            {["Hotel", "Motel", "Resort"].map((type, index) => (
                                <InputField
                                    key={`benefit-${type}-${index}`}
                                    name={`benefits`}
                                    control={methods.control}
                                    placeholder={type}
                                    type="checkbox"
                                    valueToSet={type}
                                />
                            ))}
                        </div>
                    </SectionWrapper>

                    {/* Popular Locations */}
                    <SectionWrapper title="Popular Locations" name="locations">
                        <div className="space-y-2">
                            {[
                                "Hotel",
                                "Motel",
                                "Resort",
                                "Hotel",
                                "Motel",
                                "Resort",
                            ].map((type, index) => (
                                <InputField
                                    key={`location-${type}-${index}`}
                                    name={`locations`}
                                    control={methods.control}
                                    placeholder={type}
                                    type="checkbox"
                                    valueToSet={type}
                                />
                            ))}
                        </div>
                    </SectionWrapper>

                    {/* Neighborhood */}
                    <SectionWrapper title="Neighborhood" name="neighborhood">
                        <div className="space-y-2">
                            {[
                                "Hotel",
                                "Motel",
                                "Resort",
                                "Hotel",
                                "Motel",
                                "Resort",
                            ].map((type, index) => (
                                <InputField
                                    key={`neighborhood-${type}-${index}`}
                                    name={`neighborhood`}
                                    control={methods.control}
                                    placeholder={type}
                                    type="checkbox"
                                    valueToSet={type}
                                />
                            ))}
                        </div>
                    </SectionWrapper>

                    {/* Payment type */}
                    <SectionWrapper title="Payment type" name="paymentType">
                        <div className="space-y-2">
                            {[
                                "Hotel",
                                "Motel",
                                "Resort",
                                "Hotel",
                                "Motel",
                                "Resort",
                            ].map((type, index) => (
                                <InputField
                                    key={`payment-${type}-${index}`}
                                    name={`paymentType`}
                                    control={methods.control}
                                    placeholder={type}
                                    type="checkbox"
                                    valueToSet={type}
                                />
                            ))}
                        </div>
                    </SectionWrapper>

                    {/* Property type */}
                    <SectionWrapper title="Property type" name="propertyType">
                        <div className="space-y-2">
                            {[
                                "Hotel",
                                "Motel",
                                "Resort",
                                "Hotel",
                                "Motel",
                                "Resort",
                            ].map((type, index) => (
                                <InputField
                                    key={`property-${type}-${index}`}
                                    name={`propertyType`}
                                    control={methods.control}
                                    placeholder={type}
                                    type="checkbox"
                                    valueToSet={type}
                                />
                            ))}
                        </div>
                    </SectionWrapper>

                    {/* Star rating */}
                    <SectionWrapper title="Star rating" name="starRating">
                        <div className="space-y-2">
                            {[
                                "Hotel",
                                "Motel",
                                "Resort",
                                "Hotel",
                                "Motel",
                                "Resort",
                            ].map((type, index) => (
                                <InputField
                                    key={`star-${type}-${index}`}
                                    name={`starRating`}
                                    control={methods.control}
                                    placeholder={type}
                                    type="checkbox"
                                    valueToSet={type}
                                />
                            ))}
                        </div>
                    </SectionWrapper>
                </form>
            </FormProvider>
        </div>
    );
};

export default FilterSidebar;
