const likeArrayInputs = document.querySelectorAll("input");
const inputUserName = document.querySelector("#input-user-name");
const inputName = document.querySelector("#input-name");
const inputPhoneNumber = document.querySelector("#input-phone-number");
const inputEmail = document.querySelector("#input-email");
const inputPassword = document.querySelector("#input-password");
const registerBtn = document.querySelector("#register-btn");
const toastBox = document.querySelector("#toast-box");
const toastIcon = document.querySelector("#toast-icon");
const toastTitle = document.querySelector("#toast-title");
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
  }else{
    registerUser(event)
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
  } else if (response.status === 409) {
    showToastBoxAndEmtyeInput("نام کاربری یا ایمیل از قبل وجود دارد");
  }
};

const showToastBoxAndEmtyeInput = (title, status, boxEmtye = true) => {
  if (status === "successful") {
    toastIcon.innerHTML = "";
    toastTitle.innerHTML = "";
    toastBox.classList.add("after:bg-button1");
    toastBox.classList.remove("after:bg-red-600");
    toastTitle.innerHTML = title;
    toastIcon.insertAdjacentHTML(
      "beforeend",
      `
        <i class="fa fa-check-circle text-4xl text-button1"></i>
        `
    );
    toastBox.classList.remove("-left-96");
    toastBox.classList.add("left-0");
    setTimeout(() => {
      toastBox.classList.add("-left-96");
      toastBox.classList.remove("left-0");
      location.replace("http://127.0.0.1:5500/index.html?#");
    }, 2000);
  } else {
    if (boxEmtye === "userName") {
      inputUserName.value = "";
    } else if (boxEmtye === "password") {
      inputPassword.value = "";
    } else if (boxEmtye === "phone") {
      inputPhoneNumber.value = "";
    }
    toastIcon.innerHTML = "";
    toastTitle.innerHTML = "";
    toastBox.classList.remove("after:bg-button1");
    toastBox.classList.add("after:bg-red-600");
    toastTitle.innerHTML = title;
    toastIcon.insertAdjacentHTML(
      "beforeend",
      `
        <i class="fa fa-close text-4xl text-red-600"></i>
        `
    );
    toastBox.classList.remove("-left-96");
    toastBox.classList.add("left-0");
    setTimeout(() => {
      toastBox.classList.add("-left-96");
      toastBox.classList.remove("left-0");
    }, 3000);
  }
};

registerBtn.addEventListener("click", checkInputRegister);
