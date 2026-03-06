/* ============================================================
   WOLF OIL - JavaScript
   Animations, interactions, and functionality
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== PRELOADER & VIDEO INTRO ====================
    const preloader = document.getElementById('preloader');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const videoIntro = document.getElementById('videoIntro');
    const introVideo = document.getElementById('introVideo');
    const videoSkipBtn = document.getElementById('videoSkipBtn');
    const isMobile = window.innerWidth <= 768;

    document.body.style.overflow = 'hidden';

    function hideVideoIntro() {
        if (videoIntro && !videoIntro.classList.contains('hidden')) {
            videoIntro.classList.add('hidden');
            if (introVideo) {
                introVideo.pause();
                introVideo.currentTime = 0;
            }
        }
    }

    if (isMobile && videoIntro && introVideo) {
        // ===== MOBILE: Show video intro, skip preloader =====
        if (preloader) preloader.classList.add('hidden');

        // Try autoplay with sound
        introVideo.muted = false;
        introVideo.play().catch(() => {
            // Autoplay with sound blocked by browser, try muted
            introVideo.muted = true;
            introVideo.play().then(() => {
                setTimeout(() => { introVideo.muted = false; }, 100);
            });
        });

        // Skip button
        videoSkipBtn.addEventListener('click', () => {
            hideVideoIntro();
            document.body.style.overflow = 'auto';
            initHeroAnimations();
        });

        // When video ends naturally
        introVideo.addEventListener('ended', () => {
            hideVideoIntro();
            document.body.style.overflow = 'auto';
            initHeroAnimations();
        });

    } else {
        // ===== DESKTOP: Normal preloader, hide video =====
        if (videoIntro) videoIntro.classList.add('hidden');

        // Loading bar progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 10 + 3;
            if (progress > 100) progress = 100;
            if (loadingBarFill) loadingBarFill.style.width = progress + '%';
            if (progress >= 100) clearInterval(progressInterval);
        }, 120);

        // Preloader fades out after logo animation
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initHeroAnimations();
        }, 3000);

        // Fallback: hide preloader after 4 seconds max
        setTimeout(() => {
            if (!preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
                initHeroAnimations();
            }
        }, 4000);
    }

    // ==================== AOS INIT ====================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: 'mobile'
    });

    // ==================== NAVBAR ====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    // Scroll effect
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on section
        updateActiveNav();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
        }
    });

    // Active nav link updater
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ==================== HERO PARTICLES ====================
    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;
        
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 4 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            container.appendChild(particle);

            animateParticle(particle);
        }
    }

    function animateParticle(particle) {
        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 3;

        gsap.set(particle, {
            opacity: 0,
            scale: 0
        });

        gsap.to(particle, {
            opacity: Math.random() * 0.5 + 0.2,
            scale: 1,
            duration: duration,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            y: `${(Math.random() - 0.5) * 100}`,
            x: `${(Math.random() - 0.5) * 50}`,
        });
    }

    createParticles();

    // ==================== HERO GSAP ANIMATIONS ====================
    function initHeroAnimations() {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
    }

    // ==================== SWIPER / TESTIMONIALS ====================
    new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        effect: 'slide',
        speed: 600,
    });

    // ==================== VANILLA TILT (Service Cards) ====================
    const serviceCards = document.querySelectorAll('.service-card');
    if (window.innerWidth > 768) {
        VanillaTilt.init(serviceCards, {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.1,
            scale: 1.02,
        });
    }

    // ==================== CONTACT FORM → WHATSAPP ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const vehiculo = document.getElementById('vehiculo').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            // Build WhatsApp message
            let whatsappMsg = `¡Hola WOLF OIL! 🐺\n\n`;
            whatsappMsg += `*Nombre:* ${nombre}\n`;
            whatsappMsg += `*Teléfono:* ${telefono}\n`;
            if (vehiculo) whatsappMsg += `*Vehículo:* ${vehiculo}\n`;
            whatsappMsg += `*Consulta:* ${mensaje}\n`;

            const encodedMsg = encodeURIComponent(whatsappMsg);
            // IMPORTANTE: Reemplazar el número con el real
            const phoneNumber = '5492615861437';
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;

            window.open(whatsappURL, '_blank');
        });
    }

    // ==================== SMOOTH SCROLL ENHANCEMENT ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== GSAP SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Animate service cards on scroll
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out'
            });
        });

        // Animate section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        // Gallery items stagger animation
        gsap.utils.toArray('.gallery-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                delay: i * 0.08,
                ease: 'back.out(1.7)'
            });
        });

        // Contact cards slide in
        gsap.utils.toArray('.contact-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: -30,
                duration: 0.5,
                delay: i * 0.1,
                ease: 'power2.out'
            });
        });
    }

    // Init scroll animations after preloader is done
    setTimeout(() => {
        initScrollAnimations();
    }, 3200);

    // ==================== MAGNETIC EFFECT (WhatsApp button) ====================
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn && window.innerWidth > 768) {
        whatsappBtn.addEventListener('mousemove', (e) => {
            const rect = whatsappBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(whatsappBtn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        whatsappBtn.addEventListener('mouseleave', () => {
            gsap.to(whatsappBtn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    }

    // ==================== DARK RIPPLE EFFECT ON BUTTONS ====================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 215, 0, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ==================== CURSOR GLOW (Desktop only) ====================
    if (window.innerWidth > 1024) {
        const cursorGlow = document.createElement('div');
        cursorGlow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.04) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
        `;
        document.body.appendChild(cursorGlow);

        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

});
