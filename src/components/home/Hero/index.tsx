import Slider from "./Slider";

function Hero() {
    return (
        <section className="min-h-[calc(100vh-80px)] relative home-hero">
            {/* Render the Slider component */}
            <Slider />

            {/* Heading with text in Arabic */}
            <h1 className="text-[20px] sm:text-[30px] w-[80%] md:w-fit md:text-[51.537px] text-white font-[800] z-[100] pos-center sm:text-center">
                احصل على أفضل تجربة
                <br /> سفر معنا
            </h1>
        </section>
    );
}

export default Hero;
