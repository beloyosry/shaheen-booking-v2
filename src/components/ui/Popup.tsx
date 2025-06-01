import { Dialog } from "primereact/dialog";
import confirem from "/images/confirem.png";
import rejected from "/images/rejected.png";
import confirem_stroke from "../../assets/pop-up/confirem_stroke.png";
import rejected_stroke from "../../assets/pop-up/rejected_stroke.png";
import { useEffect } from "react";
import { usePopupStore } from "../../store/pop-up.store";

export default function Popup() {
    const { popupVisible: data, setPopupVisible } = usePopupStore();

    const hidePopup = () => {
        setPopupVisible({ ...data, visible: false });
        if (data?.callback) {
            data.callback();
        }
    };

    useEffect(() => {
        const handleKeyboardEvents: (e: KeyboardEvent) => void = (e) => {
            if (e.key === "Enter" || e.code === "Space") hidePopup();
        };

        if (data?.visible)
            window.addEventListener("keydown", handleKeyboardEvents);

        return () =>
            window.removeEventListener("keydown", handleKeyboardEvents);
    }, [data?.visible]);

    return (
        <Dialog
            headerClassName="!hidden"
            visible={data?.visible}
            contentClassName="!p-0 !rounded-none !bg-transparent"
            className="w-[500px] !bg-transparent !p-0 relative max-w-[95%]"
            onHide={hidePopup}
        >
            <div
                className={`w-[100px] h-[100px] ${
                    data?.success ? "bg-[#00CA75]" : "bg-[#EC6868]"
                } absolute rounded-full -right-5 -top-5 z-10`}
                style={{ filter: "blur(100px)" }}
            ></div>

            <i
                onClick={hidePopup}
                className="fa-solid fa-xmark absolute right-5 top-5 text-[20px] z-10 cursor-pointer"
            ></i>

            <img
                src={data?.success ? confirem_stroke : rejected_stroke}
                className="absolute left-0 top-2 z-[1] w-fit"
                alt=""
            />

            <div className="h-[350px] rounded-[15px] bg-white overflow-hidden flex flex-col justify-center py-5 items-center">
                <img
                    src={data?.success ? confirem : rejected}
                    className="w-fit mb-8 relative"
                    alt=""
                />

                <h3 className="text-[31px] text-[#2D2D2D] font-medium mb-2">
                    {data?.success ? "تم بنجاح" : "خطاء"}
                </h3>
                <p className="font-medium mb-8 max-w-[90%] text-center">
                    {data?.message?.slice(0, 80)}
                </p>

                <div className="border-[1.5px] border-[#5e43ef35] rounded-[11.406px] flex items-center justify-center p-[2px]">
                    <button
                        onClick={hidePopup}
                        className="min-btn w-full font-bold"
                    >
                        تم
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
