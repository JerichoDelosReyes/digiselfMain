// Digital Ethics Section - Enhanced Scroll Animations
// Implementing scroll reveal effects similar to index.html

class DigitalEthicsAnimations {
    constructor() {
        this.isInitialized = false;
        this.isReducedMotion = false;
        this.intersectionObserver = null;
        this.parallaxElements = [];
        this.animationFrameId = null;
        
        // Performance optimization
        this.isVisible = !document.hidden;
        this.lastScrollTop = 0;
        this.ticking = false;
        
        this.init();
    }

    async init() {
        try {
            await this.waitForDOMContent();
            this.checkReducedMotion();
            await this.initializeComponents();
            this.setupEventListeners();
            this.isInitialized = true;
            console.log('Digital Ethics animations initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Digital Ethics animations:', error);
        }
    }

    waitForDOMContent() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    checkReducedMotion() {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.isReducedMotion = motionQuery.matches;
        
        motionQuery.addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            this.updateAnimationsForReducedMotion();
        });
    }

    async initializeComponents() {
        const components = [
            this.initializeScrollReveal,
            this.initializeParallaxEffects,
            this.initializeEthicsVisualization,
            this.initializeNavigationEffects,
            this.initializeCardAnimations,
            this.initializeTipCardAnimations
        ];

        for (const component of components) {
            try {
                await component.call(this);
            } catch (error) {
                console.warn(`Component initialization failed:`, error);
            }
        }
    }

    setupEventListeners() {
        // Scroll handling with throttling
        window.addEventListener('scroll', this.throttledScroll.bind(this), { passive: true });
        
        // Resize handling with debouncing
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // Visibility change handling
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    // Core scroll reveal implementation
    async initializeScrollReveal() {        const revealElements = document.querySelectorAll(`
            .hero-content,
            .purpose-content,
            .ethics-framework,
            .principle-card,
            .dilemma-scenario,
            .citizenship-framework,
            .pillar,
            .tips-strategies,
            .tip-card,
            .topic-header,
            .ethics-insights .insight-item
        `);const observerOptions = {
            threshold: this.isReducedMotion ? 0.05 : 0.1,
            rootMargin: this.isReducedMotion ? '0px' : '50px 0px 0px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                    this.intersectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach((element, index) => {
            this.prepareElementForReveal(element, index);
            this.intersectionObserver.observe(element);
        });
    }

    prepareElementForReveal(element, index) {        if (this.isReducedMotion) {
            // Minimal animation for reduced motion preference
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.2s ease';
            return;
        }// Full animation setup - reduced movement distance for faster feel
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.02}s`;
        
        // Add special classes for different element types
        if (element.classList.contains('tip-card')) {
            element.style.transform = 'translateY(15px) scale(0.99)';
            element.style.transition = `all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.01}s`;
        } else if (element.classList.contains('principle-card')) {
            element.style.transform = 'translateY(18px) rotateX(2deg)';
            element.style.transition = `all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.015}s`;
        } else if (element.classList.contains('insight-item')) {
            element.style.transform = 'translateX(-15px)';
            element.style.transition = `all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.02}s`;
        } else if (element.classList.contains('hero-content')) {
            element.style.transform = 'translateY(25px)';
            element.style.transition = `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        }
    }

    revealElement(element) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return;
        }

        // Standard reveal animation
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1) rotateX(0) translateX(0)';
        element.classList.add('animate-in');

        // Special animations for specific elements
        if (element.classList.contains('tip-card')) {
            this.animateTipCard(element);
        } else if (element.classList.contains('principle-card')) {
            this.animatePrincipleCard(element);
        } else if (element.classList.contains('ethics-core')) {
            this.animateEthicsCore(element);
        }
    }    // Enhanced parallax effects - DISABLED to prevent scroll movement bugs
    async initializeParallaxEffects() {
        // Parallax effects disabled to prevent floating elements from moving with scroll
        // This was causing the bug where elements moved down when scrolling
        return;
        
        if (this.isReducedMotion) return;

        this.parallaxElements = document.querySelectorAll(`
            .floating-elements .floating-icon,
            .floating-elements .floating-element,
            .purpose-background-overlay,
            .ethics-ecosystem .principle-orbit
        `);

        this.parallaxElements.forEach((element, index) => {
            element.dataset.parallaxRate = this.calculateParallaxRate(element, index);
        });
    }

    calculateParallaxRate(element, index) {
        if (element.classList.contains('floating-icon')) {
            return (0.2 + (index * 0.1)).toString();
        } else if (element.classList.contains('floating-element')) {
            return (0.15 + (index * 0.05)).toString();
        } else if (element.classList.contains('purpose-background-overlay')) {
            return '0.3';
        } else if (element.classList.contains('principle-orbit')) {
            return (0.1 + (index * 0.05)).toString();
        }
        return '0.2';
    }    updateParallax() {
        // Parallax update disabled to prevent scroll movement bugs
        return;
        
        if (this.isReducedMotion || !this.isVisible) return;

        const scrolled = window.pageYOffset;
        
        this.parallaxElements.forEach(element => {
            const rate = parseFloat(element.dataset.parallaxRate) || 0.2;
            const transform = `translateY(${scrolled * rate}px)`;
            element.style.transform = transform;
        });
    }

    // Ethics visualization animations
    async initializeEthicsVisualization() {
        const ethicsCore = document.querySelector('.ethics-core');
        const principleNodes = document.querySelectorAll('.principle-node');
        const connectionLines = document.querySelectorAll('.connection-line');

        if (ethicsCore) {
            this.animateEthicsEcosystem(ethicsCore, principleNodes, connectionLines);
        }
    }

    animateEthicsEcosystem(core, nodes, lines) {
        // Animate core pulsing
        core.style.animation = 'ethics-pulse 3s ease-in-out infinite';
        
        // Animate orbiting nodes
        nodes.forEach((node, index) => {
            node.style.animationDelay = `${index * 0.5}s`;
            node.style.animation = 'orbit-float 4s ease-in-out infinite';
        });
        
        // Animate connection lines
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.animation = 'line-draw 2s ease-in-out';
            }, index * 300);
        });
    }

    // Navigation effects
    async initializeNavigationEffects() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add backdrop blur and background on scroll
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(10, 15, 28, 0.98)';
                navbar.style.backdropFilter = 'blur(25px)';
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.style.background = 'rgba(10, 15, 28, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.classList.remove('navbar-scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Card animations
    async initializeCardAnimations() {
        const cards = document.querySelectorAll('.principle-card, .dilemma-scenario');
        
        cards.forEach(card => {
            this.setupCardHoverEffects(card);
        });
    }

    setupCardHoverEffects(card) {
        if (this.isReducedMotion) return;

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    }

    // Tip card animations (2x2 grid)
    async initializeTipCardAnimations() {
        const tipCards = document.querySelectorAll('.tip-card');
        
        tipCards.forEach((card, index) => {
            this.setupTipCardAnimation(card, index);
        });
    }

    setupTipCardAnimation(card, index) {
        if (this.isReducedMotion) return;

        // Staggered animation for 2x2 grid
        const gridDelay = this.calculateGridDelay(index);
        card.style.transitionDelay = `${gridDelay}s`;
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.05)';
            
            // Animate icon
            const icon = card.querySelector('.tip-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            
            const icon = card.querySelector('.tip-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    }    calculateGridDelay(index) {
        // For 2x2 grid: [0, 1, 2, 3] -> [0, 0.05, 0.1, 0.15] - faster stagger
        return index * 0.05;
    }

    // Animation helper methods
    animateTipCard(card) {
        const icon = card.querySelector('.tip-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'tip-icon-bounce 0.6s ease-out';
            }, 200);
        }
    }

    animatePrincipleCard(card) {
        const icon = card.querySelector('.principle-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'principle-icon-glow 1s ease-out';
            }, 300);
        }
    }

    animateEthicsCore(core) {
        const coreIcon = core.querySelector('.core-icon');
        if (coreIcon) {
            coreIcon.style.animation = 'ethics-core-pulse 2s ease-in-out infinite';
        }
    }

    // Performance optimization methods
    throttledScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateParallax();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateScrollProgress() {
        // Scroll progress tracking removed to prevent conflicts with gradient-effects.js
        // The gradient-effects.js file handles --scroll-progress CSS property updates
    }

    handleResize() {
        // Update animation parameters on resize
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.initializeScrollReveal();
        }
    }

    updateAnimationsForReducedMotion() {
        if (this.isReducedMotion) {
            // Disable complex animations
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }

    // Utility functions
    debounce(func, wait) {
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

    cleanup() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }
}

