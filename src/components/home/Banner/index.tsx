import Vector1 from "./saheen-home-vector-1.png";
import Vector2 from "./saheen-home-vector-2.png";

function Banner() {
    return (
        <div className="min-h-screen w-full flex justify-between items-center">
            <div className="relative w-full h-[1000px] -mt-40">
                <p className="banner-text">
                    "{" "}
                    <span
                        className="text-primary-500"
                        style={{ fontFamily: "Playfair Display" }}
                    >
                        Discover
                    </span>{" "}
                    the world. One booking at a time. "
                </p>
                <img
                    src={Vector1}
                    className="w-full h-full object-contain"
                    alt="vector-1"
                />
            </div>

            <div className="relative w-full h-[1000px] mt-20">
                <p className="banner-text">
                    " The world is waiting.{" "}
                    <span
                        className="text-primary-500"
                        style={{ fontFamily: "Playfair Display" }}
                    >
                        Let’s
                    </span>{" "}
                    get you there. "
                </p>
                <img
                    src={Vector2}
                    className="w-full h-full object-contain"
                    alt="vector-2"
                />
            </div>
        </div>
    );
}

export default Banner;
