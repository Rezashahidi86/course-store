import {
  getThemeFromLocalStorage,
  getUser,
  getNavbar,
  getValueFromUrl,
  themeChangeBtns,
  closeModalBars,
  backModalInfoAccount,
  modalBarsHandeler,
  hideModalInfoAccount,
  darkOrLight,
  iconThemeChange,
  baseUrl,
  getFromLocalStorage,
  getInfoCourse,
  changeHeaderLinks,
  baseUrlCover,
} from "./helper.js";
const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const partCourseElem = document.querySelector("#part-course");
const nameSessionElem = document.querySelector("#name-session");
const videoContainer = document.querySelector("#video-container");
const boxSessenionsContainer = document.querySelector(
  "#box-sessions-container"
);
const boxesCourseInformation = document.querySelectorAll(
  ".box-course-information"
);
let boxCourseParts;
let userSessionSelect;
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

const showHeaderLinks = async () => {
  const courseInfo = await getInfoCourse("session");
  changeHeaderLinks(courseInfo);
  videoContainer.poster = `${baseUrlCover}/${courseInfo.cover}`
};

const boxPartsCourseHandler = (event) => {
  let boxCoursePartInformation;
  if (event.target === event.currentTarget) {
    boxCoursePartInformation = event.target;
  } else {
    boxCoursePartInformation = event.target.parentElement;
  }
  const faAngele = boxCoursePartInformation.querySelector("svg");
  boxCourseParts.forEach((boxCoursePart) => {
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
  });
  if (userSessionSelect) {
    boxSessenionsContainer.scrollTop =
      userSessionSelect.offsetTop - boxSessenionsContainer.offsetTop - 60;
  }
};

const showSissions = (allSessions) => {
  const userSession = allSessions.session;
  videoContainer.scr = `${baseUrlCover}/${userSession.video}`
  const sessions = allSessions.sessions;
  const lastSessions = sessions.length;
  if (sessions.length) {
    sessions.forEach((session, index) => {
      const sessionSelect = userSession._id === session._id;
      boxSessenionsContainer.insertAdjacentHTML(
        "beforeend",
        `
      <${session.free ? "a" : "div"}
        href="sessions.html?name=${getValueFromUrl("name")}&id=${session._id}"
        class="mt-1 flex items-center justify-between p-4 box-course-part ${
          session.free ? "group" : ""
        } ${lastSessions === index + 1 ? "rounded-br-md" : ""}"
        id="${sessionSelect ? "session-on" : ""}"
      >
        <div
          class="flex items-center gap-x-4 text-title dark:text-title-dark"
        >
          <div
            class="dark:bg-background-dark bg-background px-2 py-0.5 rounded-sm group-hover:bg-button1"
          >
            <span class="relative  ${
              sessionSelect
                ? "after:absolute after:w-[10px] after:h-[28px] after:bg-green-500 dark:after:bg-green-600 after:-top-[1px] after:-right-4 after:rounded-r-lg"
                : ""
            } ">${index + 1}</span>
          </div>
          <span class="text-background-dark group-hover:text-button1 duration-200 line-clamp-1"
            >${session.title}</span
          >
        </div>
        <div
          class="text-background-dark flex items-center gap-x-2 group-hover:text-button1 duration-200 max-2sm:"
        >
        <span>${session.time}</span>
        <i class="fa fa-lock ${session.free ? "opacity-0 absolute" : ""}"></i>
        </div>
      </${session.free ? "a" : "div"}>
      `
      );
      boxCourseParts = document.querySelectorAll(".box-course-part");
      if (sessionSelect) {
        partCourseElem.innerHTML = index + 1;
        nameSessionElem.innerHTML = session.title;
        userSessionSelect = document.querySelector("#session-on");
      }
    });
  } else {
    boxSessenionsContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="bg-text dark:bg-text-dark flex items-center justify-between p-4 hidden box-course-part"
      >
        <div
          class="flex items-center gap-x-4 text-title dark:text-title-dark"
        >
          <div
            class="dark:bg-background-dark bg-background px-2 py-0.5 rounded-sm"
          >
            <span class="">--</span>
          </div>
          <span class="text-background dark:text-background-dark"
            >هنوز دوره ای اضافه نشده</span
          >
        </div>
        <div
          class="text-background dark:text-background-dark flex items-center gap-x-2"
        >
        <span>00:00</span>
        <i class="fa fa-play"></i>
        </div>
      </div>
      `
    );
    boxCourseParts = document.querySelectorAll(".box-course-part");
  }
};

const changeScrollBarSessions = () => {
  if (userSessionSelect) {
    boxSessenionsContainer.scrollTop =
      userSessionSelect.offsetTop - boxSessenionsContainer.offsetTop - 60;
  }
};

const getSessions = async () => {
  const res = await fetch(
    `${baseUrl}/courses/${getValueFromUrl("name")}/${getValueFromUrl("id")}`,
    {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
      },
    }
  );
  const sessions = await res.json();
  showSissions(sessions);
};

closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
backModalInfoAccount.addEventListener("click", hideModalInfoAccount);
boxesCourseInformation.forEach((boxCourseInformation) => {
  boxCourseInformation.addEventListener("click", boxPartsCourseHandler);
});
window.addEventListener("load", async () => {
  getThemeFromLocalStorage("text-dark");
  getUser(true);
  getNavbar();
  const _ = await getSessions();
  changeScrollBarSessions();
  showHeaderLinks();
});
