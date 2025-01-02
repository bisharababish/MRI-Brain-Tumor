
const lang = getCurrentLanguage();
document.body.classList.toggle('arabic', lang === 'ar');
document.getElementById('lang-label').textContent = lang === 'ar' ? 'AR' : 'EN';

const translations = {
    en: {
        title: 'About Us - MRI Brain Tumor Recognition',
        member1: {
            name: 'Bishara Babish',
            role: 'Web Designer & Application Co-Developer',
            about: 'I am Bishara Babish, a 22-year-old Computer Science student at Al-Quds University with a keen interest in web design, application development, and documentation. My academic journey and diverse experiences have equipped me with a robust skill set, making me adept at tackling complex projects and delivering high-quality results.',
            education: 'Education and Experience:',
            educationDetails: 'Currently, I am pursuing my Bachelor\'s degree in Computer Science, where I have developed a solid foundation in various programming languages and technologies. My expertise includes Java, C++, SQL, JavaScript, HTML, and CSS, among others. Throughout my studies, I have actively participated in multiple projects, honing my skills in both frontend and backend development. I had the privilege of participating in an engineering exchange program in Germany, which broadened my perspective and provided me with valuable international experience. During this program, I collaborated with diverse teams, enhancing my problem-solving abilities and cultural awareness. My internship at ZeMa International further refined my web design and development skills. I worked on several projects, where I was responsible for designing intuitive user interfaces and ensuring seamless user experiences. This role solidified my understanding of industry standards and best practices in web development.',
            contributions: 'Project Contributions:',
            contributionsDetails: 'In our MRI Brain Tumor Recognition senior project, I have taken on the role of Web Designer and Application Co-Developer. My contributions include: User Interface Design: I designed the user interface for our application, focusing on creating a user-friendly and visually appealing experience. My design ensures that users can navigate the application effortlessly, enhancing overall usability. Frontend Development: I implemented the frontend components of our application using HTML, CSS, and JavaScript. My attention to detail ensures that the application is responsive and performs well across different devices and browsers. Documentation: I have meticulously documented the project\'s development process, providing clear and comprehensive guides for future reference. This documentation is crucial for maintaining project continuity and facilitating future enhancements.',
            interests: 'Personal Interests:',
            interestsDetails: 'Beyond my professional pursuits, I have a passion for gaming and coding. These hobbies not only provide a creative outlet but also keep me updated with the latest trends and technologies in the industry. Additionally, I have a strong interest in learning new things about the earth, which fuels my curiosity and drives my desire for continuous learning.',
            conclusion: 'Conclusion:',
            conclusionDetails: 'My journey in computer science and web development has been marked by continuous growth and learning. I am committed to leveraging my skills and experiences to contribute meaningfully to innovative projects. The MRI Brain Tumor Recognition project has been a significant milestone in my academic career, and I am excited about the potential impact it can have in the field of medical diagnostics.'
        },
        member2: {
            name: 'Saliba Rishmawi',
            role: 'Project Lead & AI Researcher and App Co-Developer',
            about: 'I am Saliba Rishmawi, a 22-year-old Computer Science student at Al-Quds University with a strong focus on AI model development. My academic and professional journey has been driven by a passion for innovative technology and its applications in solving real-world problems.',
            education: 'Education and Experience:',
            educationDetails: 'I am currently completing my Bachelor\'s degree in Computer Science, which has provided me with a comprehensive understanding of various programming languages and AI technologies. My technical expertise includes Java, Python, and SQL, allowing me to develop and implement sophisticated AI models. Through an engineering exchange program in Germany, I gained invaluable international experience, working alongside diverse teams and enhancing my technical and interpersonal skills. This experience was pivotal in shaping my approach to problem-solving and collaboration. My internship at Hydac International allowed me to apply my AI knowledge in a practical setting. I developed and refined AI models, contributing to the company\'s innovative projects and gaining hands-on experience in AI research and development.',
            contributions: 'Project Contributions:',
            contributionsDetails: 'As the Project Lead and AI Researcher for our MRI Brain Tumor Recognition senior project, my contributions include: AI Model Development: I have led the development and integration of AI models for tumor detection, ensuring the application provides accurate and reliable results. My focus has been on leveraging machine learning techniques to enhance diagnostic capabilities. Project Management: I have overseen the project\'s progress, coordinating tasks and ensuring that milestones are met. My role as the project lead involves strategic planning and maintaining high standards throughout the development process. Application Development: Alongside AI research, I have contributed to the application\'s development, ensuring a seamless integration of AI functionalities and user interface elements.',
            interests: 'Personal Interests:',
            interestsDetails: 'In addition to my academic and professional pursuits, I enjoy swimming, hiking, and exploring new technologies. These hobbies keep me physically active and intellectually curious, driving my passion for continuous learning and innovation.',
            conclusion: 'Conclusion:',
            conclusionDetails: 'My dedication to AI research and development has been a cornerstone of my academic career. The MRI Brain Tumor Recognition project represents a significant achievement, showcasing my ability to apply AI technology to address critical healthcare challenges. I am excited about the potential impact of our project and look forward to contributing further to the field of AI and medical diagnostics.'
        },
        menuItems: {
            introduction: 'Introduction',
            howToDemo: 'How To Demo',
            menunavi: 'Navigation'
        }
    },
    ar: {
        title: 'معلومات عنا - التعرف على أورام الدماغ بالرنين المغناطيسي',
        member1: {
            name: 'بشارة البعبيش',
            role: 'مصمم ويب ومطور تطبيقات مشارك',
            about: 'أنا بشارة البعبيش، طالب علم حاسوب، و عمري 22 عامًا، و ادرس في جامعة القدس مع اهتمام كبير بتصميم الويب وتطوير التطبيقات والتوثيق. رحلتي الأكاديمية وتجارب المتنوعة زودتني بمجموعة مهارات قوية، مما جعلني بارعًا في معالجة المشاريع المعقدة وتقديم نتائج عالية الجودة',
            education: 'التعليم والخبرة:',
            educationDetails: 'حاليًا، أنا أتابع درجة البكالوريوس في علم الحاسوب، حيث طورت أساسًا قويًا في مختلف لغات البرمجة والتقنيات. تشمل خبرتي Java وC++ وSQL وJavaScript وHTML وCSS وغيرها. طوال دراستي، شاركت بنشاط في مشاريع متعددة، مما ساعدني في صقل مهاراتي في تطوير الواجهة الأمامية والخلفية. كان لدي شرف المشاركة في برنامج تبادل هندسي في ألمانيا، الذي وسع آفاقي وزودني بتجربة دولية قيمة. خلال هذا البرنامج، تعاونت مع فرق متنوعة، مما عزز من قدراتي في حل المشكلات والوعي الثقافي. أضافت فترة تدريبي في ZeMa International المزيد من الصقل على مهاراتي في تصميم وتطوير الويب. عملت على عدة مشاريع حيث كنت مسؤولًا عن تصميم واجهات مستخدم بديهية وضمان تجارب مستخدم سلسة. هذا الدور عزز فهمي لمعايير الصناعة وأفضل الممارسات في تطوير الويب',
            contributions: 'مساهمات المشروع:',
            contributionsDetails: 'في مشروع التخرج الخاص بنا للتعرف على أورام الدماغ بالرنين المغناطيسي، توليت دور مصمم الويب ومطور التطبيقات المشارك. تشمل مساهماتي: تصميم واجهة المستخدم: قمت بتصميم واجهة المستخدم لتطبيقنا، مع التركيز على خلق تجربة مستخدم ودية وجذابة بصريًا. يضمن تصميمي أن يتمكن المستخدمون من التنقل في التطبيق بسهولة، مما يعزز من سهولة الاستخدام بشكل عام. تطوير الواجهة الأمامية: نفذت مكونات الواجهة الأمامية لتطبيقنا باستخدام HTML وCSS وJavaScript. يضمن انتباهي للتفاصيل أن التطبيق يستجيب ويعمل جيدًا عبر مختلف الأجهزة والمتصفحات. التوثيق: وثقت عملية تطوير المشروع بعناية، مما يوفر أدلة واضحة وشاملة للرجوع إليها في المستقبل. هذه التوثيق ضروري للحفاظ على استمرارية المشروع وتسهيل التحسينات المستقبلية',
            interests: 'الاهتمامات الشخصية:',
            interestsDetails: 'بجانب اهتماماتي المهنية، لدي شغف بالألعاب والبرمجة. هذه الهوايات لا توفر لي منفذًا إبداعيًا فحسب، بل تبقيني محدثًا بأحدث الاتجاهات والتقنيات في الصناعة. بالإضافة إلى ذلك، لدي اهتمام قوي بالتعلم عن الأشياء الجديدة حول الأرض، مما يغذي فضولي ويدفع رغبتي في التعلم المستمر',
            conclusion: 'الخاتمة:',
            conclusionDetails: 'كانت رحلتي في علوم الحاسوب وتطوير الويب مليئة بالنمو والتعلم المستمر. أنا ملتزم باستخدام مهاراتي وخبراتي للمساهمة بشكل مفيد في المشاريع المبتكرة. كان مشروع التعرف على أورام الدماغ بالرنين المغناطيسي علامة بارزة في مسيرتي الأكاديمية، وأنا متحمس للتأثير المحتمل الذي يمكن أن يحدثه في مجال التشخيص الطبي'
        },

        member2: {
            name: 'صليبا رشماوي',
            role: 'قائد المشروع وباحث في الذكاء الاصطناعي ومطور التطبيقات مشارك',
            about: 'أنا صليبا رشماوي، طالب علم حاسوب، و عمري 22 عامًا، و ادرس في جامعة القدس مع تركيز قوي على تطوير نماذج الذكاء الاصطناعي. كانت رحلتي الأكاديمية والمهنية مدفوعة بشغف للتكنولوجيا المبتكرة وتطبيقاتها في حل المشكلات الواقعية',
            education: 'التعليم والخبرة:',
            educationDetails: 'أنا حاليا أكمل درجة البكالوريوس في علم الحاسوب، والتي زودتني بفهم شامل لمختلف لغات البرمجة وتقنيات الذكاء الاصطناعي. تشمل خبرتي الفنية Java وPython وSQL، مما يسمح لي بتطوير وتنفيذ نماذج ذكاء اصطناعي متطورة. من خلال برنامج تبادل هندسي في ألمانيا، اكتسبت خبرة دولية لا تقدر بثمن، حيث عملت مع فرق متنوعة وعززت مهاراتي التقنية والشخصية. كانت هذه التجربة محورية في تشكيل نهجي لحل المشكلات والتعاون. سمحت لي فترة تدريبي في Hydac International بتطبيق معرفتي بالذكاء الاصطناعي في بيئة عملية. طورت وصقلت نماذج الذكاء الاصطناعي، مما ساهم في مشاريع الشركة المبتكرة واكتسبت خبرة عملية في البحث والتطوير في مجال الذكاء الاصطناعي',
            contributions: 'مساهمات المشروع:',
            contributionsDetails: 'بصفتي قائد المشروع وباحث في الذكاء الاصطناعي لمشروع التخرج الخاص بنا للتعرف على أورام الدماغ بالرنين المغناطيسي، تشمل مساهماتي: تطوير نموذج الذكاء الاصطناعي: قمت بقيادة تطوير ودمج نماذج الذكاء الاصطناعي للكشف عن الأورام، مما يضمن أن يوفر التطبيق نتائج دقيقة وموثوقة. كان تركيزي على استخدام تقنيات التعلم الآلي لتعزيز قدرات التشخيص. إدارة المشروع: قمت بالإشراف على تقدم المشروع، وتنسيق المهام وضمان تحقيق المعالم. يتضمن دوري كقائد المشروع التخطيط الاستراتيجي والحفاظ على معايير عالية طوال عملية التطوير. تطوير التطبيقات: بجانب البحث في الذكاء الاصطناعي، ساهمت في تطوير التطبيق، وضمان تكامل سلس لوظائف الذكاء الاصطناعي وعناصر واجهة المستخدم',
            interests: 'الاهتمامات الشخصية:',
            interestsDetails: 'بالإضافة إلى اهتماماتي الأكاديمية والمهنية، أستمتع بالسباحة، والتنزه، واستكشاف التقنيات الجديدة. هذه الهوايات تحافظ على نشاطي البدني وفضولي الفكري، مما يدفع شغفي بالتعلم المستمر والابتكار',
            conclusion: 'الخاتمة:',
            conclusionDetails: 'كان التزامي بالبحث والتطوير في مجال الذكاء الاصطناعي ركيزة أساسية في مسيرتي الأكاديمية. يمثل مشروع التعرف على أورام الدماغ بالرنين المغناطيسي إنجازًا مهمًا، يبرز قدرتي على تطبيق تكنولوجيا الذكاء الاصطناعي لمعالجة التحديات الصحية الحيوية. أنا متحمس للتأثير المحتمل لمشروعنا وأتطلع إلى المساهمة بشكل أكبر في مجال الذكاء الاصطناعي والتشخيص الطبي'
        },
        menuItems: {
            introduction: 'مقدمة ',
            howToDemo: ' كيفية العرض ',
            menunavi: 'تواصل معنا'
        }
    }
};

