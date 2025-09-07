const swiperLastCourses = new Swiper(".swiper-last-courses", {
  loop:true,
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
  loop:true,
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
