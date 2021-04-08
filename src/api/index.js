import axios from "@/plugins/axios";

export function getCars() {
  return axios.get("/api/db/car");
}

export function getCity() {
  return axios.get("/api/db/city");
}

export function getPoints(cityId) {
  return axios.get(`/api/db/point?cityId=${cityId}`);
}

export function getCategories() {
  return axios.get("/api/db/category");
}

export function createOrder(order) {
  return axios.post("/api/db/order", { order });
}

export function updateOrder(order) {
  return axios.put("/api/db/order", { order });
}
