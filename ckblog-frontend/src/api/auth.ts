import http from "./http";
const isMock = import.meta.env.VITE_USE_MOCK === "1";

export async function login(email: string, _password: string) {
  if (isMock) {
    // sahte token
    localStorage.setItem("ckblog:accessToken", "mocktoken");
    return { accessToken: "mocktoken" };
  }
  const { data } = await http.post("/auth/login", { email, password: _password });
  if (data?.accessToken) localStorage.setItem("ckblog:accessToken", data.accessToken);
  return data;
}

export function logout() {
  localStorage.removeItem("ckblog:accessToken");
  if (isMock) return Promise.resolve();
  return http.post("/auth/logout");
}

export async function me() {
  if (isMock) {
    return { data: { id: "u1", name: "Mock Admin", email: "admin@mock.local", role: "ADMIN" } };
  }
  const { data } = await http.get("/auth/me");
  return data;
}
