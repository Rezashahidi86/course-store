import { showToastBox, setInToLocalStorage,getFromLocalStorage,html } from "./helper.js";
const likeArrayInputs = document.querySelectorAll("input");
const userNameInput = document.querySelector("#user-name");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#login-btn");
const baseUrl = "http://localhost:4000/v1";

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
    } else if (response.status === 401) {
      showToastBox("کاربری یافت نشد", "reject");
    }
  }
};
loginBtn.addEventListener("click", loginUserHandler);
window.addEventListener("load", () => {
  const theme =  getFromLocalStorage("theme")
  if(theme === "dark"){
    html.classList.add("dark")
  }
});
