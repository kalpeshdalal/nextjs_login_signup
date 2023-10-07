import axios from "axios"
const baseUrl = "http://localhost:4000/"

const axiosApi = axios.create({
  baseURL: baseUrl
})

axiosApi.defaults.headers.common["Authorization"] = ""

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function apiGET(url, config = {}) {
  let accessToken = localStorage.getItem("accessToken");
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  return await axiosApi.get(url, { ...config }).then(response => response).catch(error => error.response)
}
export async function apiPOST(url, data, config = {}) {
  let accessToken = localStorage.getItem("accessToken");
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response).catch((error) => error.response)
}

export async function apiPUT(url, data, config = {}) {
  let accessToken = localStorage.getItem("accessToken");
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response).catch((error) => error.response)
}

export async function apiDELETE(url, config = {}) {
  let accessToken = localStorage.getItem("accessToken");
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response).catch((error) => error.response)
}

