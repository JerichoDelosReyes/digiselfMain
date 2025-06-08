// Section 3 - Digital Ethics, Privacy & Security Interactive Animations
// Following the Poolside aesthetic with security-focused interactions

class DigitalEthicsAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupDataVisualization();
        this.setupPrivacyTools();
        this.setupSecurityThreats();
        this.setupActionTracker();
        this.setupEthicalDilemmas();
        this.setupFloatingElements();
        this.setupCursorFollower();
    }

    // Navigation functionality
    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for nav links
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

        // Active nav link highlighting
        this.updateActiveNavLink();
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }

    updateActiveNavLink() {
        const sections = ['ethics', 'privacy', 'security', 'responsibility'];
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (section && navLink) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Scroll-based animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations based on element class
                    if (entry.target.classList.contains('principle-card')) {
                        this.animatePrincipleCard(entry.target);
                    } else if (entry.target.classList.contains('threat-card')) {
                        this.animateThreatCard(entry.target);
                    } else if (entry.target.classList.contains('tool-category')) {
                        this.animateToolCategory(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.principle-card, .threat-card, .tool-category, .dilemma-card, .action-category').forEach(el => {
            observer.observe(el);
        });
    }

    // Data collection visualization
    setupDataVisualization() {
        const dataVisualization = document.querySelector('.data-visualization');
        if (!dataVisualization) return;

        const collectors = document.querySelectorAll('.collector');
        const dataBrokers = document.querySelector('.data-brokers');
        
        // Animate data flow
        this.animateDataFlow(collectors, dataBrokers);
        
        // Interactive collector hover effects
        collectors.forEach(collector => {
            collector.addEventListener('mouseenter', () => {
                this.highlightDataFlow(collector);
            });
            
            collector.addEventListener('mouseleave', () => {
                this.resetDataFlow();
            });
        });
    }

    animateDataFlow(collectors, dataBrokers) {
        // Create animated data particles
        collectors.forEach((collector, index) => {
            setTimeout(() => {
                this.createDataParticle(collector, dataBrokers);
            }, index * 500);
        });
        
        // Repeat animation every 5 seconds
        setInterval(() => {
            collectors.forEach((collector, index) => {
                setTimeout(() => {
                    this.createDataParticle(collector, dataBrokers);
                }, index * 500);
            });
        }, 5000);
    }

    createDataParticle(source, target) {
        const particle = document.createElement('div');
        particle.className = 'data-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
        `;
        
        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const container = source.closest('.data-visualization');
        
        particle.style.left = sourceRect.left - container.getBoundingClientRect().left + 'px';
        particle.style.top = sourceRect.top - container.getBoundingClientRect().top + 'px';
        
        container.appendChild(particle);
        
        // Animate to target
        setTimeout(() => {
            particle.style.transition = 'all 1s ease';
            particle.style.left = targetRect.left - container.getBoundingClientRect().left + 'px';
            particle.style.top = targetRect.top - container.getBoundingClientRect().top + 'px';
            particle.style.opacity = '0';
        }, 100);
        
        // Remove particle
        setTimeout(() => {
            particle.remove();
        }, 1200);
    }

    highlightDataFlow(collector) {
        const collectorType = collector.className.split(' ')[1];
        collector.style.transform = 'scale(1.05)';
        collector.style.boxShadow = '0 10px 30px rgba(79, 70, 229, 0.3)';
        
        // Highlight data types
        const dataTypes = collector.querySelector('.data-types');
        if (dataTypes) {
            dataTypes.style.opacity = '1';
            dataTypes.style.transform = 'translateY(0)';
        }
    }

    resetDataFlow() {
        document.querySelectorAll('.collector').forEach(collector => {
            collector.style.transform = 'scale(1)';
            collector.style.boxShadow = '';
            
            const dataTypes = collector.querySelector('.data-types');
            if (dataTypes) {
                dataTypes.style.opacity = '0.7';
                dataTypes.style.transform = 'translateY(10px)';
            }
        });
    }

    // Privacy tools interaction
    setupPrivacyTools() {
        const tools = document.querySelectorAll('.tool');
        
        tools.forEach(tool => {
            tool.addEventListener('click', () => {
                this.showToolDetails(tool);
            });
            
            tool.addEventListener('mouseenter', () => {
                this.highlightTool(tool);
            });
            
            tool.addEventListener('mouseleave', () => {
                this.resetTool(tool);
            });
        });
    }

    showToolDetails(tool) {
        // Create modal or expanded view for tool details
        const toolName = tool.querySelector('.tool-name').textContent;
        const toolDesc = tool.querySelector('.tool-description').textContent;
        const effectiveness = tool.querySelector('.tool-effectiveness').textContent;
        
        // Add detailed information animation
        tool.classList.add('tool-expanded');
        
        // Create details popup
        const details = document.createElement('div');
        details.className = 'tool-details-popup';
        details.innerHTML = `
            <div class="tool-popup-content">
                <h4>${toolName}</h4>
                <p>${toolDesc}</p>
                <div class="effectiveness-badge ${effectiveness.toLowerCase().replace(' ', '-')}">${effectiveness}</div>
                <button class="close-popup">×</button>
            </div>
        `;
        
        document.body.appendChild(details);
        
        // Close popup functionality
        details.querySelector('.close-popup').addEventListener('click', () => {
            details.remove();
            tool.classList.remove('tool-expanded');
        });
        
        // Close on outside click
        details.addEventListener('click', (e) => {
            if (e.target === details) {
                details.remove();
                tool.classList.remove('tool-expanded');
            }
        });
    }

    highlightTool(tool) {
        tool.style.transform = 'translateY(-5px)';
        tool.style.boxShadow = '0 15px 40px rgba(79, 70, 229, 0.2)';
        
        const effectiveness = tool.querySelector('.tool-effectiveness');
        if (effectiveness) {
            effectiveness.style.opacity = '1';
            effectiveness.style.transform = 'scale(1.1)';
        }
    }

    resetTool(tool) {
        tool.style.transform = 'translateY(0)';
        tool.style.boxShadow = '';
        
        const effectiveness = tool.querySelector('.tool-effectiveness');
        if (effectiveness) {
            effectiveness.style.opacity = '0.8';
            effectiveness.style.transform = 'scale(1)';
        }
    }

    // Security threats analysis
    setupSecurityThreats() {
        const threatCards = document.querySelectorAll('.threat-card');
        
        threatCards.forEach(card => {
            this.setupThreatInteraction(card);
        });
        
        // Threat level visualization
        this.animateThreatLevels();
    }

    setupThreatInteraction(card) {
        const threatLevel = card.querySelector('.threat-level');
        const protectionTips = card.querySelector('.protection-tips');
        
        card.addEventListener('click', () => {
            card.classList.toggle('threat-expanded');
            
            if (card.classList.contains('threat-expanded')) {
                this.showProtectionTips(protectionTips);
            } else {
                this.hideProtectionTips(protectionTips);
            }
        });
        
        // Threat level pulse animation
        if (threatLevel) {
            setInterval(() => {
                threatLevel.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    threatLevel.style.transform = 'scale(1)';
                }, 200);
            }, 3000);
        }
    }

    showProtectionTips(tipsElement) {
        if (tipsElement) {
            tipsElement.style.maxHeight = '200px';
            tipsElement.style.opacity = '1';
            tipsElement.style.marginTop = '1rem';
        }
    }

    hideProtectionTips(tipsElement) {
        if (tipsElement) {
            tipsElement.style.maxHeight = '0';
            tipsElement.style.opacity = '0';
            tipsElement.style.marginTop = '0';
        }
    }

    animateThreatLevels() {
        const threatLevels = document.querySelectorAll('.threat-level');
        
        threatLevels.forEach(level => {
            const levelText = level.textContent.toLowerCase();
            let color, intensity;
            
            switch(levelText) {
                case 'high risk':
                    color = 'var(--threat-high)';
                    intensity = 0.8;
                    break;
                case 'medium risk':
                    color = 'var(--threat-medium)';
                    intensity = 0.6;
                    break;
                case 'low risk':
                    color = 'var(--threat-low)';
                    intensity = 0.4;
                    break;
                default:
                    color = 'var(--accent-primary)';
                    intensity = 0.5;
            }
            
            level.style.background = color;
            level.style.boxShadow = `0 0 20px ${color}${Math.round(intensity * 255).toString(16)}`;
        });
    }

    // Digital citizenship action tracker
    setupActionTracker() {
        const actionItems = document.querySelectorAll('.action-item input[type="checkbox"]');
        const progressFill = document.querySelector('.progress-fill');
        const completedActions = document.querySelector('.completed-actions');
        const progressMessage = document.querySelector('.progress-message');
        const totalActions = actionItems.length;
        
        actionItems.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateProgress(actionItems, progressFill, completedActions, progressMessage, totalActions);
                this.animateActionComplete(checkbox);
            });
        });
        
        // Initialize progress
        this.updateProgress(actionItems, progressFill, completedActions, progressMessage, totalActions);
    }

    updateProgress(actionItems, progressFill, completedActions, progressMessage, totalActions) {
        const completed = Array.from(actionItems).filter(item => item.checked).length;
        const percentage = (completed / totalActions) * 100;
        
        // Update progress bar
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
            progressFill.style.background = this.getProgressColor(percentage);
        }
        
        // Update counter
        if (completedActions) {
            completedActions.textContent = completed;
        }
        
        // Update message
        if (progressMessage) {
            progressMessage.textContent = this.getProgressMessage(percentage);
        }
        
        // Animate milestone achievements
        if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
            this.celebrateMilestone(percentage);
        }
    }

    getProgressColor(percentage) {
        if (percentage >= 100) return 'var(--responsibility-color)';
        if (percentage >= 75) return 'var(--privacy-color)';
        if (percentage >= 50) return 'var(--ethics-color)';
        if (percentage >= 25) return 'var(--security-color)';
        return 'var(--accent-primary)';
    }

    getProgressMessage(percentage) {
        if (percentage >= 100) return '🎉 Excellent! You\'re a responsible digital citizen!';
        if (percentage >= 75) return '🌟 Great progress! Almost there!';
        if (percentage >= 50) return '💪 Good work! Keep building your digital citizenship!';
        if (percentage >= 25) return '👍 Nice start! Continue taking action!';
        return 'Start taking action to become a responsible digital citizen!';
    }

    animateActionComplete(checkbox) {
        const actionItem = checkbox.closest('.action-item');
        if (checkbox.checked) {
            actionItem.classList.add('completed');
            
            // Create completion effect
            const effect = document.createElement('div');
            effect.className = 'completion-effect';
            effect.innerHTML = '✓';
            actionItem.appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 1000);
        } else {
            actionItem.classList.remove('completed');
        }
    }

    celebrateMilestone(percentage) {
        // Create celebration particles
        const celebration = document.createElement('div');
        celebration.className = 'milestone-celebration';
        celebration.innerHTML = `
            <div class="celebration-text">
                ${percentage}% Complete! 🎉
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Create floating particles
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createCelebrationParticle();
            }, i * 100);
        }
        
        setTimeout(() => {
            celebration.remove();
        }, 3000);
    }

    createCelebrationParticle() {
        const particle = document.createElement('div');
        particle.className = 'celebration-particle';
        particle.innerHTML = ['🎉', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
        
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            font-size: ${Math.random() * 20 + 20}px;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 3s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }

    // Ethical dilemmas scenarios
    setupEthicalDilemmas() {
        const dilemmaCards = document.querySelectorAll('.dilemma-card');
        
        dilemmaCards.forEach(card => {
            const scenarios = card.querySelectorAll('.scenario');
            const options = card.querySelectorAll('.dilemma-options .option');
            
            options.forEach(option => {
                option.addEventListener('click', () => {
                    this.selectDilemmaOption(card, option);
                });
            });
        });
    }

    selectDilemmaOption(card, selectedOption) {
        const options = card.querySelectorAll('.option');
        
        // Remove previous selections
        options.forEach(option => option.classList.remove('selected'));
        
        // Select current option
        selectedOption.classList.add('selected');
        
        // Show feedback
        this.showDilemmaFeedback(card, selectedOption);
    }

    showDilemmaFeedback(card, option) {
        const existingFeedback = card.querySelector('.dilemma-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        const feedback = document.createElement('div');
        feedback.className = 'dilemma-feedback';
        feedback.innerHTML = this.getDilemmaFeedback(option);
        
        card.appendChild(feedback);
        
        // Animate feedback appearance
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        }, 100);
    }

    getDilemmaFeedback(option) {
        const optionText = option.textContent.toLowerCase();
        
        // Provide contextual feedback based on the ethical choice
        if (optionText.includes('accept') || optionText.includes('agree')) {
            return `
                <div class="feedback-content warning">
                    <h5>⚠️ Consider the implications</h5>
                    <p>While this might seem convenient, consider the long-term privacy and ethical implications of this choice.</p>
                </div>
            `;
        } else if (optionText.includes('decline') || optionText.includes('refuse')) {
            return `
                <div class="feedback-content positive">
                    <h5>✅ Ethical choice</h5>
                    <p>This choice prioritizes ethical considerations and long-term digital wellbeing over short-term convenience.</p>
                </div>
            `;
        } else {
            return `
                <div class="feedback-content neutral">
                    <h5>🤔 Balanced approach</h5>
                    <p>This represents a measured approach that balances various ethical considerations.</p>
                </div>
            `;
        }
    }

    // Floating elements animation
    setupFloatingElements() {
        this.createFloatingOrbs();
        this.createSecurityShield();
    }

    createFloatingOrbs() {
        const orbCount = 5;
        
        for (let i = 0; i < orbCount; i++) {
            const orb = document.createElement('div');
            orb.className = 'floating-orb security-orb';
            orb.style.cssText = `
                position: fixed;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                animation: floatSecurity ${Math.random() * 10 + 15}s infinite ease-in-out;
            `;
            
            document.body.appendChild(orb);
        }
    }

    createSecurityShield() {
        const shield = document.createElement('div');
        shield.className = 'security-shield';
        shield.innerHTML = '🛡️';
        shield.style.cssText = `
            position: fixed;
            font-size: 60px;
            opacity: 0.1;
            pointer-events: none;
            z-index: 1;
            right: 10%;
            top: 50%;
            transform: translateY(-50%);
            animation: shieldPulse 4s infinite ease-in-out;
        `;
        
        document.body.appendChild(shield);
    }

    // Cursor follower
    setupCursorFollower() {
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        follower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--accent-primary), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        `;
        
        document.body.appendChild(follower);
        
        document.addEventListener('mousemove', (e) => {
            follower.style.left = e.clientX - 10 + 'px';
            follower.style.top = e.clientY - 10 + 'px';
        });
        
        // Hide cursor follower on interactive elements
        document.querySelectorAll('button, a, input, .tool, .threat-card, .action-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'scale(2)';
                follower.style.opacity = '0.5';
            });
            
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'scale(1)';
                follower.style.opacity = '1';
            });
        });
    }

    // Animation helper methods
    animatePrincipleCard(card) {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        
        const icon = card.querySelector('.principle-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 600);
            }, 300);
        }
    }

    animateThreatCard(card) {
        card.style.transform = 'translateX(0)';
        card.style.opacity = '1';
        
        const threatLevel = card.querySelector('.threat-level');
        if (threatLevel) {
            setTimeout(() => {
                threatLevel.style.transform = 'scale(1.1)';
                threatLevel.style.boxShadow = '0 0 20px currentColor';
                setTimeout(() => {
                    threatLevel.style.transform = 'scale(1)';
                    threatLevel.style.boxShadow = '0 0 10px currentColor';
                }, 300);
            }, 400);
        }
    }

    animateToolCategory(category) {
        category.style.transform = 'translateY(0)';
        category.style.opacity = '1';
        
        const tools = category.querySelectorAll('.tool');
        tools.forEach((tool, index) => {
            setTimeout(() => {
                tool.style.transform = 'translateY(0)';
                tool.style.opacity = '1';
            }, index * 100);
        });
    }
}

// CSS animations (to be added to the CSS file)
const additionalCSS = `
@keyframes floatSecurity {
    0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
    25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
    50% { transform: translateY(-10px) translateX(-10px) rotate(180deg); }
    75% { transform: translateY(-30px) translateX(5px) rotate(270deg); }
}

