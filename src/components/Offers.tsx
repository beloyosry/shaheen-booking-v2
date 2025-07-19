import { Link } from "react-router-dom";
import SwiperWrapper from "./SwiperWrapper";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

function Offers() {
    const [offers, setOffers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const pervBtn = document.querySelectorAll(".swiper-button-prev")?.[
            activeIndex == 0 ? 0 : 1
        ];
        const nextBtn = document.querySelectorAll(".swiper-button-next")?.[
            activeIndex == 0 ? 0 : 1
        ];
        if (pervBtn && nextBtn) {
            nextBtn.innerHTML = `<i class="fa-regular fa-angle-left text-[20px] !text-white z-10 relative"></i>`;
            pervBtn.innerHTML = `<i class="fa-regular fa-angle-right text-[20px] !text-white z-10 relative"></i>`;
        }

        return () => {};
    }, []);

    const renderSliders = offers?.map((slide, index) => {
        return (
            <SwiperSlide
                key={index}
                className="rounded-[15.208px] overflow-hidden relative z-20 h-[345px] sm:h-[445px] p-5"
            >
                <Link to={""}>
                    <img
                        src={slide?.offer_image}
                        alt=""
                        className="absolute top-0 left-0 object-cover w-full h-full"
                    />

                    <p className="absolute bottom-0 right-0 font-bold text-[19.01px] bg-[#4a2bedc7] text-white w-full h-[60px] flex items-center justify-center p-3">
                        {slide?.title}
                    </p>
                </Link>
            </SwiperSlide>
        );
    });

    return (
        <section className="mb-20">
            {/* Container for the section */}
            <div className="container mb-[60px] offers">
                {/* Heading for recommended destinations */}
                <h3 className="text-[#070708] text-[20px] sm:text-[26.615px] font-bold text-center mb-4">
                    جهات موصي بها
                </h3>

                {/* Subheading with information about the travel platform */}
                <h4 className="text-[#2F2F37] text-[13px] sm:text-[19.01px] font-bold lg:max-w-[900px] text-center m-auto">
                    اكتشف متعة السفر بسهولة ويسر مع منصتنا لحجز تذاكر الطيران
                    وحجوزات الفنادق. استمتع بتجربة حجز سلسة وعروض مميزة على
                    الوجهات العالمية الشهيرة. اختر وجهتك، واحجز رحلتك، واستمتع
                    بمغامرة لا تُنسى!😊
                </h4>
            </div>

            {/* Container for the Swiper component with recommended destinations */}
            <div className="container relative me-[0] pe-0 max-w-[calc(100%-16px)] sm:max-w-[90%] overflow-hidden pb-32 py-4">
                <Link
                    to={"/hotels"}
                    className="z-[200] relative text-[20px] text-secondary-500 font-bold my-3 flex items-center gap-3"
                >
                    <span>عرض المزيد</span>

                    <i className="fa-regular fa-arrow-left"></i>
                </Link>

                {/* Gradient overlay for the top of the container */}
                <div
                    className="h-[456.25px] absolute left-0 top-0 z-10 w-full rounded-[19.01px] rounded-tl-none"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(74, 43, 237, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%)",
                    }}
                ></div>

                {/* Swiper component for rendering recommended destinations */}
                <div
                    className="relative z-[200] home-recomnd-slider"
                    style={{ direction: "rtl" }}
                >
                    {/* Wrapper component for the Swiper with specified configurations */}
                    <SwiperWrapper
                        items={renderSliders} // Array of items to render in each slide
                        slidesPerViewCount={[1.8, 2.5, 3.5, 4.5]} // Array specifying the number of slides to show based on breakpoints
                        isLooped={false} // Disable looping of slides
                        autoPlayDelay={3000}
                        includeNavigation={true} // Include navigation buttons
                        isAutoplay={true}
                        includePagination={true}
                        setActiveIndex={setActiveIndex}
                        isRenderByFullWidth={false}
                    />
                </div>
            </div>
        </section>
    );
}

export default Offers;
