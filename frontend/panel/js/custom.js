const roleUsersCanvas = document.querySelector("#chart-role-users");
const studensCoursestCanvas1 = document.querySelector("#chart-studens-course1");
const studensCoursestCanvas2 = document.querySelector("#chart-studens-course2");
const studensCoursestCanvas3 = document.querySelector("#chart-studens-course3");
const countCoursesCanvas = document.querySelector("#chart-count-courses");

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

const chartCountCourses = new Chart(countCoursesCanvas, {
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
        titleFont: { size: 14, family:"medium" },
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

export {
  chartRoleUser,
  chartstudentsCourse1,
  chartstudentsCourse2,
  chartstudentsCourse3,
  chartCountCourses,
};
