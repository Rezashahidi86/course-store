import {
  showToastBox,
  setInToLocalStorage,
  getFromLocalStorage,
  html,
  baseUrl,
} from "./helper.js";
const likeArrayInputs = document.querySelectorAll("input");
const userNameInput = document.querySelector("#user-name");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#login-btn");

const loginUserHandler = async (event) => {
  event.preventDefault();
  const inputs = Array.from(likeArrayInputs);
  const inputEmtye = inputs.find((input) => {
    return input.value === "";
  });
  if (inputEmtye) {
    inputEmtye.focus();
  } else {
    const identifier = userNameInput.value.trim();
    const password = passwordInput.value.trim();
    const userInfo = {
      identifier,
      password,
    };
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (response.status === 200) {
      showToastBox("اطلاعات شما با موفقیت دریافت شد", "successful");
      const responseParse = await response.json();
      const accessToken = responseParse.accessToken;
      setInToLocalStorage("token", accessToken);
      setTimeout(() => {
        location.replace("http://127.0.0.1:5500/index.html?#");
      }, 2000);
    } else if (response.status === 401) {
      showToastBox("کاربری با این اطلاعات یافت نشد", "reject");
    }
  }
};
loginBtn.addEventListener("click", loginUserHandler);
window.addEventListener("load", () => {
  const theme = getFromLocalStorage("theme");
  if (theme === "dark") {
    html.classList.add("dark");
  }
});
