import UserAPI from "../../api/userAPI.js";
import { $ } from "../../utils.js";

const UserUpdate = {
  async render() {
    let user = localStorage.getItem('user-info');
    user = JSON.parse(user);
    const { user: { _id }, token } = user;
    const { data: _user } = await UserAPI.read(_id, token);
    return /*html*/`
      <section id="user-info" class="max-h-full mx-6 mt-6 py-5 bg-white rounded">
        <div class="flex justify-between mx-5">
          <img src="./src/public/image/users/admin.png" alt="" class="w-96 h-96" />
          <div class="ml-20 flex-1">
            <div class="text-center text-gray-700 font-bold text-2xl">User dashboard</div>
            <div class="h-72 mt-8 space-y-2 text-gray-700">
              <div class="flex">
                <label class="w-36 text-gray-600 text-xl">Username</label>
                <input
                  type="text"
                  id="username"
                  value="${_user.name}"
                  class="w-72 px-3 py-1 rounded bg-indigo-100 border border-1 border-gray-300 focus:outline-none focus:border-green-300 focus:bg-white"
                />
                <input type="hidden" id="user-id" data-id="${_id}">
              </div>
              <div class="flex">
                <div class="w-36 text-gray-600 text-xl">Email</div>
                <input
                  type="text"
                  value="${_user.email}"
                  class="w-72 px-3 py-1 rounded bg-white border border-1 border-gray-300"
                  disabled
                />
              </div>
              <div class="flex">
                <div class="w-36 text-gray-600 text-xl">About</div>
                <textarea
                  id="about"
                  rows="4"
                  class="w-72 px-3 py-1 rounded bg-indigo-100 border border-1 border-gray-300 focus:outline-none focus:border-green-300 focus:bg-white"
                >${_user.about ? _user.about : ''}</textarea>
              </div>
            </div>
            <div class="flex space-x-4">
              <div
                id="btn__update--info"
                class="w-40 h-8 py-1 bg-red-300 hover:bg-red-400 text-white font-medium rounded text-center cursor-pointer"
              >Update</div>
              <a
                href="/#/admin/user-info"
                class="w-40 h-8 py-1 bg-indigo-300 hover:bg-indigo-400 text-white font-medium rounded text-center"
              >Detail</a>
            </div>
          </div>
        </div>
      </section>
    `;
  },
  afterRender() {
    $("#btn__update--info").addEventListener("click", async function() {
      let user = localStorage.getItem('user-info');
      user = JSON.parse(user);
      const { user: { _id }, token } = user;
      const _user = {
        name: $("#username").value,
        about: $("#about").value
      }
      await UserAPI.update(_id, _user, token);
      window.location.href = "http://localhost:1900/#/admin/user-info";
    });
  }
}

export default UserUpdate;