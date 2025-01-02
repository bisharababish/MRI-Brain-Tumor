const lang = getCurrentLanguage();
document.body.classList.toggle('arabic', lang === 'ar');
document.getElementById('lang-label').textContent = lang === 'ar' ? 'AR' : 'EN';

let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.images img');
    const selectedImage = document.getElementById('selected-image');
    const imageInfo = document.getElementById('image-info');
    const clearButton = document.getElementById('clear-button');
    const languageToggle = document.getElementById('language-toggle');

    let currentLanguage = document.getElementById('language-toggle').checked ? 'ar' : 'en';

    const imageDetails = {
        en: {
            'Te-gl_0011.jpg': ['Tumor: Glioma', 'Tumorous: Yes'],
            'Te-gl_0012.jpg': ['Tumor: Glioma', 'Tumorous: Yes'],
            'Te-gl_0013.jpg': ['Tumor: Glioma', 'Tumorous: Yes'],

            'Te-no_0010.jpg': ['Tumor: No Tumor'],
            'Te-no_0011.jpg': ['Tumor: No Tumor'],
            'Te-no_0012.jpg': ['Tumor: No Tumor'],
        },
        ar: {
            'Te-gl_0011.jpg': ['الورم: الورم الدبقي', 'ورم: نعم'],
            'Te-gl_0012.jpg': ['الورم: الورم الدبقي', 'ورم: نعم'],
            'Te-gl_0013.jpg': ['الورم: الورم الدبقي', 'ورم: نعم'],

            'Te-no_0010.jpg': ['الورم: لا يوجد ورم'],
            'Te-no_0011.jpg': ['الورم: لا يوجد ورم'],
            'Te-no_0012.jpg': ['الورم: لا يوجد ورم'],
        }
    };


    function updateImageDetails(imgSrc) {
        const imgName = imgSrc.split('/').pop();
        const details = imageDetails[currentLanguage][imgName];

        imageInfo.innerHTML = '';
        const ul = document.createElement('ul');
        if (currentLanguage === 'ar') ul.classList.add('arabic-text');
        details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            ul.appendChild(li);
        });
        imageInfo.appendChild(ul);
        selectedImage.style.display = 'block';
        imageInfo.style.display = 'block';
    }

    languageToggle.addEventListener('change', () => {
        currentLanguage = languageToggle.checked ? 'ar' : 'en';
        if (selectedImage.src) {
            const imgName = imgName.substring(imgName.lastIndexOf('/') + 1);
            updateImageDetails(imgName);
        }
        toggleLanguage();
    });

    images.forEach(image => {
        image.addEventListener('click', e => {
            const imgSrc = e.target.src;
            selectedImage.src = imgSrc;
            updateImageDetails(imgSrc);
        });
    });

    clearButton.addEventListener('click', () => {
        selectedImage.src = '';
        imageInfo.textContent = '';
        selectedImage.style.display = 'none';
        imageInfo.style.display = 'none';
    });

    document.addEventListener('DOMContentLoaded', () => {
        const folders = document.querySelectorAll('.folder h3');

        function handleFolderClick() {
            const imagesContainer = this.nextElementSibling;
            document.querySelectorAll('.folder .images').forEach(container => {
                container.style.display = 'none';
            });
            if (images[imagesContainer] === 'flex') {
                imagesContainer.style.display = 'none';
            } else {
                imagesContainer.style.display = 'flex';
            }
        }
        folders.forEach(folder => {
            folder.addEventListener('click', handleFolderClick);
        });
    });

});

const translations = {
    en: {
        title: 'How To Demo - MRI Brain Tumor Recognition',
        demoTitle: 'How To Demo',
        demoParagraph: 'Click on a folder to open it and display the images inside. Only one folder can be opened at a time. When you choose an image from any folder it would show the information about it.',
        sidebarTitle: 'MRI Brain Tumor Types',
        downloadButton: 'Download the App',
        folderTitles: {
            Glioma: 'Glioma',
            NoTumor: 'No Tumor',
        },
        clearButton: 'Clear',
        menuItems: {
            menunavi: 'Navigation',
            introduction: ' Introduction',
            feedback: ' Contact Us',
            about: ' About Us'
        },
    },
    ar: {
        title: 'كيفية العرض - التعرف على أورام الدماغ بالرنين المغناطيسي',
        demoTitle: 'كيفية العرض',
        demoParagraph: 'انقر على مجلد لفتحه وعرض الصور بداخله. يمكن فتح مجلد واحد فقط في كل مرة. عندما تختار صورة من أي مجلد، ستظهر المعلومات عنها',
        sidebarTitle: 'أنواع أورام الدماغ بالرنين المغناطيسي',
        downloadButton: 'تحميل التطبيق',
        folderTitles: {
            Glioma: 'الورم دبقي',
            NoTumor: 'لا يوجد ورم',

        },
        clearButton: 'مسح',
        menuItems: {
            introduction: 'مقدمة',
            feedback: 'تواصل معنا',
            about: ' نبذة عنا',
            menunavi: 'تصفح'
        },
    }
};

function toggleLanguage() {
    const isArabic = document.getElementById('language-toggle').checked;
    const lang = isArabic ? 'ar' : 'en';
    document.body.classList.toggle('arabic', isArabic);
    document.getElementById('lang-label').textContent = isArabic ? 'AR' : 'EN';
    const elementsToUpdate = [
        { selector: 'title', property: 'textContent', value: translations[lang].title },
        { selector: '#demo-title', property: 'textContent', value: translations[lang].demoTitle },
        { selector: '#sidebar-title', property: 'textContent', value: translations[lang].sidebarTitle },
        { selector: '#demo-paragraph', property: 'textContent', value: translations[lang].demoParagraph },
        { selector: '#clear-button', property: 'textContent', value: translations[lang].clearButton },
        { selector: '#download-button', property: 'textContent', value: translations[lang].downloadButton },
        { selector: '#menu-intro', property: 'innerHTML', value: translations[lang].menuItems.introduction },
        { selector: '#menu-feedback', property: 'innerHTML', value: translations[lang].menuItems.feedback },
        { selector: '#menu-about', property: 'innerHTML', value: translations[lang].menuItems.about },
        { selector: '#menunavi', property: 'textContent', value: translations[lang].menuItems.menunavi }
    ];
    window.pageTranslations = translations;


    elementsToUpdate.forEach(({ selector, property, value }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = 0;
            setTimeout(() => {
                element[property] = value;
                element.style.opacity = 1;
            }, 300);
        }
    });

    const folders = document.querySelectorAll('.folder h3');
    folders[0].textContent = translations[lang].folderTitles.Glioma;
    folders[1].textContent = translations[lang].folderTitles.NoTumor;

}

document.getElementById('language-toggle').addEventListener('change', toggleLanguage);

document.addEventListener('DOMContentLoaded', () => {
    updateDemoContent();
    updateLanguageLinks();
    initializeLanguageToggle();
});

// download button
document.getElementById('download-button').addEventListener('click', function () {
    const fileUrl = '../app/dist/mridetection.exe';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'mridetection.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// close slide
window.addEventListener('scroll', function () {
    var slide = document.querySelector('.slide');
    var toggle = document.getElementById('toggle');
    if (toggle.checked && window.scrollY > 0) {
        toggle.checked = false;
    }
});