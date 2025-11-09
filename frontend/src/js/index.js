import {
  closeModalBars,
  modalBarsHandeler,
  backModalInfoAccount,
  hideModalInfoAccount,
  iconThemeChange,
  darkOrLight,
  themeChangeBtns,
  getThemeFromLocalStorage,
  getUser,
  getCourses,
  getNavbar,
  showSearchGlobal,
  baseUrl,
  logoutuser,
  showInfoBasket,
  showCourseBasket,
  deleteCourseFromBasket,
  rigesterToCourses,
  checkCodeOff,
} from "./helper.js";

const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const titleElem = document.querySelector("#title");
const lastCourses = document.querySelector(".last-courses");
const popularCourses = document.querySelector(".popular-courses");
const freeCourses = document.querySelector(".free-courses");
const searchGlobalBtn = document.querySelector("#search-global-btn");
const logoutBtn = document.querySelector("#logout-btn");
const showbasketBtns = document.querySelectorAll(".show-basket-btn");
const closeBasket = document.querySelector("#close-basket");
const countUsersElem = document.querySelector("#count-users");
const countAllCourseElem = document.querySelector("#count-all-course");
const countAllTimeTeachElem = document.querySelector("#count-all-time-teach");
const typeWriteTitle = () => {
  const text = "ماده برای یادگیری ترید از صفر هستی؟";
  let indexText = 0;
  const timer = setInterval(() => {
    titleElem.innerHTML += text[indexText];
    indexText++;
    if (indexText >= text.length) {
      clearInterval(timer);
      setTimeout(() => {
        deleteTittle();
      }, 3000);
    }
  }, 50);
};

const deleteTittle = () => {
  const timer = setInterval(() => {
    titleElem.innerHTML = titleElem.innerHTML.slice(
      0,
      titleElem.innerHTML.length - 1
    );
    if (titleElem.innerHTML.trim().length === 1) {
      clearInterval(timer);
      typeWriteTitle();
    }
  }, 70);
};

const showInfoHeader = async () => {
  const res = await fetch(`${baseUrl}/infos/index`);
  const infoHeader = await res.json();
  console.log(infoHeader);
  countAllCourseElem.innerHTML = infoHeader.coursesCount;
  countUsersElem.innerHTML = infoHeader.usersCount;
  const allTime = Math.ceil(infoHeader.totalTime / 3600);
  countAllTimeTeachElem.innerHTML = allTime;
};

const countCourseRodeMap = async () => {
  const countRodeMap1 = document.querySelector("#count-rode-map-1");
  const countRodeMap2 = document.querySelector("#count-rode-map-2");
  const countRodeMap3 = document.querySelector("#count-rode-map-3");
  const countRodeMap4 = document.querySelector("#count-rode-map-4");
  const res = await fetch(`${baseUrl}/courses`);
  const courses = await res.json();
  console.log(courses);
  let countTechnicalanalysisCourse = 0;
  let countTradingtoolsandplatformsCourse = 0;
  let countPsychologyandcapitalmanagementCourse = 0;
  let countTradingstrategiesandsystemsCourse = 0;

  courses.forEach((course) => {
    if (course.categoryID.name === "technicalanalysis") {
      countTechnicalanalysisCourse += 1;
    } else if (course.categoryID.name === "tradingtoolsandplatforms") {
      countTradingtoolsandplatformsCourse += 1;
    } else if (course.categoryID.name === "psychologyandcapitalmanagement") {
      countPsychologyandcapitalmanagementCourse += 1;
    } else if (course.categoryID.name === "tradingstrategiesandsystems") {
      countTradingstrategiesandsystemsCourse += 1;
    }
  });
  countRodeMap1.innerHTML = `${countTechnicalanalysisCourse} دوره`;
  countRodeMap2.innerHTML = `${countTradingstrategiesandsystemsCourse} دوره`;
  countRodeMap4.innerHTML = `${countTradingtoolsandplatformsCourse} دوره`;
  countRodeMap3.innerHTML = `${countPsychologyandcapitalmanagementCourse} دوره`;
};

closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
backModalInfoAccount.addEventListener("click", hideModalInfoAccount);
searchGlobalBtn.addEventListener("click", showSearchGlobal);
logoutBtn.addEventListener("click", logoutuser);
showbasketBtns.forEach((showbasketBtn) => {
  showbasketBtn.addEventListener("click", showInfoBasket);
});
closeBasket.addEventListener("click", showInfoBasket);

themeChangeBtns.forEach((themeChangeBtn) => {
  themeChangeBtn.addEventListener("click", () => {
    themeChangeBtns[0].innerHTML = "";
    themeChangeBtns[1].innerHTML = "";
    const theme = darkOrLight();
    if (theme === "dark") {
      iconThemeChange(
        '<i class="fa fa-moon text-2xl text-background cursor-pointer"></i>',
        '<i class="fa fa-moon cursor-pointer"></i><span class="cursor-pointer">تم تیره</span>'
      );
    } else {
      iconThemeChange(
        '<i class="fa fa-sun text-2xl text-background cursor-pointer"></i>',
        '<i class="fa fa-sun cursor-pointer"></i><span class="cursor-pointer">تم روشن</span>'
      );
    }
  });
});
window.checkCodeOff = checkCodeOff;
window.rigesterToCourses = rigesterToCourses;
window.deleteCourseFromBasket = deleteCourseFromBasket;
window.addEventListener("load", async () => {
  deleteTittle();
  showInfoHeader();
  getThemeFromLocalStorage("background");
  getUser(false);
  showCourseBasket();
  countCourseRodeMap();
  let _ = await getCourses(lastCourses, "lastCourses");
  _ = await getCourses(popularCourses, "popularCourses");
  _ = await getCourses(freeCourses, "freeCourses");
  getNavbar();
  const swiperLastCourses = new Swiper(".swiper-last-courses", {
    loop: true,
    spaceBetween: 20,
    speed: 800,
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination-last-courses",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      },
    },
  });
  const swiperPopularCourses = new Swiper(".swiper-popular-courses", {
    spaceBetween: 20,
    speed: 800,
    slidesPerView: 4,
    loop: true,
    pagination: {
      el: ".swiper-pagination-popular-courses",
    },
    navigation: {
      nextEl: ".swiper-button-next-popular-courses",
      prevEl: ".swiper-button-prev-popular-courses",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      },
    },
  });
  const swiperFreeCourses = new Swiper(".swiper-free-courses", {
    loop: true,
    spaceBetween: 20,
    speed: 800,
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination-free-courses",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-free-courses",
      prevEl: ".swiper-button-prev-free-courses",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      },
    },
  });
});

new WOW().init();
