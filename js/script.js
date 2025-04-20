window.addEventListener('load', () => {

    gsap.from(".hero-text .btn", {
      duration: 1,
      y: 40,
      opacity: 0,
      delay: 0.6,
      ease: "power1.out"
    });
  });
  
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const closeMenuBtn = document.getElementById('close-menu');
  const navMenu = document.getElementById('nav-menu');
  const overlay = document.getElementById('overlay');
  
  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  closeMenuBtn.addEventListener('click', () => {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  overlay.addEventListener('click', () => {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
    gsap.registerPlugin(ScrollTrigger);
      gsap.from(".section-title", {
        scrollTrigger: ".section-title",
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

  });

    gsap.to(".bike-3d-wrapper", {
    y: -10,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 3
  });

  let currentSlide = 0;

  
  // Header scroll effect
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
   });

  
  // Form submission (prevent default for demo)
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        const formElements = contactForm.elements;
        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].type !== 'submit') {
            formElements[i].value = '';
          }
        }
        
        submitBtn.textContent = '¡Mensaje enviado!';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
  
  // Testimonial slider (simple version)
  const testimonials = [
    {
      text: "Desde que tengo mi MATE Blanca mi vida cambió por completo. Llego al trabajo sin transpirar, ahorro en transporte y además contribuyo al medio ambiente. ¡La mejor inversión que hice en años!",
      name: "Martina Rodríguez",
      position: "Diseñadora Gráfica"
    },
    {
      text: "Mi MATE negra es mi compañera diaria. La potencia y autonomía son increíbles, puedo hacer todos mis recorridos de trabajo sin problemas. Además, el servicio post-venta es excelente.",
      name: "Lucas Gómez",
      position: "Arquitecto"
    },
    {
      text: "Buscaba una alternativa ecológica para moverme y encontré mucho más. Mi MATE verde no solo es sustentable sino que es un objeto de diseño que todos me preguntan dónde la compré.",
      name: "Carolina Torres",
      position: "Profesora universitaria"
    }
  ];

  const bike3D = document.querySelector(".bike-3d-wrapper");

const revealBike = () => {
  const trigger = window.innerHeight * 0.8;
  const bikeTop = bike3D.getBoundingClientRect().top;

  if (bikeTop < trigger) {
    gsap.fromTo(bike3D, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
    window.removeEventListener("scroll", revealBike);
  }
};

window.addEventListener("scroll", revealBike);
window.addEventListener("load", revealBike);

  
  const testimonialContainer = document.querySelector('.testimonial-item');
  let currentTestimonial = 0;
  
  function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    
    testimonialContainer.style.opacity = '0';
    
    setTimeout(() => {
      testimonialContainer.innerHTML = `
        <p class="testimonial-text">${testimonial.text}</p>
        <div class="testimonial-author">
          <div class="author-image">
            <img src="/api/placeholder/80/80" alt="Foto de cliente">
          </div>
          <div class="author-info">
            <h4>${testimonial.name}</h4>
            <p>${testimonial.position}</p>
          </div>
        </div>
      `;
      
      testimonialContainer.style.opacity = '1';
    }, 500);
    
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  }
  
  // Change testimonial every 5 seconds
  setInterval(updateTestimonial, 5000);
  
  // Animate elements when they enter the viewport
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-item, .model-card, .section-title, .cta-title, .contact-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;
      
      if (elementPosition < screenPosition - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.feature-item, .model-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });
  
  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Add hover effect to social icons
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseover', function() {
      this.style.animation = 'pulse 1.5s infinite';
    });
    
    link.addEventListener('mouseout', function() {
      this.style.animation = 'none';
    });
  });

  const featureItems = document.querySelectorAll('.feature-item');

function revealOnScroll() {
const triggerBottom = window.innerHeight * 0.85;

featureItems.forEach(item => {
  const boxTop = item.getBoundingClientRect().top;

  if (boxTop < triggerBottom) {
    item.classList.add('visible');
  }
});
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
am


gsap.from('.hero-text p', {
duration: 1,
y: 40,
opacity: 0,
delay: 0.4,
ease: 'power2.out'
});

gsap.to(".model-card", {
scale: 1.03,
duration: 0.4,
ease: "power2.out",
scrollTrigger: {
  trigger: ".model-card",
  start: "top 90%",
  toggleActions: "play none none reverse"
}
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;
  const interval = 6000; // 6 segundos entre imágenes

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Inicial
  showSlide(currentSlide);
  setInterval(nextSlide, interval);
});

