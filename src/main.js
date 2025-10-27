// Image data - list of all photos
const images = [
  "IMG_3893.jpeg",
  "IMG_3894 2.jpeg",
  "IMG_3895 2.jpeg",
  "IMG_3896 2.jpeg",
  "IMG_3897 2.jpeg",
  "IMG_3900.jpeg",
  "IMG_3901.jpeg",
  "IMG_3903.jpeg",
  "IMG_3904.jpeg",
];

let currentImageIndex = 0;

// Initialize lightbox gallery
document.addEventListener("DOMContentLoaded", function () {
  initLightboxGallery();
});

// Lightbox Gallery Implementation
function initLightboxGallery() {
  const grid = document.querySelector(".grid");

  // Create thumbnail grid
  images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = `./photos/${image}`;
    img.alt = `Appartement photo ${index + 1}`;
    img.className =
      "w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity";
    img.dataset.index = index;

    img.addEventListener("click", () => openLightbox(index));
    grid.appendChild(img);
  });

  // Lightbox modal functionality
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  function openLightbox(index) {
    currentImageIndex = index;
    modalImg.src = `./photos/${images[index]}`;
    modalImg.alt = `Appartement photo ${index + 1}`;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    modalImg.src = `./photos/${images[currentImageIndex]}`;
    modalImg.alt = `Appartement photo ${currentImageIndex + 1}`;
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    modalImg.src = `./photos/${images[currentImageIndex]}`;
    modalImg.alt = `Appartement photo ${currentImageIndex + 1}`;
  }

  // Event listeners
  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrevImage();
      if (e.key === "ArrowRight") showNextImage();
    }
  });

  // Touch/swipe support
  let startX = 0;
  let startY = 0;

  modal.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  modal.addEventListener("touchend", (e) => {
    if (!modal.classList.contains("hidden")) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          showNextImage();
        } else {
          showPrevImage();
        }
      }
    }
  });
}
