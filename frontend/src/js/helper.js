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
const creatorName = document.querySelector("#creator-name");
const teacherProfile = document.querySelector("#teacher-profile");
const searchGlobalInput = document.querySelector("#search-global-input");
const basketCoursesContainer = document.querySelector(
  "#basket-courses-container"
);
const basketContainer = document.querySelector("#basket-container");
const closeBasket = document.querySelector("#close-basket");
const showbasketBtns = document.querySelectorAll(".show-basket-btn");
let modalInfoAccountBtn;
let courseParams;
const quickAccessContainer = document.querySelector("#quick-access-container");

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
    if (userInfo.role === "ADMIN") {
      quickAccessContainer.insertAdjacentHTML(
        "afterbegin",
        `
        <li
          class="hover:bg-button2 dark:hover:bg-header-dark rounded-md duration-200"
        >
          <a
            href="./panel/homepage.html"
            class="flex items-center gap-x-4 py-4 px-2 text-xl text-text dark:text-text-dark hover:text-background"
          >
            <i class="fa fa-house text-xl"></i>
            <span class="text-sm">بخش مدیریت</span>
          </a>
        </li>
        `
      );
    }
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

const getUser = async (style = false, userIcon = true) => {
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
      if (userIcon) {
        showStatusUser(userInfo, style);
      }
      return userInfo;
    } else if (res.status === 403) {
      showToastBox("خطایی در دریافت اطلاعات شما رخ داده است", "reject");
      if (userIcon) {
        showStatusUser(false, style);
      }
    }
  } else {
    if (userIcon) {
      showStatusUser(false, style);
    }
  }
};

const logoutuser = (style = false) => {
  setInToLocalStorage("token", "");
  getUser(style);
  hideModalInfoAccount();
  location.href = "/frontend/index.html"
};

// showCourses

