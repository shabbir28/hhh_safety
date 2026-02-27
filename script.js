// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initGallery();
    initForm();
    initBackToTop();
    initStatsCounter();
    initVideoThumbnails();
    initScrollSpy();
    initYearUpdate();
    initWhatsAppTracking();
    initAnimations();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuBtn || !navMenu) return;
    
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gallery image click handler
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption')?.innerText || 'HHH Safety';
            
            if (img) {
                // Create lightbox
                createLightbox(img.src, caption);
            }
        });
    });
}

// Create lightbox for gallery images
function createLightbox(imgSrc, caption) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 80%;
        border-radius: 5px;
        box-shadow: 0 0 30px rgba(0,0,0,0.5);
    `;
    
    const captionEl = document.createElement('div');
    captionEl.innerText = caption;
    captionEl.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 0;
        right: 0;
        text-align: center;
        color: white;
        font-size: 18px;
        padding: 10px;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 40px;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 10000;
    `;
    
    closeBtn.addEventListener('click', function() {
        lightbox.style.opacity = '0';
        setTimeout(() => lightbox.remove(), 300);
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => lightbox.remove(), 300);
        }
    });
    
    lightbox.appendChild(img);
    lightbox.appendChild(captionEl);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Trigger fade in
    setTimeout(() => lightbox.style.opacity = '1', 10);
}

// Form submission handling
function initForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            // Show success message
            showFormMessage('Thank you for your interest! Shahid Hameed will contact you shortly via WhatsApp.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
            
            // Track form submission
            console.log('Form submitted:', data);
        }, 1500);
    });
}

// Show form message
function showFormMessage(message, type) {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = `form-${type}`;
    messageEl.innerText = message;
    
    form.insertBefore(messageEl, form.firstChild);
    
    setTimeout(() => {
        messageEl.remove();
    }, 5000);
}

// Back to top button
function initBackToTop() {
    // Create button
    const backToTop = document.createElement('a');
    backToTop.href = '#home';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Stats counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-item h3');
    if (!stats.length) return;
    
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.innerText);
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.innerText = target + (stat.innerText.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.innerText = Math.floor(current) + (stat.innerText.includes('+') ? '+' : '');
                }
            }, 30);
        });
        
        animated = true;
    }
    
    // Check if stats are in viewport
    window.addEventListener('scroll', function() {
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateStats();
        }
    });
}

// Video thumbnails
function initVideoThumbnails() {
    const thumbVideos = document.querySelectorAll('.thumb-video');
    const mainVideo = document.querySelector('.video-wrapper video');
    
    if (!thumbVideos.length || !mainVideo) return;
    
    thumbVideos.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const videoSrc = this.getAttribute('src');
            if (videoSrc) {
                mainVideo.setAttribute('src', videoSrc);
                mainVideo.play();
            }
        });
    });
}

// Scroll spy for active menu
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current) {
                link.classList.add('active');
            }
        });
    });
}

// Update copyright year
function initYearUpdate() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// WhatsApp click tracking
function initWhatsAppTracking() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('WhatsApp button clicked - connecting to Shahid Hameed');
            
            // You can add analytics tracking here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'contact',
                    'event_label': 'WhatsApp Button'
                });
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.about-grid, .product-card, .excellence-item, .gallery-item');
    
    function checkVisibility() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check on load
}

// Lazy load images
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Handle video background on mobile
function initVideoBackground() {
    const heroVideo = document.getElementById('heroVideo');
    if (!heroVideo) return;
    
    // Check if device is mobile
    if (window.innerWidth < 768) {
        // Replace video with static image on mobile for better performance
        heroVideo.poster = 'images/i1.jpg';
        heroVideo.removeAttribute('autoplay');
    }
}

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s;
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }, 500);
    });
}

// Search functionality (if needed)
function initSearch() {
    const searchBtn = document.querySelector('.fa-search')?.parentElement;
    if (!searchBtn) return;
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Implement search modal or functionality
        alert('Search feature coming soon! For now, please contact Shahid Hameed directly on WhatsApp.');
    });
}

// Cart functionality (if needed)
function initCart() {
    const cartBtn = document.querySelector('.fa-shopping-cart')?.parentElement;
    if (!cartBtn) return;
    
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Implement cart modal or functionality
        alert('For bulk orders, please contact Shahid Hameed directly on WhatsApp.');
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const menuBtn = document.querySelector('.menu-btn');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        if (menuBtn) {
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Error handling for videos
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('error', function() {
        console.error('Video failed to load:', this.src);
        this.style.display = 'none';
        
        // Show fallback image
        const fallbackImg = document.createElement('img');
        fallbackImg.src = 'images/i1.jpg';
        fallbackImg.style.width = '100%';
        fallbackImg.style.height = '100%';
        fallbackImg.style.objectFit = 'cover';
        this.parentNode.insertBefore(fallbackImg, this);
    });
});

// Export functions if needed (for module usage)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbar,
        initMobileMenu,
        initSmoothScroll,
        initGallery,
        initForm,
        initBackToTop,
        initStatsCounter,
        initVideoThumbnails,
        initScrollSpy,
        initYearUpdate,
        initWhatsAppTracking,
        initAnimations
    };
}