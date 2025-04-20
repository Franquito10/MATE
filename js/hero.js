window.addEventListener("load", () => {
    const slides = document.querySelectorAll(".hero-slide");
    const nextBtn = document.querySelector(".hero-next");
    const prevBtn = document.querySelector(".hero-prev");
  
    let currentSlide = 0;
    const intervalTime = 8000;
    let slideInterval;
  
    function showSlide(index) {
      slides.forEach((slide) => {
        slide.classList.remove("active");
        gsap.set(slide, { clearProps: "all" });
      });
  
      const activeSlide = slides[index];
      const image = activeSlide.querySelector(".hero-image");
      const text = activeSlide.querySelector(".hero-text-float");
  
      activeSlide.classList.add("active");
  
      gsap.fromTo(image,
        { scale: 1 },
        { scale: 1.07, duration: 7, ease: "power2.out" }
      );
  
      gsap.fromTo(text,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.4 }
      );
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetInterval();
    });
  
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetInterval();
    });
  
    function startInterval() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
  
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }
  
    showSlide(currentSlide);
    startInterval();
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".hero-slide");
    const prevBtn = document.querySelector(".hero-prev");
    const nextBtn = document.querySelector(".hero-next");
    let currentSlide = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
      });
  
      slides[index].classList.add("active");
      updateHeroImages(); // ✅ dentro de showSlide también
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
  
    showSlide(currentSlide);     // ✅ inicial
    updateHeroImages();          // ✅ inicial también
  
    setInterval(nextSlide, 8000); // cada 8 segundos
  });
  
  // ✅ afuera del DOMContentLoaded:
  function updateHeroImages() {
    const isMobile = window.innerWidth <= 768;
  
    document.querySelectorAll(".hero-slide").forEach(slide => {
      const desktopImage = slide.querySelector(".hero-image");
      const mobileImage = slide.querySelector(".hero-image-mobile");
  
      if (isMobile) {
        if (desktopImage) desktopImage.style.display = "none";
        if (mobileImage) mobileImage.style.display = "block";
      } else {
        if (desktopImage) desktopImage.style.display = "block";
        if (mobileImage) mobileImage.style.display = "none";
      }
    });
  }
  
  window.addEventListener("resize", updateHeroImages); // ✅ escúchalo siempre
  