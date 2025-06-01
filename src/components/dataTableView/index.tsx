import { DataView } from "primereact/dataview";
import type { JSX } from "react";

export default function DataTableView({
    data,
    gridItem,
    countOfRows,
    classNames,
}: {
    data: any[];
    gridItem: (product: any) => JSX.Element;
    countOfRows?: number;
    classNames?: string;
}) {
    // itemTemplate function that takes a product and returns the JSX for the grid item
    const itemTemplate = (product: any) => {
        if (!product) return;
        return gridItem(product);
    };

    return (
        <div className="w-full">
            <DataView
                value={data}
                paginator={data?.length > (countOfRows || 10)}
                className={`${classNames || ""}`}
                emptyMessage={"No countries available"}
                rows={countOfRows || 10}
                itemTemplate={itemTemplate}
                layout={"grid"}
                dataKey="code"
                // Improved grid layout with proper CSS classes
                // gridTemplate={
                //     "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                // }
                // Add custom styling for the grid container
                pt={{
                    grid: {
                        className:
                            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
                    },
                    content: { className: "p-0" },
                }}
            />
        </div>
    );
}
