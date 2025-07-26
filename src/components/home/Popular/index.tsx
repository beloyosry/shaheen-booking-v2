import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Card1 from "./card-1.png";
import Card2 from "./card-2.png";
import Card3 from "./card-3.png";
import { useState } from "react";
import LikeButton from "../../ui/LikeButton";

function Popular() {
    const slides = [
        {
            image: Card1,
            title: "Alamein",
            subtitle: "Matrouh Governorate, Egypt",
            rate: 3,
            price: 222,
            days: 3,
        },
        {
            image: Card2,
            title: "Alamein",
            subtitle: "Matrouh Governorate, Egypt",
            rate: 3,
            price: 222,
            days: 3,
        },
        {
            image: Card3,
            title: "Alamein",
            subtitle: "Matrouh Governorate, Egypt",
            rate: 3,
            price: 222,
            days: 3,
        },
    ];

    const [isHeartClicked, setIsHeartClicked] = useState<boolean[]>(
        Array(slides.length).fill(false)
    );

    return (
        <div className="relative md:min-h-screen bg-white">
            {/* Border line */}
            <div className="absolute top-0 md:top-10 left-1/2 -translate-x-1/2 w-[95%] h-[1px] bg-primary-500" />

            {/* Content */}
            <div className="flex flex-col items-center justify-start w-full h-full py-10 md:py-20 gap-6 md:gap-10">
                {/* Header */}
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 px-4 sm:px-8 md:px-12 lg:px-20">
                    <h2 className="text-primary-500 text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left">
                        Explore stays in popular destinations
                    </h2>
                    <p className="text-center md:text-left text-xl sm:text-2xl md:text-3xl">
                        <span className="wavy-text">Average</span> prices based
                        on current calendar month
                    </p>
                </div>
                {/* Carousel */}
                <div className="w-full flex justify-center items-center px-4 sm:px-8 md:px-12 lg:pl-20">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={50}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: -100,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: -200,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: -300,
                            },
                        }}
                        updateOnWindowResize={true}
                        observer={true}
                        observeParents={true}
                        loop={true}
                        modules={[Navigation, Autoplay]}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-50 h-50 md:w-100 md:h-100 rounded-3xl bg-white border border-gray-200 shadow-xl mb-10">
                                    {/* Like Button */}
                                    <LikeButton
                                        isHeartClicked={isHeartClicked}
                                        setIsHeartClicked={setIsHeartClicked}
                                        index={index}
                                    />

                                    <img
                                        src={slide.image}
                                        alt="slide"
                                        className="w-full h-1/2 object-cover rounded-t-3xl rounded-bl-3xl"
                                    />

                                    <div className="w-full flex flex-col items-center justify-center gap-5 px-5 py-4">
                                        <div className="w-full flex justify-between items-center gap-1">
                                            <div>
                                                <h1 className="text-xl font-bold">
                                                    {slide.title}
                                                </h1>
                                                <p className="text-gray-400 capitalize">
                                                    {slide.subtitle}
                                                </p>
                                            </div>
                                            <div className="price-bg py-2 px-3">
                                                <p className="text-white">
                                                    {slide.price}$
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                {/* Rate */}
                                                {/* Show solid stars for the rating */}
                                                {Array.from(
                                                    { length: 5 },
                                                    (_, index) => (
                                                        <i
                                                            key={index}
                                                            className={`fa-${
                                                                index <
                                                                slide.rate
                                                                    ? "solid"
                                                                    : "regular"
                                                            } fa-star text-[#FFD400]`}
                                                        ></i>
                                                    )
                                                )}
                                            </div>
                                            <div>
                                                <h1 className="text-secondary-500 font-bold">
                                                    {slide.days}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Popular;
