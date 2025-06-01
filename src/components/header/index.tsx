import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import Links from "./links";
import HeaderAuth from "./auth";
import MobileSidebar from "./sidebar";

function Header() {
    const [visible, setVisible] = useState(false);

    return (
        <header
            className="h-[80px] bg-[var(--primary)] flex items-center justify-center relative"
            style={{
                background:
                    "linear-gradient(180deg, #5739F3 31%, #5739F3 100%)",
            }}
        >
            <div className="container flex items-center justify-between">
                <Link to={"/"}>
                    <img
                        src={logo}
                        alt="Shasheen logo"
                        className="w-[71px] sm:w-fit"
                        loading="lazy"
                    />
                </Link>

                <Links />

                <HeaderAuth setVisible={setVisible} />
            </div>

            <MobileSidebar visible={visible} setVisible={setVisible} />
        </header>
    );
}

export default Header;
