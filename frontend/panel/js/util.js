import {
  getFromLocalStorage,
  setInToLocalStorage,
} from "../../src/js/helper.js";
const htmlTag = document.querySelector("html");
const asidebar = document.querySelector("#asidebar");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const roleUsersCanvas = document.querySelector("#chart-role-users");
const studensCoursestCanvas1 = document.querySelector("#chart-studens-course1");
const studensCoursestCanvas2 = document.querySelector("#chart-studens-course2");
const studensCoursestCanvas3 = document.querySelector("#chart-studens-course3");

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
      chartRoleUser.data.datasets[0].backgroundColor = [
        "#0d3b66",
        "oklch(55.3% 0.195 38.402)",
      ];
      chartRoleUser.update();
      chartstudentsCourse1.update();
      chartstudentsCourse2.update();
      chartstudentsCourse3.update();
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
    chartRoleUser.data.datasets[0].backgroundColor = [
      "#0d3b66",
      "oklch(55.3% 0.195 38.402)",
    ];
    chartRoleUser.update();
    chartstudentsCourse1.update();
    chartstudentsCourse2.update();
    chartstudentsCourse3.update();
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
    chartRoleUser.data.datasets[0].backgroundColor = [
      "oklch(62.3% 0.214 259.815)",
      "oklch(70.5% 0.213 47.604)",
    ];
    chartRoleUser.update();
    chartstudentsCourse1.update();
    chartstudentsCourse2.update();
    chartstudentsCourse3.update();
  }
};

// vendor

new Swiper(".chart-slide", {
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

const chartRoleUser = new Chart(roleUsersCanvas, {
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

const chartstudentsCourse1 = new Chart(studensCoursestCanvas1, {
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

const chartstudentsCourse2 = new Chart(studensCoursestCanvas2, {
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

const chartstudentsCourse3 = new Chart(studensCoursestCanvas3, {
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

export {
  showAndHideMenus,
  getThemeFromLocalStorage,
  changeTheme,
  chartstudentsCourse1,
  chartstudentsCourse2,
  chartstudentsCourse3,
};
