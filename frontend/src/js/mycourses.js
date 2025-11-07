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
  baseUrl,
  getFromLocalStorage,
  showToastBox,
  logoutuser,
  changeDate,
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
let infoUser;
let mode = "home";
let departmentSubID;
let departmentID;
let typeImportTicket;
let courseIDForTicket;
let countTicketForHeader = 0;
let countQestionsForHeader = 0;

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

const showInfoUserInFastMenu = () => {
  const usernameElem = document.querySelector("#username-elem");
  const phoneElem = document.querySelector("#phone-elem");
  const calenderElem = document.querySelector("#calender-elem");
  const dateMiladi = new Date();
  const nowDateShamsi = changeDate(
    dateMiladi.getFullYear(),
    dateMiladi.getMonth() + 1,
    dateMiladi.getDay()
  ).join("/");
  usernameElem.innerHTML = infoUser.username;
  phoneElem.innerHTML = infoUser.phone;
  calenderElem.innerHTML = nowDateShamsi;
};

const showPartMenu = (event) => {
  let newMode;
  if (event.target.dataset.mode) {
    newMode = event.target.dataset.mode;
  } else if (event.target.parentElement.dataset.mode) {
    newMode = event.target.parentElement.dataset.mode;
  } else {
    newMode = event.target.parentElement.parentElement.dataset.mode;
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
    departmentSubID = null;
    departmentID = null;
    typeImportTicket = null;
    courseIDForTicket = null;
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
              <span class="text-lg" id="count-qestions-header"></span>
              <span class="text-sm">پرسش و پاسخ</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-envelope text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-tickets-header"></span
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
            class="w-full bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8 h-max"
          >
            <div>
              <div>
                <div class="flex text-center justify-between">
                  <span class="text-title dark:text-title-dark">پرسش و پاسخ</span>
                  <button
                    class="bg-background dark:bg-background-dark px-4 py-2 rounded-sm text-text dark:text-text-dark"
                    onclick="showAllTicket()"
                  >
                    <i class="fa fa-arrow-left text-sm"></i>
                  </button>
                </div>
              </div>
              <div id="qestions-container"></div>
            </div>
          </div>
          <div
            class="w-full bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8 h-max"
          >
            <div>
              <div>
                <div class="flex text-center justify-between">
                  <span class="text-title dark:text-title-dark">تیکت ها</span>
                  <button
                    class="bg-background dark:bg-background-dark px-4 py-2 rounded-sm text-text dark:text-text-dark"
                    onclick="showAllTicket()"
                  >
                    <i class="fa fa-arrow-left text-sm"></i>
                  </button>
                </div>
              </div>
              <div id="tickets-container"></div>
            </div>
          </div>
        </div>
          `
        );
        const coursesContainer = document.querySelector("#courses-container");
        getCourses(coursesContainer, "lastMyCourses");
        getAndShowInhomeUserTickets();
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
              <span class="text-lg" id="count-qestions-header"></span>
              <span class="text-sm">پرسش و پاسخ</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-envelope text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-tickets-header"></span
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
      case "support": {
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
              class="fa fa-question-circle text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-qestions-header"></span>
              <span class="text-sm">پرسش و پاسخ</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-envelope text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-tickets-header"></span
              <span class="text-sm">تیکت ها</span>
            </div>
          </div>
        </div>
        <!-- Start Add Ticket -->
        <div
          class="bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8"
        >
          <div class="flex text-center items-center justify-between">
            <span class="text-title dark:text-title-dark">ارسال تیکت</span>
            <button
              class="bg-background dark:bg-background-dark px-4 py-2 rounded-sm text-text dark:text-text-dark cursor-pointer"
              onclick="showAllTicket()"
            >
              همه تیکت ها
            </button>
          </div>
          <form action="">
            <div>
              <div
                class="grid grid-cols-2 gap-4 max-sm:grid-cols-1"
                id="add-ticket-container"
              >
                <div class="mt-4 col-span-1 flex flex-col gap-8">
                  <input
                    type="text"
                    placeholder="عنوان تیکت..."
                    id="title-ticket"
                    class="border-2 p-2 border-text-dark dark:border-text rounded-md text-text dark:text-text-dark outline-none"
                  />
                  <select
                    name=""
                    id="departments"
                    class="text-text dark:text-text-dark rounded-md border-2 border-text-dark dark:border-text p-2 outline-none"
                  >
                    <option value="0" disabled selected>
                      دپارتمان را انتخاب کنید
                    </option>
                  </select>
                </div>
                <div class="mt-4 col-span-1 flex flex-col gap-8">
                  <select
                    name=""
                    id="type-departments"
                    class="text-text dark:text-text-dark rounded-md border-2 border-text-dark dark:border-text p-2 outline-none"
                  >
                    <option value="0" disabled selected>
                      نوع تیکت را انتخاب کنید
                    </option>
                  </select>
                  <select
                    name=""
                    id="import-ticket"
                    class="text-text dark:text-text-dark rounded-md border-2 border-text-dark dark:border-text p-2 outline-none"
                  >
                    <option value="0" disabled selected>
                      الویت تیکت را انتخاب کنید
                    </option>
                    <option value="3">کم</option>
                    <option value="2">متوسط</option>
                    <option value="1">بالا</option>
                  </select>
                </div>
              </div>
              <textarea
                name=""
                id="text-ticket"
                class="w-full mt-8 border-2 border-button2 dark:border-header p-3 text-text dark:text-text-dark rounded-md h-40 outline-none"
                placeholder="محتوای تیکت را وارد کنید..."
              ></textarea>
              <button
                class="flex bg-button2 dark:bg-header hover:bg-blue-600 dark:hover:bg-blue-900 duration-200 text-background p-3 mt-4 rounded-md outline-none"
                type="submit"
                id="add-tickets-btn"
              >
                <span>ارسال تیکت</span>
              </button>
            </div>
          </form>
        </div>
        <!-- Finish Add Ticket -->
          `
        );
        showDepartments();
        const importTicketSelect = document.querySelector("#import-ticket");
        importTicketSelect.addEventListener(
          "change",
          (event) => (typeImportTicket = event.target.value)
        );
        const addTicketsBtn = document.querySelector("#add-tickets-btn");
        addTicketsBtn.addEventListener("click", addTicketsAndQestions);
        break;
      }
      case "qestions": {
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
              class="fa fa-question-circle text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-qestions-header"></span>
              <span class="text-sm">پرسش و پاسخ</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-envelope text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-tickets-header"></span
              <span class="text-sm">تیکت ها</span>
            </div>
          </div>
        </div>
        <!-- Start Add Ticket -->
        <div
          class="bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8"
        >
          <div class="flex text-center items-center justify-between">
            <span class="text-title dark:text-title-dark">ارسال تیکت</span>
            <button
              class="bg-background dark:bg-background-dark px-4 py-2 rounded-sm text-text dark:text-text-dark cursor-pointer"
              onclick="showAllTicket()"
            >
              همه تیکت ها
            </button>
          </div>
          <form action="">
            <div>
              <div
                class="grid grid-cols-2 gap-4 max-sm:grid-cols-1"
                id="add-ticket-container"
              >
                <div class="mt-4 col-span-1 flex flex-col gap-8">
                  <input
                    type="text"
                    placeholder="عنوان تیکت..."
                    id="title-ticket"
                    class="border-2 p-2 border-text-dark dark:border-text rounded-md text-text dark:text-text-dark outline-none"
                  />
                  <select
                    name=""
                    id="departments"
                    class="text-text dark:text-text-dark rounded-md border-2 border-text-dark dark:border-text p-2 outline-none"
                  >
                    <option value="0" disabled selected>
                      دپارتمان را انتخاب کنید
                    </option>
                  </select>
                  <select
                    name=""
                    id="course-ticket"
                    class="text-text dark:text-text-dark rounded-md border-2 border-text-dark dark:border-text p-2 outline-none"
                  >
                    <option value="0" disabled selected>
                      دوره مورد نظر را انتخاب کنید
                    </option>
                  </select>
                </div>
                <div class="mt-4 col-span-1 flex flex-col gap-8">
                  <select
                    name=""
                    id="type-departments"
                    class="text-text dark:text-text-dark rounded-md border-2 border-text-dark dark:border-text p-2 outline-none"
                  >
                    <option value="0" disabled selected>
                      نوع تیکت را انتخاب کنید
                    </option>
                  </select>
                  <select
                    name=""
                    id="import-ticket"
                    class="text-text dark:text-text-dark rounded-md border-2 border-text-dark dark:border-text p-2 outline-none"
                  >
                    <option value="0" disabled selected>
                      الویت تیکت را انتخاب کنید
                    </option>
                    <option value="3">کم</option>
                    <option value="2">متوسط</option>
                    <option value="1">بالا</option>
                  </select>
                </div>
              </div>
              <textarea
                name=""
                id="text-ticket"
                class="w-full mt-8 border-2 border-button2 dark:border-header p-3 text-text dark:text-text-dark rounded-md h-40 outline-none"
                placeholder="محتوای تیکت را وارد کنید..."
              ></textarea>
              <button
                class="flex bg-button2 dark:bg-header hover:bg-blue-600 dark:hover:bg-blue-900 duration-200 text-background p-3 mt-4 rounded-md outline-none"
                type="submit"
                id="add-tickets-btn"
              >
                <span>ارسال تیکت</span>
              </button>
            </div>
          </form>
        </div>
        <!-- Finish Add Ticket -->
          `
        );
        showDepartments();
        const importTicketSelect = document.querySelector("#import-ticket");
        importTicketSelect.addEventListener(
          "change",
          (event) => (typeImportTicket = event.target.value)
        );
        const addTicketsBtn = document.querySelector("#add-tickets-btn");
        addTicketsBtn.addEventListener("click", addTicketsAndQestions);
        break;
      }
      case "setting": {
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
              class="fa fa-question-circle text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-qestions-header"></span>
              <span class="text-sm">پرسش و پاسخ</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-envelope text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-tickets-header"></span>
              <span class="text-sm">تیکت ها</span>
            </div>
          </div>
        </div>
        <div class="flex gap-4 max-sm:flex-col">
          <div
            class="w-full bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8"
          >
            <form action="#" class="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              <div class="col-span-1 flex flex-col gap-4">
                <input
                  type="text"
                  id="name-user-input"
                  placeholder="نام و نام خانوادگی..."
                  class="p-3 border-2 border-button2 dark:border-header outline-none text-text dark:text-text-dark w-full rounded-md"
                />
                <input
                  type="text"
                  id="email-user-email"
                  placeholder="ایمیل..."
                  class="p-3 border-2 border-button2 dark:border-header outline-none text-text dark:text-text-dark w-full rounded-md"
                />
                <input
                  type="text"
                  id="password-user-input"
                  placeholder="******"
                  class="p-3 border-2 border-button2 dark:border-header outline-none text-text dark:text-text-dark w-full rounded-md"
                />
              </div>
              <div class="col-span-1 flex flex-col gap-4">
                <input
                  type="text"
                  id="username_user-input"
                  placeholder="نام کاربری.."
                  class="p-3 border-2 border-button2 dark:border-header outline-none text-text dark:text-text-dark w-full rounded-md"
                />
                <input
                  type="number"
                  id="phone-user-input"
                  placeholder="شماره تلفن..."
                  class="p-3 border-2 border-button2 dark:border-header outline-none text-text dark:text-text-dark w-full rounded-md"
                />
              </div>
              <div class="flex bg-button2 dark:bg-header hover:bg-blue-600 dark:hover:bg-blue-900 duration-200 text-background p-3 mt-4 rounded-md outline-none w-max cursor-pointer" id="update-user-btn">
                <button>تغییر اطلاعات</button>
              </div>
            </form>
          </div>
        </div>
          `
        );
        const updateUserBtn = document.querySelector("#update-user-btn");
        updateUserBtn.addEventListener("click", updateUserInfo);
        showInfoUserInInputs();
        break;
      }
      case "logout": {
        logoutuser();
        location.href = "/frontend/index.html";
        break;
      }
    }
    const countQestionsHeader = document.querySelector(
      "#count-qestions-header"
    );
    const countTicketsHeader = document.querySelector("#count-tickets-header");
    countQestionsHeader.innerHTML = `${countQestionsForHeader} پرسش و پاسخ`;
    countTicketsHeader.innerHTML = `${countTicketForHeader} تیکت`;
    openModalFastBtn = document.querySelector("#open-modal-fast");
    closeMenuFastBtn = document.querySelector("#close-menu-fast");
    openModalFastBtn.addEventListener("click", showFastMenu);
    closeMenuFastBtn.addEventListener("click", closeFastMenu);
  }
};

