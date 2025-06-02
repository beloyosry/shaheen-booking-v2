import { Link } from "react-router-dom";
import SwiperWrapper from "../SwiperWrapper";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

function Recommendation() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [recomendation, setRecomendation] = useState([]);

    useEffect(() => {
        const pervBtn = document.querySelector(".swiper-button-prev");
        const nextBtn = document.querySelector(".swiper-button-next");

        nextBtn!.innerHTML = `<i class="fa-regular fa-angle-left text-[20px] !text-white z-10 relative"></i>`;
        pervBtn!.innerHTML = `<i class="fa-regular fa-angle-right text-[20px] !text-white z-10 relative"></i>`;

        return () => {};
    }, []);

    const renderSliders = recomendation?.map((slide, index) => {
        return (
            <SwiperSlide
                key={index}
                className="rounded-[15.208px] overflow-hidden relative z-20 h-[345px] sm:h-[445px] p-5"
            >
                <Link to={`/blogs/${slide?.id}`}>
                    <img
                        src={slide.img}
                        alt=""
                        className="absolute top-0 left-0 object-cover w-full h-full"
                    />

                    <p className="absolute bottom-0 right-0 font-bold text-[19.01px] bg-[#4a2bedc7] text-white w-full h-[60px] flex items-center justify-center p-3">
                        {slide.title?.slice(0, 30)}
                    </p>
                </Link>
            </SwiperSlide>
        );
    });

    // Return a section containing recommended destinations and information
    return (
        <section className="mb-5">
            {/* Container for the section */}
            <div className="container mb-[60px]">
                {/* Heading for recommended destinations */}
                <h3 className="text-[#070708] text-[20px] sm:text-[26.615px] font-bold text-center mb-4">
                    المدونة
                </h3>

                {/* Subheading with information about the travel platform */}
                <h4 className="text-[#2F2F37] text-[13px] sm:text-[19.01px] font-bold lg:max-w-[900px] text-center m-auto">
                    لحجز الفنادق والطيران بكل سهولة ويسر! اكتشف نصائح الخبراء
                    والعروض الحصرية لتجربة سفر لا تُنسى. ابتداءً من الحجز
                    المثالي للفندق والطيران، استعد لرحلات مليئة بالمغامرات
                    والتجارب الرائعة!
                </h4>
            </div>

            {/* Container for the Swiper component with recommended destinations */}
            <div className="mr-auto px-[16px] relative me-[0] pe-0 max-w-[calc(100%-16px)] sm:max-w-[90%] overflow-hidden pb-32 py-4">
                <Link
                    to={"/blogs"}
                    className="z-[200] relative text-[20px] text-[var(--secondary)] font-bold my-5 flex items-center gap-3"
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
                        isRenderByFullWidth={false}
                        setActiveIndex={setActiveIndex}
                        isAutoplay={true}
                        includePagination={true}
                    />
                </div>
            </div>
        </section>
    );
}

export default Recommendation;
