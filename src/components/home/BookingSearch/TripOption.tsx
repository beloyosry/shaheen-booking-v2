export default function TripOption({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-2 cursor-pointer ${
                isActive ? "text-secondary-500" : "text-gray-400"
            }`}
        >
            <div className="flex flex-col items-center">
                <span className="text-sm">{label}</span>
                {isActive && (
                    <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full m-auto"></div>
                )}
            </div>
        </div>
    );
}
