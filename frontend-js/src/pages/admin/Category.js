import CategoryAPI from "../../api/categoryAPI.js";
import UserAPI from "../../api/userAPI.js";
import { $, _$ } from "../../utils.js";

const Category = {
  async render() {
    let user = localStorage.getItem('user-info');
    user = JSON.parse(user);
    const { user: { _id }, token } = user;
    await UserAPI.secret(_id, token)
    .catch(() => {
      window.location.href = "http://localhost:1900/#/admin/user-info";
    });
    return /*html*/`
      <section id="category" class="max-h-full mx-6 mt-6 py-5 bg-white rounded min-h-screen">
        <div class="flex justify-between items-center mx-5">
          <div class="">
            <span class="text-gray-600 mr-2">Search:</span>
            <input type="text" autocomplete="off" class="px-2.5 py-1 w-96 bg-gray-50 text-gray-600 border border-gray-300 rounded focus:outline-none focus:border-gray-400">
          </div>
          <div class="px-3.5 h-10 rounded leading-9 shadow-md bg-indigo-300 text-white text-lg text-center">
            <i class="fas fa-cog"></i>
          </div>
        </div>
        <section id="table-category__action" class="mt-8 mx-5 flex justify-between">
          <table class="table-auto text-gray-600">
            <thead class="text-gray-600 text-center border-b border-gray-400">
              <tr class="cursor-default bg-indigo-200">
                <th class="w-24">Index</th>
                <th class="w-56 bg-red-300">Name</th>
                <th class="w-40 bg-blue-300">Date</th>
                <th class="w-28">Action</th>
              </tr>
            </thead>

            <tbody id="content" class="divide-y divide-gray-500 divide-opacity-50"></tbody>

            <tfoot class="border-t border-gray-400">
              <tr>
                <th colspan="3" class="pt-2 text-right">Abc</th>
                <th class="pt-2 text-center">
                  <button id="prev-page" class="w-7 h-7 rounded-full cursor-pointer focus:outline-none hover:bg-gray-300">
                    <i class="fas fa-angle-left"></i>
                  </button>
                  <span id="current-page">1</span>
                  <button id="next-page" class="w-7 h-7 rounded-full cursor-pointer focus:outline-none hover:bg-gray-300">
                    <i class="fas fa-angle-right cursor-pointer"></i>
                  </button>
                </th>
              </tr>
            </tfoot>
          </table>
          <div id="form-category" class="w-80">
            <div id="action-name" class="text-4xl font-medium text-center text-indigo-400">Categories</div>
            <form action="" id="form-action">
              <div class="mt-8">
                <input
                  id="name"
                  data-id=""
                  placeholder="Category name"
                  type="text"
                  class="w-full h-10 px-2.5 text-gray-800 focus:outline-none rounded bg-indigo-100 bg-opacity-75 focus:bg-gray-100 border border-1 border-gray-300"
                >
              </div>
              <div class="flex justify-center mt-5">
                <button
                  id="btn-action"
                  type="submit"
                  class="w-40 text-xl font-bold text-white py-2 rounded bg-indigo-300 hover:bg-indigo-400 focus:outline-none"
                >Create</button>
              </div>
            </form>
          </div>
        </section>
      </section>
    `;
  },
  async afterRender() {
    async function render() {
      const { data: categories } = await CategoryAPI.list();
      const result = categories.map((cate, index) => {
        return /*html*/`
          <tr class="cursor-default">
            <th>${index + 1}</th>
            <th class="text-lg font-mono">${cate.name}</th>
            <th class="flex flex-col text-sm font-normal pt-1">
              <span class="">Create: ${cate.createdAt.slice(0, 10)}</span>
              <span class="">Update: ${cate.updatedAt.slice(0, 10)}</span>
            </th>
            <th class="text-sm">
              <span id="btn-edit" data-id="${cate._id}" class="cursor-pointer p-1 text-yellow-400 hover:text-yellow-600">
                <i class="fas fa-edit"></i>
              </span>
              <span id="btn-remove" data-id="${cate._id}" class="cursor-pointer p-1 text-red-300 hover:text-red-500">
                <i class="fas fa-trash-alt"></i>
              </span>
            </th>
          </tr>
          `;
      }).join("");
      $("#content").innerHTML = result;

      handleEdit("#btn-edit", "#name", "#btn-action");
      handleSubmit("#name", "#btn-action", render);
      handleRemove("#btn-remove", render);
    }
    await render();

    function handleEdit(elements, name, btn) {
      $(elements).forEach(element => {
        element.addEventListener("click", async function() {
          const { data: category } = await CategoryAPI.read(this.dataset.id);
          $(name).value = category.name;
          $(btn).innerHTML = "Update";
          $(name).dataset.id = this.dataset.id;
        });
      });
    }
    function handleSubmit(element, btn, callback) {
      $(btn).addEventListener("click", async function(event) {
        event.preventDefault();
        const category = {
          name: $(element).value
        }
        if ($(element).dataset.id.length === 0) {
          await CategoryAPI
            .create(category)
            .catch(error => { console.log(error.response.data.error) });
        } else {
          await CategoryAPI
            .update(category, $(element).dataset.id)
            .catch(error => {console.log(error)});
          $(btn).innerHTML = "Create";
          $(element).dataset.id = '';
          $(element).value = '';
        }
        callback();
      });
    }

    function handleRemove(elements, callback) {
      $(elements).forEach(element => {
        element.addEventListener("click", async function() {
          const question = confirm("Do you want to delete it?");
          if (question) {
            await CategoryAPI.delete(this.dataset.id);
            await callback();
          }
        });
      });
    }
  }
}

export default Category;