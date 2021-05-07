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
  return axios.put(`/api/db/order/${orderId}`, { ...order });
}

export function getOrderById(orderId) {
  return axios.get(`/api/db/order/${orderId}`);
}

export function cancelOrderById(orderId, data) {
  return axios.put(`/api/db/order/${orderId}`, {
    id: orderId,
    ...data,
    orderStatusId: "5e26a1f5099b810b946c5d8c",
  });
}

export function getRate() {
  return axios.get(`/api/db/rate`);
}
