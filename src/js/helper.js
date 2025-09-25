const modalBars = document.querySelector("#modal-bars");
const closeModalBars = document.querySelector("#close-modal-bars");
const toastBox = document.querySelector("#toast-box");
const toastIcon = document.querySelector("#toast-icon");
const toastTitle = document.querySelector("#toast-title");
const moadlInfoAccount = document.querySelector("#moadl-info-account");
const backModalInfoAccount = document.querySelector("#back-modal-info-account");
const themeChangeBtns = document.querySelectorAll(".theme-change");
const html = document.querySelector("html");
const baseUrl = "http://localhost:4000/v1";
const baseUrlCover = "http://localhost:4000/courses/covers";
const statusUserDesctap = document.querySelector("#status-user-desctap");
const statusUserMobile = document.querySelector("#status-user-mobile");
const nameUserMaodalInfoAccount = document.querySelector(
  "#name-user-maodal-info-account"
);
const navbarDesctapContainer = document.querySelector("#navbar-desctap");
const navbarMobileContainer = document.querySelector("#navbar-mobile");
const countCourses = document.querySelector("#count-courses");
const nameCategotyCourse = document.querySelector("#name-categoty-course");
const shortLinkCourse = document.querySelector("#shortlink");
const headerLinksContainer = document.querySelector("#header-links-category");
let modalInfoAccountBtn;
let courseParams;
const boxesCourseInformation = document.querySelectorAll(
  "#box-course-information"
);

//  localStorageAndUtiliti

const setInToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const getValueFromUrl = (key) => {
  const keys = new URLSearchParams(location.search);
  const value = keys.get(key);
  return value;
};

const plusTime = (sessiones) => {
  const times = sessiones.map((session) => {
    return session.time;
  });
  let allTimeSecound = 0;
  times.forEach((time) => {
    if (time.length === 8) {
      const hourse = +time.slice(0, 2);
      const min = +time.slice(3, 5);
      const secound = +time.slice(6, 8);
      allTimeSecound += hourse * 3600;
      allTimeSecound += min * 60;
      allTimeSecound += secound;
    } else if (time.length === 5) {
      const min = +time.slice(0, 2);
      const secound = +time.slice(3, 5);
      allTimeSecound += min * 60;
      allTimeSecound += secound;
    }
  });
  if (allTimeSecound < 3600) {
    const min = Math.floor(allTimeSecound / 60);
    if (min === 0) {
      return "تازه اجرا شده";
    } else {
      return `${min} دقیقه`;
    }
  } else {
    const hourse = Math.floor(allTimeSecound / 3600);
    return `${hourse} ساعت`;
  }
};

const changeDate = (y, m, d) => {
  const date = new Date(y, m - 1, d);
  const formatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const formatted = formatter.format(date);
  const englishNumbers = formatted.replace(/[۰-۹]/g, (d) =>
    "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
  );
  const parts = englishNumbers.split("/");
  return [parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2])];
};
// modal bars

const modalBarsHandeler = () => {
  if (modalBars.className.includes("right-0")) {
    modalBars.classList.remove("right-0");
    modalBars.classList.add("right-[-270px]");
    closeModalBars.classList.remove("right-[270px]");
    closeModalBars.classList.add("right-[1000px]");
  } else {
    modalBars.classList.add("right-0");
    modalBars.classList.remove("right-[-270px]");
    closeModalBars.classList.add("right-[270px]");
    closeModalBars.classList.remove("right-[1000px]");
  }
};

const showModalInfoAccount = () => {
  moadlInfoAccount.classList.remove("hidden");
  backModalInfoAccount.classList.remove("hidden");
};

// toastBox

