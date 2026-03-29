document.addEventListener('DOMContentLoaded', () => {
    const scene = document.getElementById('scene');
    const cube = document.getElementById('cube');
    const summonWrapper = document.getElementById('summon-wrapper');
    const summonBtn = document.getElementById('summon-btn');

    // 3D Rotation State
    let isDragging = false;
    let previousTouch = null;
    let currentX = -20; // Initial perspective rotations matching CSS
    let currentY = 45;

    // To add smooth inertia, we could track velocities, but 
    // for direct swiping matching pointer, simple delta mapping works great.

    // Calculate rotation bounds / speeds
    const sensitivity = 0.5;

    /**
     * Mouse / Touch Handlers for Dragging
     */
    const pointerDown = (e) => {
        // Prevent rotating if cube is vanishing or invisible
        if (cube.classList.contains('vanish')) return;

        isDragging = true;
        // Support both mouse and touch via Pointer Events
        previousTouch = { x: e.clientX, y: e.clientY };
        
        // We keep the smooth CSS transitions active during dragging
        // cube.style.transition = 'none';
    };

    const pointerMove = (e) => {
        if (!isDragging || cube.classList.contains('vanish')) return;

        const currentTouch = { x: e.clientX, y: e.clientY };
        const deltaX = currentTouch.x - previousTouch.x;
        const deltaY = currentTouch.y - previousTouch.y;

        // X movement rotates around Y axis, Y movement rotates around X axis
        currentY += deltaX * sensitivity;
        currentX -= deltaY * sensitivity; // Subtracting because moving mouse down should rotate cube down

        applyRotation();
        
        previousTouch = currentTouch;
    };

    const pointerUp = () => {
        if (!isDragging) return;
        isDragging = false;
        previousTouch = null;
        // Restore transition for smooth snapping or after-effects (optional)
        // Set short transition for smooth stop if we want inertia, but none needed immediately.
    };

    scene.addEventListener('pointerdown', pointerDown);
    window.addEventListener('pointermove', pointerMove); // Listen on window to catch moves outside scene bounds
    window.addEventListener('pointerup', pointerUp);
    window.addEventListener('pointercancel', pointerUp);

    function applyRotation() {
        cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
    }

    /**
     * Double-click Vanish Logic
     */
    let dblClickTimer = null;
    let clickCount = 0;
    
    // We listen on the cube directly for dblclick
    // Note: Touch devices sometimes struggle with native dblclick on complex transforms.
    // It's safer to implement a custom manual dblclick handler for mobile/pointer compatibility.
    cube.addEventListener('pointerdown', (e) => {
        clickCount++;
        if (clickCount === 1) {
            dblClickTimer = setTimeout(() => {
                clickCount = 0; // Reset after delay if single click
            }, 300); // 300ms window for double tap
        } else if (clickCount === 2) {
            clearTimeout(dblClickTimer);
            clickCount = 0;
            vanishCube();
        }
    });

    // Also support native double click for pure mouse usage
    cube.addEventListener('dblclick', (e) => {
        // Prevent the pointerdown custom handler from interfering
        e.preventDefault();
        e.stopPropagation();
        vanishCube();
    });

    function vanishCube() {
        if (cube.classList.contains('vanish')) return;

        // Add class to trigger CSS transition
        cube.classList.remove('enter'); // Clear any enter anim
        cube.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Set specific vanishing curve
        cube.style.transform = `rotateX(${currentX + 180}deg) rotateY(${currentY + 180}deg) scale(0)`;
        cube.classList.add('vanish');

        // Show the summon button after the cube has vanished
        setTimeout(() => {
            summonWrapper.style.display = 'block';
        }, 600); // Matches CSS transition duration
    }

    /**
     * Summon Action
     */
    summonBtn.addEventListener('click', () => {
        // Hide button
        summonWrapper.style.display = 'none';

        // Animate cube back
        cube.classList.remove('vanish');
        cube.classList.add('enter');

        // Needs to override inline styles applied during vanish
        // To let the @keyframes enter animation take over fully, we clear the inline transform/transition temporarily
        cube.style.transition = 'none'; 
        
        // Wait for enter anim (0.8s) to finish then restore the dragging state tracking
        setTimeout(() => {
            cube.classList.remove('enter');
            cube.style.transition = ''; // Restore to fallback default CSS transition
            applyRotation(); // Reset to where it was
        }, 800);
    });

    // Initialize initial state rotation since it's hardcoded in JS and CSS
    applyRotation();
});
