document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".slideshow-container img");
    let index = 0;

    function showNextImage() {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
    }

    setInterval(showNextImage, 4000); // Change image every 4 seconds
});
