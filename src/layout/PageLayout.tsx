function PageLayout({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`container mx-auto pt-1  bg-transparent ${className}`}
        >
            {children}
        </div>
    );
}

export default PageLayout;
