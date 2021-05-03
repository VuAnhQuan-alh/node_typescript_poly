import UserAPI from "../../api/userAPI.js";
import { $ } from "../../utils.js";

const InfoUser = {
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
            <div class="h-72 mt-8 space-y-2">
              <div class="flex">
                <div class="w-36 text-gray-600 text-xl">Username:</div>
                <div class="">${_user.name}</div>
              </div>
              <div class="flex">
                <div class="w-36 text-gray-600 text-xl">Email:</div>
                <div class="">${_user.email}</div>
              </div>
              ${_user.about ? `<div class="flex">
                <div class="w-36 text-gray-600 text-xl">About:</div>
                <div class="">${_user.about}</div>
              </div>` : ''}
            </div>
            <div class="flex space-x-4">
              <div id="btn__update--info" class="w-40 h-8 py-1 bg-red-300 hover:bg-red-400 text-white font-medium rounded text-center cursor-pointer">Update account</div>
              <div id="btn__change--password" class="w-40 h-8 py-1 bg-indigo-300 hover:bg-indigo-400 text-white font-medium rounded text-center cursor-pointer">Change password</div>
            </div>
          </div>
        </div>
      </section>
    `;
  },
  afterRender() {
    $("#btn__update--info").addEventListener("click", () => {
      window.location.href = "http://localhost:1900/#/admin/user-update";
    });
  }
}

export default InfoUser;