// 多语言支持模块
const translations = {
    'zh': {
        'nav.about': '关于我',
        'nav.portfolio': '作品集',
        'nav.skills': '技能',
        'nav.experience': '专业经历',
        'nav.achievements': '个人成就',
        'nav.contact': '联系方式',
        'hero.title': '你好，我是',
        'hero.highlight': 'Python Developer',
        'hero.subtitle': '擅长消息中间件、实时数据处理、高可用架构设计',
        'hero.btn1': '查看作品集',
        'hero.btn2': '联系我',
        'about.title': '关于我',
        'about.text1': '我是一名Python Developer，擅长消息中间件、实时数据处理、高可用架构设计。拥有丰富的后端开发经验，熟悉分布式系统和云原生技术。',
        'about.text2': '我热衷于技术创新，不断学习新技术。喜欢Rust、幸运星、孤独摇滚、摇曳露营。',
        'about.name': '姓名:',
        'about.major': '专业:',
        'about.email': '邮箱:',
        'about.phone': '电话:',
        'about.devName': '开发者姓名',
        'about.devMajor': 'Python开发',
        'about.devEmail': 'developer@example.com',
        'about.devPhone': '+86 123 4567 8910',
        'portfolio.title': '作品集',
        'portfolio.subtitle': '以下是我近期完成的一些项目',
        'portfolio.item1.title': '项目名称1',
        'portfolio.item1.desc': '项目简短描述，介绍这个项目的主要内容和特点。',
        'portfolio.item1.btn': '查看详情',
        'portfolio.item2.title': '项目名称2',
        'portfolio.item2.desc': '项目简短描述，介绍这个项目的主要内容和特点。',
        'portfolio.item2.btn': '查看详情',
        'portfolio.item3.title': '项目名称3',
        'portfolio.item3.desc': '项目简短描述，介绍这个项目的主要内容和特点。',
        'portfolio.item3.btn': '查看详情',
        'portfolio.item4.title': '项目名称4',
        'portfolio.item4.desc': '项目简短描述，介绍这个项目的主要内容和特点。',
        'portfolio.item4.btn': '查看详情',
        'skills.title': '专业技能',
        'skills.python': 'Python',
        'skills.mongodb': 'MongoDB',
        'skills.nextjs': 'Next.js',
        'skills.elasticsearch': 'ElasticSearch',
        'skills.rust': 'Rust',
        'experience.title': '专业经历',
        'experience.item1.title': '清华大学',
        'experience.item1.desc': '本科',
        'experience.item2.title': '斯坦福大学',
        'experience.item2.desc': '硕士',
        'experience.item3.title': 'Google',
        'experience.item3.desc': '软件工程师',
        'experience.item4.title': 'OpenAI',
        'experience.item4.desc': '软件工程师',
        'achievements.title': '个人成就',
        'achievements.item1.title': '清华大学优秀毕业生',
        'achievements.item2.title': '微软MVP',
        'achievements.item3.title': '华为开发者认证',
        'contact.title': '联系我',
        'contact.subtitle': '如果您对我的作品感兴趣，或者有任何合作机会，请随时联系我',
        'contact.form.name': '您的姓名',
        'contact.form.email': '您的邮箱',
        'contact.form.message': '您的留言',
        'contact.form.btn': '发送消息',
        'footer.logo': '我的作品集',
        'footer.copyright': '&copy; 2023 个人作品集. 保留所有权利。',
        'form.alert': '请填写所有必填字段',
        'form.success': '感谢您的留言，{{name}}！我们会尽快回复您。'
    },
    'en': {
        'nav.about': 'About',
        'nav.portfolio': 'Portfolio',
        'nav.skills': 'Skills',
        'nav.experience': 'Experience',
        'nav.achievements': 'Achievements',
        'nav.contact': 'Contact',
        'hero.title': 'Hello, I am a',
        'hero.highlight': 'Python Developer',
        'hero.subtitle': 'Specialized in message middleware, real-time data processing, and high availability architecture design',
        'hero.btn1': 'View Portfolio',
        'hero.btn2': 'Contact Me',
        'about.title': 'About Me',
        'about.text1': 'I am a Python Developer specialized in message middleware, real-time data processing, and high availability architecture design. With rich backend development experience, I am familiar with distributed systems and cloud-native technologies.',
        'about.text2': 'I am passionate about technological innovation and constantly learning new technologies. I like Rust, Lucky Star, Bocchi the Rock!, and Yuru Camp.',
        'about.name': 'Name:',
        'about.major': 'Major:',
        'about.email': 'Email:',
        'about.phone': 'Phone:',
        'about.devName': 'Developer Name',
        'about.devMajor': 'Python Development',
        'about.devEmail': 'developer@example.com',
        'about.devPhone': '+86 123 4567 8910',
        'portfolio.title': 'Portfolio',
        'portfolio.subtitle': 'Here are some of my recent projects',
        'portfolio.item1.title': 'Project Name 1',
        'portfolio.item1.desc': 'A brief description of the project, introducing the main content and features.',
        'portfolio.item1.btn': 'View Details',
        'portfolio.item2.title': 'Project Name 2',
        'portfolio.item2.desc': 'A brief description of the project, introducing the main content and features.',
        'portfolio.item2.btn': 'View Details',
        'portfolio.item3.title': 'Project Name 3',
        'portfolio.item3.desc': 'A brief description of the project, introducing the main content and features.',
        'portfolio.item3.btn': 'View Details',
        'portfolio.item4.title': 'Project Name 4',
        'portfolio.item4.desc': 'A brief description of the project, introducing the main content and features.',
        'portfolio.item4.btn': 'View Details',
        'skills.title': 'Professional Skills',
        'skills.python': 'Python',
        'skills.mongodb': 'MongoDB',
        'skills.nextjs': 'Next.js',
        'skills.elasticsearch': 'ElasticSearch',
        'skills.rust': 'Rust',
        'experience.title': 'Professional Experience',
        'experience.item1.title': 'Tsinghua University',
        'experience.item1.desc': 'Bachelor\'s Degree',
        'experience.item2.title': 'Stanford University',
        'experience.item2.desc': 'Master\'s Degree',
        'experience.item3.title': 'Google',
        'experience.item3.desc': 'Software Engineer',
        'experience.item4.title': 'OpenAI',
        'experience.item4.desc': 'Software Engineer',
        'achievements.title': 'Achievements',
        'achievements.item1.title': 'Outstanding Graduate of Tsinghua University',
        'achievements.item2.title': 'Microsoft MVP',
        'achievements.item3.title': 'Huawei Developer Certification',
        'contact.title': 'Contact Me',
        'contact.subtitle': 'If you are interested in my work or have any cooperation opportunities, please feel free to contact me',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Your Email',
        'contact.form.message': 'Your Message',
        'contact.form.btn': 'Send Message',
        'footer.logo': 'My Portfolio',
        'footer.copyright': '&copy; 2023 My Portfolio. All rights reserved.',
        'form.alert': 'Please fill in all required fields',
        'form.success': 'Thank you for your message, {{name}}! We will reply to you as soon as possible.'
    }
};

// 切换语言函数
function changeLanguage(lang) {
    // 设置当前语言到localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // 更新所有需要翻译的元素
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // 更新所有placeholder
    document.querySelectorAll('[data-placeholder-lang]').forEach(element => {
        const key = element.getAttribute('data-placeholder-lang');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // 更新页面语言属性
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    
    // 更新语言切换按钮状态
    document.querySelectorAll('.language-switch button').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 初始化语言
function initLanguage() {
    // 获取用户首选语言，默认中文
    const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
    changeLanguage(savedLang);
}

// 导出函数供外部使用
export { changeLanguage, initLanguage, translations };

// 暴露到全局作用域，以便HTML中的按钮可以调用
window.changeLanguage = changeLanguage;