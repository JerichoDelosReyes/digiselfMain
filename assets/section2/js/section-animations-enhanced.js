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
        
        // Performance monitoring
        this.performanceMetrics = {
            initStart: performance.now(),
            componentLoadTimes: {},
            animationFrames: 0,
            lastFrameTime: 0
        };
        
        // Sound feedback system (optional)
        this.soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
        this.audioContext = null;
        
        // Error tracking
        this.errorLog = [];
        
        this.init();
    }

    /**
     * Initialize audio context for sound feedback
     */
    initializeAudio() {
        if (!this.soundEnabled || this.isReducedMotion) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Audio context not supported:', error);
            this.soundEnabled = false;
        }
    }

    /**
     * Play subtle sound feedback
     */
    playSound(frequency = 440, duration = 100, volume = 0.1) {
        if (!this.soundEnabled || !this.audioContext || this.isReducedMotion) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration / 1000);
        } catch (error) {
            console.warn('Sound playback failed:', error);
        }
    }

    /**
     * Track performance metrics
     */
    trackPerformance(componentName, startTime) {
        const endTime = performance.now();
        this.performanceMetrics.componentLoadTimes[componentName] = endTime - startTime;
        
        // Log if component takes too long to load
        if (endTime - startTime > 100) {
            console.warn(`Component ${componentName} took ${(endTime - startTime).toFixed(2)}ms to load`);
        }
    }

    /**
     * Enhanced error handling
     */
    handleError(error, context = 'Unknown') {
        const errorInfo = {
            message: error.message,
            context: context,
            timestamp: new Date().toISOString(),
            stack: error.stack
        };
        
        this.errorLog.push(errorInfo);
        console.error(`Error in ${context}:`, error);
        
        // Optional: Send to analytics service
        // this.sendErrorToAnalytics(errorInfo);
    }

    /**
     * Initialize all components
     */
    async init() {
        try {
            this.initializeAudio();
            await this.setupComponents();
            this.setupEventListeners();
            this.setupIntersectionObservers();
            
            const totalInitTime = performance.now() - this.performanceMetrics.initStart;
            console.log(`Section 2 (Social Media) initialized successfully in ${totalInitTime.toFixed(2)}ms`);
            
            // Log performance metrics
            if (Object.keys(this.performanceMetrics.componentLoadTimes).length > 0) {
                console.table(this.performanceMetrics.componentLoadTimes);
            }
        } catch (error) {
            this.handleError(error, 'Section initialization');
        }
    }    /**
     * Setup all interactive components
     */
    async setupComponents() {
        const componentSetups = [
            () => this.initializeNavigation(),
            () => this.initializeHeroAnimations(),
            () => this.initializeSocialIdentityModel(),
            () => this.initializeDigitalImpactMeter(),
            () => this.initializeChallengeCards(),
            () => this.initializeStrategiesSection(),
            () => this.initializeImplementationGuide(),
            () => this.initializeEmergencyToolkit(),
            () => this.initializeScrollAnimations()
        ];

        for (const setup of componentSetups) {
            try {
                await setup();
            } catch (error) {
                console.error('Component setup error:', error);
            }
        }
    }    /**
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
     * Initialize hero section animations and CTA buttons
     */
    initializeHeroAnimations() {
        const ctaButtons = document.querySelectorAll('.cta-btn');
        
        ctaButtons.forEach(button => {
            // Smooth scroll for anchor links
            if (button.getAttribute('href')?.startsWith('#')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = button.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            }

            // Enhanced button interactions
            button.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    button.style.transform = 'translateY(-2px) scale(1.02)';
                }
            });

            button.addEventListener('mouseleave', () => {
                if (!this.isReducedMotion) {
                    button.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        this.components.set('heroAnimations', { ctaButtons });
    }

    /**
     * Initialize social identity model with orbital animations
     */
    initializeSocialIdentityModel() {
        const identityModel = document.querySelector('.social-identity-model');
        if (!identityModel) return;

        const orbits = identityModel.querySelectorAll('.platform-orbit');
        
        // Add orbital animation observers
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isReducedMotion) {
                    orbits.forEach((orbit, index) => {
                        setTimeout(() => {
                            orbit.style.animationPlayState = 'running';
                        }, index * 200);
                    });
                    observer.unobserve(identityModel);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(identityModel);
        this.observers.set('social-identity-model', observer);
        this.components.set('socialIdentityModel', { identityModel, orbits });
    }

    /**
     * Initialize digital impact meter with animated progress bars
     */
    initializeDigitalImpactMeter() {
        const impactMeter = document.querySelector('.challenge-impact-meter');
        if (!impactMeter) return;

        const impactBars = impactMeter.querySelectorAll('.impact-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    impactBars.forEach((bar, index) => {
                        setTimeout(() => {
                            this.animateImpactBar(bar);
                        }, index * 300);
                    });
                    observer.unobserve(impactMeter);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(impactMeter);
        this.observers.set('impact-meter', observer);
        this.components.set('digitalImpactMeter', { impactMeter, impactBars });
    }

    /**
     * Animate individual impact bar
     */
    animateImpactBar(bar) {
        const progressBar = bar.querySelector('.impact-progress');
        const targetWidth = progressBar.style.width;
        
        if (!progressBar || this.isReducedMotion) return;

        // Start from 0 and animate to target
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 1.5s ease-out';
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 100);
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
     * Initialize comprehensive challenge cards
     */
    initializeChallengeCards() {
        const startTime = performance.now();
        
        try {
            // Initialize all challenge card types
            this.initializeValidationCycle();
            this.initializeComparisonDemo();
            this.initializeBurnoutSymptoms();
            this.initializeAnxietyTriggers();
            this.initializePlatformVisuals();
            this.initializeValidationMetrics();
            
            // Add challenge card hover effects with sound feedback
            const challengeCards = document.querySelectorAll('.challenge-card, .platform-card, .symptom-card');
            challengeCards.forEach((card, index) => {
                this.enhanceCardInteractions(card, index);
            });
            
            this.trackPerformance('challengeCards', startTime);
        } catch (error) {
            this.handleError(error, 'Challenge cards initialization');
        }
    }

    /**
     * Enhanced card interactions with sound feedback
     */
    enhanceCardInteractions(card, index) {
        // Throttle hover events for performance
        let hoverTimeout = null;
        
        const handleHover = (isHovering) => {
            if (this.isReducedMotion) return;
            
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                if (isHovering) {
                    card.style.transform = 'translateY(-5px) scale(1.02)';
                    card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                    
                    // Subtle hover sound
                    this.playSound(440 + index * 50, 50, 0.05);
                } else {
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }
            }, 50);
        };

        const handleClick = () => {
            // Click sound feedback
            this.playSound(660, 100, 0.08);
            
            // Visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            }, 100);
        };

        // Add event listeners
        card.addEventListener('mouseenter', () => handleHover(true));
        card.addEventListener('mouseleave', () => handleHover(false));
        card.addEventListener('click', handleClick);
        
        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
                card.click();
            }
        });
    }
    /**
     * Enhanced scroll animations with intersection observer
     */
    initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll(`
            .insight-card, 
            .research-highlight, 
            .challenge-card, 
            .strategy-card, 
            .path-card,
            .week-phase,
            .crisis-strategy,
            .identity-layer,
            .impact-bar,
            .connection-node
        `.split(',').map(s => s.trim()).join(', '));

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

