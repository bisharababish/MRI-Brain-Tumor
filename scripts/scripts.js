// close slide
window.addEventListener('scroll', function () {
    var slide = document.querySelector('.slide');
    var toggle = document.getElementById('toggle');
    if (toggle.checked && window.scrollY > 0) {
        toggle.checked = false;
    }
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

