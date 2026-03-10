import http from "./http";

export async function login(email: string, password: string) {
  const { data } = await http.post("/auth/login", { email, password });
  const accessToken = data.data.accessToken;
  if (accessToken) localStorage.setItem("ckblog:accessToken", accessToken);
  return data;
}

export function logout() {
  localStorage.removeItem("ckblog:accessToken");
  return http.post("/auth/logout");
}

export async function me() {
  const { data } = await http.get("/auth/me");
  return data;
}
