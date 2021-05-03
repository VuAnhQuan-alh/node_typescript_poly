import { axiosCate } from "./axiosClient.js";

const CategoryAPI = {
  list() {
    const url = '/categories';
    return axiosCate.get(url);
  },
  read(id) {
    const url = `/category/${id}`;
    return axiosCate.get(url);
  },
  create(data) {
    const url = '/category';
    return axiosCate.post(url, data);
  },
  update(data, id) {
    const url = `/category/${id}`;
    return axiosCate.put(url, data);
  },
  delete(id) {
    const url = `/category/${id}`;
    return axiosCate.delete(url);
  }
}

export default CategoryAPI;