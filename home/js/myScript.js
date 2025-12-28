const wrapper = document.getElementById('wrapper');
const line = document.getElementById('line');
const dots = document.querySelectorAll('.dot');
const items = document.querySelectorAll('.item');

// --- Helper function to calculate movement ---
function updateTimeline(clientX) {
    const screenWidth = window.innerWidth;
    const totalLineWidth = line.scrollWidth;
    const scrollRange = totalLineWidth - screenWidth;
    
    // Calculate percentage of screen crossed (0 to 1)
    const percentage = clientX / screenWidth;
    const moveX = percentage * scrollRange;
    
    line.style.transform = `translateX(-${moveX}px)`;
}

// --- Desktop: Mouse Movement ---
wrapper.addEventListener('mousemove', (e) => {
    updateTimeline(e.clientX);
});

// --- Mobile: Touch Movement ---
wrapper.addEventListener('touchmove', (e) => {
    // Prevent default scrolling behavior
    updateTimeline(e.touches[0].clientX);
}, { passive: true });

// --- Selection Logic ---
dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        e.stopPropagation();
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    });
});

// --- Reset State ---
wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper || e.target === line) {
        items.forEach(item => item.classList.remove('active'));
    }
});

/* Updates the CSS rotation of the gallery wheel based on button input */
let currentRotation = 0;
function rotateGallery(direction) {
    const step = 60; 
    currentRotation += (direction === 'next' ? -step : step);
    wheel.style.transform = `rotate(${currentRotation}deg)`;
}