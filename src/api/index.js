import axios from "@/plugins/axios";

export function getCars() {
  return axios.get("/api/db/car");
}

export function getCity() {
  return axios.get("/api/db/city");
}

export function getPoints(cityId) {
  return axios.get(`/api/db/point/${cityId}`);
}

export function getCategories() {
  return axios.get("/api/db/category");
}