const showToastBox = (title, status) => {
  toastIcon.innerHTML = "";
  toastTitle.innerHTML = "";
  if (status === "successful") {
    toastBox.classList.add("after:bg-button1");
    toastBox.classList.remove("after:bg-red-600");
    toastTitle.innerHTML = title;
    toastIcon.insertAdjacentHTML(
      "beforeend",
      `
        <i class="fa fa-check-circle text-4xl text-button1"></i>
        `
    );
    toastBox.classList.remove("-left-96");
    toastBox.classList.add("left-0");
    setTimeout(() => {
      toastBox.classList.add("-left-96");
      toastBox.classList.remove("left-0");
    }, 2000);
  } else {
    toastBox.classList.remove("after:bg-button1");
    toastBox.classList.add("after:bg-red-600");
    toastTitle.innerHTML = title;
    toastIcon.insertAdjacentHTML(
      "beforeend",
      `
        <i class="fa fa-close text-4xl text-red-600"></i>
        `
    );
    toastBox.classList.remove("-left-96");
    toastBox.classList.add("left-0");
    setTimeout(() => {
      toastBox.classList.add("-left-96");
      toastBox.classList.remove("left-0");
    }, 3000);
  }
};

// modalInfoAccount

const showStatusUser = (userInfo, style) => {
  if (userInfo) {
    if (!style) {
      statusUserDesctap.insertAdjacentHTML(
        "beforeend",
        `
    <div id="modal-info-account-btn">
     <i class="fa fa-user text-2xl text-background cursor-pointer z-40"></i>
    </div>
    `
      );
    } else {
      statusUserDesctap.insertAdjacentHTML(
        "beforeend",
        `
        <div id="modal-info-account-btn">
          <i
          class="fa fa-user text-2xl p-4 rounded-full dark:bg-text bg-title-dark text-text-dark cursor-pointer"
          ></i>          
        </div>
        `
      );
    }
    statusUserMobile.insertAdjacentHTML(
      "beforebegin",
      `
    <div>
      <a
        href="#"
        class="flex items-center justify-between px-2 py-4 bg-text dark:bg-text-dark text-title dark:text-title-dark"
      >
        <span>${userInfo.username}</span>
        <i class="fa fa-angle-left"></i>
      </a>
    </div>
    `
    );
    modalInfoAccountBtn = document.querySelector("#modal-info-account-btn");
    modalInfoAccountBtn.addEventListener("click", showModalInfoAccount);
    nameUserMaodalInfoAccount.innerHTML = userInfo.username;
  } else {
    statusUserDesctap.insertAdjacentHTML(
      "beforeend",
      `
     <a
       href="./login.html"
       class="flex items-center p-2 rounded-sm cursor-pointer bg-button2 dark:bg-header-dark"
     >
       <div class="">
         <i class="fa fa-user text-2xl text-background"></i>
       </div>
       <div class="text-background flex items-center">
         <span>ورود</span>
         <span class="mr-1 pr-1 border-r-2 border-background"
           >ثبت نام</span
         >
       </div>
     </a>
    `
    );
    statusUserMobile.insertAdjacentHTML(
      "beforebegin",
      `
     <a
       class="text-xl block text-center py-4 w-full text-header dark:bg-header-dark bg-button2 dark:text-button2-dark"
       href="./login.html"
     >
       <span>ورود یا ثبت نام</span>
     </a>
    `
    );
  }
};

const hideModalInfoAccount = () => {
  moadlInfoAccount.classList.add("hidden");
  backModalInfoAccount.classList.add("hidden");
};

// changeTheme

const iconThemeChange = (iconElemNavbar, iconElemBars) => {
  themeChangeBtns[1].insertAdjacentHTML("beforeend", iconElemNavbar);
  themeChangeBtns[0].insertAdjacentHTML("beforeend", iconElemBars);
};

const getThemeFromLocalStorage = (color) => {
  const themeLocal = getFromLocalStorage("theme");
  themeChangeBtns[0].innerHTML = "";
  themeChangeBtns[1].innerHTML = "";
  if (themeLocal) {
    if (themeLocal === "dark") {
      iconThemeChange(
        `<i class="fa fa-sun text-2xl text-${color} cursor-pointer"></i>`,
        '<i class="fa fa-sun cursor-pointer"></i><span class="cursor-pointer">تم روشن</span>'
      );
      html.classList.add("dark");
    } else {
      iconThemeChange(
        `<i class="fa fa-moon text-2xl text-${color} cursor-pointer"></i>`,
        '<i class="fa fa-moon cursor-pointer"></i><span class="cursor-pointer">تم تیره</span>'
      );
      html.classList.remove("dark");
    }
  }
};

