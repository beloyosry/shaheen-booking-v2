// Import necessary styles for Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Import Swiper components and effects
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Import images for the slides
import image_slide_1 from "/images/home_image_slide_1.png";
import image_slide_2 from "/images/home_image_slide_2.png";
import image_slide_3 from "/images/home_image_slide_3.png";

function Slider() {
    // Data for each slide, including image and overlay color
    const slider_data = [
        { image: image_slide_1, overlay: "rgba(74, 43, 237, 0.20)" },
        { image: image_slide_2, overlay: "rgba(74, 43, 237, 0.20)" },
        { image: image_slide_3, overlay: "rgba(74, 43, 237, 0.20)" },
    ];

    // Map over the slider data to generate SwiperSlides with images and overlays
    const sliders = slider_data?.map((item, index) => {
        return (
            <SwiperSlide key={index} className="relative">
                {/* Overlay div with specified background color */}
                <div
                    className="absolute left-0 top-0 w-full h-full z-10 bg-red-500"
                    style={{ background: item.overlay }}
                ></div>
                {/* Image element with full width and height, covering the slide */}
                <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover select-none"
                />
            </SwiperSlide>
        );
    });

    // Return the Swiper component with specified configurations and slides
    return (
        <div className="absolute left-0 top-0 w-full h-full">
            {/* Swiper component */}
            <Swiper
                speed={1000} // Duration of the transition effect
                pagination={{ clickable: true }} // Enable pagination with clickable bullets
                loop={true} // Enable looping of slides
                autoplay={{
                    delay: 10000, // Delay between slides in milliseconds
                    disableOnInteraction: false, // Continue autoplay after user interactions
                }}
                effect={"fade"} // Use fade effect for smooth transitions
                fadeEffect={{
                    crossFade: true, // Enable cross-fade for smoother transitions
                }}
                modules={[Autoplay, Pagination, EffectFade]} // Enable necessary modules
                className="mySwiper w-full h-full" // Custom class for styling
            >
                {/* Render the SwiperSlides */}
                {sliders}
            </Swiper>
        </div>
    );
}

export default Slider;
