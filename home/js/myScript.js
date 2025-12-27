const wrapper = document.getElementById('wrapper');
        const line = document.getElementById('line');
        const dots = document.querySelectorAll('.dot');
        const items = document.querySelectorAll('.item');

      // 1. MOUSE MOVEMENT (Focused Scroll)
wrapper.addEventListener('mousemove', (e) => {
    const x = e.clientX; // Mouse position
    const screenWidth = window.innerWidth;

    // Find the first and last items to determine the "active" range
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    // Calculate the total distance between the dots
    // We add a little padding (100px) so the dots aren't stuck to the very edge
    const startPos = firstItem.offsetLeft - 100; 
    const endPos = lastItem.offsetLeft + lastItem.offsetWidth - screenWidth + 100;

    // Map the mouse X (0 to screenWidth) to the range between startPos and endPos
    const percentage = x / screenWidth;
    const moveX = startPos + (percentage * (endPos - startPos));

    // Apply the transform
    // We use a check to make sure moveX doesn't go below 0
    line.style.transform = `translateX(-${Math.max(0, moveX)}px)`;
});

// 2. CLICK INTERACTION (Show Cards)
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove active class from others
        items.forEach(item => item.classList.remove('active'));
        // Add to clicked one
        items[index].classList.add('active');
    });
});

// Close cards when clicking the wrapper (but not the dots)
wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper || e.target === line) {
        items.forEach(item => item.classList.remove('active'));
    }
});