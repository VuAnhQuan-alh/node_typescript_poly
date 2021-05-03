// import ProductAPI from "../../api/productAPI.js";
// import { toBase64 } from "../../utils.js";

// const Home = {
//   async render() {
//     const { data: products } = await ProductAPI.list();
//     return /*html*/`
//       <section id="hero-slider" style="background-color: rgb(245, 177, 176);" class="">
//         <div class="xl:relative max-w-7xl mx-auto">
//           <div class="z-10 flex justify-between">
//             <button class="absolute top-80 left-10 w-14 h-14 rounded-full bg-white focus:outline-none flex justify-center items-center transition delay-600 duration-300 transform ease-in-out translate-x-3 hover:translate-x-0">
//               <i class="fas fa-chevron-left text-xl font-medium text-gray-700 z-10"></i>
//             </button>
//             <button class="absolute top-80 right-10 w-14 h-14 rounded-full bg-white focus:outline-none flex justify-center items-center transition delay-600 duration-300 transform ease-in-out -translate-x-3 hover:translate-x-0">
//               <i class="fas fa-chevron-right text-xl font-medium text-gray-700 z-10"></i>
//             </button>
//           </div>
//           <div class="flex flex-row-reverse overflow-hidden">
//             <img class="xl:-mr-56" src="./src/public/image/hero-slider/02.jpg" alt="">
//             <div class="z-10 absolute top-48 left-40">
//               <h3 class="text-3xl text-gray-100 leading-5 font-sans">Hurry up! Limited time over.</h3>
//               <h2 class="mt-10 mb-4 text-5xl font-bold text-gray-50">Women Sportswear Sale</h2>
//               <p class="text-xl font-medium text-gray-100">Sneakers, Ked, Sweatshirts, Hoodies & much more...</p>
//               <a href="/#/shop">
//                 <button class="py-3 px-5 mt-10 rounded text-md bg-red-400 text-gray-100 focus:outline-none">
//                   Shop now
//                   <i class="fas fa-chevron-right ml-2 text-gray-100"></i>
//                 </button>
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section id="product-list" class="mx-10 flex justify-center">
//         <div class="grid grid-cols-4 py-10">
//           ${products.map(prod => /*html*/`
//             <div class="w-56 mx-10 flex flex-col items-end mb-8">
//               <div class="relative">
//                 <div class="absolute bottom-0 left-0 flex justify-between w-full">
//                   <a href="/#/shop/product/" class="w-8 h-8 flex items-center justify-center text-sm bg-gray-100 text-gray-400 rounded-tr-md hover:text-gray-500 hover:bg-gray-200">
//                     <i class="far fa-eye py-3"></i>
//                   </a>
//                   <button id="btn-to-cart" data-id="${prod._id}" class="w-8 h-8 flex items-center justify-center text-sm focus:outline-none bg-red-300 rounded-tl-md text-gray-100 hover:bg-red-500">
//                     <i class="fas fa-cart-plus py-3"></i>
//                   </button>
//                 </div>
//                 <button class="absolute top-0 right-0 w-10 h-10 bg-gray-10 flex justify-center items-center focus:outline-none rounded-full hover:bg-gray-200 group">
//                   <i class="far fa-heart text-gray-400 group-hover:text-red-400" title="wishlist"></i>
//                 </button>
//                 <a href="/#/shop/product/${prod._id}" class="my-1"><img src="data:image/png;base64,${toBase64( prod.picture.data.data )}" alt="" class="w-56 h-56"></a>
//               </div>
//               <div class="w-full flex flex-col mt-2">
//                 <a href="/#/shop/product/${prod._id}" class="mb-3 text-md font-medium text-gray-700 hover:text-red-400">${prod.name}</a>
//                 <div class="flex justify-between items-center cursor-default">
//                   ${prod.shipping ? '<span class="text-md font-medium text-blue-600 font-mono">$' + prod.price + '</span>' : '<span class="text-md text-gray-400">Out in stock</span>'}
//                   <span class="text-yellow-600 text-opacity-0.75 text-sm">
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star-half-alt"></i>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           `).join("")}
//         </div>
//       </section>
//     `;
//   },
//   afterRender() {}
// }

// export default Home;