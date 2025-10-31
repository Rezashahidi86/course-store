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
  showInfoBasket,
  showCourseBasket,
  deleteCourseFromBasket,
  rigesterToCourses,
} from "./helper.js";
const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const coursesContainer = document.querySelector("#courses-container");
const showbasketBtns = document.querySelectorAll(".show-basket-btn");
const closeBasket = document.querySelector("#close-basket");
closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
backModalInfoAccount.addEventListener("click", hideModalInfoAccount);
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
showbasketBtns.forEach((showbasketBtn) => {
  showbasketBtn.addEventListener("click", showInfoBasket);
});
closeBasket.addEventListener("click", showInfoBasket);
window.rigesterToCourses = rigesterToCourses;
window.deleteCourseFromBasket = deleteCourseFromBasket;
window.addEventListener("load", () => {
  getThemeFromLocalStorage("text-dark");
  getUser(true);
  getNavbar();
  getCourses(coursesContainer, "myCourses");
  showCourseBasket();
});
