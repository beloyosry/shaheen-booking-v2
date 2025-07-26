import Vector1 from "./saheen-home-vector-1.png";
import Vector2 from "./saheen-home-vector-2.png";

function Banner() {
    return (
        <div className="min-h-screen w-full mt-20 flex flex-col md:flex-row justify-between items-center">
            <div className="relative -mt-20 md:-mt-40 mb-12 md:mb-0">
                <p className="banner-text text-center md:text-left text-2xl md:text-3xl lg:text-[50px]">
                    "{" "}
                    <span
                        className="brush-bg px-2"
                        style={{ fontFamily: "Playfair Display" }}
                    >
                        Discover
                    </span>{" "}
                    the world. One booking at a time. "
                </p>
                <img
                    src={Vector1}
                    className="object-contain mx-auto md:mx-0 w-lvh"
                    alt="vector-1"
                />
            </div>

            <div className="relative mt-0 md:mt-20">
                <p className="banner-text text-center md:text-left text-2xl md:text-3xl lg:text-[50px]">
                    " The world is waiting.{" "}
                    <span
                        className="brush-bg px-2"
                        style={{ fontFamily: "Playfair Display" }}
                    >
                        Let's
                    </span>{" "}
                    get you there. "
                </p>
                <img
                    src={Vector2}
                    className="object-contain mx-auto md:mx-0 w-lvh"
                    alt="vector-2"
                />
            </div>
        </div>
    );
}

export default Banner;
