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
  
  // Initialize EmailJS
document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("service_lp3d9ph"); // Replace with your EmailJS public key
  
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
  
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("show");
    });
  
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburger.classList.remove("active");
      });
    });
  
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
  });
  
  // Handle contact form submit
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    emailjs.sendForm("service_lp3d9ph", "template_6y4wpzr", from, "aEZoeDTxwgO0dwB39")
      .then(() => {
        document.getElementById("form-status").textContent = "✅ Message sent successfully!";
        this.reset();
      }, (err) => {
        document.getElementById("form-status").textContent = "❌ Failed to send message.";
        console.error("EmailJS error:", err);
      });
  });
  