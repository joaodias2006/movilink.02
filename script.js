// MoviLink - JavaScript Interativo

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initBlogFilters();
    initScrollAnimations();
    initSmoothScrolling();
    initHeaderScroll();
});

// Menu Mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Filtros do Blog
function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterButtons.length > 0 && blogCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Atualizar botões ativos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar cards
                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Animações no Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
        '.feature-card, .content-item, .mission-card, .topic-item, .blog-card, .team-member, .value-item, .approach-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Scroll Suave para Links Internos
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header com Scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Adicionar sombra no scroll
            if (scrollTop > 10) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
            
            // Esconder/mostrar header no scroll (opcional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy Loading para Imagens (se necessário)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Contador Animado (para estatísticas, se necessário)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Tooltip simples
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Busca simples no blog (se necessário)
function initBlogSearch() {
    const searchInput = document.querySelector('#blog-search');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (searchInput && blogCards.length > 0) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title a').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300));
    }
}

// Modo escuro (toggle)
function initDarkMode() {
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    
    if (darkModeToggle) {
        // Verificar preferência salva
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
        });
    }
}

// Compartilhamento social
function initSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title} ${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Formulário de contato (se necessário)
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simular envio
            showNotification('Mensagem enviada com sucesso!', 'success');
            this.reset();
        });
    }
}

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover notificação
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Voltar ao topo
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar funcionalidades adicionais quando necessário
// initLazyLoading();
// initTooltips();
// initBlogSearch();
// initDarkMode();
// initSocialShare();
// initContactForm();
initBackToTop();

// CSS adicional para funcionalidades JavaScript
const additionalCSS = `
.tooltip {
    position: absolute;
    background-color: var(--text-dark);
    color: var(--white);
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    z-index: 1000;
    pointer-events: none;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    background-color: #10b981;
}

.notification-error {
    background-color: #ef4444;
}

.notification-info {
    background-color: var(--primary-blue);
}

.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
    z-index: 1000;
}

.back-to-top.show {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    background-color: var(--dark-blue);
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .back-to-top {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
        font-size: 18px;
    }
    
    .notification {
        top: 10px;
        right: 10px;
        left: 10px;
        transform: translateY(-100%);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
`;

// ===== MOVILINK - JAVASCRIPT CORRIGIDO E SIMPLIFICADO =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 MoviLink - Inicializando...');
    
    // Inicializar funcionalidades básicas
    initMobileMenu();
    initTypingAnimation();
    initSmoothScrolling();
    
    // CORREÇÃO: Garantir que elementos estejam visíveis
    setTimeout(ensureVisibility, 100);
    
    console.log('✅ Sistema inicializado!');
});

// Função principal para garantir visibilidade
function ensureVisibility() {
    console.log('👀 Garantindo visibilidade dos elementos...');
    
    // Elementos que devem SEMPRE estar visíveis
    const criticalElements = [
        '.hero-title', '.hero-subtitle', '.hero-buttons',
        '.btn', '.btn-primary', '.btn-secondary',
        '.hero-image', '.hero-graphic', '.logistics-icon',
        '.arrow-flow', '.texto-animado', '.cursor-animado',
        '.feature-card', '.feature-icon', '.content-item',
        '.content-icon', '.nav-menu', '.nav-link'
    ];
    
    criticalElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element) {
                element.style.opacity = '1';
                element.style.visibility = 'visible';
                
                // Correções específicas de display
                if (selector.includes('btn')) {
                    element.style.display = 'inline-flex';
                } else if (selector.includes('graphic') || selector.includes('icon')) {
                    element.style.display = 'flex';
                } else if (selector.includes('image')) {
                    element.style.display = 'block';
                } else if (selector.includes('menu')) {
                    element.style.display = 'flex';
                }
            }
        });
    });
    
    // Correção específica para textos
    const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button');
    allTextElements.forEach(element => {
        if (element && window.getComputedStyle(element).opacity === '0') {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        }
    });
}

