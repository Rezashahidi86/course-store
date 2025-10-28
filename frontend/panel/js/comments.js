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
const commentsTable = document.querySelector("#comments-table");
const modal = document.querySelector("#modal");
let infoAdmin;

const getAndShowComments = async () => {
  const res = await fetch(`${baseUrl}/comments`);
  const comments = await res.json()
  commentsTable.innerHTML = "";
  comments.reverse().forEach((comment, index) => {
    let arrayDateCreate = comment.createdAt.slice(0, 10).split("-");
    let dateCreat = changeDate(
      arrayDateCreate[0],
      arrayDateCreate[1],
      arrayDateCreate[2]
    ).join("/");
    commentsTable.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
        <th class="py-4 text-background ${
          comment.answer
            ? "bg-green-700 dark:bg-green-800"
            : "bg-red-700 dark:bg-red-800"
        }">${index + 1}</th>
        <th class="py-4 text-sm max-lg:hidden">${comment.creator.name}</th>
        <th class="py-4 text-sm">${comment.course}</th>
        <th class="py-4 text-sm max-md:hidden">${dateCreat}</th>
        <th class="py-4 text-sm max-md:hidden">${comment.score}</th>
        <th class="py-4">
            <button class="bg-blue-500 dark:bg-blue-800 text-background p-2 rounded-md cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 duration-200" onclick="showModalMassage('${
              comment.body
            }')">
                <span>مشاهده</span>
            </button>
        </th>
        <th class="py-4">
            <button class="bg-blue-500 dark:bg-blue-800 text-background p-2 rounded-md cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 duration-200" onclick="showModalAnswer('${
              comment._id
            }')">
                <span>پاسخ</span>
            </button>
        </th>
        <th class="py-4 max-sm:hidden">
            <button class="bg-blue-500 dark:bg-blue-800 text-background p-2 rounded-md cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 duration-200" onclick="showModalAccept('${
              comment._id
            }')">
                <span>تایید</span>
            </button>
            <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalReject('${
              comment._id
            }')">
                <span>رد</span>
            </button>
        </th>
        <th class="py-4">
            <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalDelete('${
              comment._id
            }')">
                <span>حذف</span>
            </button>
        </th>
    </tr>
    `
    );
  });
};

const sendAnswer = async (commentID) => {
  const answerMassage = document.querySelector("#answer-massage").value.trim();
  if (answerMassage) {
    const bodyFetch = {
      name: answerMassage,
      body: answerMassage,
    };
    const res = await fetch(`${baseUrl}/comments/answer/${commentID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyFetch),
    });
    const ressss = await res.json();
    if (res.ok) {
      hideModal();
      showToastBox("پاسخ شما ثبت شد", "successful");
      getAndShowComments();
    } else {
      hideModal();
      showToastBox("خطای ناشناخته رخ داده", "failed");
    }
  } else {
    hideModal();
    showToastBox("متنی را وارد نکردید", "failed");
  }
};

const acceptComments = async (commentID) => {
  const res = await fetch(`${baseUrl}/comments/accept/${commentID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  if (res.ok) {
    showToastBox("کامنت با موفقیت تایید شد", "successful");
    hideModal();
    getAndShowComments();
  } else {
    showToastBox("خظای ناشناخته ای رخ داده", "failed");
    hideModal();
  }
};

const rejectComments = async (commentID) => {
  const res = await fetch(`${baseUrl}/comments/reject/${commentID}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  if (res.ok) {
    showToastBox("کامنت با موفقیت رد شد", "successful");
    hideModal();
    getAndShowComments();
  } else {
    showToastBox("خظای ناشناخته ای رخ داده", "failed");
    hideModal();
  }
};

const deleteComment = async (commentID) => {
  const res = await fetch(`${baseUrl}/comments/${commentID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Beaerer ${getFromLocalStorage("token")}`,
    },
  });
  if (res.ok) {
    showToastBox("کامنت با موفقیت حذف شد", "successful");
    hideModal();
    getAndShowComments();
  } else {
    showToastBox("خظای ناشناخته ای رخ داده", "failed");
    hideModal();
  }
};

const showModalDelete = (commentID) => {
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
        <span class="mt-4 text-background">از حذف کامنت اطمینان دارید</span>
        <div
          class="flex items-center justify-between p-2 mt-4 w-full text-background"
        >
          <button
            class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700  dark:bg-green-800 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="delete-course-btn"
            onclick="deleteComment('${commentID}')"
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

const showModalMassage = (text) => {
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "beforeend",
    `
    <div
        class="fixed flex items-center justify-center inset-0 backdrop-blur-md z-50"
      >
        <div class="max-w-2/3 flex flex-col items-center justify-center bg-cart dark:bg-cart-dark text-text dark:text-text-dark p-4 rounded-md text-center shadow-md shadow-shadow dark:shadow-shadow-dark ">
          <p>${text}</p>
          <button class="mt-12 mb-4 px-6 py-1 text-background bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-900 duration-200 dark:bg-header rounded-md cursor-pointer" onclick="hideModal()">خوندم</button>
        </div>
    </div>
    `
  );
};

const showModalAnswer = (commentID) => {
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "beforeend",
    `
      <div
        class="fixed flex items-center justify-center inset-0 backdrop-blur-md z-50"
      >
        <div
          class="max-w-2/3 min-w-1/3 flex flex-col items-center justify-center bg-cart dark:bg-cart-dark text-text dark:text-text-dark p-4 rounded-md text-center shadow-md shadow-shadow dark:shadow-shadow-dark"
        >
          <textarea
            type="text"
            id="answer-massage"
            placeholder="پاسخ خود را وارد کنید... "
            class="p-3 border-2 border-button2 dark:border-header w-full rounded-sm outline-none"
          ></textarea>
          <div class="flex gap-x-4">
            <button
              class="mt-6 mb-4 px-6 py-1 text-background bg-green-600 hover:bg-green-700 dark:hover:bg-green-900 duration-200 dark:bg-green-800 rounded-md cursor-pointer"
              onclick="sendAnswer('${commentID}')"
            >
            ارسال
            </button>
            <button
              class="mt-6 mb-4 px-6 py-1 text-background bg-red-600 hover:bg-red-700 dark:hover:bg-red-900 duration-200 dark:bg-red-800 rounded-md cursor-pointer"
              onclick="hideModal()"
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    `
  );
};

const showModalAccept = (commentID) => {
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
        <span class="mt-4 text-background">از تایید کامنت برای نمایش اطمینان دارید</span>
        <div
          class="flex items-center justify-between p-2 mt-4 w-full text-background"
        >
          <button
            class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700  dark:bg-green-800 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="delete-course-btn"
            onclick="acceptComments('${commentID}')"
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

const showModalReject = (commentID) => {
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
        <span class="mt-4 text-background">از رد کامنت اطمینان دارید</span>
        <div
          class="flex items-center justify-between p-2 mt-4 w-full text-background"
        >
          <button
            class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700  dark:bg-green-800 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="delete-course-btn"
            onclick="rejectComments('${commentID}')"
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

window.seenNotifBtn = seenNotifBtn;
window.acceptComments = acceptComments;
window.rejectComments = rejectComments;
window.deleteComment = deleteComment;
window.showModalMassage = showModalMassage;
window.sendAnswer = sendAnswer;
window.showModalAnswer = showModalAnswer;
window.showModalReject = showModalReject;
window.showModalAccept = showModalAccept;
window.showModalDelete = showModalDelete;
window.hideModal = hideModal;

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);

window.addEventListener("load", () => {
  getThemeFromLocalStorage();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
  getAndShowComments();
});
