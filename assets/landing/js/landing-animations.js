// Digital Self - Poolside-Inspired Animations
// Updated for new modular text block system and enhanced visualizations

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModularTextBlocks();
    initializeDigitalIdentityVisualization();
    initializeScrollAnimations();
    initializeSectionCards();
    initializeFloatingOrbs();
    initializeSmoothScrolling();
    initializeScrollProgress();
    
    // Delay some animations for better UX
    setTimeout(() => {
        initializeEnhancedInteractions();
    }, 1000);
});

// Enhanced Navigation with new color scheme
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

    // Enhanced navbar background on scroll with new color scheme
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 28, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 15, 28, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        }
    });
}

// Modular Text Block Animations - Updated for new system
function initializeModularTextBlocks() {
    const textBlocks = document.querySelectorAll('.text-block');
    
    textBlocks.forEach((block, index) => {
        // Initial state - hidden for entrance animation
        block.style.opacity = '0';
        block.style.transform = 'translateY(40px) scale(0.95)';
        
        // Staggered entrance animation
        setTimeout(() => {
            block.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            block.style.opacity = '1';
            block.style.transform = 'translateY(0) scale(1)';
        }, index * 150 + 300); // Start after 300ms, stagger by 150ms

        // Enhanced hover effects based on block type
        block.addEventListener('mouseenter', () => {
            const blockType = Array.from(block.classList).find(cls => 
                ['primary-large', 'secondary-large', 'accent-block', 'small-block', 
                 'quote-emphasis', 'highlight-gradient', 'description-block', 'cta-block'].includes(cls)
            );
            
            switch(blockType) {
                case 'primary-large':
                case 'secondary-large':
                    block.style.transform = 'translateY(-10px) scale(1.03)';
                    block.style.filter = 'brightness(1.1)';
                    break;
                case 'accent-block':
                    block.style.transform = 'translateY(-8px) scale(1.05) rotate(2deg)';
                    break;
                case 'highlight-gradient':
                    block.style.transform = 'translateY(-12px) scale(1.08)';
                    block.style.filter = 'saturate(1.3) brightness(1.2)';
                    break;
                case 'cta-block':
                    block.style.transform = 'translateY(-15px) scale(1.1)';
                    const arrow = block.querySelector('.arrow');
                    if (arrow) arrow.style.transform = 'translateX(5px)';
                    break;
                default:
                    block.style.transform = 'translateY(-6px) scale(1.02)';
            }
            
            // Add glow effect
            block.style.boxShadow = '0 20px 60px rgba(79, 70, 229, 0.3)';
        });
        
        block.addEventListener('mouseleave', () => {
            block.style.transform = 'translateY(0) scale(1)';
            block.style.filter = '';
            block.style.boxShadow = '';
            
            // Reset arrow
            const arrow = block.querySelector('.arrow');
            if (arrow) arrow.style.transform = '';
        });

        // Click animation for interactive blocks
        if (block.classList.contains('cta-block')) {
            block.addEventListener('click', () => {
                block.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    block.style.transform = '';
                    // Scroll to sections
                    document.querySelector('.sections-container').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 150);
            });
        }
    });
}