// Sistema de Menu Mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Animação de Digitação (ORIGINAL FUNCIONAL)
function initTypingAnimation() {
    const textoDinamico = document.getElementById('texto-dinamico');
    const cursorDinamico = document.getElementById('cursor-dinamico');
    
    if (!textoDinamico || !cursorDinamico) return;

    const palavras = ['Logística', 'Cadeia de Suprimentos', 'Gestão de Estoques', 'Processos Logísticos'];
    let palavraIndex = 0;
    let letraIndex = 0;
    let digitando = true;
    let timeoutId;

    function animarTexto() {
        const palavraAtual = palavras[palavraIndex];
        
        if (digitando && letraIndex <= palavraAtual.length) {
            textoDinamico.textContent = palavraAtual.substring(0, letraIndex);
            letraIndex++;
            timeoutId = setTimeout(animarTexto, 100);
        } else if (!digitando && letraIndex >= 0) {
            textoDinamico.textContent = palavraAtual.substring(0, letraIndex);
            letraIndex--;
            timeoutId = setTimeout(animarTexto, 50);
        } else if (!digitando && letraIndex === 0) {
            digitando = true;
            palavraIndex = (palavraIndex + 1) % palavras.length;
            timeoutId = setTimeout(animarTexto, 500);
        } else {
            digitando = false;
            timeoutId = setTimeout(animarTexto, 1500);
        }
    }
    
    // Garantir que elementos estejam visíveis antes de iniciar animação
    textoDinamico.style.opacity = '1';
    textoDinamico.style.visibility = 'visible';
    cursorDinamico.style.opacity = '1';
    cursorDinamico.style.visibility = 'visible';
    
    animarTexto();
}

// Scroll Suave
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Executar também quando a página carregar completamente
window.addEventListener('load', function() {
    setTimeout(ensureVisibility, 200);
});

// MoviLink - JavaScript Interativo Moderno

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades principais
    initMobileMenu();
    initBlogFilters(); // Filtros corrigidos
    initModernScrollReveal(); // Nova animação de scroll
    init3DTiltEffect(); // Efeito 3D nos cards
    initSmoothScrolling();
    initHeaderScroll();
    initBlogSearch(); // Nova busca
});

// =========================================
// 1. Lógica de Filtros do Blog (CORRIGIDA)
// =========================================
function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (!filterButtons.length || !blogCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 1. Remover classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. Adicionar classe 'active' ao botão clicado
            this.classList.add('active');
            
            // 3. Obter a categoria selecionada
            const selectedCategory = this.getAttribute('data-category');
            
            // 4. Filtrar os cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Resetar animação para acontecer de novo ao filtrar
                card.classList.remove('reveal-up', 'active');
                void card.offsetWidth; // Forçar reflow (reiniciar CSS animation)
                card.classList.add('reveal-up');

                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'flex'; // Mostrar card
                    setTimeout(() => card.classList.add('active'), 50); // Animar entrada
                } else {
                    card.style.display = 'none'; // Esconder card
                }
            });
        });
    });
}

// =========================================
// 2. Busca em Tempo Real no Blog
// =========================================
function initBlogSearch() {
    const searchInput = document.getElementById('blog-search-input');
    const blogCards = document.querySelectorAll('.blog-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        blogCards.forEach(card => {
            const title = card.querySelector('.blog-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm) || excerpt.includes(searchTerm);

            if (isVisible) {
                card.style.display = 'flex';
                setTimeout(() => card.classList.add('active'), 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// =========================================
// 3. Animações de Scroll (Reveal)
// =========================================
function initModernScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    });

    reveals.forEach(element => revealObserver.observe(element));
}

// =========================================
// 4. Efeito 3D Tilt nos Cards (Glassmorphism)
// =========================================
function init3DTiltEffect() {
    // Aplica apenas em dispositivos não-touch para performance
    if (window.matchMedia("(hover: hover)").matches) {
        const cards = document.querySelectorAll('.card-modern');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPct = x / rect.width;
                const yPct = y / rect.height;
                
                const xRotation = (yPct - 0.5) * 10; 
                const yRotation = (xPct - 0.5) * -10;

                card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

// =========================================
// 5. Funcionalidades Básicas (Menu, Scroll)
// =========================================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Descendo
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
            header.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Subindo
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        }
        lastScroll = currentScroll;
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// =========================================
// 6. Interatividade dos Cards do Blog
// =========================================
// Garante que o clique no card leve ao link
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Evita duplicidade se clicar direto no link a
        if (e.target.tagName !== 'A') {
            const link = this.querySelector('a');
            if (link) window.location.href = link.href;
        }
    });
});
