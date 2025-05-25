/* ============================================================
   NAVBAR  (hamburger toggle for mobile)
   ============================================================ */
   document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');
  
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('show');
    });
  });
  
  /* ============================================================
     TESTIMONIALS  (form, grid, modal, delete-own)
     ============================================================ */
  (() => {
    /* ---------- DOM references ---------- */
    const reviewForm  = document.getElementById('reviewForm');
    const nameInput   = document.getElementById('name');
    const textInput   = document.getElementById('reviewText');
    const avatarInput = document.getElementById('avatar');
    const reviewsGrid = document.getElementById('reviewsDisplay');
  
    const modal       = document.getElementById('reviewModal');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalName   = document.getElementById('modalName');
    const modalText   = document.getElementById('modalText');
    const modalClose  = modal.querySelector('.close');
  
    /* ---------- Generate / retrieve this browser’s userId ---------- */
    const USER_KEY = 'ats-user-id';
    let userId = localStorage.getItem(USER_KEY);
    if (!userId) {
      userId = (crypto.randomUUID && crypto.randomUUID()) ||
               Math.random().toString(36).slice(2);
      localStorage.setItem(USER_KEY, userId);
    }
  
    /* ---------- Local-storage helpers ---------- */
    const STORAGE_KEY = 'ats-reviews';
    const readStored  = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const writeStored = data => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
    /* ---------- UPGRADE LEGACY REVIEWS ----------
       Any stored item saved before the delete-feature existed
       won’t have an `owner` field.  Tag it with our userId so
       we can see the ✕ button and delete it if we like.        */
    (function upgradeLegacy() {
      const stored = readStored();
      let changed = false;
  
      stored.forEach(r => {
        if (!('owner' in r)) {          // legacy item
          r.owner = userId;             // claim ownership
          changed = true;
        }
      });
  
      if (changed) writeStored(stored);
    })();
  
    /* ---------- Initial seed testimonials (no owner) ---------- */
    const starterReviews = [
      {
        name : 'Boutique Brand Owner',
        text : `They made our concept a reality. We went from a rough sketch to a polished clothing line in six weeks, and the fabrics feel as good as they look. Exceptional partnership!`
      },
      {
        name : 'Outdoor Gear Company',
        text : `Outstanding craftsmanship and attention to detail. The reinforced seams survived field-testing in the Andes with zero failures—huge win for our team.`
      },
      {
        name : 'Designer (Freelance)',
        text : `Custom orders handled with ease. Their sampling department tweaked my pattern three times with no fuss, and the final yardage matched the strike-off colour perfectly.`
      },
      {
        name : 'Luxury Hotel Group',
        text : `Perfect for our boutique brand. Guests comment on the softness of the new robes every single day. We’ll be re-ordering for our Bali property next quarter.`
      }
    ];
  
    /* ---------- Card factory ---------- */
    function createCard(review, storedIndex = null) {
      const { name, text, avatar, owner } = review;
  
      const card = document.createElement('div');
      card.className = 'review-card';
      card.dataset.index = storedIndex;          // null for starter items
  
      const h4 = document.createElement('h4');
      h4.textContent = name || 'Anonymous';
  
      const p  = document.createElement('p');
      p.textContent = text;
  
      card.append(h4, p);
  
      /* show delete button only for my own stored reviews */
      if (owner === userId && storedIndex !== null) {
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.title = 'Delete this review';
        delBtn.textContent = '✕';
  
        delBtn.addEventListener('click', e => {
          e.stopPropagation();          // keep modal from opening
          deleteReview(storedIndex);
        });
  
        card.appendChild(delBtn);
      }
  
      /* open modal on card click */
      card.addEventListener('click', () => {
        modalName.textContent = name || 'Anonymous';
        modalText.textContent = text;
  
        if (avatar) {
          modalAvatar.src = avatar;
          modalAvatar.style.display = 'block';
        } else {
          modalAvatar.style.display = 'none';
        }
  
        modal.classList.add('show');
      });
  
      reviewsGrid.appendChild(card);
    }
  
    /* ---------- render / re-render grid ---------- */
    function renderGrid() {
      reviewsGrid.innerHTML = '';
      const stored = readStored();               // newest first already
      stored.forEach((rev, idx) => createCard(rev, idx));
      starterReviews.forEach(createCard);
    }
  
    /* ---------- delete review ---------- */
    function deleteReview(index) {
      const stored = readStored();
      stored.splice(index, 1);
      writeStored(stored);
      renderGrid();
    }
  
    /* ---------- util: file → base64 ---------- */
    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror   = reject;
        reader.readAsDataURL(file);
      });
    }
  
    /* ---------- form submit ---------- */
    reviewForm.addEventListener('submit', async e => {
      e.preventDefault();
  
      const name = nameInput.value.trim() || 'Anonymous';
      const text = textInput.value.trim();
      if (!text) return;
  
      let avatar = '';
      if (avatarInput.files[0]) {
        try {
          avatar = await fileToBase64(avatarInput.files[0]);
        } catch (err) { console.warn('Avatar read error:', err); }
      }
  
      const stored = readStored();
      stored.unshift({ name, text, avatar, owner: userId, ts: Date.now() });
      writeStored(stored.slice(0, 25));          // keep latest 25
  
      renderGrid();            // show immediately
      reviewForm.reset();
    });
  
    /* ---------- modal close ---------- */
    modalClose.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('show');
    });
  
    /* ---------- kick things off ---------- */
    renderGrid();
  })();
  
  /* ============================================================
     FOOTER ICON TOGGLE
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.footer-icon');
  
    icons.forEach(icon => {
      icon.addEventListener('click', () => {
        const type   = icon.dataset.type;
        const infoEl = document.getElementById(`footer-${type}`);
  
        document.querySelectorAll('.footer-info').forEach(el => {
          if (el !== infoEl) el.style.display = 'none';
        });
  
        if (infoEl) {
          infoEl.style.display =
            infoEl.style.display === 'inline' ? 'none' : 'inline';
        }
      });
    });
  });
  