const darkOrLight = () => {
  if (html.className.includes("dark")) {
    setInToLocalStorage("theme", "light");
    html.classList.remove("dark");
    return "dark";
  } else {
    setInToLocalStorage("theme", "dark");
    html.classList.add("dark");
    return "light";
  }
};

// infoUser

const getUser = async (style = false) => {
  const accessToken = getFromLocalStorage("token");

  if (accessToken) {
    const res = await fetch(`${baseUrl}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 200) {
      const userInfo = await res.json();
      showStatusUser(userInfo, style);
      return userInfo;
    } else if (res.status === 403) {
      showToastBox("خطایی در دریافت اطلاعات شما رخ داده است", "reject");
      showStatusUser(false, style);
    }
  } else {
    showStatusUser(false, style);
  }
};

// showCourses

const showCourses = (container, courses) => {
  container.innerHTML = "";
  for (let i = 0; i < courses.length; i++) {
    let course = courses[i];
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div
          class="swiper-slide shadow-md shadow-cart dark:shadow-cart-dark"
        >
          <div
            class="bg-cart dark:bg-cart-dark border-2 rounded-t-lg border-cart dark:border-cart-dark"
          >
            <a href="courses.html?name=${course.shortName}"
              ><img
                class="rounded-md w-full h-40 max-md:h-64 max-sm:max-h-52 max-sm:max-w-full"
                src="${baseUrlCover}/${course.cover}"
                alt="cover"
            /></a>
            <a
              class="line-clamp-2 text-lg text-title dark:text-title-dark max-md:text-2xl h-16 px-4 mt-2"
              href="courses.html?name=${course.shortName}"
              >${course.name}</a
            >
            <p class="line-clamp-2 text-text dark:text-text-dark h-16 px-4">
              ${course.description}
            </p>
            <div
              class="flex justify-between text-text dark:text-text-dark px-1"
            >
              <a href="courses.html?name=${course.shortName}">
                <i class="fa fa-user"></i>
                <span>${course.creator}</span>
              </a>
              <div class="text-yellow-400">
                <span>${course.courseAverageScore}</span>
                <i class="fa fa-star"></i>
              </div>
            </div>
            <div
              class="flex items-center justify-between mt-2 border-t-2 border-text-dark dark:border-text px-1"
            >
              <div class="text-text dark:text-text-dark">
                <i class="fa fa-users mt-4"></i>
                <span>${course.registers}</span>
              </div>
              <div class="flex items-center gap-x-1 mt-2 h-[2.8rem]">
                <span
                  class="${
                    course.price ? "hidden" : "flex"
                  }  items-center justify-center p-2 rounded-xl bg-button2 text-background dark:bg-header-dark dark:text-background"
                  >${course.price ? "" : "100%"}</span
                >
                <div class="flex flex-col justify-center">
                  <del
                    class="${
                      course.price ? "hidden" : ""
                    } text-sm text-title dark:text-background-dark"
                    >200,000</del
                  >
                  <span class="text-button1 dark:text-button1-dark"
                    >${
                      course.price
                        ? course.price.toLocaleString() + "تومان"
                        : "رایگان"
                    }</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        `
    );
  }
};

const getCourses = async (container, mode) => {
  if (mode === "lastCourses" || mode === "freeCourses") {
    const res = await fetch(`${baseUrl}/courses`);
    const resParse = await res.json();
    const courses = await resParse;
    if (mode === "lastCourses") {
      const lastCourses = courses.slice(courses.length - 5, courses.length);
      showCourses(container, lastCourses);
    } else {
      const freeCourses = [];
      courses.forEach((course) => {
        if (course.price === 0) {
          freeCourses.push(course);
        }
      });
      showCourses(container, freeCourses);
    }
  } else if (mode === "popularCourses") {
    const res = await fetch(`${baseUrl}/courses/popular`);
    const resParse = await res.json();
    const courses = await resParse;
    const popularCourses = courses.slice(courses.length - 7, courses.length);
    showCourses(container, popularCourses);
  } else if (mode === "category") {
    const categoryCoursesParams = getValueFromUrl("cat");

    const res = await fetch(
      `${baseUrl}/courses/category/${categoryCoursesParams}`
    );
    const categoryCourses = await res.json();
    nameCategotyCourse.innerHTML = categoryCoursesParams;
    countCourses.innerHTML = categoryCourses.length + " دوره آموزشی";
    showCourses(container, categoryCourses);
    return categoryCourses;
  }
};

