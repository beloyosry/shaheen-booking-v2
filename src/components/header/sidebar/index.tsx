import { Sidebar } from "primereact/sidebar";
import logo from "/images/fill-logo.png";
import default_user from "/images/default_user.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

interface Props {
    visible: boolean;
    setVisible: (visible: boolean | ((prev: boolean) => boolean)) => void;
}

export default function MobileSidebar({ visible, setVisible }: Props) {
    const { logout, isAuthenticated } = useAuthStore();

    return (
        <Sidebar
            onHide={() => setVisible(false)}
            visible={visible}
            className="!w-full header"
            icons={null}
        >
            <div className="flex items-center justify-between p-4 border-b border-b-[#4a2bed19] mb-8">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setVisible((prev) => !prev);
                    }}
                    className="w-[42px] h-[42px] p-2 shadow-sm border border-[var(--secondary)] rounded-full flex items-center justify-center cursor-pointer"
                >
                    {/* <img
                        src={user?.img || default_user}
                        onError={(e) => (e.currentTarget.src = default_user)}
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

                <img
                    src={logo}
                    alt="Shasheen logo"
                    className="w-fit"
                    loading="lazy"
                />

                <i
                    onClick={(_) => setVisible(false)}
                    className="fa-solid fa-xmark text-[25px] cursor-pointer"
                ></i>
            </div>

            <ul className="p-[1.25rem]">
                <li className="mb-7">
                    <Link
                        onClick={(_) => setVisible(false)}
                        to={"/planes"}
                        className="text-[#646464] font-bold text-[20px]"
                    >
                        تذاكر الطيران
                    </Link>
                </li>

                <li className="mb-7">
                    <Link
                        onClick={(_) => setVisible(false)}
                        to={"/profile"}
                        className="text-[#646464] font-bold text-[20px]"
                    >
                        ملفي الشخصي
                    </Link>
                </li>

                <li className="mb-7">
                    <Link
                        onClick={(_) => setVisible(false)}
                        to={""}
                        className="text-[#646464] font-bold text-[20px]"
                    >
                        جهات موصي بها
                    </Link>
                </li>
            </ul>

            {!isAuthenticated ? (
                <Link
                    onClick={(_) => setVisible(false)}
                    to={"/login"}
                    className="absolute text-center bottom-5 w-[90%] left-[50%] translate-x-[-50%] text-[var(--primary)] text-[12.062px] border border-[var(--primary)] rounded-full py-4 font-medium"
                >
                    سجل الدخول
                </Link>
            ) : null}

            {isAuthenticated ? (
                <button
                    onClick={logout}
                    className="absolute flex items-center justify-center gap-[10px] bottom-5 w-[90%] left-[50%] translate-x-[-50%] text-[#EC6868] text-[12.062px] border border-[#EC6868] rounded-full py-4 font-medium"
                >
                    <i className="fa-light fa-arrow-up-left-from-circle text-[20px]"></i>

                    <span className="text-[20px] font-bold">تسجيل الخروج</span>
                </button>
            ) : null}
        </Sidebar>
    );
}
