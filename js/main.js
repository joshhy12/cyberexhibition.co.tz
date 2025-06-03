// Main JavaScript

// Variables
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const registrationForm = document.getElementById('registration-form');
const contactForm = document.getElementById('contact-form');

// Navigation toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Scroll event listener
window.addEventListener('scroll', () => {
  // Change header background on scroll
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/hide back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
  
  // Update active nav link based on scroll position
  updateActiveNavLink();
  
  // Check if elements are in viewport for animations
  animateOnScroll();
});

// Back to top button
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Animate elements when they enter the viewport
function animateOnScroll() {
  const fadeElements = document.querySelectorAll('.fade-in');
  const slideElements = document.querySelectorAll('.slide-in');
  const titleElements = document.querySelectorAll('.title-animation, .subtitle-animation, .description-animation');
  
  // Function to check if element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
  };
  
  // Animate fade-in elements
  fadeElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('active');
    }
  });
  
  // Animate slide-in elements
  slideElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('active');
    }
  });
  
  // Animate title elements
  titleElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('active');
    }
  });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    animateOnScroll();
  }, 100);
  
  // Add event listeners for forms
  setupForms();
});

// Setup form submissions
function setupForms() {
  // Workshop registration form
  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const submitButton = registrationForm.querySelector('button[type="submit"]');
      submitButton.innerHTML = 'Submitting...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        // Show success message
        registrationForm.innerHTML = `
          <div class="success-message">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Registration Successful!</h3>
            <p>Thank you for registering. We'll send you a confirmation email with all the details.</p>
          </div>
        `;
      }, 1500);
    });
  }
  
  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        // Show success message
        contactForm.innerHTML = `
          <div class="success-message">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Message Sent!</h3>
            <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
          </div>
        `;
      }, 1500);
    });
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});