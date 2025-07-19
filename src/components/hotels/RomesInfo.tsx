import { useEffect, useState, useRef } from "react";

type RoomData = {
    adults: number;
    children: number;
    childrenAges: number[];
};

type Props = {
    visible: boolean;
    formik: any;
    setVisible: (prev: any) => void;
};

export default function RomesInfo({ visible, formik, setVisible }: Props) {
    // Initialize roomsData state to manage rooms individually
    const [roomsData, setRoomsData] = useState<RoomData[]>([]);

    // Store formik.setFieldValue in a ref to avoid dependency issues
    const setFieldValueRef = useRef(formik.setFieldValue);
    const isInitialMount = useRef(true);

    // Update the ref when formik.setFieldValue changes
    useEffect(() => {
        setFieldValueRef.current = formik.setFieldValue;
    }, [formik.setFieldValue]);

    // Helper function to update total adults and children counts in formik
    // Using useCallback to memoize the function and avoid dependency issues
    const updateTotalCounts = useRef(() => {
        const totalAdults = roomsData.reduce(
            (sum, room) => sum + room.adults,
            0
        );
        const totalChildren = roomsData.reduce(
            (sum, room) => sum + room.children,
            0
        );

        setFieldValueRef.current("adults", totalAdults);
        setFieldValueRef.current("children", totalChildren);
    }).current;

    // Initialize component with default room data on mount
    useEffect(() => {
        // Initialize on component mount
        const initialRooms = formik.values.paxRooms || [];
        if (initialRooms.length > 0) {
            // If we already have paxRooms in formik, use those
            setRoomsData(initialRooms);
        } else {
            // Otherwise create a default room
            const defaultRooms = Array(formik.values.rooms || 1)
                .fill(0)
                .map(() => ({
                    adults: 1,
                    children: 0,
                    childrenAges: [],
                }));
            setRoomsData(defaultRooms);

            // Update formik with the default rooms
            formik.setFieldValue("paxRooms", defaultRooms);
        }
    }, [formik]); // Include formik in dependencies

    // Handle room count changes
    useEffect(() => {
        const numRooms = formik.values.rooms || 1;

        // Only update if the room count has changed
        if (roomsData.length !== numRooms) {
            setRoomsData((prevRooms) => {
                // Create a new array based on the previous state
                let newRoomsData = [...prevRooms];

                // If we need more rooms, add them
                if (newRoomsData.length < numRooms) {
                    for (let i = newRoomsData.length; i < numRooms; i++) {
                        newRoomsData.push({
                            adults: 1,
                            children: 0,
                            childrenAges: [],
                        });
                    }
                }
                // If we need fewer rooms, remove extras
                else if (newRoomsData.length > numRooms) {
                    newRoomsData = newRoomsData.slice(0, numRooms);
                }

                return newRoomsData;
            });

            // Update adults and children counts in formik based on the new room data
            setTimeout(() => {
                updateTotalCounts();
            }, 0);
        }
    }, []);

    // This effect updates formik whenever roomsData changes
    useEffect(() => {
        // Skip initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Only update formik if we have room data
        if (roomsData.length > 0) {
            // Use the ref to access the latest setFieldValue function
            setFieldValueRef.current("paxRooms", roomsData);

            // Update the total counts for adults and children
            updateTotalCounts();
        }
    }, []); // Include updateTotalCounts in dependencies

    // Handle changes to a specific room's data
    const handleRoomChange = (
        roomIndex: number,
        field: keyof RoomData,
        value: number
    ) => {
        const updatedRooms = [...roomsData];

        // Type assertion to handle the dynamic field access
        if (field === "adults" || field === "children") {
            updatedRooms[roomIndex][field] = value;
        }

        // If changing children count, adjust childrenAges array
        if (field === "children") {
            const currentAges = updatedRooms[roomIndex].childrenAges || [];
            const newChildCount = value;

            if (currentAges.length < newChildCount) {
                // Add default ages for new children
                updatedRooms[roomIndex].childrenAges = [
                    ...currentAges,
                    ...Array(newChildCount - currentAges.length).fill(7),
                ];
            } else if (currentAges.length > newChildCount) {
                // Remove extra ages
                updatedRooms[roomIndex].childrenAges = currentAges.slice(
                    0,
                    newChildCount
                );
            }
        }

        setRoomsData(updatedRooms);
    };

    // Handle changes to a child's age in a specific room
    const handleChildAgeChange = (
        roomIndex: number,
        childIndex: number,
        age: string
    ) => {
        const updatedRooms = [...roomsData];
        updatedRooms[roomIndex].childrenAges[childIndex] = parseInt(age, 10);
        setRoomsData(updatedRooms);
    };

    // Render a single room's configuration
    const renderRoom = (room: RoomData, roomIndex: number) => {
        return (
            <div
                key={roomIndex}
                className="mb-4 p-3 border border-gray-200 rounded"
            >
                <h3 className="text-[15px] font-bold mb-2">
                    الغرفة {roomIndex + 1}
                </h3>

                <div className="flex justify-between items-center mb-3">
                    <div className="flex-1">
                        <p className="text-[13px] mb-1">بالغون</p>
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                                onClick={() =>
                                    handleRoomChange(
                                        roomIndex,
                                        "adults",
                                        Math.max(1, room.adults - 1)
                                    )
                                }
                            >
                                -
                            </button>
                            <span className="mx-3">{room.adults}</span>
                            <button
                                type="button"
                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                                onClick={() =>
                                    handleRoomChange(
                                        roomIndex,
                                        "adults",
                                        Math.min(4, room.adults + 1)
                                    )
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <p className="text-[13px] mb-1">أطفال</p>
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                                onClick={() =>
                                    handleRoomChange(
                                        roomIndex,
                                        "children",
                                        Math.max(0, room.children - 1)
                                    )
                                }
                            >
                                -
                            </button>
                            <span className="mx-3">{room.children}</span>
                            <button
                                type="button"
                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                                onClick={() =>
                                    handleRoomChange(
                                        roomIndex,
                                        "children",
                                        Math.min(4, room.children + 1)
                                    )
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Child age selectors */}
                {room.children > 0 && (
                    <div className="mt-2">
                        <p className="text-[12px] text-gray-500 mb-2">
                            أعمار الأطفال
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {Array.from({ length: room.children }).map(
                                (_, childIndex) => (
                                    <div
                                        key={childIndex}
                                        className="flex flex-col"
                                    >
                                        <label className="text-[12px] mb-1">
                                            الطفل {childIndex + 1}
                                        </label>
                                        <select
                                            name="childrenAges"
                                            aria-label="Age of child"
                                            className="p-2 border border-gray-300 rounded text-sm"
                                            value={
                                                room.childrenAges[childIndex] ||
                                                7
                                            }
                                            onChange={(e) =>
                                                handleChildAgeChange(
                                                    roomIndex,
                                                    childIndex,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {Array.from(
                                                { length: 18 },
                                                (_, i) => i
                                            ).map((age) => (
                                                <option key={age} value={age}>
                                                    {age}{" "}
                                                    {age === 1
                                                        ? "سنة"
                                                        : "سنوات"}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className={`absolute ${
                visible ? "scale-100 left-0" : "scale-0 left-[500px]"
            } top-24 px-3 rounded-[16px] z-[200] left-0 transition w-full bg-white border border-primary-500`}
            style={{ boxShadow: "0px 50px 40px 0px rgba(115, 115, 115, 0.12)" }}
        >
            <h2 className="bg-[#c5baff19] text-primary-500 text-[15px] w-full py-2 text-center">
                غرف و الاشخاص
            </h2>

            <div className="px-2 py-3">
                <div className="mb-4">
                    <p className="text-[14px] font-bold mb-2">عدد الغرف</p>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                            onClick={() => {
                                const newRoomCount = Math.max(
                                    1,
                                    (formik.values.rooms || 1) - 1
                                );
                                formik.setFieldValue("rooms", newRoomCount);
                            }}
                        >
                            -
                        </button>
                        <span className="mx-3">{formik.values.rooms || 1}</span>
                        <button
                            type="button"
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                            onClick={() => {
                                const newRoomCount = Math.min(
                                    4,
                                    (formik.values.rooms || 1) + 1
                                );
                                formik.setFieldValue("rooms", newRoomCount);
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                    {roomsData.map((room, index) => renderRoom(room, index))}
                </div>

                <div className="flex items-center gap-2 mt-3">
                    <button
                        type="button"
                        className="text-[#6750A4] px-3 py-[16px] hover:bg-[#6750A4]/10 rounded"
                        onClick={() => {
                            // Update total counts one last time before closing
                            updateTotalCounts();

                            // Close the room info panel when confirmed
                            setVisible((prev: any) => ({
                                ...prev,
                                roomInfo: false,
                            }));
                        }}
                    >
                        تاكيد
                    </button>
                    <button
                        type="button"
                        className="text-[#6750A4] px-3 py-[16px] hover:bg-[#6750A4]/10 rounded"
                        onClick={() => {
                            // Reset to default values - one room with one adult
                            const defaultRooms = [
                                {
                                    adults: 1,
                                    children: 0,
                                    childrenAges: [],
                                },
                            ];
                            formik.setFieldValue("rooms", 1);
                            setRoomsData(defaultRooms);
                            formik.setFieldValue("paxRooms", defaultRooms);
                        }}
                    >
                        إعادة
                    </button>
                </div>
            </div>
        </div>
    );
}
