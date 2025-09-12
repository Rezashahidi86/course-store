import * as helper from "./helper.js"

const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const titleElem = document.querySelector("#title");

const modalBarsHandeler = () => {
  if (modalBars.className.includes("right-0")) {
    modalBars.classList.remove("right-0");
    modalBars.classList.add("right-[-270px]");
    closeModalBars.classList.remove("right-[270px]");
    closeModalBars.classList.add("right-[700px]");
  } else {
    modalBars.classList.add("right-0");
    modalBars.classList.remove("right-[-270px]");
    closeModalBars.classList.add("right-[270px]");
    closeModalBars.classList.remove("right-[700px]");
  }
};

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

helper.closeModalBars.addEventListener("click", helper.modalBarsHandeler);
openModalBtnBars.addEventListener("click", helper.modalBarsHandeler);
window.addEventListener("load", typeWriteTitle);

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
