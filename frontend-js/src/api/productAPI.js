import { axiosProd } from "./axiosClient.js";

const ProductAPI = {
  list(order = "asc", limit = 4, page = 0) {
    const url = `/products?order=${order}&limit=${limit}&page=${page}`;
    return axiosProd.get(url);
  },
  read(id) {
    const url = `/product/${id}`;
    return axiosProd.get(url);
  },
  create(data, uid, token) {
    const url = `/product/create/${uid}`;
    return axiosProd.post(url, data, { headers: {"Authorization" : `Bearer ${token}`} });
  },
  update(id, data, uid, token) {
    const url = `/product/${id}/${uid}`;
    return axiosProd.put(url, data, { headers: {"Authorization" : `Bearer ${token}`} });
  },
  delete(id, uid, token) {
    const url = `/product/${id}/${uid}`;
    return axiosProd.delete(url, { headers: {"Authorization" : `Bearer ${token}`} });
  },
  all() {
    const url = `/products-all`;
    return axiosProd.get(url);
  }
}

export default ProductAPI;