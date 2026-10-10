const modal = document.getElementById("reservationModal");
const buttons = document.querySelectorAll("[data-open-reservation]");
const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.getElementById("siteMenu");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      alert("Funcionalidade não disponível neste momento.");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.open) {
    modal.close();
  }

  if (event.key === "Escape" && siteMenu?.classList.contains("is-open")) {
    siteMenu.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

menuToggle?.addEventListener("click", () => {
  const isOpen = siteMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu = siteMenu?.contains(event.target);
  const clickedToggle = menuToggle?.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle && siteMenu?.classList.contains("is-open")) {
    siteMenu.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

siteMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteMenu.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
