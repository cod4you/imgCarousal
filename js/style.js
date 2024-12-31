const carouselImages = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images img");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;
let autoSlideInterval;
let isSliding = true; // To track whether auto-sliding is active

function updateCarousel() {
  const imageWidth = images[0].clientWidth;
  carouselImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// Function to start the auto-slide
function startAutoSlide() {
  if (isSliding) {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    }, 3000); // Change slide every 3 seconds
  }
}

// Stop the auto-slide when user interacts (click/swipe)
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
  isSliding = false; // Disable auto-sliding once user interacts
}

// Next button click event
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
  stopAutoSlide(); // Stop auto-sliding when manually navigated
});

// Previous button click event
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
  stopAutoSlide(); // Stop auto-sliding when manually navigated
});

// Resize window and update carousel position
window.addEventListener("resize", updateCarousel);

// Touch or swipe event to navigate images
let touchStartX = 0;

carouselImages.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

carouselImages.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const threshold = 50; // Minimum swipe distance

  if (touchStartX - touchEndX > threshold) {
    // Swipe left (next image)
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
    stopAutoSlide(); // Stop auto-sliding when manually navigated
  } else if (touchEndX - touchStartX > threshold) {
    // Swipe right (previous image)
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
    stopAutoSlide(); // Stop auto-sliding when manually navigated
  }
});

// Start the auto-sliding when the page loads
startAutoSlide();

