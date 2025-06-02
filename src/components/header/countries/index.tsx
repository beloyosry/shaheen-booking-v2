import { useEffect } from "react";
import useHideDialog from "../../../hooks/useHideDialog";
import DataTableView from "../../dataTableView";
import { useRegionStore } from "../../../store/regions.store";

type Props = {
    visible: boolean;
    setVisible: (visible: boolean | ((prev: boolean) => boolean)) => void;
};

interface Country {
    code: string;
    name: string;
    city?: string;
    flag?: string;
}

export default function Countries({ visible, setVisible }: Props) {
    useHideDialog(setVisible);
    const { countries, getCountries, selectedCountry, setSelectedCountry } =
        useRegionStore();

    useEffect(() => {
        // Only fetch countries when the component becomes visible and countries are empty
        if (visible && countries.length === 0) {
            getCountries();
        }
    }, [visible, countries.length, getCountries]);

    const handleClick = (country: Country) => {
        // Add city information to the country object if it doesn't exist
        const countryWithCity = {
            ...country,
            city: country.city || "", // Use existing city or empty string
            currency: country.code, // Use country code as currency
        };

        // Set as selected country in the region store
        setSelectedCountry(countryWithCity);

        // Also update the currency store
        // setCurrency(countryWithCity);

        setVisible(false);
    };

    const gridItem = (country: Country) => {
        // If country is undefined or null, render a placeholder
        if (!country) {
            return (
                <div className="p-4 border border-gray-200 rounded cursor-not-allowed">
                    No country data
                </div>
            );
        }

        // Check if this country is the currently selected one
        const isSelected = selectedCountry?.code === country.code;

        return (
            <div
                onClick={() => handleClick(country)}
                className={`p-4 border ${
                    isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                } rounded hover:bg-gray-100 cursor-pointer mb-3 flex items-center gap-[10px]`}
                style={{ minHeight: "60px", width: "100%" }}
            >
                {country?.flag && (
                    <img
                        src={country?.flag}
                        alt={country?.name || "Country flag"}
                        loading="lazy"
                        className="w-[30px] h-[30px] object-contain"
                    />
                )}

                <span className="text-[14px] font-medium">
                    {country?.name || "Unknown Country"}
                </span>
                {isSelected && (
                    <span className="ml-auto text-blue-500 text-sm font-medium">
                        ✓ Selected
                    </span>
                )}
            </div>
        );
    };

    return (
        <section
            onClick={(e) => e.stopPropagation()}
            className={`absolute left-0 transition ${
                visible
                    ? " opacity-100 visible z-[1000] top-20"
                    : "top-[300px] invisible opacity-0"
            } bg-white p-5 shadow-lg z-20 w-full`}
        >
            <div
                className={`absolute bg-white left-0 z-[1200] p-5 bg-red w-full shadow-lg`}
            >
                <div className={`container lg:px-32`}>
                    <h1 className="font-bold p-[10px] border-b border-b-[#1010101A] h-fit mb-3">
                        الدولة/ المنطقة
                    </h1>

                    <DataTableView
                        data={countries}
                        gridItem={gridItem}
                        countOfRows={44}
                    />
                </div>
            </div>
        </section>
    );
}
