document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            let icon = hamburger.querySelector('i');
            if(navLinks.classList.contains('nav-active')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                let icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Scroll Navbar effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Typewriter effect
    const typeWriterElement = document.getElementById('typewriter');
    const words = [
        "Software Development Engineer",
        "Backend Developer (FastAPI)",
        "Applied AI Enthusiast"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if(!typeWriterElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typeWriterElement.innerText = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typeWriterElement.innerText = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typewriter
    type();

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Space Background Canvas Animation
    const canvas = document.getElementById('space-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        }

        function initStars() {
            stars = [];
            // Calculate a subtle number of stars based on screen size
            const numStars = Math.floor((width * height) / 5000); 
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5,
                    vx: Math.random() * 0.1 - 0.05,
                    vy: Math.random() * 0.1 - 0.05,
                    glow: Math.random() * 0.4 + 0.1 // Subtle glow
                });
            }
        }

        function animateStars() {
            ctx.clearRect(0, 0, width, height);
            
            stars.forEach(star => {
                // Move star
                star.x += star.vx;
                star.y += star.vy;

                // Wrap around edges
                if (star.x < 0) star.x = width;
                if (star.x > width) star.x = 0;
                if (star.y < 0) star.y = height;
                if (star.y > height) star.y = 0;

                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.glow})`;
                ctx.fill();
            });

            requestAnimationFrame(animateStars);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animateStars();
    }
});
