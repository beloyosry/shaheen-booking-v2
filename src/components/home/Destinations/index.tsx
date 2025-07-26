import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Card1 from "./card-1.png";
import Card2 from "./card-2.png";
import Card3 from "./card-3.png";

function Destinations() {
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

    return (
        <div className="relative md:min-h-screen bg-secondary-50">
            {/* Border line */}
            <div className="absolute top-5 md:top-10 left-1/2 -translate-x-1/2 w-[95%] h-[1px] bg-primary-500" />

            {/* Content */}
            <div className="flex flex-col items-center justify-start w-full h-full py-10 md:py-20 gap-6 md:gap-10">
                {/* Header */}
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 lg:gap-20 px-4 sm:px-8 md:px-12 lg:px-20">
                    <h2 className="text-primary-500 text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left">
                        Traveler-approved destinations
                    </h2>
                    <p className="text-center md:text-left text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        <span className="wavy-text">Discover</span> the joy of
                        traveling easily and conveniently with our platform for
                        booking airline tickets and hotel reservations.
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
                            <SwiperSlide style={{ margin: 0 }} key={index}>
                                <div className="relative w-50 h-50 md:w-100 md:h-100 rounded-2xl">
                                    {/* overlay */}
                                    <div className="absolute inset-0 bg-black opacity-10 rounded-2xl" />

                                    {/* Glassy Label */}
                                    <div className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 py-2 sm:py-3 px-6 sm:px-10 bg-white/10 backdrop-blur-sm rounded-b-2xl rounded-tr-4xl">
                                        <h2 className="text-white text-lg sm:text-xl font-bold">
                                            {slide.title}
                                        </h2>
                                    </div>

                                    <img
                                        src={slide.image}
                                        alt="slide"
                                        className="w-full h-full object-fill rounded-2xl"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Destinations;
