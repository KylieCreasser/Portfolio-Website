window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

const gtmScript = document.createElement("script");
gtmScript.async = true;
gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-5CNLZ49B";
document.head.appendChild(gtmScript);

const menuButton = document.querySelector("[data-menu-open]");
const menu = document.querySelector("[data-menu]");
const closeButton = document.querySelector("[data-menu-close]");
let lastFocusedElement = null;

function openMenu() {
  if (!menu || !menuButton) return;
  lastFocusedElement = document.activeElement;
  menu.classList.add("open");
  menu.setAttribute("aria-hidden", "false");
  menuButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
  closeButton?.focus();
}

function closeMenu() {
  if (!menu || !menuButton) return;
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  lastFocusedElement?.focus();
}

menuButton?.addEventListener("click", openMenu);
closeButton?.addEventListener("click", closeMenu);
menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.classList.contains("open")) closeMenu();

  if (event.key === "Tab" && menu?.classList.contains("open")) {
    const focusable = [...menu.querySelectorAll("a, button")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach((otherVideo) => {
      if (otherVideo !== video) otherVideo.pause();
    });
  });
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
