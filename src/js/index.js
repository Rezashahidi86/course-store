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
} from "./helper.js";

const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const titleElem = document.querySelector("#title");
const lastCourses = document.querySelector(".last-courses")
const popularCourses = document.querySelector(".popular-courses")
const freeCourses = document.querySelector(".free-courses")


const typeWriteTitle = () => {
  const text = "آماده برای یادگیری ترید از صفر هستی؟";
  let indexText = 0;
  const timer = setInterval(() => {
    titleElem.innerHTML += text[indexText];
    indexText++;
    if (indexText >= text.length) {
      clearInterval(timer);
    }
  }, 100);
};

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

window.addEventListener("load", () => {
  typeWriteTitle();
  getThemeFromLocalStorage("background");
  getUser(false);
  getCourses(lastCourses,"lastCourses")
  getCourses(popularCourses,"popularCourses")
  getCourses(freeCourses,"freeCourses")
  getNavbar()

});

new WOW().init();

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
