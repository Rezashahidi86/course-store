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
  changeDate,
  showToastBox,
} from "../../src/js/helper.js";
const openMenus = document.querySelector("#open-menus");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const selectCourseContainer = document.querySelector("#select-course");
const tableSessions = document.querySelector("#table-sessions");
const nameSessionsInput = document.querySelector("#name-sessions");
const timeSessionsInput = document.querySelector("#time-sessions");
const freeSessionInput = document.querySelector("#free-session");
const notFreeSessionInput = document.querySelector("#not-free-session");
const courseAddSessions = document.querySelector("#course-add-sessions");
const addSessionBtn = document.querySelector("#add-session-btn");
const videoSession = document.querySelector("#video-session");
const modal = document.querySelector("#modal");
let allSessions = [];
let infoAdmin;
let showSessionsForUser
let addIdCourseSessions;
let typeSession;
let fileSession;

const getAllSessions = async () => {
  const res = await fetch(`${baseUrl}/courses/sessions`);
  allSessions = await res.json();
};

const getAndShowNameCourses = async () => {
  const res = await fetch(`${baseUrl}/courses`);
  const courses = await res.json();
  selectCourseContainer.innerHTML = "";
  courseAddSessions.innerHTML = "";
  selectCourseContainer.insertAdjacentHTML(
    "beforeend",
    `
      <option value="-1" disabled selected>دوره مورد نظر</option>
      
        `
  );
  courses.forEach((course) => {
    selectCourseContainer.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${course._id}">${course.name}</option>
      
        `
    );
  });
  courseAddSessions.insertAdjacentHTML(
    "beforeend",
    `
      <option value="-1" disabled selected>برای چه دوره ای</option>
      
        `
  );
  courses.forEach((course) => {
    courseAddSessions.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${course._id}">${course.name}</option>
      
        `
    );
  });
};

const showSessions = () => {
  const choiceSessions = allSessions.filter((session) => {
    return session.course._id === showSessionsForUser;
  });
  tableSessions.innerHTML = "";
  if (choiceSessions.length) {
    choiceSessions.forEach((session, index) => {
      let arrayDateCreate = session.updatedAt.slice(0, 10).split("-");
      let dateCreat = changeDate(
        arrayDateCreate[0],
        arrayDateCreate[1],
        arrayDateCreate[2]
      ).join("/");
      tableSessions.insertAdjacentHTML(
        "beforeend",
        `
            <tr>
                <th class="py-4">${index + 1}</th>
                <th class="py-4 text-sm">${session.title}</th>
                <th class="py-4 text-sm">${session.time}</th>
                <th class="py-4 text-sm max-2sm:hidden">${dateCreat}</th>
                <th class="py-4">
                    <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalBan('${
                      session._id
                    }')">
                        <span>حذف</span>
                    </button>
                </th>
            </tr>
            `
      );
    });
  } else {
    tableSessions.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
            <th class="py-4 bg-red-500 text-background"><i class="fa fa-warning"></i>  هنوز قسمتی برای این دوره اضافه نشده است</th>
        </tr>
        `
    );
  }
};

const addSession = async (event) => {
  event.preventDefault();
  if (
    nameSessionsInput.value.trim() &&
    timeSessionsInput.value.trim() &&
    addIdCourseSessions &&
    typeSession &&
    fileSession
  ) {
    const formDataSession = new FormData();
    formDataSession.append("title", nameSessionsInput.value);
    formDataSession.append("time", timeSessionsInput.value);
    formDataSession.append("video", fileSession);
    formDataSession.append("free", typeSession);
    const res = await fetch(
      `${baseUrl}/courses/${addIdCourseSessions}/sessions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getFromLocalStorage("token")}`,
        },
        body: formDataSession,
      }
    );
    if (res.ok) {
      showToastBox("جلسه با موفقیت اضافه شد", "seccessful");
      getAllSessions();
      showSessions();
    } else {
      showToastBox("خطایی ناشناخنه رخ داده", "failed");
    }
  } else {
    showToastBox("تمامی اطلاعات را وارد کنید", "failed");
  }
};

const deleteSessions = async (sessionsId) => {
  const res = await fetch(`${baseUrl}/courses/sessions/${sessionsId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  if (res.ok) {
    showToastBox("جلسه بندی حذف شد", "successful");
    const _ = await getAllSessions();
    showSessions()
    hideModal();
  } else {
    showToastBox("خطایی ناشناخته ای رخ داده", "failed");
    hideModal();
  }
};

const showModalBan = (sessionsId) => {
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
        <span class="mt-4 text-background">از حذف جلسه اطمینان دارید</span>
        <div
          class="flex items-center justify-between p-2 mt-4 w-full text-background"
        >
          <button
            class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700  dark:bg-green-800 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="delete-course-btn"
            onclick="deleteSessions('${sessionsId}')"
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
window.deleteSessions = deleteSessions;
window.hideModal = hideModal;
window.showModalBan = showModalBan;
window.seenNotifBtn = seenNotifBtn;

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);
selectCourseContainer.addEventListener("change", (event) => {
  showSessionsForUser =  event.target.value
  showSessions()
});
courseAddSessions.addEventListener("change", (event) => {
  addIdCourseSessions = event.target.value;
});
freeSessionInput.addEventListener("change", (event) => {
  typeSession = event.target.value;
});
notFreeSessionInput.addEventListener("change", (event) => {
  typeSession = event.target.value;
});
videoSession.addEventListener("change", (event) => {
  fileSession = event.target.files[0];
});
addSessionBtn.addEventListener("click", addSession);

window.addEventListener("load", () => {
  getThemeFromLocalStorage();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
  getAllSessions();
  getAndShowNameCourses();
});
