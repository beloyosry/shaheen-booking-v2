import apple from "/images/apple_store.png";
import google from "/images/google_play.png";
import screen_1 from "/images/mobile-screen-1.png";
import screen_2 from "/images/mobile-screen-2.png";
import yellow_plane from "/images/yellow-plane.png";
import { Link } from "react-router-dom";

function Download() {
    // Function to render the decorative patterns
    const renderBatterns = (
        startIndex: number,
        step: number,
        className: string
    ) => {
        // Generate an array of values for top positioning
        const arr = [];

        for (let i = startIndex; i < 350; i += step) {
            arr.push(i);
        }

        // Map over the array and return div elements for the decorative patterns
        return arr.map((item, index) => {
            return (
                <div
                    key={index}
                    className={className}
                    style={{
                        top: `${item}px`,
                        background:
                            "linear-gradient(90deg, rgba(245,243,243,1) 2%, rgba(90,61,240,0.7763480392156863) 39%, rgba(245,243,243,1) 88%)",
                    }}
                ></div>
            );
        });
    };

    // Return a section containing various elements
    return (
        <section className="relative mb-[50px] px-4 sm:px-0 sm:mb-[200px]">
            {/* Main container */}
            <div className="lg:w-[850px] z-10 m-auto sm:px-10 relative bg-secondary-500 rounded-[15.739px] md:h-[235.976px] flex flex-wrap md:flex-nowrap items-center justify-end">
                {/* Mobile screens for smaller screens */}
                <div className="flex items-center justify-around mb-10 mt-[-100px] gap-x-3 w-full md:hidden">
                    <img
                        src={screen_2}
                        alt=""
                        loading="lazy"
                        className="w-[140px]"
                    />

                    <img
                        src={screen_1}
                        alt=""
                        loading="lazy"
                        className="w-[155px]"
                    />
                </div>

                {/* Download information for smaller screens */}
                <div className="md:w-[380px] mb-10 md:mb-0 text-white">
                    {/* Title */}
                    <h3 className="text-[22.848px] font-[800] mb-2">
                        حمل تطبيقنا قريبا
                    </h3>

                    {/* Description */}
                    <p className="text-[13.11px] mb-4">
                        احصل على وصول سهل وسريع إلى أفضل العروض والتجارب
                        السفرية. قم بتحميل تطبيقنا الآن للحصول على تجربة سفر
                        مميزة واحجز رحلتك بكل سهولة ويسر أثناء التنقل. فقط ابحث
                        عنا في متجر التطبيقات وابدأ في استكشاف العالم!
                    </p>

                    {/* Download links */}
                    <div className="flex items-center gap-2">
                        {/* Apple Store Link */}
                        <Link to={""}>
                            <img
                                src={apple}
                                alt=""
                                loading="lazy"
                                className="w-fit"
                            />
                        </Link>

                        {/* Google Play Link */}
                        <Link to={""}>
                            <img
                                src={google}
                                alt=""
                                loading="lazy"
                                className="w-fit"
                            />
                        </Link>
                    </div>
                </div>

                {/* Background elements for smaller screens */}
                <div
                    className="bg-white w-[105.766px] h-[105.766px] rounded-full absolute -bottom-10 right-20"
                    style={{ filter: "blur(52.43915939331055px)" }}
                >
                    {" "}
                </div>
                <div
                    className="bg-white w-[105.766px] h-[105.766px] rounded-full absolute top-[30%] translate-y-[-50%] right-20"
                    style={{ filter: "blur(52.43915939331055px)" }}
                >
                    {" "}
                </div>

                {/* Mobile screens for larger screens */}
                <img
                    src={screen_1}
                    alt=""
                    loading="lazy"
                    className="absolute z-10 -right-5 w-fit hidden md:block"
                />

                <img
                    src={screen_2}
                    alt=""
                    loading="lazy"
                    className="absolute right-[115px] z-10 bottom-[0px] w-fit hidden md:block"
                />

                {/* Yellow plane image for larger screens */}
                <img
                    src={yellow_plane}
                    loading="lazy"
                    alt=""
                    className="absolute z-10 left-[-50px] lg:-left-36 -top-[150px] lg:-top-24 w-fit rotate-[90deg] lg:rotate-0 hidden md:block"
                />
            </div>

            {/* Right Battern for larger screens */}
            <div className="hidden lg:block">
                {renderBatterns(
                    -100,
                    30,
                    "absolute top-[-100px] right-[-150px] w-[55%] -rotate-[5deg] h-[0.63px]"
                )}
            </div>

            {/* Left Battern for medium screens */}
            <div className="hidden md:block">
                {renderBatterns(
                    -50,
                    25,
                    "absolute left-[60px] w-[30%] -rotate-[17deg] h-[0.63px]"
                )}
            </div>
        </section>
    );
}

export default Download;
