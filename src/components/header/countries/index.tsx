import { useEffect, useState } from "react";
import useHideDialog from "../../../hooks/useHideDialog";
import { useCurrencyStore } from "../../../store/currency.store";
import DataTableView from "../../dataTableView";

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
    const [countries, setCountries] = useState<Country[]>([]);
    const { setCurrency, setCountriesData, countriesData, countryCode } =
        useCurrencyStore();

    // Effect to load countries when visible
    useEffect(() => {
        if (visible) {
            setCountriesData();
        }
    }, [setCountriesData, visible]);

    // Process countries data when it changes
    useEffect(() => {
        if (!countriesData) return;

        if (Array.isArray(countriesData)) {
            const data = countriesData.filter(
                (country) =>
                    country && country.name && country.name !== "Israel"
            );

            if (data.length > 0) {
                setCountries(data);

                // If we have the user's country code, find and set the corresponding country
                if (countryCode) {
                    const userCountry = data.find(
                        (country) => country.code === countryCode
                    );
                    if (userCountry) {
                        // Add city to the country object (if we had city info)
                        const countryWithCity = {
                            ...userCountry,
                            city: "",
                        };

                        setCurrency(countryWithCity);
                        localStorage.setItem(
                            "shaheen-currency",
                            JSON.stringify(countryWithCity)
                        );
                    } else {
                        // Set default country if user's country not found
                        if (data[0]) {
                            const defaultWithCity = {
                                ...data[0],
                                city: "",
                            };

                            setCurrency(defaultWithCity);
                            localStorage.setItem(
                                "shaheen-currency",
                                JSON.stringify(defaultWithCity)
                            );
                        }
                    }
                }
            } else {
                console.warn("Filtered countries data is empty");
                setCountries([]);
            }
        } else {
            console.error("Countries data is not an array:", countriesData);
            setCountries([]);
        }
    }, [countriesData, countryCode, setCurrency]);

    const handleClick = (country: Country) => {
        // Add city information to the country object
        const countryWithCity = {
            ...country,
            city: "", // We don't have city information, so use empty string
        };

        setCurrency(countryWithCity);
        localStorage.setItem(
            "shaheen-currency",
            JSON.stringify(countryWithCity)
        );
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

        return (
            <div
                onClick={() => handleClick(country)}
                className="p-4 border border-gray-200 rounded hover:bg-gray-100 cursor-pointer mb-3 flex items-center gap-[10px]"
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