/**
 * User Preferences Panel for Accessibility Settings
 */
class UserPreferencesPanel {
    constructor(section) {
        this.section = section;
        this.panel = null;
        
        this.init();
    }

    /**
     * Initialize user preferences panel
     */
    initializeUserPreferences() {
        // Create settings panel if it doesn't exist
        let settingsPanel = document.querySelector('.accessibility-settings');
        if (!settingsPanel) {
            settingsPanel = this.createSettingsPanel();
            document.body.appendChild(settingsPanel);
        }
        
        this.setupSettingsListeners(settingsPanel);
    }

    /**
     * Create accessibility settings panel
     */
    createSettingsPanel() {
        const panel = document.createElement('div');
        panel.className = 'accessibility-settings';
        panel.innerHTML = `
            <button class="settings-toggle" aria-label="Open accessibility settings">
                <span class="sr-only">Settings</span>
                ⚙️
            </button>
            <div class="settings-content" hidden>
                <h3>Accessibility Settings</h3>
                <label class="setting-item">
                    <input type="checkbox" id="reduce-motion" ${this.section.isReducedMotion ? 'checked' : ''}>
                    <span>Reduce animations</span>
                </label>
                <label class="setting-item">
                    <input type="checkbox" id="sound-feedback" ${this.section.soundEnabled ? 'checked' : ''}>
                    <span>Sound feedback</span>
                </label>
                <label class="setting-item">
                    <input type="range" id="animation-speed" min="0.5" max="2" step="0.1" value="1">
                    <span>Animation speed</span>
                </label>
                <button class="settings-close">Close</button>
            </div>
        `;
        
        // Add CSS for settings panel
        const style = document.createElement('style');
        style.textContent = `
            .accessibility-settings {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .settings-toggle {
                background: rgba(255, 255, 255, 0.9);
                border: 2px solid #007bff;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .settings-toggle:hover {
                background: #007bff;
                color: white;
                transform: scale(1.1);
            }
            
            .settings-content {
                position: absolute;
                top: 60px;
                right: 0;
                background: white;
                border: 2px solid #007bff;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                min-width: 250px;
            }
            
            .setting-item {
                display: block;
                margin: 10px 0;
                cursor: pointer;
            }
            
            .setting-item input {
                margin-right: 10px;
            }
            
            .settings-close {
                background: #007bff;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
                width: 100%;
            }
        `;
        document.head.appendChild(style);
        
        return panel;
    }

