// Section 2 - Social Media & Online Identity Animations
// Enhanced with social media-specific interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initMobileNavigation();
    initScrollAnimations();
    initFeedSimulation();
    initValidationCycle();
    initRealityComparison();
    initBurnoutTracker();
    initSmoothScrolling();
    initBackgroundEffects();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('validation-cycle')) {
                    animateValidationCycle(entry.target);
                }
                
                if (entry.target.classList.contains('reality-vs-highlights')) {
                    animateRealityComparison(entry.target);
                }
                
                if (entry.target.classList.contains('effects-grid')) {
                    animateEffectsGrid(entry.target);
                }
                
                if (entry.target.classList.contains('symptoms-grid')) {
                    animateSymptomsGrid(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.topic-section, .validation-cycle, .reality-vs-highlights, .effects-grid, .symptoms-grid, .reframe-strategies, .detox-strategies').forEach(el => {
        observer.observe(el);
    });
}

// Feed Simulation Animation
function initFeedSimulation() {
    const feedPosts = document.querySelector('.feed-posts');
    
    if (feedPosts) {
        const samplePosts = [
            {
                user: 'J',
                username: '@jenny_lifestyle',
                content: '✨ Perfect morning routine! Coffee, meditation, and ready to crush this day! #MorningVibes',
                likes: '127',
                comments: '23'
            },
            {
                user: 'M',
                username: '@mike_fitness',
                content: '💪 Just finished an amazing workout! Nothing beats that endorphin rush! #FitnessMotivation',
                likes: '89',
                comments: '15'
            },
            {
                user: 'S',
                username: '@sarah_travels',
                content: '🌴 Paradise found! This view never gets old... #Blessed #VacationMode',
                likes: '203',
                comments: '41'
            },
            {
                user: 'A',
                username: '@alex_foodie',
                content: '🍝 Homemade pasta from scratch! Took 3 hours but totally worth it! #Cooking',
                likes: '156',
                comments: '28'
            },
            {
                user: 'R',
                username: '@rachel_student',
                content: '📚 Finally submitted my thesis! 2 years of hard work paid off! #Graduation',
                likes: '341',
                comments: '67'
            }
        ];
        
        let currentPostIndex = 0;
        
        function addNewPost() {
            if (currentPostIndex < samplePosts.length) {
                const post = samplePosts[currentPostIndex];
                const postElement = createPostElement(post);
                
                feedPosts.insertBefore(postElement, feedPosts.firstChild);
                
                // Remove old posts if there are too many
                if (feedPosts.children.length > 3) {
                    feedPosts.removeChild(feedPosts.lastChild);
                }
                
                currentPostIndex = (currentPostIndex + 1) % samplePosts.length;
            }
        }
        
        function createPostElement(post) {
            const postDiv = document.createElement('div');
            postDiv.className = 'feed-post';
            postDiv.innerHTML = `
                <div class="post-user">
                    <div class="user-avatar">${post.user}</div>
                    <span class="username">${post.username}</span>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-engagement">
                    <div class="engagement-item">
                        <span>❤️</span>
                        <span>${post.likes}</span>
                    </div>
                    <div class="engagement-item">
                        <span>💬</span>
                        <span>${post.comments}</span>
                    </div>
                    <div class="engagement-item">
                        <span>📤</span>
                        <span>Share</span>
                    </div>
                </div>
            `;
            return postDiv;
        }
        
        // Add initial posts
        samplePosts.slice(0, 3).forEach(post => {
            const postElement = createPostElement(post);
            feedPosts.appendChild(postElement);
        });
        
        // Simulate new posts appearing
        setInterval(addNewPost, 4000);
    }
}

// Validation Cycle Animation
function initValidationCycle() {
    const cycleSteps = document.querySelectorAll('.cycle-step');
    
    cycleSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            // Highlight the cycle flow
            highlightCycleFlow(index);
        });
        
        step.addEventListener('mouseleave', function() {
            resetCycleFlow();
        });
    });
}

function animateValidationCycle(container) {
    const steps = container.querySelectorAll('.cycle-step');
    const arrows = container.querySelectorAll('.cycle-arrow');
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.animation = 'cycleStepReveal 0.6s ease-out forwards';
        }, index * 200);
    });
    
    arrows.forEach((arrow, index) => {
        setTimeout(() => {
            arrow.style.animation = 'arrowPulse 1s ease-in-out infinite';
        }, (index + 1) * 200);
    });
}

function highlightCycleFlow(activeIndex) {
    const steps = document.querySelectorAll('.cycle-step');
    const arrows = document.querySelectorAll('.cycle-arrow');
    
    steps.forEach((step, index) => {
        if (index === activeIndex) {
            step.style.transform = 'scale(1.05)';
            step.style.borderColor = 'var(--validation-color)';
            step.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.3)';
        } else {
            step.style.opacity = '0.6';
        }
    });
    
    // Highlight relevant arrows
    if (activeIndex < arrows.length) {
        arrows[activeIndex].style.color = 'var(--validation-color)';
        arrows[activeIndex].style.transform = 'scale(1.2)';
    }
}

