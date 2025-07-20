import Logo from "./logo.png";

export default function Footer() {
    const socialMedia = [
        {
            name: "Facebook",
            icon: "fa-brands fa-facebook-f",
            link: "https://www.facebook.com/",
        },
        {
            name: "Twitter",
            icon: "fa-brands fa-twitter",
            link: "https://twitter.com/",
        },
        {
            name: "Instagram",
            icon: "fa-brands fa-instagram",
            link: "https://www.instagram.com/",
        },
        {
            name: "LinkedIn",
            icon: "fa-brands fa-linkedin-in",
            link: "https://www.linkedin.com/",
        },
    ];

    const destinations = [
        "Istanbul, Turkey",
        "Makkah & Madinah, Saudi Arabia",
        "Kuala Lumpur, Malaysia",
        "Bangkok, Thailand",
        "Dubai, UAE",
    ];

    return (
        <footer className="bg-secondary-50 py-14 px-10 pb-8 relative">
            {/* Content */}
            <div className="w-full relative px-5 z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Left */}
                <div className="space-y-6">
                    <img src={Logo} alt="Logo" />

                    <p className="font-semibold">
                        <span className="font-bold text-primary-500 text-xl">
                            Shaheen
                        </span>{" "}
                        is your trusted partner for unforgettable travel
                        experiences. Whether you're looking for adventure,
                        relaxation, or cultural exploration, we help you take
                        flight to your dream destinations.
                    </p>

                    {/* Social media */}
                    <div className="flex gap-4 mt-4">
                        {socialMedia.map((social) => (
                            <a
                                title={social.name}
                                key={social.name}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-12 h-12 p-4 rounded-full flex items-center justify-center cursor-pointer border border-gray-500 hover:bg-gray-500 hover:text-white transition-colors"
                            >
                                <i
                                    className={
                                        social.icon +
                                        " text-xl text-gray-500 group-hover:text-white"
                                    }
                                ></i>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Center */}
                <div className="flex flex-col items-center justify-center space-y-6">
                    <h1 className="font-semibold text-gray-500 text-xl">
                        Explore Destinations
                    </h1>
                    <div className="ms-20">
                        <ol className="list-disc space-y-2">
                            {destinations.map((destination) => (
                                <li key={destination}>{destination}</li>
                            ))}
                        </ol>{" "}
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-center justify-center space-y-6">
                    <h1 className="font-semibold text-gray-500 text-xl">
                        Contact Us
                    </h1>
                    <div className="ms-0 md:ms-20">
                        <ol className="list-disc space-y-2">
                            <li>phone: +92 300 1234567</li>
                            <li>
                                <a
                                    href="mailto:hello@shaheentravel.com"
                                    className="text-secondary-500 underline!"
                                >
                                    hello@shaheentravel.com
                                </a>
                            </li>
                        </ol>
                    </div>

                    <div className="space-y-2 ms-0 md:ms-20">
                        <h1>💌 Stay in the loop with Shaheen</h1>

                        <div className="flex justify-start items-center gap-3 bg-white rounded-2xl py-2 px-4 w-full ">
                            <i className="far fa-envelope text-primary-500"></i>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="relative mt-10 py-4 flex justify-between items-center">
                <div className="absolute left-0 top-0 w-full h-0.5 bg-primary-500" />

                <p className="text-center text-sm text-gray-500">
                    Crafted with ❤️ by the Shaheen Web Team.
                </p>
                <p className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Shaheen Travel & Tours.
                    All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
