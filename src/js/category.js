import * as helper from "./helper.js"
const openModalBtnBars = document.querySelector("#open-modal-btn-bars");

helper.closeModalBars.addEventListener("click", helper.modalBarsHandeler);
openModalBtnBars.addEventListener("click", helper.modalBarsHandeler);
