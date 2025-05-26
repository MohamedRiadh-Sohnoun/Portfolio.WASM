// Create this file as wwwroot/js/skillsAnimations.js
window.initSkillsAnimations = function () {
    // Animate XP bars when they become visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with staggered delay
                setTimeout(() => {
                    entry.target.classList.add('animate');

                    // Animate the XP fill after the card appears
                    setTimeout(() => {
                        const xpFill = entry.target.querySelector('.xp-fill');
                        if (xpFill) {
                            // Get the desired width from the inline style
                            const targetWidth = xpFill.style.width;
                            // Temporarily set to 0 to enable animation
                            xpFill.style.width = '0';

                            // Force a reflow to ensure the 0 width is applied before the animation
                            void xpFill.offsetWidth;

                            // Set back to target width to trigger animation
                            xpFill.style.width = targetWidth;
                        }
                    }, 300);

                    // Achievement unlock animations
                    const achievements = entry.target.querySelectorAll('.achievement.unlocked');
                    achievements.forEach((achievement, i) => {
                        setTimeout(() => {
                            achievement.style.transform = 'scale(1.05)';
                            setTimeout(() => {
                                achievement.style.transform = 'scale(1)';
                            }, 300);
                        }, 600 + (i * 200));
                    });

                    // Stop observing this element
                    observer.unobserve(entry.target);
                }, 100 * Array.from(document.querySelectorAll('.skill-card')).indexOf(entry.target));
            }
        });
    }, observerOptions);

    // Add skill level hover effects
    document.querySelectorAll('.skill-card').forEach(card => {
        // Observe the card for animation
        observer.observe(card);

        // Add hover effects for level stars
        const stars = card.querySelectorAll('.level-star');
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                // Highlight stars up to the hovered one
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.style.transform = 'scale(1.2)';
                    }
                });
            });

            star.addEventListener('mouseleave', () => {
                // Reset all stars
                stars.forEach(s => {
                    s.style.transform = 'scale(1)';
                });
            });
        });
    });

    // Add special effects for achievements
    document.querySelectorAll('.achievement.unlocked').forEach(achievement => {
        achievement.addEventListener('mouseenter', () => {
            achievement.style.transform = 'scale(1.05)';
        });

        achievement.addEventListener('mouseleave', () => {
            achievement.style.transform = 'scale(1)';
        });
    });

    // Category selection animation
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('click', () => {
            // Add a subtle click effect
            category.style.transform = 'scale(0.95)';
            setTimeout(() => {
                category.style.transform = '';
            }, 200);
        });
    });
}