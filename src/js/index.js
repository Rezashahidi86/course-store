const swiperLastCourses = new Swiper(".swiper-last-courses", {
  speed: 800,
  slidesPerView: 4,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination-last-courses",
    clickable: true,
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
