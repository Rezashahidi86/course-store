import {
  closeModalBars,
  modalBarsHandeler,
  backModalInfoAccount,
  hideModalInfoAccount,
  iconThemeChange,
  darkOrLight,
  getThemeFromLocalStorage,
  themeChangeBtns,
  getUser,
  getNavbar,
  getCourses,
  showCourses,
  getValueFromUrl,
  showSearchGlobal,
} from "./helper.js";
const nameCategotyCourse = document.querySelector("#name-categoty-course");
const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const coursesContainer = document.querySelector("#courses-container");
const filterModeBtns = document.querySelectorAll(".filter-mode-btn");
const filterJustBtns = document.querySelectorAll(".filter-just-btn");
const searchGlobalBtn = document.querySelector("#search-global-btn");
const searchInput = document.querySelector("#search-input");
const countCourses = document.querySelector("#count-courses");
let categoryCourses;
let filters = {
  mode: "همه دوره ها",
  freeCourses: "off",
  notIsCompeleCourses: "off",
  oldCourses: "off",
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

const largeToSmallOrSmallToLarge = (
  copyCategoryCourses,
  mathematicalSymbol,
  registers = false
) => {
  const courseSort = [];
  for (let i = 0; courseSort.length < copyCategoryCourses.length + 3; i++) {
    let sheapeCours = copyCategoryCourses[0];
    let indexCourse = 0;
    copyCategoryCourses.forEach((course, index) => {
      if (registers) {
        if (sheapeCours.registers < course.registers) {
          sheapeCours = course;
          indexCourse = index;
        }
      } else {
        if (mathematicalSymbol === "small") {
          if (sheapeCours.price > course.price) {
            sheapeCours = course;
            indexCourse = index;
          }
        } else {
          if (sheapeCours.price < course.price) {
            sheapeCours = course;
            indexCourse = index;
          }
        }
      }
    });
    copyCategoryCourses.splice(indexCourse, 1);
    courseSort.push(sheapeCours);
  }
  return courseSort;
};

const showCoursesByFilter = (filters) => {
  let copyCategoryCourses = [...categoryCourses];
  if (filters.freeCourses === "on") {
    copyCategoryCourses = copyCategoryCourses.filter((copyCategoryCours) => {
      return copyCategoryCours.price === 0;
    });
  }
  if (filters.notIsCompeleCourses === "on") {
    copyCategoryCourses = copyCategoryCourses.filter((copyCategoryCours) => {
      return copyCategoryCours.isComplete === 0;
    });
  }
  if (filters.oldCourses === "on") {
    copyCategoryCourses.reverse();
  }
  if (searchInput.value != "") {
    copyCategoryCourses = copyCategoryCourses.filter((copyCategoryCours) => {
      return copyCategoryCours.name.includes(searchInput.value);
    });
  }
  switch (filters.mode) {
    case "همه دور ها":
      copyCategoryCourses = [...categoryCourses];
      break;
    case "ارزان ترین":
      copyCategoryCourses = largeToSmallOrSmallToLarge(
        copyCategoryCourses,
        "small"
      );
      break;
    case "گران ترین":
      copyCategoryCourses = largeToSmallOrSmallToLarge(
        copyCategoryCourses,
        "large"
      );
      break;
    case "پر مخاطب ها":
      copyCategoryCourses = largeToSmallOrSmallToLarge(
        copyCategoryCourses,
        "large",
        true
      );
      break;
  }
  countCourses.innerHTML = copyCategoryCourses.length + " دوره آموزشی";
  const filterCourses = copyCategoryCourses.filter((course) => {
    return course != undefined
  });
  showCourses(coursesContainer, filterCourses);
};

filterModeBtns.forEach((filterModeBtn) => {
  filterModeBtn.addEventListener("click", (event) => {
    const afterFilters = document.querySelector(".after-before-filter");
    afterFilters.classList.remove("after-before-filter");
    event.target.classList.add("after-before-filter");
    filters.mode = event.target.innerHTML;
    showCoursesByFilter(filters);
  });
});
filterJustBtns.forEach((filterJustBtn) => {
  filterJustBtn.addEventListener("click", (event) => {
    if (event.target.className.includes("off-just-filter")) {
      event.target.classList.remove("off-just-filter");
      event.target.classList.add("on-just-filter");
      filters[event.target.dataset.value] = "on";
    } else {
      event.target.classList.remove("on-just-filter");
      event.target.classList.add("off-just-filter");
      filters[event.target.dataset.value] = "off";
    }
    showCoursesByFilter(filters);
  });
});

closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
backModalInfoAccount.addEventListener("click", hideModalInfoAccount);
searchGlobalBtn.addEventListener("click", showSearchGlobal);
searchInput.addEventListener("input", () => {
  showCoursesByFilter(filters);
});

window.addEventListener("load", async () => {
  getThemeFromLocalStorage("text-dark");
  getUser(true);
  getNavbar();
  const categoryCours = await getCourses(coursesContainer, "category");
  categoryCourses = [...categoryCours];
});
