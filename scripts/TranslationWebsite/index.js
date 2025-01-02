
const lang = getCurrentLanguage();
document.body.classList.toggle('arabic', lang === 'ar');
document.getElementById('lang-label').textContent = lang === 'ar' ? 'AR' : 'EN';

const translations = {
    en: {
        title: 'MRI Brain Tumor Recognition',
        introTitle: 'Introduction',
        introParagraph: 'Welcome to a new era in medical diagnostics. Our MRI Brain Tumor Recognition Application harnesses the power of Artificial Intelligence (AI) to revolutionize the detection and analysis of brain tumors. Designed for accuracy and speed, our application specifically targets complex tumors such as: Glioma and No Tumor.',
        introSecondParagraph: 'MRI Brain Tumor Recognition Application is a combination of Artificial intelligence (AI) and MRI to accurately detect brain tumors. Unlike the traditional method that relies on radiologists, the application provides a fast, accurate, and efficient way to diagnose brain tumors and offer patients the necessary information, including possible treatments. This project aims to improve the detection of brain tumors faster and with a higher success rate than the traditional method.',
        introThirdParagraph: 'Led by two dedicated computer science students passionate about leveraging technology for societal betterment, our project focuses on blending expertise in AI, medical imaging, and oncology. With a shared commitment to advancing healthcare, we aspire to contribute significantly to the collective efforts in the fight against brain cancer.',
        footertitle: 'Contact Us',
        contactdetails: 'If you would like to get in touch, feel free to reach out via email. We are always happy to assist!',
        contactdetailsEmail: 'Email us at:',
        menuItems: {
            menunavi: 'Navigation',
            introduction: 'Introduction',
            howToDemo: 'How To Demo',
            aboutUs: 'About Us',
        },
        imageTitles: {
            Glioma: 'Glioma',
            NoTumor: 'No Tumor',
        }

    },
    ar: {
        title: 'التعرف على أورام الدماغ بالرنين المغناطيسي',
        introTitle: 'مقدمة',
        introParagraph: 'مرحبًا بكم في عصر جديد في التشخيص الطبي. يستخدم تطبيق التعرف على أورام الدماغ. بالرنين لاحداث ثورة في اكتشاف وتحليل أورام الدماغ مصمم بدقة الذكاء الاصطناعي التي لديها السرعة البديهة، و يستهدف نطبيقنا بشكل خاص الأورام المعقدة مثل: الورم الدبقي، لا ورم  ',
        introSecondParagraph: 'تطبيق التعرف على أورام الدماغ بالرنين المغناطيسي يجمع بين الذكاء الاصطناعي و تقنيات الرنين المغناطيسي لاكتشاف أورام الدماغ بدقة فائقة، بخلاف الطرق التقليدية التي تعتمد على أطباء الأشعة، يوفر هذا التطبيق وسيلة سريعة, دقيقة و فعالة لتشخيص أورام الدماغ و تزويد المرضى بالمعلومات الضرورية، بما في ذلك الخيارات العلاجية المحتملة. و يهدف هذا المشروع الى تحسين سرعة و دقة اكشتاف أورام الدماغ مع تحقيق معدل نجاح أعلى مقارنة بالطرق التقليدية',
        introThirdParagraph: 'يقود مشروعنا طالبان مخلصان في مجال علوم الكمبيوتر، شغوفان باستخدام التكنولوجيا لتحسين المجتمع، يركز مشروعنا على دمج الخبرات في الذكاء الاصطناعي، التصوير الطبي، وعلم الأورام. من خلال التزام مشترك بتطوير الرعاية الصحية، نطمح إلى المساهمة بشكل كبير في الجهود الجماعية لمكافحة سرطان الدماغ',
        footertitle: 'تواصلوا معنا',
        contactdetails: '!إذا هناك أي شيء أو استفسارات قد تكون لديك، فلا تتردد في التواصل معنا. فريقنا موجود لمساعدتك بأي طريقة ممكنة، رضاكم هو أولويتنا القصوى',
        contactdetailsEmail: ':راسلنا عبر البريد الإلكتروني',
        menuItems: {
            introduction: ' مقدمة',
            howToDemo: 'كيفية العرض',
            aboutUs: ' نبذة عنا',
            menunavi: 'تصفح'
        },
        imageTitles: {
            Glioma: 'الورم دبقي',
            NoTumor: 'لا يوجد ورم',
        }
    }
};

function toggleLanguage() {
    const isArabic = document.getElementById('language-toggle').checked;

    const lang = isArabic ? 'ar' : 'en';
    document.body.classList.toggle('arabic', isArabic);
    document.getElementById('lang-label').textContent = isArabic ? 'AR' : 'EN';

    const elementsToUpdate = [
        { selector: 'title', property: 'textContent', value: translations[lang].title },
        { selector: '.header h1', property: 'innerHTML', value: isArabic ? 'التعرف على أورام الدماغ <span class="highlight"> بالرنين المغناطيسي</span>' : '<span class="highlight">MRI</span> Brain Tumor Recognition' },
        { selector: '.section-title', property: 'textContent', value: translations[lang].introTitle },
        { selector: '#intro-paragraph', property: 'textContent', value: translations[lang].introParagraph },
        { selector: '#intro-second-paragraph', property: 'textContent', value: translations[lang].introSecondParagraph },
        { selector: '#intro-third-paragraph', property: 'textContent', value: translations[lang].introThirdParagraph },
        { selector: '.footer-title', property: 'textContent', value: translations[lang].footertitle },
        { selector: '.footer-content p', property: 'textContent', value: translations[lang].contactdetails },
        { selector: '.contact-details p', property: 'textContent', value: translations[lang].contactdetailsEmail },
        { selector: '#menu-intro', property: 'innerHTML', value: translations[lang].menuItems.introduction },
        { selector: '#menu-demo', property: 'innerHTML', value: translations[lang].menuItems.howToDemo },
        { selector: '#menu-about', property: 'innerHTML', value: translations[lang].menuItems.aboutUs },
        { selector: '#menunavi', property: 'textContent', value: translations[lang].menuItems.menunavi }
    ];

    window.pageTranslations = translations;
    document.getElementById('language-toggle').addEventListener('change', toggleLanguage);

    elementsToUpdate.forEach(({ selector, property, value }) => {
        const element = document.querySelector(selector);
        if (element) element[property] = value;
    });
    const images = document.querySelectorAll('.intro-image');
    images.forEach((img, index) => {
        const titleKey = Object.keys(translations[lang].imageTitles)[index];
        img.title = translations[lang].imageTitles[titleKey];
    });
    document.getElementById('menu-intro').innerHTML = translations[lang].menuItems.introduction;
    document.getElementById('menu-demo').innerHTML = translations[lang].menuItems.howToDemo;
    document.getElementById('menu-about').innerHTML = translations[lang].menuItems.aboutUs;

}

document.addEventListener('DOMContentLoaded', () => {
    updateLanguageLinks();
    initializeLanguageToggle();
});

// close slide
window.addEventListener('scroll', function () {
    var slide = document.querySelector('.slide');
    var toggle = document.getElementById('toggle');
    if (toggle.checked && window.scrollY > 0) {
        toggle.checked = false;
    }
});
