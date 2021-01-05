import axios from "axios";

const ApiClient = axios.create({
  baseURL: "http://localhost:3000/api"
    // process.env.NODE_ENV === "production"
    //   ? `${window.location.origin}/api`
    //   : "http://localhost:3000/api",
});

export default ApiClient;
