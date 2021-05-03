import { $, parseReqUrl } from "../../utils.js";

const Sidebar = {
  render: () => {
    return /*html*/`
      <section id="sidebar" class="bg-red-400 lg:w-64 min-h-screen h-full">
        <a href="" class="h-16 flex items-center focus:outline-none">
          <img src="./src/public/image/home/logo-white.png" alt="logo" class="w-36 mx-auto">
        </a>
        <div class="text-gray-50 text-sm mx-5">
          <h3 class="uppercase font-medium mt-2 mb-4 ml-2">navigation</h3>
          <a href="/#/admin" id="side-nav-item" data-url="" class="mb-1 pl-2 py-1 rounded flex items-center cursor-pointer transition delay-100 duration-150 ease-in-out hover:bg-white hover:text-red-400">
            <i class="fas fa-igloo w-5"></i>
            <span class="ml-4">Dashboard</span>
          </a>
          <a href="/#/admin/customer" id="side-nav-item" data-url="customer" class="mb-1 pl-2 py-1 rounded flex items-center cursor-pointer transition delay-100 duration-150 ease-in-out hover:bg-white hover:text-red-400">
            <i class="fas fa-users w-5"></i>
            <span class="ml-4">Customer</span>
          </a>
          <a href="/#/admin/order" id="side-nav-item" data-url="order" class="mb-1 pl-2 py-1 rounded flex items-center cursor-pointer transition delay-100 duration-150 ease-in-out hover:bg-white hover:text-red-400">
            <i class="fas fa-shopping-bag w-5"></i>
            <span class="ml-4">Orders</span>
          </a>
          <a href="/#/admin/category" id="side-nav-item" data-url="category" class="mb-1 pl-2 py-1 rounded flex items-center cursor-pointer transition delay-100 duration-150 ease-in-out hover:bg-white hover:text-red-400">
            <i class="fas fa-stream w-5"></i>
            <span class="ml-4">Categories</span>
          </a>
          <a href="/#/admin/product" id="side-nav-item" data-url="product" class="mb-1 pl-2 py-1 rounded flex items-center cursor-pointer transition delay-100 duration-150 ease-in-out hover:bg-white hover:text-red-400">
            <i class="fas fa-cubes w-5"></i>
            <span class="ml-4">Products</span>
          </a>
          <a href="/#/admin/task" id="side-nav-item" data-url="task" class="mb-1 pl-2 py-1 rounded flex items-center cursor-pointer transition delay-100 duration-150 ease-in-out hover:bg-white hover:text-red-400">
            <i class="fas fa-tasks w-5"></i>
            <span class="ml-4">Tasks</span>
          </a>
        </div>
      </section>
    `;
  },
  afterRender() {
    const { hash_two } = parseReqUrl();
    $("#side-nav-item").forEach(item => {
      if (hash_two === item.dataset.url) {
        $("#side-nav-item").forEach(item => item.classList.remove("bg-white", "text-red-400"));
        item.classList.add("bg-white", "text-red-400");
      }
    });
  }
}

export default Sidebar;