// Animations and visual effects

document.addEventListener('DOMContentLoaded', function() {
  // Counter animation for statistics
  function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(number => {
      const target = parseInt(number.getAttribute('data-count'));
      const duration = 2000; // ms
      const frameDuration = 16; // ms per frame
      const totalFrames = Math.round(duration / frameDuration);
      const increment = target / totalFrames;
      
      let currentCount = 0;
      let frame = 0;
      
      const counter = setInterval(() => {
        frame++;
        currentCount += increment;
        
        if (frame === totalFrames) {
          number.textContent = target;
          clearInterval(counter);
        } else {
          number.textContent = Math.floor(currentCount);
        }
      }, frameDuration);
    });
  }
  
  // Initialize animated shield effect
  function initShieldAnimation() {
    const shield = document.querySelector('.animated-shield');
    if (!shield) return;
    
    // Add glow effect
    const glowEffect = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    glowEffect.setAttribute('id', 'glow');
    
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '2.5');
    feGaussianBlur.setAttribute('result', 'coloredBlur');
    
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode1.setAttribute('in', 'coloredBlur');
    const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    feMergeNode2.setAttribute('in', 'SourceGraphic');
    
    feMerge.appendChild(feMergeNode1);
    feMerge.appendChild(feMergeNode2);
    glowEffect.appendChild(feGaussianBlur);
    glowEffect.appendChild(feMerge);
    
    shield.appendChild(glowEffect);
    shield.querySelectorAll('path').forEach(path => {
      path.setAttribute('filter', 'url(#glow)');
    });
  }
  
  // Add parallax effect to hero section
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
  }
  
  // Add intersection observer for scroll animations
  function initIntersectionObserver() {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    
    if (!elements.length) return;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Initialize all animations
  function initAllAnimations() {
    // Delay the animations to ensure they start after page load
    setTimeout(() => {
      initCounters();
      initShieldAnimation();
      initParallax();
      initIntersectionObserver();
      
      // Add hero animations
      document.querySelector('.title-animation')?.classList.add('active');
      setTimeout(() => {
        document.querySelector('.subtitle-animation')?.classList.add('active');
      }, 300);
      setTimeout(() => {
        document.querySelector('.description-animation')?.classList.add('active');
      }, 600);
    }, 500);
  }
  
  // Run all animations
  initAllAnimations();
});