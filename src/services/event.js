// import { EventSourcePolyfill } from "event-source-polyfill";
import axios from "axios";

const apiBase = process.env.REACT_APP_API_BASE;

const authenticate = (token) => ({
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const keyAuthLocal = localStorage.getItem("keyAuth") || "";
const secretAuthLocal = localStorage.getItem("secretAuth") || "";
const jwtLocal = localStorage.getItem("jwt") || "";

export const setupStoryBoard = () => {
  const url = `${apiBase}/1.1/board/stream?key=${keyAuthLocal}&secret=${secretAuthLocal}`;
  const evtSource = new EventSource(url, { withCredentials: true });

  return evtSource;
};

export const SendBoard = async (payload) => {
  const url = `${apiBase}/1.1/board/${keyAuthLocal}/send/${secretAuthLocal}`;
  const result = await axios
    .post(url, payload, authenticate(jwtLocal))
    .then((response) => {
      return response;
    });
  return result.data;
};
