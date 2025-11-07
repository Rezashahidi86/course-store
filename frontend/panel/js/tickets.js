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
  showToastBox
} from "../../src/js/helper.js";
window.seenNotifBtn = seenNotifBtn;
const openMenus = document.querySelector("#open-menus");
const closeMenus = document.querySelector("#close-menus");
const changeThemeBtn = document.querySelector("#change-theme");
const ticketsTable = document.querySelector("#tickets-table");
let infoAdmin;

const getAndShowTickets = async () => {
  const res = await fetch(`${baseUrl}/tickets`, {
    headers: {
      Authorization: `Bearer ${getFromLocalStorage("token")}`,
    },
  });
  const tickets = await res.json();
  ticketsTable.innerHTML = "";
  console.log(tickets);
  tickets.reverse().forEach((ticket, index) => {
    let arrayDateCreate = ticket.createdAt.slice(0, 10).split("-");
    let dateCreat = changeDate(
      arrayDateCreate[0],
      arrayDateCreate[1],
      arrayDateCreate[2]
    ).join("/");
    ticketsTable.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
        <th class="py-4 text-background ${
          ticket.answer
            ? "bg-green-700 dark:bg-green-800"
            : "bg-red-700 dark:bg-red-800"
        }">${index + 1}</th>
        <th class="py-4 text-sm max-lg:hidden">${ticket.user}</th>
        <th class="py-4 text-sm max-md:hidden">${ticket.title}</th>
        <th class="py-4 text-sm max-md:hidden">${
          ticket.course ? ticket.course : "ندارد"
        }</th>
        <th class="py-4 text-sm max-lg:hidden">${ticket.departmentID}</th>
        <th class="py-4 text-sm">${ticket.departmentSubID}</th>
        <th class="py-4 text-sm max-md:hidden max-lg:hidden">${dateCreat}</th>
        <th class="py-4">
            <button class="bg-blue-500 dark:bg-blue-800 text-background p-2 rounded-md cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 duration-200" onclick="showModalMassage('${
              ticket.body
            }')">
                <span>مشاهده</span>
            </button>
        </th>
        <th class="py-4">
            <button class="bg-blue-500 dark:bg-blue-800 text-background p-2 rounded-md cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 duration-200" onclick="showModalAnswer('${
              ticket._id
            }')">
                <span>پاسخ</span>
            </button>
        </th>
    </tr>
    `
    );
  });
};

const sendAnswer = async (ticketID) => {
  const answerMassage = document.querySelector("#answer-massage").value.trim();
  if (answerMassage) {
    const bodyFetch = {
      ticketID,
      body: answerMassage,
    };
    const res = await fetch(`${baseUrl}/tickets/answer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyFetch),
    });
    if (res.ok) {
      hideModal();
      showToastBox("پاسخ شما ثبت شد", "successful");
      getAndShowTickets()
    } else {
      hideModal();
      showToastBox("خطای ناشناخته رخ داده", "failed");
    }
  } else {
    hideModal();
    showToastBox("متنی را وارد نکردید", "failed");
  }
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

const showModalAnswer = (ticketID) => {
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
              onclick="sendAnswer('${ticketID}')"
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

const hideModal = () => {
  modal.innerHTML = "";
};

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
changeThemeBtn.addEventListener("click", changeTheme);
window.sendAnswer = sendAnswer
window.hideModal = hideModal;
window.showModalMassage = showModalMassage;
window.showModalAnswer = showModalAnswer;
window.addEventListener("load", () => {
  getThemeFromLocalStorage();
  getInfoAdmin().then((res) => {
    infoAdmin = res;
  });
  getAndShowTickets();
});
