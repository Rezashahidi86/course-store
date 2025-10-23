import {
  showAndHideMenus,
  changeTheme,
  getThemeFromLocalStorage,
  getInfoAdmin,
  seenNotifBtn,
  chartCountCoursesMenus,
  chartstudentsCourse1,
  chartstudentsCourse2,
  chartstudentsCourse3,
  chartRoleUser,
} from "./util.js";
import { getFromLocalStorage, baseUrl } from "../../src/js/helper.js";
const openMenus = document.querySelector("#open-menus");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const countUsersElem = document.querySelector("#count-users");
const countAdminElem = document.querySelector("#count-admin");
const tableUsersContainer = document.querySelector("#table-users");
const tableCoursesContainer = document.querySelector("#table-courses");
let infoAdmin;
let countAdmins = 0;
let countUsers = 0;

const showInfoPieChart = async () => {
  const res = await fetch(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const users = await res.json();
  users.forEach((user) => {
    if (user.role === "ADMIN") {
      countAdmins += 1;
    } else {
      countUsers += 1;
    }
  });
  countAdminElem.innerHTML = `مدیر : ${countAdmins}`;
  countUsersElem.innerHTML = `دانشجویان : ${countUsers}`;
  chartRoleUser.data.datasets[0].data = [countUsers, countAdmins];
  chartRoleUser.update();
};
const showInfoBarChart = async () => {
  const res = await fetch(`${baseUrl}/courses`);
  let courses = await res.json();
  if (courses.length > 24) {
    courses = courses.slice(courses.length - 18, courses.length + 1);
  }
  let startIndex = 0;
  let countCourseInPage = Math.ceil(courses.length / 3);
  const numberHelp = countCourseInPage;
  let chartBar1 = [];
  let chartBar2 = [];
  let chartBar3 = [];
  chartBar1.push(courses.slice(startIndex, countCourseInPage));
  startIndex += numberHelp;
  countCourseInPage += numberHelp;
  chartBar2.push(courses.slice(startIndex, countCourseInPage));
  startIndex += numberHelp;
  countCourseInPage += numberHelp;
  chartBar3.push(courses.slice(startIndex));
  const infoBarChart1 = {
    labels: [],
    data: [],
  };
  const infoBarChart2 = {
    labels: [],
    data: [],
  };
  const infoBarChart3 = {
    labels: [],
    data: [],
  };
  chartBar1[0].forEach((info) => {
    infoBarChart1.labels.push(info.name);
    infoBarChart1.data.push(info.registers);
  });
  chartBar2[0].forEach((info) => {
    infoBarChart2.labels.push(info.name);
    infoBarChart2.data.push(info.registers);
  });
  chartBar3[0].forEach((info) => {
    infoBarChart3.labels.push(info.name);
    infoBarChart3.data.push(info.registers);
  });
  chartstudentsCourse1.data.labels = infoBarChart1.labels;
  chartstudentsCourse1.data.datasets[0].data = infoBarChart1.data;
  chartstudentsCourse2.data.labels = infoBarChart2.labels;
  chartstudentsCourse2.data.datasets[0].data = infoBarChart2.data;
  chartstudentsCourse3.data.labels = infoBarChart3.labels;
  chartstudentsCourse3.data.datasets[0].data = infoBarChart3.data;
  chartstudentsCourse1.update();
  chartstudentsCourse2.update();
  chartstudentsCourse3.update();
};

const getAndShowLastUsers = async () => {
  const res = await fetch(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const users = await res.json();
  const lastReverseUsers = users.reverse().slice(0, 10);
  lastReverseUsers.forEach((user, index) => {
    tableUsersContainer.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
      <th class="py-4 text-sm">${index + 1}</th>
      <th class="py-4 text-sm">${user.name}</th>
      <th class="py-4 text-sm">${user.phone}</th>
    </tr>
    `
    );
  });
};

const getAndShowLastCourses = async () => {
  const res = await fetch(`${baseUrl}/courses`);
  const courses = await res.json();
  const lastCoursesReverse = courses.reverse().slice(0, 10);
  lastCoursesReverse.forEach((course, index) => {
    tableCoursesContainer.insertAdjacentHTML(
      "beforeend",

      `
      <tr>
        <th class="py-4 text-sm">${index + 1}</th>
        <th class="py-4 text-sm">${course.name}</th>
        <th class="py-4 text-sm">${course.registers}</th>
      </tr>
      `
    );
  });
};

const showInfoChartLine = async () => {
  const res = await fetch(`${baseUrl}/menus`);
  const infoMenus = await res.json();
  let menus = [];
  let countCourseMenu = [];
  infoMenus.forEach((menu) => {
    menus.push(menu.title);
    countCourseMenu.push(menu.submenus.length);
    chartCountCoursesMenus.data.labels = menus;
    chartCountCoursesMenus.data.datasets[0].data = countCourseMenu;
    chartCountCoursesMenus.update();
  });
};

window.seenNotifBtn = seenNotifBtn;

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);

window.addEventListener("load", () => {
  getThemeFromLocalStorage();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
  showInfoPieChart();
  showInfoBarChart();
  getAndShowLastUsers();
  getAndShowLastCourses();
  showInfoChartLine();
});
