// Site interactions and resume modal
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Resume Modal Elements
    const resumeBtns = [document.getElementById('resumeBtn'), document.getElementById('resumeBtnHero')].filter(Boolean);
    const resumeModal = document.getElementById('resumeModal');
    const resumeEmbed = document.getElementById('resumeEmbed');
    const resumeDownload = document.getElementById('resumeDownload');
    const closeBtn = document.querySelector('.close');

    // Open resume modal
    const openResume = (e) => {
        if (e) e.preventDefault();
        const resumePath = 'Portfolio_Resume.pdf'; // Ensure this file exists at site root
        resumeEmbed.src = resumePath;
        resumeDownload.href = resumePath;
        resumeModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    resumeBtns.forEach(btn => btn && btn.addEventListener('click', openResume));

    // Close modal
    const closeModal = () => {
        resumeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resumeEmbed.src = '';
    };
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === resumeModal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && resumeModal.style.display === 'block') closeModal(); });

    // Mobile nav toggle
    hamburger.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', (!expanded).toString());
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu after clicking a link + smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // account for fixed navbar
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Section fade-in animation
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // animate skill bars when skills section enters
                if (entry.target.id === 'skills') {
                    document.querySelectorAll('.bar span').forEach(el => {
                        const w = el.style.width || '0%';
                        // force reflow to allow transition
                        el.style.width = '0%';
                        setTimeout(() => el.style.width = w, 50);
                    });
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Subtle hero parallax
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
        if (hero) hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });

    // Ensure hero visible on load
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});