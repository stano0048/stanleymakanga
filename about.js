// Dynamic Scrolling Animations
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function addScrollAnimations() {
    const sections = document.querySelectorAll('section');
  
    sections.forEach((section, index) => {
      if (isInViewport(section)) {
        // Add different animations based on section index or class
        if (index % 2 === 0) {
          section.classList.add('animate-slideInLeft');
        } else {
          section.classList.add('animate-slideInRight');
        }
        section.style.opacity = 1; // Make section visible
      }
    });
  }
  
  // Add event listener for scroll
  window.addEventListener('scroll', addScrollAnimations);
  
  // Trigger animations on page load for visible sections
  document.addEventListener('DOMContentLoaded', addScrollAnimations);