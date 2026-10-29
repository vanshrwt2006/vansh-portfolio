/**
 * Portfolio JavaScript - Vansh Rawat (Full Stack Developer / B.Tech CSE)
 * Features:
 *  - Theme Toggle (Dark / Light with LocalStorage persistence)
 *  - Typewriter Animation
 *  - Responsive Mobile Navigation
 *  - Active Section Scroll Spy
 *  - Project Category Filter
 *  - 1-Click Copy Contact info with Toast Notification
 *  - Interactive Contact Form with Validation
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTypewriter();
  initMobileNav();
  initScrollSpy();
  initProjectFilters();
  initCopyButtons();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");

  // Read saved theme or system preference
  const savedTheme = localStorage.getItem("portfolio_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const activeTheme = savedTheme || (prefersDark ? "dark" : "light");
  applyTheme(activeTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("portfolio_theme", newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (sunIcon) sunIcon.style.display = "block";
      if (moonIcon) moonIcon.style.display = "none";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "block";
    }
  }
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typedTarget = document.getElementById("typedTarget");
  if (!typedTarget) return;

  const words = [
    "Full Stack Java Developer",
    "Spring Boot & REST API Builder",
    "B.Tech CSE Graduate / SDE Aspirant",
    "DSA & Problem Solver (Java)"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseTime = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isExpanded = navLinks.classList.contains("open");
      toggleBtn.setAttribute("aria-expanded", isExpanded);
    });

    // Close menu when a link is clicked
    links.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. Scroll Spy (Active Navigation Indicator)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   5. Project Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active button state
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const categories = card.getAttribute("data-category") || "";
        if (selectedCategory === "all" || categories.includes(selectedCategory)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 20);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. 1-Click Copy Buttons (Email / Phone) with Toast Feedback
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll(".copy-btn");

  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        showToast(`Copied "${textToCopy}" to clipboard!`);

        setTimeout(() => {
          btn.textContent = originalText;
        }, 2200);
      }).catch(() => {
        showToast("Press Ctrl+C to copy");
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("senderName").value.trim();
    const email = document.getElementById("senderEmail").value.trim();
    const message = document.getElementById("senderMessage").value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate backend submission or open mail client
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      showToast("Thank you, " + name + "! Message sent successfully.");
      form.reset();
    }, 900);
  });
}

/* --------------------------------------------------------------------------
   Toast Notification Utility
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

