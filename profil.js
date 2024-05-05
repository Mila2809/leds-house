"use strict";

const DarkModeBtn = document.querySelector(".switch");
const body = document.querySelector("body");
function toggleDarkMode() {
    body.classList.toggle("light-mode");
}
DarkModeBtn.addEventListener("change", toggleDarkMode);

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "./index.html";
    }

    const response = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401 || response.status === 403) {
        window.location.href = "./index.html";
        localStorage.removeItem("token");
    }

    const data = await response.json();

    document.getElementById("email").innerHTML = `Email : ${data.email}`;
    document.getElementById("name").innerHTML = `Nom : ${data.name}`;
});
