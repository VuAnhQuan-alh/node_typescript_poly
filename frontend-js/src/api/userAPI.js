import { axiosUser } from "./axiosClient.js";

const UserAPI = {
  login(data) {
    const url = `/sign-in`;
    return axiosUser.post(url, data);
  },
  regis(data) {
    const url = '/signup';
    return axiosUser.post(url, data);
  },
  logout() {
    const url = '/sign-out';
    return axiosUser.get(url);
  },

  read(id, token) {
    const url = `/user/${id}`;
    return axiosUser.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
  },
  update(id, data, token) {
    const url = `/user/${id}`;
    return axiosUser.put(url, data, { headers: {"Authorization" : `Bearer ${token}`} });
  },
  secret(id, token) {
    const url = `/secret/${id}`;
    return axiosUser.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
  }
}

export default UserAPI;