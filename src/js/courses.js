import {
  closeModalBars,
  modalBarsHandeler,
  getValueFromUrl,
  backModalInfoAccount,
  hideModalInfoAccount,
  iconThemeChange,
  darkOrLight,
  getThemeFromLocalStorage,
  themeChangeBtns,
  getUser,
  getNavbar,
  baseUrl,
  getFromLocalStorage,
  plusTime,
  changeDate,
  showToastBox,
  baseUrlCover,
  getInfoCourse,
  changeHeaderLinks,
} from "./helper.js";

const openModalBtnBars = document.querySelector("#open-modal-btn-bars");
const courseTitle = document.querySelector("#course-title");
const courseDescription = document.querySelector("#course-description");
const statusBuyUserContainer = document.querySelector("#status-buy-user");
const countStudentsElem = document.querySelector("#count-students");
const statusCourseElem = document.querySelector("#status-course");
const statusSupportElem = document.querySelector("#status-support");
const statusWatchCourseElem = document.querySelector("#status-watch-course");
const teacherNameElems = document.querySelectorAll(".teacher-name");
const profileTeacher = document.querySelector("#profile-teacher");
const courseTimeElem = document.querySelector("#course-time");
const courseSessionsTimeElem = document.querySelector("#course-sessions-time");
const videoContainer = document.querySelector("#video-container");
const percentStatusCourse = document.querySelector("#percent-status-course");
const copyShortLinkBtn = document.querySelector("#copy-shortlink-btn");
const descriptionTextElem = document.querySelector("#description-text");
const descriptionImg = document.querySelector("#description-img");
const commentesContainer = document.querySelector("#commentes-container");
const addCommentBtn = document.querySelector("#add-comment-btn");
const worningBoxComments = document.querySelector("#worning-box-comments");
const boxAddComments = document.querySelector("#box-add-comments");
const postCommentBtn = document.querySelector("#post-comment-btn");
const commentsText = document.querySelector("#comments-text");
const scoreContainer = document.querySelector("#score-container");
const rediousScore = document.querySelector("#redious-score");
const scoreNumber = document.querySelector("#score-number");
const cresseScore = document.querySelector("#cresse-score");
const scoreIcon = document.querySelectorAll(".score-icon");
const countComments = document.querySelector("#count-comments");
const closeTextareaCommentBtn = document.querySelector(
  "#close-textarea-comment"
);
const boxSessenionsContainer = document.querySelector(
  "#box-sessions-container"
);
let boxCourseParts;
const numberPercentStatusCourse = document.querySelector(
  "#number-percent-status-course"
);
const boxesCourseInformation = document.querySelectorAll(
  ".box-course-information"
);

const boxPartsCourseHandler = (event) => {
  let boxCoursePartInformation;
  if (event.target === event.currentTarget) {
    boxCoursePartInformation = event.target;
  } else {
    boxCoursePartInformation = event.target.parentElement;
  }
  const faAngele = boxCoursePartInformation.querySelector("svg");
  boxCourseParts.forEach((boxCoursePart) => {
    if (boxCoursePart.className.includes("hidden")) {
      boxCoursePart.classList.remove("hidden");
      faAngele.classList.add("rotate-180");
      boxCoursePartInformation.classList.add("rounded-t-md");
      boxCoursePartInformation.classList.remove("rounded-md");
    } else {
      boxCoursePart.classList.add("hidden");
      faAngele.classList.remove("rotate-180");
      boxCoursePartInformation.classList.remove("rounded-t-md");
      boxCoursePartInformation.classList.add("rounded-md");
    }
  });
};

