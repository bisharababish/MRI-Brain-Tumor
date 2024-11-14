
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        event.preventDefault();
        alert("Please fill out all required fields correctly.");
    }
});
