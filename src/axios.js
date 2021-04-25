import axios from "axios";

const instance = axios.create({
  baseURL: "https://free.currconv.com",
});

export default instance;
