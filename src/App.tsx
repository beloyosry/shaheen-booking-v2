import { useAuthStateListener } from "./hooks/useAuthStateListener";
import AppRoutes from "./routes";
import { Suspense } from "react";
import Loading from "./components/ui/Loading";
import Popup from "./components/ui/Popup";
import { useInitializeApp } from "./hooks/useInitializeApp";
import useAxios from "./hooks/useAxios";

function App() {
    useAuthStateListener();
    useInitializeApp();
    useAxios(); 

    return (
        <div
            className="w-full max-w-full overflow-x-hidden"
            style={{ direction: "rtl" }}
        >
            <Suspense fallback={<Loading />}>
                <AppRoutes />

                <Popup />
            </Suspense>
        </div>
    );
}

export default App;