const getAndShowInhomeUserTickets = async () => {
  const res = await fetch(`${baseUrl}/tickets/user`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const tickets = await res.json();
  console.log(tickets);
  const ticketsContainer = document.querySelector("#tickets-container");
  const qestionsContainer = document.querySelector("#qestions-container");
  let handelCountTicketQestions = 0;
  let handelCountTicketTickets = 0;
  countQestionsForHeader = 0;
  countTicketForHeader = 0;
  tickets.forEach((ticket) => {
    if (ticket.course === "634e6b0e1d5142b91afa9bb3") {
      countTicketForHeader += 1;
      if (handelCountTicketQestions < 3) {
        handelCountTicketQestions += 1;
        ticketsContainer.insertAdjacentHTML(
          "beforeend",
          `
                <div
                  class="rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-4 flex items-center justify-between"
                >
                  <div class="flex flex-col gap-4 w-2/3">
                    <span
                      class="text-sm text-title dark:text-title-dark line-clamp-1"
                      >${ticket.title}</span
                    >
                    <div class="text-text dark:text-text-dark">
                      <i class="fa fa-file-alt"></i>
                      <span class="text-sm">دپارتمان :</span>
                      <span>${ticket.departmentID}</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end">
                    <button
                      class="text-sm text-text dark:text-text-dark cursor-pointer"
                      onclick="showChatBoxTicket('${ticket._id}')"
                    >
                      <span>مشاهده</span>
                      <i class="fa fa-arrow-left"></i>
                    </button>
                    <div
                      class="${
                        ticket.answer ? "bg-green-600" : "bg-yellow-500"
                      } text-background p-2 rounded-md text-[0.6rem] mt-4"
                    >
                      <span>${
                        ticket.answer ? "پاسخ داده شده" : "در انتظار پاسخ"
                      }</span>
                    </div>
                  </div>
                </div>
        `
        );
      }
    } else {
      countQestionsForHeader += 1;
      if (handelCountTicketTickets < 3) {
        handelCountTicketTickets += 1;
        qestionsContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div
          class="rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-4 flex items-center justify-between"
        >
          <div class="flex flex-col gap-4 w-2/3">
            <span
              class="text-sm text-title dark:text-title-dark line-clamp-1"
              >${ticket.title}</span
            >
            <div class="text-text dark:text-text-dark">
              <i class="fa fa-file-alt"></i>
              <span class="text-sm">دپارتمان :</span>
              <span>${ticket.departmentID}</span>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <button
              class="text-sm text-text dark:text-text-dark cursor-pointer"
              onclick="showChatBoxTicket('${ticket._id}')"
            >
              <span>مشاهده</span>
              <i class="fa fa-arrow-left"></i>
            </button>
            <div
              class="${
                ticket.answer ? "bg-green-600" : "bg-yellow-500"
              } text-background p-2 rounded-md text-[0.6rem] mt-4"
            >
              <span>${ticket.answer ? "پاسخ داده شده" : "در انتظار پاسخ"}</span>
            </div>
          </div>
        </div>
        `
        );
      }
    }
  });
  const countQestionsHeader = document.querySelector("#count-qestions-header");
  const countTicketsHeader = document.querySelector("#count-tickets-header");
  countQestionsHeader.innerHTML = `${countQestionsForHeader} پرسش و پاسخ`;
  countTicketsHeader.innerHTML = `${countTicketForHeader} تیکت`;
};

const showDepartments = async () => {
  const departmentsSelect = document.querySelector("#departments");
  const courseTicketSelect = document.querySelector("#course-ticket");
  if (courseTicketSelect) {
    const res = await fetch(`${baseUrl}/users/courses`, {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
      },
    });
    const infoUserCourses = await res.json();
    console.log(infoUserCourses);
    infoUserCourses.forEach((infoCourse) => {
      courseTicketSelect.insertAdjacentHTML(
        "beforeend",
        `
    <option value="${infoCourse.course._id}">
      ${infoCourse.course.name}
    </option>
      `
      );
    });
    courseTicketSelect.addEventListener(
      "change",
      (event) => (courseIDForTicket = event.target.value)
    );
    const responce = await fetch(`${baseUrl}/tickets/departments`);
    const departments = await responce.json();
    departmentsSelect.innerHTML = "";
    departmentsSelect.insertAdjacentHTML(
      "beforeend",
      `
    <option value="0" disabled selected>
      دپارتمان را انتخاب کنید
    </option>
    `
    );
    departments.slice(0, 2).forEach((department) => {
      departmentsSelect.insertAdjacentHTML(
        "beforeend",
        `
      <option value="${department._id}">${department.title}</option>
      `
      );
    });
    departmentsSelect.addEventListener("change", showSubDeparments);
  } else {
    const res = await fetch(`${baseUrl}/tickets/departments`);
    const departments = await res.json();
    departmentsSelect.innerHTML = "";
    departmentsSelect.insertAdjacentHTML(
      "beforeend",
      `
    <option value="0" disabled selected>
      دپارتمان را انتخاب کنید
    </option>
    `
    );
    departments.forEach((department) => {
      departmentsSelect.insertAdjacentHTML(
        "beforeend",
        `
      <option value="${department._id}">${department.title}</option>
      `
      );
    });
    departmentsSelect.addEventListener("change", showSubDeparments);
  }
};

const showSubDeparments = async (event) => {
  departmentID = event.target.value;
  const subDeparmentsID = event.target.value;
  const res = await fetch(
    `${baseUrl}/tickets/departments-subs/${subDeparmentsID}`
  );
  const subDeparments = await res.json();
  const typeDepartmentsSelect = document.querySelector("#type-departments");
  typeDepartmentsSelect.innerHTML = "";
  typeDepartmentsSelect.insertAdjacentHTML(
    "beforeend",
    `
    <option value="0" disabled selected>
      نوع تیکت را انتخاب کنید
    </option>
    `
  );
  subDeparments.forEach((subDeparment) => {
    typeDepartmentsSelect.insertAdjacentHTML(
      "beforeend",
      `
    <option value="${subDeparment._id}">${subDeparment.title}</option>
    `
    );
  });
  typeDepartmentsSelect.addEventListener("change", (event) => {
    departmentSubID = event.target.value;
  });
};

const addTicketsAndQestions = async (event) => {
  event.preventDefault();
  const titleTicketInput = document.querySelector("#title-ticket");
  const textTicketInput = document.querySelector("#text-ticket");
  const courseTicketSelect = document.querySelector("#course-ticket");
  if (courseTicketSelect) {
    if (
      titleTicketInput.value.trim() &&
      textTicketInput.value.trim() &&
      departmentSubID &&
      departmentID &&
      typeImportTicket &&
      courseIDForTicket
    ) {
      const infoTicket = {
        departmentID,
        departmentSubID,
        title: titleTicketInput.value.trim(),
        priority: typeImportTicket,
        body: textTicketInput.value.trim(),
        course: courseIDForTicket,
      };
      const res = await fetch(`${baseUrl}/tickets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoTicket),
      });
      if (res.ok) {
        showToastBox("تیکت شما با موفقیت ارسال شد", "successful");
        const countQestionsHeader = document.querySelector(
          "#count-qestions-header"
        );
        countQestionsForHeader += 1;
        countQestionsHeader.innerHTML = `${countQestionsForHeader} پرسش و پاسخ`;
      } else {
        showToastBox("خطای نا شناخته ای رخ داد", "failed");
      }
    } else {
      showToastBox("تمامی اطلاعات را وارد کنید", "failed");
    }
  } else {
    if (
      titleTicketInput.value.trim() &&
      textTicketInput.value.trim() &&
      departmentSubID &&
      departmentID &&
      typeImportTicket
    ) {
      const infoTicket = {
        departmentID,
        departmentSubID,
        title: titleTicketInput.value.trim(),
        priority: typeImportTicket,
        body: textTicketInput.value.trim(),
      };
      const res = await fetch(`${baseUrl}/tickets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoTicket),
      });
      const resss = await res.json();
      console.log(resss);
      if (res.ok) {
        showToastBox("تیکت شما با موفقیت ارسال شد", "successful");
        const countTicketsHeader = document.querySelector(
          "#count-tickets-header"
        );
        countTicketForHeader += 1;
        countTicketsHeader.innerHTML = `${countTicketForHeader} تیکت`;
      } else {
        showToastBox("خطای نا شناخته ای رخ داد", "failed");
      }
    } else {
      showToastBox("تمامی اطلاعات را وارد کنید", "failed");
    }
  }
};

const showAllTicket = async () => {
  mode = "";
  const res = await fetch(`${baseUrl}/tickets/user`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const tickets = await res.json();
  console.log(tickets);
  pageContainer.innerHTML = "";
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
              class="fa fa-question-circle text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-qestions-header"></span>
              <span class="text-sm">پرسش و پاسخ</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-envelope text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-tickets-header"></span
              <span class="text-sm">تیکت ها</span>
            </div>
          </div>
        </div>
        <!-- Start Courses -->
        <div
          class="bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8"
        >
          <div class="flex text-center justify-between">
            <span class="text-title dark:text-title-dark">همه تیکت ها</span>
          </div>
          <div>
            <div
              class="mt-4 flex-col flex gap-2"
              id="tickets-container"
            >
              <!-- Date Loaded From JS -->
            </div>
          </div>
        </div>
        <!-- Finish Courses -->
      `
  );
  const countQestionsHeader = document.querySelector("#count-qestions-header");
  const countTicketsHeader = document.querySelector("#count-tickets-header");
  countQestionsHeader.innerHTML = `${countQestionsForHeader} پرسش و پاسخ`;
  countTicketsHeader.innerHTML = `${countTicketForHeader} تیکت`;
  const ticketsContainer = document.querySelector("#tickets-container");
  tickets.forEach((ticket) => {
    ticketsContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div
          class="rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-4 flex items-center justify-between"
        >
          <div class="flex flex-col gap-4 w-2/3">
            <span
              class="text-sm text-title dark:text-title-dark line-clamp-1"
              >${ticket.title}</span
            >
            <div class="text-text dark:text-text-dark">
              <i class="fa fa-file-alt"></i>
              <span class="text-sm">دپارتمان :</span>
              <span>${ticket.departmentID}</span>
              <span class="block">${ticket.departmentSubID}</span>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <button
              class="text-sm text-text dark:text-text-dark cursor-pointer"
              onclick="showChatBoxTicket('${ticket._id}')"
            >
              <span>مشاهده</span>
              <i class="fa fa-arrow-left"></i>
            </button>
            <div
              class="${
                ticket.answer ? "bg-green-600" : "bg-yellow-500"
              } text-background p-2 rounded-md text-[0.6rem] mt-4"
            >
              <span>${ticket.answer ? "پاسخ داده شده" : "در انتظار پاسخ"}</span>
            </div>
          </div>
        </div>
      `
    );
  });
};

const showChatBoxTicket = async (ticketID) => {
  const res = await fetch(`${baseUrl}/tickets/answer/${ticketID}`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const answer = await res.json();
  mode = ""
  pageContainer.innerHTML = "";
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
              class="fa fa-question-circle text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-qestions-header"></span>
              <span class="text-sm">پرسش و پاسخ</span>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <i
              class="fa fa-envelope text-4xl text-text-dark dark:text-text"
            ></i>
            <div class="flex flex-col text-text dark:text-text-dark">
              <span class="text-lg" id="count-tickets-header"></span
              <span class="text-sm">تیکت ها</span>
            </div>
          </div>
        </div>
        <!-- Start Courses -->
        <div
          class="bg-cart/50 dark:bg-cart-dark/50 rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-8"
        >
          <div class="flex text-center justify-between">
            <span class="text-title dark:text-title-dark">همه تیکت ها</span>
          </div>
          <div>
            <div
              class="mt-4 flex-col flex gap-2"
              id="tickets-container"
            >
              <!-- Date Loaded From JS -->
            </div>
          </div>
        </div>
        <!-- Finish Courses -->
      `
  );
  const countQestionsHeader = document.querySelector("#count-qestions-header");
  const countTicketsHeader = document.querySelector("#count-tickets-header");
  countQestionsHeader.innerHTML = `${countQestionsForHeader} پرسش و پاسخ`;
  countTicketsHeader.innerHTML = `${countTicketForHeader} تیکت`;
  const ticketsContainer = document.querySelector("#tickets-container");
  ticketsContainer.insertAdjacentHTML(
    "beforeend",
    `
        <div
          class="rounded-md p-4 border-2 dark:border-cart-dark border-cart mt-4 flex"
        >
          <div class="p-4 rounded-md text-background block w-full">
            <P class="bg-button2 dark:bg-header rounded-md w-full p-4">${answer.ticket}</P>
          </div>
          <div class="p-4 mt-20 rounded-md w-full ${answer.answer?"":"hidden"}">
            <P class="w-full bg-yellow-500 text-background rounded-md p-4">${answer.answer}</P>
          </div>
        </div>
      `
  );
};

const showInfoUserInInputs = () => {
  const nameUserInput = document.querySelector("#name-user-input");
  const emailUserEmail = document.querySelector("#email-user-email");
  const usernameUserInput = document.querySelector("#username_user-input");
  const phoneUserInput = document.querySelector("#phone-user-input");
  const passwordUserInput = document.querySelector("#password-user-input");
  nameUserInput.value = infoUser.name;
  emailUserEmail.value = infoUser.email;
  usernameUserInput.value = infoUser.username;
  phoneUserInput.value = infoUser.phone;
};

const updateUserInfo = async (event) => {
  event.preventDefault();
  const nameUserInput = document.querySelector("#name-user-input");
  const emailUserEmail = document.querySelector("#email-user-email");
  const usernameUserInput = document.querySelector("#username_user-input");
  const phoneUserInput = document.querySelector("#phone-user-input");
  const passwordUserInput = document.querySelector("#password-user-input");
  if (
    nameUserInput.value.trim() &&
    emailUserEmail.value.trim() &&
    usernameUserInput.value.trim() &&
    phoneUserInput.value.trim() &&
    passwordUserInput.value.trim()
  ) {
    if (passwordUserInput.value.length < 8) {
      showToastBox("رمز عبور بیش از 8 کاراکتر باشد", "failed");
    } else if (usernameUserInput.value.length < 4) {
      showToastBox("نام کاربری حداقل 3 کاراکتر باشد", "failed");
    } else {
      const infoNewUser = {
        name: nameUserInput.value.trim(),
        email: emailUserEmail.value.trim(),
        username: usernameUserInput.value.trim(),
        phone: phoneUserInput.value.trim(),
        password: passwordUserInput.value.trim(),
      };
      const res = await fetch(`${baseUrl}/users`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infoNewUser),
      });
      if (res.ok) {
        showToastBox("اطلاعات شما بروز رسانی شد", "successful");
        const res = await getUser(true, false);
        infoUser = res;
        showInfoUserInFastMenu();
      } else {
        showToastBox("خطای نا شناخته ای رخ داد", "failed");
      }
    }
  } else {
    showToastBox("تمامی اطلاعات را وارد کنید", "failed");
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
window.showChatBoxTicket = showChatBoxTicket;
window.showAllTicket = showAllTicket;
window.addTicketsAndQestions = addTicketsAndQestions;
window.showSubDeparments = showSubDeparments;
window.checkCodeOff = checkCodeOff;
window.rigesterToCourses = rigesterToCourses;
window.deleteCourseFromBasket = deleteCourseFromBasket;
window.addEventListener("load", async () => {
  getThemeFromLocalStorage("text-dark");
  const infoUserParamis = getUser(true);
  infoUser = await infoUserParamis;
  showInfoUserInFastMenu();
  getNavbar();
  getCourses(coursesContainer, "lastMyCourses");
  getAndShowInhomeUserTickets();
  showCourseBasket();
});
