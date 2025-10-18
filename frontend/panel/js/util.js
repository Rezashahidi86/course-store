import {
  baseUrl,
  getFromLocalStorage,
  setInToLocalStorage,
  showToastBox,
} from "../../src/js/helper.js";

const htmlTag = document.querySelector("html");
const asidebar = document.querySelector("#asidebar");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const nameAdminElem = document.querySelector("#name-admin");
const userNameAdminElem = document.querySelector("#username-admin");
const countNotifElem = document.querySelector("#count-notif");
const notifBox = document.querySelector("#notif-box");
const notifBoxMsg = document.querySelector("#notif-box-msg");
const roleUsersCanvas = document.querySelector("#chart-role-users");
const studensCoursestCanvas1 = document.querySelector("#chart-studens-course1");
const studensCoursestCanvas2 = document.querySelector("#chart-studens-course2");
const studensCoursestCanvas3 = document.querySelector("#chart-studens-course3");
const countCoursesCanvas = document.querySelector("#chart-count-courses");
const chartSlide = document.querySelector(".chart-slide");
let chartRoleUser;
let chartstudentsCourse1;
let chartstudentsCourse2;
let chartstudentsCourse3;
let chartCountCourses;
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
        notifBoxMsg.insertAdjacentHTML(
          "beforeend",
          `
          <div
            class="w-80 max-2sm:w-72 flex items-center justify-between bg-cart dark:bg-cart-dark p-4 z-40" id="notif-${i}"
          >
            <span class="text-sm text-text dark:text-text-dark max-w-60"
              >${notifications[i].msg}</span
            >
            <button
              class="p-1 bg-button2 dark:bg-button2-dark cursor-pointer rounded-md" onclick=seenNotifBtn('${i},${notifications[i]._id}')
            >
              <span class="text-sm text-background">باشه!</span>
            </button>
          </div>
          `
        );
      }
    } else {
      notifBoxMsg.classList.add("hidden");
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

const seenNotifBtn = async (numberNotifAndnotificationsID) => {
  const notificationsID = numberNotifAndnotificationsID.slice(2);
  const numberNotif = numberNotifAndnotificationsID.slice(0, 1);
  const res = await fetch(`${baseUrl}/notifications/see/${notificationsID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  if (!res.ok) {
    showToastBox("خطای ناشناخته رخ داده", "failed");
  } else {
    const notifSeen = document.querySelector(`#notif-${numberNotif}`);
    notifSeen.remove();
    countNotifElem.innerHTML = +countNotifElem.innerHTML - 1;
    if (!notifBoxMsg.innerHTML.trim()) {
      notifBoxMsg.classList.add("hidden");
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
      if (chartSlide) {
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
    if (chartSlide) {
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
  } else {
    htmlTag.classList.remove("dark");
    changeThemeBtn.classList.remove("dark");
    changeThemeBtn.classList.add("light");
    changeThemeBtn.innerHTML = "";
    changeThemeBtn.insertAdjacentHTML(
      "beforeend",
      `
        <i class="fa fa-sun text-xl"></i>
        `
    );
    setInToLocalStorage("theme", "light");
    if (chartSlide) {
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
  }
};



export {
  showAndHideMenus,
  getThemeFromLocalStorage,
  changeTheme,
  getInfoAdmin,
  seenNotifBtn,
};
// charts
if (chartSlide) {
  new Swiper(chartSlide, {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
  });

  chartRoleUser = new Chart(roleUsersCanvas, {
    type: "pie",
    data: {
      labels: ["ادمین", "دانشجو"],
      datasets: [
        {
          label: "کاربران",
          data: [500, 200],
          backgroundColor: [
            "oklch(62.3% 0.214 259.815)",
            "oklch(70.5% 0.213 47.604)",
          ],
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
      },
    },
  });

  chartstudentsCourse1 = new Chart(studensCoursestCanvas1, {
    type: "bar",
    data: {
      labels: [
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
      ],
      datasets: [
        {
          label: "کاربران",
          data: [500, 200, 300, 100, 400, 150, 20, 30, 56],
          backgroundColor: ["#1e90ff"],
          borderRadius: 10,
        },
      ],
    },
    options: {
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      responsive: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          ticks: {
            font: {
              family: "medium",
              size: 14,
            },
          },
        },
      },
    },
  });

  chartstudentsCourse2 = new Chart(studensCoursestCanvas2, {
    type: "bar",
    data: {
      labels: [
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
      ],
      datasets: [
        {
          label: "کاربران",
          data: [500, 200, 300, 100, 400, 150, 20, 30, 56],
          backgroundColor: ["#1e90ff"],
          borderRadius: 10,
        },
      ],
    },
    options: {
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      responsive: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          ticks: {
            font: {
              family: "medium",
              size: 14,
            },
          },
        },
      },
    },
  });

  chartstudentsCourse3 = new Chart(studensCoursestCanvas3, {
    type: "bar",
    data: {
      labels: [
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
        "ریکت",
      ],
      datasets: [
        {
          label: "کاربران",
          data: [500, 200, 300, 100, 400, 150, 20, 30, 56],
          backgroundColor: ["#1e90ff"],
          borderRadius: 10,
        },
      ],
    },
    options: {
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      responsive: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          ticks: {
            font: {
              family: "medium",
              size: 14,
            },
          },
        },
      },
    },
  });

  chartCountCourses = new Chart(countCoursesCanvas, {
    type: "line",
    data: {
      labels: ["ریکت", "ریکت", "ریکت", "ریکت", "ریکت"],
      datasets: [
        {
          label: "کاربران",
          data: [500, 200, 300, 100, 400],
          backgroundColor: ["#1e90ff"],
          pointBackgroundColor: ["#1e90ff"],
          pointRadius: 20,
          hoverPointRadius: 22,
          tension: 0.2,
          fill: true,
          hoverBorderWidth: 30,
          borderColor: "#0d3b66",
          borderWidth: 5,
        },
      ],
    },
    options: {
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      responsive: false,
      plugins: {
        tooltip: {
          enabled: true, // فعال یا غیرفعال کردن tooltip
          backgroundColor: "rgba(0,0,0,0.7)", // رنگ پس‌زمینه
          titleColor: "#fff", // رنگ عنوان
          bodyColor: "#bbbbbb", // رنگ متن
          titleFont: { size: 14, family: "medium" },
          bodyFont: { size: 14 },
          padding: 10,
          cornerRadius: 6,
          displayColors: false, // حذف رنگ کوچک کنار tooltip
          callbacks: {
            title: (tooltipItems) => {
              // تغییر عنوان (معمولاً label محور X)
              return "دسته بندی: " + tooltipItems[0].label;
            },
            label: (tooltipItem) => {
              return "تعداد دوره : " + tooltipItem.formattedValue;
            },
          },
        },
        datalabels: {
          align: "",
          anchor: "center",
          color: "#fff",
          font: { size: 13, weight: "bold", family: "Vazirmatn" },
        },
        legend: { display: false },
      },
      scales: {
        x: {
          ticks: {
            font: {
              family: "medium",
              size: 16,
            },
            backgroundColor: "#fff",
            hoverBackgroundColor: "#000",
          },
          grid: {
            color: "#555555",
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "#555555",
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}
