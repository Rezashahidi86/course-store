import {
  showAndHideMenus,
  changeTheme,
  getThemeFromLocalStorage,
  getInfoAdmin,
  seenNotifBtn,
} from "./util.js";

import {
  getFromLocalStorage,
  baseUrl,
  changeDate,
  showToastBox,
} from "../../src/js/helper.js";
const openMenus = document.querySelector("#open-menus");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const categoryTableContainer = document.querySelector("#category-table");
const nameCategoryInput = document.querySelector("#name-input");
const linkCategoryInput = document.querySelector("#link-input");
const addCategoryBtn = document.querySelector("#add-category-btn");
const modal = document.querySelector("#modal");
let infoAdmin;

const getAndShowCategoty = async () => {
  const res = await fetch(`${baseUrl}/category`);
  const category = await res.json();
  console.log(category);
  categoryTableContainer.innerHTML = "";
  category.forEach((cat, index) => {
    let arrayDateCreate = cat.createdAt.slice(0, 10).split("-");
    let dateCreat = changeDate(
      arrayDateCreate[0],
      arrayDateCreate[1],
      arrayDateCreate[2]
    ).join("/");
    categoryTableContainer.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <th class="py-4">${index + 1}</th>
                <th class="py-4 text-sm">${cat.title}</th>
                <th class="py-4 text-sm">${cat.name}</th>
                <th class="py-4 text-sm max-md:hidden">${dateCreat}</th>

                <th class="py-4">
                    <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalDelete('${
                      cat._id
                    }')">
                        <span>حذف</span>
                    </button>
                </th>
            </tr>
    `
    );
  });
};

const addCategory = async (event) => {
  event.preventDefault();
  if (
    nameCategoryInput.value.trim() === "" ||
    linkCategoryInput.value.trim() === ""
  ) {
    showToastBox("تمامی اطلاعات وارد کنید", "failed");
  } else {
    const infoNewCategory = {
      title: nameCategoryInput.value.trim(),
      name: nameCategoryInput.value.trim(),
    };
    const res = await fetch(`${baseUrl}/category`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoNewCategory),
    });
    if (res.ok) {
      showToastBox("دسته بندی اضافه شد", "successful");
      getAndShowCategoty();
      nameCategoryInput.value = "";
      linkCategoryInput.value = "";
    } else {
      showToastBox("خطایی ناشناخته ای رخ داده", "failed");
      nameCategoryInput.value = "";
      linkCategoryInput.value = "";
    }
  }
};

const showModalDelete = (categoryID) => {
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "beforeend",
    `
    <div
      class="fixed flex items-center justify-center inset-0 backdrop-blur-md z-50"
    >
      <div
        class="flex items-center flex-col p-4 bg-red-600 dark:bg-red-800 w-max h-max rounded-xl"
      >
        <i class="fa fa-warning text-6xl text-background"></i>
        <span class="mt-4 text-background">از حذف دسته بندی اطمینان دارید</span>
        <div
          class="flex items-center justify-between p-2 mt-4 w-full text-background"
        >
          <button
            class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700  dark:bg-green-800 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="delete-course-btn"
            onclick="deleteCategory('${categoryID}')"
          >
            <span>بله</span>
          </button>
          <button
            class="bg-gray-400 hover:bg-gray-500 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="close-modal-btn"
            onclick="hideModal()"
          >
            <span>خیر</span>
          </button>
        </div>
      </div>
    </div>
    `
  );
};

const hideModal = () => {
  modal.innerHTML = "";
};

const deleteCategory = async (categoryID) => {
  const res = await fetch(`${baseUrl}/category/${categoryID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  if (res.ok) {
    showToastBox("دسته بندی حذف شد", "successful");
    getAndShowCategoty();
    hideModal();
  } else {
    showToastBox("خطایی ناشناخته ای رخ داده", "failed");
    hideModal();
  }
};

window.deleteCategory = deleteCategory;
window.hideModal = hideModal;
window.showModalDelete = showModalDelete;
window.seenNotifBtn = seenNotifBtn;

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);
addCategoryBtn.addEventListener("click", addCategory);

window.addEventListener("load", () => {
  getThemeFromLocalStorage();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
  getAndShowCategoty();
});
