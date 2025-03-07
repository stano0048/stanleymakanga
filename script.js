// ===== Carousel Functionality =====
let currentProjectIndex = 0;
let projects = document.querySelectorAll('.project-item');
let autoSwitchInterval;

// Function to show the current project
function showProject(index) {
  // Hide all projects
  projects.forEach((project, i) => {
    project.classList.remove('active');
    project.style.opacity = 0;
  });

  // Show the selected project
  projects[index].classList.add('active');
  projects[index].style.opacity = 1;
}

// Function to switch to the next project
function nextProject() {
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  showProject(currentProjectIndex);
  resetAutoSwitch();
}

// Function to switch to the previous project
function prevProject() {
  currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  showProject(currentProjectIndex);
  resetAutoSwitch();
}

// Function to reset the auto-switch interval
function resetAutoSwitch() {
  clearInterval(autoSwitchInterval);
  autoSwitchInterval = setInterval(nextProject, 10000); // Switch every 10 seconds
}

// Initialize the carousel
function initCarousel() {
  showProject(currentProjectIndex);
  autoSwitchInterval = setInterval(nextProject, 10000); // Start auto-switching
}

// Add event listeners for arrow clicks
document.querySelector('.left-arrow').addEventListener('click', prevProject);
document.querySelector('.right-arrow').addEventListener('click', nextProject);

// ===== Dynamic Scrolling Animations =====
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
document.addEventListener('DOMContentLoaded', () => {
  initCarousel(); // Initialize carousel
  addScrollAnimations(); // Initialize scroll animations
});

// FAQ Toggle Functionality
function toggleAnswer(id) {
    const answer = document.getElementById(`answer-${id}`);
    const allAnswers = document.querySelectorAll('.faq-answer');
  
    // Close all other answers
    allAnswers.forEach((ans) => {
      if (ans.id !== `answer-${id}`) {
        ans.style.maxHeight = null;
      }
    });
  
    // Toggle the clicked answer
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  }

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting the default way

  // Get form data
  const formData = new FormData(contactForm);

  // Send form data to Formspree or your backend
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      // Display success message
      formStatus.textContent = 'Thank you! Your message has been sent.';
      formStatus.style.color = '#28a745'; // Green color for success
      contactForm.reset(); // Clear the form
    } else {
      // Display error message
      formStatus.textContent = 'Oops! Something went wrong. Please try again.';
      formStatus.style.color = '#dc3545'; // Red color for error
    }
  } catch (error) {
    // Display error message
    formStatus.textContent = 'Oops! Something went wrong. Please try again.';
    formStatus.style.color = '#dc3545'; // Red color for error
  }
});