// showNavbar

const showNavbar = (sortNavbar) => {
  const navbarDesctap = sortNavbar.slice(
    sortNavbar.length - 5,
    sortNavbar.length
  );
  navbarDesctap.forEach((nav) => {
    const paramsMenu = nav.href.split("/");
    const hrefMenu = paramsMenu[paramsMenu.length - 1] ?? "";
    navbarDesctapContainer.insertAdjacentHTML(
      "beforeend",
      `
      <li
        class="relative group text-button2 dark:text-header hover:text-button2-dark dark:hover:text-header-dark duration-200"
      >
       <a
         href="./category.html?cat=${hrefMenu}"
         class="flex items-center gap-x-2 after:-bottom-2 after:bg-background dark:after:bg-text after:h-0.5 after:w-0 after:absolute group-hover:after:w-full after:duration-500 max-lg:gap-x-0"
         ><span>${nav.title}</span>
         <div class="max-lg:hidden">
           <i
             class="fa fa-arrow-left group-hover:-rotate-90 duration-200"
           ></i></div
       ></a>
       <div
         class="absolute right-0 top-6 duration-100 invisible group-hover:visible"
       >
         <div
           class="group-hover:mt-4 bg-background dark:bg-text-dark divide-text dark:divide-text shadow-md shadow-shadow dark:shadow-2xl dark:shadow-shadow-dark duration-300 opacity-0 group-hover:opacity-100 divide-y-2 flex flex-col border-2 p-2 gap-y-2 rounded-2xl"
         >
         ${
           nav.submenus.length
             ? nav.submenus
                 .map((submenu) => {
                   const paramsSubmenu = submenu.href.split("/");
                   const hrefSubmenu = paramsSubmenu[paramsSubmenu.length - 1];
                   return `<a href="courses.html?name=${hrefSubmenu}" class="text-nowrap">${submenu.title}</a>`;
                 })
                 .join("")
             : `<a href="#" class="text-nowrap">به زودی دوره ها اضافه میشود</a>`
         }
         </div>
       </div>
      </li>
    `
    );
  });
  sortNavbar.forEach((nav) => {
    const hrefMenu = nav.href.split("/")[2] ?? "";
    navbarMobileContainer.insertAdjacentHTML(
      "beforeend",
      `
      <a
        href="./category.html?cat=${hrefMenu}"
        class="mt-8 flex items-center justify-between text-sm text-text dark:text-text-dark"
      >
        <span class="">${nav.title}</span>
        <i class="fa fa-angle-left"></i>
      </a>
      `
    );
  });
};

const getNavbar = async () => {
  const res = await fetch(`${baseUrl}/menus`);
  const navbarCourses = await res.json();
  const sortNavbar = navbarCourses.sort((a, b) => {
    return 0.5 - Math.random();
  });
  showNavbar(sortNavbar);
};

const changeHeaderLinks = (courseInfo) => {
  console.log(courseInfo);
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

const getInfoCourse = async (mode) => {
  courseParams = getValueFromUrl("name");
  const token = getFromLocalStorage("token");
  const res = await fetch(`${baseUrl}/courses/${courseParams}`, {
    headers: {
      Authorization: token,
    },
  });
  if (mode === "course") {
    shortLinkCourse.innerHTML = `courses.html?name=${courseParams}`;
  }
  const courseInfo = await res.json();
  return courseInfo;
};

export {
  baseUrlCover,
  modalBars,
  closeModalBars,
  backModalInfoAccount,
  modalInfoAccountBtn,
  setInToLocalStorage,
  getFromLocalStorage,
  modalBarsHandeler,
  showToastBox,
  showModalInfoAccount,
  hideModalInfoAccount,
  darkOrLight,
  iconThemeChange,
  themeChangeBtns,
  getThemeFromLocalStorage,
  html,
  getUser,
  baseUrl,
  showCourses,
  getCourses,
  getNavbar,
  getValueFromUrl,
  plusTime,
  changeDate,
  getInfoCourse,
  changeHeaderLinks,
};
