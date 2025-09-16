import * as helper from "./helper.js";

const likeArrayInputs = document.querySelectorAll("input");
const inputUserName = document.querySelector("#input-user-name");
const inputName = document.querySelector("#input-name");
const inputPhoneNumber = document.querySelector("#input-phone-number");
const inputEmail = document.querySelector("#input-email");
const inputPassword = document.querySelector("#input-password");
const registerBtn = document.querySelector("#register-btn");
const baseUrl = "http://localhost:4000/v1";

const checkInputRegister = (event) => {
  const inputs = Array.from(likeArrayInputs);
  const inputEmtye = inputs.find((input) => {
    return input.value === "";
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
  const name = inputName.value;
  const userName = inputUserName.value;
  const phone = inputPhoneNumber.value;
  const email = inputEmail.value;
  const password = inputPassword.value;
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
    setTimeout(() => {
      location.replace("http://127.0.0.1:5500/index.html?#");
    }, 3000);
  } else if (response.status === 409) {
    showToastBoxAndEmtyeInput("نام کاربری یا ایمیل از قبل وجود دارد");
  }
  const responseParse = await response.json()
  const accessToken = responseParse.accessToken
  helper.setInToLocalStorage("token",accessToken)
};

const showToastBoxAndEmtyeInput = (title, status, boxEmtye = true) => {
  if (boxEmtye === "userName") {
    inputUserName.value = "";
  } else if (boxEmtye === "password") {
    inputPassword.value = "";
  } else if (boxEmtye === "phone") {
    inputPhoneNumber.value = "";
  }
  helper.showToastBox(title, status);
};

registerBtn.addEventListener("click", checkInputRegister);
