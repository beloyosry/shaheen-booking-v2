import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div
            className="h-[calc(100vh-80px)] flex items-center justify-center flex-col"
            style={{ fontFamily: ' "Inter", sans-serif' }}
        >
            <h1>
                <span className="text-[var(--secondary)] text-[128px] font-[800]">
                    4
                </span>
                <span className="text-[var(--secondary)] text-[128px] font-[800] zero-letter">
                    0
                </span>
                <span className="text-[var(--secondary)] text-[128px] font-[800]">
                    4
                </span>
            </h1>

            <h2 className="text-[35px] font-[600] mb-8">
                Sorry, Page not{" "}
                <span className="text-[var(--secondary)]">Found</span>
            </h2>

            <Link
                to={"/"}
                aria-label="to navigate user to home page"
                className="min-btn px-20 flex items-center justify-center gap-3"
            >
                <i className="fa-regular fa-arrow-right"></i>

                <span>Home</span>
            </Link>
        </div>
    );
}
