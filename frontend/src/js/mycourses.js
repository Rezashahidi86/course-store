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
  showInfoBasket,
  showCourseBasket,
  deleteCourseFromBasket,
  rigesterToCourses,
  checkCodeOff,
} from "./helper.js";
const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const coursesContainer = document.querySelector("#courses-container");
const showbasketBtns = document.querySelectorAll(".show-basket-btn");
const closeBasket = document.querySelector("#close-basket");
let openModalFastBtn = document.querySelector("#open-modal-fast");
let closeMenuFastBtn = document.querySelector("#close-menu-fast");
const menuFast = document.querySelector("#menu-fast");
const itemFastMenu = document.querySelectorAll("ul li");
const pageContainer = document.querySelector("#page-container");
let mode = "home";

const showFastMenu = () => {
  menuFast.classList.add("max-lg:-right-[0px]");
  menuFast.classList.remove("max-lg:-right-[320px]");
  closeMenuFastBtn.classList.remove("hidden");
};

const closeFastMenu = () => {
  menuFast.classList.remove("max-lg:-right-[0px]");
  menuFast.classList.add("max-lg:-right-[320px]");
  closeMenuFastBtn.classList.add("hidden");
};

const showPartMenu = (event) => {
  let newMode;
  if (event.target.dataset.mode) {
    newMode = event.target.dataset.mode;
  } else {
    newMode = event.target.parentElement.dataset.mode;
  }
  closeFastMenu();
  if (mode != newMode) {
    mode = newMode;
    const oldMode = document.querySelector(".now-mode");
    oldMode.classList.remove(
      "text-button1",
      "after:absolute",
      "after:bg-button1",
      "after:h-full",
      "after:w-1",
      "after:-right-5",
      "now-mode"
    );
    oldMode.classList.add(
      "text-text",
      "dark:text-text-dark",
      "hover:text-button1"
    );
    const newModeUser = document.querySelector(`li[data-mode=${newMode}]`);
    newModeUser.classList.add(
      "text-button1",
      "after:absolute",
      "after:bg-button1",
      "after:h-full",
      "after:w-1",
      "after:-right-5",
      "now-mode"
    );
    newModeUser.classList.remove(
      "text-text",
      "dark:text-text-dark",
      "hover:text-button1"
    );
    pageContainer.innerHTML = "";
    switch (mode) {
      case "home": {
        pageContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div
          class="flex items-center justify-between flex-wrap bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart gap-4"
        >
          <div class="lg:hidden cursor-pointer" id="open-modal-fast">
            <i
              class="fa fa-bars text-4xl text-background-dark dark:text-background"
            ></i>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-book-bookmark text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-mycourses"></span>
              <span class="text-sm">دوره های من</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-question-circle text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg">12 سوال</span>
              <span class="text-sm">پرسش و پاسخ</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-envelope text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg">12 تیکت</span>
              <span class="text-sm">تیکت ها</span>
            </div>
          </div>
        </div>
        <!-- Start Courses -->
        <div
          class="bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8"
        >
          <div class="flex text-center justify-between">
            <span class="text-title dark:text-title-dark">آخرین دوره ها</span>
            <a
              class="bg-background dark:bg-background-dark px-4 py-2 rounded-sm text-text dark:text-text-dark"
            >
              <i class="fa fa-arrow-left text-sm"></i>
            </a>
          </div>
          <div>
            <div
              class="grid grid-cols-4 max-sm:grid-cols-2 mt-4 gap-4"
              id="courses-container"
            >
              <!-- Date Loaded From JS -->
            </div>
          </div>
        </div>
        <!-- Finish Courses -->
        <div class="flex gap-4 max-sm:flex-col">
          <div
            class="w-full bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8"
          >
            <div>
              <div>
                <div class="flex text-center justify-between">
                  <span class="text-title dark:text-title-dark">تیکت ها</span>
                  <a
                    class="bg-background dark:bg-background-dark px-4 py-2 rounded-sm text-text dark:text-text-dark"
                  >
                    <i class="fa fa-arrow-left text-sm"></i>
                  </a>
                </div>
              </div>
              <div>
                <div
                  class="rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-4 flex items-center justify-between"
                >
                  <div class="flex flex-col gap-4 w-2/3">
                    <span
                      class="text-sm text-title dark:text-title-dark line-clamp-1"
                      >Lorem ipsum dolor
                    </span>
                    <div class="text-text dark:text-text-dark">
                      <i class="fa fa-file-alt"></i>
                      <span class="text-sm">دپارتمان :</span>
                      <span>پشتیبانی</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end">
                    <button
                      class="text-sm text-text dark:text-text-dark cursor-pointer"
                    >
                      <span>مشاهده</span>
                      <i class="fa fa-arrow-left"></i>
                    </button>
                    <div
                      class="bg-button2 dark:bg-header text-background p-2 rounded-md text-[0.6rem] mt-4"
                    >
                      <span>پاسخ داده شده</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-full bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8"
          >
            <div>
              <div>
                <div class="flex text-center justify-between">
                  <span class="text-title dark:text-title-dark"
                    >پرسش و پاسخ</span
                  >
                  <a
                    class="bg-background dark:bg-background-dark px-4 py-2 rounded-sm text-text dark:text-text-dark"
                  >
                    <i class="fa fa-arrow-left text-sm"></i>
                  </a>
                </div>
              </div>
              <div>
                <div
                  class="rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-4 flex items-center justify-between"
                >
                  <div class="flex flex-col gap-4 w-2/3">
                    <span
                      class="text-sm text-title dark:text-title-dark line-clamp-1"
                      >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aperiam praesentium labore harum.</span
                    >
                    <div class="text-text dark:text-text-dark">
                      <i class="fa fa-file-alt"></i>
                      <span class="text-sm">دپارتمان :</span>
                      <span>پشتیبانی</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end">
                    <button
                      class="text-sm text-text dark:text-text-dark cursor-pointer"
                    >
                      <span>مشاهده</span>
                      <i class="fa fa-arrow-left"></i>
                    </button>
                    <div
                      class="bg-button2 dark:bg-header text-background p-2 rounded-md text-[0.6rem] mt-4"
                    >
                      <span>پاسخ داده شده</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          `
        );
        const coursesContainer = document.querySelector("#courses-container");
        getCourses(coursesContainer, "lastMyCourses");
        break;
      }
      case "mycourses": {
        pageContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div
          class="flex items-center justify-between flex-wrap bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart gap-4"
        >
          <div class="lg:hidden cursor-pointer" id="open-modal-fast">
            <i
              class="fa fa-bars text-4xl text-background-dark dark:text-background"
            ></i>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-book-bookmark text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-mycourses"></span>
              <span class="text-sm">دوره های من</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-question-circle text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg">12 سوال</span>
              <span class="text-sm">پرسش و پاسخ</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-envelope text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg">12 تیکت</span>
              <span class="text-sm">تیکت ها</span>
            </div>
          </div>
        </div>
        <!-- Start Courses -->
        <div
          class="bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8"
        >
          <div class="flex text-center justify-between">
            <span class="text-title dark:text-title-dark">همه دورها</span>
          </div>
          <div>
            <div
              class="grid grid-cols-4 max-sm:grid-cols-2 mt-4 gap-4"
              id="courses-container"
            >
              <!-- Date Loaded From JS -->
            </div>
          </div>
        </div>
        <!-- Finish Courses -->
        `
        );
        const coursesContainer = document.querySelector("#courses-container");
        getCourses(coursesContainer, "myCourses");
        break;
      }
    }
    openModalFastBtn = document.querySelector("#open-modal-fast");
    closeMenuFastBtn = document.querySelector("#close-menu-fast");
    openModalFastBtn.addEventListener("click", showFastMenu);
    closeMenuFastBtn.addEventListener("click", closeFastMenu);
  }
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
showbasketBtns.forEach((showbasketBtn) => {
  showbasketBtn.addEventListener("click", showInfoBasket);
});
closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
backModalInfoAccount.addEventListener("click", hideModalInfoAccount);
closeBasket.addEventListener("click", showInfoBasket);
openModalFastBtn.addEventListener("click", showFastMenu);
closeMenuFastBtn.addEventListener("click", closeFastMenu);
itemFastMenu.forEach((item) => {
  item.addEventListener("click", showPartMenu);
});

window.checkCodeOff = checkCodeOff;
window.rigesterToCourses = rigesterToCourses;
window.deleteCourseFromBasket = deleteCourseFromBasket;
window.addEventListener("load", () => {
  getThemeFromLocalStorage("text-dark");
  getUser(true);
  getNavbar();
  getCourses(coursesContainer, "lastMyCourses");
  showCourseBasket();
});
