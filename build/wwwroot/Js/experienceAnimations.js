window.initExperienceAnimations = function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with delay based on position
                setTimeout(() => {
                    entry.target.classList.add('slide-in');
                }, 150 * Array.from(document.querySelectorAll('.timeline-item')).indexOf(entry.target));

                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}