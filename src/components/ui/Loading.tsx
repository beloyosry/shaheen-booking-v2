import stroke from "../../assets/loading/stroke.svg";
import plane from "../../assets/loading/plane.png";
import logo from "/images/logo.png";
import { useLoadingStore } from "../../store/loading.store";

function Loading() {
    const { isLoading } = useLoadingStore();
    return (
        <div
            className={`fixed ${
                !isLoading ? "opacity-0 !z-[-1]" : "opacity-100 z-[1000]"
            } w-full bg-primary-500 h-[100vh]`}
        >
            <div
                className="absolute left-0 bottom-0 w-[169px] h-[169px] rounded-full bg-white"
                style={{ filter: "blur(131.1999969482422px)" }}
            ></div>
            <div
                className="absolute right-0 bottom-0 w-[169px] h-[169px] rounded-full bg-white"
                style={{ filter: "blur(131.1999969482422px)" }}
            ></div>
            <div
                className="absolute right-0 top-0 w-[169px] h-[169px] rounded-full bg-white"
                style={{ filter: "blur(131.1999969482422px)" }}
            ></div>
            <div
                className="absolute left-0 top-0 w-[169px] h-[169px] rounded-full bg-white"
                style={{ filter: "blur(131.1999969482422px)" }}
            ></div>

            <img
                src={stroke}
                className="w-fit absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[360deg]"
                alt=""
            />

            <img
                src={plane}
                className={`w-fit absolute ${isLoading ? "plane-loader" : ""}`}
                alt=""
            />

            <img
                src={logo}
                className="w-fit absolute top-[17%] left-[35%]"
                alt=""
            />
        </div>
    );
}

export default Loading;
