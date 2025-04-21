document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("show");
      });
    });
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item, i) => {
    const button = item.querySelector(".faq-question");

    const icon = document.createElement("span");
    icon.className = "faq-toggle-icon";
    icon.textContent = i === 0 ? "▼" : "▶";
    icon.style.float = "right";
    button.appendChild(icon);

    if (i === 0) {
      item.classList.add("active");
    }

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach(faq => {
        faq.classList.remove("active");
        faq.querySelector(".faq-toggle-icon").textContent = "▶";
      });

      if (!isActive) {
        item.classList.add("active");
        icon.textContent = "▼";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll('.footer-icon');

  icons.forEach(icon => {
    icon.addEventListener("click", () => {
      const type = icon.dataset.type;
      const infoEl = document.getElementById(`footer-${type}`);

      // Hide all others
      document.querySelectorAll('.footer-info').forEach(el => {
        if (el !== infoEl) el.style.display = 'none';
      });

      // Toggle current
      if (infoEl) {
        infoEl.style.display = infoEl.style.display === 'inline' ? 'none' : 'inline';
      }
    });
  });
});
