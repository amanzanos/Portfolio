// app.js - interactions, theme toggle, animations, observers

// Theme toggle
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const pressed = themeToggle.getAttribute("aria-pressed") === "true";
    themeToggle.setAttribute("aria-pressed", String(!pressed));

    document.documentElement.style.transition =
      "background .5s ease, color .5s ease";

    if (!pressed) {
      // Light mode
      document.documentElement.style.setProperty("--bg", "#f7fafc");
      document.documentElement.style.setProperty("--text", "#061123");
      document.documentElement.style.setProperty(
        "--panel",
        "rgba(2,6,23,0.04)"
      );
    } else {
      // Dark mode
      document.documentElement.style.setProperty("--bg", "#0f172a");
      document.documentElement.style.setProperty("--text", "#e6eef8");
      document.documentElement.style.setProperty(
        "--panel",
        "rgba(255,255,255,0.03)"
      );
    }
  });
}

// Intersection Observer for animated bars
const bars = document.querySelectorAll(".bar");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const el = en.target.querySelector("i");
        const v = en.target.getAttribute("data-value") || 0;
        el.style.width = v + "%";
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.3 }
);

bars.forEach((b) => io.observe(b));

// Project keyboard preview
document.getElementById("projectsList")?.addEventListener("keydown", (e) => {
  const target = e.target.closest(".project");
  if (!target) return;

  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    alert(
      "Proyecto: " +
        target.querySelector(".title").textContent +
        "\n(Demo: abriría proyecto real en entorno de producción)"
    );
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Floating animation for images / UI blocks
document.querySelectorAll(".float").forEach((el, i) => {
  el.style.animation = `floatAnim ${4 + i}s ease-in-out infinite`;
});



document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-image");
  const dots = document.querySelectorAll(".dot");
  let current = 0;
  let interval = setInterval(nextSlide, 4000);

  function nextSlide() {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = parseInt(dot.dataset.index);
      slides[current].classList.add("active");
      dots[current].classList.add("active");
      clearInterval(interval);
      interval = setInterval(nextSlide, 4000);
    });
  });
});
