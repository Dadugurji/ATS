document.addEventListener("DOMContentLoaded", () => {
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
  