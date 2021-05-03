import ProductAPI from "../../api/productAPI.js";
import { parseReqUrl, toBase64 } from "../../utils.js";

const ProductDetail = {
  async render() {
    const { id } = await parseReqUrl();
    const { data: product } = await ProductAPI.read(id);
    console.log(product)
    return /*html*/`
      <section id="product-read" class="max-h-full mx-6 mt-6 py-5 bg-white rounded">
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
            </a>
            <a href="/#/admin/product/create" class="h-10 px-3 rounded shadow-md bg-red-400 hover:bg-yellow-200 text-white hover:text-red-400 flex justify-center items-center">
              <i class="fas fa-plus-circle text-lg"></i>
            </a>
          </div>
        </div>
        <section class="mt-8 mx-5">
          <div class="">
            <img src="data:image/png;base64,${toBase64( product.picture.data.data )}" alt="" class="w-80 h-80">
          </div>
        </section>
      </section>
    `;
  },
  afterRender() {}
}

export default ProductDetail;