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

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

if (contactForm && formStatus) {
  contactForm.querySelectorAll('input[name="interests"]').forEach((input) => {
    input.addEventListener("change", () => {
      input.closest("label").classList.toggle("is-selected", input.checked);
    });
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const formData = new FormData(contactForm);
    const interests = formData.getAll("interests");

    formStatus.classList.remove("is-error");

    if (!interests.length) {
      formStatus.textContent = "Escolha pelo menos uma opção em Estou procurando.";
      formStatus.classList.add("is-error");
      return;
    }

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      interests,
    };

    submitButton.disabled = true;
    formStatus.textContent = "Enviando mensagem...";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Não foi possível enviar sua mensagem.");
      }

      contactForm.reset();
      formStatus.textContent = "Mensagem enviada. Em breve entraremos em contato.";
    } catch (error) {
      formStatus.textContent = error.message;
      formStatus.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
    }
  });
}
