import { useEffect, useState } from "react";
import default_country from "/images/default-country.svg";
import default_user from "/images/default_user.png";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../../../types";
import { useAuthStore } from "../../../store/authStore";
import Button from "../../ui/Button";
import { useCurrencyStore } from "../../../store/currencyStore";
import Countries from "../countries";
import Languages from "../../lang";

type LoginPartProps = {
    user: User | null;
    logout: () => Promise<void>;
    setSidebarVisible: (
        visible: boolean | ((prev: boolean) => boolean)
    ) => void;
};
type HeaderProps = {
    setVisible: (visible: boolean | ((prev: boolean) => boolean)) => void;
};

const LoginPart = ({ logout }: LoginPartProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleClose = () => setVisible(false);

        window.addEventListener("click", handleClose);

        // For clean up
        return () => window.removeEventListener("click", handleClose);
    }, []);

    return (
        <div className="relative">
            <div className="hidden sm:block">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setVisible((prev) => !prev);
                    }}
                    className="w-[42px] h-[42px] p-2 shadow-sm border border-[var(--secondary)] rounded-full flex items-center justify-center cursor-pointer"
                >
                    {/* <img
                        src={user?.img || default_user}
                        onError={(e) => (e.target.src = default_user)}
                        loading="lazy"
                        className="min-w-[37px] w-[37px] h-[37px] rounded-full object-contain"
                        alt=""
                    /> */}
                    <img
                        src={default_user}
                        onError={(e) => (e.currentTarget.src = default_user)}
                        loading="lazy"
                        className="min-w-[37px] w-[37px] h-[37px] rounded-full object-contain"
                        alt=""
                    />
                </div>

                <div
                    className={`${
                        visible ? "w-[154px]" : "w-0 px-0"
                    } z-[1100] overflow-hidden transition absolute left-0 top-12 p-[5px] bg-white rounded-[5px]`}
                    style={{
                        boxShadow: "0px 8px 30px 0px rgba(0, 0, 0, 0.10)",
                    }}
                >
                    <Link
                        to={"/profile"}
                        aria-label="navigate to user profile"
                        className="flex items-center gap-[10px] text-nowrap rounded-[5px] px-[10px] py-[15px] hover:bg-[#F0EDFF] hover:text-[var(--primary)] transition"
                    >
                        <i className="fa-duotone fa-user-secret"></i>

                        <span className="text-[12px]">حسابي</span>
                    </Link>

                    <button
                        onClick={(_) => logout()}
                        aria-label="logout user from the app"
                        className="flex items-center gap-[10px] text-nowrap rounded-[5px] px-[10px] py-[15px] hover:bg-[#F0EDFF] hover:text-[var(--primary)] transition"
                    >
                        <i className="fa-solid fa-arrow-up-left-from-circle"></i>

                        <span className="text-[12px]">تسجيل الخروج</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const Guest = () => {
    const navigate = useNavigate();

    return (
        <Button
            title={"تسجيل / دخول"}
            onClick={() => navigate("/login")}
            classNames={"hidden sm:inline-block"}
        />
    );
};

export default function HeaderAuth({ setVisible }: HeaderProps) {
    const { user, isAuthenticated, logout } = useAuthStore();
    const { currency } = useCurrencyStore();
    const [visible, setCountriesVisible] = useState(false);
    const [langVisible, setLangVisible] = useState(false);

    return (
        <div className="flex items-center gap-2">
            <div className="w-[30px] sm:w-[42px] h-[30px] sm:h-[42px] sm:p-2 shadow-sm border border-[var(--secondary)] rounded-full flex items-center justify-center">
                <p className="text-[7.247px] sm:text-[12.062px] font-medium min-w-[30px] sm:min-w-[34px] h-[30px] sm:h-[34px] rounded-full flex justify-center items-center bg-white">
                    {currency?.code || "SAR"}
                </p>
            </div>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setLangVisible((perv) => !perv);
                    setCountriesVisible(false);
                }}
                className="w-[30px] sm:w-[42px] h-[30px] sm:h-[42px] sm:p-2 shadow-sm border border-[var(--secondary)] rounded-full flex items-center justify-center cursor-pointer"
            >
                <p className="text-[7.247px] sm:text-[12.062px] font-medium min-w-[30px] sm:min-w-[34px] h-[30px] sm:h-[34px] rounded-full flex justify-center items-center bg-white">
                    AR
                </p>
            </div>

            <div
                onClick={(e) => {
                    setCountriesVisible((perv) => !perv);
                    e.stopPropagation();
                    setLangVisible(false);
                }}
                className="w-[30px] sm:w-[42px] h-[30px] p-[2px] sm:h-[42px] shadow-sm border border-[var(--secondary)] rounded-full flex items-center justify-center cursor-pointer"
            >
                <img
                    src={currency?.flag || default_country}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = default_country)}
                    className="w-full h-full rounded-full object-cover"
                    alt=""
                />
            </div>

            {isAuthenticated ? null : <Guest />}
            {isAuthenticated ? (
                <LoginPart
                    user={user}
                    logout={logout}
                    setSidebarVisible={setVisible}
                />
            ) : null}

            <div className="min-w-[30px] h-[30px] grid sm:hidden place-content-center">
                <i
                    onClick={() => setVisible((prev) => !prev)}
                    className="fa-solid fa-bars text-[25px] text-white cursor-pointer"
                ></i>
            </div>

            <Countries visible={visible} setVisible={setCountriesVisible} />

            <Languages visible={langVisible} setVisible={setLangVisible} />
        </div>
    );
}
