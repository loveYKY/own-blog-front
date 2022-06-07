import { request } from "@/api/helper";

//测试

const login = (query) => {
  return request("post", "/Api/login", query);
};


const apiObj = {
    login
}

export default apiObj