import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import banner from "/images/home-banner-mask.png"; // Import the banner image
import stroke from "./stroke.svg"; // Import the stroke image
import plane from "./airplane.png";

function Banner() {
    const ref = useRef<HTMLElement>(null);

    const [classNames, setClassNames] = useState(
        "-top-[40%] rotate-[7deg] max-2xl:rotate-3 w-fit lg:left-[30%] xl:left-[36%] translate-x-[-50%]"
    );

    useEffect(() => {
        // Get the section's position and subtract 800px to trigger animation earlier
        const sectionTop = ref.current?.getClientRects()?.[0]?.top ?? 0;
        const triggerPoint = sectionTop - 800;

        const handlescroll = () => {
            if (window.scrollY >= triggerPoint)
                setClassNames("home-banner-plane");
            else
                setClassNames(
                    "-top-[40%] rotate-[7deg] max-2xl:rotate-3 w-fit lg:left-[30%] xl:left-[36%] translate-x-[-50%]"
                );
        };

        window.addEventListener("scroll", handlescroll);

        return () => window.removeEventListener("scroll", handlescroll);
    }, []);

    // Return a section with various elements for the banner
    return (
        <section
            ref={ref}
            className="mb-[50px] sm:mb-[100px] mt-[100px] sm:mt-[200px]"
        >
            <div className="container relative">
                <div className="lg:h-[285px] bg-secondary-500 rounded-[19.01px] p-2 sm:p-5 flex flex-col justify-center">
                    {/* Absolute positioned elements with blurred background */}
                    <div
                        className="absolute pos-center w-[67.14px] h-[66.506px] bg-white"
                        style={{ filter: "blur(63.33917999267578px)" }}
                    >
                        {" "}
                    </div>
                    <div
                        className="absolute top-0 !right-0 w-[107.677px] h-[107.677px] bg-white"
                        style={{ filter: "blur(63.33917999267578px)" }}
                    >
                        {" "}
                    </div>

                    <div className="relative z-10 lg:hidden">
                        {/* Display banner image */}
                        <img
                            src={banner}
                            alt=""
                            loading="lazy"
                            className="w-fit max-w-full object-contain m-auto mb-20 mt-[-70px] sm:mt-[-100px]"
                        />

                        {/* Display stroke image */}
                        <img
                            src={stroke}
                            alt=""
                            loading="lazy"
                            className="absolute z-10 -top-[41%] md:-top-[40%] w-fit left-[58%] md:left-[62%] translate-x-[-50%] hidden sm:block"
                        />

                        {/* Display airplane image */}
                        <img
                            src={plane}
                            alt=""
                            loading="lazy"
                            className={`absolute z-10 w-fit hidden sm:block ${classNames}`}
                        />
                    </div>

                    {/* Banner title */}
                    <h1 className="text-[20px] sm:text-[27.598px] font-[800] mb-[10px] text-white text-center lg:text-start">
                        احجز تذكرتك وأقمتك معًا الآن
                    </h1>

                    {/* Banner description */}
                    <p className="lg:max-w-[440px] xl:max-w-[743px] text-white text-[13px] sm:text-[15.835px] mb-5 text-center lg:text-start">
                        استمتع برحلة لا تُنسى مع عروضنا المميزة على تذاكر
                        الطيران وحجوزات الفنادق. اختر وجهتك المفضلة واحجز
                        تذكرتك، ثم استمتع بالراحة في أفضل الفنادق في الوجهة.
                        احجز الآن واستمتع بتجربة سفر لا تُنسى!
                    </p>

                    {/* Display the Button component with a specific title and classNames */}
                    <Link to={"/planes"}>
                        <Button
                            title={"احجز الآن"}
                            classNames={
                                "w-fit !text-[15.835px] m-auto lg:m-[initial]"
                            }
                        />
                    </Link>
                </div>

                <div className="hidden lg:block">
                    {/* Display banner image for larger screens */}
                    <img
                        src={banner}
                        alt=""
                        loading="lazy"
                        className="absolute left-0 -top-[40%] w-fit object-contain"
                    />

                    {/* Display stroke image for larger screens */}
                    <img
                        src={stroke}
                        alt=""
                        loading="lazy"
                        className="absolute z-10 -top-[32%] w-fit left-[53%] translate-x-[-50%]"
                    />

                    {/* Display airplane image for larger screens */}
                    <img
                        src={plane}
                        alt=""
                        loading="lazy"
                        className={`absolute ${classNames} z-10 xl:-top-[40%] w-fit xl:left-[36%]`}
                    />
                </div>
            </div>
        </section>
    );
}

export default Banner;