const headerInfoCourse = (courseInfo) => {
  courseTitle.innerHTML = courseInfo.name;
  courseDescription.innerHTML = courseInfo.description;
  if (courseInfo.isUserRegisteredToThisCourse) {
    statusBuyUserContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="flex items-center justify-between mt-4 max-2sm:flex-col-reverse"
      >
        <div
          class="flex items-center gap-x-6 text-text dark:text-text-dark"
        >
          <i class="fa fa-user text-3xl max-sm:text-2xl"></i>
          <span class="text-xl max-sm:text-lg">شما دانشجوی دوره هستید</span>
        </div>
        <div
          class="flex items-center gap-x-2 text-background py-4 px-8 rounded-xl bg-button1 dark:bg-button1-dark max-sm:px-4 max-2sm:px-20 max-2sm:mb-4 cursor-pointer hover:bg-green-700 duration-200"
        >
          <i class="fa fa-book-open text-xl"></i>
          <span>مشاهده دوره</span>
        </div>
      </div>
      `
    );
  } else {
    statusBuyUserContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="flex items-center flex-row-reverse justify-between mt-4 max-2sm:flex-col-reverse"
      >
        <div
          class="flex items-center gap-x-6 text-text dark:text-text-dark"
        >
          <span class="text-xl max-sm:text-lg text-button1">${
            courseInfo.price ? courseInfo.price.toLocaleString() : "رایگان"
          }${courseInfo.price ? "تومان" : ""}</span>
        </div>
        <div
          class="flex items-center gap-x-2 text-background py-4 px-8 rounded-xl bg-button1 dark:bg-button1-dark max-sm:px-4 max-2sm:px-20 max-2sm:mb-4 cursor-pointer hover:bg-green-700 duration-200"
        >
          <i class="fa fa-basket-shopping text-xl"></i>
          <span>افزودن به سبد خرید</span>
        </div>
      </div>
      `
    );
  }
  videoContainer.insertAdjacentHTML(
    "beforeend",
    `
    <video
      class="rounded-xl w-full h-full"
      src=""
      poster="${baseUrlCover}/${courseInfo.cover}"
      controls
    ></video>
    `
  );
};

const boxesStatusCourse = (courseInfo) => {
  if (courseInfo.isComplete) {
    statusCourseElem.innerHTML = "تکمیل شده";
  } else {
    statusCourseElem.innerHTML = "در حال اجرا";
  }
  if (courseInfo.price) {
    statusWatchCourseElem.innerHTML = "آنلاین";
  } else {
    statusWatchCourseElem.innerHTML = "دانلود/آنلاین";
  }
  teacherNameElems.forEach((teacherNameElem) => {
    teacherNameElem.innerHTML = courseInfo.creator.name;
  });
  profileTeacher.src = `${baseUrlCover}/${courseInfo.profile}`;
  if (courseInfo.isComplete) {
    percentStatusCourse.classList.add("after:w-[100%]");
    numberPercentStatusCourse.innerHTML = 100 + "%";
  } else {
    const nub = courseInfo.sessions.length * 3;
    percentStatusCourse.classList.add(`after:w-[${nub}%]`);
    numberPercentStatusCourse.innerHTML = nub + "%";
  }
  if (courseInfo.comments.length) {
    countComments.innerHTML = courseInfo.comments.length;
  } else {
    countComments.innerHTML = 0;
  }
  const dateMiladi = courseInfo.updatedAt.slice(0, 10).split("-");
  const dateShamsi = changeDate(dateMiladi[0], dateMiladi[1], dateMiladi[2]);
  courseTimeElem.innerHTML = dateShamsi.join("/");
  courseSessionsTimeElem.innerHTML = plusTime(courseInfo.sessions);
  countStudentsElem.innerHTML = courseInfo.courseStudentsCount;
  statusSupportElem.innerHTML = courseInfo.support;
};

const description = (courseInfo) => {
  descriptionTextElem.innerHTML = courseInfo.description;
  descriptionImg.src = `${baseUrlCover}/${courseInfo.cover}`;
};

