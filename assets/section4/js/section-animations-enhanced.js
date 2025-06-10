/**
 * Enhanced Digital Self & Mental Well-being Section
 * Modern ES6+ class-based architecture with comprehensive mental health features
 * Author: Digital Self Project Team
 * Date: 2024
 */

console.log('Digital Self & Mental Well-being JavaScript loading...');

// Utility Classes
class Utils {
    static throttle(func, limit) {
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

    static debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    static formatTime(hours) {
        if (hours < 1) {
            return `${Math.round(hours * 60)}min`;
        }
        return `${hours}h${hours % 1 > 0 ? ` ${Math.round((hours % 1) * 60)}min` : ''}`;
    }

    static getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        return 'evening';
    }

    static saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.warn('Local storage save failed:', error);
            return false;
        }
    }

    static loadFromLocalStorage(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.warn('Local storage load failed:', error);
            return defaultValue;
        }
    }
}

// Animation Controller
class AnimationController {
    constructor() {
        this.observer = null;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (this.prefersReducedMotion) return;

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        this.setupAnimations();
    }

    setupAnimations() {
        // Animate elements as they come into view
        const animatedElements = document.querySelectorAll(`
            .hero-content, .hero-visual, .overview-content, .overview-visual,
            .pillar-card, .insight-card, .strategy-category, .principle-card,
            .check-in-card, .nav-card
        `);

        animatedElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            this.observer?.observe(el);
        });
    }

    animateWellnessMeter() {
        const meter = document.querySelector('.wellness-meter');
        if (!meter) return;

        const factors = meter.querySelectorAll('.factor');
        factors.forEach((factor, index) => {
            factor.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite alternate`;
        });
    }
}

// Navigation Controller
class NavigationController {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        this.setupHamburgerMenu();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.setupKeyboardNavigation();
    }    setupHamburgerMenu() {
        if (!this.hamburger || !this.navMenu) return;

        this.hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = this.hamburger.getAttribute('aria-expanded') === 'true';
            
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            this.hamburger.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
            
            // Focus management
            if (!isExpanded) {
                this.navMenu.querySelector('.nav-link')?.focus();
            }
        });

        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.hamburger.setAttribute('aria-expanded', 'false');
                this.hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu.classList.contains('active') && 
                !this.navMenu.contains(e.target) && 
                !this.hamburger.contains(e.target)) {
                
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
                this.hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;

        const handleScroll = Utils.throttle(() => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class for navbar styling
            if (currentScrollY > 100) {
                this.navbar?.classList.add('scrolled');
            } else {
                this.navbar?.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    setupKeyboardNavigation() {
        // Ensure keyboard navigation works for custom elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu?.classList.contains('active')) {
                this.navMenu.classList.remove('active');
                this.hamburger?.setAttribute('aria-expanded', 'false');
                this.hamburger?.classList.remove('active');
                this.hamburger?.focus();
            }
        });
    }
}

// Digital Wellness Assessment
class WellnessAssessment {
    constructor() {
        this.container = document.querySelector('.assessment-container');
        this.questions = document.querySelectorAll('.question-item');
        this.scoreDisplay = document.querySelector('.score-number');
        this.scoreInterpretation = document.querySelector('.score-interpretation');
        this.scoreRecommendations = document.querySelector('.score-recommendations');
        this.currentScore = 0;
        this.init();
    }

    init() {
        if (!this.container) return;
        this.setupRadioHandlers();
        this.loadSavedAssessment();
    }

    setupRadioHandlers() {
        const radioInputs = this.container.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
            radio.addEventListener('change', () => {
                this.calculateScore();
                this.saveAssessment();
            });
        });
    }

    calculateScore() {
        let totalScore = 0;
        let answeredQuestions = 0;

        for (let i = 1; i <= 5; i++) {
            const selectedRadio = this.container.querySelector(`input[name="q${i}"]:checked`);
            if (selectedRadio) {
                totalScore += parseInt(selectedRadio.value);
                answeredQuestions++;
            }
        }

        this.currentScore = totalScore;
        this.updateScoreDisplay();
        this.updateInterpretation(answeredQuestions);
    }

    updateScoreDisplay() {
        if (this.scoreDisplay) {
            this.scoreDisplay.textContent = this.currentScore;
            
            // Animate the score change
            this.scoreDisplay.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.scoreDisplay.style.transform = 'scale(1)';
            }, 200);
        }
    }

    updateInterpretation(answeredQuestions) {
        if (!this.scoreInterpretation || answeredQuestions === 0) return;

        let interpretation = '';
        let recommendations = [];

        if (this.currentScore >= 20) {
            interpretation = '🌟 Excellent digital wellness! You have strong, mindful technology habits.';
            recommendations = [
                'Keep up your excellent digital wellness practices',
                'Consider sharing your strategies with others',
                'Stay mindful of any changes in your habits'
            ];
        } else if (this.currentScore >= 15) {
            interpretation = '✅ Good digital wellness with room for improvement.';
            recommendations = [
                'Focus on areas where you scored lower',
                'Set specific goals for improvement',
                'Practice daily digital mindfulness check-ins'
            ];
        } else if (this.currentScore >= 10) {
            interpretation = '⚠️ Moderate digital wellness. Several areas need attention.';
            recommendations = [
                'Start with one specific area to improve',
                'Consider using screen time tracking tools',
                'Set boundaries around device-free times'
            ];
        } else {
            interpretation = '🔄 Your digital wellness needs significant attention.';
            recommendations = [
                'Begin with basic digital boundaries',
                'Consider seeking support or resources',
                'Start small with manageable changes'
            ];
        }

        this.scoreInterpretation.textContent = interpretation;
        
        if (this.scoreRecommendations) {
            this.scoreRecommendations.innerHTML = `
                <h5>Recommendations:</h5>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            `;
        }
    }

    saveAssessment() {
        const responses = {};
        for (let i = 1; i <= 5; i++) {
            const selectedRadio = this.container.querySelector(`input[name="q${i}"]:checked`);
            if (selectedRadio) {
                responses[`q${i}`] = selectedRadio.value;
            }
        }
        Utils.saveToLocalStorage('wellness_assessment', responses);
    }

    loadSavedAssessment() {
        const saved = Utils.loadFromLocalStorage('wellness_assessment', {});
        Object.entries(saved).forEach(([question, value]) => {
            const radio = this.container.querySelector(`input[name="${question}"][value="${value}"]`);
            if (radio) {
                radio.checked = true;
            }
        });
        this.calculateScore();
    }
}

// Screen Time Tracker
class ScreenTimeTracker {
    constructor() {
        this.container = document.querySelector('.tracker-container');
        this.inputs = {
            socialMedia: document.getElementById('social-media-time'),
            work: document.getElementById('work-time'),
            entertainment: document.getElementById('entertainment-time'),
            communication: document.getElementById('communication-time')
        };
        this.logButton = document.querySelector('.log-time-btn');
        this.totalDisplay = document.getElementById('total-screen-time');
        this.chart = document.getElementById('screen-time-chart');
        this.recommendationsList = document.querySelector('.recommendations-list');
        this.weeklyData = Utils.loadFromLocalStorage('screen_time_data', []);
        this.init();
    }

    init() {
        if (!this.container) return;
        this.setupEventListeners();
        this.updateVisualization();
        this.loadTodaysData();
    }

    setupEventListeners() {
        if (this.logButton) {
            this.logButton.addEventListener('click', () => this.logTodaysTime());
        }

        // Real-time total calculation
        Object.values(this.inputs).forEach(input => {
            if (input) {
                input.addEventListener('input', Utils.debounce(() => {
                    this.updateTotal();
                }, 300));
            }
        });
    }

    updateTotal() {
        const total = Object.values(this.inputs).reduce((sum, input) => {
            return sum + (parseFloat(input?.value || 0) || 0);
        }, 0);

        if (this.totalDisplay) {
            this.totalDisplay.textContent = Utils.formatTime(total);
        }

        this.generateRecommendations(total);
    }

    generateRecommendations(total) {
        if (!this.recommendationsList) return;

        const recommendations = [];
        
        if (total > 8) {
            recommendations.push('⚠️ Consider reducing overall screen time');
            recommendations.push('📱 Set app time limits');
            recommendations.push('🚶 Take regular breaks every hour');
        } else if (total > 6) {
            recommendations.push('⏰ Monitor usage patterns');
            recommendations.push('🌙 Avoid screens 1 hour before bed');
        } else if (total > 3) {
            recommendations.push('✅ Good balance maintained');
            recommendations.push('🧘 Practice mindful usage');
        } else {
            recommendations.push('💚 Excellent screen time management!');
        }

        // Check for social media heavy usage
        const socialMediaTime = parseFloat(this.inputs.socialMedia?.value || 0);
        if (socialMediaTime > 3) {
            recommendations.push('📲 High social media use detected - consider mindful consumption');
        }

        this.recommendationsList.innerHTML = recommendations
            .map(rec => `<div class="recommendation">${rec}</div>`)
            .join('');
    }

    logTodaysTime() {
        const today = new Date().toISOString().split('T')[0];
        const data = {
            date: today,
            socialMedia: parseFloat(this.inputs.socialMedia?.value || 0),
            work: parseFloat(this.inputs.work?.value || 0),
            entertainment: parseFloat(this.inputs.entertainment?.value || 0),
            communication: parseFloat(this.inputs.communication?.value || 0)
        };

        // Remove existing entry for today if it exists
        this.weeklyData = this.weeklyData.filter(entry => entry.date !== today);
        
        // Add new entry
        this.weeklyData.push(data);
        
        // Keep only last 7 days
        this.weeklyData = this.weeklyData.slice(-7);
        
        Utils.saveToLocalStorage('screen_time_data', this.weeklyData);
        this.updateVisualization();
        
        // Show success feedback
        this.showLogSuccess();
    }

    loadTodaysData() {
        const today = new Date().toISOString().split('T')[0];
        const todaysData = this.weeklyData.find(entry => entry.date === today);
        
        if (todaysData) {
            Object.entries(this.inputs).forEach(([key, input]) => {
                if (input && todaysData[key]) {
                    input.value = todaysData[key];
                }
            });
            this.updateTotal();
        }
    }

    updateVisualization() {
        if (!this.chart || this.weeklyData.length === 0) return;

        const ctx = this.chart.getContext('2d');
        const width = this.chart.width;
        const height = this.chart.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate max value for scaling
        const maxValue = Math.max(...this.weeklyData.map(day => 
            day.socialMedia + day.work + day.entertainment + day.communication
        ));

        if (maxValue === 0) return;

        // Draw bars
        const barWidth = width / this.weeklyData.length * 0.8;
        const spacing = width / this.weeklyData.length * 0.2;

        this.weeklyData.forEach((day, index) => {
            const x = index * (barWidth + spacing) + spacing / 2;
            const total = day.socialMedia + day.work + day.entertainment + day.communication;
            const barHeight = (total / maxValue) * (height - 40);

            // Stack the bars
            let currentY = height - 20;
            const categories = [
                { value: day.work, color: '#6366f1' },
                { value: day.socialMedia, color: '#10b981' },
                { value: day.entertainment, color: '#f59e0b' },
                { value: day.communication, color: '#ef4444' }
            ];

            categories.forEach(category => {
                if (category.value > 0) {
                    const segmentHeight = (category.value / maxValue) * (height - 40);
                    ctx.fillStyle = category.color;
                    ctx.fillRect(x, currentY - segmentHeight, barWidth, segmentHeight);
                    currentY -= segmentHeight;
                }
            });

            // Draw date label
            ctx.fillStyle = '#6b7280';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            const date = new Date(day.date);
            const dayLabel = date.toLocaleDateString('en', { weekday: 'short' });
            ctx.fillText(dayLabel, x + barWidth / 2, height - 5);
        });
    }

    showLogSuccess() {
        if (!this.logButton) return;
        
        const originalText = this.logButton.textContent;
        this.logButton.textContent = '✓ Logged!';
        this.logButton.style.background = '#22c55e';
        
        setTimeout(() => {
            this.logButton.textContent = originalText;
            this.logButton.style.background = '';
        }, 2000);
    }
}

// Mindfulness Exercise Controller
class MindfulnessController {
    constructor() {
        this.exerciseContainer = document.querySelector('.exercises-container');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.exercisePanels = document.querySelectorAll('.exercise-panel');
        this.exerciseButtons = document.querySelectorAll('.try-exercise-btn');
        this.activeExercise = null;
        this.init();
    }

    init() {
        if (!this.exerciseContainer) return;
        this.setupTabNavigation();
        this.setupExerciseButtons();
    }

    setupTabNavigation() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(targetTab) {
        // Update button states
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === targetTab);
        });

        // Update panel visibility
        this.exercisePanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === `${targetTab}-panel`);
        });
    }

    setupExerciseButtons() {
        this.exerciseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const exerciseType = button.getAttribute('data-exercise');
                this.startGuidedExercise(exerciseType);
            });
        });
    }

    startGuidedExercise(type) {
        // Stop any active exercise
        if (this.activeExercise) {
            this.stopExercise();
        }

        const exercises = {
            'transition': this.createTransitionExercise(),
            'body-scan': this.createBodyScanExercise(),
            'consumption': this.createConsumptionExercise(),
            'disconnect': this.createDisconnectExercise()
        };

        if (exercises[type]) {
            this.activeExercise = exercises[type];
            this.showExerciseModal(this.activeExercise);
        }
    }

    createTransitionExercise() {
        return {
            title: 'Mindful Device Transition',
            steps: [
                { text: 'Take three deep breaths', duration: 10000 },
                { text: 'Notice how you\'re feeling right now', duration: 8000 },
                { text: 'Set a clear intention for this device use', duration: 10000 },
                { text: 'Check if this aligns with your well-being', duration: 8000 },
                { text: 'Proceed mindfully or choose differently', duration: 5000 }
            ]
        };
    }

    createBodyScanExercise() {
        return {
            title: 'Digital Body Scan',
            steps: [
                { text: 'Pause your current activity', duration: 5000 },
                { text: 'Notice your posture and breathing', duration: 8000 },
                { text: 'Scan for tension in your neck and shoulders', duration: 10000 },
                { text: 'Check your eyes - are they strained?', duration: 8000 },
                { text: 'Adjust your position or take a break if needed', duration: 7000 }
            ]
        };
    }

    createConsumptionExercise() {
        return {
            title: 'Mindful Content Consumption',
            steps: [
                { text: 'Set an intention before opening social media', duration: 8000 },
                { text: 'Notice your emotional response to content', duration: 10000 },
                { text: 'Ask: "Is this serving my well-being?"', duration: 8000 },
                { text: 'Choose to engage mindfully or scroll past', duration: 8000 },
                { text: 'End when you\'ve achieved your intention', duration: 6000 }
            ]
        };
    }

    createDisconnectExercise() {
        return {
            title: 'Mindful Disconnection',
            steps: [
                { text: 'Notice any urge to continue using the device', duration: 8000 },
                { text: 'Acknowledge resistance without judgment', duration: 8000 },
                { text: 'Take three conscious breaths', duration: 10000 },
                { text: 'Appreciate what you accomplished', duration: 7000 },
                { text: 'Transition mindfully to your next activity', duration: 7000 }
            ]
        };
    }

    showExerciseModal(exercise) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'exercise-modal';
        modal.innerHTML = `
            <div class="exercise-modal-content">
                <div class="exercise-header">
                    <h3>${exercise.title}</h3>
                    <button class="close-exercise" aria-label="Close exercise">×</button>
                </div>
                <div class="exercise-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="step-counter">Step <span class="current-step">1</span> of ${exercise.steps.length}</div>
                </div>
                <div class="exercise-content">
                    <div class="exercise-instruction"></div>
                    <div class="exercise-timer">
                        <div class="timer-circle">
                            <span class="timer-text">00:00</span>
                        </div>
                    </div>
                </div>
                <div class="exercise-controls">
                    <button class="pause-btn">Pause</button>
                    <button class="skip-btn">Skip Step</button>
                </div>
            </div>
        `;

        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        document.body.appendChild(modal);
        this.runExercise(modal, exercise);

        // Close button
        modal.querySelector('.close-exercise').addEventListener('click', () => {
            this.stopExercise();
            document.body.removeChild(modal);
        });
    }

    runExercise(modal, exercise) {
        let currentStep = 0;
        let isPaused = false;
        let timer;

        const progressFill = modal.querySelector('.progress-fill');
        const stepCounter = modal.querySelector('.current-step');
        const instruction = modal.querySelector('.exercise-instruction');
        const timerText = modal.querySelector('.timer-text');
        const pauseBtn = modal.querySelector('.pause-btn');
        const skipBtn = modal.querySelector('.skip-btn');

        const runStep = () => {
            if (currentStep >= exercise.steps.length) {
                this.completeExercise(modal);
                return;
            }

            const step = exercise.steps[currentStep];
            instruction.textContent = step.text;
            stepCounter.textContent = currentStep + 1;

            let timeLeft = step.duration;
            const startTime = Date.now();

            const updateTimer = () => {
                if (isPaused) return;

                const elapsed = Date.now() - startTime;
                timeLeft = Math.max(0, step.duration - elapsed);
                
                const seconds = Math.ceil(timeLeft / 1000);
                const minutes = Math.floor(seconds / 60);
                const displaySeconds = seconds % 60;
                timerText.textContent = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;

                const progress = ((currentStep + 1 - timeLeft / step.duration) / exercise.steps.length) * 100;
                progressFill.style.width = `${progress}%`;

                if (timeLeft > 0) {
                    timer = setTimeout(updateTimer, 100);
                } else {
                    currentStep++;
                    setTimeout(runStep, 1000);
                }
            };

            updateTimer();
        };

        // Control buttons
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
        });

        skipBtn.addEventListener('click', () => {
            clearTimeout(timer);
            currentStep++;
            runStep();
        });

        runStep();
    }

    completeExercise(modal) {
        modal.querySelector('.exercise-content').innerHTML = `
            <div class="exercise-complete">
                <div class="complete-icon">✨</div>
                <h3>Exercise Complete!</h3>
                <p>Take a moment to notice how you feel after this mindful practice.</p>
                <button class="close-exercise final-close">Close</button>
            </div>
        `;

        modal.querySelector('.final-close').addEventListener('click', () => {
            this.stopExercise();
            document.body.removeChild(modal);
        });

        // Auto-close after 10 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                this.stopExercise();
                document.body.removeChild(modal);
            }
        }, 10000);
    }

    stopExercise() {
        this.activeExercise = null;
    }
}

// Daily Check-in System
class DailyCheckIn {
    constructor() {
        this.morningCard = document.querySelector('.check-in-card.morning');
        this.middayCard = document.querySelector('.check-in-card.midday');
        this.eveningCard = document.querySelector('.check-in-card.evening');
        this.todayKey = new Date().toISOString().split('T')[0];
        this.checkInData = Utils.loadFromLocalStorage('daily_checkin', {});
        this.init();
    }

    init() {
        if (!this.morningCard) return;
        this.setupMorningCheckin();
        this.setupMiddayCheckin();
        this.setupEveningCheckin();
        this.loadTodaysData();
    }

    setupMorningCheckin() {
        const textarea = this.morningCard.querySelector('textarea');
        const saveBtn = this.morningCard.querySelector('.save-intention-btn');

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const intention = textarea?.value || '';
                this.saveCheckInData('morning', { intention });
                this.showSaveSuccess(saveBtn);
            });
        }
    }

    setupMiddayCheckin() {
        const moodButtons = this.middayCard.querySelectorAll('.mood-btn');
        const textarea = this.middayCard.querySelector('textarea');

        moodButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                moodButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const mood = btn.getAttribute('data-mood');
                const notes = textarea?.value || '';
                this.saveCheckInData('midday', { mood, notes });
            });
        });
    }

    setupEveningCheckin() {
        const inputs = this.eveningCard.querySelectorAll('input');
        const saveBtn = this.eveningCard.querySelector('.save-reflection-btn');

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const reflection = {};
                inputs.forEach((input, index) => {
                    reflection[index === 0 ? 'wentWell' : 'toAdjust'] = input.value;
                });
                this.saveCheckInData('evening', reflection);
                this.showSaveSuccess(saveBtn);
            });
        }
    }

    saveCheckInData(period, data) {
        if (!this.checkInData[this.todayKey]) {
            this.checkInData[this.todayKey] = {};
        }
        
        this.checkInData[this.todayKey][period] = {
            ...data,
            timestamp: new Date().toISOString()
        };

        Utils.saveToLocalStorage('daily_checkin', this.checkInData);
    }

    loadTodaysData() {
        const todaysData = this.checkInData[this.todayKey];
        if (!todaysData) return;

        // Load morning data
        if (todaysData.morning?.intention) {
            const textarea = this.morningCard.querySelector('textarea');
            if (textarea) textarea.value = todaysData.morning.intention;
        }

        // Load midday data
        if (todaysData.midday?.mood) {
            const moodBtn = this.middayCard.querySelector(`[data-mood="${todaysData.midday.mood}"]`);
            if (moodBtn) moodBtn.classList.add('active');
        }
        if (todaysData.midday?.notes) {
            const textarea = this.middayCard.querySelector('textarea');
            if (textarea) textarea.value = todaysData.midday.notes;
        }

        // Load evening data
        if (todaysData.evening) {
            const inputs = this.eveningCard.querySelectorAll('input');
            if (inputs[0] && todaysData.evening.wentWell) {
                inputs[0].value = todaysData.evening.wentWell;
            }
            if (inputs[1] && todaysData.evening.toAdjust) {
                inputs[1].value = todaysData.evening.toAdjust;
            }
        }
    }

    showSaveSuccess(button) {
        const originalText = button.textContent;
        button.textContent = '✓ Saved!';
        button.style.background = '#22c55e';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }
}

// Wellness Meter Controller
class WellnessMeterController {
    constructor() {
        this.meterElement = document.querySelector('.wellness-meter');
        this.meterValue = document.querySelector('.meter-value');
        this.factors = document.querySelectorAll('.factor');
        this.wellnessScore = 75; // Default score
        this.init();
    }

    init() {
        if (!this.meterElement) return;
        this.setupFactorInteractions();
        this.calculateWellnessScore();
        this.animateMeter();
    }

    setupFactorInteractions() {
        this.factors.forEach(factor => {
            factor.addEventListener('click', () => this.showFactorInfo(factor));
            factor.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showFactorInfo(factor);
                }
            });
        });
    }

    showFactorInfo(factor) {
        const factorType = factor.classList[1]; // sleep, focus, mood, connection
        const info = this.getFactorInfo(factorType);
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'factor-tooltip';
        tooltip.innerHTML = `
            <h4>${info.title}</h4>
            <p>${info.description}</p>
            <div class="tips">
                <strong>Quick Tips:</strong>
                <ul>
                    ${info.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;

        // Position and show tooltip
        document.body.appendChild(tooltip);
        this.positionTooltip(tooltip, factor);

        // Remove tooltip after delay or on click
        setTimeout(() => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        }, 5000);

        document.addEventListener('click', function removeTooltip() {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
            document.removeEventListener('click', removeTooltip);
        });
    }

    getFactorInfo(type) {
        const factorData = {
            sleep: {
                title: 'Sleep Quality',
                description: 'Quality sleep is crucial for mental health, emotional regulation, and cognitive function.',
                tips: [
                    'Avoid screens 1-2 hours before bed',
                    'Keep devices out of the bedroom',
                    'Use blue light filters in evening'
                ]
            },
            focus: {
                title: 'Focus & Attention',
                description: 'Digital multitasking can fragment attention and reduce productivity.',
                tips: [
                    'Practice single-tasking',
                    'Use focus apps and timers',
                    'Take regular breaks from screens'
                ]
            },
            mood: {
                title: 'Mood & Emotions',
                description: 'Social media and digital interactions can significantly impact emotional well-being.',
                tips: [
                    'Curate positive content feeds',
                    'Limit comparison-inducing platforms',
                    'Practice digital gratitude'
                ]
            },
            connection: {
                title: 'Social Connection',
                description: 'Quality relationships are essential for mental health and life satisfaction.',
                tips: [
                    'Prioritize face-to-face interactions',
                    'Use technology to enhance real relationships',
                    'Join communities aligned with your values'
                ]
            }
        };
        return factorData[type];
    }

    positionTooltip(tooltip, factor) {
        const rect = factor.getBoundingClientRect();
        tooltip.style.cssText = `
            position: fixed;
            top: ${rect.bottom + 10}px;
            left: ${rect.left + rect.width / 2}px;
            transform: translateX(-50%);
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 300px;
            font-size: 0.875rem;
        `;
    }

    calculateWellnessScore() {
        // This could be enhanced to calculate based on user data
        // For now, we'll use assessment data if available
        const assessmentData = Utils.loadFromLocalStorage('wellness_assessment', {});
        const checkInData = Utils.loadFromLocalStorage('daily_checkin', {});
        
        let score = 75; // Base score
        
        // Adjust based on assessment if available
        if (Object.keys(assessmentData).length > 0) {
            const assessmentScore = Object.values(assessmentData).reduce((sum, val) => sum + parseInt(val), 0);
            score = (assessmentScore / 25) * 100;
        }
        
        this.updateMeterValue(Math.round(score));
    }

    updateMeterValue(score) {
        this.wellnessScore = score;
        if (this.meterValue) {
            this.meterValue.textContent = `${score}%`;
        }
    }

    animateMeter() {
        if (!this.meterElement) return;
        
        // Subtle floating animation for factors
        this.factors.forEach((factor, index) => {
            factor.style.animation = `float ${2 + index * 0.3}s ease-in-out infinite alternate`;
        });
    }
}

// Main Application Controller
class DigitalWellbeingApp {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all components
            this.components.animation = new AnimationController();
            this.components.navigation = new NavigationController();
            this.components.assessment = new WellnessAssessment();
            this.components.screenTime = new ScreenTimeTracker();
            this.components.mindfulness = new MindfulnessController();
            this.components.checkIn = new DailyCheckIn();
            this.components.wellnessMeter = new WellnessMeterController();

            this.setupGlobalEventListeners();
            this.isInitialized = true;

            console.log('Digital Wellbeing App initialized successfully');
        } catch (error) {
            console.error('Error initializing Digital Wellbeing App:', error);
        }
    }

    setupGlobalEventListeners() {
        // Handle window resize
        window.addEventListener('resize', Utils.debounce(() => {
            if (this.components.screenTime) {
                this.components.screenTime.updateVisualization();
            }
        }, 300));

        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // User switched away from tab
                this.trackTabSwitch('away');
            } else {
                // User returned to tab
                this.trackTabSwitch('return');
            }
        });

        // Error handling
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            // Could send to analytics or show user-friendly message
        });
    }

    trackTabSwitch(direction) {
        // This could be used for mindfulness features
        const timestamp = new Date().toISOString();
        const tabSwitchData = Utils.loadFromLocalStorage('tab_switches', []);
        
        tabSwitchData.push({
            direction,
            timestamp,
            url: window.location.href
        });

        // Keep only last 50 switches
        Utils.saveToLocalStorage('tab_switches', tabSwitchData.slice(-50));
    }

    // Public API methods
    getWellnessScore() {
        return this.components.wellnessMeter?.wellnessScore || 0;
    }

    exportUserData() {
        return {
            assessment: Utils.loadFromLocalStorage('wellness_assessment', {}),
            screenTime: Utils.loadFromLocalStorage('screen_time_data', []),
            checkIns: Utils.loadFromLocalStorage('daily_checkin', {}),
            tabSwitches: Utils.loadFromLocalStorage('tab_switches', [])
        };
    }

    clearUserData() {
        const keys = ['wellness_assessment', 'screen_time_data', 'daily_checkin', 'tab_switches'];
        keys.forEach(key => localStorage.removeItem(key));
        
        // Reinitialize components
        this.initializeComponents();
    }
}

