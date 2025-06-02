import { useState } from "react";
import hotel from "/images/hotel.svg";
import Hotels from "../../hotels";
import BookHotel from "../../hotels/BookHotel";
import BookPlane from "../../planes";

function BookingSearch() {
    const [activeBtn, setActiveBtn] = useState(0);

    return (
        <section className="lg:h-fit sm:mb-[118px] mt-[-167px] relative z-[100] px-3 sm:px-0">
            {/* Container for buttons */}
            <div className="p-2 sm:p-4 container h-[57px] flex items-center justify-center lg:justify-start gap-[7px] mb-[10px]">
                {/* Plane booking button */}
                <button
                    onClick={() => setActiveBtn(0)}
                    className="rounded-[12.167px] overflow-hidden relative p-[7.604px] h-[56.271px] leading-[56.271px] gap-x-[16.729px] w-[48%] sm:w-[190.104px] flex items-center"
                    style={{
                        background: "rgba(255, 255, 255, 0.30)",
                        backdropFilter: "blur(1.5208332538604736px)",
                    }}
                >
                    {/* Plane icon */}
                    <i
                        className={` relative z-20 sm:text-[30px] ${
                            activeBtn === 0
                                ? "text-[#8672F3] rotate-to-left fa-solid fa-plane fa-solid fa-plane"
                                : "text-white fa-thin fa-plane rotate-to-right"
                        }`}
                    ></i>

                    {/* Highlight for active button */}
                    <div
                        className={`${
                            activeBtn === 0 ? "right-[-49%]" : "right-[-91%]"
                        } absolute w-full z-10 transition h-[78px] bg-[#cac2f9] rounded-full border-[10px] ${
                            activeBtn === 1 ? "!border-l-[13px]" : ""
                        } border-[#eae7fd]`}
                    ></div>

                    {/* Button text */}
                    <span
                        className={`${
                            activeBtn === 0 ? "text-[#8672F3]" : "text-white"
                        } transition relative z-20 font-bold text-[12px] sm:text-[18.25px]`}
                    >
                        حجز طائرة
                    </span>
                </button>

                {/* Hotel booking button */}
                <button
                    onClick={() => setActiveBtn(1)}
                    className="rounded-[12.167px] relative overflow-hidden p-[7.604px] h-[56.271px] leading-[56.271px] gap-x-[16.729px] w-[48%] sm:w-[190.104px] flex items-center"
                    style={{
                        background: "rgba(255, 255, 255, 0.30)",
                        backdropFilter: "blur(1.5208332538604736px)",
                    }}
                >
                    {/* Hotel icon */}
                    <img
                        src={hotel}
                        className="w-fit ms-4 relative z-20"
                        loading="lazy"
                        alt=""
                    />

                    {/* Highlight for active button */}
                    <div
                        className={`${
                            activeBtn === 1 ? "right-[-54%]" : "right-[-91%]"
                        } absolute w-full z-10 transition h-[78px] bg-[#cac2f9] rounded-full border-[10px] ${
                            activeBtn === 0 ? "!border-l-[13px]" : ""
                        } border-[#eae7fd]`}
                    ></div>

                    {/* Button text */}
                    <span
                        className={`${
                            activeBtn === 1 ? "text-[#8672F3]" : "text-white"
                        } transition font-bold text-[12px] sm:text-[18.25px] relative z-20`}
                    >
                        احجز فندق
                    </span>
                </button>
            </div>

            {/* Container for the selected booking component */}
            <div
                className="p-2 sm:p-4 container lg:h-full sm:px-[18px] bg-white rounded-[19.01px]"
                style={{
                    boxShadow: "0px 15.208px 38.021px 0px rgba(0, 0, 0, 0.07)",
                }}
            >
                {/* Render BookHotel component if activeBtn is 0 */}
                {activeBtn === 1 ? (
                    <>
                        <BookHotel />
                        <Hotels />
                    </>
                ) : null}

                {/* Render BookPlane component if activeBtn is 1 */}
                {activeBtn === 0 ? <BookPlane /> : null}
            </div>
        </section>
    );
}

export default BookingSearch;
