// import required modules
import PropTypes from "prop-types";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
    items: any[];
    slidesPerViewCount: number[];
    isRenderByFullWidth: boolean;
    setActiveIndex: any;
    isAutoplay: boolean;
    autoPlayDelay: number;
    isLooped: boolean;
    includePagination: boolean;
    includeNavigation: boolean;
};

export default function SwiperWrapper({
    items,
    slidesPerViewCount,
    isRenderByFullWidth,
    setActiveIndex,
    isAutoplay,
    autoPlayDelay,
    isLooped,
    includePagination,
    includeNavigation,
}: Props) {
    return (
        <Swiper
            spaceBetween={10}
            loop={isLooped == false ? false : true}
            navigation={includeNavigation ? true : false}
            autoplay={
                isAutoplay === false
                    ? false
                    : {
                          delay: autoPlayDelay,

                          disableOnInteraction: false,
                      }
            }
            pagination={includePagination ? { clickable: true } : false}
            modules={[Autoplay, Pagination, Navigation]}
            onSlideChange={(e) =>
                setActiveIndex && setActiveIndex(e.activeIndex)
            }
            breakpoints={{
                300: {
                    slidesPerView: isRenderByFullWidth ? 1 : 1.1,
                    spaceBetween: 10,
                },
                // when window width is >= 640px
                550: {
                    slidesPerView: slidesPerViewCount[0],
                    spaceBetween: 20,
                },

                // when window width is >= 768px
                768: {
                    slidesPerView: slidesPerViewCount[1],
                    spaceBetween: 30,
                },

                // when window width is >= 1024px
                1024: {
                    slidesPerView: slidesPerViewCount[2],
                    spaceBetween: 40,
                },

                // when window width is >= 1024px
                1366: {
                    slidesPerView: slidesPerViewCount[3],
                    spaceBetween: 24,
                },
            }}
            className={`mySwiper `}
        >
            {/* That's Will Render Items To UI */}
            {items}
        </Swiper>
    );
}

SwiperWrapper.propTypes = {
    items: PropTypes.array,
    slidesPerViewCount: PropTypes.array,
    autoPlayDelay: PropTypes.number,
    isLooped: PropTypes.bool,
    includePagination: PropTypes.bool,
    includeNavigation: PropTypes.bool,
    isAutoplay: PropTypes.bool,
    setResetHeight: PropTypes.func,
    setActiveIndex: PropTypes.func,
    isRenderByFullWidth: PropTypes.bool,
    classnames: PropTypes.string,
};
