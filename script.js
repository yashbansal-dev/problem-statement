const API_URL =
  "https://script.google.com/macros/s/AKfycbyULO60ooRcJuTcu853GaaxlrMqiGfhTAaB7RLUUTwg4VCwOr9cxrkF1EB_YMi_J0d_rA/exec";

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

const target = new Date("2026-03-12T17:00:00+05:30").getTime();

const timer = setInterval(() => {
  const diff = target - Date.now();

  if (diff <= 0) {
    clearInterval(timer);

    const btn = document.querySelector("#problemForm button");
    if (btn) {
      btn.disabled = true;
      btn.innerText = "Submissions Closed";
    }
    return;
  }

  document.getElementById("d").innerText = Math.floor(diff / 86400000);
  document.getElementById("h").innerText = Math.floor(diff / 3600000) % 24;
  document.getElementById("m").innerText = Math.floor(diff / 60000) % 60;
  document.getElementById("s").innerText = Math.floor(diff / 1000) % 60;
}, 1000);

function copyText(text) {
  navigator.clipboard.writeText(text);
  alert("Copied: " + text);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("problemForm");
  if (!form) return;

  const submitBtn = form.querySelector("button");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const formData = new FormData(form);

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting…";

    fetch(API_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors" 
    })
      .then(() => {
        form.reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
        alert("✅ Problem statement submitted successfully!");
      })
      .catch(() => {
        alert("❌ Submission failed. Please try again.");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Problem";
      });
  });
});
let lastScroll = 0;
const header = document.querySelector(".top-header");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 768) return;

  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});
