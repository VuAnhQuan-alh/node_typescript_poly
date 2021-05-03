import UserAPI from "../../api/userAPI.js";
import { $ } from "../../utils.js";

const TopBar = {
  render() {
    return /*html*/`
      <section id="top-bar" class="bg-white shadow-lg w-full flex justify-between px-6">
        <div class="flex-1 h-16 flex justify-between items-center">
          <div class="flex relative items-center">
            <i class="fas fa-search absolute left-3 text-gray-400"></i>
            <input type="text" class="w-56 h-9 pl-10 pr-4 bg-indigo-100 text-gray-500 font-base rounded-l-md focus:outline-none" placeholder="Search...">
            <button type="button" class="h-9 px-6 bg-red-300 hover:bg-red-400 rounded-r-md text-gray-50 font-medium focus:outline-none">Search</button>
          </div>
          <div class="flex text-gray-500 text-xl">
            <div class="flex items-center cursor-pointer mr-1">
              <img src="./src/public/image/flag/en.png" alt="en.png" class="w-6">
              <span class="text-xs mx-2">English</span>
              <i class="fas fa-chevron-down text-sm"></i>
            </div>
            <div class="w-10 h-10 mx-1 rounded-full flex justify-center items-center hover:bg-gray-100 cursor-pointer">
              <i class="far fa-bell"></i>
            </div>
            <div class="w-10 h-10 mx-1 rounded-full flex justify-center items-center hover:bg-gray-100 cursor-pointer">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
        <div id="btn--user__detail" class="relative border-l border-r border-red-300 bg-gray-100">
          <div class="z-10 h-full flex justify-between items-center px-2">
            <img src="./src/public/image/users/admin.png" alt="admin" class="w-10 h-10 mr-2">
            <a href="http://localhost:1900/#/admin/user-info" class="">
              <h3 class="text-gray-700 font-medium w-24">An Luu Hung</h3>
              <h4 class="text-gray-500 text-xs">Founder</h4>
            </a>
          </div>
          <div
            id="btn-logout"
            class="cursor-pointer z-0 absolute top-16 left-0 w-40 h-10 bg-red-300 rounded-b-lg text-center leading-9 font-medium text-white"
          >
            Logout
          </div>
        </div>
      </section>
    `;
  },
  afterRender() {
    $("#btn-logout").addEventListener("click", async function() {
      await UserAPI.logout();
      localStorage.removeItem('user-info');
      window.location.href = "http://localhost:1900/#/reg-log";
    });
  }
}

export default TopBar;