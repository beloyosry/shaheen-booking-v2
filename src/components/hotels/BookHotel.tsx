import { useLocation, useNavigate } from "react-router-dom";
import { useCurrencyStore } from "../../store/currency.store";
import DatePicker from "../DatePicker";
import DropDown from "../DropDown";
import { useEffect, useState } from "react";
import { useLoadingStore } from "../../store/loading.store";
import { useHotelsStore } from "../../store/hotels.store";
import { useSearchStore } from "../../store/search.store";
import { format } from "date-fns";
import { useFormik } from "formik";
import RomesInfo from "./RomesInfo";
import { useSetLocale } from "../../hooks/useLocale";
import axios from "axios";

type Country = {
    name: string;
    code?: string;
    entityId?: string;
    country?: {
        name: string;
    };
};

function BookHotel() {
    const { countriesData } = useCurrencyStore();
    const { getHotelCodesByCity } = useHotelsStore();
    const { isLoading, setIsLoading } = useLoadingStore();
    const pathname = useLocation();
    const navigate = useNavigate();

    const [originCountry, setOriginCountry] = useState<any>(null);

    useEffect(() => {
        const fetchCitiesForStoredCountry = async () => {
            try {
                // Get stored country from localStorage
                const storedCountryData =
                    localStorage.getItem("shaheen-currency");
                if (!storedCountryData) {
                    // If no stored country, set a default
                    setOriginCountry({ name: "القاهرة" });
                    setIsLoading(false);
                    return;
                }

                const parsedCountryData = JSON.parse(storedCountryData);
                const countryCode = parsedCountryData.code;
                const storedCity = parsedCountryData.city;

                if (!countryCode || !storedCity) {
                    setOriginCountry({ name: "القاهرة" });
                    setIsLoading(false);
                    return;
                }

                // Fetch cities for the country code
                const response = await axios.post("/regions/cities", {
                    country_code: countryCode,
                });

                if (
                    response.data &&
                    response.data.success &&
                    Array.isArray(response.data.data)
                ) {
                    const cities = response.data.data;

                    // Try to find the stored city in the response
                    const matchedCity = cities.find(
                        (city: any) =>
                            city.name.toLowerCase() === storedCity.toLowerCase()
                    );

                    let selectedCity;

                    if (matchedCity) {
                        // If found, set it as the default city
                        selectedCity = {
                            name: matchedCity.name,
                            code: matchedCity.code,
                            entityId: matchedCity.code, // Assuming entityId is the same as code
                        };
                        setOriginCountry(selectedCity);
                    } else {
                        // If not found, use the first city in the list
                        if (cities.length > 0) {
                            selectedCity = {
                                name: cities[0].name,
                                code: cities[0].code,
                                entityId: cities[0].code,
                            };
                            setOriginCountry(selectedCity);
                        } else {
                            // Fallback to default
                            selectedCity = { name: "القاهرة" };
                            setOriginCountry(selectedCity);
                        }
                    }

                    // Fetch hotel codes for the selected city
                    if (selectedCity && selectedCity.code) {
                        getHotelCodesByCity(selectedCity.code);
                    }
                } else {
                    // Fallback to default if API call fails
                    setOriginCountry({ name: "القاهرة" });
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
                setOriginCountry({ name: "القاهرة" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchCitiesForStoredCountry();
    }, []);

    const handleCitySelection = (selectedCity: Country) => {
        setOriginCountry(selectedCity);

        if (selectedCity && selectedCity.code) {
            getHotelCodesByCity(selectedCity.code);
        }
    };

    const handleSubmit = (values: any) => {
        const { searchHotels } = useSearchStore.getState();
        return searchHotels(values).finally(() => {
            if (pathname.pathname !== "/hotels") {
                navigate("/hotels");
            }
        });
    };

    const convertDateFormat = (date: Date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        return formattedDate;
    };

    // Create formik instance with default values
    const formik = useFormik({
        initialValues: {
            CheckIn: convertDateFormat(new Date()),
            CheckOut: convertDateFormat(
                new Date(new Date().setDate(new Date().getDate() + 1))
            ),
            adults: 1,
            rooms: 1,
            children: 0,
        },
        onSubmit: handleSubmit,
    });

    const [visible, setVisible] = useState({
        roomInfo: false,
        transferCountryLocation: false,
    });

    // Call the locale hook to set up Arabic locale
    useSetLocale();

    useEffect(() => {
        if (!originCountry || isLoading) return;

        if (!originCountry.entityId && !originCountry.code) return;

        formik.setFieldValue(
            "destinationEntityId",
            originCountry.entityId || originCountry.code
        );

        if (originCountry.code) {
            getHotelCodesByCity(originCountry.code);
        }
    }, [originCountry]);

    return (
        <form onSubmit={formik.handleSubmit} className="py-2">
            <div className="flex items-center justify-center lg:justify-between mb-[22px] mt-3 lg:mt-0">
                <h3 className="text-[20px] font-bold">اين تود المبيت</h3>

                <button className="min-btn w-[112.175px] hidden lg:inline-block">
                    بحث
                </button>
            </div>

            <div className="flex items-center flex-wrap lg:flex-nowrap gap-[18px] lg:gap-0">
                <DropDown
                    items={countriesData}
                    searchList={countriesData}
                    visible={visible?.transferCountryLocation}
                    setVisible={setVisible}
                    formik={formik}
                    fieldname={"destinationEntityId"}
                    classNames={"lg:w-[calc(95%/4)]"}
                    setState={setOriginCountry}
                >
                    <p className="text-[#AFB0B6] text-[9.234px] font-bold mb-[6px]">
                        الوجهة
                    </p>

                    <div
                        onClick={() =>
                            setVisible((perv) => ({
                                ...perv,
                                transferCountryLocation:
                                    !perv?.transferCountryLocation,
                            }))
                        }
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex gap-[6px]">
                            <i className="fa-regular fa-location-dot text-[var(--primary)] text-[20px]"></i>

                            <p
                                className="text-[12px] sm:text-[13.208px] font-bold mb-1 overflow-hidden text-nowrap whitespace-nowrap max-w-full"
                                style={{ textOverflow: "ellipsis" }}
                            >
                                {originCountry?.name}
                            </p>
                        </div>

                        <i
                            className={`fa-regular fa-angle-down transition ${
                                visible?.transferCountryLocation
                                    ? "rotate-[180deg]"
                                    : ""
                            } text-[#8672F3] text-[20px]`}
                        ></i>
                    </div>
                </DropDown>

                <DatePicker
                    CheckIn={"CheckIn"}
                    CheckOut={"CheckOut"}
                    classNames={
                        "hero-calnder border border-[#CACACE] h-[82.33px] relative rounded-[12.167px] flex items-center justify-between py-[10px] px-2 w-full lg:w-[calc(95%/2)] lg:mx-4"
                    }
                    formik={formik}
                />

                <DropDown
                    itemsTemplate={
                        <RomesInfo
                            visible={visible?.roomInfo}
                            formik={formik}
                            setVisible={setVisible}
                        />
                    }
                    visible={visible?.roomInfo}
                    setVisible={setVisible}
                    classNames={
                        "lg:w-[calc(95%/4)]  h-[82.33px] flex justify-center flex-col"
                    }
                >
                    <p className="text-[#AFB0B6] text-[9.234px] font-bold mb-[6px]">
                        الضيوف و الغرف
                    </p>

                    <div
                        onClick={() =>
                            setVisible((perv) => ({
                                ...perv,
                                roomInfo: !perv?.roomInfo,
                            }))
                        }
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex gap-[6px]">
                            <i className="fa-light fa-users-medical text-[var(--primary)] sm:text-[20px]"></i>

                            <p className="text-[12px] sm:text-[15.208px] font-bold mb-1">
                                شخص 1 / سياحية
                            </p>
                        </div>

                        <i
                            className={`fa-regular fa-angle-down transition ${
                                visible?.roomInfo ? "rotate-[180deg]" : ""
                            } text-[#8672F3] text-[20px]`}
                        ></i>
                    </div>
                </DropDown>

                <button
                    type="submit"
                    className="min-btn w-[50%] m-auto block lg:hidden"
                >
                    بحث
                </button>
            </div>
        </form>
    );
}

export default BookHotel;
