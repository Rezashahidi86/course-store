import {
  showAndHideMenus,
  changeTheme,
  getThemeFromLocalStorage,
  getInfoAdmin,
  seenNotifBtn,
} from "./util.js";
import { getFromLocalStorage } from "../../src/js/helper.js";
import { baseUrl, showToastBox } from "../../src/js/helper.js";
const openMenus = document.querySelector("#open-menus");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const coursesTable = document.querySelector("#courses-table");
const addCourseBtn = document.querySelector("#add-course-btn");
const nameCourseInput = document.querySelector("#name-course");
const shortNameCourseInput = document.querySelector("#short-name-course");
const priceCourseInput = document.querySelector("#price-course");
const suportCourseInput = document.querySelector("#suport-course");
const descriptionCourseInput = document.querySelector("#description-course");
const coverCourse = document.querySelector("#cover-course");
const categoryCourseSelect = document.querySelector("#category-course");
const categoryCourseBox = document.querySelector("#category-course");
const formAddCourse = document.querySelector("#form-add-course")
const modal = document.querySelector("#modal");
const radioStatusCourseInputs = document.querySelectorAll(
  ".radio-status-course"
);
let infoAdmin;
let coverCourseFile;
let categoryCourse;
let statusCourse;
window.seenNotifBtn = seenNotifBtn;

const getAndShowAllCourses = async () => {
  const res = await fetch(`${baseUrl}/courses`);
  const courses = await res.json();
  coursesTable.innerHTML = "";
  coursesTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead
      class="text-title dark:text-title-dark bg-background dark:bg-background-dark"
    >
      <tr>
        <th class="py-4">شناسه</th>
        <th class="py-4">نام</th>
        <th class="py-4 max-sm:hidden">دسته بندی</th>
        <th class="py-4 max-lg:hidden">مدرس</th>
        <th class="py-4 max-sm:hidden">وضعیت</th>
        <th class="py-4">قیمت</th>
        <th class="py-4">دانشجو</th>
        <th class="py-4">حذف</th>
      </tr>
    </thead>
    `
  );
  courses.forEach((course, index) => {
    coursesTable.insertAdjacentHTML(
      "beforeend",
      `
          <tbody class="text-text dark:text-text-dark">
            <tr>
                <th class="py-4">${index + 1}</th>
                <th class="py-4 text-sm">${course.name}</th>
                <th class="py-4 text-sm max-sm:hidden">${
                  course.categoryID?.name
                }</th>
                <th class="py-4 text-sm max-lg:hidden">${course.creator}</th>
                <th class="py-4 text-sm max-sm:hidden">${
                  course.isComplete ? "تمام شده" : "درحال برگذاری"
                }</th>
                <th class="py-4 text-sm">${
                  course.price ? course.price.toLocaleString() : "رایگان"
                }</th>
                <th class="py-4">
                 ${course.registers} 
                </th>
                <th class="py-4">
                    <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalBan('${
                      course._id
                    }')">
                        <span>حذف</span>
                    </button>
                </th>
            </tr>
          </tbody>
        `
    );
  });
};

const getAndShowCategory = async () => {
  const res = await fetch(`${baseUrl}/category`);
  const allCategory = await res.json();
  allCategory.forEach((category) => {
    categoryCourseBox.insertAdjacentHTML(
      "beforeend",
      `
      <option class="cursor-pointer" value="${category._id}">${category.title}</option>
      `
    );
  });
};

const deleteCourse = async (courseID) => {
  const res = await fetch(`${baseUrl}/courses/${courseID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  if (res.ok) {
    showToastBox("حذف دوره موفقیت آمیز بود", "successful");
    getAndShowAllCourses();
  } else {
    showToastBox("خطایی رخ داده بعدا تلاش کنید", "failed");
  }
  hideModal();
};

const showModalBan = (courseID) => {
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "beforeend",
    `
    <div
      class="fixed flex items-center justify-center inset-0 backdrop-blur-md z-50"
    >
      <div
        class="flex items-center flex-col p-4 bg-red-600 dark:bg-red-800 w-max h-max rounded-xl"
      >
        <i class="fa fa-warning text-6xl text-background"></i>
        <span class="mt-4 text-background">از حذف دوره اطمینان دارید</span>
        <div
          class="flex items-center justify-between p-2 mt-4 w-full text-background"
        >
          <button
            class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700  dark:bg-green-800 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="delete-course-btn"
            onclick="deleteCourse('${courseID}')"
          >
            <span>بله</span>
          </button>
          <button
            class="bg-gray-400 hover:bg-gray-500 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="close-modal-btn"
            onclick="hideModal()"
          >
            <span>خیر</span>
          </button>
        </div>
      </div>
    </div>
    `
  );
};

const hideModal = () => {
  modal.innerHTML = "";
};
window.deleteCourse = deleteCourse;
window.hideModal = hideModal;
window.showModalBan = showModalBan;

const addCourse = async (event) => {
  event.preventDefault();
  if (
    !nameCourseInput.value.trim() ||
    !priceCourseInput.value.trim() ||
    !descriptionCourseInput.value.trim() ||
    !shortNameCourseInput.value.trim() ||
    !suportCourseInput.value.trim() ||
    !categoryCourse ||
    !statusCourse ||
    !coverCourseFile
  ) {
    showToastBox("تمامی اطلاعات را وارد کنید", "failed");
  } else {
    const formDate = new FormData();
    formDate.append("name", nameCourseInput.value.trim());
    formDate.append("price", priceCourseInput.value.trim());
    formDate.append("description", descriptionCourseInput.value.trim());
    formDate.append("shortName", shortNameCourseInput.value.trim());
    formDate.append("support", suportCourseInput.value.trim());
    formDate.append("categoryID", categoryCourse);
    formDate.append("status", statusCourse);
    formDate.append("cover", coverCourseFile);
    const res = await fetch(`${baseUrl}/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
      },
      body: formDate,
    });
    if (res.ok) {
      showToastBox("دوره با موفقیت اضافه شد", "successful");
      getAndShowAllCourses();
    } else {
      showToastBox("خطایی رخ داده لطفا بعدا امتحان کنید", "failed");
    }
  }
  return false
};

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);
formAddCourse.addEventListener("submit", addCourse);
coverCourse.addEventListener("change", (event) => {
  coverCourseFile = event.target.files[0];
});
categoryCourseSelect.addEventListener("change", (event) => {
  categoryCourse = event.target.value;
});
radioStatusCourseInputs.forEach((input) => {
  input.addEventListener("change", (event) => {
    statusCourse = event.target.value;
  });
});

window.addEventListener("load", () => {
  getThemeFromLocalStorage();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
  getAndShowAllCourses();
  getAndShowCategory();
});
