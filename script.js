document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initFacultyCarousel();
    initMobileMenu();
    initWhyPgdmCarousel();
    initConvocationCarousel();
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

/* ====================================
   5. CONVOCATION CAROUSEL (AUTOPLAY + MIN GAP)
==================================== */
function initConvocationCarousel() {
    const track = document.getElementById('convocationTrack');
    const prevBtn = document.getElementById('convoPrevBtn');
    const nextBtn = document.getElementById('convoNextBtn');
    const dotsContainer = document.getElementById('convoDots');

    // Agar section nahi mila to return
    if (!track) return;

    // 1. Image URLs
    const imageUrls = [
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-1.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-2.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-3.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-4.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-5.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-6.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-7.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-8.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-9.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-10.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-11.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Online-PGDM-Convocation-2025-Image-12.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2025/05/Untitled-design-10.jpg"
    ];

    // 2. HTML Generate Karna (px-1 lagaya hai minimum gap ke liye)
    let slidesHTML = '';
    imageUrls.forEach((url) => {
        slidesHTML += `
            <div class="convo-slide w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-1">
                <div class="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 h-64 md:h-72 bg-gray-100 cursor-pointer">
                    <img src="${url}" alt="Convocation Highlight" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" loading="lazy">
                    <div class="absolute inset-0 bg-brand-purple/0 group-hover:bg-brand-purple/20 transition-colors duration-300"></div>
                </div>
            </div>
        `;
    });

    track.innerHTML = slidesHTML;

    // 3. Carousel Logic
    const slides = Array.from(document.querySelectorAll('.convo-slide'));
    let currentIndex = 0;
    let visibleSlides = getVisibleSlides();
    let autoPlayTimer; // Autoplay ke liye variable

    function getVisibleSlides() {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }

    function updateCarousel() {
        if (slides.length === 0) return;
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateButtons();
        updateDots();
    }

    function updateButtons() {
        // Autoplay mein loop hota hai, isliye disabled condition hata di ya modify kar sakte hain
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= slides.length - visibleSlides;
    }

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalDots = slides.length - visibleSlides + 1;

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = `h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-brand-purple' : 'w-3 bg-gray-300 hover:bg-brand-purple/50'}`;
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);

            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                resetAutoPlay(); // Dot click karne par timer reset ho jaye
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        if (!dotsContainer) return;
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, index) => {
            dot.className = `h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-brand-purple' : 'w-3 bg-gray-300 hover:bg-brand-purple/50'}`;
        });
    }

    // --- AUTOPLAY LOGIC YAHAN HAI ---
    function nextSlide() {
        if (currentIndex < slides.length - visibleSlides) {
            currentIndex++;
        } else {
            currentIndex = 0; // Aakhri slide ke baad wapas shuru se
        }
        updateCarousel();
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 1500);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Hover karne par auto-play rook dena
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Button Events
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
                resetAutoPlay();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    // Responsive hone par
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

    // Initial load call
    createDots();
    updateCarousel();
    startAutoPlay(); // Autoplay start karna
}