function resetCycleFlow() {
    const steps = document.querySelectorAll('.cycle-step');
    const arrows = document.querySelectorAll('.cycle-arrow');
    
    steps.forEach(step => {
        step.style.transform = '';
        step.style.borderColor = '';
        step.style.boxShadow = '';
        step.style.opacity = '';
    });
    
    arrows.forEach(arrow => {
        arrow.style.color = '';
        arrow.style.transform = '';
    });
}

// Reality vs Highlights Comparison
function initRealityComparison() {
    const realityItems = document.querySelectorAll('.moment');
    const highlightItems = document.querySelectorAll('.post');
    
    // Add hover effects to show the contrast
    realityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            highlightItems.forEach(highlight => {
                highlight.style.opacity = '0.3';
            });
        });
        
        item.addEventListener('mouseleave', function() {
            highlightItems.forEach(highlight => {
                highlight.style.opacity = '';
            });
        });
    });
    
    highlightItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            realityItems.forEach(reality => {
                reality.style.opacity = '0.3';
            });
        });
        
        item.addEventListener('mouseleave', function() {
            realityItems.forEach(reality => {
                reality.style.opacity = '';
            });
        });
    });
}

function animateRealityComparison(container) {
    const realityItems = container.querySelectorAll('.moment');
    const highlightItems = container.querySelectorAll('.post');
    
    realityItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'slideInLeft 0.6s ease-out forwards';
        }, index * 100);
    });
    
    highlightItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'slideInRight 0.6s ease-out forwards';
        }, index * 100 + 300);
    });
}

// Effects Grid Animation
function animateEffectsGrid(container) {
    const cards = container.querySelectorAll('.effect-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'cardReveal 0.6s ease-out forwards';
            
            // Add a subtle shake animation for negative effects
            if (card.classList.contains('negative')) {
                setTimeout(() => {
                    card.style.animation += ', warningShake 0.5s ease-in-out';
                }, 600);
            }
        }, index * 150);
    });
}

// Symptoms Grid Animation
function animateSymptomsGrid(container) {
    const categories = container.querySelectorAll('.symptom-category');
    
    categories.forEach((category, index) => {
        setTimeout(() => {
            category.style.animation = 'slideInUp 0.6s ease-out forwards';
            
            // Animate list items
            const listItems = category.querySelectorAll('li');
            listItems.forEach((item, itemIndex) => {
                setTimeout(() => {
                    item.style.animation = 'listItemReveal 0.4s ease-out forwards';
                }, itemIndex * 100 + 300);
            });
        }, index * 200);
    });
}

// Burnout Tracker (Interactive Feature)
function initBurnoutTracker() {
    const symptoms = document.querySelectorAll('.symptom-category li');
    let checkedCount = 0;
    
    symptoms.forEach(symptom => {
        symptom.style.cursor = 'pointer';
        symptom.addEventListener('click', function() {
            if (this.classList.contains('checked')) {
                this.classList.remove('checked');
                this.style.backgroundColor = '';
                this.style.color = '';
                checkedCount--;
            } else {
                this.classList.add('checked');
                this.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                this.style.color = 'var(--burnout-color)';
                checkedCount++;
            }
            
            updateBurnoutLevel(checkedCount);
        });
    });
}

function updateBurnoutLevel(count) {
    // Create or update burnout level indicator
    let indicator = document.querySelector('.burnout-level-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'burnout-level-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 12px;
            padding: 1rem;
            backdrop-filter: blur(20px);
            z-index: 100;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(indicator);
    }
    
    let level = '';
    let color = '';
    
    if (count === 0) {
        level = 'No symptoms';
        color = 'var(--strategy-color)';
    } else if (count <= 3) {
        level = 'Mild concern';
        color = 'var(--validation-color)';
    } else if (count <= 6) {
        level = 'Moderate risk';
        color = 'var(--comparison-color)';
    } else {
        level = 'High risk';
        color = 'var(--burnout-color)';
    }
    
    indicator.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Burnout Level</div>
            <div style="font-weight: 600; color: ${color};">${level}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">${count} symptoms</div>
        </div>
    `;
    
    if (count === 0) {
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 3000);
    }
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Background Effects
function initBackgroundEffects() {
    // Create floating particles for social media theme
    createSocialMediaParticles();
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', handleParallax);
}

function createSocialMediaParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'social-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    const socialIcons = ['❤️', '👍', '💬', '📱', '📸', '🔔', '⭐', '🔄'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = socialIcons[Math.floor(Math.random() * socialIcons.length)];
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// CSS Animations (injected dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes cycleStepReveal {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes arrowPulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes cardReveal {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes warningShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }
    
    @keyframes listItemReveal {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    .mobile-nav-active .nav-menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--bg-primary);
        border-top: 1px solid var(--border-subtle);
        padding: 2rem;
        gap: 1rem;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;

document.head.appendChild(style);
