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
            <div className="w-full flex justify-between items-center gap-4">
                <InputField
                    placeholder="Where to?"
                    type="text"
                    icon={
                        <i className="far fa-location-dot text-primary-500" />
                    }
                    name="to"
                    control={control}
                />

                <InputField
                    placeholder="Dates"
                    type="date"
                    icon={
                        <i className="far fa-calendar-days text-primary-500" />
                    }
                    name="date"
                    control={control}
                />

                <InputField
                    placeholder="Travelers"
                    type="number"
                    icon={<i className="far fa-user text-primary-500" />}
                    name="travelers"
                    control={control}
                />

                <button
                    type="submit"
                    className="bg-primary-500 text-white px-8 py-3 rounded-2xl font-medium"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
