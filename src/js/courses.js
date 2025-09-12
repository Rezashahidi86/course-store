import * as helper from "./helper.js";
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

helper.closeModalBars.addEventListener("click", helper.modalBarsHandeler);
openModalBtnBars.addEventListener("click", helper.modalBarsHandeler);
boxesCourseInformation.forEach((boxCourseInformation) => {
  boxCourseInformation.addEventListener("click", boxPartsCourseHandler);
});
