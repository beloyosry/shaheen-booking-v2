import { Accordion, AccordionTab } from "primereact/accordion";
import QuantitySelector from "../QuantitySelector";
import { Fragment, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
    visible?: boolean;
    setVisible: Dispatch<SetStateAction<{ travelLevel: boolean }>>;
    formik: any;
};

export default function TravelLevel({ visible, setVisible, formik }: Props) {
    const handleReset = () => {
        const attr = [
            { name: "rooms", value: 1 },
            { name: "adults", value: 1 },
            { name: "child_count", value: 0 },
            { name: "childrenAges", value: [] },
            { name: "cabinClass", value: "unspecified" },
        ];

        attr.map((item) => formik.setFieldValue(item?.name, item?.value));
        return setVisible({
            travelLevel: false,
        });
    };

    const childCount = new Array(formik?.values?.child_count).fill(1);

    const [children, setChildren] = useState(
        new Array(formik?.values?.childrenAges).fill(1)
    );

    useEffect(() => {
        formik.setFieldValue(
            "childrenAges",
            children?.slice(0, +formik.values?.child_count)
        );

        return () => {};
    }, [children, formik.values?.child_count]);

    return (
        <div
            className={`absolute ${
                visible
                    ? "scale-100 border overflow-[initial] left-0"
                    : "scale-0 left-[-500px]"
            } z-[200] top-24 rounded-[16px] min-w-[285px] transition w-full bg-white border-[var(--secondary)]`}
            style={{ boxShadow: "0px 50px 40px 0px rgba(115, 115, 115, 0.12)" }}
        >
            <h2 className="bg-[#c5baff19] text-primary-500 text-[15px] w-full py-2 text-center">
                الركاب و درجة الرحلة
            </h2>

            <Accordion
                multiple
                activeIndex={[0, 1]}
                className="accordion-travel-level"
            >
                <AccordionTab
                    headerStyle={{ direction: "rtl !important" }}
                    header={
                        <p className="text-primary-500 text-[14px]">
                            الركاب
                        </p>
                    }
                >
                    <QuantitySelector
                        formik={formik}
                        title={"بالغون"}
                        fieldValue={"adults"}
                    />

                    <QuantitySelector
                        title={"أطفال"}
                        formik={formik}
                        fieldValue={"child_count"}
                    />

                    <div className="py-4 border-t border-t-[#AEA1F7] px-2">
                        {childCount?.map((_, index) => {
                            return (
                                <Fragment key={index}>
                                    <label
                                        htmlFor={`child-${index + 1}`}
                                        className="text-[14px] font-medium"
                                    >
                                        عمر الطفل {index + 1}
                                    </label>

                                    <input
                                        id={`child-${index + 1}`}
                                        onChange={(e) => {
                                            if (
                                                +e.target.value >= 1 &&
                                                +e.target.value <= 16
                                            ) {
                                                const newChildrenData = [
                                                    ...children,
                                                ]; // Create a copy of the children array
                                                newChildrenData[index] =
                                                    +e.target.value; // Update the value at the specified index
                                                setChildren(newChildrenData); // Set the state with the new array
                                            }
                                        }}
                                        value={children[index]}
                                        type="number"
                                        className="h-[50px] py-4 px-2 mb-2 rounded-[10px] border border-[#5E43EF] w-full"
                                    />
                                </Fragment>
                            );
                        })}
                    </div>
                </AccordionTab>

                <AccordionTab
                    header={
                        <p className="text-primary-500 text-[14px]">
                            درجة الرحلة
                        </p>
                    }
                >
                    <p
                        onClick={() =>
                            formik.setFieldValue("cabinClass", "economy")
                        }
                        className={`p-[10px] text-[15px] font-medium transition cursor-pointer ${
                            formik.values?.cabinClass === "economy"
                                ? "bg-[#5454e5] text-white"
                                : ""
                        } hover:bg-[#5454e5] hover:text-white border-b border-b-[#5454e5]`}
                    >
                        الدرجة الاقتصادية{" "}
                    </p>
                    <p
                        onClick={() =>
                            formik.setFieldValue(
                                "cabinClass",
                                "premium_economy"
                            )
                        }
                        className={`p-[10px] text-[15px] font-medium transition cursor-pointer ${
                            formik.values?.cabinClass === "premium_economy"
                                ? "bg-[#5454e5] text-white"
                                : ""
                        } hover:bg-[#5454e5] hover:text-white border-b border-b-[#5454e5]`}
                    >
                        {" "}
                        المميزة{" "}
                    </p>
                    <p
                        onClick={() =>
                            formik.setFieldValue("cabinClass", "business")
                        }
                        className={`p-[10px] text-[15px] font-medium transition cursor-pointer ${
                            formik.values?.cabinClass === "business"
                                ? "bg-[#5454e5] text-white"
                                : ""
                        } hover:bg-[#5454e5] hover:text-white border-b border-b-[#5454e5]`}
                    >
                        {" "}
                        درجة الأعمال{" "}
                    </p>
                    <p
                        onClick={() =>
                            formik.setFieldValue("cabinClass", "first")
                        }
                        className={`p-[10px] text-[15px] font-medium transition cursor-pointer ${
                            formik.values?.cabinClass === "first"
                                ? "bg-[#5454e5] text-white"
                                : "first"
                        } hover:bg-[#5454e5] hover:text-white border-b border-b-[#5454e5]`}
                    >
                        {" "}
                        الدرجة الأولى{" "}
                    </p>
                </AccordionTab>
            </Accordion>

            <div className="flex items-center gap-2">
                <div
                    onClick={() => setVisible({ travelLevel: false })}
                    className="text-[#6750A4] px-3 py-[16px] cursor-pointer"
                >
                    تاكيد
                </div>
                <div
                    onClick={handleReset}
                    className="text-[#6750A4] px-3 py-[16px] cursor-pointer"
                >
                    إعادة
                </div>
            </div>
        </div>
    );
}
