const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");
const currentYear = document.getElementById("currentYear");

function setMenuState(isOpen) {
  if (!hamburger || !navLinks) {
    return;
  }

  hamburger.classList.toggle("active", isOpen);
  navLinks.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
}

function setActiveLink(id) {
  links.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (hamburger && navLinks && links.length > 0) {
  hamburger.addEventListener("click", () => {
    const isOpen = !navLinks.classList.contains("open");
    setMenuState(isOpen);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href")?.slice(1);

      setMenuState(false);

      if (targetId) {
        setActiveLink(targetId);
      }
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      setMenuState(false);
      hamburger.focus();
    }
  });
}

if (sections.length > 0 && links.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleSection?.target?.id) {
        setActiveLink(visibleSection.target.id);
      }
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.2, 0.4, 0.6]
    }
  );

  sections.forEach((section) => observer.observe(section));
}