    /**
     * Setup settings panel listeners
     */
    setupSettingsListeners(panel) {
        const toggle = panel.querySelector('.settings-toggle');
        const content = panel.querySelector('.settings-content');
        const closeBtn = panel.querySelector('.settings-close');
        
        // Toggle panel
        toggle.addEventListener('click', () => {
            const isHidden = content.hasAttribute('hidden');
            if (isHidden) {
                content.removeAttribute('hidden');
                this.section.playSound(550, 80, 0.06);
            } else {
                content.setAttribute('hidden', '');
            }
        });
        
        // Close panel
        closeBtn.addEventListener('click', () => {
            content.setAttribute('hidden', '');
        });
        
        // Reduce motion setting
        const reduceMotionInput = panel.querySelector('#reduce-motion');
        reduceMotionInput.addEventListener('change', (e) => {
            this.section.isReducedMotion = e.target.checked;
            localStorage.setItem('reduceMotion', this.section.isReducedMotion);
            this.section.playSound(440, 100, 0.06);
        });
        
        // Sound feedback setting
        const soundInput = panel.querySelector('#sound-feedback');
        soundInput.addEventListener('change', (e) => {
            this.section.soundEnabled = e.target.checked;
            localStorage.setItem('soundEnabled', this.section.soundEnabled);
            if (this.section.soundEnabled && this.section.audioContext) {
                this.section.playSound(660, 150, 0.08);
            }
        });
        
        // Animation speed setting
        const speedInput = panel.querySelector('#animation-speed');
        speedInput.addEventListener('input', (e) => {
            const speed = parseFloat(e.target.value);
            document.documentElement.style.setProperty('--animation-speed', speed);
            localStorage.setItem('animationSpeed', speed);
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !content.hasAttribute('hidden')) {
                content.setAttribute('hidden', '');
            }
        });
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

    @keyframes pulseHighlight {
        0%, 100% { background: rgba(79, 70, 229, 0.1); }
        50% { background: rgba(79, 70, 229, 0.3); }
    }

    @keyframes symptomSelect {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); background: rgba(16, 185, 129, 0.2); }
        100% { transform: scale(1); }
    }

    @keyframes badgePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); box-shadow: 0 0 15px rgba(79, 70, 229, 0.4); }
        100% { transform: scale(1); }
    }

    @keyframes goalComplete {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); background: rgba(16, 185, 129, 0.2); }
        100% { transform: scale(1); }
    }

    @keyframes actionActivate {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); background: rgba(239, 68, 68, 0.1); }
        100% { transform: scale(1); }
    }

    @keyframes urgencyPulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }

    .card-visible {
        animation: fadeInScale 0.8s ease-out forwards;
    }

    .path-visible {
        animation: slideInUp 0.6s ease-out forwards;
    }

    .week-visible {
        animation: fadeInScale 0.8s ease-out forwards;
    }

    .crisis-visible {
        animation: slideInUp 0.6s ease-out forwards;
    }

    .trigger-visible {
        animation: bounceIn 0.6s ease-out forwards;
    }

    .cycle-step.active {
        transform: scale(1.1);
        background: rgba(79, 70, 229, 0.2);
        border-color: var(--primary);
    }

    .framework-step.active {
        background: rgba(79, 70, 229, 0.1);
        border-color: var(--primary);
        transform: translateY(-2px);
    }

    .goal.completed {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success);
        text-decoration: line-through;
    }

    .action-used {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success);
        border-color: var(--success);
    }

    .symptom.selected {
        background: rgba(239, 68, 68, 0.1);
        color: var(--danger);
        border-color: var(--danger);
    }

    .reality-revealed .reality-column {
        opacity: 1;
        transform: scale(1.05);
    }

    .reality-revealed .highlight-column {
        opacity: 0.6;
        transform: scale(0.95);
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-in,
        .card-visible,
        .path-visible,
        .week-visible,
        .crisis-visible,
        .trigger-visible,
        .cycle-step.active,
        .framework-step.active {
            animation: none;
            transform: none;
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

// Initialize user preferences panel
window.userPreferencesPanel = new UserPreferencesPanel(window.socialMediaSection);
window.userPreferencesPanel.initializeUserPreferences();
