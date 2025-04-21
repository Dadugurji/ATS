// reviews.js

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const reviewForm = document.getElementById("reviewForm");
    const nameInput = document.getElementById("name");
    const textInput = document.getElementById("reviewText");
    const reviewsContainer = document.getElementById("reviewsDisplay");
  
    // Toggle mobile navbar
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("show");
    });
  
    // Fake base reviews
    const baseReviews = [
      "Outstanding craftsmanship and attention to detail.",
      "Delivered on time and above expectations.",
      "Great customer support!",
      "Reliable and consistent service.",
      "Textiles are premium quality.",
      "Very creative and helpful team.",
      "Highly recommend their expertise.",
      "Their patterns are unique and beautiful.",
      "Fantastic to work with!",
      "Professional communication throughout.",
      "Perfect for our boutique brand.",
      "Very adaptive to changes.",
      "Speedy turnaround time.",
      "Incredible fabric design work!",
      "Loved the sustainable options.",
      "Exceeded my expectations.",
      "Remarkable stitch work.",
      "Modern and classy finishes.",
      "Reliable supplier every time.",
      "Impressive product knowledge.",
      "Custom orders handled with ease.",
      "Amazing flexibility with our timeline.",
      "Loved working with this team!",
      "Great value for price.",
      "Effortless coordination on large order.",
      "Smooth experience from start to finish.",
      "The best in textile customizations.",
      "Beautiful color matching service.",
      "Even small batches were treated seriously.",
      "A+ for textile branding assistance.",
      "We saw real results in our clothing line.",
      "They care about your vision.",
      "Design revisions were super fast.",
      "Really passionate experts.",
      "Quick sampling, no compromise on quality.",
      "Always honest and clear.",
      "Textile patterns were stunning.",
      "Polite and knowledgeable staff.",
      "I’m now a repeat customer.",
      "The final product blew us away.",
      "They made our concept a reality.",
      "Couldn't be more pleased!",
      "Top-tier sourcing and delivery.",
      "Our customers noticed the difference.",
      "The texture is just perfect.",
      "Zero hassle and top-notch service.",
      "Will recommend to industry peers.",
      "Friendly, focused, and flexible.",
      "Can’t wait to work with them again."
    ];
  
    // Load saved user reviews from localStorage
    let userReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  
    // Combine both
    function getAllReviews() {
      return [...userReviews.map(r => `"${r.text}" – ${r.name}`), ...baseReviews];
    }
  
    // Pick random n from full list
    function getRandomSubset(list, count) {
      return [...list].sort(() => 0.5 - Math.random()).slice(0, count);
    }
  
    // Render 4 reviews with animation
    function renderReviews(batch) {
      const current = reviewsContainer.querySelectorAll(".review-box");
      current.forEach(box => box.classList.remove("show"));
  
      setTimeout(() => {
        reviewsContainer.innerHTML = "";
        batch.forEach(text => {
          const div = document.createElement("div");
          div.className = "review-box";
          div.textContent = text;
          reviewsContainer.appendChild(div);
          requestAnimationFrame(() => div.classList.add("show"));
        });
      }, 400); // Matches CSS fade-out
    }
  
    // Rotate reviews every 5s
    function cycleReviews() {
      const all = getAllReviews();
      const subset = getRandomSubset(all, 4);
      renderReviews(subset);
    }
  
    // First load
    cycleReviews();
    setInterval(cycleReviews, 5000);
  
    // Handle user review submission
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = nameInput.value.trim();
      const text = textInput.value.trim();
      if (!name || !text) return;
  
      // Save to localStorage
      userReviews.unshift({ name, text });
      userReviews = userReviews.slice(0, 10);
      localStorage.setItem("reviews", JSON.stringify(userReviews));
  
      // Show immediately in next batch
      cycleReviews();
  
      reviewForm.reset();
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
  