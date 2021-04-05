import axios from "@/plugins/axios";

export function getCars() {
  return axios.get("/api/db/car/");
}
