import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import HeaderAuth from "./auth";
import MobileSidebar from "./sidebar";

function Header() {
    const [visible, setVisible] = useState(false);

    return (
        <header className="absolute top-0 z-[1000] h-[80px] bg-transparent w-full flex items-center justify-center px-2">
            <div className="container flex items-center justify-between">
                <Link to={"/"}>
                    <img
                        src={logo}
                        alt="Shasheen logo"
                        className="w-[71px] sm:w-fit"
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
