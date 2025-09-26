// DOM 元素选择器
// 导入多语言支持模块
import { initLanguage, translations } from './language.js';

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const contactForm = document.getElementById('contactForm');
const skillProgress = document.querySelectorAll('.skill-progress');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// 汉堡菜单切换功能
function toggleMenu() {
    // 切换导航链接显示状态
    navLinks.classList.toggle('active');
    // 切换汉堡菜单动画
    hamburger.classList.toggle('active');
    
    // 为每个导航项添加动画
    navItems.forEach((item, index) => {
        if (item.style.animation) {
            item.style.animation = '';
        } else {
            item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

// 平滑滚动功能
function smoothScroll() {
    // 为所有锚点链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 滚动到目标位置
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
                
                // 如果是移动设备，点击后关闭菜单
                if (window.innerWidth < 768) {
                    toggleMenu();
                }
            }
        });
    });
}

// 联系表单提交处理
function handleFormSubmit(e) {
    e.preventDefault();
    
    // 获取表单数据
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // 获取当前语言
    const currentLang = localStorage.getItem('preferredLanguage') || 'zh';
    
    // 简单的表单验证
    if (!name || !email || !message) {
        alert(translations[currentLang]['form.alert']);
        return;
    }
    
    // 这里可以添加AJAX请求发送表单数据
    // 为了演示，我们只是显示一个成功消息
    alert(translations[currentLang]['form.success'].replace('{{name}}', name));
    
    // 重置表单
    contactForm.reset();
}

// 技能条动画
function animateSkills() {
    const skillsSection = document.querySelector('.skills');
    let skillsAnimated = false;
    
    function checkScroll() {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillsPosition < screenPosition && !skillsAnimated) {
            // 为每个技能条设置宽度
            skillProgress.forEach(skill => {
                const percent = skill.parentElement.nextElementSibling.textContent;
                skill.style.width = percent;
            });
            skillsAnimated = true;
        }
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', checkScroll);
    // 初始检查
    checkScroll();
}

// 作品集悬停效果
function portfolioHoverEffects() {
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const image = item.querySelector('.portfolio-image img');
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            const image = item.querySelector('.portfolio-image img');
            image.style.transform = 'scale(1)';
        });
    });
}

// 导航栏滚动效果
function navbarScrollEffect() {
    const header = document.querySelector('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    // 初始检查
    handleScroll();
}

// 添加动画样式
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            opacity: 0;
            animation: fadeIn 1s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

// 页面加载时执行
function init() {
    // 初始化语言
    initLanguage();
    
    // 添加动画样式
    addAnimationStyles();
    
    // 绑定事件监听器
    hamburger.addEventListener('click', toggleMenu);
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // 初始化功能
    smoothScroll();
    animateSkills();
    portfolioHoverEffects();
    navbarScrollEffect();
    
    // 页面加载完成后的动画
    document.addEventListener('DOMContentLoaded', () => {
        // 为主要部分添加淡入动画
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });
    });
}

// 启动应用
init();

// 导出一些功能供调试使用（可选）
if (typeof window !== 'undefined') {
    window.app = {
        toggleMenu,
        smoothScroll,
        handleFormSubmit
    };
}