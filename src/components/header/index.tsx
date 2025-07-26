import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LightLogo from "./logo-light.png";
import DarkLogo from "./logo-dark.png";
import HeaderAuth from "./auth";
import MobileSidebar from "./sidebar";

function Header() {
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);

    return (
        <header className="absolute top-0 z-[1000] h-[80px] bg-transparent w-full flex items-center justify-center px-2">
            <div className="container flex items-center justify-between">
                <Link to={"/"}>
                    <img
                        src={pathname === "/" ? LightLogo : DarkLogo}
                        alt="Shasheen logo"
                        className="w-full h-10 object-contain"
                        loading="lazy"
                    />
                </Link>

                <HeaderAuth setVisible={setVisible} />
            </div>

            <MobileSidebar visible={visible} setVisible={setVisible} />
        </header>
    );
}

export default Header;