// Enhanced Digital Identity Visualization
function initializeDigitalIdentityVisualization() {
    const centerAvatar = document.querySelector('.center-avatar');
    const identityLayers = document.querySelectorAll('.identity-layers .layer');
    const dataNodes = document.querySelectorAll('.data-node');
    const orbits = document.querySelectorAll('.orbit');
    const connectionPaths = document.querySelectorAll('.connection-path');
    
    if (!centerAvatar) return;

    // Continuous avatar core pulse
    function pulseAvatarCore() {
        const avatarCore = document.querySelector('.avatar-core');
        if (avatarCore) {
            avatarCore.style.transform = 'scale(1.1)';
            avatarCore.style.boxShadow = '0 0 40px rgba(79, 70, 229, 0.8)';
            
            setTimeout(() => {
                avatarCore.style.transform = 'scale(1)';
                avatarCore.style.boxShadow = '0 0 20px rgba(79, 70, 229, 0.4)';
            }, 1000);
        }
    }
    
    // Start pulsing immediately and repeat
    pulseAvatarCore();
    setInterval(pulseAvatarCore, 3000);

    // Identity layers rotation animation
    identityLayers.forEach((layer, index) => {
        const rotationSpeed = (index + 1) * 20; // Different speeds for each layer
        let rotation = 0;
        
        function rotateLayer() {
            rotation += 0.5;
            layer.style.transform = `rotate(${rotation + (index * 120)}deg)`;
        }
        
        setInterval(rotateLayer, rotationSpeed);
        
        // Layer hover effects
        layer.addEventListener('mouseenter', () => {
            layer.style.transform += ' scale(1.1)';
            layer.style.opacity = '0.9';
        });
        
        layer.addEventListener('mouseleave', () => {
            layer.style.opacity = '';
        });
    });

    // Orbit animations
    orbits.forEach((orbit, index) => {
        let orbitRotation = 0;
        const orbitSpeed = index === 0 ? 30 : 25; // Different speeds for inner/outer orbit
        
        function rotateOrbit() {
            orbitRotation += 0.3;
            orbit.style.transform = `rotate(${orbitRotation}deg)`;
        }
        
        setInterval(rotateOrbit, orbitSpeed);
    });

    // Data node interactions and animations
    dataNodes.forEach((node, index) => {
        // Staggered entrance
        node.style.opacity = '0';
        node.style.transform = 'scale(0)';
        
        setTimeout(() => {
            node.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, 1000 + (index * 200));

        // Enhanced hover effects
        node.addEventListener('mouseenter', () => {
            node.style.transform = 'scale(1.8)';
            node.style.boxShadow = '0 0 30px rgba(79, 70, 229, 0.8)';
            node.style.zIndex = '10';
            
            // Show tooltip based on node type
            showNodeTooltip(node);
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.transform = 'scale(1)';
            node.style.boxShadow = '';
            node.style.zIndex = '';
            hideNodeTooltip();
        });

        // Random pulse animation
        setTimeout(() => {
            setInterval(() => {
                if (!node.matches(':hover')) {
                    node.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        node.style.transform = 'scale(1)';
                    }, 300);
                }
            }, 6000 + (index * 800));
        }, index * 200);
    });

    // Connection lines animation
    if (connectionPaths.length > 0) {
        connectionPaths.forEach((path, index) => {
            const pathLength = path.getTotalLength();
            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;
            
            setTimeout(() => {
                path.style.transition = 'stroke-dashoffset 2s ease-in-out';
                path.style.strokeDashoffset = 0;
            }, 1500 + (index * 300));
        });
    }
}

// Tooltip system for data nodes
function showNodeTooltip(node) {
    const nodeType = Array.from(node.classList).find(cls => 
        ['social', 'privacy', 'ethics', 'wellbeing', 'identity', 'connection'].includes(cls)
    );
    
    const tooltips = {
        social: 'Social Media Interaction',
        privacy: 'Data Privacy & Security',
        ethics: 'Digital Ethics',
        wellbeing: 'Mental Well-being',
        identity: 'Digital Identity',
        connection: 'Online Connections'
    };
    
    if (nodeType && tooltips[nodeType]) {
        let tooltip = document.querySelector('.node-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'node-tooltip';
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(10, 15, 28, 0.95);
                color: #ffffff;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                border: 1px solid rgba(79, 70, 229, 0.3);
                backdrop-filter: blur(10px);
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(tooltip);
        }
        
        tooltip.textContent = tooltips[nodeType];
        tooltip.style.opacity = '1';
        
        const rect = node.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    }
}

function hideNodeTooltip() {
    const tooltip = document.querySelector('.node-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
    }
}

