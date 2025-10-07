const openMenus = document.querySelector("#open-menus");
const asidebar = document.querySelector("#asidebar");
const closeMenus = document.querySelector("#close-menus");
const showAndHideMenus = () => {
  if (asidebar.className.includes("-right-[300px]")) {
    asidebar.classList.remove("-right-[300px]");
    asidebar.classList.add("-right-[0px]");
    closeMenus.classList.remove("hidden");
  } else {
    asidebar.classList.add("-right-[300px]");
    asidebar.classList.remove("-right-[0px]");
    closeMenus.classList.add("hidden");
  }
};

openMenus.addEventListener("click", showAndHideMenus);
closeMenus.addEventListener("click", showAndHideMenus);
