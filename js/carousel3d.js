document.addEventListener("DOMContentLoaded", () => {
  const items = gsap.utils.toArray(".carousel3d__item");
  const prevBtn = document.querySelector(".carousel3d__btn.prev");
  const nextBtn = document.querySelector(".carousel3d__btn.next");
  const totalItems = items.length;
  let currentIndex = 0;
  let isAnimating = false;

  // Set initial positions for a more dynamic appearance
  function initializeCarousel() {
    items.forEach((item, i) => {
      // Calculate initial position - staggered for better visual
      const initialPosition = i - Math.floor(totalItems / 2);
      const initialX = initialPosition * 300;
      
      gsap.set(item, {
        x: initialX,
        opacity: i === Math.floor(totalItems / 2) ? 1 : 0.1,
        scale: i === Math.floor(totalItems / 2) ? 1 : 0.7,
        filter: i === Math.floor(totalItems / 2) ? "none" : "grayscale(100%) blur(2px)",
        zIndex: totalItems - Math.abs(initialPosition)
      });
    });
    
    // Set initial current index
    currentIndex = Math.floor(totalItems / 2);
    updateCarouselClasses();
  }

  function updateCarouselClasses() {
    // Remove all classes first
    items.forEach(item => {
      item.classList.remove("is-center", "is-left", "is-right");
    });

    // Calculate indices with modulo for proper wrapping
    const centerIndex = currentIndex;
    const leftIndex = (currentIndex - 1 + totalItems) % totalItems;
    const rightIndex = (currentIndex + 1) % totalItems;
    
    // Add appropriate classes
    items[centerIndex].classList.add("is-center");
    items[leftIndex].classList.add("is-left");
    items[rightIndex].classList.add("is-right");
  }

  function updateCarousel() {
    if (isAnimating) return;
    isAnimating = true;
  
    const centerIndex = currentIndex;
    const leftIndex = (currentIndex - 1 + totalItems) % totalItems;
    const rightIndex = (currentIndex + 1) % totalItems;
  
    items.forEach((item, i) => {
      item.classList.remove("is-center", "is-left", "is-right");
  
      const isCurrent = i === centerIndex;
      const isLeft = i === leftIndex;
      const isRight = i === rightIndex;
  
      if (isCurrent) item.classList.add("is-center");
      else if (isLeft) item.classList.add("is-left");
      else if (isRight) item.classList.add("is-right");
  
      const x = isCurrent ? 0 : isLeft ? -520 : isRight ? 520 : 0;
      const scale = isCurrent ? 1.035 : isLeft || isRight ? 0.85 : 0.5;
      const opacity = isCurrent ? 1 : isLeft || isRight ? 0.25 : 0;
      const z = isCurrent ? 3 : isLeft || isRight ? 2 : 1;
      const filter = isCurrent ? "none" : "grayscale(100%) blur(2px)";
  
      gsap.to(item, {
        x,
        scale,
        opacity,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: () => {
          item.style.zIndex = z;
          item.style.filter = filter;
        }
      });
    });
  
    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }
  
  
  

  function rotate(direction = 1) {
    if (isAnimating) return;
  
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
  
    // Agregamos feedback visual leve al botón
    const btn = direction > 0 ? nextBtn : prevBtn;
    gsap.fromTo(btn, { scale: 1 }, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  
    updateCarousel();
  }
  

  // Button click events
  prevBtn.addEventListener("click", () => rotate(-1));
  nextBtn.addEventListener("click", () => rotate(1));

  // Touch/swipe support with improved sensitivity
  let startX = 0;
  let isDragging = false;
  const carousel = document.querySelector(".carousel3d");
  const dragThreshold = 30; // Lower threshold for easier swiping

  // Mouse events
  carousel.addEventListener("mousedown", (e) => {
    if (isAnimating) return;
    isDragging = true;
    startX = e.clientX;
    carousel.style.cursor = "grabbing";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.style.cursor = "grab";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > dragThreshold) {
      rotate(deltaX > 0 ? -1 : 1);
      isDragging = false;
    }
  });

  // Touch events for mobile
  carousel.addEventListener("touchstart", (e) => {
    if (isAnimating) return;
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", () => {
    isDragging = false;
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > dragThreshold) {
      rotate(deltaX > 0 ? -1 : 1);
      isDragging = false;
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (isAnimating) return;
    if (e.key === "ArrowLeft") {
      rotate(-1);
    } else if (e.key === "ArrowRight") {
      rotate(1);
    }
  });

  // Auto rotate with slow speed for showroom effect
  let autoRotateInterval;
  
  function startAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
      if (!document.hidden) {
        rotate(1);
      }
    }, 7000); // Very slow rotation - 7 seconds
  }

  // Pause auto-rotation when user interacts
  carousel.addEventListener("mouseenter", () => {
    clearInterval(autoRotateInterval);
  });

  carousel.addEventListener("mouseleave", () => {
    startAutoRotate();
  });

  // Pause when document not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(autoRotateInterval);
    } else {
      startAutoRotate();
    }
  });

  // Initialize carousel
  initializeCarousel();
  updateCarousel();
  startAutoRotate();
});