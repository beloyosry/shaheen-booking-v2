import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { ar as arLocale } from "date-fns/locale"; // Import Arabic locale correctly
import type { FormikProps } from "formik";

type DatePickerProps = {
    formik: FormikProps<any>;
    CheckIn?: string;
    CheckOut?: string;
    classNames?: string;
};

export default function DatePicker({ formik, CheckIn, CheckOut, classNames }: DatePickerProps) {
    const convertDateFormat = (date: Date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        return formattedDate;
    };

    const [returnDate, setReturnDate] = useState(new Date());

    const [departureDate, setDepartureDate] = useState(new Date());

    const formattedDepartureDate = format(departureDate, "EEEE, dd MMMM yyyy", {
        locale: arLocale,
    });

    const returnDepartureDate = format(returnDate, "EEEE, dd MMMM yyyy", {
        locale: arLocale,
    });

    return (
        <div className={classNames || "hero-calnder border border-[#CACACE] h-[82.33px] relative rounded-[12.167px] flex items-center justify-between py-[10px] px-2 w-full lg:w-[calc(95%/3)] lg:mx-4"}>
            <div className="w-[49%] flex justify-center flex-col relative">
                <p className="text-[#AFB0B6] text-[9.234px] font-bold mb-[6px]">
                    المغادرة
                </p>

                <label
                    htmlFor="departureDate"
                    className="flex gap-[6px] cursor-pointer w-fit"
                >
                    <i className="fa-duotone fa-calendar-days text-[var(--primary)] sm:text-[20px]"></i>

                    <p className="text-[12px] sm:text-[12.208px] font-bold mb-1">
                        {formattedDepartureDate}
                    </p>
                </label>

                <Calendar
                    value={departureDate}
                    minDate={new Date()}
                    onChange={(e) => {
                        if (e.value) {
                            setDepartureDate(e.value as Date);
                            formik.setFieldValue(
                                CheckIn || "CheckIn",
                                convertDateFormat(e.value as Date)
                            );
                        }
                    }}
                    inputId="departureDate"
                    locale="ar"
                    touchUI
                    dateFormat="dd/mm/yy"
                />
            </div>

            <div className="bg-[#CACACE] w-[0.76px] h-full absolute left-[53.5%] translate-x-[-50%]"></div>

            <div className="w-[49%] flex justify-center flex-col">
                <p className="text-[#AFB0B6] text-[9.234px] font-bold mb-[6px]">
                    العودة
                </p>

                <label
                    htmlFor="returnDate"
                    className="flex gap-[6px] cursor-pointer w-fit"
                >
                    <i className="fa-duotone fa-calendar-days text-[var(--primary)] sm:text-[20px]"></i>

                    <p className="text-[12px] sm:text-[12.208px] font-bold mb-1">
                        {returnDepartureDate}
                    </p>
                </label>

                <Calendar
                    value={returnDate}
                    minDate={new Date()}
                    onChange={(e) => {
                        if (e.value) {
                            setReturnDate(e.value as Date);
                            formik.setFieldValue(
                                CheckOut || "CheckOut",
                                convertDateFormat(e.value as Date)
                            );
                        }
                    }}
                    inputId="returnDate"
                    touchUI
                    locale="ar"
                    dateFormat="dd/mm/yy"
                />
            </div>
        </div>
    );
}
