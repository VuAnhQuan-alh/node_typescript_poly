import HeaderClient from "./components/client/Header";
import Main from "./pages/client/Main";

const router = () => {
  document.querySelector("body").innerHTML = Main.render();
  document.querySelector("#header-main").innerHTML = HeaderClient.render();
  HeaderClient.afterRender();
}

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);