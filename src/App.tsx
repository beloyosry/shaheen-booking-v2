import { useAuthStateListener } from "./hooks/useAuthStateListener";
import AppRoutes from "./routes";
import { Suspense } from "react";
import Loading from "./components/ui/Loading";
import Popup from "./components/ui/Popup";
import { useInitializeApp } from "./hooks/useInitializeApp";
import useAxios from "./hooks/useAxios";
import { localeStore } from "./store/locale.store";

function App() {
    useAuthStateListener();
    useInitializeApp();
    useAxios();
    const { locale } = localeStore();
    console.log(locale);

    return (
        <div
            className="w-full max-w-full overflow-x-hidden"
            dir={locale.split("-")[0].toUpperCase() === "AR" ? "rtl" : "ltr"}
        >
            <Suspense fallback={<Loading />}>
                <AppRoutes />

                <Popup />
            </Suspense>
        </div>
    );
}

export default App;
