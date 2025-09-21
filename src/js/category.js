import {
  closeModalBars,
  modalBarsHandeler,
  backModalInfoAccount,
  hideModalInfoAccount,
  iconThemeChange,
  darkOrLight,
  getThemeFromLocalStorage,
  themeChangeBtns,
  getUser,
  getNavbar,
  getCourses,
} from "./helper.js";
const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const coursesContainer = document.querySelector("#courses-container")

themeChangeBtns.forEach((themeChangeBtn) => {
  themeChangeBtn.addEventListener("click", () => {
    themeChangeBtns[0].innerHTML = "";
    themeChangeBtns[1].innerHTML = "";
    const theme = darkOrLight();
    if (theme === "dark") {
      iconThemeChange(
        '<i class="fa fa-moon text-2xl text-text-dark"></i>',
        '<i class="fa fa-moon cursor-pointer"></i><span class="cursor-pointer">تم تیره</span>'
      );
    } else {
      iconThemeChange(
        '<i class="fa fa-sun text-2xl text-text-dark"></i>',
        '<i class="fa fa-sun cursor-pointer"></i><span class="cursor-pointer">تم روشن</span>'
      );
    }
  });
});

closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
backModalInfoAccount.addEventListener("click", hideModalInfoAccount);

window.addEventListener("load", () => {
  getThemeFromLocalStorage("text-dark");
  getUser(true);
  getNavbar()
  getCourses(coursesContainer,"category")
});
