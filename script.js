document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initFacultyCarousel();
    initMobileMenu();
    initWhyPgdmCarousel();
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

/* ====================================
   4. WHY PGDM CAROUSEL
==================================== */
function initWhyPgdmCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    // Safety check: Agar ye section page par nahi hai toh function exit kar de
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let visibleSlides = getVisibleSlides();

    // Screen size ke hisaab se cards kitne dikhenge
    function getVisibleSlides() {
        if (window.innerWidth >= 1280) return 5;
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 640) return 2;  
        return 1;                                
    }

    // Slider ko move karne ka logic
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateButtons();
        updateDots();
    }

    // Left/Right buttons ko disable/enable karna
    function updateButtons() {
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= slides.length - visibleSlides;
    }

    // Pagination Dots banana
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalDots = slides.length - visibleSlides + 1;

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = `h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-white' : 'w-3 bg-white/50 hover:bg-white/80'}`;
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);

            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Active dot ko update karna
    function updateDots() {
        if (!dotsContainer) return;
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, index) => {
            dot.className = `h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-white' : 'w-3 bg-white/50 hover:bg-white/80'}`;
        });
    }

    // Button Click Events
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - visibleSlides) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    // Responsive hone par adjust karna
    window.addEventListener('resize', () => {
        const newVisibleSlides = getVisibleSlides();
        if (newVisibleSlides !== visibleSlides) {
            visibleSlides = newVisibleSlides;
            if (currentIndex > slides.length - visibleSlides) {
                currentIndex = Math.max(0, slides.length - visibleSlides);
            }
            createDots();
        }
        updateCarousel();
    });

    // Initial load setup
    createDots();
    updateCarousel();
}