function toggleLanguage() {
    const isArabic = document.getElementById('language-toggle').checked;
    const lang = isArabic ? 'ar' : 'en';
    document.body.classList.toggle('arabic', isArabic);

    const elementsToUpdate = [
        { selector: 'title', property: 'textContent', value: translations[lang].title },
        { selector: '.team-member:nth-child(1) .member-details h3', property: 'textContent', value: translations[lang].member1.name },
        { selector: '.team-member:nth-child(1) .member-role', property: 'textContent', value: translations[lang].member1.role },
        {
            selector: '.team-member:nth-child(1) .member-bio', property: 'innerHTML', value: `
            <p class="bio-label">${isArabic ? 'نبذة عني:' : 'About Me:'}</p>
            <p>${translations[lang].member1.about}</p>
            <p class="bio-label">${isArabic ? 'التعليم والخبرة:' : 'Education and Experience:'}</p>
            <p>${translations[lang].member1.educationDetails}</p>
            <p class="bio-label">${isArabic ? 'مساهمات المشروع:' : 'Project Contributions:'}</p>
            <p>${translations[lang].member1.contributionsDetails}</p>
            <p class="bio-label">${isArabic ? 'الاهتمامات الشخصية:' : 'Personal Interests:'}</p>
            <p>${translations[lang].member1.interestsDetails}</p>
            <p class="bio-label">${isArabic ? 'الخاتمة:' : 'Conclusion:'}</p>
            <p>${translations[lang].member1.conclusionDetails}</p>
        `},
        { selector: '.team-member:nth-child(2) .member-details h3', property: 'textContent', value: translations[lang].member2.name },
        { selector: '.team-member:nth-child(2) .member-role', property: 'textContent', value: translations[lang].member2.role },
        {
            selector: '.team-member:nth-child(2) .member-bio', property: 'innerHTML', value: `
            <p class="bio-label">${isArabic ? 'نبذة عني:' : 'About Me:'}</p>
            <p>${translations[lang].member2.about}</p>
            <p class="bio-label">${isArabic ? 'التعليم والخبرة:' : 'Education and Experience:'}</p>
            <p>${translations[lang].member2.educationDetails}</p>
            <p class="bio-label">${isArabic ? 'مساهمات المشروع:' : 'Project Contributions:'}</p>
            <p>${translations[lang].member2.contributionsDetails}</p>
            <p class="bio-label">${isArabic ? 'الاهتمامات الشخصية:' : 'Personal Interests:'}</p>
            <p>${translations[lang].member2.interestsDetails}</p>
            <p class="bio-label">${isArabic ? 'الخاتمة:' : 'Conclusion:'}</p>
            <p>${translations[lang].member2.conclusionDetails}</p>
        `},
        { selector: '#menu-intro', property: 'innerHTML', value: translations[lang].menuItems.introduction },
        { selector: '#menu-demo', property: 'innerHTML', value: translations[lang].menuItems.howToDemo },
        { selector: '#menunavi', property: 'innerHTML', value: translations[lang].menuItems.menunavi }

    ];
    window.pageTranslations = translations;

    document.getElementById('language-toggle').addEventListener('change', toggleLanguage);

    document.getElementById('lang-label').textContent = isArabic ? 'AR' : 'EN';

    elementsToUpdate.forEach(({ selector, property, value }) => {
        const element = document.querySelector(selector);
        if (element) element[property] = value;
    });

    document.getElementById('menu-intro').innerHTML = translations[lang].menuItems.introduction;
    document.getElementById('menu-demo').innerHTML = translations[lang].menuItems.howToDemo;
    document.getElementById('menu-feedback').innerHTML = translations[lang].menuItems.menunavi;


    window.addEventListener('scroll', function () {
        var slide = document.querySelector('.slide');
        var toggle = document.getElementById('toggle');
        if (toggle.checked && window.scrollY > 0) {
            toggle.checked = false;
        }
    });

}
document.getElementById('language-toggle').addEventListener('change', toggleLanguage);


document.addEventListener('DOMContentLoaded', () => {
    updateAboutUsContent();
    updateLanguageLinks();
    initializeLanguageToggle();
});