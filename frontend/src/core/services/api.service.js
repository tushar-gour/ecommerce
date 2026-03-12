import axios from "axios";

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: "/api",
      headers: { "Content-Type": "application/json" },
    });

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        const message = error.response?.data?.message || "Something went wrong";
        return Promise.reject(new Error(message));
      },
    );
  }

  get(url, params) {
    return this.client.get(url, { params });
  }

  post(url, data) {
    return this.client.post(url, data);
  }

  put(url, data) {
    return this.client.put(url, data);
  }

  patch(url, data) {
    return this.client.patch(url, data);
  }

  delete(url) {
    return this.client.delete(url);
  }
}

export default new ApiService();
