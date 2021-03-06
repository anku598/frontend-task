export const HOST = process.env.VUE_APP_DEVHOST
  ? process.env.VUE_APP_DEVHOST
  : process.env.NODE_ENV === "development"
  ? "http://localhost:8000"
  : "";

export const API_URL = `${HOST}/api`;
