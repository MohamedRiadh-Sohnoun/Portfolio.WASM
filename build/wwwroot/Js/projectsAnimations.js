window.initializeProjectAnimations = function () {
    // Animate project cards entrance
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation of each card
                setTimeout(() => {
                    entry.target.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.15}s`;
                    entry.target.style.opacity = 1;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Get mouse position
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate percentage position for the glow effect
            const xPercent = Math.floor((x / rect.width) * 100);
            const yPercent = Math.floor((y / rect.height) * 100);

            // Add highlight effect
            card.style.background = `
                radial-gradient(
                    circle at ${xPercent}% ${yPercent}%, 
                    rgba(40, 40, 40, 0.8), 
                    rgba(30, 30, 30, 0.7) 40%
                )
            `;
        });

        card.addEventListener('mouseleave', () => {
            // Reset background
            card.style.background = 'rgba(30, 30, 30, 0.7)';
        });
    });

    // Add global animation for page transition
    document.querySelector('.page-transition').addEventListener('animationend', () => {
        // Add scroll animations
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            // Parallax effect on project logos
            document.querySelectorAll('.project-logo').forEach(logo => {
                const card = logo.closest('.project-card');
                const cardPosition = card.getBoundingClientRect().top;
                const cardVisible = cardPosition < windowHeight && cardPosition > -card.offsetHeight;

                if (cardVisible) {
                    const scrollPercent = (windowHeight - cardPosition) / (windowHeight + card.offsetHeight);
                    const translateY = scrollPercent * 15; // Adjust for more/less movement
                    logo.style.transform = `translateY(${translateY}px)`;
                }
            });
        });
    });

    // Add keyframes for fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Preload project logos for smoother experience
    projectCards.forEach(card => {
        const logoSrc = card.querySelector('.project-logo').src;
        const img = new Image();
        img.src = logoSrc;
    });
};

// Page transition effect when navigating to projects page
window.addEventListener('load', function () {
    const links = document.querySelectorAll('a[href="/projects"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only apply transition if we're not already on the projects page
            if (!window.location.pathname.includes('/projects')) {
                e.preventDefault();
                document.body.style.overflow = 'hidden';

                // Create transition overlay
                const overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = '#121212';
                overlay.style.zIndex = '9999';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.5s ease';
                document.body.appendChild(overlay);

                // Fade in overlay
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);

                // After overlay is fully visible, navigate to the page
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 600);
            }
        });
    });
});