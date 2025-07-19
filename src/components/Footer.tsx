import { Link } from "react-router-dom";
import apple_store from "/images/apple_store.png";
import google_play from "/images/google_play.png";
import payment_ways from "/images/payment_ways.png";
import logo from "/images/logo.png";

export default function Footer() {
    const socialRoutes = [
        {
            url: "https://www.facebook.com/profile.php?id=100027949376977&locale=ar_AR&_rdc=1&_rdr",
            name: "فيسبوك",
            icon: "fa-brands fa-facebook-f",
        },
        {
            url: "https://twitter.com/AbdulmalikShahe",
            name: "تويتر",
            icon: "fa-brands fa-x-twitter",
        },
        {
            url: "https://www.instagram.com/shaheen_booking?igsh=MXAxdTVibTVkaTk5eA%3D%3D",
            name: "إنستجرام",
            icon: "fa-brands fa-instagram",
        },
        {
            url: "https://www.tiktok.com/@shaheenbooking?_t=8levdJcwQg4&_r=1",
            name: "تيك توك",
            icon: "fa-brands fa-tiktok",
        },
        {
            url: "https://www.snapchat.com/add/shaheenbooking?share_id=H5xCC2e3S3u78-XPw5D6Zg&locale=ar_SA@calendar=gregorian;numbers=latn",
            name: "اسناب شات",
            icon: "fa-brands fa-snapchat",
        },
        {
            url: "https://k.kwai.com/u/@gcepc149/TxkCWdgh",
            name: "كواي",
            icon: "fa-light fa-camera-movie",
        },
    ];

    return (
        <footer className="bg-secondary-500 py-14 pb-8 relative">
            <div className="container relative z-10">
                <div className="flex flex-col gap-3 lg:gap-7 sm:hidden border-b border-b-[#ffffff42] pb-3 mb-3">
                    <Link to={"/"}>
                        <img
                            src={logo}
                            alt="Shasheen logo"
                            className="w-fit"
                            loading="lazy"
                        />
                    </Link>
                    <span>
                        <h5 className="text-[14px] sm:text-[16px] md:text-[19.01px] font-bold text-[#E4E4E6] mb-[6px]">
                            البريد الإلكتروني
                        </h5>
                        <p className="text-white font-bold text-[22.812px]">
                            info@example.com
                        </p>
                    </span>
                </div>

                <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-3">
                    <ul className="w-full sm:w-fit">
                        <li>
                            <h2 className="text-white text-[22.812px] font-bold mb-5 flex items-center gap-2">
                                تابعنا{" "}
                            </h2>
                        </li>

                        {socialRoutes?.map((item, index) => {
                            return (
                                <li key={index} className="mb-2">
                                    <Link
                                        target="_blank"
                                        aria-label="navigate to facebook"
                                        to={item.url}
                                        className="text-[#CACACE] text-[19.01px] font-bold flex items-center gap-2"
                                    >
                                        <i className={item.icon}></i>

                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <ul className="w-full sm:w-fit">
                        <li>
                            <h2 className="text-white text-[22.812px] font-bold mb-5">
                                روابط مهمة
                            </h2>
                        </li>

                        <li className="mb-2">
                            <Link
                                aria-label="navigate to privacy"
                                to={"/privacy"}
                                className="text-[#CACACE] text-[19.01px] font-bold"
                            >
                                سياسة الخصوصية
                            </Link>
                        </li>

                        <li className="mb-2">
                            <Link
                                aria-label="navigate to conditions"
                                to={"/terms"}
                                className="text-[#CACACE] text-[19.01px] font-bold"
                            >
                                الشروط والأحكام
                            </Link>
                        </li>

                        <li className="mb-2">
                            <Link
                                aria-label="navigate to questions and answers"
                                to={"/questions"}
                                className="text-[#CACACE] text-[19.01px] font-bold"
                            >
                                سؤال وجواب
                            </Link>
                        </li>

                        <li className="mb-2">
                            <Link
                                aria-label="navigate to privacy"
                                to={"/blogs"}
                                className="text-[#CACACE] text-[19.01px] font-bold"
                            >
                                المدونة
                            </Link>
                        </li>
                    </ul>

                    <ul className="w-full sm:w-fit">
                        <li>
                            <h2 className="text-white text-[22.812px] font-bold mb-5">
                                قريبا
                            </h2>
                        </li>

                        <li className="mb-2">
                            <Link
                                aria-label="navigate to offers"
                                to={""}
                                className="text-[#CACACE] text-[19.01px] font-bold"
                            >
                                عروض حصرية
                            </Link>
                        </li>

                        <li className="mb-2">
                            <Link
                                aria-label="navigate to flights"
                                to={""}
                                className="text-[#CACACE] text-[19.01px] font-bold"
                            >
                                رحلات جوية{" "}
                            </Link>
                        </li>

                        <li className="mb-2">
                            <Link
                                aria-label="navigate to hotels"
                                to={""}
                                className="text-[#CACACE] text-[19.01px] font-bold"
                            >
                                سلسلة فنادق ممتازة
                            </Link>
                        </li>
                    </ul>

                    <div className="w-full sm:w-fit flex sm:items-end md:items-center flex-col md:flex-row gap-3 sm:gap-5 lg:gap-20">
                        <div>
                            <p className="text-white text-[32px] font-bold mb-3">
                                حمل التطبيق قريبا 😊
                            </p>

                            <div className="flex items-center gap-2">
                                <img
                                    src={apple_store}
                                    loading="lazy"
                                    className="w-fit cursor-pointer"
                                    alt=""
                                />
                                <img
                                    src={google_play}
                                    loading="lazy"
                                    className="w-fit cursor-pointer"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-[1px] bg-[#E0E0E0] my-3"></div>

                <div className="flex items-center justify-between">
                    <div className="hidden sm:flex md:items-center flex-col md:flex-row gap-3 lg:gap-7">
                        <Link to={"/"}>
                            <img
                                src={logo}
                                alt="Shasheen logo"
                                className="w-fit"
                                loading="lazy"
                            />
                        </Link>
                        <span>
                            <h5 className="text-[14px] sm:text-[16px] md:text-[19.01px] font-bold text-[#E4E4E6] mb-[6px]">
                                البريد الإلكتروني
                            </h5>
                            <p className="text-white font-bold text-[22.812px]">
                                Shaheen-Booking0@gmail.com
                            </p>
                        </span>
                    </div>

                    <img
                        src={payment_ways}
                        loading="lazy"
                        className="w-fit"
                        alt=""
                    />
                </div>
            </div>

            {/* Effects */}

            <div
                className="w-[193.146px] h-[193.146px] rounded-full absolute right-0 top-0 bg-white"
                style={{ filter: "blur(114.06249237060547px)" }}
            ></div>
            <div
                className="w-[193.146px] h-[193.146px] rounded-full absolute left-0 bottom-0 bg-white"
                style={{ filter: "blur(114.06249237060547px)" }}
            ></div>
        </footer>
    );
}
