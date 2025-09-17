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
const statusUserDesctap = document.querySelector("#status-user-desctap");
const statusUserMobile = document.querySelector("#status-user-mobile");
const nameUserMaodalInfoAccount = document.querySelector(
  "#name-user-maodal-info-account"
);
let modalInfoAccountBtn;
const setInToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

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

const showModalInfoAccount = () => {
  moadlInfoAccount.classList.remove("hidden");
  backModalInfoAccount.classList.remove("hidden");
};

const hideModalInfoAccount = () => {
  moadlInfoAccount.classList.add("hidden");
  backModalInfoAccount.classList.add("hidden");
};

const iconThemeChange = (iconElemNavbar, iconElemBars) => {
  themeChangeBtns[1].insertAdjacentHTML("beforeend", iconElemNavbar);
  themeChangeBtns[0].insertAdjacentHTML("beforeend", iconElemBars);
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

const getThemeFromLocalStorage = (color) => {
  const themeLocal = getFromLocalStorage("theme");
  themeChangeBtns[0].innerHTML = "";
  themeChangeBtns[1].innerHTML = "";
  if (themeLocal) {
    if (themeLocal === "dark") {
      iconThemeChange(
        `<i class="fa fa-sun text-2xl text-${color}"></i>`,
        '<i class="fa fa-sun cursor-pointer"></i><span class="cursor-pointer">تم روشن</span>'
      );
      html.classList.add("dark");
    } else {
      iconThemeChange(
        `<i class="fa fa-moon text-2xl text-${color}"></i>`,
        '<i class="fa fa-moon cursor-pointer"></i><span class="cursor-pointer">تم تیره</span>'
      );
      html.classList.remove("dark");
    }
  }
};

const showStatusUser = (userInfo) => {
  if (userInfo) {
    statusUserDesctap.insertAdjacentHTML(
      "beforeend",
      `
    <div id="modal-info-account-btn">
     <i class="fa fa-user text-2xl text-background cursor-pointer z-40"></i>
    </div>
    `
    );
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

const getUser = async () => {
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
      showStatusUser(userInfo);
      return userInfo;
    } else if (res.status === 403) {
      showToastBox("خطایی در دریافت اطلاعات شما رخ داده است", "reject");
      showStatusUser(false);
    }
  } else {
    showStatusUser(false);
  }
};

export {
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
};
