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
    country: {
        countriesInfo: () =>
            externalAxios.get("https://get.geojs.io/v1/ip/geo.json"),
    },
};
