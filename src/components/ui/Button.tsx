type ButtonProps = {
    classNames?: string;
    title: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({ classNames, title, onClick }: ButtonProps) {
    return (
        <button
            className={`px-2 py-2 rounded-xl text-[12px] ${classNames}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}
