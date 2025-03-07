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

