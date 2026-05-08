document.addEventListener('DOMContentLoaded', () => { initHeroSlider(); stickyMenu(); initRecruiters(); initFaq(); });

function stickyMenu() {

    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {

        if (window.scrollY > 200) {
            navbar.classList.add('fixed', 'top-0', 'left-1/2', '-translate-x-1/2', 'w-full', 'max-w-[1600px]', 'z-50', 'shadow-md', 'py-2', 'md:py-3');
        } else {
            navbar.classList.remove('fixed', 'top-0', 'left-1/2', '-translate-x-1/2', 'w-full', 'max-w-[1600px]', 'z-50', 'shadow-md', 'py-2', 'md:py-3');
        }
    });
}

function initHeroSlider() {

    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('heroNext');
    const prevBtn = document.getElementById('heroPrev');

    if (!slides.length) return;

    let currentSlide = 0;
    let sliderInterval;

    slides.forEach((slide, index) => {

        slide.classList.add(
            'transition-all',
            'duration-1000'
        );

        if (index === 0) {
            slide.classList.add('active', 'opacity-100', 'z-10');
        } else {
            slide.classList.add('opacity-0');
        }
    });

    function showSlide(index) {

        slides.forEach((slide) => {
            slide.classList.remove('active', 'opacity-100', 'z-10');
            slide.classList.add('opacity-0');
        });

        slides[index].classList.add('active', 'opacity-100', 'z-10');
        slides[index].classList.remove('opacity-0');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    function startSlider() {
        sliderInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(sliderInterval);
        startSlider();
    }

    startSlider();
}

function initRecruiters() {

    const recruiters = [

        "https://online.jaipuria.ac.in/wp-content/uploads/2026/01/Deloitte_logo-1.webp",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/01/kpmg-logo.webp",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/EY_logo_2019.png",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/infosys-logo.png",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/TCS-logo.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/HCL-Tech.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/amazon-logo.jpg",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/Flipkart-logo.webp",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/HDFC-logo.png",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/ICICI_Bank_Logo.webp",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/genpect-logo.webp",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/capgemini-logo.webp",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/Wipro-logo.webp",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/Mahindra-logo.webp",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/Adani-Logo.webp",
        "https://online.jaipuria.ac.in/wp-content/uploads/2026/04/tata-Group-logo.webp"

    ];

    const track1 = document.getElementById("recruiterTrack1");
    const track2 = document.getElementById("recruiterTrack2");

    function createLogos(track, logos) {

        const duplicated = [...logos, ...logos];

        duplicated.forEach((logo) => {

            const card = document.createElement("div");

            card.className = "recruiter-card";

            card.innerHTML = `
                    <img src="${logo}" alt="Recruiter Logo">
                `;

            track.appendChild(card);

        });

    }

    createLogos(track1, recruiters);
    createLogos(track2, recruiters.reverse());

}

function initFaq() {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {

        const btn = item.querySelector(".faq-btn");
        const content = item.querySelector(".faq-content");
        const icon = item.querySelector(".faq-icon i");

        btn.addEventListener("click", () => {

            const isOpen = !content.classList.contains("hidden");

            // CLOSE ALL
            faqItems.forEach((faq) => {

                faq.querySelector(".faq-content").classList.add("hidden");

                faq.querySelector(".faq-icon i")
                    .classList.remove("fa-minus");

                faq.querySelector(".faq-icon i")
                    .classList.add("fa-plus");

            });

            // OPEN CURRENT
            if (!isOpen) {

                content.classList.remove("hidden");

                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");

            }

        });

    });

}
