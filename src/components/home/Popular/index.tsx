import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Card1 from "./card-1.png";
import Card2 from "./card-2.png";
import Card3 from "./card-3.png";
import { useState } from "react";

function Popular() {
    const slides = [
        {
            image: Card1,
            title: "India",
        },
        {
            image: Card2,
            title: "Japan",
        },
        {
            image: Card3,
            title: "Dubai",
        },
    ];

    const [isHeartClicked, setIsHeartClicked] = useState<boolean[]>(
        Array(slides.length).fill(false)
    );

    const handleHeartClick = (index: number) => {
        setIsHeartClicked((prev) => {
            const newHeartClicked = [...prev];
            newHeartClicked[index] = !newHeartClicked[index];
            return newHeartClicked;
        });
    };
    return (
        <div className="relative h-screen bg-white">
            {/* Border line */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[95%] h-[1px] bg-primary-500" />

            {/* Content */}
            <div className="flex flex-col items-center justify-start w-full h-full py-20 gap-10">
                {/* Header */}
                <div className="w-full flex justify-between items-center gap-150 px-20">
                    <h2 className="text-primary-500 text-4xl font-bold text-left">
                        Explore stays in popular destinations
                    </h2>
                    <p className="text-left text-3xl">
                        <span className="wavy-text">Average</span> prices based
                        on current calendar month
                    </p>
                </div>
                {/* Carousel */}
                <div className="w-full flex justify-center items-center pl-20">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={-300}
                        loop={true}
                        modules={[Navigation]}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-100 h-100 rounded-3xl bg-white border border-gray-200 shadow-xl mb-10">
                                    {/* Like Button */}
                                    <div
                                        onClick={() => handleHeartClick(index)}
                                        className="absolute top-5 right-5 py-2 px-5 bg-white/10 backdrop-blur-sm rounded-b-3xl rounded-tr-2xl cursor-pointer hover:bg-white/20"
                                    >
                                        <i
                                            className={`fa${
                                                isHeartClicked[index]
                                                    ? "s"
                                                    : "r"
                                            } fa-heart text-xl ${
                                                isHeartClicked[index]
                                                    ? "text-red-500"
                                                    : "text-white"
                                            }`}
                                        />
                                    </div>

                                    <img
                                        src={slide.image}
                                        alt="slide"
                                        className="w-full h-1/2 object-cover rounded-t-3xl rounded-bl-3xl"
                                    />

                                    <div className="w-full flex flex-col items-center justify-center gap-5 px-5 py-4">
                                        <div className="w-full flex justify-between items-center gap-1">
                                            <div>
                                                <h1 className="text-xl font-bold">
                                                    Alamein
                                                </h1>
                                                <p className="text-gray-400 capitalize">
                                                    matrouh governorate, egypt
                                                </p>
                                            </div>
                                            <div className="price-bg py-2 px-3">
                                                <p className="text-white">
                                                    222$
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-between items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                {/* Rate */}
                                                <i className="fa-solid fa-star text-[#FFD400]"></i>
                                                <i className="fa-solid fa-star text-[#FFD400]"></i>
                                                <i className="fa-solid fa-star text-[#FFD400]"></i>
                                                <i className="fa-regular fa-star text-[#FFD400]"></i>
                                                <i className="fa-regular fa-star text-[#FFD400]"></i>
                                            </div>
                                            <div>
                                                <h1 className="text-secondary-500 font-bold">
                                                    3 Days
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
