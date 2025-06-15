function toggleMenu() {
  document.querySelector('.menu').classList.toggle('active');
}


let currentImageIndex = 0;
let galleryImages = [];

function openLightbox(img) {
  galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
  currentImageIndex = galleryImages.indexOf(img);
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function nextImage(e) {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentImageIndex].src;
}

function prevImage(e) {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentImageIndex].src;
}


function showThankYou(event) {
  event.preventDefault(); // Page reload से रोकता है
  
  // Message दिखाओ
  document.getElementById("thank-you-message").style.display = "block";
  
  // Form reset करो
  event.target.reset();
  
  // 5 सेकंड बाद message hide कर दो (optional)
  setTimeout(() => {
    document.getElementById("thank-you-message").style.display = "none";
  }, 5000);
}

fetch('https://docs.google.com/spreadsheets/d/1nur6xDl8IcXmNi9U5H8uJSvjQgLA0cghh_tH9EMS5ew/gviz/tq?tqx=out:json')
  .then(res => res.text())
  .then(data => {
    const json = JSON.parse(data.substring(47).slice(0, -2));
    const rows = json.table.rows;
    
    const list = document.getElementById('notice-list');
    list.innerHTML = ''; // पहले से मौजूद "Loading..." को हटाएं
    
    // ⛔ पहली row को skip करते हैं (index = 0)
    rows.slice(1).forEach(row => {
      const cell = row.c[0];
      if (cell && cell.v) {
        const li = document.createElement('li');
        li.textContent = cell.v.trim();
        list.appendChild(li);
      }
    });
  })
  .catch(error => {
    document.getElementById('notice-list').innerHTML = "<li>Failed to load notices.</li>";
    console.error("Error loading notice:", error);
  });