document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    initHeroSlider();
    initFacultyCarousel();
    initMobileMenu();
});

/* ==========================================
   1. MOBILE MENU LOGIC (New & Optimized)
   ========================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');

    if (!menuBtn || !mobileNav) return;

    // Toggle Menu on Click
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = mobileNav.classList.contains('hidden');

        if (isHidden) {
            mobileNav.classList.remove('hidden');
            menuIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            mobileNav.classList.add('hidden');
            menuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu if user clicks anywhere outside the header
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileNav.classList.add('hidden');
            menuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
            menuIcon.classList.replace('fa-xmark', 'fa-bars');
        });
    });
}

/* =========================
    2. HERO SLIDER
========================= */
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);
}

/* =========================
    3. FACULTY CAROUSEL
========================= */
function initFacultyCarousel() {
    const slider = document.getElementById('faculty-carousel');
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    // Mouse Events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch Events for Mobile
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}