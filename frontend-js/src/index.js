import { $, parseReqUrl, _$ } from "./utils.js";
import MainRender from "./pages/Main.js";
import Error404 from "./pages/Error404.js";
import Administrator from "./pages/admin/AdminPage.js";
import Product from "./pages/admin/Product.js";
import ProductForm from "./components/admin/Prod-form.js";
import ProductDetail from "./components/admin/Prod-read.js";
import Category from "./pages/admin/Category.js";
import RegisLog from "./pages/admin/RegisLogin.js";
import InfoUser from "./pages/user/Info.js";
import UserUpdate from "./pages/user/Update.js";
// import Home from "./pages/client/Home.js";
// import Header from "./components/client/Header.js";
// import Footer from "./components/client/Footer.js";
// import Shop from "./pages/client/Shop.js";

const prefixRouter = {
  // '/': Home,
  // '/home': Home,
  // '/shop': Shop,
  // '/shop/:object': Shop,
  '/reg-log': RegisLog,
  '/admin': Administrator,
  '/admin/:object': Administrator,
};
const suffixesRouter = {
  '/product': Product,
  '/product/list': Product,
  '/product/create': ProductForm,
  '/product/edit/:id': ProductForm,
  '/product/read/:id': ProductDetail,
  '/category': Category,
  '/user-info': InfoUser,
  '/user-update': UserUpdate,

  // '/categories/:id': Shop,
};

const router = async () => {
  $("body").innerHTML = MainRender.render();
  const { hash_one, hash_two, hash_three, id } = parseReqUrl();
  const prefixURL = (hash_one ? `/${hash_one}` : '/reg-log') + (hash_two ? '/:object' : '');
  const suffixesURL = (hash_two ? `/${hash_two}` : '') + (hash_three ? `/${hash_three}` : '') + (id ? '/:id' : '');
  const parentPage = prefixRouter[prefixURL] ? prefixRouter[prefixURL] : Error404;
  const childPage = suffixesRouter[suffixesURL] ? suffixesRouter[suffixesURL] : Error404;

  if (prefixURL.indexOf('admin') !== -1 || prefixURL.indexOf('reg-log') !== -1) {
    $("main#CONTENT").innerHTML = await parentPage.render();
    await parentPage.afterRender?.();
    $("#admin-content").innerHTML = await childPage.render();
    await childPage.afterRender?.();
  }

  //  else {
  //   $("header#HEADER").innerHTML = await Header.render();
  //   await Header.afterRender?.();
  //   $("main#CONTENT").innerHTML = await parentPage.render();
  //   await parentPage.afterRender?.();
  //   $("footer#FOOTER").innerHTML = Footer.render();
  // }
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);