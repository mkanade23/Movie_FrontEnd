// import axios from "axios";

// export const GATEWAY = axios.create({
//   baseURL: "http://localhost:9090/api/movies", // API Gateway
//   // you can set timeout, headers etc.
// });

import axios from "axios";

export const GATEWAY = axios.create({
  baseURL: "https://movies-backend-49lv.onrender.com/api/movies",
});

