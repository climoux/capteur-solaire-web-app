import axios from 'axios';

const API_BASE_URL = 'https://api-sah.wevaw.com';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_SECRET');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const pairDevice = async (pairingCode: string) => {
    const response = await api.post(`/devices/pair`, { pairingCode });
    return response.data;
};

export const getDevice = async (id: string) => {
    const response = await api.get(`/devices/${id}`);
    return response.data;
};

export const setTargetTemperature = async (id: string, targetTemperature: number) => {
    const response = await api.post(`/devices/${id}/command/temperature`, { targetTemperature });
    return response.data;
};

export const setFanControl = async (id: string, mode: string, speed: number) => {
    const response = await api.post(`/devices/${id}/command/fan`, { mode, speed });
    return response.data;
};

/*export const setTrapdoorControl = async (id: string, mode: string, state: string) => {
    const response = await api.post(`/devices/${id}/command/trapdoor`, { mode, state });
    return response.data;
};*/

export const getHistory = async (id: string) => {
    const response = await api.get(`/devices/${id}/history`);
    return response.data;
};

export default api;