/**
 * Dynamic Gradient Effects for Section 3
 * Handles scroll-based gradient transitions and mouse tracking
 */

class GradientEffects {
    constructor() {
        this.scrollProgress = 0;
        this.mousePosition = { x: 50, y: 50 };
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.rafId = null;
        
        this.init();
    }

    init() {
        if (this.isReducedMotion) return;
        
        this.setupEventListeners();
        this.updateGradientOnScroll();
    }

    setupEventListeners() {
        // Track mouse movement for gradient effects
        const handleMouseMove = (e) => {
            this.mousePosition.x = (e.clientX / window.innerWidth) * 100;
            this.mousePosition.y = (e.clientY / window.innerHeight) * 100;
            
            document.documentElement.style.setProperty('--mouse-x', `${this.mousePosition.x}%`);
            document.documentElement.style.setProperty('--mouse-y', `${this.mousePosition.y}%`);
        };

        // Track scroll for gradient progression
        const handleScroll = () => {
            if (this.rafId) return;
            
            this.rafId = requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                this.scrollProgress = Math.min(scrollTop / docHeight, 1);
                
                this.updateGradientOnScroll();
                this.rafId = null;
            });
        };

        // Throttled mouse movement
        document.addEventListener('mousemove', this.throttle(handleMouseMove, 16));
        window.addEventListener('scroll', handleScroll);
    }

    updateGradientOnScroll() {
        const progress = this.scrollProgress;
        
        // Define gradient stops for different scroll positions
        const gradientStops = [
            { 
                pos: 0, 
                colors: ['#0a0f1c', '#1a1f2e', '#2a1f3e', '#1a2f4e', '#0a1f2c'],
                accent: 'rgba(139, 92, 246, 0.1)'
            },
            { 
                pos: 0.25, 
                colors: ['#1a0f2c', '#2a1f3e', '#3a2f4e', '#2a3f5e', '#1a2f3c'],
                accent: 'rgba(79, 70, 229, 0.12)'
            },
            { 
                pos: 0.5, 
                colors: ['#2a1f3c', '#3a2f4e', '#4a3f5e', '#3a4f6e', '#2a3f4c'],
                accent: 'rgba(16, 185, 129, 0.1)'
            },
            { 
                pos: 0.75, 
                colors: ['#3a2f4c', '#4a3f5e', '#5a4f6e', '#4a5f7e', '#3a4f5c'],
                accent: 'rgba(245, 158, 11, 0.08)'
            },
            { 
                pos: 1, 
                colors: ['#4a3f5c', '#5a4f6e', '#6a5f7e', '#5a6f8e', '#4a5f6c'],
                accent: 'rgba(239, 68, 68, 0.08)'
            }
        ];

        // Interpolate between gradient stops
        const currentStop = this.interpolateGradientStop(gradientStops, progress);
        
        // Update CSS custom properties for gradient animation
        this.updateGradientProperties(currentStop, progress);
        
        // Update section-specific overlays
        this.updateSectionOverlays(progress);
    }

    interpolateGradientStop(stops, progress) {
        // Find the two stops to interpolate between
        let start = stops[0];
        let end = stops[stops.length - 1];
        
        for (let i = 0; i < stops.length - 1; i++) {
            if (progress >= stops[i].pos && progress <= stops[i + 1].pos) {
                start = stops[i];
                end = stops[i + 1];
                break;
            }
        }
        
        const localProgress = start.pos === end.pos ? 0 : 
            (progress - start.pos) / (end.pos - start.pos);
        
        // Interpolate colors
        const interpolatedColors = start.colors.map((startColor, index) => {
            return this.interpolateColor(startColor, end.colors[index], localProgress);
        });
        
        return {
            colors: interpolatedColors,
            accent: this.interpolateColor(start.accent, end.accent, localProgress)
        };
    }    updateGradientProperties(gradientStop, progress) {
        // Reduce the aggressive gradient changes - use more subtle transitions
        const angle = 45 + (progress * 15); // Reduce rotation from 45deg to 15deg
        const size = 350 + (progress * 50); // Reduce size change from 100% to 50%
        
        // Create the main gradient
        const mainGradient = `linear-gradient(
            ${angle}deg,
            ${gradientStop.colors[0]} 0%,
            ${gradientStop.colors[1]} 25%,
            ${gradientStop.colors[2]} 50%,
            ${gradientStop.colors[3]} 75%,
            ${gradientStop.colors[4]} 100%
        )`;
        
        // Update CSS custom properties with more subtle changes
        document.documentElement.style.setProperty('--scroll-progress', progress * 0.5); // Reduce impact
        document.documentElement.style.setProperty('--gradient-angle', `${angle}deg`);
        document.documentElement.style.setProperty('--gradient-size', `${size}%`);
        
        // Update the body gradient directly
        const bodyElement = document.body;
        if (bodyElement && bodyElement.querySelector) {
            // Update the pseudo-element background via CSS custom property
            bodyElement.style.setProperty('--dynamic-gradient', mainGradient);
        }
    }    updateSectionOverlays(progress) {
        const sections = document.querySelectorAll('.topic-section');
        
        sections.forEach((section, index) => {
            const sectionStart = index / sections.length;
            const sectionEnd = (index + 1) / sections.length;
            
            // Calculate section-specific progress
            let sectionProgress = 0;
            if (progress >= sectionStart && progress <= sectionEnd) {
                sectionProgress = (progress - sectionStart) / (sectionEnd - sectionStart);
            } else if (progress > sectionEnd) {
                sectionProgress = 1;
            }
            
            // Apply section-specific styling with reduced intensity
            const intensity = 0.02 + (sectionProgress * 0.05); // Reduced from 0.05 + 0.15
            const hue = 240 + (index * 30); // Reduced color variation
            const saturation = 30 + (sectionProgress * 10); // Reduced saturation changes
            
            section.style.setProperty(
                '--section-gradient-overlay', 
                `radial-gradient(
                    ellipse at ${this.mousePosition.x}% ${this.mousePosition.y}%, 
                    hsla(${hue}, ${saturation}%, 60%, ${intensity}) 0%, 
                    transparent 70%
                )`
            );
        });
    }

    interpolateColor(color1, color2, factor) {
        // Handle rgba/hsla color interpolation
        if (color1.includes('rgba') || color1.includes('hsla')) {
            return this.interpolateColorString(color1, color2, factor);
        }
        
        // Handle hex colors
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);
        
        if (!rgb1 || !rgb2) return color1;
        
        const r = Math.round(rgb1.r + factor * (rgb2.r - rgb1.r));
        const g = Math.round(rgb1.g + factor * (rgb2.g - rgb1.g));
        const b = Math.round(rgb1.b + factor * (rgb2.b - rgb1.b));
        
        return this.rgbToHex(r, g, b);
    }

    interpolateColorString(color1, color2, factor) {
        // Simple interpolation for rgba strings
        const rgba1 = color1.match(/[\d.]+/g);
        const rgba2 = color2.match(/[\d.]+/g);
        
        if (!rgba1 || !rgba2 || rgba1.length < 4 || rgba2.length < 4) {
            return color1;
        }
        
        const r = Math.round(parseFloat(rgba1[0]) + factor * (parseFloat(rgba2[0]) - parseFloat(rgba1[0])));
        const g = Math.round(parseFloat(rgba1[1]) + factor * (parseFloat(rgba2[1]) - parseFloat(rgba1[1])));
        const b = Math.round(parseFloat(rgba1[2]) + factor * (parseFloat(rgba2[2]) - parseFloat(rgba1[2])));
        const a = parseFloat(rgba1[3]) + factor * (parseFloat(rgba2[3]) - parseFloat(rgba1[3]));
        
        return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

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
        }
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        // Remove event listeners if needed
    }
}

// Initialize gradient effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GradientEffects();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GradientEffects();
    });
} else {
    new GradientEffects();
}
