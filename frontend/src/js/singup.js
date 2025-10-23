import {
  setInToLocalStorage,
  showToastBox,
  getFromLocalStorage,
  html,
  baseUrl,
} from "./helper.js";

const likeArrayInputs = document.querySelectorAll("input");
const inputUserName = document.querySelector("#input-user-name");
const inputName = document.querySelector("#input-name");
const inputPhoneNumber = document.querySelector("#input-phone-number");
const inputEmail = document.querySelector("#input-email");
const inputPassword = document.querySelector("#input-password");
const registerBtn = document.querySelector("#register-btn");
const countPhoneNumber = document.querySelector("#count-phone-number");
likeArrayInputs.forEach((input, index) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && input.value === "" && index) {
      likeArrayInputs[index - 1].focus();
    }
  });
});

const checkInputRegister = (event) => {
  const inputs = Array.from(likeArrayInputs);
  const inputEmtye = inputs.find((input) => {
    return input.value.trim() === "";
  });
  if (inputEmtye) {
    inputEmtye.focus();
  } else if (inputUserName.value.length <= 3) {
    showToastBoxAndEmtyeInput(
      "نام کاربری خود را طولانی تر انتخاب کنید",
      "reject",
      "userName"
    );
  } else if (
    inputPhoneNumber.value.length !== 11 ||
    inputPhoneNumber.value.slice(0, 2) != "09"
  ) {
    showToastBoxAndEmtyeInput("شماره تلفن معتبر وارد کنید", "reject", "phone");
  } else if (inputPassword.value.length <= 7) {
    showToastBoxAndEmtyeInput(
      "رمز عبور باید حداقل هشت کاراکتر داشته باشد",
      "reject",
      "password"
    );
  } else {
    registerUser(event);
  }
};

const registerUser = async (event) => {
  event.preventDefault();
  const name = inputName.value.trim();
  const userName = inputUserName.value.trim();
  const phone = inputPhoneNumber.value.trim();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();
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
  console.log(response);
  if (response.status === 201) {
    showToastBoxAndEmtyeInput("ثبت نام موفقیت آمیز بود", "successful");
    setTimeout(() => {
      location.replace("index.html");
    }, 2000);
  } else if (response.status === 409) {
    showToastBoxAndEmtyeInput("نام کاربری یا ایمیل از قبل وجود دارد");
  } else if (response.status === 403) {
    showToastBoxAndEmtyeInput("کاربر مورد نظر اخراج شده");
  }
  const responseParse = await response.json();
  const accessToken = responseParse.accessToken;
  if (accessToken) {
    setInToLocalStorage("token", accessToken);
  }
};

const showToastBoxAndEmtyeInput = (title, status, boxEmtye = true) => {
  if (boxEmtye === "userName") {
    inputUserName.value = "";
  } else if (boxEmtye === "password") {
    inputPassword.value = "";
  } else if (boxEmtye === "phone") {
    inputPhoneNumber.value = "";
  }
  showToastBox(title, status);
};
inputPhoneNumber.addEventListener("keyup", () => {
  countPhoneNumber.innerHTML = 11 - inputPhoneNumber.value.length;
});
registerBtn.addEventListener("click", checkInputRegister);
window.addEventListener("load", () => {
  const theme = getFromLocalStorage("theme");
  if (theme === "dark") {
    html.classList.add("dark");
  }
});
