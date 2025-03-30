// Slideshow Animation
let slideIndex = 0;
function showSlides() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach((slide) => (slide.style.display = "none"));
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}
showSlides();

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    let scrollAmount = 250; // Distance to scroll
    let autoScrollInterval;

    // Scroll left
    leftBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // Scroll right
    rightBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // Auto-scroll function
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
                carousel.scrollTo({ left: 0, behavior: "smooth" }); // Loop back to start
            } else {
                carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }, 3000); // Change slides every 3 seconds
    }

    // Stop auto-scroll when hovering
    carousel.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
    carousel.addEventListener("mouseleave", startAutoScroll);

    // Start auto-scroll when the page loads
    startAutoScroll();

    // Auto fade-in effect
    const section = document.querySelector(".did-you-know");
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                section.classList.add("visible");
                observer.disconnect();
            }
        },
        { threshold: 0.3 }
    );

    observer.observe(section);
});


