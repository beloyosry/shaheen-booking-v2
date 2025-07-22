import type { HotelProps } from "./types";
import { faker } from "@faker-js/faker";

export const hotels: HotelProps[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: faker.location.street(),
    location: faker.location.city(),
    rating: faker.number.int({ min: 1, max: 5 }),
    price: faker.number.int({ min: 100, max: 1000 }),
    image: `https://picsum.photos/800/600?random=${index}`,
    amenities: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => ({
            title: ["Breakfast", "Pool", "Free WiFi", "Free Parking"][
                faker.number.int({ min: 0, max: 3 })
            ],
            icon: [
                "fa-solid fa-bed",
                "fa-solid fa-bath",
                "fa-solid fa-wifi",
                "fa-solid fa-car",
            ][faker.number.int({ min: 0, max: 3 })],
        })
    ),
}));
