import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./LoadingProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            <LoadingProvider>{children}</LoadingProvider>
        </BrowserRouter>
    );
}
