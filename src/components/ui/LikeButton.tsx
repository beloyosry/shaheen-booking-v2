import type { Dispatch, SetStateAction } from "react";

type Props = {
    isHeartClicked: boolean[];
    setIsHeartClicked: Dispatch<SetStateAction<boolean[]>>;
    index: number;
};

function LikeButton({ isHeartClicked, setIsHeartClicked, index }: Props) {
    const handleHeartClick = (index: number) => {
        setIsHeartClicked((prev) => {
            const newHeartClicked = [...prev];
            newHeartClicked[index] = !newHeartClicked[index];
            return newHeartClicked;
        }); 
    };
    return (
        <div
            onClick={() => handleHeartClick(index)}
            className="absolute top-5 right-5 py-2 px-5 bg-white/10 backdrop-blur-sm rounded-b-3xl rounded-tr-2xl cursor-pointer hover:bg-white/20"
        >
            <i
                className={`fa${
                    isHeartClicked[index] ? "s" : "r"
                } fa-heart text-xl ${
                    isHeartClicked[index] ? "text-red-500" : "text-white"
                }`}
            />
        </div>
    );
}

export default LikeButton;
