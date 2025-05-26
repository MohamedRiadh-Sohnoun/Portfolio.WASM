// This JavaScript file adds interactive animations to the home page
window.initializeAnimations = function () {
    // Apply parallax effect to the photo
    document.addEventListener('mousemove', function (e) {
        const photoContainer = document.querySelector('.photo-container');
        if (!photoContainer) return;

        // Calculate mouse position values
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Apply subtle tilt effect
        const tiltX = (y - 0.5) * 10; // -5 to 5 degrees
        const tiltY = (0.5 - x) * 10; // -5 to 5 degrees

        photoContainer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
    });

    // Reset transform when mouse leaves
    document.addEventListener('mouseleave', function () {
        const photoContainer = document.querySelector('.photo-container');
        if (photoContainer) {
            photoContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
    });

    // Animate tech icons in the background
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        // Random initial positions
        const speed = Math.random() * 30 + 20; // Between 20-50 seconds
        icon.style.animationDuration = `${speed}s`;

        // Create random float animations for each icon
        const keyframes = `
            @keyframes float${Math.floor(Math.random() * 1000)} {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 20}deg); }
                50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 20}deg); }
                75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 20}deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
        `;

        // Add animation keyframes to the document
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        // Apply animation
        icon.style.animation = `float${Math.floor(Math.random() * 1000)} ${speed}s infinite ease-in-out`;
    });
};