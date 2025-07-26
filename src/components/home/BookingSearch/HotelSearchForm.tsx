import type {
    Control,
    SubmitErrorHandler,
    SubmitHandler,
} from "react-hook-form";
import InputField from "../../form/InputField";
import type { HotelsForm } from "./types";

type Props = {
    handleFormSubmit: (formData: any) => Promise<void>;
    handleSubmit: (
        onValid: SubmitHandler<any>,
        onInvalid?: SubmitErrorHandler<any> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    control: Control<HotelsForm, any, HotelsForm>;
};

export default function HotelSearchForm({
    handleFormSubmit,
    handleSubmit,
    control,
}: Props) {
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="w-full md:w-auto">
                    <InputField
                        placeholder="Where to?"
                        type="text"
                        icon={
                            <i className="far fa-location-dot text-primary-500" />
                        }
                        name="to"
                        control={control}
                    />
                </div>

                <div className="w-full md:w-auto">
                    <InputField
                        placeholder="Dates"
                        type="date"
                        icon={
                            <i className="far fa-calendar-days text-primary-500" />
                        }
                        name="date"
                        control={control}
                    />
                </div>

                <div className="w-full md:w-auto">
                    <InputField
                        placeholder="Travelers"
                        type="number"
                        icon={<i className="far fa-user text-primary-500" />}
                        name="travelers"
                        control={control}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full md:w-auto bg-primary-500 text-white px-8 py-3 rounded-2xl font-medium"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
