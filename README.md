# Cube Magic 3D Viewer

> "Experience depth like never before. Our interactive 3D Cube Viewer provides a seamless, high-fidelity environment to inspect designs from every angle. Built with precision and optimized for performance, it turns static concepts into immersive digital realities."

## 🚀 Live Demonstration
Play with the immersive 3D viewer directly in your browser:  
**👉 [Experience Cube Magic Live](https://anuvindkichu-droid.github.io/3D-Cube-/)**

## Overview

Cube Magic is a premium, highly-interactive web application built entirely with Vanilla HTTP, CSS, and JavaScript. It features a rich 3D-rendered glassmorphic floating cube that users can smoothly rotate and effortlessly interact with on both desktop and mobile devices.

### Features
- **3D Interactive Cube**: Sculpted entirely using native CSS 3D transforms (`transform-style: preserve-3d`).
- **Precision Drag & Swipe**: Rotate the 3D entity seamlessly along the X and Y axes with physics-smoothed inertia tracking your cursor.
- **Vanish & Summon Mechanics**: Double-click the cube to trigger a beautifully animated, bezier-curved shrinking 'poof' act. A dynamic "Summon Cube" button appears to magically restore it.
- **Premium Aesthetics**: Crafted with immersive multi-layered grid gradient backgrounds, complex glassmorphic side-panels (`backdrop-filter: blur`), and custom ambient face-lighting for a strong dimensional 'pop'.

## Setup & Running

Because the viewer is built purely with native web technologies, no heavy build systems, packages, or frameworks are required.

To run the project locally:
1. Clone the repository.
2. Directly open `index.html` in any modern web browser.
3. *Alternatively*, start a simple local server:
  ```bash
  python3 -m http.server 8000
  ```
  Then navigate to `http://localhost:8000` to interact with the magic natively.
