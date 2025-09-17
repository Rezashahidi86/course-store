const modalBars = document.querySelector("#modal-bars");
const closeModalBars = document.querySelector("#close-modal-bars");
const toastBox = document.querySelector("#toast-box");
const toastIcon = document.querySelector("#toast-icon");
const toastTitle = document.querySelector("#toast-title");
const moadlInfoAccount = document.querySelector("#moadl-info-account");
const backModalInfoAccount = document.querySelector("#back-modal-info-account");
const modalInfoAccountBtn = document.querySelector("#modal-info-account-btn");
const themeChangeBtns = document.querySelectorAll(".theme-change");

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
  const html = document.querySelector("html");
  if (html.className.includes("dark")) {
    setInToLocalStorage("theme", "light");
    html.classList.remove("dark");
    return "dark";
  } else {
    setInToLocalStorage("theme", "dark");
    html.classList.add("dark");
    return "lighte";
  }
};

const getThemeFromLocalStorage = () => {
  const themeLocal = getFromLocalStorage("theme");
  themeChangeBtns[0].innerHTML = ""
  themeChangeBtns[1].innerHTML = ""
  if (themeLocal) {
    const theme = darkOrLight();
    console.log(theme);
    if (theme === "dark") {
      iconThemeChange(
        '<i class="fa fa-moon text-xl text-background cursor-pointer"></i>',
        '<i class="fa fa-moon cursor-pointer"></i><span class="cursor-pointer">تم تیره</span>'
      );
    } else {
      iconThemeChange(
        '<i class="fa fa-sun text-xl text-background cursor-pointer"></i>',
        '<i class="fa fa-sun cursor-pointer"></i><span class="cursor-pointer">تم روشن</span>'
      );
    }
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
};
