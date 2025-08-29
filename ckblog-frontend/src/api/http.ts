import axios from "axios";

const isMock = import.meta.env.VITE_USE_MOCK === "1";

// Mock modda gerçek istek atmayacağız, yine de instance kalsın
const http = axios.create({
  baseURL: isMock ? "/api/v1" : (import.meta.env.VITE_API_BASE_URL || "/api/v1"),
  withCredentials: false, // mock modda kapalı
});

export default http;
