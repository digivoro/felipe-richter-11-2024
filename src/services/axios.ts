import axios from "axios";

export const pokeApi = axios.create({
  baseURL: import.meta.env.VITE_POKEAPI_BASE_URL,
  method: "GET",
})