// CSS animations to be added via JavaScript
const animationStyles = `
    @keyframes ethics-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes orbit-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes line-draw {
        0% { 
            stroke-dasharray: 0, 1000;
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% { 
            stroke-dasharray: 1000, 0;
            opacity: 1;
        }
    }
    
    @keyframes tip-icon-bounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.2) rotate(0deg); }
        75% { transform: scale(1.1) rotate(5deg); }
    }
    
    @keyframes principle-icon-glow {
        0% { filter: brightness(1); }
        50% { filter: brightness(1.3) drop-shadow(0 0 10px currentColor); }
        100% { filter: brightness(1); }
    }
    
    @keyframes ethics-core-pulse {
        0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
        }
        50% { 
            transform: scale(1.1);
            filter: brightness(1.2) drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
        }
    }
    
    /* Reduced motion styles */
    @media (prefers-reduced-motion: reduce) {
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* Smooth reveal animations */
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Enhanced card styles */
    .tip-card, .principle-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .tip-icon, .principle-icon {
        transition: all 0.3s ease;
    }
    
    /* Navigation enhancements */
    .navbar {
        transition: all 0.3s ease;
    }
    
    .navbar-scrolled {
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
`;

// Inject styles and initialize
function injectAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        injectAnimationStyles();
        new DigitalEthicsAnimations();
    });
} else {
    injectAnimationStyles();
    new DigitalEthicsAnimations();
}
