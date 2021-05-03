import axios from "axios";

export const axiosProd = axios.create({
  baseURL: "http://localhost:1211/api",
  headers: {
    'Content-type': 'application/form-data',
    // 'Authorization': `Bearer ${token}`
  }
});

export const axiosCate = axios.create({
  baseURL: "http://localhost:1211/api",
  headers: {
    'Content-type': 'application/json',
    // 'Authorization': `Bearer ${token}`
  }
});

export const axiosUser = axios.create({
  baseURL: "http://localhost:1211/api",
  headers: {
    'Content-type': 'application/json',
  }
});