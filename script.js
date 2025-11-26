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

// Adicionar ao arquivo script.js

// ===== NOVAS FUNCIONALIDADES =====

// Observador de interseção para animações de scroll
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Smooth scrolling aprimorado
function initEnhancedSmoothScroll() {
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
                
                // Adicionar classe ativa temporariamente
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 1000);
            }
        });
    });
}

// Preloader suave
function initPreloader() {
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
}

// Lazy loading aprimorado
function initEnhancedLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Sistema de notificações aprimorado
function showEnhancedNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Fechar notificação">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Fechar notificação
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto-remover
    if (duration > 0) {
        setTimeout(() => {
            hideNotification(notification);
        }, duration);
    }
    
    return notification;
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// Sistema de tooltips aprimorado
function initEnhancedTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        let tooltip = null;
        let timeout = null;
        
        element.addEventListener('mouseenter', function() {
            timeout = setTimeout(() => {
                tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                
                let top = rect.top - tooltipRect.height - 10;
                let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                
                // Ajustar posição se necessário
                if (top < 0) top = rect.bottom + 10;
                if (left < 0) left = 10;
                if (left + tooltipRect.width > window.innerWidth) {
                    left = window.innerWidth - tooltipRect.width - 10;
                }
                
                tooltip.style.top = top + 'px';
                tooltip.style.left = left + 'px';
                
                setTimeout(() => {
                    tooltip.classList.add('show');
                }, 10);
            }, 300);
        });
        
        element.addEventListener('mouseleave', function() {
            clearTimeout(timeout);
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            }
        });
    });
}

// Sistema de busca em tempo real
function initLiveSearch() {
    const searchInput = document.querySelector('#live-search');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput && searchResults) {
        let timeout = null;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const query = this.value.trim();
                
                if (query.length < 2) {
                    searchResults.style.display = 'none';
                    return;
                }
                
                // Simular busca (substituir por busca real)
                const results = performSearch(query);
                displaySearchResults(results);
            }, 300);
        });
        
        // Fechar resultados ao clicar fora
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}

function performSearch(query) {
    // Simulação de resultados de busca
    // Substituir por busca real na sua base de dados
    return [
        { title: 'Logística Integrada', url: 'logistica-integrada.html', excerpt: 'Unindo todos os processos...' },
        { title: 'Just in Time', url: 'just-in-time.html', excerpt: 'Produção no momento certo...' },
        { title: 'Kanban', url: 'kanban.html', excerpt: 'Visualizando o fluxo de trabalho...' }
    ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(query.toLowerCase())
    );
}

function displaySearchResults(results) {
    const searchResults = document.querySelector('#search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">Nenhum resultado encontrado</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="search-result-item">
                <h4>${result.title}</h4>
                <p>${result.excerpt}</p>
            </a>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

// Inicializar todas as funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidades existentes
    initMobileMenu();
    initBlogFilters();
    initScrollAnimations();
    initSmoothScrolling();
    initHeaderScroll();
    
    // Novas funcionalidades
    initScrollReveal();
    initEnhancedSmoothScroll();
    initPreloader();
    initEnhancedLazyLoading();
    initEnhancedTooltips();
    initLiveSearch();
    
    // Adicionar classes de animação
    document.querySelectorAll('.feature-card, .blog-card, .content-item').forEach(card => {
        card.classList.add('reveal');
    });
});

// Adicione esta função no seu script.js
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Esconder o preloader quando a página estiver totalmente carregada
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Remover completamente do DOM após a animação
                setTimeout(() => {
                    if (preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                }, 500);
            }, 500); // Pequeno delay para garantir que tudo carregou
        });

        // Fallback: esconder após 3 segundos mesmo se não carregar totalmente
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.parentNode.removeChild(preloader);
                }, 500);
            }
        }, 3000);
    }
}

// E adicione esta chamada no DOMContentLoaded:
document.addEventListener('DOMContentLoaded', function() {
    // ... outras inicializações
    initPreloader();
});

// Melhorar a experiência de clique nos cards do blog
function initBlogCardClicks() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const link = card.querySelector('.blog-title a');
        if (link) {
            // Fazer o card inteiro clicável
            card.style.cursor = 'pointer';
            
            card.addEventListener('click', function(e) {
                // Não redirecionar se clicar em tags, meta ou outros elementos
                if (!e.target.classList.contains('tag') && 
                    !e.target.classList.contains('blog-date') &&
                    !e.target.classList.contains('blog-read-time') &&
                    !e.target.classList.contains('blog-icon')) {
                    window.location.href = link.href;
                }
            });
            
            // Manter o hover no link do título
            link.addEventListener('click', function(e) {
                e.stopPropagation(); // Impede que o evento do card seja acionado
            });
        }
    });
}

// Adicione esta chamada no DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... outras inicializações
    initBlogCardClicks();
});

/* =========================================
   NOVAS FUNCIONALIDADES - INTERATIVIDADE
   (Adicionar ao final do arquivo)
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    initModernScrollReveal();
    init3DTiltEffect();
});

// 1. Sistema Avançado de Scroll Reveal
function initModernScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: Parar de observar após animar uma vez
                // revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15, // Aciona quando 15% do elemento está visível
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(element => revealObserver.observe(element));
}

// 2. Efeito de Tilt 3D (Inclinação) nos Cards
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.card-modern');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcular rotação baseada na posição do mouse
            const xPct = x / rect.width;
            const yPct = y / rect.height;
            
            const xRotation = (yPct - 0.5) * 10; // -5 a +5 graus (Invertido para tilt natural)
            const yRotation = (xPct - 0.5) * -10; // -5 a +5 graus

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reseta a posição suavemente
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}