// CSS Animations (to be added dynamically)
const additionalStyles = `
@keyframes float {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-10px); }
}

.factor-tooltip {
    animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px) translateX(-50%);
    }
    to {
        opacity: 1;
        transform: translateY(0) translateX(-50%);
    }
}

.exercise-modal-content {
    background: var(--bg-white);
    color: var(--text-primary);
    border-radius: 1rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    animation: modalSlideIn 0.3s ease;
    border: 1px solid var(--border-light);
}

.exercise-header {
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-light);
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
}

.exercise-header h3 {
    color: var(--text-primary);
    margin: 0;
}

.close-exercise {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.close-exercise:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.exercise-content {
    color: var(--text-primary);
}

.exercise-instruction {
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.exercise-controls button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 0 0.5rem;
}

.exercise-controls button:hover {
    background: var(--primary-dark);
}

.step-counter {
    color: var(--text-secondary);
}

.timer-text {
    color: var(--text-primary);
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.exercise-complete {
    text-align: center;
    padding: 2rem;
}

.complete-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: bounce 0.6s ease;
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0, 0, 0);
    }
    40%, 43% {
        transform: translate3d(0, -30px, 0);
    }
    70% {
        transform: translate3d(0, -15px, 0);
    }
    90% {
        transform: translate3d(0, -4px, 0);
    }
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application
const app = new DigitalWellbeingApp();

// Export for potential external use
window.DigitalWellbeingApp = app;

console.log('Digital Self & Mental Well-being JavaScript fully loaded and initialized!');
