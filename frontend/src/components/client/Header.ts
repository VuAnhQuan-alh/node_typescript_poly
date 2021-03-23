import { $ } from "./../../utils";

const HeaderClient = {
  render() {
    window.scrollTo(0, 0);
    return `
      <section id="top-bar" class="bg-gray-700">
        <div id="top-bar__content" class="px-5 xl:max-w-7xl lg:max-w-6xl md:max-w-4xl mx-auto flex justify-between items-center h-10 text-sm text-gray-400">
          <div class="flex items-center hidden md:block">
            <i class="fas fa-headset text-lg text-red-400"></i>
            <span class="text-gray-500 mx-1 lg:mx-2">Support</span>
            <span class="hover:text-gray-200 font-bold cursor-pointer text-md">(00) 33 169 7720</span>
          </div>
          <div class="md:hidden">
            <span class="text-gray-300 mr-1">Useful links</span>
            <i class="fas fa-caret-down"></i>
          </div>
          <div class="flex items-center hidden md:block text-sm">
            <i class="fas fa-chevron-left text-gray-400 cursor-pointer"></i>
            <span class="xl:mx-6 lg:mx-3 md:mx-1 text-md">Free shipping for order over $200</span>
            <i class="fas fa-chevron-right text-gray-400 cursor-pointer"></i>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-center cursor-pointer xl:mr-8 lg:mr-4 md:mr-3 hidden md:block">
              <i class="fas fa-map-marker-alt text-lg text-red-400"></i>
              <span class="ml-2 hover:text-gray-200">Order tracking</span>
            </div>
            <div class="flex justify-between items-center">
              <img class="w-8 h-8" src="./picture/flag/en.png" alt="image">
              <span class="text-gray-300 ml-2">Eng / $</span>
              <span class="ml-1 md:hidden">
                <i class="fas fa-caret-down"></i>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="navbar" class="bg-gray-100">
        <div class="xl:max-w-7xl lg:max-w-6xl md:max-w-4xl mx-auto px-5 flex flex-wrap justify-between items-center">
          <a href="#" class="w-20 sm:hidden"><img src="./picture/home/logo-icon.png" alt=""></a>
          <a href="#" class="w-36 hidden sm:block"><img src="./picture/home/logo-dark.png" alt=""></a>
          <div class="flex items-center lg:order-last">
            <button type="button" id="btn--header__menu" class="lg:hidden text-gray-700 text-xl">
              <i class="fas fa-bars"></i>
            </button>
            <div class="mx-7 flex items-center my-5">
              <img src="./picture/user/admin.jpg" alt="user" class="w-10 h-10 rounded-full">
              <div class="hidden lg:block text-left ml-2">
                <p class="text-sm text-gray-500">Administration</p>
                <h4 class="text-gray-700 font-medium">An Luu Hung</h4>
              </div>
            </div>
            <div class="w-10 h-10 flex items-center justify-center rounded-full text-gray-700 bg-gray-300 relative">
              <i class="fas fa-cart-plus"></i>
              <div class="absolute -top-2 -right-2 w-5 h-5 text-gray-100 text-sm bg-red-400 rounded-full flex justify-center items-center">4</div>
            </div>
          </div>
          <div class="w-screen lg:w-auto flex flex-col-reverse lg:flex-row items-center hidden lg:flex">
            <ul class="flex justify-between text-lg text-gray-600">
              <a href="#" class="mr-2 hover:text-red-400"><li>Home</li></a>
              <a href="/#/shop" class="hover:text-red-400"><li>Shop</li></a>
              <a href="/#/about" class="mx-2 hover:text-red-400"><li>About</li></a>
              <a href="/#/contact" class="hover:text-red-400"><li>Contacts</li></a>
              <a href="/#/blog" class="ml-2 hover:text-red-400"><li>Blog</li></a>
            </ul>
            <div class="relative lg:ml-5 w-full lg:w-auto">
              <input id="q-search" type="text" autocomplete="off" class="w-full lg:w-64 px-4 py-2 pr-10 text-gray-700 rounded border-2 border-gray-300 focus:outline-none focus:border-red-300" placeholder="Search for products">
              <i class="fas fa-search z-10 absolute top-3 right-4 text-lg text-gray-400 cursor-pointer"></i>
              <div id="list-search" class="hidden z-10 absolute top-12 -left-10 overflow-y-auto max-h-48 w-96 bg-gray-100 text-gray-600 py-2.5 px-2 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    `;
  },
  afterRender() {
    $("#btn--header__menu").addEventListener("click", function() {
      console.log("hello");
    });
  }
}

export default HeaderClient;