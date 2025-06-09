// Simple hamburger menu debug test
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Debug script loaded!');
    
    // Visual indicator
    const indicator = document.createElement('div');
    indicator.textContent = 'DEBUG: Script Running';
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: green;
        color: white;
        padding: 10px;
        z-index: 99999;
        font-size: 12px;
        border-radius: 4px;
    `;
    document.body.appendChild(indicator);
    
    // Find hamburger
    const hamburger = document.querySelector('.hamburger');
    console.log('Hamburger element:', hamburger);
    
    if (hamburger) {
        // Make hamburger very visible
        hamburger.style.backgroundColor = 'red';
        hamburger.style.border = '3px solid yellow';
        hamburger.style.padding = '15px';
        
        console.log('✅ Hamburger found and highlighted');
        
        // Add click listener
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            alert('🎉 HAMBURGER CLICKED! The button is working!');
            console.log('🎯 Click event successful!');
            
            // Toggle menu
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                console.log('Menu toggled');
            }
        });
        
        console.log('✅ Click listener added');
        
        // Update indicator
        indicator.textContent = 'DEBUG: Hamburger Ready!';
        indicator.style.backgroundColor = 'blue';
        
    } else {
        console.error('❌ Hamburger not found');
        indicator.textContent = 'DEBUG: Hamburger NOT FOUND';
        indicator.style.backgroundColor = 'red';
        
        // Try alternative selectors
        const altSelectors = [
            'button.hamburger',
            '.hamburger-btn',
            '[aria-label*="menu"]',
            '[aria-label*="Menu"]',
            '.nav-toggle'
        ];
        
        altSelectors.forEach(selector => {
            const element = document.querySelector(selector);
            console.log(`Trying ${selector}:`, element);
        });
    }
    
    // Remove indicator after 5 seconds
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.remove();
        }
    }, 5000);
});
