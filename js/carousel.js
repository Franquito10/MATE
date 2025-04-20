document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const cards = document.querySelectorAll(".bici-card");
    const prevBtn = document.querySelector(".bike-carousel-btn.prev");
    const nextBtn = document.querySelector(".bike-carousel-btn.next");
  
    const cardWidth = cards[0].offsetWidth + 32;
    let currentIndex = 0;
  
    function updateCarousel() {
      const maxIndex = cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth);
      const clampedIndex = Math.min(currentIndex, maxIndex);
      const offset = clampedIndex * cardWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }
  
    nextBtn.addEventListener("click", () => {
      if (currentIndex < cards.length - 1) currentIndex++;
      updateCarousel();
    });
  
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) currentIndex--;
      updateCarousel();
    });
  
    window.addEventListener("resize", updateCarousel);
  });
  