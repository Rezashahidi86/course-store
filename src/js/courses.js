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
} from "./helper.js";
const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const boxesCourseInformation = document.querySelectorAll(
  "#box-course-information"
);

const boxPartsCourseHandler = (event) => {
  let boxCoursePartInformation;
  if (event.target === event.currentTarget) {
    boxCoursePartInformation = event.target;
  } else {
    boxCoursePartInformation = event.target.parentElement;
  }
  const faAngele = boxCoursePartInformation.querySelector("svg");
  const boxCoursePart = boxCoursePartInformation.nextElementSibling;
  if (boxCoursePart.className.includes("hidden")) {
    boxCoursePart.classList.remove("hidden");
    faAngele.classList.add("rotate-180");
    boxCoursePartInformation.classList.add("rounded-t-md");
    boxCoursePartInformation.classList.remove("rounded-md");
  } else {
    boxCoursePart.classList.add("hidden");
    faAngele.classList.remove("rotate-180");
    boxCoursePartInformation.classList.remove("rounded-t-md");
    boxCoursePartInformation.classList.add("rounded-md");
  }
};

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
boxesCourseInformation.forEach((boxCourseInformation) => {
  boxCourseInformation.addEventListener("click", boxPartsCourseHandler);
});
window.addEventListener("load", getThemeFromLocalStorage("text-dark","2xl"));
window.addEventListener("load", getUser(true));