const showCourses = (container, courses, myCourses = false) => {
  container.innerHTML = "";
  if (courses.length) {
    if (myCourses) {
      courses.forEach((course) => {
        let arrayDateCreate = course.course.createdAt.slice(0, 10).split("-");
        let dateCreat = changeDate(
          arrayDateCreate[0],
          arrayDateCreate[1],
          arrayDateCreate[2]
        ).join("/");
        container.insertAdjacentHTML(
          "beforeend",
          `
          <div class="flex flex-col">
            <div>
              <img
                src="${baseUrlCover}/${course.course.cover}"
                alt="course"
                class="object-cover rounded-md w-50 h-30"
              />
              <p class="line-clamp-2 text-title dark:text-title-dark my-2 h-10 text-sm">
                ${course.course.name}
              </p>
            </div>
            <div
              class="text-center pt-2 border-t-[1px] border-text-dark dark:border-text text-text dark:text-text-dark"
            >
              <i class="fa fa-calendar-check"></i>
              <span>${dateCreat}</span>
              <div>
                <a
                  class="w-full flex items-center justify-center gap-x-2 bg-button2 dark:bg-header hover:bg-blue-600 dark:hover:bg-blue-900 duration-200 text-background py-2 rounded-md"
                  href="courses.html?name=${course.course.shortName}"
                >
                  <span>ادامه یادگیری</span>
                  <i class="fa fa-arrow-left"></i>
                </a>
              </div>
            </div>
          </div>
          `
        );
      });
    } else {
      courses.forEach((course) => {
        let realPrice;
        if (course.discount) {
          realPrice = course.price - (course.price * course.discount) / 100;
        } else {
          realPrice = course.price;
        }
        container.insertAdjacentHTML(
          "beforeend",
          `
        <div
          class="swiper-slide shadow-md shadow-cart dark:shadow-cart-dark"
        >
          <div
            class="bg-cart dark:bg-cart-dark border-2 rounded-t-lg border-cart dark:border-cart-dark"
          >
            <a href="courses.html?name=${course?.shortName}"
              ><img
                class="rounded-md w-full h-40 max-md:h-64 max-sm:max-h-52 max-sm:max-w-full object-center p-0"
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
                    course.discount && course.price ? "flex" : "hidden"
                  }  items-center justify-center p-2 rounded-xl bg-button2 text-background dark:bg-header-dark dark:text-background"
                  >%${course.discount}</span
                >
                <div class="flex flex-col justify-center">
                  <del
                    class="${
                      course.discount && course.price ? "" : "hidden"
                    } text-sm text-title dark:text-background-dark"
                    >${course.price}تومان</del
                  >
                  <span class="text-button1 dark:text-button1-dark"
                    >${
                      course.price
                        ? realPrice.toLocaleString() + "تومان"
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
      });
    }
  } else {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="p-3 rounded-lg flex items-center gap-x-2 bg-red-500 dark:bg-red-600 mt-8 w-max"
      >
        <i class="text-background fa fa-person-circle-question"></i>
        <p class="text-background">
          دوره ای یافت نشد.
        </p>
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
    showCourses(container, courses);
  } else if (mode === "category") {
    const categoryCoursesParams = getValueFromUrl("cat");
    const searchCategoryParams = getValueFromUrl("search");
    if (categoryCoursesParams) {
      const res = await fetch(
        `${baseUrl}/courses/category/${categoryCoursesParams}`
      );
      const categoryCourses = await res.json();
      nameCategotyCourse.innerHTML = categoryCoursesParams;
      countCourses.innerHTML = categoryCourses.length + " دوره آموزشی";
      showCourses(container, categoryCourses);
      return categoryCourses;
    } else if (searchCategoryParams) {
      const res = await fetch(`${baseUrl}/courses`);
      const allcategoryCourses = await res.json();
      const categoryCourses = allcategoryCourses.filter((course) => {
        return course.name.includes(searchCategoryParams);
      });
      nameCategotyCourse.innerHTML = searchCategoryParams;
      countCourses.innerHTML = categoryCourses.length + " دوره آموزشی";
      showCourses(container, categoryCourses);
      return categoryCourses;
    } else {
      const res = await fetch(`${baseUrl}/courses`);
      const resParse = await res.json();
      const courses = await resParse;
      showCourses(container, courses);
      countCourses.innerHTML = courses.length + " دوره آموزشی";
      nameCategotyCourse.innerHTML = "همه دوره ها";
      return courses;
    }
  } else if (mode === "myCourses" || mode === "lastMyCourses") {
    const res = await fetch(`${baseUrl}/users/courses`, {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
      },
    });
    const infoUser = await res.json();
    if (container) {
      const countMyCourses = document.querySelector("#count-mycourses");
      countMyCourses.innerHTML = `${infoUser.length} دوره`;
      if (mode === "myCourses") {
        showCourses(container, infoUser, true);
      } else {
        showCourses(container, infoUser.reverse().slice(0, 4), true);
      }
    }
    return infoUser;
  }
};

const showSearchGlobal = () => {
  const searchUser = searchGlobalInput.value.trim();
  if (searchUser) {
    location.assign(`./category.html?search=${searchUser}`);
  } else {
    showToastBox("جستجوی شما خالی است", "failed");
  }
};

// Pagination
let coursePage;
let coursecontainerPage;
let pagecontainerGlo;
const showPagination = (
  coursecontainer,
  pagecontainer,
  courses,
  currentPage,
  countcorseinpage
) => {
  coursecontainerPage = coursecontainer;
  pagecontainerGlo = pagecontainer;
  coursePage = courses;
  pagecontainer.innerHTML = "";
  const countPagination = Math.ceil(courses.length / countcorseinpage);
  const lastIndex = currentPage * countcorseinpage;
  const startindex = lastIndex - countcorseinpage;
  const courseShow = courses.slice(startindex, lastIndex);
  for (let i = 0; i < countPagination; i++) {
    pagecontainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="px-3 py-1 rounded-sm  ${
      +currentPage === i + 1
        ? "text-title-dark bg-green-600 dark:bg-green-800"
        : "bg-cart dark:bg-cart-dark text-title dark:text-title-dark hover:bg-green-600 hover:text-white dark:hover:bg-green-600 duration-200"
    } cursor-pointer" onclick="changePage(${i + 1})"><span>${i + 1}</span></div>
    `
    );
  }
  showCourses(coursecontainer, courseShow);
};

const changePage = (page) => {
  showPagination(coursecontainerPage, pagecontainerGlo, coursePage, page, 6);
};

// showNavbar And Basket

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
           class="group-hover:mt-4 bg-background dark:bg-text-dark divide-text dark:divide-text shadow-md shadow-shadow dark:shadow-2xl dark:shadow-shadow-dark duration-300 opacity-0 group-hover:opacity-100 divide-y-2 flex flex-col border-2 p-2 gap-y-2 rounded-md"
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
  const courseInfo = await res.json();
  if (mode === "course") {
    shortLinkCourse.innerHTML = `courses.html?name=${courseParams}`;
  } else {
    creatorName.innerHTML = courseInfo.creator.name;
    teacherProfile.src = `${baseUrlCover}/${courseInfo.creator.profile}`;
  }

  return courseInfo;
};

const showCourseBasket = () => {
  const courses = getFromLocalStorage("basket");
  basketCoursesContainer.innerHTML = "";
  if (courses?.length) {
    let plusPriceCourses = 0;
    courses.forEach((course) => (plusPriceCourses += course.price));
    courses.forEach((course) => {
      basketCoursesContainer.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="col-span-1">
        <div
          class="shadow-md shadow-cart dark:shadow-cart-dark mt-4"
        >
          <div
            class="bg-cart dark:bg-cart-dark border-2 rounded-t-lg border-cart dark:border-cart-dark relative"
          >
            <button class="flex items-center justify-center absolute bg-red-500 text-background rounded-full cursor-pointer px-1 py-0.5"
            onclick="deleteCourseFromBasket('${course._id}')">
                <i class="fa fa-close"></i>
            </button>
            <a href="courses.html?name=${course?.shortName}"
              >
              <img
                class="rounded-md w-full h-40 max-md:h-64 max-sm:max-h-52 max-sm:max-w-full object-cover p-0"
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
            </div>
            <div
              class="flex items-center justify-between mt-2 border-t-2 border-text-dark dark:border-text px-1"
            >
              <div class="text-text dark:text-text-dark">
                <i class="fa fa-users mt-4"></i>
                <span>${course.courseStudentsCount}</span>
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
        <div class="${
          course.price ? "" : "hidden"
        } mt-4 border-2 border-button2 dark:border-header flex items-center justify-between p-2 rounded-md">
          <input text="text" class="outline-none border-none text-text dark:text-text-dark w-full" placeholder="کدتخفیف..." id="input-code-off-${
            course._id
          }">
          <button class="outline-none text-background bg-button2 dark:bg-header hover:bg-blue-600 dark:hover:bg-blue-900 duration-200 rounded-md p-2 cursor-pointer" onclick='checkCodeOff(${JSON.stringify(
            [course._id, course.price]
          )})'>اعمال</button>
        </div>
      </div>
      `
      );
    });
    basketCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="mt-6 flex items-center justify-between mb-4 w-full flex-wrap gap-y-4 col-span-2 max-sm:col-span-1">
      <button class="flex items-center gap-x-2 bg-button1 hover:bg-green-700 duration-200 px-3 py-2 rounded-md text-background cursor-pointer"
      onclick="rigesterToCourses()">
        <i class="fa fa-cart-shopping"></i>
        <span>ثبت نام در دوره</span>
      </button>
      <span class="text-text dark:text-text-dark text-sm">مبلغ کل :  <span id="plus-price-basket">${plusPriceCourses.toLocaleString()}</span> تومان</span>
    </div>
    `
    );
    showbasketBtns.forEach((showbasketBtn) => {
      if (showbasketBtn.className.includes("index")) {
        showbasketBtn.insertAdjacentHTML(
          "beforeend",
          `
        <div class="absolute -top-2 -right-2 bg-button2 dark:bg-header text-background rounded-full px-1.5 text-sm count-course-basket cursor-pointer">
          <span>${courses.length}</span>
        </div>
        `
        );
      } else {
        showbasketBtn.insertAdjacentHTML(
          "beforeend",
          `
        <div class="absolute top-0 right-0 bg-button2 dark:bg-header text-background rounded-full px-1.5 text-sm count-course-basket">
          <span>${courses.length}</span>
        </div>
        `
        );
      }
    });
  } else {
    basketContainer.classList.add("h-max")
    basketCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="flex items-center gap-x-4 bg-red-500 text-background mt-12 rounded-md p-3">
          <i class="fa fa-warning"></i>
          <span>سبد خرید شما خالی است:(</span>
      </div>
      `
    );
  }
};

const showInfoBasket = () => {
  if (basketContainer.className.includes("-right-[620px]")) {
    basketContainer.classList.add("right-0");
    basketContainer.classList.remove("-right-[620px]");
  } else {
    basketContainer.classList.remove("right-0");
    basketContainer.classList.add("-right-[620px]");
  }
  closeBasket.classList.toggle("hidden");
};

const rigesterToCourses = () => {
  const plusPriceBasketElem = document.querySelector("#plus-price-basket");
  const basketCourses = getFromLocalStorage("basket");
  if (getFromLocalStorage("token")) {
    if (+plusPriceBasketElem.innerHTML === 0) {
      basketCourses.forEach(async (basketCourse) => {
        const res = await fetch(
          `${baseUrl}/courses/${basketCourse._id}/register`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getFromLocalStorage("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: 0 }),
          }
        );
        if (res.ok) {
          setInToLocalStorage("basket", []);
          showInfoBasket();
          showToastBox("با موفقیت در دوره ثبت نام کردید", "successful");
          setTimeout(() => {
            location.href = "./frontend/mycourses.html";
          }, 2000);
        } else if (res.status === 409) {
          showInfoBasket();
          showToastBox("شما قبلا در دوره ثبت نام کردید", "failed");
          deleteCourseFromBasket();
          showCourseBasket();
          const countCourseBasketElems = document.querySelectorAll(
            ".count-course-basket"
          );
          if (countCourseBasketElems.length) {
            countCourseBasketElems[0].innerHTML = "";
            countCourseBasketElems[1].innerHTML = "";
          }
        } else {
          showInfoBasket();
          showToastBox("خطایی رخ داده بعدا تلاش کنید", "failed");
        }
      });
    } else {
      const price = +plusPriceBasketElem.innerHTML.split(",").join("");
      basketCourses.forEach(async (basketCourse) => {
        const res = await fetch(
          `${baseUrl}/courses/${basketCourse._id}/register`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getFromLocalStorage("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price }),
          }
        );
        if (res.ok) {
          setInToLocalStorage("basket", []);
          showInfoBasket();
          showToastBox(
            `مجموع:${price.toLocaleString()} شما تراکنش داشتید`,
            "successful"
          );
          setTimeout(() => {
            location.href = "/frontend/mycourses.html";
          }, 2000);
        } else if (res.status === 409) {
          showInfoBasket();
          showToastBox("شما قبلا در دوره ثبت نام کردید", "failed");
          deleteCourseFromBasket();
          showCourseBasket();
          const countCourseBasketElems = document.querySelectorAll(
            ".count-course-basket"
          );
          if (countCourseBasketElems.length) {
            countCourseBasketElems[0].innerHTML = "";
            countCourseBasketElems[1].innerHTML = "";
          }
        } else {
          showInfoBasket();
          showToastBox("خطایی رخ داده بعدا تلاش کنید", "failed");
        }
      });
    }
  } else {
    showInfoBasket();
    showToastBox("لطفا ابتدا در سایت ثبت نام کنید", "failed");
  }
};

const deleteCourseFromBasket = (courseID) => {
  let coursesBasket = getFromLocalStorage("basket");
  const courseIndex = coursesBasket.findIndex(
    (course) => courseID === course._id
  );
  coursesBasket.splice(courseIndex, 1);
  setInToLocalStorage("basket", coursesBasket);
  showCourseBasket();
  const basket = getFromLocalStorage("basket");
  if (!basket.length) {
    const countCourseBasketElems = document.querySelectorAll(
      ".count-course-basket"
    );
    if (countCourseBasketElems.length) {
      countCourseBasketElems[0].innerHTML = "";
      countCourseBasketElems[1].innerHTML = "";
    }
  }
};

const checkCodeOff = async (courseIDAndPriceCourse) => {
  const courseID = courseIDAndPriceCourse[0];
  const coursePrice = courseIDAndPriceCourse[1];
  const inputCodeOffElem = document.querySelector(
    `#input-code-off-${courseID}`
  );
  const codeOff = inputCodeOffElem.value.trim();
  if (codeOff) {
    const res = await fetch(`${baseUrl}/offs/${codeOff}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course: courseID }),
    });
    const percent = await res.json();
    if (res.status === 200) {
      showToastBox("کد تخفیف اعمال شد", "successful");
      const plusPriceBasket = document.querySelector("#plus-price-basket");
      const priceOff = Math.floor(
        (coursePrice * Number(percent.percent)) / 100
      );
      plusPriceBasket.innerHTML = (
        +plusPriceBasket.innerHTML.split(",").join("") - priceOff
      ).toLocaleString();
    } else if (res.status === 409) {
      showToastBox("کد تخفیف اعتبار ندارد", "failed");
    } else if (res.status === 404) {
      showToastBox("کد تخفیف نا معتبر است", "failed");
    }
  } else {
    showToastBox("کد تخفیف را وارد کنید", "failed");
  }
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
  showSearchGlobal,
  showPagination,
  changePage,
  logoutuser,
  showInfoBasket,
  showCourseBasket,
  deleteCourseFromBasket,
  rigesterToCourses,
  checkCodeOff,
};