// Enhanced Scroll Animations with Intersection Observer
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-card, .about-text-blocks, .quote-layout, .content-block');
    
    const observerOptions = {
        threshold: 0.15,
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
        element.style.transform = 'translateY(60px)';
        element.style.transition = `all 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(element);
    });

    // Parallax effect for floating orbs
    const floatingOrbs = document.querySelectorAll('.floating-orb');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        floatingOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Enhanced Section Cards with improved interactions
function initializeSectionCards() {
    const sectionCards = document.querySelectorAll('.section-card');
    
    sectionCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 30px 80px rgba(79, 70, 229, 0.25)';
            
            // Animate card icon
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotateY(15deg)';
            }
            
            // Animate pattern
            const pattern = card.querySelector('.card-pattern');
            if (pattern) {
                pattern.style.transform = 'scale(1.1) rotate(5deg)';
                pattern.style.opacity = '0.8';
            }
            
            // Animate tags
            const tags = card.querySelectorAll('.tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.opacity = '1';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = '';
            }
            
            const pattern = card.querySelector('.card-pattern');
            if (pattern) {
                pattern.style.transform = '';
                pattern.style.opacity = '';
            }
            
            const tags = card.querySelectorAll('.tag');
            tags.forEach(tag => {
                tag.style.transform = '';
                tag.style.opacity = '';
            });
        });

        // Click animation with ripple effect
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(79, 70, 229, 0.3);
                transform: scale(0);
                animation: ripple 0.8s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(ripple);
            
            // Scale animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
                ripple.remove();
            }, 150);
        });
    });
}

// Floating Orbs Animation System
function initializeFloatingOrbs() {
    const orbs = document.querySelectorAll('.floating-orb');
    
    orbs.forEach((orb, index) => {
        // Initial animation delay
        orb.style.animationDelay = `${index * 2}s`;
        
        // Random floating movement
        function floatOrb() {
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = (Math.random() - 0.5) * 50;
            const randomRotation = Math.random() * 360;
            
            orb.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
            orb.style.transition = 'transform 8s ease-in-out';
        }
        
        // Start floating animation
        setTimeout(() => {
            floatOrb();
            setInterval(floatOrb, 8000);
        }, index * 1000);
        
        // Mouse interaction
        orb.addEventListener('mouseenter', () => {
            orb.style.transform += ' scale(1.2)';
            orb.style.filter = 'brightness(1.3)';
        });
        
        orb.addEventListener('mouseleave', () => {
            orb.style.filter = '';
        });
    });
}

// Smooth scrolling for navigation links
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

// Scroll Progress Indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899);
        z-index: 1001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(79, 70, 229, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}

// Enhanced Interactive Features
function initializeEnhancedInteractions() {
    // Cursor follower effect for desktop
    if (window.innerWidth > 768) {
        initializeCursorFollower();
    }
    
    // Keyboard navigation improvements
    initializeKeyboardNavigation();
    
    // Performance optimizations
    initializePerformanceOptimizations();
}

// Advanced cursor follower
function initializeCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(79, 70, 229, 0.8), rgba(124, 58, 237, 0.6));
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = (cursorX - 10) + 'px';
        cursor.style.top = (cursorY - 10) + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Interactive elements scaling
    const interactiveElements = document.querySelectorAll('a, button, .text-block, .section-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'radial-gradient(circle, rgba(236, 72, 153, 0.8), rgba(124, 58, 237, 0.6))';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(79, 70, 229, 0.8), rgba(124, 58, 237, 0.6))';
        });
    });
}

// Keyboard navigation enhancements
function initializeKeyboardNavigation() {
    // Focus management for cards
    const cards = document.querySelectorAll('.section-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Focus visible styles
    const focusableElements = document.querySelectorAll('a, button, [tabindex="0"]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #4f46e5';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
            scrollTimeout = null;
        }, 16); // ~60fps
    }, { passive: true });
    
    // Lazy load animations for sections not in view
    const expensiveAnimations = document.querySelectorAll('.data-node, .floating-orb');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });
    
    expensiveAnimations.forEach(element => {
        animationObserver.observe(element);
    });
}

// Dynamic CSS animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .animate-in {
        animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(60px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .floating-orb {
        animation: float 6s ease-in-out infinite;
    }
    
    .floating-orb:nth-child(2) {
        animation-delay: 2s;
    }
    
    .floating-orb:nth-child(3) {
        animation-delay: 4s;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .floating-orb,
        .data-node,
        .text-block {
            animation: none !important;
            transition: none !important;
        }
    }
`;
document.head.appendChild(dynamicStyles);