/**
 * Section 1 - Understanding Digital Self Enhanced Animations
 * Modern ES6+ implementation with comprehensive responsive features
 */

class DigitalSelfSection1 {
    constructor() {
        this.components = new Map();
        this.observers = new Map();
        this.eventListeners = new Map();
        this.animationFrameId = null;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.isHighDPI = window.devicePixelRatio > 1;
        
        // Responsive breakpoints
        this.breakpoints = {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        };
        
        // Current viewport state
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
            device: this.getDeviceType()
        };
        
        this.init();
    }

    /**
     * Determine device type based on viewport
     */
    getDeviceType() {
        const width = window.innerWidth;
        if (width < this.breakpoints.mobile) return 'mobile';
        if (width < this.breakpoints.tablet) return 'tablet';
        return 'desktop';
    }    /**
     * Initialize all components with responsive features
     */
    async init() {
        try {
            this.setupNavigation();
            await this.setupComponents();
            this.setupEventListeners();
            this.setupIntersectionObservers();
            this.setupResponsiveFeatures();
            this.initializeAccessibility();
            console.log('Section 1 initialized successfully with responsive features');
        } catch (error) {
            console.error('Error initializing Section 1:', error);
        }
    }

    /**
     * Setup all interactive components with responsive adaptations
     */
    async setupComponents() {
        const componentSetups = [
            () => this.initializeNavigation(),
            () => this.initializeIdentityModel(),
            () => this.initializeDimensionVisuals(),
            () => this.initializeTheoryCards(),
            () => this.initializeScrollAnimations(),
            () => this.initializeResponsiveInteractions()
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
     * Setup responsive features and viewport handling
     */
    setupResponsiveFeatures() {
        // Viewport change handling
        this.handleViewportChange = this.debounce(() => {
            const newViewport = {
                width: window.innerWidth,
                height: window.innerHeight,
                orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
                device: this.getDeviceType()
            };

            const deviceChanged = newViewport.device !== this.viewport.device;
            const orientationChanged = newViewport.orientation !== this.viewport.orientation;

            if (deviceChanged || orientationChanged) {
                this.viewport = newViewport;
                this.onViewportChange(deviceChanged, orientationChanged);
            }
        }, 250);

        window.addEventListener('resize', this.handleViewportChange);
        window.addEventListener('orientationchange', () => {
            setTimeout(this.handleViewportChange, 100);
        });

        // Reduced motion preference handling
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionQuery.addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            this.updateAnimationsForReducedMotion();
        });

        // High contrast preference handling
        const contrastQuery = window.matchMedia('(prefers-contrast: high)');
        contrastQuery.addEventListener('change', (e) => {
            document.body.classList.toggle('high-contrast', e.matches);
        });

        // Color scheme preference handling
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        colorSchemeQuery.addEventListener('change', (e) => {
            document.body.classList.toggle('dark-mode', e.matches);
        });
    }

    /**
     * Handle viewport changes
     */
    onViewportChange(deviceChanged, orientationChanged) {
        if (deviceChanged) {
            this.updateLayoutForDevice();
            this.updateInteractionsForDevice();
        }

        if (orientationChanged) {
            this.handleOrientationChange();
        }

        // Update component behaviors
        this.updateIdentityModelSize();
        this.updateNavigationBehavior();
        this.refreshIntersectionObservers();
    }

    /**
     * Initialize responsive navigation with touch support
     */
    async initializeNavigation() {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!navbar || !hamburger || !navMenu) return;

        // Enhanced hamburger menu with touch support
        this.setupHamburgerMenu(hamburger, navMenu, navLinks);
        
        // Scroll behavior for navbar
        this.setupNavbarScroll(navbar);
        
        // Touch gesture support for mobile navigation
        if (this.isTouchDevice) {
            this.setupTouchNavigation(navMenu);
        }

        // Keyboard navigation
        this.setupKeyboardNavigation(navLinks);
    }

    /**
     * Setup hamburger menu with enhanced animations
     */
    setupHamburgerMenu(hamburger, navMenu, navLinks) {
        let isOpen = false;

        const toggleMenu = () => {
            isOpen = !isOpen;
            hamburger.classList.toggle('active', isOpen);
            navMenu.classList.toggle('mobile-active', isOpen);
            navMenu.classList.toggle('mobile-hidden', !isOpen);
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', isOpen);
            navMenu.setAttribute('aria-hidden', !isOpen);
            
            // Manage focus
            if (isOpen) {
                navMenu.querySelector('.nav-link')?.focus();
                document.body.style.overflow = 'hidden';
            } else {
                hamburger.focus();
                document.body.style.overflow = '';
            }

            // Add haptic feedback on supported devices
            if ('vibrate' in navigator && this.isTouchDevice) {
                navigator.vibrate(50);
            }
        };

        // Click handler
        hamburger.addEventListener('click', toggleMenu);

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isOpen) toggleMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu();
            }
        });

        // Escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                toggleMenu();
            }
        });
    }

    /**
     * Setup navigation with hamburger menu functionality
     */
    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.querySelector('.navbar');

        if (hamburger && navMenu) {
            // Add click event listener for hamburger menu
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Toggle active state
                const isActive = hamburger.classList.contains('active');                hamburger.classList.toggle('active');
                navMenu.classList.toggle('mobile-active');
                hamburger.setAttribute('aria-expanded', !isActive);
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isActive ? 'auto' : 'hidden';
            });
                  // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });
                  // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('mobile-active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
                  // Close menu with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('mobile-active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
                hamburger.focus();
            }
        });
        }

        // Enhanced navbar background on scroll
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(10, 15, 28, 0.98)';
                    navbar.style.backdropFilter = 'blur(25px)';
                } else {
                    navbar.style.background = 'rgba(10, 15, 28, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                }
            });
        }
    }

    /**
     * Setup navbar scroll behavior
     */
    setupNavbarScroll(navbar) {
        let lastScrollTop = 0;
        let ticking = false;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show/hide navbar based on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }

            // Add backdrop blur when scrolled
            navbar.classList.toggle('navbar-scrolled', scrollTop > 50);

            lastScrollTop = scrollTop;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
    }

    /**
     * Setup touch navigation gestures
     */
    setupTouchNavigation(navMenu) {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        navMenu.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        navMenu.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        }, { passive: true });

        navMenu.addEventListener('touchend', () => {
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // Swipe left to close menu
            if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
                if (navMenu.classList.contains('mobile-active')) {
                    const hamburger = document.querySelector('.hamburger');
                    hamburger?.click();
                }
            }
        }, { passive: true });
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation(navLinks) {
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                    navLinks[prevIndex].focus();
                }
            });
        });
    }

    /**
     * Initialize identity model with responsive interactions
     */
    async initializeIdentityModel() {
        const modelContainer = document.querySelector('.identity-model');
        if (!modelContainer) return;

        // Create interactive visual elements
        this.createIdentityModelVisuals(modelContainer);
        
        // Setup responsive behavior
        this.setupIdentityModelResponsive(modelContainer);
        
        // Setup interaction handlers
        this.setupIdentityModelInteractions(modelContainer);
    }

    /**
     * Create visual elements for identity model
     */
    createIdentityModelVisuals(container) {
        // Create central core
        const core = document.createElement('div');
        core.className = 'identity-core';
        core.innerHTML = `
            <div class="core-pulse"></div>
            <div class="core-content">
                <h3>Digital Self</h3>
                <p>Core Identity</p>
            </div>
        `;

        // Create orbiting elements
        const orbitingElements = [
            { name: 'Real Self', angle: 0, color: 'var(--primary-color)' },
            { name: 'Ideal Self', angle: 120, color: 'var(--secondary-color)' },
            { name: 'Online Self', angle: 240, color: 'var(--accent-color)' }
        ];

        orbitingElements.forEach((element, index) => {
            const orbit = document.createElement('div');
            orbit.className = 'identity-orbit';
            orbit.style.setProperty('--orbit-delay', `${index * 0.5}s`);
            orbit.style.setProperty('--orbit-angle', `${element.angle}deg`);
            orbit.style.setProperty('--element-color', element.color);
            
            orbit.innerHTML = `
                <div class="orbit-path"></div>
                <div class="orbit-element" data-identity="${element.name.toLowerCase().replace(' ', '-')}">
                    <span>${element.name}</span>
                </div>
            `;
            
            container.appendChild(orbit);
        });

        container.appendChild(core);

        // Add connecting lines
        this.createConnectionLines(container);
    }

    /**
     * Create connection lines between identity elements
     */
    createConnectionLines(container) {
        const connections = document.createElement('div');
        connections.className = 'identity-connections';
        
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('div');
            line.className = 'connection-line';
            line.style.setProperty('--line-index', i);
            connections.appendChild(line);
        }
        
        container.appendChild(connections);
    }

    /**
     * Setup responsive behavior for identity model
     */
    setupIdentityModelResponsive(container) {
        const updateModelSize = () => {
            const containerRect = container.getBoundingClientRect();
            const size = Math.min(containerRect.width, containerRect.height, 400);
            container.style.setProperty('--model-size', `${size}px`);
        };

        // Initial update
        updateModelSize();

        // Update on resize
        window.addEventListener('resize', this.debounce(updateModelSize, 100));
    }

    /**
     * Setup identity model interactions
     */
    setupIdentityModelInteractions(container) {
        const orbitElements = container.querySelectorAll('.orbit-element');
        const core = container.querySelector('.identity-core');

        orbitElements.forEach(element => {
            // Hover/touch interactions
            const addInteraction = (eventType) => {
                element.addEventListener(eventType, () => {
                    // Highlight connections
                    container.classList.add('identity-focused');
                    element.classList.add('element-active');
                    
                    // Show details
                    this.showIdentityDetails(element.dataset.identity);
                });
            };

            const removeInteraction = (eventType) => {
                element.addEventListener(eventType, () => {
                    container.classList.remove('identity-focused');
                    element.classList.remove('element-active');
                    this.hideIdentityDetails();
                });
            };

            if (this.isTouchDevice) {
                addInteraction('touchstart');
                removeInteraction('touchend');
            } else {
                addInteraction('mouseenter');
                removeInteraction('mouseleave');
            }

            // Click for detailed view
            element.addEventListener('click', () => {
                this.openIdentityDetailModal(element.dataset.identity);
            });
        });

        // Core interaction
        core.addEventListener('click', () => {
            container.classList.toggle('model-expanded');
        });
    }

    /**
     * Show identity details
     */
    showIdentityDetails(identityType) {
        const details = {
            'real-self': {
                title: 'Real Self',
                description: 'Your authentic identity, core values, and true personality traits.',
                characteristics: ['Authentic values', 'Core beliefs', 'Natural behaviors', 'Personal experiences']
            },
            'ideal-self': {
                title: 'Ideal Self',
                description: 'Who you aspire to be, your goals and desired characteristics.',
                characteristics: ['Aspirational goals', 'Desired traits', 'Future vision', 'Personal growth']
            },
            'online-self': {
                title: 'Online Self',
                description: 'Your digital presence and how you present yourself online.',
                characteristics: ['Digital persona', 'Online behavior', 'Social media presence', 'Virtual interactions']
            }
        };

        const detail = details[identityType];
        if (!detail) return;

        // Create or update details panel
        let detailsPanel = document.querySelector('.identity-details');
        if (!detailsPanel) {
            detailsPanel = document.createElement('div');
            detailsPanel.className = 'identity-details';
            document.querySelector('.identity-model').appendChild(detailsPanel);
        }

        detailsPanel.innerHTML = `
            <h4>${detail.title}</h4>
            <p>${detail.description}</p>
            <ul>
                ${detail.characteristics.map(char => `<li>${char}</li>`).join('')}
            </ul>
        `;

        detailsPanel.classList.add('details-visible');
    }

    /**
     * Hide identity details
     */
    hideIdentityDetails() {
        const detailsPanel = document.querySelector('.identity-details');
        if (detailsPanel) {
            detailsPanel.classList.remove('details-visible');
        }
    }

    /**
     * Open identity detail modal
     */
    openIdentityDetailModal(identityType) {
        // Implementation for detailed modal view
        console.log(`Opening detailed view for: ${identityType}`);
    }

    /**
     * Initialize dimension visuals with enhanced animations
     */
    async initializeDimensionVisuals() {
        const dimensionVisuals = document.querySelectorAll('.dimension-visual');
        
        dimensionVisuals.forEach((visual, index) => {
            this.setupDimensionVisual(visual, index);
        });
    }

    /**
     * Setup individual dimension visual
     */
    setupDimensionVisual(visual, index) {
        const type = visual.dataset.dimension;
        
        // Create visual elements based on dimension type
        switch (type) {
            case 'real-self':
                this.createRealSelfVisual(visual);
                break;
            case 'ideal-self':
                this.createIdealSelfVisual(visual);
                break;
            case 'online-self':
                this.createOnlineSelfVisual(visual);
                break;
        }

        // Setup interaction
        this.setupDimensionInteraction(visual);
    }

    /**
     * Create Real Self visual representation
     */
    createRealSelfVisual(container) {
        const visual = document.createElement('div');
        visual.className = 'real-self-visual';
        
        // Core circle representing authentic self
        visual.innerHTML = `
            <div class="authentic-core">
                <div class="core-layers">
                    <div class="layer layer-1"></div>
                    <div class="layer layer-2"></div>
                    <div class="layer layer-3"></div>
                </div>
                <div class="core-content">
                    <i class="fas fa-heart"></i>
                    <span>Authentic</span>
                </div>
            </div>
            <div class="value-points">
                <div class="value-point" style="--angle: 0deg">Values</div>
                <div class="value-point" style="--angle: 72deg">Beliefs</div>
                <div class="value-point" style="--angle: 144deg">Traits</div>
                <div class="value-point" style="--angle: 216deg">Emotions</div>
                <div class="value-point" style="--angle: 288deg">Experiences</div>
            </div>
        `;
        
        container.appendChild(visual);
    }

    /**
     * Create Ideal Self visual representation
     */
    createIdealSelfVisual(container) {
        const visual = document.createElement('div');
        visual.className = 'ideal-self-visual';
        
        // Aspirational design with growth elements
        visual.innerHTML = `
            <div class="aspiration-tree">
                <div class="tree-trunk"></div>
                <div class="tree-branches">
                    <div class="branch branch-1">
                        <div class="goal-node">Career</div>
                    </div>
                    <div class="branch branch-2">
                        <div class="goal-node">Health</div>
                    </div>
                    <div class="branch branch-3">
                        <div class="goal-node">Relationships</div>
                    </div>
                    <div class="branch branch-4">
                        <div class="goal-node">Skills</div>
                    </div>
                </div>
                <div class="growth-indicator">
                    <i class="fas fa-arrow-up"></i>
                    <span>Growth</span>
                </div>
            </div>
        `;
        
        container.appendChild(visual);
    }

    /**
     * Create Online Self visual representation
     */
    createOnlineSelfVisual(container) {
        const visual = document.createElement('div');
        visual.className = 'online-self-visual';
        
        // Digital network representation
        visual.innerHTML = `
            <div class="digital-network">
                <div class="network-center">
                    <i class="fas fa-user-circle"></i>
                    <span>Digital You</span>
                </div>
                <div class="network-nodes">
                    <div class="network-node" data-platform="social">
                        <i class="fab fa-facebook"></i>
                    </div>
                    <div class="network-node" data-platform="professional">
                        <i class="fab fa-linkedin"></i>
                    </div>
                    <div class="network-node" data-platform="creative">
                        <i class="fab fa-instagram"></i>
                    </div>
                    <div class="network-node" data-platform="communication">
                        <i class="fas fa-envelope"></i>
                    </div>
                </div>
                <div class="connection-lines">
                    <div class="connection-line" data-connection="1"></div>
                    <div class="connection-line" data-connection="2"></div>
                    <div class="connection-line" data-connection="3"></div>
                    <div class="connection-line" data-connection="4"></div>
                </div>
            </div>
        `;
        
        container.appendChild(visual);
    }

    /**
     * Setup dimension visual interactions
     */
    setupDimensionInteraction(visual) {
        const handleInteraction = () => {
            visual.classList.add('visual-active');
            this.animateDimensionVisual(visual);
        };

        const handleInteractionEnd = () => {
            visual.classList.remove('visual-active');
        };

        if (this.isTouchDevice) {
            visual.addEventListener('touchstart', handleInteraction);
            visual.addEventListener('touchend', handleInteractionEnd);
        } else {
            visual.addEventListener('mouseenter', handleInteraction);
            visual.addEventListener('mouseleave', handleInteractionEnd);
        }
    }

    /**
     * Animate dimension visual
     */
    animateDimensionVisual(visual) {
        const type = visual.dataset.dimension;
        
        switch (type) {
            case 'real-self':
                this.animateRealSelfVisual(visual);
                break;
            case 'ideal-self':
                this.animateIdealSelfVisual(visual);
                break;
            case 'online-self':
                this.animateOnlineSelfVisual(visual);
                break;
        }
    }

    /**
     * Animate Real Self visual
     */
    animateRealSelfVisual(visual) {
        const layers = visual.querySelectorAll('.layer');
        const valuePoints = visual.querySelectorAll('.value-point');
        
        layers.forEach((layer, index) => {
            layer.style.animationDelay = `${index * 0.1}s`;
            layer.classList.add('layer-pulse');
        });
        
        valuePoints.forEach((point, index) => {
            setTimeout(() => {
                point.classList.add('point-highlight');
            }, index * 100);
        });
    }

    /**
     * Animate Ideal Self visual
     */
    animateIdealSelfVisual(visual) {
        const branches = visual.querySelectorAll('.branch');
        const goalNodes = visual.querySelectorAll('.goal-node');
        
        branches.forEach((branch, index) => {
            setTimeout(() => {
                branch.classList.add('branch-grow');
            }, index * 150);
        });
        
        goalNodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('goal-achieved');
            }, (index + 1) * 200);
        });
    }

    /**
     * Animate Online Self visual
     */
    animateOnlineSelfVisual(visual) {
        const nodes = visual.querySelectorAll('.network-node');
        const connections = visual.querySelectorAll('.connection-line');
        
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('node-active');
            }, index * 100);
        });
        
        connections.forEach((connection, index) => {
            setTimeout(() => {
                connection.classList.add('connection-active');
            }, (index + 1) * 150);
        });
    }

    /**
     * Initialize theory cards with enhanced interactions
     */
    async initializeTheoryCards() {
        const theoryCards = document.querySelectorAll('.theory-card');
        
        theoryCards.forEach((card, index) => {
            this.setupTheoryCard(card, index);
        });
    }

    /**
     * Setup individual theory card
     */
    setupTheoryCard(card, index) {
        // Add progressive reveal animation
        card.style.setProperty('--card-index', index);
        
        // Setup interaction handlers
        this.setupCardInteraction(card);
        
        // Setup expand/collapse functionality
        this.setupCardExpansion(card);
    }

    /**
     * Setup theory card interactions
     */
    setupCardInteraction(card) {
        const header = card.querySelector('.card-header');
        const content = card.querySelector('.card-content');
        
        if (!header || !content) return;
        
        let isExpanded = false;
        
        const toggleCard = () => {
            isExpanded = !isExpanded;
            card.classList.toggle('card-expanded', isExpanded);
            
            // Update ARIA attributes
            header.setAttribute('aria-expanded', isExpanded);
            content.setAttribute('aria-hidden', !isExpanded);
            
            // Animate content
            if (isExpanded) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
            } else {
                content.style.maxHeight = '0';
                content.style.opacity = '0';
            }
        };
        
        // Click to expand
        header.addEventListener('click', toggleCard);
        
        // Keyboard support
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard();
            }
        });
        
        // Touch support
        if (this.isTouchDevice) {
            header.addEventListener('touchend', (e) => {
                e.preventDefault();
                toggleCard();
            });
        }
    }

    /**
     * Setup card expansion animations
     */
    setupCardExpansion(card) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        observer.observe(card);
        this.observers.set(`theory-card-${card.dataset.theory}`, observer);
    }

    /**
     * Initialize scroll animations with enhanced performance
     */
    async initializeScrollAnimations() {
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
        this.setupScrollIndicators();
    }

    /**
     * Setup smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });
    }

    /**
     * Smooth scroll to target element
     */
    smoothScrollTo(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 1000); // Max 1 second
        
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }

    /**
     * Setup parallax effects for background elements
     */
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        if (this.isReducedMotion || parallaxElements.length === 0) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = element.dataset.parallaxRate || 0.5;
                const transform = `translateY(${scrolled * rate}px)`;
                element.style.transform = transform;
            });
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    /**
     * Setup scroll progress indicators
     */
    setupScrollIndicators() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        let ticking = false;
        
        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            
            progressBar.style.setProperty('--scroll-progress', `${progress}%`);
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        });
    }

    /**
     * Initialize responsive interactions
     */
    async initializeResponsiveInteractions() {
        this.setupTouchGestures();
        this.setupKeyboardShortcuts();
        this.setupVoiceNavigation();
    }

    /**
     * Setup touch gestures for mobile interaction
     */
    setupTouchGestures() {
        if (!this.isTouchDevice) return;
        
        let startY = 0;
        let startX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const endX = e.changedTouches[0].clientX;
            const diffY = startY - endY;
            const diffX = startX - endX;
            
            // Swipe gestures
            if (Math.abs(diffY) > Math.abs(diffX)) {
                if (diffY > 50) {
                    // Swipe up - next section
                    this.navigateToNextSection();
                } else if (diffY < -50) {
                    // Swipe down - previous section
                    this.navigateToPreviousSection();
                }
            }
        }, { passive: true });
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch (e.key) {
                case 'j':
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateToNextSection();
                    break;
                case 'k':
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateToPreviousSection();
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                    e.preventDefault();
                    this.navigateToSection(parseInt(e.key));
                    break;
                case 'h':
                    e.preventDefault();
                    this.toggleHelp();
                    break;
            }
        });
    }

    /**
     * Setup voice navigation (if supported)
     */
    setupVoiceNavigation() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            this.processVoiceCommand(command);
        };
        
        // Add voice activation button
        const voiceButton = document.createElement('button');
        voiceButton.className = 'voice-activation';
        voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceButton.setAttribute('aria-label', 'Voice navigation');
        
        voiceButton.addEventListener('click', () => {
            recognition.start();
            voiceButton.classList.add('listening');
        });
        
        recognition.onend = () => {
            voiceButton.classList.remove('listening');
        };
        
        document.body.appendChild(voiceButton);
    }

    /**
     * Process voice commands
     */
    processVoiceCommand(command) {
        const commands = {
            'next section': () => this.navigateToNextSection(),
            'previous section': () => this.navigateToPreviousSection(),
            'go to overview': () => this.navigateToSection(1),
            'go to dimensions': () => this.navigateToSection(2),
            'go to theory': () => this.navigateToSection(3),
            'go to insights': () => this.navigateToSection(4),
            'toggle menu': () => document.querySelector('.hamburger')?.click(),
            'scroll to top': () => window.scrollTo({ top: 0, behavior: 'smooth' })
        };
        
        const matchedCommand = Object.keys(commands).find(cmd => 
            command.includes(cmd)
        );
        
        if (matchedCommand) {
            commands[matchedCommand]();
        }
    }

    /**
     * Navigation helpers
     */
    navigateToNextSection() {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = this.getCurrentSection();
        const currentIndex = Array.from(sections).findIndex(section => 
            section.id === currentSection
        );
        
        if (currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            this.smoothScrollTo(nextSection);
        }
    }

    navigateToPreviousSection() {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = this.getCurrentSection();
        const currentIndex = Array.from(sections).findIndex(section => 
            section.id === currentSection
        );
        
        if (currentIndex > 0) {
            const prevSection = sections[currentIndex - 1];
            this.smoothScrollTo(prevSection);
        }
    }

    navigateToSection(sectionNumber) {
        const sections = document.querySelectorAll('section[id]');
        const targetSection = sections[sectionNumber - 1];
        
        if (targetSection) {
            this.smoothScrollTo(targetSection);
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                return section.id;
            }
        }
        
        return sections[0]?.id || '';
    }

    /**
     * Toggle help overlay
     */
    toggleHelp() {
        let helpOverlay = document.querySelector('.help-overlay');
        
        if (!helpOverlay) {
            helpOverlay = this.createHelpOverlay();
            document.body.appendChild(helpOverlay);
        }
        
        helpOverlay.classList.toggle('help-visible');
    }

    /**
     * Create help overlay
     */
    createHelpOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'help-overlay';
        
        overlay.innerHTML = `
            <div class="help-content">
                <button class="help-close" aria-label="Close help">
                    <i class="fas fa-times"></i>
                </button>
                <h2>Navigation Help</h2>
                <div class="help-sections">
                    <div class="help-section">
                        <h3>Keyboard Shortcuts</h3>
                        <ul>
                            <li><kbd>↓</kbd> or <kbd>J</kbd> - Next section</li>
                            <li><kbd>↑</kbd> or <kbd>K</kbd> - Previous section</li>
                            <li><kbd>1-4</kbd> - Jump to section</li>
                            <li><kbd>H</kbd> - Toggle this help</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h3>Touch Gestures</h3>
                        <ul>
                            <li>Swipe up - Next section</li>
                            <li>Swipe down - Previous section</li>
                            <li>Swipe left - Close menu</li>
                            <li>Tap and hold - Show details</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h3>Voice Commands</h3>
                        <ul>
                            <li>"Next section"</li>
                            <li>"Previous section"</li>
                            <li>"Go to [section name]"</li>
                            <li>"Toggle menu"</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Close button handler
        overlay.querySelector('.help-close').addEventListener('click', () => {
            overlay.classList.remove('help-visible');
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('help-visible')) {
                overlay.classList.remove('help-visible');
            }
        });
        
        // Close on click outside
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('help-visible');
            }
        });
        
        return overlay;
    }

    /**
     * Initialize accessibility features
     */
    initializeAccessibility() {
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
        this.setupHighContrastMode();
        this.setupReducedMotionSupport();
    }

    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Skip links for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });
    }

    /**
     * Setup screen reader support
     */
    setupScreenReaderSupport() {
        // Add live region for dynamic content announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
        
        // Announce section changes
        const announceSection = (sectionName) => {
            liveRegion.textContent = `Now viewing ${sectionName} section`;
        };
        
        // Setup intersection observer for section announcements
        const sections = document.querySelectorAll('section[id]');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionName = entry.target.querySelector('h2')?.textContent || 
                                      entry.target.id.replace('-', ' ');
                    announceSection(sectionName);
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => sectionObserver.observe(section));
    }

    /**
     * Setup high contrast mode
     */
    setupHighContrastMode() {
        // Detect high contrast preference
        const contrastQuery = window.matchMedia('(prefers-contrast: high)');
        
        const updateContrast = (e) => {
            document.body.classList.toggle('high-contrast', e.matches);
        };
        
        updateContrast(contrastQuery);
        contrastQuery.addEventListener('change', updateContrast);
        
        // Manual toggle
        const contrastToggle = document.createElement('button');
        contrastToggle.className = 'contrast-toggle';
        contrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
        contrastToggle.innerHTML = '<i class="fas fa-adjust"></i>';
        
        contrastToggle.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });
        
        document.querySelector('.navbar')?.appendChild(contrastToggle);
    }

    /**
     * Setup reduced motion support
     */
    setupReducedMotionSupport() {
        this.updateAnimationsForReducedMotion();
    }

    /**
     * Update animations based on reduced motion preference
     */
    updateAnimationsForReducedMotion() {
        if (this.isReducedMotion) {
            document.body.classList.add('reduced-motion');
            
            // Disable parallax
            const parallaxElements = document.querySelectorAll('.parallax-element');
            parallaxElements.forEach(element => {
                element.style.transform = 'none';
            });
            
            // Reduce animation durations
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
            document.documentElement.style.setProperty('--transition-duration', '0.1s');
        } else {
            document.body.classList.remove('reduced-motion');
            document.documentElement.style.removeProperty('--animation-duration');
            document.documentElement.style.removeProperty('--transition-duration');
        }
    }

    /**
     * Setup event listeners with proper cleanup
     */
    setupEventListeners() {
        const listeners = [];
        
        // Window resize
        const resizeHandler = this.throttle(() => this.handleResize(), 100);
        window.addEventListener('resize', resizeHandler);
        listeners.push(['window', 'resize', resizeHandler]);
        
        // Orientation change
        const orientationHandler = () => {
            setTimeout(() => this.handleResize(), 100);
        };
        window.addEventListener('orientationchange', orientationHandler);
        listeners.push(['window', 'orientationchange', orientationHandler]);
        
        // Visibility change
        const visibilityHandler = () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        };
        document.addEventListener('visibilitychange', visibilityHandler);
        listeners.push(['document', 'visibilitychange', visibilityHandler]);
        
        // Store listeners for cleanup
        this.eventListeners.set('global', listeners);
    }

    /**
     * Handle resize events
     */
    handleResize() {
        // Update viewport
        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
            device: this.getDeviceType()
        };
        
        // Update components
        this.updateIdentityModelSize();
        this.updateNavigationBehavior();
        this.refreshIntersectionObservers();
    }

    /**
     * Update identity model size
     */
    updateIdentityModelSize() {
        const model = document.querySelector('.identity-model');
        if (model) {
            const containerRect = model.getBoundingClientRect();
            const size = Math.min(containerRect.width, containerRect.height, 400);
            model.style.setProperty('--model-size', `${size}px`);
        }
    }

    /**
     * Update navigation behavior
     */
    updateNavigationBehavior() {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (this.viewport.device === 'mobile') {
            navbar?.classList.add('mobile-nav');
            navMenu?.classList.add('mobile-menu');
        } else {
            navbar?.classList.remove('mobile-nav');
            navMenu?.classList.remove('mobile-menu', 'mobile-active');
        }
    }

    /**
     * Update layout for device type
     */
    updateLayoutForDevice() {
        document.body.className = document.body.className.replace(
            /device-\w+/g, 
            `device-${this.viewport.device}`
        );
        
        if (!document.body.className.includes(`device-${this.viewport.device}`)) {
            document.body.classList.add(`device-${this.viewport.device}`);
        }
    }

    /**
     * Update interactions for device type
     */
    updateInteractionsForDevice() {
        // Enable/disable touch-specific features
        if (this.isTouchDevice) {
            document.body.classList.add('touch-device');
        } else {
            document.body.classList.remove('touch-device');
        }
    }

    /**
     * Handle orientation change
     */
    handleOrientationChange() {
        document.body.classList.toggle('landscape', this.viewport.orientation === 'landscape');
        document.body.classList.toggle('portrait', this.viewport.orientation === 'portrait');
    }

    /**
     * Setup intersection observers
     */
    setupIntersectionObservers() {
        // Section visibility observer
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    this.animateSection(entry.target);
                } else {
                    entry.target.classList.remove('section-visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => sectionObserver.observe(section));
        this.observers.set('sections', sectionObserver);
        
        // Element animation observer
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe animatable elements
        const animatableElements = document.querySelectorAll(
            '.theory-card, .dimension-visual, .insight-item'
        );
        animatableElements.forEach(element => elementObserver.observe(element));
        this.observers.set('elements', elementObserver);
    }

    /**
     * Refresh intersection observers
     */
    refreshIntersectionObservers() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.setupIntersectionObservers();
    }

    /**
     * Animate section when it becomes visible
     */
    animateSection(section) {
        const elements = section.querySelectorAll(
            '.theory-card, .dimension-visual, .insight-item, .fade-in'
        );
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 100);
        });
    }

    /**
     * Pause animations when page is hidden
     */
    pauseAnimations() {
        document.body.classList.add('animations-paused');
        
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /**
     * Resume animations when page is visible
     */
    resumeAnimations() {
        document.body.classList.remove('animations-paused');
    }

    /**
     * Utility: Throttle function
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
     * Utility: Debounce function
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
     * Cleanup method
     */
    destroy() {
        // Clean up event listeners
        this.eventListeners.forEach(listeners => {
            listeners.forEach(([target, event, handler]) => {
                if (target === 'window') {
                    window.removeEventListener(event, handler);
                } else if (target === 'document') {
                    document.removeEventListener(event, handler);
                }
            });
        });
        
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        
        // Cancel animation frame
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        // Clear components
        this.components.clear();
        this.observers.clear();
        this.eventListeners.clear();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.digitalSelfSection1 = new DigitalSelfSection1();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.digitalSelfSection1) {
        window.digitalSelfSection1.destroy();
    }
});
