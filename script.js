// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
});

// Enhanced smooth scrolling for anchor links with proper offset
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Get accurate header height including padding and margins
                const header = document.querySelector('.header');
                const headerHeight = header.offsetHeight;
                const headerStyle = window.getComputedStyle(header);
                const headerPadding = parseFloat(headerStyle.paddingTop) + parseFloat(headerStyle.paddingBottom);
                const totalHeaderHeight = headerHeight + headerPadding;
                
                // Calculate target position with proper offset based on section type
                let extraOffset = 20; // Small offset for better visibility
                
                // Special offset for import section
                if (target.id === 'import') {
                    extraOffset = 30; // Slightly more offset for import section
                }
                // Special offset for features section
                else if (target.id === 'features') {
                    extraOffset = 25; // Good offset for features section
                }
                // Special offset for pricing section
                else if (target.id === 'pricing') {
                    extraOffset = 25; // Good offset for pricing section
                }
                // Special offset for contact section
                else if (target.id === 'contact') {
                    extraOffset = 30; // Good offset for contact section
                }
                
                const targetPosition = target.offsetTop - totalHeaderHeight + extraOffset;
                
                smoothScrollTo(targetPosition, 800); // 800ms duration
            }
        });
    });
});

// Custom smooth scroll function with easing
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    requestAnimationFrame(animation);
}

// Easing function for smooth scrolling
function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

// Header background change on scroll with throttling for better performance
let ticking = false;
function updateHeader() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Add WhatsApp contact button above scroll-to-top
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/919876543210?text=Hi! I\'m interested in OS-BOOKS business management software. Can you help me?';
    whatsappBtn.className = 'whatsapp-contact';
    whatsappBtn.target = '_blank';
    whatsappBtn.rel = 'noopener noreferrer';
    whatsappBtn.setAttribute('aria-label', 'Contact us on WhatsApp');
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Make button visible immediately for testing
    scrollToTopBtn.classList.add('show');
    
    // Smooth scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollTo(0, 600);
    });
}

// Scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize elements without animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll to top button
    addScrollToTop();
    
    // Add scroll progress indicator
    addScrollProgress();
});

// Counter animation for stats (excluding the last one)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Animate counters when they come into view (excluding the last stat item)
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.stat-number');
            if (counter) {
                const text = counter.textContent;
                // Skip animation for "24 / 7" Support
                if (text.includes('/')) {
                    return;
                }
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (!isNaN(number)) {
                    animateCounter(counter, number);
                }
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => counterObserver.observe(item));
});



// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const mobile = this.querySelector('input[type="tel"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !mobile || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! We will get back to you soon.', 'success');
            this.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Pricing card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// Feature card animations
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
});

// Chart animations
document.addEventListener('DOMContentLoaded', () => {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.height = bar.style.height || '60%';
        }, index * 200);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        revealObserver.observe(section);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .simple-fade-in {
        animation: simpleFadeIn 0.6s ease-out forwards;
    }
    
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card, .pricing-card, .testimonial-card {
        transition: all 0.3s ease;
    }
    
    .feature-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .pricing-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .testimonial-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
