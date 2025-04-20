document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.from(".bici-card", {
      opacity: 0,
      y: 80,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".bici-card",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  
    gsap.to(".hero-slide", {
      scale: 1.1,
      scrollTrigger: {
        trigger: ".hero",
        scrub: true
      }
    });
  
    const cards = document.querySelectorAll(".bici-card");
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  });
  
  document.querySelectorAll('[data-gsap]').forEach((el, index) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: index * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      }
    });
  });
  gsap.registerPlugin(ScrollTrigger);

gsap.from(".feature-item", {
  scrollTrigger: {
    trigger: ".feature-grid",
    start: "top 80%",
  },
  y: 50,
  opacity: 0,
  scale: 0.9,
  duration: 1,
  ease: "power4.out",
  stagger: 0.15,
});
document.querySelectorAll(".feature-icon i").forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, { rotation: 20, yoyo: true, repeat: 1, duration: 0.2 });
  });
});
gsap.from(".section-description", {
  opacity: 0,
  y: 20,
  duration: 1.2,
  delay: 0.4,
  ease: "power2.out",
});



gsap.from(".hero-impact-img", {
  scrollTrigger: {
    trigger: ".hero-impact",
    start: "top bottom",
    scrub: true
  },
  scale: 1.08,
  filter: "blur(4px)",
  duration: 2
});
gsap.from(".section-divider", {
  scrollTrigger: {
    trigger: ".section-divider",
    start: "top 90%",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out",
});
