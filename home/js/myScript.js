const wrapper = document.getElementById('wrapper');
const line = document.getElementById('line');
const dots = document.querySelectorAll('.dot');
const items = document.querySelectorAll('.item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let activeIndex = 0;

/* Moves the timeline to focus precisely on the active index */
function updateTimelineFocus(index) {
    if (index < 0 || index >= items.length) return;
    
    activeIndex = index;
    const itemWidth = items[0].offsetWidth;
    
    // Calculate the translation to put the current item in the dead center
    // The 50vw padding in CSS handles the initial offset
    const moveX = activeIndex * itemWidth;
    
    line.style.transform = `translateX(-${moveX}px)`;

    // Toggle active classes
    items.forEach((item, i) => {
        item.classList.toggle('active', i === activeIndex);
    });
}

/* Desktop Mouse Move: Free focus */
wrapper.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const screenWidth = window.innerWidth;
        const firstItem = items[0];
        const lastItem = items[items.length - 1];
        const startPos = firstItem.offsetLeft - 100; 
        const endPos = lastItem.offsetLeft + lastItem.offsetWidth - screenWidth + 100;

        const moveX = startPos + ((e.clientX / screenWidth) * (endPos - startPos));
        line.style.transform = `translateX(-${Math.max(0, moveX)}px)`;
    }
});

/* Mobile/Button Navigation: Specific focus */
nextBtn?.addEventListener('click', () => updateTimelineFocus(activeIndex + 1));
prevBtn?.addEventListener('click', () => updateTimelineFocus(activeIndex - 1));

/* Dot Click: Direct focus */
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateTimelineFocus(index));
});

/* Reset selection when clicking background */
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