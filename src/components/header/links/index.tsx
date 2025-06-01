import { Fragment } from "react";
import { useAuthStore } from "../../../store/authStore";
import LoginLinks from "./LoginLinks";

export default function Links() {
    const { isAuthenticated } = useAuthStore();

    return (
        <Fragment>
            {isAuthenticated ? (
                <h2 className="text-white text-[15.208px] font-bold hidden md:block">
                    تمتع بتجربه افضل مع Shaheen-Booking
                </h2>
            ) : null}
            {!isAuthenticated ? (
                <h2 className="text-white text-[15.208px] font-bold hidden md:block">
                    سجل الدخول لتتمتع بتجربة افضل
                </h2>
            ) : null}

            {isAuthenticated ? <LoginLinks /> : null}
        </Fragment>
    );
}
