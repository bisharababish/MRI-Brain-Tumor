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