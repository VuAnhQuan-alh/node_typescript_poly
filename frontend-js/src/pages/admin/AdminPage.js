import Sidebar from "../../components/admin/Sidebar.js";
import TopBar from "../../components/admin/Top-bar.js";

const Administrator = {
  render() {
    return /*html*/`
      <section id="homeAdmin" class="flex bg-gray-100">
        <div>${Sidebar.render()}</div>
        <div class="w-full">
          <div class="">${TopBar.render()}</div>
          <div id="admin-content" class=""></div>
        </div>
      </section>
    `;
  },
  afterRender() {
    TopBar.afterRender();
    Sidebar.afterRender();
  }
};

export default Administrator;