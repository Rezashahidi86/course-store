import {
  baseUrl,
  getFromLocalStorage,
  showToastBox,
} from "../../src/js/helper.js";
import {
  showAndHideMenus,
  changeTheme,
  getThemeFromLocalStorage,
  getInfoAdmin,
  seenNotifBtn,
} from "./util.js";
const openMenus = document.querySelector("#open-menus");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const submenusContainer = document.querySelector("#submenus");
const menusContainer = document.querySelector("#menus");
const categoryMenu = document.querySelector("#category-menu");
const nameMenuInput = document.querySelector("#name-menu-input");
const hrefMenuInput = document.querySelector("#href-menu-input");
const addMenuBtn = document.querySelector("#add-menu-btn");
let infoAdmin;
let categoryID = "0";
let allSubmenus = [];
let menus = [];
let copyMenus = [];
const getMenus = async () => {
  const res = await fetch(`${baseUrl}/menus/all`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const resMenus = await res.json();
  allSubmenus = [];
  menus = [];
  resMenus.forEach((menu) => {
    if (menu.parent) {
      menus.push(menu);
    } else {
      allSubmenus.push(menu);
    }
  });
  copyMenus = [...menus];
  categoryMenu.innerHTML = "";
  categoryMenu.insertAdjacentHTML(
    "beforeend",
    `
    <option value="0">دسته بندی است</option>
    `
  );
  categoryID="0"
  allSubmenus.forEach((submenu) => {
    categoryMenu.insertAdjacentHTML(
      "beforeend",
      `
    <option value="${submenu._id}">${submenu.title}</option>
    `
    );
  });
  showMenus();
};
const showMenus = () => {
  submenusContainer.innerHTML = "";
  submenusContainer.insertAdjacentHTML(
    "beforeend",
    `
    <thead
      class="text-title dark:text-title-dark bg-background dark:bg-background-dark"
    >
      <tr>
        <th class="py-4 max-2sm:text-sm">شناسه</th>
        <th class="py-4 max-2sm:text-sm">نام</th>
        <th class="py-4 max-2sm:text-sm">تعداد دوره</th>
        <th class="py-4 max-2sm:text-sm">مقصد</th>
        <th class="py-4 max-2sm:text-sm">حذف</th>
      </tr>
    </thead>
    `
  );
  allSubmenus.forEach((subMenu, index) => {
    let countMenuForSubmenu = 0;
    copyMenus.forEach((menu, index) => {
      if (menu.parent.title === subMenu.title) {
        countMenuForSubmenu += 1;
        copyMenus.splice(index, 1);
      }
    });
    submenusContainer.insertAdjacentHTML(
      "beforeend",
      `
          <tbody class="text-text dark:text-text-dark">
            <tr>
                <th class="py-4">${index + 1}</th>
                <th class="py-4 text-sm">${subMenu.title}</th>
                <th class="py-4 text-sm">${countMenuForSubmenu}</th>
                <th class="py-4 text-sm">${subMenu.href}</th>
                <th class="py-4">
                    <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalBan('${
                      subMenu._id
                    }')">
                        <span>حذف</span>
                    </button>
                </th>
            </tr>
          </tbody>
        `
    );
  });
  menusContainer.innerHTML = "";
  menusContainer.insertAdjacentHTML(
    "beforeend",
    `
    <thead
      class="text-title dark:text-title-dark bg-background dark:bg-background-dark"
    >
      <tr>
        <th class="py-4 max-2sm:text-sm">شناسه</th>
        <th class="py-4 max-2sm:text-sm">نام</th>
        <th class="py-4 max-2sm:text-sm">دسته بندی</th>
        <th class="py-4 max-2sm:text-sm">مقصد</th>
        <th class="py-4 max-2sm:text-sm">حذف</th>
      </tr>
    </thead>
    `
  );
  menus.forEach((menu, index) => {
    menusContainer.insertAdjacentHTML(
      "beforeend",
      `
          <tbody class="text-text dark:text-text-dark">
            <tr>
                <th class="py-4">${index + 1}</th>
                <th class="py-4 text-sm">${menu.title}</th>
                <th class="py-4 text-sm">${menu.parent.title}</th>
                <th class="py-4 text-sm">${menu.href}</th>
                <th class="py-4">
                    <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalBan('${
                      menu._id
                    }')">
                        <span>حذف</span>
                    </button>
                </th>
            </tr>
          </tbody>
        `
    );
  });
};

const addMenu = async (event) => {
  event.preventDefault();
  if (!nameMenuInput.value.trim() || !hrefMenuInput.value.trim()) {
    showToastBox("لطفا تمامی اطلاعات را وارد کنید", "failde");
  } else {
    let infoMenu = {
      title: nameMenuInput.value.trim(),
      href: hrefMenuInput.value.trim(),
    };
    if (categoryID != "0") {
      infoMenu.parent = categoryID;
    }
    console.log(infoMenu);
    const res = await fetch(`${baseUrl}/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoMenu),
    });
    if (res.ok) {
      showToastBox("عملیات با موفقیت انجام شد", "successful");
      getMenus();
    } else {
      showToastBox("خطای نا شناخته ای رخ داده لطفا بعدا امتحان کنید", "failed");
    }
  }
};

const deleteMenu = async (menuID) => {
  const res = await fetch(`${baseUrl}/menus/${menuID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  if (res.ok) {
    showToastBox("منو با موفقیت حذف شد", "successful");
    getMenus();
  } else {
    showToastBox("خطایی رخ داده لطفا بعدا امتحان کنید", "failed");
  }
  hideModal();
};

const showModalBan = (courseID) => {
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
        <span class="mt-4 text-background">از حذف دوره اطمینان دارید</span>
        <div
          class="flex items-center justify-between p-2 mt-4 w-full text-background"
        >
          <button
            class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700  dark:bg-green-800 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="delete-course-btn"
            onclick="deleteMenu('${courseID}')"
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
window.deleteMenu = deleteMenu;
window.seenNotifBtn = seenNotifBtn;
window.hideModal = hideModal;
window.showModalBan = showModalBan;
openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);
addMenuBtn.addEventListener("click", addMenu);
categoryMenu.addEventListener(
  "change",
  (event) => (categoryID = event.target.value)
);

window.addEventListener("load", () => {
  getThemeFromLocalStorage();
  getMenus();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
});
