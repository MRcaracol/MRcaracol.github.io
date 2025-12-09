document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       PARTICULAS — Fondo animado ultra ligero
    ========================================================= */

    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        ctx.scale(ratio, ratio);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const TOTAL = 75;

    for (let i = 0; i < TOTAL; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: 1 + Math.random() * 2,
            speed: 0.2 + Math.random() * 0.6
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        particles.forEach(p => {
            p.y -= p.speed;

            if (p.y < 0) {
                p.y = window.innerHeight;
                p.x = Math.random() * window.innerWidth;
            }

            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        requestAnimationFrame(animateParticles);
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animateParticles();
    }


    /* =========================================================
       HERO PARALLAX (corregido)
    ========================================================= */

    const heroBg = document.querySelector(".hero__bg");
    if (heroBg) {
        window.addEventListener("scroll", () => {
            const offset = window.scrollY * 0.2;
            heroBg.style.transform = `translateY(${offset}px)`;
        });
    }


    /* =========================================================
       GSAP ANIMACIONES
    ========================================================= */

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        gsap.from(".navbar", {
            y: -60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        gsap.from(".hero__content h1", {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.2
        });

        gsap.from(".hero__content p", {
            opacity: 0,
            y: 15,
            duration: 1,
            delay: 0.4
        });

        gsap.from(".hero__content .cta", {
            opacity: 0,
            scale: 0.9,
            duration: 0.9,
            delay: 0.6
        });

        gsap.utils.toArray(".section-title").forEach((title) => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 0.7
            });
        });

        gsap.utils.toArray(".card").forEach((card) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 20,
                duration: 0.6,
                ease: "power1.out"
            });
        });
    }


    /* =========================================================
       SMOOTH SCROLL
    ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");

            if (href.startsWith("#") && href.length > 1) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================================
       MENU LATERAL FUTURISTA — (YA FUNCIONA)
    ========================================================= */

    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.querySelector(".close-btn");

    menuBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
    closeBtn.addEventListener("click", toggleMenu);


    function toggleMenu() {
        const open = menuBtn.classList.toggle("active");
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");

        if (open) {
            gsap.from(".sidebar-links a", {
                x: 30,
                opacity: 0,
                duration: 0.4,
                stagger: 0.07,
                ease: "power2.out"
            });
        }
    }

});
