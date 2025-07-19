import BookingSearch from "../BookingSearch";
import plane from "./hero-plane.png";

function Hero() {
    return (
        <section className="hero h-screen relative flex flex-col justify-start items-start px-32 py-20">
            <h1 className="text-left text-[30px] max-w-[900px] md:w-fit md:text-[64px] text-white font-[800] ">
                Your next journey is just a{" "}
                <span className="w-fit flex items-center gap-2">
                    click away.{" "}
                    <img src={plane} alt="plane" className="w-[200px]" />
                </span>
            </h1>
            <p className="text-white text-[40px] mt-5 ">
                The world is waiting. Let’s get you{" "}
                <span
                    style={{
                        textDecorationLine: "underline",
                        textDecorationStyle: "wavy",
                        textDecorationColor: "var(--color-primary-500)",
                        textUnderlineOffset: "20.5%",
                    }}
                >
                    there
                </span>
            </p>

            <BookingSearch />
        </section>
    );
}

export default Hero;
