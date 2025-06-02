import { useEffect } from "react";

type Props = {
    title: string;
    fieldValue: string;
    formik: any;
};

export default function QuantitySelector({ title, fieldValue, formik }: Props) {
    const count = formik.values?.[fieldValue];

    useEffect(() => {
        formik.setFieldValue(fieldValue, formik.values?.[fieldValue]);
        return () => {};
    }, [count]);

    return (
        <div className="p-[10px] border-b border-b-[#F2F2F3] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
                <span className="text-[20px] font-bold transition min-w-[30px]">
                    {count}
                </span>
                <span className="text-[15px] font-medium">{title}</span>
            </div>

            <div>
                <div
                    onClick={() => formik.setFieldValue(fieldValue, count + 1)}
                    className="cursor-pointer h-[26px] w-[34px] bg-[#C5BAFF] rounded-t-[5px] mb-[1px] flex items-center justify-center"
                >
                    <i className="fa-solid fa-angle-up"></i>
                </div>

                <div
                    onClick={() =>
                        formik.setFieldValue(
                            fieldValue,
                            count > 1 ? count - 1 : count
                        )
                    }
                    className={`w-[34px] h-[26px] bg-[#C5BAFF] rounded-b-[5px] flex items-center justify-center ${
                        count === 1 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                >
                    <i className="fa-solid fa-angle-down"></i>
                </div>
            </div>
        </div>
    );
}
