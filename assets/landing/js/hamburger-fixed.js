// Simplified and Fixed Hamburger Menu Implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Fixed hamburger menu script loaded');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        console.log('✅ Hamburger and menu found');
        
        // Add click event listener
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎯 Hamburger clicked');
            
            // Toggle active state
            const isActive = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', !isActive);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'auto' : 'hidden';
            
            console.log('Menu state changed:', !isActive ? 'open' : 'closed');
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
                console.log('Menu closed via nav link');
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
                console.log('Menu closed via outside click');
            }
        });
        
        // Close menu with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
                hamburger.focus();
                console.log('Menu closed via escape key');
            }
        });
        
        console.log('✅ All hamburger menu events attached successfully');
        
    } else {
        console.error('❌ Hamburger or nav menu not found');
        console.log('Hamburger:', hamburger);
        console.log('Nav menu:', navMenu);
    }
});