const showSessions = (shortName, sessions) => {
  const lastSessions = sessions.length;
  if (sessions.length) {
    sessions.forEach((session, index) => {
      boxSessenionsContainer.insertAdjacentHTML(
        "beforeend",
        `
      <${session.free || session.isUserRegisteredToThisCourse ? "a" : "div"}
        href="sessions.html?name=${shortName}&id=${session._id}"
        class="${
          session.free || session.isUserRegisteredToThisCourse
            ? "group"
            : ""
        } bg-gray-500 dark:bg-text-dark flex items-center justify-between p-4 hidden box-course-part hover:border-[1px] border-button1 ${
          lastSessions === index + 1 ? "rounded-b-md" : ""
        }"
      >
        <div
          class="flex items-center gap-x-4 text-title dark:text-title-dark"
        >
          <div
            class="dark:bg-background-dark bg-background px-2 py-0.5 rounded-sm group-hover:bg-button1 group-hover:text-background  duration-200"
          >
            <span>${index + 1}</span>
          </div>
          <span class="text-background dark:text-background-dark group-hover:text-button1 duration-200"
            >${session.title}</span
          >
        </div>
        <div
          class="text-background dark:text-background-dark flex items-center gap-x-2 group-hover:text-button1 duration-200"
        >
        <span>${session.time}</span>
        <i class="fa fa-play"></i>
        <i class="fa fa-lock ${
          session.free || session.isUserRegisteredToThisCourse
            ? "opacity-0 absolute"
            : ""
        }"></i>
        </div>
      </${session.free || session.isUserRegisteredToThisCourse ? "a" : "div"}>
      `
      );
      boxCourseParts = document.querySelectorAll(".box-course-part");
    });
  } else {
    boxSessenionsContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
        class="bg-text dark:bg-text-dark flex items-center justify-between p-4 hidden box-course-part"
      >
        <div
          class="flex items-center gap-x-4 text-title dark:text-title-dark"
        >
          <div
            class="dark:bg-background-dark bg-background px-2 py-0.5 rounded-sm"
          >
            <span class="">--</span>
          </div>
          <span class="text-background dark:text-background-dark"
            >هنوز دوره ای اضافه نشده</span
          >
        </div>
        <div
          class="text-background dark:text-background-dark flex items-center gap-x-2"
        >
        <span>00:00</span>
        <i class="fa fa-play"></i>
        </div>
      </div>
      `
    );
    boxCourseParts = document.querySelectorAll(".box-course-part");
  }
};

const showComments = (courseInfo) => {
  if (courseInfo.comments.length) {
    const comments = courseInfo.comments.slice();
    if (comments.length >= 7) {
      comments = comments.slice(comments.length - 6, comments.length);
    }
    comments.forEach((comment, index) => {
      let answerCreate;
      let dataCreate = comment.creator.createdAt.slice(0, 10).split("-");
      if (comment.answerContent) {
        answerCreate = comment.answerContent.createdAt.slice(0, 10).split("-");
      }
      commentesContainer.insertAdjacentHTML(
        "beforeend",
        `
      <div
        class="rounded-md mt-8 p-4 bg-background dark:bg-background-dark"
        id="comment-${index + 1}"
      >
        <div>
          <div
            class="flex items-center gap-x-2 pb-6 border-b-2 border-text dark:border-text-dark w-full"
          >
            <img
              class="size-14 rounded-full"
              src="${baseUrlCover}/${comment.creator.profile}"
              alt="profile"
            />
            <div class="flex flex-col gap-y-2">
              <span class="text-title dark:text-title-dark"
                >${comment.creator.username} | ${
          comment.creator.role === "USER" ? "دانشجو" : "مدرس"
        }</span
              >
              <span class="text-text dark:text-text-dark text-sm"
                >${changeDate(dataCreate[0], dataCreate[1], dataCreate[2]).join(
                  "/"
                )}</span
              >
            </div>
          </div>
          <p class="text-text dark:text-text-dark p-2 mt-4">${comment.body}</p>
        </div>
      </div>
      `
      );
      if (comment.answerContent) {
        let commentBox = document.querySelector(`#comment-${index + 1}`);
        commentBox.insertAdjacentHTML(
          "beforeend",
          `
                  <div class="bg-cart dark:bg-cart-dark p-4 mt-4 rounded-md">
          <div class="">
            <div
              class="flex items-center gap-x-2 pb-6 border-b-2 border-text dark:border-text-dark w-full"
            >
              <img
                class="size-14 rounded-full"
                src="${baseUrlCover}/${comment.answerContent.creator.profile}"
                alt="profile"
              />
              <div class="flex flex-col gap-y-2">
                <span class="text-title dark:text-title-dark"
                  >${comment.answerContent.creator.name} |  ${
            comment.creator.role === "USER" ? "دانشجو" : "مدرس"
          }</span
                >

                <span class="text-text dark:text-text-dark text-sm"
                  >${changeDate(
                    answerCreate[0],
                    answerCreate[1],
                    answerCreate[2]
                  ).join("/")}</span
                >
              </div>
            </div>
          </div>
          <p class="text-text dark:text-text-dark mt-2 p-2">${
            comment.answerContent.body
          }</p>
        </div>
          `
        );
      }
    });
  } else {
    commentesContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div
          class="p-3 rounded-lg flex items-center gap-x-2 bg-red-500 dark:bg-red-600 mt-8"
        >
          <i class="text-background fa fa-warning"></i>
          <p class="text-background text-sm">
            هنوز نظری ثبت نشده است
          </p>
      </div>
      `
    );
  }
};

const postComments = async () => {
  const textUser = commentsText.value;
  if (!getFromLocalStorage("token")) {
    showToastBox("لطفا ابتدا در سایت ثبت نام کنید", "failed");
  } else if (!textUser) {
    showToastBox("لطفا ابتدا دیدگاه خود را بنویسید", "failed");
  } else {
    const commentData = {
      body: commentsText.value.trim(),
      courseShortName: getValueFromUrl("name"),
      score: scoreNumber.innerHTML,
    };
    const res = await fetch(`${baseUrl}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getFromLocalStorage("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    if (res.ok) {
      commentsText.value = "";
      showToastBox("نظر شما با موفقیت ثبت شد", "successful");
    } else {
      showToastBox("خطای ناشناخته ای رخ داد بعدا تلاش کنید", "failde");
    }
  }
};

