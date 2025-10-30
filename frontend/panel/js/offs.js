import {
  showAndHideMenus,
  changeTheme,
  getThemeFromLocalStorage,
  getInfoAdmin,
  seenNotifBtn,
} from "./util.js";
import {
  getFromLocalStorage,
  baseUrl,
  showToastBox,
} from "../../src/js/helper.js";
const openMenus = document.querySelector("#open-menus");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const tableOffs = document.querySelector("#table-offs");
const courseSelect = document.querySelector("#course-select");
const addOffBtn = document.querySelector("#add-off-btn");
const nameOff = document.querySelector("#name-off");
const maxOff = document.querySelector("#max-off");
const offPercent = document.querySelector("#off-percent");

let allCourses;
let courseID;

const addNewOff = async (event) => {
  event.preventDefault();
  if (
    nameOff.value.trim() &&
    maxOff.value.trim() &&
    +offPercent.value.trim() < 101 &&
    courseID
  ) {
    const offInfo = {
      code: nameOff.value.trim(),
      percent: offPercent.value.trim(),
      course: courseID,
      max: +maxOff.value.trim(),
    };
    const res = await fetch(`${baseUrl}/offs/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offInfo),
    });
    const resss = await res.json();
    console.log(resss);
    if (res.ok) {
      showToastBox("کد تخفیف با موفقیت ایجاد شد", "successful");
      getAndShowAllOffs();
    } else {
      showToastBox("خطای ناشناخته ای رخ داده است", "failed");
    }
  } else {
    showToastBox("اطلاعات را درست و کامل وارد کنید", "failed");
  }
};

const getAndShowCourses = async () => {
  const res = await fetch(`${baseUrl}/courses`);
  allCourses = await res.json();
  allCourses
    .filter((course) => !course.price)
    .forEach((course) => {
      courseSelect.insertAdjacentHTML(
        "beforeend",
        `
        <option value="${course._id}">${course.name}</option>
        `
      );
    });
};

const getAndShowAllOffs = async () => {
  const res = await fetch(`${baseUrl}/offs`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const offs = await res.json();
  tableOffs.innerHTML = "";
  offs.forEach((off, index) => {
    const courseOff = allCourses.find((course) => course._id === off.course);
    tableOffs.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <th class="py-4">${index + 1}</th>
                <th class="py-4 text-sm">${off.code}</th>
                <th class="py-4 text-sm">${courseOff.name}</th>
                <th class="py-4 text-sm max-sm:hidden">${off.creator}</th>
                <th class="py-4 text-sm max-2sm:hidden">${off.max}</th>
                <th class="py-4 text-sm">${off.uses}</th>
                <th class="py-4">
                    <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalDelete('${
                      off._id
                    }')">
                        <span>حذف</span>
                    </button>
                </th>
            </tr>
        `
    );
  });
};

const deleteOff = async (offID) => {
  const res = await fetch(`${baseUrl}/offs/${offID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  if (res.ok) {
    showToastBox("کد تخفیف حذف شد", "successful");
    getAndShowAllOffs();
    hideModal();
  } else {
    showToastBox("خطایی ناشناخته ای رخ داده", "failed");
    hideModal();
  }
};

const showModalDelete = (categoryID) => {
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
        <span class="mt-4 text-background">از حذف کد تخفیف اطمینان دارید</span>
        <div
          class="flex items-center justify-between p-2 mt-4 w-full text-background"
        >
          <button
            class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700  dark:bg-green-800 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="delete-course-btn"
            onclick="deleteOff('${categoryID}')"
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

let infoAdmin;
window.seenNotifBtn = seenNotifBtn;
window.showModalDelete = showModalDelete;
window.hideModal = hideModal;
window.deleteOff = deleteOff;

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);
addOffBtn.addEventListener("click", addNewOff);
courseSelect.addEventListener(
  "change",
  (event) => (courseID = event.target.value)
);

window.addEventListener("load", async () => {
  getThemeFromLocalStorage();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
  const _ = await getAndShowCourses();
  getAndShowAllOffs();
});
