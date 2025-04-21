document.addEventListener("DOMContentLoaded", () => {
  // Init EmailJS
  emailjs.init("aEZoeDTxwgO0dwB39"); // ✅ Replace with your actual PUBLIC KEY

  // ===== HAMBURGER MENU =====
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

  // ===== FOOTER ICON TOGGLE =====
  const icons = document.querySelectorAll('.footer-icon');

  icons.forEach(icon => {
    icon.addEventListener("click", () => {
      const type = icon.dataset.type;
      const infoEl = document.getElementById(`footer-${type}`);

      document.querySelectorAll('.footer-info').forEach(el => {
        if (el !== infoEl) el.style.display = 'none';
      });

      if (infoEl) {
        infoEl.style.display = infoEl.style.display === 'inline' ? 'none' : 'inline';
      }
    });
  });

  // ===== FORM SUBMISSION =====
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.innerText = "Sending...";
      status.style.color = "gray";

      emailjs.sendForm("service_lp3d9ph", "template_6y4wpzr", this)
        .then(() => {
          status.innerText = "✅ Your message has been sent!";
          status.style.color = "green";
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS error:", error);
          status.innerText = "❌ Failed to send. Please try again.";
          status.style.color = "red";
        });
    });
  }
});
