import BookingSearch from "../BookingSearch";
import plane from "./hero-plane.png";

function Hero() {
    return (
        <section className="hero min-h-screen relative flex flex-col justify-start items-start px-4 py-20 sm:px-8 md:px-16 lg:px-32">
            <h1 className="text-left text-[24px] sm:text-[30px] max-w-full sm:max-w-[600px] md:max-w-[900px] md:w-fit md:text-[48px] lg:text-[64px] text-white font-[800]">
                Your next journey is just a{" "}
                <span className="w-fit flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    click away.{" "}
                    <img 
                        src={plane} 
                        alt="plane" 
                        className="w-[100px] sm:w-[150px] md:w-[200px] mt-2 sm:mt-0" 
                    />
                </span>
            </h1>
            <p className="text-white text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] mt-3 md:mt-5">
                The world is waiting. Let's get you{" "}
                <span className="wavy-text">there</span>
            </p>

            <BookingSearch />
        </section>
    );
}

export default Hero;
