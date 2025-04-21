// projects.js

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("show");
  });

  document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("show");
    });
  });

  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <div class="modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalContent = modal.querySelector(".modal-body");
  const closeBtn = modal.querySelector(".close-btn");

  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const imgSrc = card.querySelector("img").src;
      const desc = card.querySelector(".project-description").textContent;
      modalContent.innerHTML = `
        <img src="${imgSrc}" alt="Popup Image" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 1rem;">
        <p style="font-size: 1rem;">${desc}</p>
      `;
      modal.classList.add("show");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
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
