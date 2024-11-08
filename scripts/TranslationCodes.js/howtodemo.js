document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.images img');
    const selectedImage = document.getElementById('selected-image');
    const imageInfo = document.getElementById('image-info');
    const clearButton = document.getElementById('clear-button');
    const languageToggle = document.getElementById('language-toggle');

    let currentLanguage = 'en';

    const imageDetails = {
        en: {
            'meningioma.jpeg': ['Tumor: any', 'Tumorous:any', 'Overview:any', 'Severity:any', 'Accuracy:any', 'Dimensions:any', 'Therapies:any', 'Removable:any'],
            'test.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],
            'meningioma3.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],

            'hemangioblastoma.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],
            'hemangioblastoma2.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],
            'hemangioblastoma3.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],


            'medulloblastoma.jpg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],
            'medulloblastoma1.jpg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],
            'medulloblastoma2.jpg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],


            'pilocyticastrocytoma.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],
            'pilocyticastrocytoma1.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],
            'pilocyticastrocytoma2.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],


            'centralneurocytoma.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],
            'centralneurocytoma1.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],
            'centralneurocytoma2.jpeg': ['Tumor:', 'Tumorous:', 'Overview:', 'Severity:', 'Accuracy:', 'Dimensions:', 'Therapies:', 'Removable:'],

        },
        ar: {
            'meningioma.jpeg': ['الورم: ورم السحايا', 'ورم: نعم', 'نظرة عامة: الورم السحائي هو ورم يتشكل على الأغشية التي تغطي الدماغ والحبل الشوكي داخل الجمجمة.', 'شدة: منخفضة', 'دقة: 95%', 'الأبعاد: 4.5 سم × 3.5 سم', 'العلاجات: الجراحة، الإشعاع', 'قابل للإزالة: نعم'],
            'test.jpeg': ['ورم: نعم', 'نظرة عامة: نظرة عامة اختبارية للورم.', 'شدة: متوسطة', 'دقة: 90%', 'الأبعاد: 5.0 سم × 4.0 سم', 'العلاجات: الجراحة، الإشعاع', 'قابل للإزالة: نعم'],
            'meningioma2.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],


            'hemangioblastoma.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],
            'hemangioblastoma2.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],
            'hemangioblastoma3.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],

            'medulloblastoma.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:ss', 'قابل للإزالة:ss'],
            'medulloblastoma1.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],
            'medulloblastoma2.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],


            'pilocyticastrocytoma.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:ss', 'العلاجات:ss', 'قابل للإزالة:ss'],
            'pilocyticastrocytoma1.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],
            'pilocyticastrocytoma2.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],


            'centralneurocytoma.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:ss', 'العلاجات:ss', 'قابل للإزالة:ss'],
            'centralneurocytoma1.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],
            'centralneurocytoma2.jpeg': ['الورم:', 'ورم:', 'نظرة عامة:', 'شدة:', 'دقة:', 'الأبعاد:', 'العلاجات:', 'قابل للإزالة:'],

        }
    };

    function updateImageDetails(imgSrc) {
        const imgName = imgSrc.split('/').pop();
        const details = imageDetails[currentLanguage][imgName];
        imageInfo.innerHTML = ''; // Clear previous content
        const ul = document.createElement('ul');
        if (currentLanguage === 'ar') {
            ul.classList.add('arabic-text');
        }
        details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            ul.appendChild(li);
        });
        imageInfo.appendChild(ul);
        selectedImage.style.display = 'block'; // Ensure the image is displayed
        imageInfo.style.display = 'block'; // Ensure the info is displayed
    }

    languageToggle.addEventListener('change', () => {
        currentLanguage = languageToggle.checked ? 'ar' : 'en';
        if (selectedImage.src) {
            updateImageDetails(selectedImage.src);
        }
    });

    images.forEach(image => {
        image.addEventListener('click', (e) => {
            const imgSrc = e.target.src;
            const imgAlt = e.target.alt;
            selectedImage.src = imgSrc;
            selectedImage.alt = imgAlt;
            updateImageDetails(imgSrc);
        });
    });

    clearButton.addEventListener('click', () => {
        selectedImage.src = '';
        selectedImage.alt = '';
        imageInfo.textContent = '';
        selectedImage.style.display = 'none';
        imageInfo.style.display = 'none';

    });
    document.addEventListener('DOMContentLoaded', () => {
        const folders = document.querySelectorAll('.folder h3');

        function handleFolderClick() {
            const imagesContainer = this.nextElementSibling;
            document.querySelectorAll('.folder .images').forEach(container => {
                container.style.display = 'none'; // Ensure all are closed
            });
            if (images[imagesContainer] === 'flex') {
                imagesContainer.style.display = 'none'; // Hide if it was visible
            } else {
                imagesContainer.style.display = 'flex'; // Show if it was hidden
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
        folderTitles: {
            meningioma: 'Meningioma',
            hemangioblastoma: 'Hemangioblastoma',
            medulloblastoma: 'Medulloblastoma',
            pilocyticAstrocytoma: 'Pilocytic Astrocytoma',
            centralNeurocytoma: 'Central Neurocytoma'
        },
        clearButton: 'Clear',
        menuItems: {
            menunavi: 'Navigation',
            introduction: ' Introduction',
            feedback: ' Feedback',
            about: ' About Us'
        },
    },
    ar: {
        title: 'كيفية العرض - التعرف على أورام الدماغ بالرنين المغناطيسي',
        demoTitle: 'كيفية العرض',
        demoParagraph: 'انقر على مجلد لفتحه وعرض الصور بداخله. يمكن فتح مجلد واحد فقط في كل مرة. عندما تختار صورة من أي مجلد، ستظهر المعلومات عنها',
        sidebarTitle: 'أنواع أورام الدماغ بالرنين المغناطيسي',
        folderTitles: {
            meningioma: 'ورم السحايا',
            hemangioblastoma: 'ورم وعائي دموي',
            medulloblastoma: 'ورم أرومي نخاعي',
            pilocyticAstrocytoma: 'ورم نجمي شعري',
            centralNeurocytoma: 'ورم عصبي مركزي'
        },
        clearButton: 'مسح',
        menuItems: {
            about: 'مقدمة',
            feedback: ' الملاحظات',
            introduction: ' نبذة عنا',
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
        { selector: '#menu-intro', property: 'innerHTML', value: translations[lang].menuItems.introduction },
        { selector: '#menu-feedback', property: 'innerHTML', value: translations[lang].menuItems.feedback },
        { selector: '#menu-about', property: 'innerHTML', value: translations[lang].menuItems.about },
        { selector: '#menunavi', property: 'textContent', value: translations[lang].menuItems.menunavi }
    ];


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
    folders[0].textContent = translations[lang].folderTitles.meningioma;
    folders[1].textContent = translations[lang].folderTitles.hemangioblastoma;
    folders[2].textContent = translations[lang].folderTitles.medulloblastoma;
    folders[3].textContent = translations[lang].folderTitles.pilocyticAstrocytoma;
    folders[4].textContent = translations[lang].folderTitles.centralNeurocytoma;

}

document.getElementById('language-toggle').addEventListener('change', toggleLanguage);
