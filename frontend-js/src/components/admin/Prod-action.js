import ProductAPI from "../../api/productAPI.js";
import UserAPI from "../../api/userAPI.js";
import { $ } from "../../utils.js"

const ProdAction = {
  imageChange: false,
  handlePicture(elementImg, elementText, elementInput) {
    let files = [];
    $(elementImg).addEventListener("click", () => {
      $(elementInput).onchange = event => {
        files = event.target.files;
        let reader = new FileReader();
        reader.onload = () => {
          $(elementImg).src = reader.result;
        }
        reader.readAsDataURL(files[0]);
        $(elementText).innerHTML = "";
        $(elementImg).setAttribute("style", "margin-top: -6rem;");
      }
      $(elementInput).click();
      ProdAction.imageChange = true;
    });
  },

  handleDelete(elements, callback) {
    let user = localStorage.getItem('user-info');
    user = JSON.parse(user);
    const { user: { _id }, token } = user;
    $(elements).forEach(ele => {
      ele.addEventListener("click", async function() {
        await UserAPI.secret(_id, token)
        .then( async () => {
          const question = confirm("Do you want to delete it?");
          if (question) {
            await ProductAPI.delete(this.dataset.id);
            await callback();
          }
        })
        .catch(() => {
          window.location.href = 'http://localhost:1900/#/admin/user-info';
        });
      });
    });
  },

  handleCreate(element) {
    let user = localStorage.getItem('user-info');
    user = JSON.parse(user);
    const { user: { _id }, token } = user;
    $(element).addEventListener("click", async function() {
      await UserAPI.secret(_id, token)
      .then(() => {
        window.location.href = "http://localhost:1900/#/admin/product/create";
      })
      .catch(() => {
        window.location.href = 'http://localhost:1900/#/admin/user-info';
      });
    });
  },

  handleSubmit(form, shipping, id, callback) {
    $(form).addEventListener("submit", async function(event) {
      event.preventDefault();
      // console.log($("#image-input").files[0]);
      let formData = new FormData();
      const product = {
        name: $("#name").value,
        category: $("#category").value,
        price: Number($("#price").value),
        quantity: Number($("#quantity").value),
        shipping: shipping === 1 ? true : false,
        description: $("#description").value
      }
      if ((id.length !== 0 && ProdAction.imageChange) || id.length === 0) {
        product.picture = $("#image-input").files[0];
      }
      for (let key in product) {
        formData.append(key, product[key]);
      }
      if (id.length === 0) {
        await ProductAPI
          .create(formData)
          .then(() => {
            callback();
          })
          .catch(error => {
            ProdAction.handleError(error.response.data.error, form);
          });
      } else {
        await ProductAPI
          .update(formData, id)
          .then(() => {
            callback();
          })
          .catch(error => {
            ProdAction.handleError(error.response.data.error, form);
          });
      }
      ProdAction.imageChange = false;
    });
  },

  handleError(error, form) {
    $("#message").innerHTML = error;
    const inputs = $(form).querySelectorAll("input");
    inputs.forEach(input => {
      if ((input.type === "text" || "number") && input.value === "") {
        if (!input.classList.contains("border-red-300"))
          input.classList.add("border-red-300");
      }
      if (input.type === "file" && input.value === "") {
        if (!$("#image-show").classList.contains("border-red-300")) {}
          $("#image-show").classList.add("border", "border-red-300");
      }
      if (input.type === "file" && input.value !== "") {
        if ($("#image-show").classList.contains("border-red-300")) {}
          $("#image-show").classList.remove("border", "border-red-300");
      }
    });
    const select = $(form).querySelector("select");
    if (select.value === "0")
      select.classList.add("border-red-300");

    const textarea = $(form).querySelector("textarea");
    if (textarea.value === "")
      textarea.classList.add("border-red-300");
  },

  handleDetail(elements) {
    let user = localStorage.getItem('user-info');
    user = JSON.parse(user);
    const { user: { _id }, token } = user;
    $(elements).forEach(ele => {
      ele.addEventListener("click", async function() {
        await UserAPI.secret(_id, token)
        .then(() => {
          window.location.href = `http://localhost:1900/#/admin/edit/${ele.dataset.id}`;
        })
        .catch(() => {
          window.location.href = 'http://localhost:1900/#/admin/user-info';
        });
      });
    })
  },

  async handlePagination(prev, curr, next, callback) {
    var currentPage = 1;
    const { data: products } = await ProductAPI.all();
    const totalPage = Math.ceil(products.length / 4);
    pagination();
    function pagination() {
      $(next).addEventListener("click", async function() {
        if (currentPage == totalPage) {
          currentPage = 1;
        } else if (currentPage >= 1) {
          currentPage += 1;
        }
        $(curr).innerHTML = currentPage;
        await callback(currentPage - 1);
      });
      $(prev).addEventListener("click", async function() {
        if (currentPage == 1) {
          currentPage = totalPage;
        } else if (currentPage <= totalPage) {
          currentPage -= 1;
        }
        $(curr).innerHTML = currentPage;
        await callback(currentPage - 1);
      });
    }
  }
}

export default ProdAction;