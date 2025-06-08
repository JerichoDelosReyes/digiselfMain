/**
 * Section 1 - Understanding Digital Self Enhanced Animations
 * Modern ES6+ implementation with accessibility, performance, and error handling
 */

class DigitalSelfSection1 {
    constructor() {
        this.components = new Map();
        this.observers = new Map();
        this.eventListeners = new Map();
        this.animationFrameId = null;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }

    /**
     * Initialize all components
     */
    async init() {
        try {
            await this.setupComponents();
            this.setupEventListeners();
            this.setupIntersectionObservers();
            console.log('Section 1 initialized successfully');
        } catch (error) {
            console.error('Error initializing Section 1:', error);
        }
    }

    /**
     * Setup all interactive components
     */
    async setupComponents() {
        const componentSetups = [
            () => this.initializeNavigation(),
            () => this.initializeIdentityModel(),
            () => this.initializeDimensionVisuals(),
            () => this.initializeTheoryCards(),
            () => this.initializeScrollAnimations()
        ];

        for (const setup of componentSetups) {
            try {
                await setup();
            } catch (error) {
                console.error('Component setup error:', error);
            }
        }
    }

    /**
     * Enhanced navigation with accessibility support
     */
    initializeNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.querySelector('.navbar');

        if (!hamburger || !navMenu || !navbar) return;

