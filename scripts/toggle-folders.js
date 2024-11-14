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
