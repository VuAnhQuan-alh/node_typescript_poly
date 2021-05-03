import UserAPI from "../../api/userAPI.js";
import { $ } from "../../utils.js";

const RegisLog = {
  render(check = false) {
    const eleReg = `<div id="regis-element" class="relative w-96">
      <span class="absolute top-1.5 left-3 text-gray-400 text-lg">
        <i class="fas fa-user-circle"></i>
      </span>
      <input
        type="text"
        placeholder="Username"
        id="username"
        class="w-full py-2 px-3 pl-10 rounded border border-1 border-gray-300 focus:outline-none text-gray-600 focus:border-green-400"
      />
    </div>`;
    const btnReg = `<div class="flex items-center justify-between">
      <div id="btn-login" class="text-blue-500 cursor-pointer">Login now</div>
      <button type="submit" class="w-24 h-10 rounded bg-blue-300 text-white font-medium focus:outline-none">Register</button>
    </div>`;
    const btnLog = `<div class="space-y-3">
      <div class="flex justify-between items-center w-96">
        <div class="text-gray-500">
          <input id="remember" type="checkbox" />
          <label for="remember" class="ml-2">Remember me</label>
        </div>
        <button type="submit" class="w-24 h-10 rounded bg-blue-300 text-white font-medium focus:outline-none">Login</button>
      </div>
      <div class="flex items-center justify-between">
        <div id="btn-regis" class="text-blue-500 cursor-pointer">Register now</div>
        <a href="" class="text-gray-500">Forgot password?</a>
      </div>
    </div>`;
    return /*html*/`
      <section id="regis-login" class="h-screen">
        <div style="background-image: url('./src/public/image/login.jpg');" class="h-full bg-right bg-no-repeat">
          <div class="w-1/2 h-full flex flex-col justify-center items-end">
            <div id="error" class="text-red-400 font-normal"></div>
            <form action="" id="form_reg-log">
              <div id="parentEle" class="space-y-5">
                ${ check ? eleReg : '' }
                <div class="relative w-96">
                  <span class="absolute top-1.5 left-3 text-gray-400 text-lg">
                    <i class="fas fa-at"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    class="w-full py-2 px-3 pl-10 rounded border border-1 border-gray-300 focus:outline-none text-gray-600 focus:border-green-400"
                  />
                </div>
                <div class="relative w-96">
                  <span class="absolute top-1.5 left-3 text-gray-400 text-lg">
                    <i class="fas fa-key"></i>
                  </span>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    class="w-full py-2 px-10 rounded border border-1 border-gray-300 focus:outline-none text-gray-600 focus:border-green-400"
                  />
                  <span class="absolute top-1.5 right-3 text-gray-400 text-lg">
                    <i class="fas fa-eye-slash"></i>
                    <!-- <i class="fas fa-eye"></i> -->
                  </span>
                </div>
                ${ check ? btnReg : btnLog }
              </div>
            </form>
            <div class="w-96 my-8 flex justify-between items-center">
              <span class="w-40 h-0.5 bg-gray-300"></span>
              <span class="text-gray-600">or</span>
              <span class="w-40 h-0.5 bg-gray-300"></span>
            </div>
            <div class="space-y-4">
              <div class="w-96 flex items-center rounded bg-red-300 text-white font-medium uppercase">
                <i class="fab fa-google w-10 h-10 text-center py-2.5 text-xl bg-red-400 rounded-l"></i>
                <div class="flex-1 text-center">login with google</div>
              </div>
              <div class="w-96 flex items-center rounded bg-blue-500 text-white font-medium uppercase">
                <i class="fab fa-facebook w-10 h-10 text-center py-2.5 text-xl bg-blue-600 rounded-l"></i>
                <div class="flex-1 text-center">login with facebook</div>
              </div>
              <div class="w-96 flex items-center rounded bg-blue-400 text-white font-medium uppercase">
                <i class="fab fa-twitter-square w-10 h-10 text-center py-2.5 text-xl bg-blue-500 rounded-l"></i>
                <div class="flex-1 text-center">login with twitter</div>
              </div>
              <div id="btn-logout" class="w-96 text-center py-3 cursor-pointer rounded bg-blue-400 text-white font-medium uppercase">
                logout
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },
  afterRender() {
    $("#btn-regis").onclick = () => {
      $("main#CONTENT").innerHTML = RegisLog.render(true);
      RegisLog.afterRender();
    };
    $("#btn-login").onclick = () => {
      $("main#CONTENT").innerHTML = RegisLog.render(false);
      RegisLog.afterRender();
    };
    $("#form_reg-log").onsubmit = async () => {
      event.preventDefault();
      var check = true;
      let user = {
        email: $("#email").value,
        password: $("#password").value
      }
      if ($("#username").value) {
        user.name = $("#username").value;
        console.log(user);
        await UserAPI.regis(user)
        .catch(error => {
          $("#error").innerHTML = error.response.data.error;
          check = false;
        });
      }
      if (check) {
        await UserAPI.login(user)
        .then(data => {
          const { data: infoUser } = data;
          let user = localStorage.getItem('user-info');
          user = user ? JSON.parse(user) : {};
          user = infoUser;
          localStorage.setItem('user-info', JSON.stringify(user));
          window.location.href = "http://localhost:1900/#/admin/user-info";
        }).catch(error => {
          $("#error").innerHTML = error.response.data.error;
        });
      }
    };
  }
}

export default RegisLog;