const showScoreComment = () => {
  const scoreUser = +scoreNumber.innerHTML;
  const starEmpty = 5 - scoreUser;
  let scoreIconArray = Array.from(scoreIcon);
  for (let i = 0; i < scoreUser; i++) {
    scoreIconArray[i].classList.remove("text-yellow-200");
    scoreIconArray[i].classList.add("text-yellow-400");
  }
  for (let i = 0; i < starEmpty; i++) {
    scoreIconArray[scoreIconArray.length - 1 - i].classList.remove(
      "text-yellow-400"
    );
    scoreIconArray[scoreIconArray.length - 1 - i].classList.add(
      "text-yellow-200"
    );
  }
};

const showInfoCourses = async () => {
  const courseInfo = await getInfoCourse("course");
  changeHeaderLinks(courseInfo);
  headerInfoCourse(courseInfo);
  boxesStatusCourse(courseInfo);
  description(courseInfo);
  showSessions(courseInfo.shortName, courseInfo.sessions);
  showComments(courseInfo);
};

themeChangeBtns.forEach((themeChangeBtn) => {
  themeChangeBtn.addEventListener("click", () => {
    themeChangeBtns[0].innerHTML = "";
    themeChangeBtns[1].innerHTML = "";
    const theme = darkOrLight();
    if (theme === "dark") {
      iconThemeChange(
        '<i class="fa fa-moon text-2xl text-text-dark"></i>',
        '<i class="fa fa-moon cursor-pointer"></i><span class="cursor-pointer">تم تیره</span>'
      );
    } else {
      iconThemeChange(
        '<i class="fa fa-sun text-2xl text-text-dark"></i>',
        '<i class="fa fa-sun cursor-pointer"></i><span class="cursor-pointer">تم روشن</span>'
      );
    }
  });
});

closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
backModalInfoAccount.addEventListener("click", hideModalInfoAccount);
postCommentBtn.addEventListener("click", postComments);
rediousScore.addEventListener("click", () => {
  const score = scoreNumber.innerHTML;
  if (score > 1) {
    scoreNumber.innerHTML = +scoreNumber.innerHTML - 1;
  }
  showScoreComment();
});
cresseScore.addEventListener("click", () => {
  const score = scoreNumber.innerHTML;
  if (score < 5) {
    scoreNumber.innerHTML = +scoreNumber.innerHTML + 1;
  }
  showScoreComment();
});
boxesCourseInformation.forEach((boxCourseInformation) => {
  boxCourseInformation.addEventListener("click", boxPartsCourseHandler);
});
copyShortLinkBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`courses.html?name=${getValueFromUrl("name")}`);
  showToastBox("لینک با موفقیت ذخیره شد", "successful");
});
addCommentBtn.addEventListener("click", () => {
  boxAddComments.classList.toggle("hidden");
  worningBoxComments.classList.toggle("hidden");
});
closeTextareaCommentBtn.addEventListener("click", () => {
  boxAddComments.classList.toggle("hidden");
  worningBoxComments.classList.toggle("hidden");
});

window.addEventListener("load", () => {
  getThemeFromLocalStorage("text-dark");
  getUser(true);
  getNavbar();
  showInfoCourses();
});
