import { createContext, useContext, type PropsWithChildren } from "react";
import Loading from "../components/ui/Loading";
import { useLoadingStore } from "../store/loading.store";

type LoadingContextType = {
    isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
});

export function LoadingProvider({ children }: PropsWithChildren) {
    const { isLoading } = useLoadingStore();

    return (
        <LoadingContext.Provider value={{ isLoading }}>
            {isLoading ? <Loading /> : children}
        </LoadingContext.Provider>
    );
}

// Hook to Use Loading Context
export const useLoading = () => useContext(LoadingContext);
