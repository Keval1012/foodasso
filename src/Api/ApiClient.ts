import axios from "axios";
import { ApiKey, ApiUrl } from "./constant";

const apiClient = axios.create({
    baseURL: ApiUrl,
    headers: {
        // "Content-Type": "application/json",
        "api-key": ApiKey
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem("refresh_token")
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                const response = await axios.post(
                    `${ApiUrl}/custom_auth/v1/auth/refresh/`,
                    {
                        refresh_token: refreshToken,
                    },
                    {
                        headers: {
                            "API-KEY": ApiKey,
                            "Content-Type": "application/json",
                        },
                    }
                );
                localStorage.setItem("access_token", response.data.access_token);
                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${response.data.access_token}`;
                return apiClient(originalRequest);
            } catch (err) {
                console.error("Refresh token expired", err);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;