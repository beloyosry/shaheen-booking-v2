import type { LoginData, RegisterData } from "../types";
import { getCookie } from "../utils";
import api from "./api";
import axios from "axios";

// Create a separate axios instance for external API calls without auth headers
const externalAxios = axios.create();
// Reset any default headers that might cause CORS issues
delete externalAxios.defaults.headers.common["Authorization"];
delete externalAxios.defaults.headers.common["X-Requested-With"];

const token = getCookie("shaheen_token");

export const ENDPOINTS = {
    auth: {
        login: (data: LoginData) =>
            api.post(`/login?email=${data.email}&password=${data.password}`),
        register: (data: RegisterData) => api.post("/register", data),
        logout: () =>
            api.post("/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        resetPassword: () => api.post(`/reset-password`),
        profile: () => api.get(`/profile`),
    },
    regions: {
        getUserCountry: () =>
            externalAxios.get("https://get.geojs.io/v1/ip/geo.json"),
        /*Response :
            {
                "area_code": "0",
                "organization_name": "Etisalat Misr",
                "country_code": "EG",
                "country_code3": "EGY",
                "continent_code": "AF",
                "region": "Cairo Governorate",
                "latitude": "30.0507",
                "longitude": "31.2489",
                "accuracy": 5,
                "asn": 36992,
                "timezone": "Africa\/Cairo",
                "city": "Cairo",
                "organization": "AS36992 Etisalat Misr",
                "country": "Egypt",
                "ip": "2c0f:fc89:8070:e18d:ac30:9f84:5771:d0a"
            }
        */

        getFlag: (countryCode: string) =>
            api.get(
                `https://flagcdn.com/w80/${countryCode!.toLowerCase()}.png`
            ),

        getRegions: () => api.get("/regions"),
        /*Response :
            {
                "success": true,
                "message": "Success api call",
                "data": {
                    "perPage": 10,
                    "currentPage": 1,
                    "lastPage": 4980,
                    "nextPageUrl": "https:\/\/dev.shaheen-booking.com\/api\/regions?page=2",
                    "items": [
                        {
                            "id": 1,
                            "code": "106078",
                            "name": "Albanien",
                            "country": {
                                "id": 1,
                                "code": "AL",
                                "name": "Albania",
                                "createdAt": "2025-05-03 11:28:50",
                                "updatedAt": "2025-05-03 11:28:50"
                            },
                            "createdAt": "2025-05-03 11:28:50",
                            "updatedAt": "2025-05-03 11:28:50"
                        },
                    ]
            }
        */

        getCountries: () => api.get("/regions/countries"),
        /*Response :
            {
                "success": true,
                "message": "Success api call",
                "data": {
                    "perPage": 10,
                    "currentPage": 1,
                    "lastPage": 4980,
                    "nextPageUrl": "https:\/\/dev.shaheen-booking.com\/api\/regions?page=2",
                    "items": [
                        {
                            "code": "AL",
                            "name": "Albania"
                        },
                        {
                        "code": "AD",
                        "name": "Andorra"
                    },
                    {
                        "code": "AG",
                        "name": "Antigua"
                    },
                    {
                        "code": "AR",
                        "name": "Argentina"
                    },
                ]
            }
        */

        getCities: (country_code: string) =>
            api.post("/regions/cities", { country_code }),
        /* Response:
            {
                "success": true,
                "message": "Success api call",
                "data": [
                    {
                        "code": "100639",
                        "name": "6th of October City"
                    },
                    {
                        "code": "100332",
                        "name": "Abu Dabab"
                    },
                    {
                        "code": "100119",
                        "name": "Abu Simbel"
                    },
                ]
            }
        */
    },
    hotel: {
        public: {
            hotelsByCityCode: (data: { city_code: string; details: string }) =>
                api.post("/hotel/tbo-codes", {
                    city_code: data.city_code,
                    detailes: false,
                }),
        },
    },
};
