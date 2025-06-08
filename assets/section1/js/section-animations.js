// Section 1 - Understanding Digital Self Animations
// Enhanced interactions for identity visualization and content

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeIdentityModel();
    initializeScrollAnimations();
    initializeDimensionVisuals();
    initializeTheoryCards();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Enhanced navbar background on scroll
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

// Identity Model Interactive Visualization
function initializeIdentityModel() {
    const identityCircles = document.querySelectorAll('.identity-circle');
    const identityCenter = document.querySelector('.identity-center');
    
    if (!identityCircles.length) return;

    identityCircles.forEach(circle => {        circle.addEventListener('mouseenter', () => {
            // Highlight the hovered circle
            circle.style.transform = circle.classList.contains('real-self') 
                ? 'translateX(-50%) scale(1.15)' 
                : 'scale(1.15)';
            circle.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
            circle.style.zIndex = '10';
            
            // Dim other circles
            identityCircles.forEach(otherCircle => {
                if (otherCircle !== circle) {
                    otherCircle.style.opacity = '0.5';
                }
            });
              // Pulse the center
            if (identityCenter) {
                identityCenter.style.transform = 'translate(-50%, -50%) scale(1.1)';
                identityCenter.style.boxShadow = '0 0 30px rgba(79, 70, 229, 0.6)';
            }
            
            // Show tooltip
            showIdentityTooltip(circle);
        });
          circle.addEventListener('mouseleave', () => {
            // Reset transformations
            circle.style.transform = circle.classList.contains('real-self') 
                ? 'translateX(-50%) scale(1)' 
                : 'scale(1)';
            circle.style.boxShadow = '';
            circle.style.zIndex = '';
            
            // Restore opacity
            identityCircles.forEach(otherCircle => {
                otherCircle.style.opacity = '1';
            });
              // Reset center
            if (identityCenter) {
                identityCenter.style.transform = 'translate(-50%, -50%) scale(1)';
                identityCenter.style.boxShadow = '';
            }
            
            hideIdentityTooltip();
        });
        
        // Click to scroll to relevant section
        circle.addEventListener('click', () => {
            const targetId = circle.classList.contains('real-self') ? 'real-self' :
                            circle.classList.contains('ideal-self') ? 'ideal-self' :
                            'online-self';
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Continuous gentle rotation animation for the model
    let rotation = 0;
    function rotateModel() {
        rotation += 0.2;
        const model = document.querySelector('.identity-model');
        if (model && !model.matches(':hover')) {
            model.style.transform = `rotate(${rotation}deg)`;
        }
    }
    setInterval(rotateModel, 100);
}

// Tooltip system for identity circles
function showIdentityTooltip(circle) {
    const tooltips = {
        'real-self': 'Your authentic core identity and genuine personality',
        'ideal-self': 'Who you aspire to become and your personal goals',
        'online-self': 'How you present yourself in digital spaces'
    };
    
    const circleType = Array.from(circle.classList).find(cls => tooltips[cls]);
    if (!circleType) return;
    
    let tooltip = document.querySelector('.identity-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'identity-tooltip';
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(10, 15, 28, 0.95);
            color: #ffffff;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            max-width: 200px;
            text-align: center;
            pointer-events: none;
            z-index: 1000;
            border: 1px solid rgba(79, 70, 229, 0.3);
            backdrop-filter: blur(10px);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(tooltip);
    }
    
    tooltip.textContent = tooltips[circleType];
    tooltip.style.opacity = '1';
    
    const rect = circle.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 15) + 'px';
}

function hideIdentityTooltip() {
    const tooltip = document.querySelector('.identity-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
    }
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.overview-content, .breakdown-item, .dimension-block, .theory-card, .insight-card'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Dimension Visual Interactions
function initializeDimensionVisuals() {
    // Real Self - Trait orbits interaction
    const traits = document.querySelectorAll('.trait');
    traits.forEach(trait => {
        trait.addEventListener('mouseenter', () => {
            trait.style.transform += ' scale(1.2)';
            trait.style.boxShadow = '0 5px 20px rgba(16, 185, 129, 0.4)';
        });
        
        trait.addEventListener('mouseleave', () => {
            trait.style.transform = trait.style.transform.replace(' scale(1.2)', '');
            trait.style.boxShadow = '';
        });
    });
    
    // Ideal Self - Pyramid levels interaction
    const pyramidLevels = document.querySelectorAll('.pyramid-level, .pyramid-base');
    pyramidLevels.forEach((level, index) => {
        level.addEventListener('mouseenter', () => {
            level.style.transform = 'scale(1.05)';
            level.style.backgroundColor = 'rgba(139, 92, 246, 0.3)';
        });
        
        level.addEventListener('mouseleave', () => {
            level.style.transform = 'scale(1)';
            level.style.backgroundColor = '';
        });
    });
    
    // Online Self - Platform nodes interaction
    const platformNodes = document.querySelectorAll('.platform-node');
    platformNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            node.style.transform += ' scale(1.3)';
            node.style.boxShadow = '0 5px 20px rgba(59, 130, 246, 0.5)';
            node.style.zIndex = '10';
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.transform = node.style.transform.replace(' scale(1.3)', '');
            node.style.boxShadow = '';
            node.style.zIndex = '';
        });
    });
}

// Theory Cards Enhanced Interactions
function initializeTheoryCards() {
    const theoryCards = document.querySelectorAll('.theory-card');
    
    theoryCards.forEach(card => {
        const points = card.querySelectorAll('.point');
        
        card.addEventListener('mouseenter', () => {
            // Animate theory points sequentially
            points.forEach((point, index) => {
                setTimeout(() => {
                    point.style.transform = 'translateX(10px)';
                    point.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
                    point.style.borderLeftColor = '#7c3aed';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            points.forEach(point => {
                point.style.transform = '';
                point.style.backgroundColor = '';
                point.style.borderLeftColor = '';
            });
        });
    });
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add dynamic CSS animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .animate-in {
        animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .trait {
        animation: float 3s ease-in-out infinite;
    }
    
    .trait:nth-child(2) { animation-delay: 0.5s; }
    .trait:nth-child(3) { animation-delay: 1s; }
    .trait:nth-child(4) { animation-delay: 1.5s; }
    
    .platform-node {
        animation: pulse 4s ease-in-out infinite;
    }
    
    .platform-node:nth-child(2) { animation-delay: 0.8s; }
    .platform-node:nth-child(3) { animation-delay: 1.6s; }
    .platform-node:nth-child(4) { animation-delay: 2.4s; }
    .platform-node:nth-child(5) { animation-delay: 3.2s; }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .trait,
        .platform-node,
        .identity-circle {
            animation: none !important;
        }
    }
`;
document.head.appendChild(dynamicStyles);
