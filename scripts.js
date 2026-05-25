  const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const links = document.querySelectorAll(".nav-links a");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");

        links.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      });
    });