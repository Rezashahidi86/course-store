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
const usersTable = document.querySelector("#courses-table");
const modal = document.querySelector("#modal");
const nameInput = document.querySelector("#name");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const likeArrayInputs = document.querySelectorAll("form input");
const addUserBtn = document.querySelector("#add-user-btn");
let infoAdmin;

const getAndShowUsers = async () => {
  const res = await fetch(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const users = await res.json();
  usersTable.innerHTML = "";
  usersTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead
      class="text-title dark:text-title-dark bg-background dark:bg-background-dark"
    >
      <tr>
        <th class="py-4">شناسه</th>
        <th class="py-4">نام</th>
        <th class="py-4 max-md:hidden">نام کاربری</th>
        <th class="py-4 max-md:hidden">ایمیل</th>
        <th class="py-4">شماره</th>
        <th class="py-4">نقش</th>
        <th class="py-4">حذف</th>
        <th class="py-4 max-md:hidden">اخراج</th>
      </tr>
    </thead>
    `
  );
  users.forEach((user, index) => {
    usersTable.insertAdjacentHTML(
      "beforeend",
      `
          <tbody class="text-text dark:text-text-dark">
            <tr>
                <th class="py-4">${index + 1}</th>
                <th class="py-4 text-sm">${user.name}</th>
                <th class="py-4 text-sm max-md:hidden">${user.username}</th>
                <th class="py-4 text-sm max-md:hidden">${user.email}</th>
                <th class="py-4 text-sm">${user.phone}</th>
                <th class="py-4 text-sm">${
                  user.role === "ADMIN" ? "مدیر" : "دانشجو"
                }</th>
                <th class="py-4">
                    <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalBan('${"del"}${
        user._id
      }')">
                        <span>حذف</span>
                    </button>
                </th>
                <th class="py-4 max-md:hidden">
                    <button class="bg-red-500 dark:bg-red-800 text-background p-2 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-700 duration-200" onclick="showModalBan('${"ban"}${
        user._id
      }')">
                        <span>اخراج</span>
                    </button>
                </th>
            </tr>
          </tbody>
        `
    );
  });
};

const deleteOrBanUser = async (infoUserID) => {
  const userID = infoUserID.slice(3);
  const job = infoUserID.slice(0, 3);
  if (job === "ban") {
    const res = await fetch(`${baseUrl}/users/ban/${userID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
      },
    });
    if (res.ok) {
      showToastBox("کاربر با موفقیت بن شد", "successful");
      getAndShowUsers();
      hideModal();
    } else {
      showToastBox("مشکل ناشناخته ای رخ داد", "failed");
      hideModal();
    }
  } else {
    const res = await fetch(`${baseUrl}/users/${userID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
      },
    });
    if (res.ok) {
      showToastBox("کاربر با موفقیت حذف شد", "successful");
      getAndShowUsers();
      hideModal();
    } else {
      showToastBox("مشکل ناشناخته ای رخ داد", "failed");
      hideModal();
    }
  }
};

const showModalBan = (infoUserID) => {
  const userID = infoUserID.slice(3);
  const job = infoUserID.slice(0, 3);
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
        <span class="mt-4 text-background">${
          job === "ban"
            ? "از بن کردن کاربر اطمینان دارید"
            : "از حذف کردن کاربر اطمینان دارید"
        }</span>
        <div
          class="flex items-center justify-between p-2 mt-4 w-full text-background"
        >
          <button
            class="bg-green-600 hover:bg-green-700 dark:hover:bg-green-700  dark:bg-green-800 px-4 py-1 rounded-md outline-none cursor-pointer duration-200"
            id="delete-course-btn"
            onclick="deleteOrBanUser('${infoUserID}')"
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

const checkInputRegister = (event) => {
  event.preventDefault();
  const inputs = Array.from(likeArrayInputs);
  const inputEmtye = inputs.find((input) => {
    return input.value.trim() === "";
  });
  if (inputEmtye) {
    inputEmtye.focus();
  } else if (usernameInput.value.length <= 3) {
    usernameInput.focus();
    showToastBoxAndEmtyeInput(
      "نام کاربری خود را طولانی تر انتخاب کنید",
      "reject",
      "userName"
    );
  } else if (
    phoneInput.value.length !== 11 ||
    phoneInput.value.slice(0, 2) != "09"
  ) {
    phoneInput.focus();
    showToastBoxAndEmtyeInput("شماره تلفن معتبر وارد کنید", "reject", "phone");
  } else if (passwordInput.value.length <= 7) {
    showToastBoxAndEmtyeInput(
      "رمز عبور باید حداقل هشت کاراکتر داشته باشد",
      "reject",
      "password"
    );
    passwordInput.focus();
  } else if (
    !emailInput.value
      .slice(emailInput.value.length - 10, emailInput.value.length)
      .includes("@gmail.com")
  ) {
    showToastBoxAndEmtyeInput("ایمیل موتبر وارد نمایید", "reject", "email");
  } else {
    registerUser(event);
  }
};

const showToastBoxAndEmtyeInput = (title, status, boxEmtye = true) => {
  if (boxEmtye === "userName") {
    usernameInput.value = "";
  } else if (boxEmtye === "password") {
    passwordInput.value = "";
  } else if (boxEmtye === "phone") {
    phoneInput.value = "";
  } else if (boxEmtye === "email") {
    emailInput.innerHTML = "";
  }
  showToastBox(title, status);
};

const registerUser = async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const userName = usernameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const newUser = {
    name: name,
    username: userName,
    email,
    phone,
    password,
    confirmPassword: password,
  };
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  if (response.status === 201) {
    showToastBoxAndEmtyeInput("ثبت نام موفقیت آمیز بود", "successful");
    getAndShowUsers();
    likeArrayInputs.forEach((input) => {
      input.value = "";
    });
  } else if (response.status === 409) {
    showToastBox("نام کاربری یا ایمیل از قبل وجود دارد", "failed");
    likeArrayInputs.forEach((input) => {
      input.value = "";
    });
  } else if (response.status === 403) {
    showToastBoxAndEmtyeInput("کاربر مورد نظر اخراج شده");
    likeArrayInputs.forEach((input) => {
      input.value = "";
    });
  }
};
likeArrayInputs.forEach((input, index) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && input.value === "" && index) {
      likeArrayInputs[index - 1].focus();
    }
  });
});
window.hideModal = hideModal;
window.showModalBan = showModalBan;
window.deleteOrBanUser = deleteOrBanUser;
window.seenNotifBtn = seenNotifBtn;

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);
addUserBtn.addEventListener("click", checkInputRegister);

window.addEventListener("load", () => {
  getThemeFromLocalStorage();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
  getAndShowUsers();
});
