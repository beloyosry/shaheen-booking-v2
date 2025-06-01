import useHideDialog from "../../hooks/useHideDialog";
import DataTableView from "../dataTableView";
import { data, gridItem } from "./data";

type Props = {
    visible: boolean;
    setVisible: (visible: boolean | ((prev: boolean) => boolean)) => void;
};

export default function Languages({ visible, setVisible }: Props) {
    useHideDialog(setVisible);

    return (
        <div
            className={`absolute  w-full transition-all bg-white left-0 z-50  ${
                visible
                    ? "bottom-0 opacity-100 visible"
                    : "-bottom-[300px] opacity-0 invisible"
            }`}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className={`absolute bg-white left-0 p-5 bg-red w-full h-full shadow-lg z-50`}
            >
                <div className={`container lg:px-32`}>
                    {visible ? (
                        <DataTableView
                            data={data}
                            countOfRows={40}
                            gridItem={gridItem}
                        ></DataTableView>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
