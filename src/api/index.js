import axios from "@/plugins/axios";

export function getCars() {
  return axios.get("/api/db/car");
}

export function getCar(carId) {
  return axios.get(`/api/db/car/${carId}`);
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
  return axios.post("/api/db/order", { ...order });
}

export function updateOrder(orderId, order) {
  return axios.post(`/api/db/order/${orderId}`, { ...order });
}

export function getOrderById(orderId) {
  return axios.get(`/api/db/order/${orderId}`);
}

export function cancelOrderById(orderId) {
  return axios.put(`/api/db/orderStatus/${orderId}`);
}

export function getRate() {
  return axios.get(`/api/db/rate`);
}
