const carouselImages = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images img");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;

function updateCarousel() {
  const imageWidth = images[0].clientWidth;
  carouselImages.style.transform = `translateX(-${currentIndex * imageWidth }px)`;
}

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
