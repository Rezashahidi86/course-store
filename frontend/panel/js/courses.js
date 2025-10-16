import {
  showAndHideMenus,
  changeTheme,
  getThemeFromLocalStorage,
  getInfoAdmin,
  seenNotifBtn,
} from "./util.js";
import { baseUrl, showToastBox } from "../../src/js/helper.js";
[].fo;
const openMenus = document.querySelector("#open-menus");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const coursesTable = document.querySelector("#courses-table");
let infoAdmin;
window.seenNotifBtn = seenNotifBtn;

const getAndShowAllCourses = async () => {
  const res = await fetch(`${baseUrl}/courses`);
  const courses = await res.json();
  console.log(courses);
  courses.forEach((course, index) => {
    coursesTable.insertAdjacentHTML(
      "beforeend",
      `
          <tbody class="text-text dark:text-text-dark">
            <tr>
                <th class="py-4">${index + 1}</th>
                <th class="py-4 text-sm">${course.name}</th>
                <th class="py-4 text-sm max-sm:hidden">${course.categoryID.name}</th>
                <th class="py-4 text-sm max-lg:hidden">${course.creator}</th>
                <th class="py-4 text-sm max-sm:hidden">${course.isComplete?"تمام شده":"درحال برگذاری"}</th>
                <th class="py-4 text-sm">${course.price?course.price.toLocaleString():"رایگان"}</th>
                <th class="py-4">
                    <button class="bg-blue-500 dark:bg-header text-background p-2 rounded-md cursor-pointer">
                        <span>ویرایش</span>
                    </button>
                </th>
                <th class="py-4">
                    <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer">
                        <span>حذف</span>
                    </button>
                </th>
            </tr>
          </tbody>
        `
    );
  });
};

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);

window.addEventListener("load", () => {
  getThemeFromLocalStorage();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
  getAndShowAllCourses();
});
