// West Sunset Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initializeTheme();
  initializeProgressBar();
  initializeAnimations();
  initializeToast();
});

// Theme Management
function initializeTheme() {
  const themeSelector = document.getElementById('theme-selector');
  const body = document.body;
  
  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.className = `theme-${savedTheme}`;
  themeSelector.value = savedTheme;
  
  // Theme change handler
  themeSelector.addEventListener('change', function() {
    const selectedTheme = this.value;
    body.className = `theme-${selectedTheme}`;
    localStorage.setItem('theme', selectedTheme);
    
    // Show toast notification
    showToast('Theme updated successfully!', 'success');
  });
}

// Progress Bar
function initializeProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  
  if (!progressBar || !progressText) return;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = scrollPercent + '%';
    progressText.textContent = Math.round(scrollPercent) + '%';
    
    if (scrollPercent > 0) {
      progressText.classList.add('show');
    } else {
      progressText.classList.remove('show');
    }
  });
}

// Animations
function initializeAnimations() {
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Toast Notifications
function initializeToast() {
  // Toast functionality is already available from the main site
  window.showToast = function(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconMap = {
      success: 'bx-check-circle',
      error: 'bx-x-circle',
      warning: 'bx-error',
      info: 'bx-info-circle'
    };
    
    toast.innerHTML = `
      <div class="toast-content">
        <i class="toast-icon bx ${iconMap[type] || iconMap.info}"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close toast">
          <i class='bx bx-x'></i>
        </button>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      toast.classList.add('toast-show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(toast);
    }, 5000);
    
    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      removeToast(toast);
    });
  };
  
  function removeToast(toast) {
    toast.classList.remove('toast-show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

// Gallery Image Click Handler
document.addEventListener('click', function(e) {
  if (e.target.closest('.gallery-item')) {
    const galleryItem = e.target.closest('.gallery-item');
    const image = galleryItem.querySelector('.gallery-image');
    const pieceNumber = galleryItem.querySelector('.piece-number');
    
    // Show a toast with piece information
    const pieceInfo = pieceNumber ? pieceNumber.textContent : 'Gallery piece';
    showToast(`Viewing ${pieceInfo} - Click "View on OpenSea" to see the full collection`, 'info');
  }
});

// CTA Button Analytics (if needed)
document.addEventListener('click', function(e) {
  if (e.target.closest('.cta-primary')) {
    // Track OpenSea click
    console.log('OpenSea CTA clicked');
    showToast('Opening OpenSea collection...', 'info');
  }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Escape key to close any open modals or toasts
  if (e.key === 'Escape') {
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => {
      if (toast.classList.contains('toast-show')) {
        toast.querySelector('.toast-close').click();
      }
    });
  }
});

// Performance optimization - Lazy load images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are any lazy-loaded images
if (document.querySelectorAll('img[data-src]').length > 0) {
  initializeLazyLoading();
} 