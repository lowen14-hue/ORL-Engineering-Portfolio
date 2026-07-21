const faders = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

const appearOptions = {
  threshold: 0.15
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {

  entries.forEach(entry => {

    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add('visible');
    observer.unobserve(entry.target);

  });

}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// ===== VIEW TOGGLE FUNCTIONALITY =====

const toggleButtons = document.querySelectorAll('.toggle-btn');

// Load saved view preference from localStorage
const savedView = localStorage.getItem('portfolioView') || 'desktop';
setView(savedView);

toggleButtons.forEach(button => {
  button.addEventListener('click', function() {
    const view = this.dataset.view;
    setView(view);
    localStorage.setItem('portfolioView', view);
  });
});

function setView(view) {
  // Remove active class from all buttons
  toggleButtons.forEach(btn => btn.classList.remove('active'));
  
  // Add active class to selected button
  const activeBtn = document.querySelector(`[data-view="${view}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  // Apply mobile or desktop view
  if (view === 'mobile') {
    document.body.classList.add('mobile-view');
  } else {
    document.body.classList.remove('mobile-view');
  }
}