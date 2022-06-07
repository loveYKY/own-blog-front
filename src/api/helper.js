import http from "./http";

// http请求
const request = (method = "get", url = "", query = null, customConfig = {}) => {
  let config = {
    baseURL: "http://localhost:3001",
    method,
    url,
    [method === "get" ? "params" : "data"]: query,
    ...customConfig,
  };

  return http(config).then((res) => res.data);
};

export { request };
