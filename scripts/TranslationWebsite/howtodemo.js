const lang = getCurrentLanguage();
document.body.classList.toggle('arabic', lang === 'ar');
document.getElementById('lang-label').textContent = lang === 'ar' ? 'AR' : 'EN';

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.images img');
    const selectedImage = document.getElementById('selected-image');
    const imageInfo = document.getElementById('image-info');
    const clearButton = document.getElementById('clear-button');
    const languageToggle = document.getElementById('language-toggle');

    let currentLanguage = 'en';

    const imageDetails = {
        en: {

            'Te-gl_0011.jpg': ['Tumor: Glioma', 'Tumorous: Yes', 'Overview: Glioma is a tumor that forms when glial cells grow out of control', 'Severity: Low', 'Accuracy: 90%', 'Dimensions: 3.5 cm × 2.5 cm', 'Therapies: Surgery, Radiation', 'Removable: Yes'],
            'Te-gl_0012.jpg': ['Tumor: Glioma', 'Tumorous: Yes', 'Overview: A sample overview for Glioma.', 'Severity: Moderate', 'Accuracy: 88%', 'Dimensions: 4.0 cm × 3.0 cm', 'Therapies: Surgery, Radiation', 'Removable: Yes'],
            'Te-gl_0013.jpg': ['Tumor: Glioma', 'Tumorous: Yes', 'Overview: Glioma details.', 'Severity: High', 'Accuracy: 92%', 'Dimensions: 5.0 cm × 4.0 cm', 'Therapies: Surgery', 'Removable: Yes'],

            'Te-no_0010.jpg': ['Tumor: No Tumor', 'Tumorous: No', 'Overview: N/A', 'Severity: N/A', 'Accuracy: N/A', 'Dimensions: N/A', 'Therapies: N/A', 'Removable: N/A'],
            'Te-no_0011.jpg': ['Tumor: No Tumor', 'Tumorous: No', 'Overview: N/A', 'Severity: N/A', 'Accuracy: N/A', 'Dimensions: N/A', 'Therapies: N/A', 'Removable: N/A'],
            'Te-no_0012.jpg': ['Tumor: No Tumor', 'Tumorous: No', 'Overview: N/A', 'Severity: N/A', 'Accuracy: N/A', 'Dimensions: N/A', 'Therapies: N/A', 'Removable: N/A'],

        },
        ar: {

            'Te-gl_0010.jpg': ['الورم: الورم السحائي', 'ورمي: نعم', 'نظرة عامة: الورم السحائي هو ورم يتشكل على الأغشية التي تغطي الدماغ والحبل الشوكي.', 'الشدة: منخفضة', 'الدقة: 90%', 'الأبعاد: 3.5 سم × 2.5 سم', 'العلاجات: الجراحة، الإشعاع', 'قابل للإزالة: نعم'],
            'Te-gl_0011.jpg': ['الورم: الورم السحائي', 'ورمي: نعم', 'نظرة عامة: نظرة عامة على الورم السحائي.', 'الشدة: متوسطة', 'الدقة: 88%', 'الأبعاد: 4.0 سم × 3.0 سم', 'العلاجات: الجراحة، الإشعاع', 'قابل للإزالة: نعم'],
            'Te-gl_0012.jpg': ['الورم: الورم السحائي', 'ورمي: نعم', 'نظرة عامة: تفاصيل حول الورم السحائي.', 'الشدة: عالية', 'الدقة: 92%', 'الأبعاد: 5.0 سم × 4.0 سم', 'العلاجات: الجراحة', 'قابل للإزالة: نعم'],

            'Te-no_0010.jpg': ['الورم:  لا الورم ', 'ورمي: لا', 'نظرة عامة: لا يوجد', 'الشدة: لا يوجد ', 'الدقة: لا يوجد', 'الأبعاد: لا يوجد', 'العلاجات: لا يوجد', 'قابل للإزالة: لا يوجد'],
            'Te-no_0011.jpg': ['الورم:  لا الورم ', 'ورمي: لا', 'نظرة عامة: لا يوجد', 'الشدة: لا يوجد ', 'الدقة: لا يوجد', 'الأبعاد: لا يوجد', 'العلاجات: لا يوجد', 'قابل للإزالة: لا يوجد'],
            'Te-no_0012.jpg': ['الورم:  لا الورم ', 'ورمي: لا', 'نظرة عامة: لا يوجد', 'الشدة: لا يوجد ', 'الدقة: لا يوجد', 'الأبعاد: لا يوجد', 'العلاجات: لا يوجد', 'قابل للإزالة: لا يوجد'],

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
        if (selectedImage.src) updateImageDetails(selectedImage.src);
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

    document.getElementById('language-toggle').addEventListener('change', toggleLanguage);

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
