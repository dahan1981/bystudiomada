const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const serviceItems = document.querySelectorAll("[data-service-item]");

serviceItems.forEach((item) => {
  const button = item.querySelector("[data-service-toggle]");
  const panel = button ? document.getElementById(button.getAttribute("aria-controls")) : null;

  if (!button || !panel) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
    item.classList.toggle("is-open", !isOpen);
  });
});
