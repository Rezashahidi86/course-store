import {
  closeModalBars,
  modalBarsHandeler,
  getValueFromUrl,
  backModalInfoAccount,
  hideModalInfoAccount,
  iconThemeChange,
  darkOrLight,
  getThemeFromLocalStorage,
  themeChangeBtns,
  getUser,
  getNavbar,
  baseUrl,
  getFromLocalStorage,
  plusTime,
  changeDate,
  showToastBox,
  baseUrlCover,
  getInfoCourse,
  changeHeaderLinks,
  getCourses,
} from "./helper.js";
const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const coursesContainer = document.querySelector("#courses-container")



closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
backModalInfoAccount.addEventListener("click", hideModalInfoAccount);

window.addEventListener("load", () => {
  getThemeFromLocalStorage("text-dark");
  getUser(true);
  getNavbar();
  getCourses(coursesContainer,"myCourses")
});
