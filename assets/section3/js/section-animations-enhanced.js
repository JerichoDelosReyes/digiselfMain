/**
 * Section 3 - Digital Ethics, Privacy & Security Enhanced Animations
 * Modern ES6+ implementation with accessibility, performance, and error handling
 */

class DigitalEthicsSection {
    constructor() {
        this.components = new Map();
        this.observers = new Map();
        this.eventListeners = new Map();
        this.animationFrameId = null;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.actionProgress = 0;
        
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
            console.log('Section 3 (Digital Ethics) initialized successfully');
        } catch (error) {
            console.error('Error initializing Section 3:', error);
        }
    }

    /**
     * Setup all interactive components
     */
    async setupComponents() {        const componentSetups = [
            () => this.initializeNavigation(),
            () => this.initializePrivacyHealthCheck(), // Add privacy health check
            () => this.initializeSecurityMeter(),
            () => this.initializePrivacyControls(),
            () => this.initializeEthicsScenarios(),
            () => this.initializeActionTracker(),
            () => this.initializeVulnerabilityScanner(),
            () => this.initializeThreatCards(),
            () => this.initializeResponsePlan(),
            () => this.initializeCitizenshipPillars(),
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

        if (!hamburger || !navMenu || !navbar) return;        // Mobile menu toggle with ARIA support
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
            
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
                document.body.style.overflow = 'auto';
                hamburger.focus();
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
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
     * Interactive security meter
     */
    initializeSecurityMeter() {
        const securityMeter = document.querySelector('.security-meter');
        if (!securityMeter) return;

        const levels = securityMeter.querySelectorAll('.security-level');
        const scoreDisplay = securityMeter.querySelector('.security-score');
        
        let currentScore = 0;
        let targetScore = 75; // Default security score

        const updateSecurityMeter = (score) => {
            currentScore = Math.max(0, Math.min(100, score));
            
            // Update level indicators
            levels.forEach((level, index) => {
                const threshold = (index + 1) * 20;
                level.classList.toggle('active', currentScore >= threshold);
                
                // Add color coding
                if (currentScore >= threshold) {
                    if (currentScore >= 80) {
                        level.style.background = '#10b981'; // Green
                    } else if (currentScore >= 60) {
                        level.style.background = '#f59e0b'; // Amber
                    } else {
                        level.style.background = '#ef4444'; // Red
                    }
                }
            });

            // Update score display
            if (scoreDisplay) {
                scoreDisplay.textContent = `${Math.round(currentScore)}%`;
                scoreDisplay.style.color = currentScore >= 80 ? '#10b981' : 
                                          currentScore >= 60 ? '#f59e0b' : '#ef4444';
            }
        };        // Animate security meter when it comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach entry => {
                if (entry.isIntersecting && !this.isReducedMotion) {
                    this.animateSecurityScore(0, targetScore, updateSecurityMeter);
                    observer.unobserve(securityMeter);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(securityMeter);
        this.observers.set('security-meter', observer);

        this.components.set('securityMeter', { securityMeter, updateSecurityMeter });
    }

    /**
     * Animate security score counter
     */
    animateSecurityScore(start, end, callback) {
        const duration = 2000;
        const startTime = performance.now();

        const updateScore = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentScore = start + (end - start) * easeOutCubic;
            
            callback(currentScore);

            if (progress < 1) {
                requestAnimationFrame(updateScore);
            }
        };

        requestAnimationFrame(updateScore);
    }

    /**
     * Privacy controls interface
     */
    initializePrivacyControls() {
        const privacyToggles = document.querySelectorAll('.privacy-toggle');
        const privacyScore = document.querySelector('.privacy-score');

        let enabledControls = 0;

        privacyToggles.forEach(toggle => {
            // Add visual feedback for toggle states
            toggle.addEventListener('change', (e) => {
                const control = e.target.closest('.privacy-control');
                if (!control) return;

                control.classList.toggle('enabled', e.target.checked);
                
                // Update privacy score
                enabledControls = document.querySelectorAll('.privacy-toggle:checked').length;
                const score = Math.round((enabledControls / privacyToggles.length) * 100);
                
                if (privacyScore) {
                    privacyScore.textContent = `${score}%`;
                    this.updatePrivacyScoreColor(privacyScore, score);
                }

                // Add haptic feedback simulation
                if (!this.isReducedMotion) {
                    control.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        control.style.transform = 'scale(1)';
                    }, 150);
                }
            });

            // Add keyboard support
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.checked = !toggle.checked;
                    toggle.dispatchEvent(new Event('change'));
                }
            });
        });

        this.components.set('privacyControls', { privacyToggles, privacyScore });
    }

    /**
     * Update privacy score color based on value
     */
    updatePrivacyScoreColor(element, score) {
        const color = score >= 80 ? '#10b981' : 
                     score >= 60 ? '#f59e0b' : '#ef4444';
        element.style.color = color;
    }

    /**
     * Ethics scenarios with interactive decision making
     */
    initializeEthicsScenarios() {
        const scenarios = document.querySelectorAll('.ethics-scenario');

        scenarios.forEach((scenario, index) => {
            const choices = scenario.querySelectorAll('.choice-option');
            const feedback = scenario.querySelector('.scenario-feedback');

            choices.forEach(choice => {
                choice.addEventListener('click', () => {
                    // Reset other choices
                    choices.forEach(c => c.classList.remove('selected'));
                    
                    // Select current choice
                    choice.classList.add('selected');
                    
                    // Show feedback
                    if (feedback) {
                        feedback.classList.add('visible');
                        
                        // Update feedback based on choice
                        this.updateScenarioFeedback(feedback, choice.dataset.choice);
                    }

                    // Track ethics progress
                    this.updateEthicsProgress();
                });

                // Add keyboard support
                choice.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        choice.click();
                    }
                });
            });
        });

        this.components.set('ethicsScenarios', { scenarios });
    }

    /**
     * Update scenario feedback based on user choice
     */
    updateScenarioFeedback(feedbackElement, choice) {
        const feedbackData = {
            'ethical': {
                text: '✅ Excellent choice! This demonstrates strong ethical reasoning.',
                class: 'positive'
            },
            'questionable': {
                text: '⚠️ This choice raises some ethical concerns. Consider the implications.',
                class: 'warning'
            },
            'problematic': {
                text: '❌ This choice could cause harm. Reflect on alternative approaches.',
                class: 'negative'
            }
        };

        const feedback = feedbackData[choice] || feedbackData['questionable'];
        feedbackElement.textContent = feedback.text;
        feedbackElement.className = `scenario-feedback visible ${feedback.class}`;
    }

    /**
     * Update ethics progress tracking
     */
    updateEthicsProgress() {
        const completedScenarios = document.querySelectorAll('.ethics-scenario .choice-option.selected').length;
        const totalScenarios = document.querySelectorAll('.ethics-scenario').length;
        const progressBar = document.querySelector('.ethics-progress-bar');
        
        if (progressBar) {
            const percentage = (completedScenarios / totalScenarios) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    }

    /**
     * Action tracker with progress monitoring
     */
    initializeActionTracker() {
        const actionItems = document.querySelectorAll('.action-item input[type="checkbox"]');
        const progressFill = document.querySelector('.progress-fill');
        const completedActions = document.querySelector('.completed-actions');
        const progressMessage = document.querySelector('.progress-message');

        if (!actionItems.length) return;

        const updateProgress = () => {
            const checked = document.querySelectorAll('.action-item input[type="checkbox"]:checked');
            this.actionProgress = checked.length;
            const percentage = (this.actionProgress / actionItems.length) * 100;

            // Update progress bar
            if (progressFill) {
                progressFill.style.width = `${percentage}%`;
                progressFill.style.background = this.getProgressColor(percentage);
            }

            // Update counter
            if (completedActions) {
                completedActions.textContent = this.actionProgress;
            }

            // Update message
            if (progressMessage) {
                progressMessage.textContent = this.getProgressMessage(percentage);
            }

            // Store progress in localStorage
            localStorage.setItem('digitalEthicsProgress', JSON.stringify({
                completed: Array.from(checked).map(input => input.id),
                timestamp: Date.now()
            }));
        };

        // Add event listeners to action items
        actionItems.forEach(item => {
            item.addEventListener('change', (e) => {
                const label = e.target.closest('.action-item');
                label.classList.toggle('completed', e.target.checked);
                
                // Add completion animation
                if (e.target.checked && !this.isReducedMotion) {
                    label.style.animation = 'completionPulse 0.5s ease-out';
                    setTimeout(() => {
                        label.style.animation = '';
                    }, 500);
                }

                updateProgress();
            });
        });

        // Load saved progress
        this.loadSavedProgress(actionItems);

        this.components.set('actionTracker', { actionItems, updateProgress });
    }

    /**
     * Load saved progress from localStorage
     */
    loadSavedProgress(actionItems) {
        try {
            const saved = localStorage.getItem('digitalEthicsProgress');
            if (saved) {
                const progress = JSON.parse(saved);
                progress.completed.forEach(id => {
                    const item = document.getElementById(id);
                    if (item) {
                        item.checked = true;
                        item.closest('.action-item').classList.add('completed');
                    }
                });
                
                // Update progress display
                const event = new Event('change');
                actionItems[0]?.dispatchEvent(event);
            }
        } catch (error) {
            console.error('Error loading saved progress:', error);
        }
    }

    /**
     * Get progress bar color based on percentage
     */
    getProgressColor(percentage) {
        if (percentage >= 80) return '#10b981';
        if (percentage >= 60) return '#f59e0b';
        if (percentage >= 40) return '#f97316';
        return '#ef4444';
    }

    /**
     * Get progress message based on percentage
     */
    getProgressMessage(percentage) {
        if (percentage === 100) return '🎉 Congratulations! You\'re a digital ethics champion!';
        if (percentage >= 80) return '🌟 Excellent progress! You\'re almost there!';
        if (percentage >= 60) return '👍 Great work! Keep building those ethical habits!';
        if (percentage >= 40) return '📈 Good start! Continue taking action!';
        if (percentage > 0) return '✨ Nice beginning! Every action counts!';
        return 'Start taking action to become a responsible digital citizen!';
    }

    /**
     * Vulnerability scanner simulation
     */
    initializeVulnerabilityScanner() {
        const scanButton = document.querySelector('.vulnerability-scan-btn');
        const scanResults = document.querySelector('.scan-results');
        const scanProgress = document.querySelector('.scan-progress');

        if (!scanButton || !scanResults) return;

        scanButton.addEventListener('click', () => {
            this.runVulnerabilityScan(scanProgress, scanResults);
        });

        this.components.set('vulnerabilityScanner', { scanButton, scanResults, scanProgress });
    }

    /**
     * Run vulnerability scan simulation
     */
    async runVulnerabilityScan(progressElement, resultsElement) {
        const scanSteps = [
            'Checking password strength...',
            'Scanning for outdated software...',
            'Analyzing privacy settings...',
            'Checking for data breaches...',
            'Evaluating security protocols...',
            'Generating recommendations...'
        ];

        // Show progress
        if (progressElement) {
            progressElement.style.display = 'block';
            progressElement.innerHTML = '<div class="scan-bar"></div><div class="scan-text">Starting scan...</div>';
        }

        for (let i = 0; i < scanSteps.length; i++) {
            await this.delay(800);
            
            const progress = ((i + 1) / scanSteps.length) * 100;
            if (progressElement) {
                const bar = progressElement.querySelector('.scan-bar');
                const text = progressElement.querySelector('.scan-text');
                
                if (bar) bar.style.width = `${progress}%`;
                if (text) text.textContent = scanSteps[i];
            }
        }

        // Show results
        await this.delay(500);
        this.displayScanResults(resultsElement);
        
        if (progressElement) {
            progressElement.style.display = 'none';
        }
    }

    /**
     * Display scan results
     */
    displayScanResults(resultsElement) {
        const results = [
            { type: 'warning', message: 'Weak password detected on 2 accounts' },
            { type: 'info', message: '3 software updates available' },
            { type: 'success', message: 'Privacy settings are well configured' },
            { type: 'error', message: 'Email found in 1 data breach' }
        ];

        const resultsHTML = `
            <div class="scan-summary">
                <h4>Security Scan Complete</h4>
                <div class="results-list">
                    ${results.map(result => `
                        <div class="result-item ${result.type}">
                            <span class="result-icon">${this.getResultIcon(result.type)}</span>
                            <span class="result-text">${result.message}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="fix-issues-btn">Fix Critical Issues</button>
            </div>
        `;

        resultsElement.innerHTML = resultsHTML;
        resultsElement.style.display = 'block';

        // Add event listener to fix button
        const fixButton = resultsElement.querySelector('.fix-issues-btn');
        if (fixButton) {
            fixButton.addEventListener('click', () => {
                this.showFixRecommendations(resultsElement);
            });
        }
    }

    /**
     * Get icon for result type
     */
    getResultIcon(type) {
        const icons = {
            'success': '✅',
            'warning': '⚠️',
            'error': '❌',
            'info': 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    }

    /**
     * Show fix recommendations
     */
    showFixRecommendations(resultsElement) {
        const recommendations = `
            <div class="fix-recommendations">
                <h4>Recommended Actions</h4>
                <ol>
                    <li>Update passwords using a password manager</li>
                    <li>Enable two-factor authentication</li>
                    <li>Install pending software updates</li>
                    <li>Monitor data breach notifications</li>
                </ol>
                <button class="close-scan-btn">Close</button>
            </div>
        `;

        resultsElement.innerHTML = recommendations;

        const closeButton = resultsElement.querySelector('.close-scan-btn');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                resultsElement.style.display = 'none';
            });
        }
    }

    /**
     * Enhanced scroll animations with intersection observer
     */
    initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.ethics-principle, .security-tip, .privacy-control, .action-category, .vulnerability-item'
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
     * Utility function for delays
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
        const securityMeter = this.components.get('securityMeter');
        if (securityMeter) {
            // Adjust meter layout
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

        console.log('Section 3 cleanup completed');
    }
}

// CSS animations to be added via JavaScript if not in CSS
const ethicsAnimations = `
    @keyframes completionPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
        100% { transform: scale(1); }
    }

    @keyframes privacyCheckPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); }
        100% { transform: scale(1); }
    }

    @keyframes securityScan {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    @keyframes slideInLeft {
        from { transform: translateX(-30px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes fadeInScale {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }

    @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
        50% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.8); }
    }

    .animate-in {
        animation: slideInLeft 0.6s ease-out forwards;
    }

    .privacy-control.enabled {
        border-color: #10b981;
        animation: glow 1s ease-in-out;
    }

    .scan-bar {
        height: 4px;
        background: linear-gradient(90deg, #4f46e5, #7c3aed);
        border-radius: 2px;
        transition: width 0.3s ease;
        animation: securityScan 2s ease-in-out infinite;
    }

    /* Privacy Health Check Styles */
    .checkup-item.completed {
        background: rgba(16, 185, 129, 0.1);
        border-color: rgba(16, 185, 129, 0.3);
    }

    .checkup-item.completed .checkmark {
        background: #10b981;
        border-color: #10b981;
    }

    .checkup-item.completed .checkmark:after {
        content: '✓';
        color: white;
        font-weight: bold;
        font-size: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    /* Score Display Colors */
    .score-display.score-excellent .score-number {
        color: #10b981;
        text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
    }

    .score-display.score-good .score-number {
        color: #3b82f6;
        text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
    }

    .score-display.score-fair .score-number {
        color: #f59e0b;
        text-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
    }

    .score-display.score-poor .score-number {
        color: #f97316;
        text-shadow: 0 0 10px rgba(249, 115, 22, 0.3);
    }

    .score-display.score-critical .score-number {
        color: #ef4444;
        text-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
        animation: glow 2s ease-in-out infinite;
    }

    .recommendations-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0 0;
    }

    .recommendation-item {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
    }

    .recommendation-item:last-child {
        border-bottom: none;
    }

    @media (prefers-reduced-motion: reduce) {
        .animate-in,
        .privacy-control.enabled,
        .scan-bar,
        .score-display.score-critical .score-number {
            animation: none;
        }
    }
`;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.digitalEthicsSection = new DigitalEthicsSection();
    });
} else {
    window.digitalEthicsSection = new DigitalEthicsSection();
}

// Add animations to document if not already present
if (!document.querySelector('#section3-animations')) {
    const style = document.createElement('style');
    style.id = 'section3-animations';
    style.textContent = ethicsAnimations;
    document.head.appendChild(style);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DigitalEthicsSection;
}

/**
     * Enhanced privacy health check functionality
     */
    initializePrivacyHealthCheck() {
        const checkupItems = document.querySelectorAll('.checkup-item');
        const scoreDisplay = document.querySelector('.score-number');
        const feedbackText = document.querySelector('.feedback-text');
        const feedbackRecommendations = document.querySelector('.feedback-recommendations');

        if (!checkupItems.length) return;

        const updatePrivacyScore = () => {
            const checkedItems = document.querySelectorAll('.checkup-item input[type="checkbox"]:checked');
            const score = checkedItems.length;
            const maxScore = checkupItems.length;
            const percentage = Math.round((score / maxScore) * 100);

            // Update score display
            if (scoreDisplay) {
                scoreDisplay.textContent = score;
                scoreDisplay.style.color = this.getScoreColor(percentage);
            }

            // Update feedback
            if (feedbackText) {
                feedbackText.textContent = this.getPrivacyFeedback(percentage);
            }

            // Update recommendations
            if (feedbackRecommendations) {
                feedbackRecommendations.innerHTML = this.getPrivacyRecommendations(percentage);
            }

            // Save progress
            this.savePrivacyCheckupProgress(checkedItems);
        };

        // Add event listeners to checkup items
        checkupItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (!checkbox) return;

            checkbox.addEventListener('change', (e) => {
                item.classList.toggle('completed', e.target.checked);
                
                // Add completion animation
                if (e.target.checked && !this.isReducedMotion) {
                    item.style.animation = 'completionPulse 0.5s ease-out';
                    setTimeout(() => {
                        item.style.animation = '';
                    }, 500);
                }

                updatePrivacyScore();
            });

            // Make entire item clickable
            item.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        });

        // Load saved progress
        this.loadPrivacyCheckupProgress();
        updatePrivacyScore();

        this.components.set('privacyHealthCheck', { checkupItems, updatePrivacyScore });
    }

    /**
     * Get privacy feedback based on score percentage
     */
    getPrivacyFeedback(percentage) {
        if (percentage >= 90) return '🔒 Excellent! Your privacy practices are very strong.';
        if (percentage >= 75) return '✅ Good privacy practices! Keep it up.';
        if (percentage >= 50) return '⚠️ Moderate privacy protection. Room for improvement.';
        if (percentage >= 25) return '🔍 Your privacy needs attention. Start with basics.';
        return '🚨 Critical: Your digital privacy is at risk!';
    }

    /**
     * Get privacy recommendations based on score
     */
    getPrivacyRecommendations(percentage) {
        const recommendations = [];
        
        if (percentage < 90) {
            recommendations.push('Enable two-factor authentication on all important accounts');
            recommendations.push('Review and update your privacy settings regularly');
        }
        
        if (percentage < 75) {
            recommendations.push('Use a password manager for unique, strong passwords');
            recommendations.push('Be cautious about what you share on social media');
        }
        
        if (percentage < 50) {
            recommendations.push('Limit data sharing with third-party applications');
            recommendations.push('Use private browsing modes when appropriate');
        }
        
        if (percentage < 25) {
            recommendations.push('Start with basic security: update passwords and software');
            recommendations.push('Learn about common privacy threats and how to avoid them');
        }

        return `<h5>Recommendations:</h5><ul>${recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul>`;
    }

    /**
     * Get score color based on percentage
     */
    getScoreColor(percentage) {
        if (percentage >= 75) return '#10b981'; // Green
        if (percentage >= 50) return '#f59e0b'; // Yellow
        return '#ef4444'; // Red
    }

    /**
     * Save privacy checkup progress
     */
    savePrivacyCheckupProgress(checkedItems) {
        const progress = Array.from(checkedItems).map(item => item.id || item.closest('.checkup-item').dataset.id);
        localStorage.setItem('privacyCheckupProgress', JSON.stringify({
            completed: progress,
            timestamp: Date.now()
        }));
    }

    /**
     * Load saved privacy checkup progress
     */
    loadPrivacyCheckupProgress() {
        try {
            const saved = localStorage.getItem('privacyCheckupProgress');
            if (saved) {
                const progress = JSON.parse(saved);
                progress.completed.forEach(id => {
                    const checkbox = document.getElementById(id) || 
                                   document.querySelector(`[data-id="${id}"] input[type="checkbox"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.closest('.checkup-item').classList.add('completed');
                    }
                });
            }    }

    /**
     * Enhanced threat card interactions
     */
    initializeThreatCards() {
        const threatCards = document.querySelectorAll('.threat-card');
        
        threatCards.forEach(card => {
            const protectionTips = card.querySelector('.protection-tips');
            
            // Make threat cards clickable to expand/collapse protection tips
            card.addEventListener('click', (e) => {
                // Don't toggle if clicking on links or buttons inside
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
                
                card.classList.toggle('expanded');
                
                if (protectionTips) {
                    if (card.classList.contains('expanded')) {
                        protectionTips.style.maxHeight = protectionTips.scrollHeight + 'px';
                        protectionTips.style.opacity = '1';
                        protectionTips.style.marginTop = '1rem';
                    } else {
                        protectionTips.style.maxHeight = '0';
                        protectionTips.style.opacity = '0';
                        protectionTips.style.marginTop = '0';
                    }
                }
            });

            // Add keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });

            // Make cards focusable
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-expanded', 'false');

            // Update aria-expanded when toggled
            const observer = new MutationObserver(() => {
                card.setAttribute('aria-expanded', card.classList.contains('expanded'));
            });
            observer.observe(card, { attributes: true, attributeFilter: ['class'] });
        });

        this.components.set('threatCards', { threatCards });
    }

    /**
     * Enhanced step-by-step response plan
     */
    initializeResponsePlan() {
        const stepCards = document.querySelectorAll('.step-card');
        
        stepCards.forEach((card, index) => {
            // Add entrance animation with delay
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);

            // Add hover interactions
            card.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    card.style.transform = 'translateY(-4px) scale(1.02)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!this.isReducedMotion) {
                    card.style.transform = 'translateY(0) scale(1)';
                }
            });
        });

        // Initialize cards as hidden for animation
        stepCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
        });

        this.components.set('responsePlan', { stepCards });
    }

    /**
     * Enhanced digital citizenship pillars
     */
    initializeCitizenshipPillars() {
        const pillars = document.querySelectorAll('.pillar');
        
        pillars.forEach((pillar, index) => {
            // Add entrance animation
            setTimeout(() => {
                pillar.style.opacity = '1';
                pillar.style.transform = 'translateY(0)';
            }, index * 150);

            // Add click interaction to expand actions
            const actions = pillar.querySelector('.pillar-actions');
            if (actions) {
                pillar.addEventListener('click', () => {
                    pillar.classList.toggle('expanded');
                    
                    if (pillar.classList.contains('expanded')) {
                        actions.style.maxHeight = actions.scrollHeight + 'px';
                    } else {
                        actions.style.maxHeight = '120px'; // Default visible height
                    }
                });

                // Set initial max-height
                actions.style.maxHeight = '120px';
                actions.style.overflow = 'hidden';
                actions.style.transition = 'max-height 0.3s ease';
            }
        });

        // Initialize pillars as hidden for animation
        pillars.forEach(pillar => {
            pillar.style.opacity = '0';
            pillar.style.transform = 'translateY(30px)';
            pillar.style.transition = 'all 0.6s ease';
        });

        this.components.set('citizenshipPillars', { pillars });
    }
}
