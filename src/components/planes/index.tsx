import { usePopupStore } from "../../store/pop-up.store";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSetLocale } from "../../hooks/useLocale";
import { Checkbox } from "primereact/checkbox";
import DatePicker from "../DatePicker";
import TravelLevel from "../TravelLevel/TravelLevel";
import DropDown from "../DropDown";
import { useRegionStore } from "../../store/regions.store";
import { localeStore } from "../../store/locale.store";
import type { Country } from "../../types";

function BookPlane() {
    const { setPopupVisible } = usePopupStore();
    const { countries, selectedCountry, cities, regions } = useRegionStore();
    const { locale } = localeStore();

    const [tickets, setTicketType] = useState("round-trip");

    const isOneWay = tickets === "one-way-ticket";

    const [originCountry, setOriginCountry] = useState<Country | null>({
        name: selectedCountry?.name || "",
        code: selectedCountry?.code || "",
    });

    const [destinationCountry, setDestinationCountry] =
        useState<Country | null>({
            name: "مينوركا",
            code: "MX",
        });

    const handleSubmit = () =>
        setPopupVisible({
            visible: true,
            success: true,
            message: "هذه الخدمة غير متوفرة حاليا، الرجاء المحاولة لاحقا",
            callback: () => {},
            title: "Success",
        });

    const formik = useFormik({
        initialValues: {
            originEntityId: "104120222",
            destinationEntityId: "95673624",
            departureDate: "2024-04-01", //  convertDateFormat(new Date())
            returnDate: null,
            cabinClass: "economy",
            rooms: 1,
            adults: 1,
            childrenAges: [],
            child_count: 0,
        },
        onSubmit: handleSubmit,
    });

    // Update form values when selectedCountry changes
    useEffect(() => {
        if (selectedCountry) {
            formik.setFieldValue("shaheen-currency", selectedCountry.code);
            formik.setFieldValue("market", selectedCountry.code);
            formik.setFieldValue("locale", locale || "ar-AE");

            // Update originCountry state when selectedCountry changes
            setOriginCountry({
                name: selectedCountry.name,
                code: selectedCountry.code,
            });

            // Reset dropdown visibility states when country changes
            setVisible((prev) => ({
                ...prev,
                transferFrom: false,
                transferTo: false,
                travelLevel: false,
            }));
        }

        return () => {};
    }, [selectedCountry, locale]);

    const [visible, setVisible] = useState({
        travelLevel: false,
        transferTo: false,
        transferFrom: false,
    });

    useSetLocale();

    return (
        <form onSubmit={formik.handleSubmit} className="py-2">
            <div className="flex items-center justify-center lg:justify-between mb-[22px] mt-3 lg:mt-0">
                <div className="flex items-center gap-[14px]">
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="flex items-center">
                            <Checkbox
                                inputId="round-trip"
                                name="round-trip"
                                value="round-trip"
                                onChange={(e) => setTicketType(e.value)}
                                checked={tickets === "round-trip"}
                            />

                            <label
                                htmlFor="round-trip"
                                className="select-none mb-0 ms-2 text-[11.406px] font-bold"
                            >
                                ذهاب و عودة
                            </label>
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                inputId="one-way-ticket"
                                name="one-way-ticket"
                                value="one-way-ticket"
                                onChange={(e) => setTicketType(e.value)}
                                checked={tickets === "one-way-ticket"}
                            />

                            <label
                                htmlFor="one-way-ticket"
                                className="select-none mb-0 ms-2 text-[11.406px] font-bold"
                            >
                                ذهاب فقط
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="min-btn w-[112.175px] hidden lg:inline-block"
                >
                    بحث
                </button>
            </div>

            <div className="flex items-center flex-wrap lg:flex-nowrap gap-[18px] lg:gap-0">
                {/* Create a wrapper function to adapt the setVisible prop */}
                <DropDown
                    items={regions}
                    defaultSelected={selectedCountry}
                    searchList={regions}
                    formik={formik}
                    fieldname={"originEntityId"}
                    visible={visible?.transferFrom}
                    setState={setOriginCountry}
                    setVisible={(value) => {
                        // This adapter function converts between the two state structures
                        if (typeof value === "function") {
                            // Handle functional updates
                            setVisible((prev) => {
                                const adaptedPrev = {
                                    roomInfo: false,
                                    transferCountryLocation: prev.transferFrom,
                                };
                                const result = value(adaptedPrev);
                                return {
                                    ...prev,
                                    transferFrom:
                                        result.transferCountryLocation,
                                };
                            });
                        } else {
                            // Handle direct state updates
                            setVisible((prev) => ({
                                ...prev,
                                transferFrom: value.transferCountryLocation,
                            }));
                        }
                    }}
                    classNames={"lg:w-[calc(95%/5)]"}
                >
                    <p className="text-[#AFB0B6] text-[9.234px] font-bold mb-[6px]">
                        من
                    </p>

                    <div
                        onClick={() =>
                            setVisible((perv) => ({
                                ...perv,
                                transferFrom: !perv?.transferFrom,
                            }))
                        }
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex gap-[6px] max-w-[80%]">
                            <i className="fa-regular fa-location-dot text-[var(--primary)] text-[20px]"></i>

                            <div className="w-full">
                                <p
                                    className="text-[12px] sm:text-[13.208px] font-bold mb-1 overflow-hidden text-nowrap whitespace-nowrap max-w-full"
                                    style={{ textOverflow: "ellipsis" }}
                                >
                                    {originCountry?.name}
                                </p>

                                {/* <p className="text-[9.125px] font-bold">مصر</p> */}
                            </div>
                        </div>

                        <i
                            className={`fa-regular fa-angle-down transition ${
                                visible?.transferFrom ? "rotate-[180deg]" : ""
                            } text-[#8672F3] text-[20px]`}
                        ></i>
                    </div>
                </DropDown>

                <div
                    className="w-[25.854px] h-[25.854px] m-auto flex lg:flex-col items-center justify-center bg-[#D6D0FB] rounded-full lg:mx-1"
                    style={{
                        boxShadow:
                            "0px 0px 22.812px 0px rgba(74, 43, 237, 0.38)",
                    }}
                >
                    <i className="fa-solid fa-arrow-up lg:fa-arrow-right text-[var(--primary)] text-[10px]"></i>
                    <i className="fa-thin fa-arrow-down lg:fa-arrow-left text-[var(--primary)] text-[10px]"></i>
                </div>

                <DropDown
                    items={countries}
                    searchList={countries}
                    formik={formik}
                    fieldname={"destinationEntityId"}
                    visible={visible?.transferTo}
                    setState={setDestinationCountry}
                    setVisible={(value) => {
                        // This adapter function converts between the two state structures
                        if (typeof value === "function") {
                            // Handle functional updates
                            setVisible((prev) => {
                                const adaptedPrev = {
                                    roomInfo: false,
                                    transferCountryLocation: prev.transferTo,
                                };
                                const result = value(adaptedPrev);
                                return {
                                    ...prev,
                                    transferTo: result.transferCountryLocation,
                                };
                            });
                        } else {
                            // Handle direct state updates
                            setVisible((prev) => ({
                                ...prev,
                                transferTo: value.transferCountryLocation,
                            }));
                        }
                    }}
                    classNames={"lg:w-[calc(95%/5)]"}
                >
                    <p className="text-[#AFB0B6] text-[9.234px] font-bold mb-[6px]">
                        الى
                    </p>

                    <div
                        onClick={() =>
                            setVisible((perv) => ({
                                ...perv,
                                transferTo: !perv?.transferTo,
                            }))
                        }
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex gap-[6px] max-w-[80%]">
                            <i className="fa-regular fa-location-dot text-[var(--primary)] sm:text-[20px]"></i>

                            <div className="w-full">
                                <p
                                    className="text-[12px] sm:text-[13.208px] font-bold mb-1 overflow-hidden text-nowrap whitespace-nowrap max-w-full"
                                    style={{ textOverflow: "ellipsis" }}
                                >
                                    {destinationCountry?.name}
                                </p>

                                {/* <p className="text-[9.125px] font-bold">مصر</p> */}
                            </div>
                        </div>

                        <i
                            className={`fa-regular fa-angle-down transition ${
                                visible?.transferTo ? "rotate-[180deg]" : ""
                            } text-[#8672F3] text-[20px]`}
                        ></i>
                    </div>
                </DropDown>

                <DatePicker
                    // isOneWay={isOneWay}
                    CheckOut={"returnDate"}
                    CheckIn={"departureDate"}
                    classNames={`hero-calnder border border-[#CACACE] h-[82.33px] relative rounded-[12.167px] flex items-center justify-between py-[10px] px-2 w-full transition ${
                        isOneWay ? "lg:w-[calc(95%/5)]" : "lg:w-[calc(95%/3)]"
                    } lg:mx-4`}
                    formik={formik}
                />

                <DropDown
                    items={countries}
                    visible={visible?.travelLevel}
                    setVisible={(value) => {
                        // This adapter function converts between the two state structures
                        if (typeof value === "function") {
                            // Handle functional updates
                            setVisible((prev) => {
                                const adaptedPrev = {
                                    roomInfo: prev.travelLevel,
                                    transferCountryLocation: false,
                                };
                                const result = value(adaptedPrev);
                                return {
                                    ...prev,
                                    travelLevel: result.roomInfo,
                                };
                            });
                        } else {
                            // Handle direct state updates
                            setVisible((prev) => ({
                                ...prev,
                                travelLevel: value.roomInfo,
                            }));
                        }
                    }}
                    itemsTemplate={
                        <TravelLevel
                            visible={visible?.travelLevel}
                            setVisible={(value) => {
                                // This adapter function converts between the two state structures
                                if (typeof value === "function") {
                                    // Handle functional updates
                                    setVisible((prev) => {
                                        const adaptedPrev = {
                                            travelLevel: prev.travelLevel,
                                            transferCountryLocation: false,
                                        };
                                        const result = value(adaptedPrev);
                                        return {
                                            ...prev,
                                            travelLevel: result.travelLevel,
                                        };
                                    });
                                } else {
                                    // Handle direct state updates
                                    setVisible((prev) => ({
                                        ...prev,
                                        travelLevel: value.travelLevel,
                                    }));
                                }
                            }}
                            formik={formik}
                        />
                    }
                    classNames={"lg:w-[calc(95%/5)] h-[82px]"}
                >
                    <p className="text-[#AFB0B6] text-[9.234px] font-bold mb-[6px]">
                        المسافرين & الدرجة
                    </p>

                    <div
                        onClick={() =>
                            setVisible((perv) => ({
                                ...perv,
                                travelLevel: !perv?.travelLevel,
                            }))
                        }
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <div className="flex gap-[6px]">
                            <i className="fa-light fa-users-medical text-[var(--primary)] text-[20px]"></i>

                            <p className="text-[12px] sm:text-[13.208px] font-bold mb-1">
                                شخص 1 / سياحية
                            </p>
                        </div>

                        <i
                            className={`fa-regular fa-angle-down transition ${
                                visible?.travelLevel ? "rotate-[180deg]" : ""
                            } text-[#8672F3] text-[20px]`}
                        ></i>
                    </div>
                </DropDown>

                <button className="min-btn w-[50%] m-auto block lg:hidden">
                    بحث
                </button>
            </div>
        </form>
    );
}

export default BookPlane;
