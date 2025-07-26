import { useEffect, useState } from "react";
import default_user from "/images/default_user.png";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../../../types";
import { useAuthStore } from "../../../store/auth.store";
import Button from "../../ui/Button";
import Languages from "../../lang";
import { localeStore } from "../../../store/locale.store";

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
                    className="w-[42px] h-[42px] p-2 shadow-sm border border-secondary-500 rounded-full flex items-center justify-center cursor-pointer"
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
                        className="flex items-center gap-[10px] text-nowrap rounded-[5px] px-[10px] py-[15px] hover:bg-[#F0EDFF] hover:text-primary-500 transition"
                    >
                        <i className="fa-duotone fa-user-secret"></i>

                        <span className="text-[12px]">حسابي</span>
                    </Link>

                    <button
                        onClick={() => logout()}
                        aria-label="logout user from the app"
                        className="flex items-center gap-[10px] text-nowrap rounded-[5px] px-[10px] py-[15px] hover:bg-[#F0EDFF] hover:text-primary-500 transition"
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
            title="Sign Up"
            onClick={() => navigate("/login")}
            classNames={"hidden sm:inline-block bg-primary-500 text-white px-5"}
        />
    );
};

export default function HeaderAuth({ setVisible }: HeaderProps) {
    const { user, isAuthenticated, logout } = useAuthStore();
    const { isArabic } = localeStore();
    const [langVisible, setLangVisible] = useState(false);

    return (
        <div className="flex items-center gap-2">
            <Button
                title={isArabic ? "ARABIC" : "ENGLISH"}
                onClick={(e) => {
                    e.stopPropagation();
                    setLangVisible((perv) => !perv);
                }}
                classNames="bg-black text-white"
            />
            {isAuthenticated ? (
                <LoginPart
                    user={user}
                    logout={logout}
                    setSidebarVisible={setVisible}
                />
            ) : (
                <Guest />
            )}

            {/* Mobile menu */}
            <div className="min-w-[30px] h-[30px] grid sm:hidden place-content-center">
                <i
                    onClick={() => setVisible((prev) => !prev)}
                    className="fa-solid fa-bars text-[25px] text-white cursor-pointer"
                ></i>
            </div>

            <Languages visible={langVisible} setVisible={setLangVisible} />
        </div>
    );
}
