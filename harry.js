"use strict"

const DarkModeBtn = document.querySelector(".switch");
const body = document.querySelector("body");
function toggleDarkMode() {
    body.classList.toggle("light-mode");
}
DarkModeBtn.addEventListener("change", toggleDarkMode);