`;

document.head.appendChild(style);

// Initialize tooltips for pricing features
document.addEventListener('DOMContentLoaded', () => {
    const pricingFeatures = document.querySelectorAll('.pricing-features li');
    
    pricingFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Initialize features toggle functionality
    initializeFeaturesToggle();
});

// Features toggle functionality
function initializeFeaturesToggle() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenFeatures = document.querySelectorAll('.hidden-feature');
    let isExpanded = false;
    
    if (showMoreBtn && hiddenFeatures.length > 0) {
        showMoreBtn.addEventListener('click', () => {
            if (!isExpanded) {
                // Show all hidden features
                hiddenFeatures.forEach((feature) => {
                    feature.classList.add('show');
                });
                
                // Update button text and icon
                showMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less Features';
                showMoreBtn.classList.add('expanded');
                isExpanded = true;
                
                // Smooth scroll to show new features
                setTimeout(() => {
                    const featuresSection = document.getElementById('features');
                    if (featuresSection) {
                        // Simple scroll to features section with small offset
                        const targetPosition = featuresSection.offsetTop - 100;
                        smoothScrollTo(targetPosition, 800);
                    }
                }, 500);
                
            } else {
                // Hide all features except first 3
                hiddenFeatures.forEach((feature) => {
                    feature.classList.remove('show');
                });
                
                // Update button text and icon
                showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Features (27 more)';
                showMoreBtn.classList.remove('expanded');
                isExpanded = false;
                
                // Scroll back to top of features section
                setTimeout(() => {
                    const featuresSection = document.getElementById('features');
                    if (featuresSection) {
                        // Simple scroll to top of features section
                        const targetPosition = featuresSection.offsetTop - 80;
                        smoothScrollTo(targetPosition, 600);
                    }
                }, 300);
            }
        });
    }
}

// Add loading animation for the page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loader::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(loadingStyle);

// Add loading screen to HTML
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);
});

// Hero Carousel Functionality
let currentSlide = 1;
const totalSlides = 3;
let autoSlideInterval;

function initCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-nav-btn.prev');
    const nextBtn = document.querySelector('.carousel-nav-btn.next');

    if (!slides.length) return; // Exit if no slides found

    function goToSlide(slideNumber) {
        // Remove active class from current slide and dot
        const currentActiveSlide = document.querySelector('.hero-slide.active');
        const currentActiveDot = document.querySelector('.carousel-dot.active');
        
        if (currentActiveSlide) {
            currentActiveSlide.classList.remove('active');
            currentActiveSlide.classList.add('prev');
        }
        
        if (currentActiveDot) currentActiveDot.classList.remove('active');

        // Add active class to new slide and dot
        if (slides[slideNumber - 1]) {
            slides[slideNumber - 1].classList.remove('prev', 'next');
            slides[slideNumber - 1].classList.add('active');
        }
        
        if (dots[slideNumber - 1]) dots[slideNumber - 1].classList.add('active');

        currentSlide = slideNumber;
    }

    function nextSlide() {
        const nextSlideNum = currentSlide === totalSlides ? 1 : currentSlide + 1;
        
        // For sequential effect, always bring next slide from right
        const currentSlideEl = document.querySelector('.hero-slide.active');
        const nextSlideEl = slides[nextSlideNum - 1];
        
        if (currentSlideEl && nextSlideEl) {
            // Move current slide to left
            currentSlideEl.classList.remove('active');
            currentSlideEl.classList.add('prev');
            
            // Move next slide to center (always from right)
            nextSlideEl.classList.remove('prev', 'next');
            nextSlideEl.classList.add('active');
            
            // Update dots
            document.querySelector('.carousel-dot.active').classList.remove('active');
            dots[nextSlideNum - 1].classList.add('active');
            
            currentSlide = nextSlideNum;
        }
    }

    function prevSlide() {
        const prevSlideNum = currentSlide === 1 ? totalSlides : currentSlide - 1;
        
        // For circular effect, slide current to right and bring prev from left
        const currentSlideEl = document.querySelector('.hero-slide.active');
        const prevSlideEl = slides[prevSlideNum - 1];
        
        if (currentSlideEl && prevSlideEl) {
            currentSlideEl.classList.remove('active');
            currentSlideEl.classList.add('next');
            
            prevSlideEl.classList.remove('prev', 'next');
            prevSlideEl.classList.add('active');
            
            // Update dots
            document.querySelector('.carousel-dot.active').classList.remove('active');
            dots[prevSlideNum - 1].classList.add('active');
            
            currentSlide = prevSlideNum;
        }
    }

    // Event listeners for navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index + 1);
        });
    });

    // Auto-slide functionality
    function startAutoSlide() {
        // Slower auto-slide on mobile for better user experience
        // const isMobile = window.innerWidth <= 1168;
        // const slideInterval = isMobile ? 8000 : 5000; // 8 seconds on mobile, 5 on desktop
        // autoSlideInterval = setInterval(nextSlide, slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto-slide
    startAutoSlide();

    // Pause auto-slide on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let isSwiping = false;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = false;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isSwiping) {
            const currentY = e.touches[0].clientY;
            const currentX = e.touches[0].clientX;
            const diffY = Math.abs(currentY - startY);
            const diffX = Math.abs(currentX - startX);
            
            // Only start swiping if horizontal movement is greater than vertical
            if (diffX > diffY && diffX > 10) {
                isSwiping = true;
            }
        }
    });

    carousel.addEventListener('touchend', (e) => {
        if (isSwiping) {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 80) { // Increased minimum swipe distance for mobile
                if (diff > 0) {
                    nextSlide(); // Swipe left
                } else {
                    prevSlide(); // Swipe right
                }
            }
        }
        isSwiping = false;
    });
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure proper initial state before starting carousel
    setTimeout(() => {
        initCarousel();
        // Force first slide to be active and others hidden
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
                slide.classList.remove('prev', 'next');
            } else {
                slide.classList.remove('active');
                slide.classList.add('prev'); // Add prev class to hide them
            }
        });
        
        dots.forEach((dot, index) => {
            if (index === 0) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }, 100);
});

// Advanced Mobile Number Collection System
function initializeAdvancedMobilePopup() {
    let hasShownPopup = false;
    let userActivityTime = 0;
    let scrollCount = 0;
    let lastScrollTime = 0;
    
    // Check if user is visiting for first time
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
        // Start activity timer - show after 15 seconds
        const activityTimer = setInterval(() => {
            userActivityTime += 1;
            
            // Show popup after 15 seconds of page load
            if (userActivityTime >= 15 && !hasShownPopup) {
                showAdvancedMobilePopup();
                hasShownPopup = true;
                clearInterval(activityTimer);
            }
        }, 1000);
        
        // Track scroll activity - show 5 seconds after scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            scrollCount++;
            lastScrollTime = Date.now();
            
            // Clear previous timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Show popup 5 seconds after scroll activity (if not already shown)
            if (!hasShownPopup && scrollCount >= 2) {
                scrollTimeout = setTimeout(() => {
                    if (!hasShownPopup) {
                        showAdvancedMobilePopup();
                        hasShownPopup = true;
                        clearInterval(activityTimer);
                    }
                }, 5000); // 5 second delay after scroll
            }
        });
        
        // Mark as visited
        localStorage.setItem('hasVisitedBefore', 'true');
    }
}

function showAdvancedMobilePopup() {
    // Create advanced popup HTML
    const popupHTML = `
        <div id="advancedMobilePopup" class="advanced-mobile-popup">
            <div class="popup-overlay"></div>
            <div class="popup-content">
                <div class="popup-header">
                    <h3>📱 Get Your Free Demo!</h3>
                    <p>Enter your mobile number for instant access</p>
                </div>
                
                <div class="popup-body">
                    <div class="phone-input-container">
                        <input type="tel" 
                               id="mobileNumber" 
                               name="mobileNumber" 
                               placeholder="Enter your 10-digit mobile number"
                               maxlength="10"
                               pattern="[0-9]{10}"
                               required>
                    </div>
                    
                    <div class="auto-fill-suggestion" id="autoFillSuggestion" style="display: none;">
                        <p>💡 We detected a number: <span id="detectedNumber"></span></p>
                        <button type="button" class="btn btn-outline" onclick="useDetectedNumber()">Use This Number</button>
                    </div>
                    
                    <div class="popup-buttons">
                        <button type="submit" class="btn btn-primary" onclick="submitMobileNumber()">
                            <i class="fas fa-rocket"></i> Get Free Demo
                        </button>
                        <button type="button" class="btn btn-outline" onclick="closeAdvancedMobilePopup()">
                            Maybe Later
                        </button>
                    </div>
                </div>
                
                <button class="popup-close" onclick="closeAdvancedMobilePopup()">×</button>
            </div>
        </div>
    `;
    
    // Add popup to body
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Add input event listeners
    const mobileInput = document.getElementById('mobileNumber');
    mobileInput.addEventListener('input', handleMobileInput);
    mobileInput.addEventListener('focus', handleMobileFocus);
    
    // Show popup with animation
    setTimeout(() => {
        document.getElementById('advancedMobilePopup').classList.add('show');
    }, 100);
    
    // Try to auto-detect mobile number
    setTimeout(() => {
        detectMobileNumber();
    }, 1000);
}

function handleMobileInput(e) {
    const input = e.target;
    const value = input.value.replace(/\D/g, ''); // Remove non-digits
    
    // Update input with cleaned value
    input.value = value;
    
    // Add visual feedback
    if (value.length === 10) {
        input.classList.add('valid');
        input.classList.remove('invalid');
    } else if (value.length > 0) {
        input.classList.add('invalid');
        input.classList.remove('valid');
    } else {
        input.classList.remove('valid', 'invalid');
    }
}

function handleMobileFocus() {
    // Show keyboard on mobile
    const input = document.getElementById('mobileNumber');
    input.setAttribute('inputmode', 'numeric');
}

function detectMobileNumber() {
    // Try to detect mobile number from various sources
    const possibleNumbers = [];
    
    // Check if user has entered number before
    const savedNumber = localStorage.getItem('userMobileNumber');
    if (savedNumber) {
        possibleNumbers.push(savedNumber);
    }
    
    // Check browser autofill
    const mobileInput = document.getElementById('mobileNumber');
    if (mobileInput.value) {
        possibleNumbers.push(mobileInput.value);
    }
    
    // Show suggestion if number detected
    if (possibleNumbers.length > 0) {
        const number = possibleNumbers[0];
        document.getElementById('detectedNumber').textContent = number;
        document.getElementById('autoFillSuggestion').style.display = 'block';
    }
}

function useDetectedNumber() {
    const detectedNumber = document.getElementById('detectedNumber').textContent;
    document.getElementById('mobileNumber').value = detectedNumber;
    document.getElementById('mobileNumber').classList.add('valid');
    document.getElementById('autoFillSuggestion').style.display = 'none';
}

function submitMobileNumber() {
    const mobileInput = document.getElementById('mobileNumber');
    const mobileNumber = mobileInput.value.trim();
    
    if (mobileNumber.length === 10 && /^[0-9]{10}$/.test(mobileNumber)) {
        // Save mobile number
        localStorage.setItem('userMobileNumber', mobileNumber);
        
        // Show success message
        showNotification('🎉 Thank you! We\'ll contact you on ' + mobileNumber + ' soon!', 'success');
        
        // Close popup
        closeAdvancedMobilePopup();
        
        // Mark as completed
        localStorage.setItem('mobilePopupCompleted', 'true');
        
        // Log data
        console.log('Mobile number collected:', {
            number: mobileNumber,
            timestamp: new Date().toISOString(),
            source: 'advanced-mobile-popup'
        });
    } else {
        // Show error
        mobileInput.classList.add('invalid');
        showNotification('❌ Please enter a valid 10-digit mobile number', 'error');
    }
}

function closeAdvancedMobilePopup() {
    const popup = document.getElementById('advancedMobilePopup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

// Initialize advanced mobile popup when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeAdvancedMobilePopup();
});
