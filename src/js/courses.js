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
} from "./helper.js";

const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const headerLinksContainer = document.querySelector("#header-links-category");
const courseTitle = document.querySelector("#course-title");
const courseDescription = document.querySelector("#course-description");
const statusBuyUserContainer = document.querySelector("#status-buy-user");
const countStudentsElem = document.querySelector("#count-students");
const statusCourseElem = document.querySelector("#status-course");
const statusSupportElem = document.querySelector("#status-support");
const statusWatchCourseElem = document.querySelector("#status-watch-course");
const teacherNameElems = document.querySelectorAll(".teacher-name");
const courseTimeElem = document.querySelector("#course-time");
const courseSessionsTimeElem = document.querySelector("#course-sessions-time");
const videoContainer = document.querySelector("#video-container");
const percentStatusCourse = document.querySelector("#percent-status-course");
const shortLinkCourse = document.querySelector("#shortlink");
const copyShortLinkBtn = document.querySelector("#copy-shortlink-btn");
const descriptionTextElem = document.querySelector("#description-text");
const descriptionImg = document.querySelector("#description-img")
const numberPercentStatusCourse = document.querySelector(
  "#number-percent-status-course"
);
let courseParams;
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

const getInfoCourse = async () => {
  courseParams = getValueFromUrl("name");
  const token = getFromLocalStorage("token");
  const res = await fetch(`${baseUrl}/courses/${courseParams}`, {
    headers: {
      Authorization: token,
    },
  });
  shortLinkCourse.innerHTML = `courses.html?name=${courseParams}`;
  const courseInfo = await res.json();
  return courseInfo;
};

const changeHeaderLinks = (courseInfo) => {
  headerLinksContainer.insertAdjacentHTML(
    "beforeend",
    `
      <a
        href="category.html?cat=${courseInfo.categoryID.name}"
        class="relative text-nowrap text-text dark:text-text-dark after:absolute after:w-[4.25rem] after:h-2 after:-top-3 after:-right-18 after:rotate-[140deg] after:bg-background dark:after:bg-background-dark before:absolute before:w-16 before:h-2 before:-bottom-3 before:-right-18 before:rotate-[-140deg] before:bg-background dark:before:bg-background-dark"
        id="category-course-title"
        >${courseInfo.categoryID.name}</a
      >
      <a
        href="#"
        class="relative text-nowrap text-text dark:text-text-dark after:absolute after:w-[4.25rem] after:h-2 after:-top-3 after:-right-18 after:rotate-[140deg] after:bg-background dark:after:bg-background-dark before:absolute before:w-16 before:h-2 before:-bottom-3 before:-right-18 before:rotate-[-140deg] before:bg-background dark:before:bg-background-dark"
      >${courseInfo.name}</a
      >
    `
  );
};

const headerInfoCourse = (courseInfo) => {
  courseTitle.innerHTML = courseInfo.name;
  courseDescription.innerHTML = courseInfo.description;
  if (courseInfo.isUserRegisteredToThisCourse) {
    statusBuyUserContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="flex items-center justify-between mt-4 max-2sm:flex-col-reverse"
      >
        <div
          class="flex items-center gap-x-6 text-text dark:text-text-dark"
        >
          <i class="fa fa-user text-3xl max-sm:text-2xl"></i>
          <span class="text-xl max-sm:text-lg">شما دانشجوی دوره هستید</span>
        </div>
        <div
          class="flex items-center gap-x-2 text-background py-4 px-8 rounded-xl bg-button1 dark:bg-button1-dark max-sm:px-4 max-2sm:px-20 max-2sm:mb-4 cursor-pointer"
        >
          <i class="fa fa-book-open text-xl"></i>
          <span>مشاهده دوره</span>
        </div>
      </div>
      `
    );
  } else {
    statusBuyUserContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="flex items-center flex-row-reverse justify-between mt-4 max-2sm:flex-col-reverse"
      >
        <div
          class="flex items-center gap-x-6 text-text dark:text-text-dark"
        >
          <span class="text-xl max-sm:text-lg text-button1">${
            courseInfo.price ? courseInfo.price.toLocaleString() : "رایگان"
          }${courseInfo.price ? "تومان" : ""}</span>
        </div>
        <div
          class="flex items-center gap-x-2 text-background py-4 px-8 rounded-xl bg-button1 dark:bg-button1-dark max-sm:px-4 max-2sm:px-20 max-2sm:mb-4 cursor-pointer"
        >
          <i class="fa fa-basket-shopping text-xl"></i>
          <span>افزودن به سبد خرید</span>
        </div>
      </div>
      `
    );
  }
  videoContainer.insertAdjacentHTML(
    "beforeend",
    `
    <video
      class="rounded-xl"
      src=""
      poster="./src/img/index/forex.png"
      controls
    ></video>
    `
  );
};

const boxesStatusCourse = (courseInfo) => {
  if (courseInfo.isComplete) {
    statusCourseElem.innerHTML = "تکمیل شده";
  } else {
    statusCourseElem.innerHTML = "در حال اجرا";
  }
  if (courseInfo.price) {
    statusWatchCourseElem.innerHTML = "آنلاین";
  } else {
    statusWatchCourseElem.innerHTML = "دانلود/آنلاین";
  }
  teacherNameElems.forEach((teacherNameElem) => {
    teacherNameElem.innerHTML = courseInfo.creator.name;
  });
  if (courseInfo.isComplete) {
    percentStatusCourse.classList.add("after:w-[100%]");
    numberPercentStatusCourse.innerHTML = 100 + "%";
  } else {
    const nub = courseInfo.sessions.length * 3;
    percentStatusCourse.classList.add(`after:w-[${nub}%]`);
    numberPercentStatusCourse.innerHTML = nub + "%";
  }
  const dateMiladi = courseInfo.updatedAt.slice(0, 10).split("-");
  const dateShamsi = changeDate(dateMiladi[0], dateMiladi[1], dateMiladi[2]);
  courseTimeElem.innerHTML = dateShamsi.join("/");
  courseSessionsTimeElem.innerHTML = plusTime(courseInfo.sessions);
  countStudentsElem.innerHTML = courseInfo.courseStudentsCount;
  statusSupportElem.innerHTML = courseInfo.support;
};

const description = (courseInfo) => {
  descriptionTextElem.innerHTML = courseInfo.description
  descriptionImg.src = "./src/img/index/forex.png"
};

const showInfoCourses = async () => {
  const courseInfo = await getInfoCourse();
  console.log(courseInfo);
  changeHeaderLinks(courseInfo);
  headerInfoCourse(courseInfo);
  boxesStatusCourse(courseInfo);
  description(courseInfo)
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
copyShortLinkBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`courses.html?name=${courseParams}`);
  showToastBox("لینک با موفقیت ذخیره شد", "successful");
});

window.addEventListener("load", () => {
  getThemeFromLocalStorage("text-dark");
  getUser(true);
  getNavbar();
  showInfoCourses();
});
