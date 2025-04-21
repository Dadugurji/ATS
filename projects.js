document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".project-card");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImg = document.getElementById("modal-img");
    const modalDesc = document.getElementById("modal-desc");
    const modalClose = document.getElementById("modal-close");
  
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const title = card.getAttribute("data-title");
        const description = card.getAttribute("data-description");
        const imgSrc = card.querySelector("img").getAttribute("src");
  
        modalTitle.textContent = title;
        modalImg.src = imgSrc;
        modalDesc.textContent = description;
  
        modal.style.display = "flex";
      });
    });
  
    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", e => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Hamburger toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("show");
      });
    }
  });
  
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  })

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
  