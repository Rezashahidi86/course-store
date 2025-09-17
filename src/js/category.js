import {
  closeModalBars,
  modalBarsHandeler,
  showModalInfoAccount,
  backModalInfoAccount,
  hideModalInfoAccount,
   modalInfoAccountBtn,
} from "./helper.js";
const openModalBtnBars = document.querySelector("#open-modal-btn-bars");

closeModalBars.addEventListener("click", modalBarsHandeler);
openModalBtnBars.addEventListener("click", modalBarsHandeler);
modalInfoAccountBtn.addEventListener("click", showModalInfoAccount);
backModalInfoAccount.addEventListener("click", hideModalInfoAccount);
