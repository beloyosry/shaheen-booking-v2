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
            className={`absolute left-0 transition ${
                visible
                    ? " opacity-100 visible z-[1000] top-20"
                    : "top-[300px] invisible opacity-0"
            } bg-white p-5 shadow-lg z-20 w-full`}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className={`absolute bg-white left-0 z-[1200] p-5 bg-red w-full shadow-lg`}
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
