// lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337/api/piste",
});


export function getAudioTrack() {
  const response = api.get("http://localhost:1337/api/piste/");
  return response.data;
}
