import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.10.227:3333",
});

export default api;
