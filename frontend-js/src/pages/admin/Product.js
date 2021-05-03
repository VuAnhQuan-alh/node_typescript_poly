import ProductAPI from "./../../api/productAPI.js";
import CategoryAPI from "../../api/categoryAPI.js";
import ProdAction from "../../components/admin/Prod-action.js";
import { $, toBase64 } from "../../utils.js";
import UserAPI from "../../api/userAPI.js";

const Product = {
  async render() {
    let user = localStorage.getItem('user-info');
    user = JSON.parse(user);
    const { user: { _id }, token } = user;
    await UserAPI.secret(_id, token)
    .catch(() => {
      window.location.href = "http://localhost:1900/#/admin/user-info";
    });
    return /*html*/`
      <section id="product" class="max-h-full mx-6 mt-6 py-5 bg-white rounded">
        <div class="relative flex justify-between items-center mx-5">
          <div class="">
            <span class="text-gray-600 mr-2">Search:</span>
            <input type="text" autocomplete="off" class="px-2.5 py-1 w-96 bg-gray-50 text-gray-600 border border-gray-300 rounded focus:outline-none focus:border-gray-400">
          </div>
          <div class="flex items-center space-x-3">
            <div class="px-3.5 h-10 rounded leading-9 shadow-md bg-indigo-300 text-white text-lg text-center">
              <i class="fas fa-cog"></i>
            </div>
            <div id="btn-create" href="/#/admin/product/create" class="h-10 px-3 rounded shadow-md bg-red-400 hover:bg-yellow-200 text-white hover:text-red-400 flex justify-center items-center">
              <i class="fas fa-plus-circle text-lg"></i>
              <span class="ml-2 font-medium">Add Products</span>
            </div>
          </div>
        </div>
        <section id="table-product" class="mt-8 mx-5">
          <table class="table-auto">
            <thead class="text-left text-gray-600 border-b border-gray-300">
              <tr class="cursor-default bg-indigo-100">
                <th class="w-10 cursor-pointer text-center">
                  <i class="far fa-square"></i>
                  <!-- <i class="fas fa-minus-square"></i> -->
                  <!-- <i class="fas fa-check-square"></i> -->
                </th>
                <th class="w-24"></th>
                <th class="w-64 py-3 pl-10">Name</th>
                <th class="w-32 pl-5">Category</th>
                <th class="w-28 pl-7">Price</th>
                <th class="w-20 text-center">Quantity</th>
                <th class="w-48 text-center">Date</th>
                <th class="w-28 text-center">Action</th>
              </tr>
            </thead>

            <tbody id="content" class="divide-y divide-gray-300 divide-opacity-50 text-left"></tbody>

            <tfoot class="border-t border-gray-300 text-gray-600">
              <tr>
                <th colspan="7" class="pt-2 text-right">abc</th>
                <th class="pt-2 text-center">
                  <button id="prev-page" class="w-7 h-7 rounded-full cursor-pointer focus:outline-none hover:bg-gray-300">
                    <i class="fas fa-angle-left"></i>
                  </button>
                  <span id="curr-page">1</span>
                  <button id="next-page" class="w-7 h-7 rounded-full cursor-pointer focus:outline-none hover:bg-gray-300">
                    <i class="fas fa-angle-right cursor-pointer"></i>
                  </button>
                </th>
              </tr>
            </tfoot>
          </table>
        </section>
      </section>
    `;
  },
  async afterRender() {
    async function render(page = 0) {
      if (page === 0) {
        var { data: products } = await ProductAPI.list();
      } else {
        var { data: products } = await ProductAPI.list("asc", 4, page);
      }
      const { data: categories } = await CategoryAPI.list();
      const result = products.map(prod => {
        return /*html*/`
          <tr class="py-2 cursor-default text-gray-500 text-sm">
            <th class="cursor-pointer text-center">
              <i class="far fa-square"></i>
            </th>
            <th class="p-2 pb-1">
              <a href="/#/admin/product/read/${prod._id}">
                <img src="data:image/png;base64,${toBase64( prod.picture.data.data )}" alt="" class="w-20 h-20">
              </a>
            </th>
            <th class="text-lg font-normal text-gray-600 pl-5">${prod.name}</th>
            <th class="font-normal pl-5">${categories.find(cate => cate._id === prod.category).name}</th>
            <th class="font-normal text-left pl-7">$ ${prod.price}</th>
            <th class="font-normal text-center">${prod.quantity}</th>
            <th class="flex flex-col font-normal text-sm mt-5 pl-8">
              <span class="">Create: ${prod.createdAt.slice(0, 10)}</span>
              <span class="">Update: ${prod.updatedAt.slice(0, 10)}</span>
            </th>
            <th class="text-center">
              <a href="/#/admin/product/read/${prod._id}" class="p-1 text-blue-300 hover:text-blue-500">
                <i class="fas fa-eye"></i>
              </a>
              <span id="btn-detail" data-id="${prod._id}" class="p-1 text-yellow-400 hover:text-yellow-600">
                <i class="fas fa-edit"></i>
              </span>
              <span id="btn-remove" data-id="${prod._id}" class="cursor-pointer p-1 text-red-300 hover:text-red-500">
                <i class="fas fa-trash-alt"></i>
              </span>
            </th>
          </tr>
        `;
      }).join("");
      $("#content").innerHTML = result;

      ProdAction.handleDetail("#btn-detail");
      ProdAction.handleCreate("#btn-create");
      ProdAction.handleDelete("#btn-remove", render);
    }
    await render();
    ProdAction.handlePagination("#prev-page", "#curr-page", "#next-page", render);

    // ProdAction.handleDelete("#btn-remove", render);
  }
}

export default Product;