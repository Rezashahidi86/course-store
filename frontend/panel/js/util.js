import {
  baseUrl,
  getFromLocalStorage,
  setInToLocalStorage,
} from "../../src/js/helper.js";
import {
  chartRoleUser,
  chartstudentsCourse1,
  chartstudentsCourse2,
  chartstudentsCourse3,
  chartCountCourses,
} from "./custom.js";
const htmlTag = document.querySelector("html");
const asidebar = document.querySelector("#asidebar");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const nameAdminElem = document.querySelector("#name-admin");
const userNameAdminElem = document.querySelector("#username-admin");
const countNotifElem = document.querySelector("#count-notif");
const notifBox = document.querySelector("#notif-box");
const notifBoxMsg = document.querySelector("#notif-box-msg")

const showInfoInHeader = (info) => {
  if (info.role != "ADMIN") {
    location.replace("../login.html");
  } else {

    nameAdminElem.innerHTML = info.name;
    userNameAdminElem.innerHTML = info.username;
    countNotifElem.innerHTML = info.notifications.length;
    if (info.notifications.length) {
      const notifications = info.notifications;
      for (let i = 0; i < notifications.length; i++) {
        notifBoxMsg.insertAdjacentHTML("beforeend",
          `
          <div
            class="w-80 max-2sm:w-72 flex items-center justify-between bg-cart dark:bg-cart-dark p-4 z-40"
          >
            <span class="text-sm text-text dark:text-text-dark max-w-60"
              >${notifications[i].msg}</span
            >
            <div
              class="p-1 bg-button2 dark:bg-button2-dark cursor-pointer rounded-md"
            >
              <span class="text-sm text-background">باشه!</span>
            </div>
          </div>
          `
        )
        console.log(notifBox.innerHTML);
      }
    } else {
      notifBox.insertAdjacentHTML(
        "beforeend",
        `
        <div class="mt-2 absolute rounded-md right-12 w-60 p-4 bg-red-500 text-background flex  items-center gap-x-2 after:size-8 after:rounded-md after:rotate-45 after:right-[6.55rem] after:bg-red-500 after:top-0 after:absolute">
          <i class="fa fa-warning z-40"></i>
          <span class="text-sm z-40">هیچ پیغامی برای شما پیدا نشد.</span>
        </div>
        `
      );
    }
  }
};

const getInfoAdmin = async () => {
  const res = await fetch(`${baseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const infoAdmin = await res.json();
  showInfoInHeader(infoAdmin);
  return infoAdmin;
};

const showAndHideMenus = () => {
  if (asidebar.className.includes("-right-[300px]")) {
    asidebar.classList.remove("-right-[300px]");
    asidebar.classList.add("-right-[0px]");
    closeMenus.classList.remove("hidden");
  } else {
    asidebar.classList.add("-right-[300px]");
    asidebar.classList.remove("-right-[0px]");
    closeMenus.classList.add("hidden");
  }
};
const getThemeFromLocalStorage = () => {
  const theme = getFromLocalStorage("theme");
  if (theme) {
    if (theme === "dark") {
      htmlTag.classList.add("dark");
      changeThemeBtn.classList.add("dark");
      changeThemeBtn.classList.remove("light");
      changeThemeBtn.innerHTML = "";
      changeThemeBtn.insertAdjacentHTML(
        "beforeend",
        `
        <i class="fa fa-moon text-xl"></i>
        `
      );
      chartstudentsCourse1.data.datasets[0].backgroundColor = ["#0d3b66"];
      chartstudentsCourse2.data.datasets[0].backgroundColor = ["#0d3b66"];
      chartstudentsCourse3.data.datasets[0].backgroundColor = ["#0d3b66"];
      chartCountCourses.data.datasets[0].backgroundColor = ["#0d3b66"];
      chartCountCourses.data.datasets[0].borderColor = ["#1e90ff"];
      chartRoleUser.data.datasets[0].backgroundColor = [
        "#0d3b66",
        "oklch(55.3% 0.195 38.402)",
      ];
      chartRoleUser.update();
      chartstudentsCourse1.update();
      chartstudentsCourse2.update();
      chartstudentsCourse3.update();
      chartCountCourses.update();
    }
  }
};

const changeTheme = () => {
  if (changeThemeBtn.className.includes("light")) {
    htmlTag.classList.add("dark");
    changeThemeBtn.classList.add("dark");
    changeThemeBtn.classList.remove("light");
    changeThemeBtn.innerHTML = "";
    changeThemeBtn.insertAdjacentHTML(
      "beforeend",
      `
        <i class="fa fa-moon text-xl"></i>
        `
    );
    setInToLocalStorage("theme", "dark");
    chartstudentsCourse1.data.datasets[0].backgroundColor = ["#0d3b66"];
    chartstudentsCourse2.data.datasets[0].backgroundColor = ["#0d3b66"];
    chartstudentsCourse3.data.datasets[0].backgroundColor = ["#0d3b66"];
    chartCountCourses.data.datasets[0].backgroundColor = ["#0d3b66"];
    chartCountCourses.data.datasets[0].borderColor = ["#1e90ff"];
    chartRoleUser.data.datasets[0].backgroundColor = [
      "#0d3b66",
      "oklch(55.3% 0.195 38.402)",
    ];
    chartRoleUser.update();
    chartstudentsCourse1.update();
    chartstudentsCourse2.update();
    chartstudentsCourse3.update();
    chartCountCourses.update();
  } else {
    htmlTag.classList.remove("dark");
    changeThemeBtn.classList.remove("dark");
    changeThemeBtn.classList.add("light");
    changeThemeBtn.innerHTML = "";
    changeThemeBtn.insertAdjacentHTML(
      "beforeend",
      `
        <i class="fa fa-sun"></i>
        `
    );
    setInToLocalStorage("theme", "light");
    chartstudentsCourse1.data.datasets[0].backgroundColor = ["#1e90ff"];
    chartstudentsCourse2.data.datasets[0].backgroundColor = ["#1e90ff"];
    chartstudentsCourse3.data.datasets[0].backgroundColor = ["#1e90ff"];
    chartCountCourses.data.datasets[0].backgroundColor = ["#1e90ff"];
    chartCountCourses.data.datasets[0].borderColor = ["#0d3b66"];
    chartRoleUser.data.datasets[0].backgroundColor = [
      "oklch(62.3% 0.214 259.815)",
      "oklch(70.5% 0.213 47.604)",
    ];
    chartRoleUser.update();
    chartstudentsCourse1.update();
    chartstudentsCourse2.update();
    chartstudentsCourse3.update();
    chartCountCourses.update();
  }
};

export {
  showAndHideMenus,
  getThemeFromLocalStorage,
  changeTheme,
  getInfoAdmin,
};
