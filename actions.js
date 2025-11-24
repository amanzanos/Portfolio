
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.getElementById("hero-title");
  const text = "Hola — soy Alejandro…";
  let i = 0;
  let forward = true;

  function typeEffect() {
    if (forward) {
      heroTitle.innerHTML = text.substring(0, i + 1);
      i++;
      if (i === text.length) {
        forward = false;
        setTimeout(typeEffect, 1500);
        return;
      }
    } else {
      heroTitle.innerHTML = text.substring(0, i - 1);
      i--;
      if (i === 0) {
        forward = true;
        setTimeout(typeEffect, 500);
        return;
      }
    }
    setTimeout(typeEffect, 100);
  }
  typeEffect();

  // --- CAROUSEL ---
  const slides = document.querySelectorAll(".carousel-image");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 4000);

  function showSlide(index) {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = parseInt(dot.dataset.index);
      showSlide(currentSlide);
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 4000);
    });
  });

  // --- FLOATING ELEMENTS ---
  document.querySelectorAll(".float").forEach((el, i) => {
    el.style.animation = `floatAnim ${4 + i}s ease-in-out infinite`;
  });

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // --- INTERSECTION OBSERVER: BARS ---
  const bars = document.querySelectorAll(".bar");
  const barObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target.querySelector("i");
          const value = entry.target.dataset.value || 0;
          el.style.width = value + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((b) => barObserver.observe(b));

  // --- PROJECTS KEYBOARD ACCESS ---
  document.getElementById("projectsList")?.addEventListener("keydown", (e) => {
    if (["Enter", " "].includes(e.key)) {
      const project = e.target.closest(".project");
      if (!project) return;
      e.preventDefault();
      alert(
        "Proyecto: " +
          project.querySelector(".title").textContent +
          "\n(Demo: abriría proyecto real en entorno de producción)"
      );
    }
  });

  // --- MODALS ---
  const phoneModal = document.getElementById("phoneModal");
  const phoneBtn = document.getElementById("phoneBtn");
  const modals = [phoneModal];

  phoneBtn?.addEventListener("click", () => (phoneModal.style.display = "block"));

  modals.forEach((modal) => {
    modal.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
});

// ==============================
// THEME TOGGLE
// ==============================
const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", () => {
  const isPressed = themeToggle.getAttribute("aria-pressed") === "true";
  themeToggle.setAttribute("aria-pressed", String(!isPressed));

  document.documentElement.style.transition = "background .5s ease, color .5s ease";

  if (!isPressed) {
    // Light mode
    document.documentElement.style.setProperty("--bg", "#f7fafc");
    document.documentElement.style.setProperty("--text", "#061123");
    document.documentElement.style.setProperty("--panel", "rgba(2,6,23,0.04)");
  } else {
    // Dark mode
    document.documentElement.style.setProperty("--bg", "#0f172a");
    document.documentElement.style.setProperty("--text", "#e6eef8");
    document.documentElement.style.setProperty("--panel", "rgba(255,255,255,0.03)");
  }
});

// ==============================
// HAMBURGER NAVIGATION
// ==============================
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mainNav = document.querySelector(".main-nav");
const navCloseBtn = document.querySelector(".nav-close");

hamburgerBtn?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("show");
  hamburgerBtn.setAttribute("aria-expanded", isOpen);
});

navCloseBtn?.addEventListener("click", () => {
  mainNav.classList.remove("show");
  hamburgerBtn.setAttribute("aria-expanded", false);

  // Reset hamburger animation
  if (hamburgerBtn.children.length >= 3) {
    hamburgerBtn.children[0].style.transform = "rotate(0) translateY(0)";
    hamburgerBtn.children[1].style.opacity = "1";
    hamburgerBtn.children[2].style.transform = "rotate(0) translateY(0)";
  }
});
