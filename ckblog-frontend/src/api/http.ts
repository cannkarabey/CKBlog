import axios from 'axios'


const api = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
withCredentials: true,
})


api.interceptors.response.use(
(r) => r,
(err) => {
// Basit hata günlüğü; ileride toast vs bağlanır
console.error('[API ERROR]', err?.response?.data || err.message)
return Promise.reject(err)
}
)


export default api