export interface HotelProps {
    id: number;
    name: string;
    location: string;
    rating: number;
    price: number;
    image: string;
    isFavorite?: boolean;
    amenities: {
        title: string;
        icon: string;
    }[];
}