@keyframes shieldPulse {
    0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.1; }
    50% { transform: translateY(-50%) scale(1.1); opacity: 0.2; }
}

@keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
}

.animate-in {
    animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.tool-details-popup {
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
    animation: fadeIn 0.3s ease;
}

.tool-popup-content {
    background: var(--bg-card);
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    position: relative;
    border: 1px solid var(--border-subtle);
}

.close-popup {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
}

.action-item.completed label {
    text-decoration: line-through;
    opacity: 0.7;
}

.completion-effect {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--responsibility-color);
    color: white;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    animation: completionPop 0.5s ease;
}

@keyframes completionPop {
    0% { transform: translateY(-50%) scale(0); }
    50% { transform: translateY(-50%) scale(1.2); }
    100% { transform: translateY(-50%) scale(1); }
}

.milestone-celebration {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-card);
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid var(--responsibility-color);
    z-index: 10000;
    animation: celebrationBounce 0.6s ease;
}

@keyframes celebrationBounce {
    0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
    40% { transform: translate(-50%, -50%) translateY(-10px); }
    60% { transform: translate(-50%, -50%) translateY(-5px); }
}

.dilemma-feedback {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
}

.feedback-content.positive {
    background: rgba(16, 185, 129, 0.1);
    border-left: 4px solid var(--responsibility-color);
}

.feedback-content.warning {
    background: rgba(239, 68, 68, 0.1);
    border-left: 4px solid var(--security-color);
}

.feedback-content.neutral {
    background: rgba(79, 70, 229, 0.1);
    border-left: 4px solid var(--accent-primary);
}

.threat-expanded .protection-tips {
    max-height: 200px;
    opacity: 1;
    margin-top: 1rem;
    transition: all 0.3s ease;
}

.protection-tips {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
    overflow: hidden;
    transition: all 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize the animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DigitalEthicsAnimations();
});

// Export for potential external use
window.DigitalEthicsAnimations = DigitalEthicsAnimations;
