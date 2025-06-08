/**
 * Section 2 - Social Media & Online Identity Enhanced Animations
 * Modern ES6+ implementation with accessibility, performance, and error handling
 */

class SocialMediaSection {
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
            console.log('Section 2 (Social Media) initialized successfully');
        } catch (error) {
            console.error('Error initializing Section 2:', error);
        }
    }

    /**
     * Setup all interactive components
     */
    async setupComponents() {
        const componentSetups = [
            () => this.initializeNavigation(),
            () => this.initializePlatformVisuals(),
            () => this.initializeValidationMetrics(),
            () => this.initializeComparisonDemo(),
            () => this.initializeBurnoutIndicators(),
            () => this.initializeStrategyCards(),
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
     * Platform visual animations
     */
    initializePlatformVisuals() {
        const platformCards = document.querySelectorAll('.platform-card');

        platformCards.forEach((card, index) => {
            // Add interactive hover effects
            const handleCardInteraction = (isInteracting) => {
                if (this.isReducedMotion) return;

                const transform = isInteracting ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)';
                const filter = isInteracting ? 'brightness(1.1)' : 'brightness(1)';

                card.style.transform = transform;
                card.style.filter = filter;
            };

            card.addEventListener('mouseenter', () => handleCardInteraction(true));
            card.addEventListener('mouseleave', () => handleCardInteraction(false));
            card.addEventListener('focus', () => handleCardInteraction(true));
            card.addEventListener('blur', () => handleCardInteraction(false));

            // Add platform-specific animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isReducedMotion) {
                        setTimeout(() => {
                            this.animatePlatformCard(card);
                        }, index * 150);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(card);
            this.observers.set(`platform-${index}`, observer);
        });

        this.components.set('platformVisuals', { platformCards });
    }

    /**
     * Animate individual platform cards
     */
    animatePlatformCard(card) {
        const icon = card.querySelector('.platform-icon');
        const stats = card.querySelectorAll('.platform-stat');

        if (icon) {
            icon.style.animation = 'bounceIn 0.6s ease-out';
        }

        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.animation = 'slideInUp 0.4s ease-out forwards';
            }, index * 100);
        });
    }

    /**
     * Validation metrics with interactive counters
     */
    initializeValidationMetrics() {
        const metricElements = document.querySelectorAll('.validation-metric');

        metricElements.forEach(metric => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateMetricCounter(metric);
                        observer.unobserve(metric);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(metric);
            this.observers.set(`metric-${metric.dataset.metric}`, observer);
        });

        this.components.set('validationMetrics', { metricElements });
    }

    /**
     * Animate counter metrics
     */
    animateMetricCounter(metric) {
        const numberElement = metric.querySelector('.metric-number');
        const targetValue = parseInt(numberElement.textContent.replace(/[^\d]/g, ''));
        
        if (isNaN(targetValue) || this.isReducedMotion) return;

        let currentValue = 0;
        const duration = 2000;
        const increment = targetValue / (duration / 16);

        const updateCounter = () => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                numberElement.textContent = targetValue.toLocaleString();
                return;
            }
            
            numberElement.textContent = Math.floor(currentValue).toLocaleString();
            requestAnimationFrame(updateCounter);
        };

        updateCounter();
    }

    /**
     * Social comparison demonstration
     */
    initializeComparisonDemo() {
        const comparisonCards = document.querySelectorAll('.comparison-card');
        const comparisonToggle = document.querySelector('.comparison-toggle');

        if (!comparisonCards.length) return;

        // Add interactive comparison visualization
        comparisonCards.forEach(card => {
            card.addEventListener('click', () => {
                this.toggleComparisonView(card);
            });

            // Add keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleComparisonView(card);
                }
            });
        });

        if (comparisonToggle) {
            comparisonToggle.addEventListener('click', () => {
                this.toggleGlobalComparison();
            });
        }

        this.components.set('comparisonDemo', { comparisonCards, comparisonToggle });
    }

    /**
     * Toggle comparison view for individual cards
     */
    toggleComparisonView(card) {
        const isRevealed = card.classList.contains('revealed');
        
        // Reset all cards
        document.querySelectorAll('.comparison-card').forEach(c => {
            c.classList.remove('revealed');
        });

        if (!isRevealed) {
            card.classList.add('revealed');
            
            // Show the "behind the scenes" content
            const hiddenContent = card.querySelector('.hidden-reality');
            if (hiddenContent && !this.isReducedMotion) {
                hiddenContent.style.animation = 'fadeInScale 0.5s ease-out';
            }
        }
    }

    /**
     * Toggle global comparison view
     */
    toggleGlobalComparison() {
        const container = document.querySelector('.comparison-container');
        if (!container) return;

        container.classList.toggle('reality-mode');
        
        const toggle = document.querySelector('.comparison-toggle');
        if (toggle) {
            const isRealityMode = container.classList.contains('reality-mode');
            toggle.textContent = isRealityMode ? 'Show Curated View' : 'Show Reality';
            toggle.setAttribute('aria-pressed', isRealityMode);
        }
    }

    /**
     * Burnout indicators with interactive stress meter
     */
    initializeBurnoutIndicators() {
        const stressMeter = document.querySelector('.stress-meter');
        const burnoutSymptoms = document.querySelectorAll('.burnout-symptom');

        if (stressMeter) {
            this.initializeStressMeter(stressMeter);
        }

        burnoutSymptoms.forEach((symptom, index) => {
            symptom.addEventListener('click', () => {
                this.toggleSymptom(symptom);
            });

            // Add progressive revelation on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.isReducedMotion) {
                        setTimeout(() => {
                            symptom.classList.add('revealed');
                        }, index * 200);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(symptom);
            this.observers.set(`burnout-${index}`, observer);
        });

        this.components.set('burnoutIndicators', { stressMeter, burnoutSymptoms });
    }

    /**
     * Initialize interactive stress meter
     */
    initializeStressMeter(meter) {
        const levels = meter.querySelectorAll('.stress-level');
        const indicator = meter.querySelector('.stress-indicator');

        let currentLevel = 0;

        const updateStressLevel = (level) => {
            levels.forEach((levelEl, index) => {
                levelEl.classList.toggle('active', index <= level);
            });

            if (indicator) {
                const colors = ['#10b981', '#f59e0b', '#ef4444'];
                const colorIndex = Math.min(Math.floor(level / 2), colors.length - 1);
                indicator.style.background = colors[colorIndex];
                indicator.style.transform = `translateX(${level * 20}px)`;
            }
        };

        // Auto-animate stress level
        const animateStress = () => {
            if (this.isReducedMotion) return;

            currentLevel = (currentLevel + 1) % levels.length;
            updateStressLevel(currentLevel);
            
            setTimeout(animateStress, 1500);
        };

        // Start animation when meter comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStress();
                    observer.unobserve(meter);
                }
            });
        });

        observer.observe(meter);
        this.observers.set('stress-meter', observer);
    }

    /**
     * Toggle burnout symptom
     */
    toggleSymptom(symptom) {
        symptom.classList.toggle('selected');
        
        // Update overall stress level based on selected symptoms
        const selectedSymptoms = document.querySelectorAll('.burnout-symptom.selected');
        const stressLevel = Math.min(selectedSymptoms.length, 5);
        
        this.updateGlobalStressIndicator(stressLevel);
    }

    /**
     * Update global stress indicator
     */
    updateGlobalStressIndicator(level) {
        const globalIndicator = document.querySelector('.global-stress-indicator');
        if (!globalIndicator) return;

        const percentage = (level / 5) * 100;
        globalIndicator.style.width = `${percentage}%`;
        
        // Update color based on stress level
        const colors = ['#10b981', '#f59e0b', '#ef4444'];
        const colorIndex = Math.min(Math.floor(level / 2), colors.length - 1);
        globalIndicator.style.background = colors[colorIndex];
    }

    /**
     * Strategy cards with interactive features
     */
    initializeStrategyCards() {
        const strategyCards = document.querySelectorAll('.strategy-card');

        strategyCards.forEach(card => {
            // Enhanced card interactions
            const handleCardHover = (isHovering) => {
                if (this.isReducedMotion) return;

                const transform = isHovering ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)';
                const boxShadow = isHovering ? '0 20px 40px rgba(16, 185, 129, 0.2)' : '0 8px 16px rgba(0, 0, 0, 0.1)';

                card.style.transform = transform;
                card.style.boxShadow = boxShadow;
            };

            card.addEventListener('mouseenter', () => handleCardHover(true));
            card.addEventListener('mouseleave', () => handleCardHover(false));
            card.addEventListener('focus', () => handleCardHover(true));
            card.addEventListener('blur', () => handleCardHover(false));

            // Add expandable actions
            const actionsContainer = card.querySelector('.strategy-actions');
            if (actionsContainer) {
                card.addEventListener('click', () => {
                    actionsContainer.classList.toggle('expanded');
                });
            }
        });

        this.components.set('strategyCards', { strategyCards });
    }

    /**
     * Enhanced scroll animations with intersection observer
     */
    initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.platform-card, .validation-metric, .comparison-card, .strategy-card, .insight-item'
        );

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
        // Recalculate layouts if needed
        const platformVisuals = this.components.get('platformVisuals');
        if (platformVisuals) {
            // Adjust platform card layouts
        }
    }

    /**
     * Setup intersection observers for performance
     */
    setupIntersectionObservers() {
        // Main content observer
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

        console.log('Section 2 cleanup completed');
    }
}

// CSS animations to be added via JavaScript if not in CSS
const socialMediaAnimations = `
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
    }

    @keyframes slideInUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    @keyframes fadeInScale {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }

    @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
        50% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.8); }
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }

    .comparison-card.revealed .hidden-reality {
        display: block;
        animation: fadeInScale 0.5s ease-out;
    }

    .strategy-card:hover {
        animation: pulseGlow 1s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-in,
        .comparison-card.revealed .hidden-reality,
        .strategy-card:hover {
            animation: none;
        }
    }
`;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.socialMediaSection = new SocialMediaSection();
    });
} else {
    window.socialMediaSection = new SocialMediaSection();
}

// Add animations to document if not already present
if (!document.querySelector('#section2-animations')) {
    const style = document.createElement('style');
    style.id = 'section2-animations';
    style.textContent = socialMediaAnimations;
    document.head.appendChild(style);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialMediaSection;
}
