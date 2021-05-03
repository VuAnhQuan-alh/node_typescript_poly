import CategoryAPI from "../../api/categoryAPI.js";
import ProductAPI from "../../api/productAPI.js";
import UserAPI from "../../api/userAPI.js";
import { $, parseReqUrl, toBase64, _$ } from "../../utils.js";
import ProdAction from "./Prod-action.js";

const ProductForm = {
  async render() {
    let user = localStorage.getItem('user-info');
    user = JSON.parse(user);
    const { user: { _id }, token } = user;
    await UserAPI.secret(_id, token)
    .catch(async (err) => {
      window.location.href = "http://localhost:1900/#/admin/product";
    });

    const { data: categories } = await CategoryAPI.list();
    const { id } = parseReqUrl();
    var isId = false;
    if (id.length > 0) {
      isId = true;
      var { data: product } = await ProductAPI.read(id);
    }
    return /*html*/`
    <section id="product-form" class="max-h-full mx-6 mt-6 py-5 bg-white rounded">
      <div class="flex justify-between items-center mx-5">
        <div class="">
          <span class="text-gray-600 mr-2">Search:</span>
          <input type="text" autocomplete="off" class="px-2.5 py-1 w-96 bg-gray-50 text-gray-600 border border-gray-300 rounded focus:outline-none focus:border-gray-400">
        </div>
        <div class="flex items-center space-x-3">
          <div class="px-3.5 h-10 rounded leading-9 shadow-md bg-indigo-300 text-white text-lg text-center">
            <i class="fas fa-cog"></i>
          </div>
          <a href="/#/admin/product/list" class="h-10 px-3 rounded shadow-md bg-red-400 hover:bg-yellow-200 text-white hover:text-red-400 flex justify-center items-center">
            <i class="fas fa-th-list text-lg"></i>
            <span class="ml-2 font-medium">List Products</span>
          </a>
        </div>
      </div>
      <section class="mx-5 mt-8 relative">
        <form action="" id="form-action" enctype="multipart/form-data">
          <div id="message" class="text-red-400 text-lg font-medium mb-2"></div>
          <div class="flex justify-between">
            <div class="">
              <div class="flex">
                <div class="h-24">
                  <label for="name" class="text-2xl text-indigo-400 font-medium">Name</label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="name"
                      value="${isId ? product.name : ''}"
                      placeholder="Product name"
                      class="w-72 h-10 px-2.5 text-gray-800 focus:outline-none rounded bg-indigo-100 bg-opacity-75 focus:bg-gray-100 border border-1 border-gray-300"
                    />
                    <div class="text-sm text-red-400 mt-0.5"></div>
                  </div>
                </div>
                <div class="h-24 ml-5">
                  <label for="category" class="text-2xl text-indigo-400 font-medium">Category</label>
                  <div class="mt-1">
                    <select id="category" class="w-72 h-10 px-2.5 text-gray-600 focus:outline-none rounded bg-indigo-100 bg-opacity-75 focus:bg-gray-100 border border-1 border-gray-300">
                      <option value="0">-- Choose category --</option>
                      ${categories.map(cate => `<option value="${cate._id}" ${isId && cate._id === product.category ? 'selected' : ''}>${cate.name}</option>`)}
                    </select>
                  </div>
                </div>
              </div>
              <div class="flex">
                <div class="h-24">
                  <label for="price" class="text-2xl text-indigo-400 font-medium">Price</label>
                  <div class="mt-1">
                    <input
                      type="number"
                      id="price"
                      value="${isId ? product.price : ''}"
                      placeholder="1211"
                      class="spin w-48 h-10 px-2.5 text-gray-800 focus:outline-none rounded bg-indigo-100 bg-opacity-75 focus:bg-gray-100 border border-1 border-gray-300"
                    />
                    <div class="text-sm text-red-400 mt-0.5"></div>
                  </div>
                </div>
                <div class="h-24 ml-5">
                  <label for="quantity" class="text-2xl text-indigo-400 font-medium">Quantity</label>
                  <div class="mt-1">
                    <input
                      type="number"
                      id="quantity"
                      value="${isId ? product.quantity : ''}"
                      placeholder="2521"
                      class="spin w-48 h-10 px-2.5 text-gray-800 focus:outline-none rounded bg-indigo-100 bg-opacity-75 focus:bg-gray-100 border border-1 border-gray-300"
                    />
                    <div class="text-sm text-red-400 mt-0.5"></div>
                  </div>
                </div>
                <div class="h-24 ml-5">
                  <label for="shipping" class="text-2xl text-indigo-400 font-medium">Shipping</label>
                  <div class="w-44 mt-1 h-10 flex justify-between items-center">
                    <label class="cursor-pointer">
                      <input
                        type="radio"
                        value="1"
                        class="appearance-none w-4 h-4 rounded focus:outline-none cursor-pointer ${isId ? (product.shipping ? 'bg-green-400' : 'bg-gray-300') : 'bg-green-400'}"
                      />
                      <span class="text-lg font-medium text-gray-500 ml-3">True</span>
                    </label>
                    <label class="cursor-pointer">
                      <input
                        type="radio"
                        name="shipping"
                        value="0"
                        class="appearance-none w-4 h-4 rounded focus:outline-none cursor-pointer ${isId ? (product.shipping ? 'bg-gray-300' : 'bg-green-400') : 'bg-gray-300'}"
                      />
                      <span class="text-lg font-medium text-gray-500 ml-3">False</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="mt-2.5">
                <label for="description" class="text-2xl text-indigo-400 font-medium">Description</label>
                <div class="mt-1">
                  <textarea
                    id="description"
                    style="width: 597px;"
                    placeholder="Product details..."
                    class="h-20 px-2.5 py-1.5 text-gray-800 focus:outline-none rounded bg-indigo-100 bg-opacity-75 focus:bg-gray-100 border border-1 border-gray-300"
                  >${isId ? product.description : ''}</textarea>
                  <span class=""></span>
                </div>
              </div>
              <div class="flex justify-center mt-5">
                <button
                  type="submit"
                  class="w-40 text-xl font-bold text-white py-2 rounded bg-indigo-300 hover:bg-indigo-400 focus:outline-none"
                >
                  ${isId ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
            <div id="image-parent" class="w-80 h-80">
              <div id="image-text" class="mt-24 ml-20 text-indigo-300 font-medium text-6xl">Image</div>
              <img
                id="image-show"
                ${isId ? `src="data:image/png;base64,${toBase64( product.picture.data.data )}"` : ''}
                style="margin-top: -9.75rem;"
                class="w-80 h-80 bg-gray-300 bg-opacity-75 cursor-pointer"
              >
              <input id="image-input" type="file" class="invisible cursor-default" />
            </div>
          </div>
          <div id="check-circle" class="hidden animate-ping absolute -top-10 left-60 bg-yellow-300 bg-opacity-75 w-72 h-72 rounded-full shadow-2xl flex justify-center items-center">
            <i class="fas fa-check-circle text-9xl text-green-500"></i>
          </div>
        </form>
      </section>
    </section>
    `;
  },
  afterRender() {
    var shipping = 1;
    const { id } = parseReqUrl();
    $("input[type='radio']").forEach(item => {
      item.addEventListener("click", () => {
        $("input[type='radio']").forEach(item_ => {
          item_.classList.remove('bg-green-400');
          item_.classList.add('bg-gray-300');
        });
        item.classList.remove('bg-gray-300');
        item.classList.add('bg-green-400');
        shipping = item.value;
      });
    });

    ProdAction.handlePicture("#image-show", "#image-text", "#image-input");
    ProdAction.handleSubmit("#form-action", shipping, id, checkCircle);

    handleChangeInputs($("input"), $("select"), $("textarea"));
    function handleChangeInputs(inputs, select, textarea) {
      const arrInputs = inputs.filter(input => input.type !== "radio");
      arrInputs.forEach(input => {
        _onChange(input);
      });
      _onChange(select);
      _onChange(textarea);

      function _onChange(_obj) {
        _obj.onfocus = function() {
          if (this.classList.contains("border-red-300"))
            this.classList.remove("border-red-300");
        }
        _obj.onblur = function() {
          if (this.value.length === 0 || this.value === "0")
            this.classList.add("border-red-300");
        }
      }
    }

    function checkCircle() {
      $("#check-circle").classList.remove('hidden');
      setTimeout(() => {
        $("#check-circle").classList.add('hidden');
      }, 2000);
    }
  }
}

export default ProductForm;

// refactoring UI