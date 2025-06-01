import { NavLink } from "react-router-dom";

export default function LoginLinks() {
    return (
        <ul className="hidden md:flex items-center gap-3 lg:gap-5 text-[#ffffff78]">
            <li>
                <NavLink
                    to={"/"}
                    className={
                        "text-[13px] lg:text-[15.208px] font-bold py-[22px]"
                    }
                >
                    الرائيسية
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={"planes"}
                    className={
                        "text-[13px] lg:text-[15.208px] font-bold py-[22px]"
                    }
                >
                    تذاكر الطيران
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={"hotels"}
                    className={
                        "text-[13px] lg:text-[15.208px] font-bold py-[22px]"
                    }
                >
                    الفنادق
                </NavLink>
            </li>
            {/* <li><NavLink to={'recommended-contacts'} className={'text-[13px] lg:text-[15.208px] font-bold py-[22px]'}>جهات موصي بها</NavLink></li> */}
        </ul>
    );
}
