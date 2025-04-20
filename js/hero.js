document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const nextBtn = document.querySelector(".hero-arrow-next");
  const prevBtn = document.querySelector(".hero-arrow-prev");
  let currentSlide = 0;
  const intervalTime = 8000;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
      gsap.set(slide, { clearProps: "all" }); // limpia props previos
    });

    const activeSlide = slides[index];
    const image = activeSlide.querySelector(".hero-image");
    const text = activeSlide.querySelector(".hero-text-float");

    activeSlide.classList.add("active");

    // Animación zoom imagen
    gsap.fromTo(image,
      { scale: 1 },
      { scale: 1.07, duration: 7, ease: "power2.out" }
    );

    // Animación entrada de texto
    gsap.fromTo(text,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.4 }
    );

    updateHeroImages(); // oculta o muestra imagen mobile
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  // Eventos flechas
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  // Responsive imágenes
  function updateHeroImages() {
    const isMobile = window.innerWidth <= 768;
  
    document.querySelectorAll(".hero-slide").forEach(slide => {
      const desktopImage = slide.querySelector(".hero-image");
      const mobileImage = slide.querySelector(".hero-image-mobile");
  
      if (desktopImage && mobileImage) {
        if (isMobile) {
          desktopImage.style.display = "none";
          mobileImage.style.display = "block";
        } else {
          desktopImage.style.display = "block";
          mobileImage.style.display = "none";
        }
      }
    });
  }
  

    window.addEventListener("resize", updateHeroImages);

    // Init
    showSlide(currentSlide);
    startInterval();
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Elimina cualquier botón del carrusel 3D que accidentalmente se haya renderizado arriba del Hero
    const rogueBtns = document.querySelectorAll(".carousel3d__btn");

    rogueBtns.forEach((btn) => {
      if (btn.closest(".hero")) {
        btn.remove();
      }
    });
  });
