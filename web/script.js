/* jshint browser: true */
/* jshint esversion: 6 */

let lastScrollY = window.scrollY;

window.addEventListener("scroll", function() {
    var navbar = document.querySelector("nav");

    if (window.scrollY > lastScrollY) {
        // Nếu cuộn xuống, ẩn navbar
        navbar.classList.add("hidden");
    } else {
        // Nếu cuộn lên, hiện navbar
        navbar.classList.remove("hidden");
    }

    lastScrollY = window.scrollY;
});

let slideIndex = 0;
showSlides();
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1;}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 10000); // Change image every 2 seconds
}