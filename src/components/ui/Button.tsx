type ButtonProps = {
    classNames?: string;
    title: string;
    onClick?: () => void;
};

export default function Button({ classNames, title, onClick }: ButtonProps) {
    return (
        <button
            className={`p-1 border border-white rounded-full text-[12.062px] ${classNames}`}
            onClick={onClick}
        >
            <span className="block rounded-full bg-white font-medium text-[var(--primary)] h-full py-[6px] w-[80px] sm:w-[112px]">
                {title}
            </span>
        </button>
    );
}
