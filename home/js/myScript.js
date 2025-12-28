const wrapper = document.getElementById('wrapper');
const line = document.getElementById('line');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');

let isDragging = false;
let startX;
let scrollLeftTransform = 0;

// --- DESKTOP: Mouse Move (Hover to Scroll) ---
wrapper.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 1024) { // Only run hover-scroll on large screens
        const screenWidth = window.innerWidth;
        const totalLineWidth = line.scrollWidth;
        const scrollRange = totalLineWidth - screenWidth;
        
        const moveX = (e.clientX / screenWidth) * scrollRange;
        line.style.transform = `translateX(-${moveX}px)`;
    }
});

// --- MOBILE: Touch Events (Drag to Scroll) ---
wrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    // Get the initial finger position
    startX = e.touches[0].pageX;
    // Get the current transform value (where the line is currently)
    const style = window.getComputedStyle(line);
    const matrix = new WebKitCSSMatrix(style.transform);
    scrollLeftTransform = matrix.m41; 
    
    line.style.transition = 'none'; // Disable transition for instant feedback
});

wrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5; // Multiply by 1.5 for faster scrolling
    let newTransform = scrollLeftTransform + walk;

    // Boundary Constraints
    const maxScroll = -(line.scrollWidth - window.innerWidth);
    if (newTransform > 0) newTransform = 0;
    if (newTransform < maxScroll) newTransform = maxScroll;

    line.style.transform = `translateX(${newTransform}px)`;
});

wrapper.addEventListener('touchend', () => {
    isDragging = false;
    line.style.transition = 'transform 0.3s ease-out'; // Bring back smooth motion
});

// --- Dot Interaction ---
dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        e.stopPropagation();
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    });
});

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