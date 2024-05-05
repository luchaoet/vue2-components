
import { Interceptors } from "./interceptors";

const axios = new Interceptors().getInterceptors();

const request = (config) => {
  const url = config.url;
  const data = config.data || {};
  const method = config?.method?.toLowerCase();
  const message = config?.message ?? true;
  const _config = {
    ...config,
    data,
    method,
    message
  }
  let http = null;
  switch (method) {
    case 'post': http = axios.post(url, data, _config); break;
    case 'put': http = axios.put(url, data, _config); break;
    case 'delete': http = axios.delete(url, _config); break;
    default: http = axios.get(url, { params: data, ..._config });
  }


  return new Promise((resolve, reject) => {
    http.then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err)
    });
  });
}


// export const axiosPlugin = {
//   install(app) {
//     app.config.globalProperties.$axios = request;
//   },
// };

export default request;