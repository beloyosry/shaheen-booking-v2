import { Fragment, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import useHideDialog from "../../hooks/useHideDialog";
import type { Country } from "../../types";

type Props = {
    visible?: boolean;
    setVisible: Dispatch<
        SetStateAction<{ roomInfo: boolean; transferCountryLocation: boolean }>
    >;
    items?: Country[] | null;
    country?: Country | null;
    defaultSelected?: Country | null;
    children?: React.ReactNode;
    classNames?: string;
    panelClassNames?: string;
    itemsTemplate?: React.ReactNode;
    formik?: { setFieldValue: (arg0: string, arg1: string) => void };
    fieldname?: string;
    setState?: Dispatch<SetStateAction<Country | null>>;
    searchList?: Country[] | null;
};

function DropDown({
    visible,
    setVisible,
    items,
    country,
    defaultSelected,
    children,
    classNames,
    panelClassNames,
    itemsTemplate,
    formik,
    fieldname,
    setState,
    searchList,
}: Props) {
    const [active, setActive] = useState<string | null>(null);

    const [searchResult, setSearchResult] = useState<Country[] | null>([]);

    const [value, setValue] = useState("");

    // Create a wrapper function that adapts the complex setVisible to the simple boolean function
    // that useHideDialog expects
    const handleHideDialog = (isVisible: boolean) => {
        if (!isVisible) {
            setVisible({
                roomInfo: false,
                transferCountryLocation: false,
            });
        }
    };

    useHideDialog(handleHideDialog);

    // Update active state when country changes
    useEffect(() => {
        if (country?.id) {
            setActive(country.id);
        }
        if (defaultSelected?.id) {
            setActive(defaultSelected.id);
        }
    }, [country]);

    useEffect(() => {
        const handleSearch = (value: string) => {
            // Ensure searchList is an array before calling filter
            if (!searchList || !Array.isArray(searchList)) {
                setSearchResult([]);
                return;
            }

            const search = searchList.filter((item) =>
                item?.name?.toLowerCase().includes(value.toLowerCase())
            );

            if (!value?.length) return setSearchResult(searchList);
            return setSearchResult(search);
        };

        handleSearch(value);

        return () => {};
    }, [value, searchList]);

    return (
        <Fragment>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`border border-[#CACACE] transition relative rounded-[12.167px] py-[10px] px-2 w-full ${
                    classNames || ""
                }`}
            >
                {children}
                {itemsTemplate ? (
                    itemsTemplate
                ) : (
                    <div
                        className={`absolute ${
                            visible
                                ? "scale-100 right-0"
                                : "scale-0 right-[500px]"
                        } min-w-[285px] z-[200] top-24 rounded-[6px] h-[300px] max-h-[300px] left-0 transition w-full bg-white border border-[var(--secondary)] ${
                            panelClassNames || ""
                        }`}
                        style={{
                            boxShadow:
                                "0px 50px 40px 0px rgba(115, 115, 115, 0.12)",
                        }}
                    >
                        {searchList ? (
                            <input
                                placeholder=""
                                type="text"
                                autoFocus
                                className="border border-t-transparent p-2 mb-2 w-full"
                                onChange={(e) => setValue(e.target.value)}
                            />
                        ) : null}

                        <div
                            className="h-[250px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                            style={{
                                scrollbarWidth: "thin",
                                WebkitOverflowScrolling: "touch",
                            }}
                        >
                            {/* Render items or show a message if none are available */}
                            {(() => {
                                // Determine which array to use
                                let dataToRender: Country[] = [];

                                if (
                                    searchList &&
                                    value?.length &&
                                    Array.isArray(searchResult)
                                ) {
                                    dataToRender = searchResult;
                                } else if (Array.isArray(items)) {
                                    dataToRender = items;
                                }

                                // If we have no data to render, show a message
                                if (dataToRender.length === 0) {
                                    return (
                                        <div className="p-3 text-center">
                                            No items found
                                        </div>
                                    );
                                }

                                // Otherwise, map over the data
                                return dataToRender.map(
                                    (item: Country, index: number) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setActive(item.id || null);
                                                if (
                                                    formik &&
                                                    fieldname &&
                                                    item.id
                                                ) {
                                                    formik.setFieldValue(
                                                        fieldname,
                                                        item.id
                                                    );
                                                }
                                                if (setState) {
                                                    setState(item);
                                                }
                                                setVisible({
                                                    roomInfo: false,
                                                    transferCountryLocation:
                                                        false,
                                                });
                                            }}
                                            className={`p-[10px] transition cursor-pointer hover:bg-[#F2F2F3] ${
                                                active === item?.id
                                                    ? "bg-[#F2F2F3]"
                                                    : ""
                                            } ${
                                                index !==
                                                ((searchList && value?.length
                                                    ? searchResult?.length
                                                    : items?.length) || 0) -
                                                    1
                                                    ? "border-b border-b-[#F2F2F3]"
                                                    : "pb-0"
                                            }`}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-[14px]">
                                                    {item?.name}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <i className="fa-light fa-globe text-[10px] text-gray-500"></i>
                                                    <span className="text-[11px] text-gray-500">
                                                        {country?.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                );
                            })()}
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default DropDown;