        // Mobile menu toggle with ARIA support
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isExpanded);
            
            // Focus management
            if (!isExpanded) {
                navMenu.querySelector('.nav-link')?.focus();
            }
        });

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Enhanced navbar background on scroll with throttling
        const scrollHandler = this.throttle(() => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 15, 28, 0.98)';
                navbar.style.backdropFilter = 'blur(25px)';
            } else {
                navbar.style.background = 'rgba(10, 15, 28, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        }, 16);

        window.addEventListener('scroll', scrollHandler, { passive: true });
        this.eventListeners.set('navbar-scroll', scrollHandler);

        this.components.set('navigation', { hamburger, navMenu, navLinks, navbar });
    }

    /**
     * Interactive Identity Model with enhanced accessibility
     */
    initializeIdentityModel() {
        const identityModel = document.querySelector('.identity-model');
        const identityCircles = document.querySelectorAll('.identity-circle');
        const identityCenter = document.querySelector('.identity-center');

        if (!identityModel) return;

        identityCircles.forEach((circle, index) => {
            // Enhanced hover and focus effects
            const handleInteraction = (type) => {
                if (this.isReducedMotion) return;

                identityCircles.forEach((otherCircle, otherIndex) => {
                    if (otherIndex !== index) {
                        otherCircle.style.transform = type === 'enter' ? 'scale(0.9)' : 'scale(1)';
                        otherCircle.style.opacity = type === 'enter' ? '0.6' : '1';
                    }
                });

                circle.style.transform = type === 'enter' ? 'scale(1.1)' : 'scale(1)';
                circle.style.zIndex = type === 'enter' ? '10' : '1';

                if (identityCenter) {
                    identityCenter.style.transform = type === 'enter' ? 'scale(1.05)' : 'scale(1)';
                }
            };

            // Mouse events
            circle.addEventListener('mouseenter', () => handleInteraction('enter'));
            circle.addEventListener('mouseleave', () => handleInteraction('leave'));

            // Keyboard events
            circle.addEventListener('focus', () => handleInteraction('enter'));
            circle.addEventListener('blur', () => handleInteraction('leave'));

            // Click/Enter key interaction
            const clickHandler = (e) => {
                if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();

                const targetId = circle.classList.contains('real-self') ? 'real-self' :
                                circle.classList.contains('ideal-self') ? 'ideal-self' : 'online-self';
                
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                }
            };

            circle.addEventListener('click', clickHandler);
            circle.addEventListener('keydown', clickHandler);
        });

        this.components.set('identityModel', { identityModel, identityCircles, identityCenter });
    }

    /**
     * Enhanced dimension visuals with performance optimization
     */
    initializeDimensionVisuals() {
        const dimensionBlocks = document.querySelectorAll('.dimension-block');
        
        dimensionBlocks.forEach((block, index) => {
            const visual = block.querySelector('.dimension-visual');
            if (!visual) return;

            // Create intersection observer for this dimension
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isReducedMotion) {
                        this.animateDimensionVisual(visual, index);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            });

            observer.observe(block);
            this.observers.set(`dimension-${index}`, observer);
        });

        this.components.set('dimensionVisuals', { dimensionBlocks });
    }

    /**
     * Animate dimension visual based on type
     */
    animateDimensionVisual(visual, index) {
        if (visual.classList.contains('real-visual')) {
            this.animateRealSelfVisual(visual);
        } else if (visual.classList.contains('ideal-visual')) {
            this.animateIdealSelfVisual(visual);
        } else if (visual.classList.contains('online-visual')) {
            this.animateOnlineSelfVisual(visual);
        }
    }

    /**
     * Animate Real Self visual elements
     */
    animateRealSelfVisual(visual) {
        const coreCircle = visual.querySelector('.core-circle');
        const traits = visual.querySelectorAll('.trait');

        if (coreCircle) {
            coreCircle.style.animation = 'pulseCore 2s ease-in-out infinite';
        }

        traits.forEach((trait, index) => {
            setTimeout(() => {
                trait.style.animation = 'orbitTrait 4s linear infinite';
                trait.style.animationDelay = `${index * 0.5}s`;
            }, index * 200);
        });
    }

    /**
     * Animate Ideal Self visual elements
     */
    animateIdealSelfVisual(visual) {
        const pyramidLevels = visual.querySelectorAll('.pyramid-level');

        pyramidLevels.forEach((level, index) => {
            setTimeout(() => {
                level.style.animation = 'slideUpFade 0.8s ease-out forwards';
            }, index * 150);
        });
    }

    /**
     * Animate Online Self visual elements
     */
    animateOnlineSelfVisual(visual) {
        const networkNodes = visual.querySelectorAll('.network-node');
        const connections = visual.querySelectorAll('.connection-line');

        networkNodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = 'fadeInScale 0.6s ease-out forwards';
            }, index * 100);
        });

        connections.forEach((connection, index) => {
            setTimeout(() => {
                connection.style.animation = 'drawLine 1s ease-out forwards';
            }, (networkNodes.length * 100) + (index * 150));
        });
    }

    /**
     * Initialize theory cards with enhanced interactions
     */
    initializeTheoryCards() {
        const theoryCards = document.querySelectorAll('.theory-card');

        theoryCards.forEach(card => {
            // Enhanced card interactions
            const handleCardHover = (isHovering) => {
                if (this.isReducedMotion) return;

                const transform = isHovering ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)';
                const boxShadow = isHovering ? '0 20px 40px rgba(79, 70, 229, 0.2)' : '0 8px 16px rgba(0, 0, 0, 0.1)';

                card.style.transform = transform;
                card.style.boxShadow = boxShadow;
            };

            card.addEventListener('mouseenter', () => handleCardHover(true));
            card.addEventListener('mouseleave', () => handleCardHover(false));
            card.addEventListener('focus', () => handleCardHover(true));
            card.addEventListener('blur', () => handleCardHover(false));
        });

        this.components.set('theoryCards', { theoryCards });
    }

    /**
     * Enhanced scroll animations with intersection observer
     */
    initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.concept-item, .insight-card, .breakdown-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });

        this.observers.set('scrollAnimations', observer);
    }

    /**
     * Smooth scroll utility with reduced motion support
     */
    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 100;
        
        if (this.isReducedMotion) {
            window.scrollTo(0, targetPosition);
            return;
        }

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Throttle utility for performance optimization
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Debounce utility for performance optimization
     */
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

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Reduced motion preference change
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
        });

        // Window resize handler
        const resizeHandler = this.debounce(() => {
            this.handleResize();
        }, 250);

        window.addEventListener('resize', resizeHandler);
        this.eventListeners.set('resize', resizeHandler);
    }

    /**
     * Handle window resize events
     */
    handleResize() {
        // Update component layouts if needed
        const identityModel = this.components.get('identityModel');
        if (identityModel) {
            // Recalculate positions if needed
        }
    }

    /**
     * Setup intersection observers for performance
     */
    setupIntersectionObservers() {
        // Main content observer for performance optimization
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.body.classList.add('content-visible');
                    }
                });
            });

            observer.observe(mainContent);
            this.observers.set('mainContent', observer);
        }
    }

    /**
     * Cleanup method for removing event listeners and observers
     */
    destroy() {
        // Remove event listeners
        this.eventListeners.forEach((listener, key) => {
            if (key === 'navbar-scroll') {
                window.removeEventListener('scroll', listener);
            } else if (key === 'resize') {
                window.removeEventListener('resize', listener);
            }
        });

        // Disconnect observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });

        // Cancel animation frames
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        // Clear maps
        this.components.clear();
        this.observers.clear();
        this.eventListeners.clear();

        console.log('Section 1 cleanup completed');
    }
}

// CSS animations to be added via JavaScript if not in CSS
const additionalAnimations = `
    @keyframes pulseCore {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    @keyframes orbitTrait {
        from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
        to { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
    }

    @keyframes slideUpFade {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes fadeInScale {
        from { transform: scale(0); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }

    @keyframes drawLine {
        from { stroke-dashoffset: 100; }
        to { stroke-dashoffset: 0; }
    }

    .animate-in {
        animation: slideUpFade 0.6s ease-out forwards;
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-in {
            animation: none;
        }
    }
`;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.digitalSelfSection1 = new DigitalSelfSection1();
    });
} else {
    window.digitalSelfSection1 = new DigitalSelfSection1();
}

// Add additional animations to document if not already present
if (!document.querySelector('#section1-animations')) {
    const style = document.createElement('style');
    style.id = 'section1-animations';
    style.textContent = additionalAnimations;
    document.head.appendChild(style);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DigitalSelfSection1;
}
