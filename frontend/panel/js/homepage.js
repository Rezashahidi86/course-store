import {
  showAndHideMenus,
  changeTheme,
  getThemeFromLocalStorage,
  chartstudentsCourse1,
  chartstudentsCourse2,
  chartstudentsCourse3,
} from "./util.js";
const openMenus = document.querySelector("#open-menus");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", () => {
  changeTheme();
  chartstudentsCourse1.update()
});

window.addEventListener("load", () => {
  getThemeFromLocalStorage();
});
