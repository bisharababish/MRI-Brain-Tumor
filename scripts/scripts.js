// close slide
window.addEventListener('scroll', function () {
    var slide = document.querySelector('.slide');
    var toggle = document.getElementById('toggle');
    if (toggle.checked && window.scrollY > 0) {
        toggle.checked = false;
    }
});



// feedback
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        event.preventDefault();
        alert("Please fill out all required fields correctly.");
    }
});


// scroll up
window.onscroll = function () {
    const backToTopButton = document.getElementById('back-to-top');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}




// toggle-folders
document.addEventListener('DOMContentLoaded', function () {
    const folders = document.querySelectorAll('.folder h3');
    let openFolder = null;

    folders.forEach(folder => {
        folder.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent click event from bubbling up to the document
            const images = this.nextElementSibling;

            if (openFolder && openFolder !== images) {
                openFolder.style.display = 'none';
            }

            if (images.style.display === 'block') {
                images.style.display = 'none';
                openFolder = null;
            } else {
                images.style.display = 'block';
                openFolder = images;
            }
        });
    });

    // Close all folders when clicking outside
    document.addEventListener('click', function () {
        if (openFolder) {
            openFolder.style.display = 'none';
            openFolder = null;
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const folders = document.querySelectorAll('.folder h3');

    folders.forEach(folder => {
        folder.addEventListener('click', () => {
            const parentFolder = folder.parentElement;
            const images = parentFolder.querySelector('.images');

            if (images.style.display === 'flex') {
                images.style.display = 'none';
                parentFolder.classList.remove('open');
            } else {
                images.style.display = 'flex';
                parentFolder.classList.add('open');
            }
        });
    });
});
