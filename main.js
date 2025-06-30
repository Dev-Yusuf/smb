// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    // Image loading handler
    function handleImageLoading() {
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                // Add loading class
                slide.classList.add('loading');
                img.classList.add('loading');

                // Remove loading class when image loads
                if (img.complete) {
                    slide.classList.remove('loading');
                    img.classList.remove('loading');
                } else {
                    img.onload = function() {
                        slide.classList.remove('loading');
                        img.classList.remove('loading');
                    };
                }

                // Handle error state
                img.onerror = function() {
                    slide.classList.remove('loading');
                    img.classList.remove('loading');
                    slide.classList.add('error');
                    // You might want to add a fallback image or error message here
                };
            }
        });
    }

    // Initialize image loading
    handleImageLoading();

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        // Preload next image
        const nextIndex = (index + 1) % slides.length;
        const nextSlide = slides[nextIndex];
        if (nextSlide) {
            const nextImg = nextSlide.querySelector('img');
            if (nextImg && !nextImg.complete) {
                const preloadImg = new Image();
                preloadImg.src = nextImg.src;
            }
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideShow();
            startSlideShow(); // Restart the timer
        });
    });

    // Pause slideshow on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlideShow);
        heroSlider.addEventListener('mouseleave', startSlideShow);
    }

    // Start the slideshow
    showSlide(0); // Show first slide immediately
    startSlideShow();

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');
    const navLinks = document.querySelectorAll('.mobile-nav-links a');
    
    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileNavLinks.classList.toggle('show');
            menuToggle.classList.toggle('active');
            menuOverlay.classList.toggle('show');
            document.body.style.overflow = mobileNavLinks.classList.contains('show') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        mobileNavLinks.classList.remove('show');
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavLinks.classList.remove('show');
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('show');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavLinks.classList.contains('show')) {
            mobileNavLinks.classList.remove('show');
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 700) {
                mobileNavLinks.classList.remove('show');
                menuToggle.classList.remove('active');
                menuOverlay.classList.remove('show');
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 64; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll arrow functionality
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const categoriesSection = document.querySelector('#categories');
            if (categoriesSection) {
                const offsetTop = categoriesSection.offsetTop - 64;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.01)';
        }

        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.category, .gallery-item, .craft-step');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to your server
            // For now, we'll just show a success message
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    let ticking = false;

    function updateParallax(scrollPos) {
        parallaxElements.forEach(element => {
            const speed = 0.15;
            const rect = element.getBoundingClientRect();
            const elementMiddle = rect.top + rect.height / 2;
            const viewportMiddle = window.innerHeight / 2;
            const distanceFromMiddle = elementMiddle - viewportMiddle;
            const translateY = distanceFromMiddle * speed;
            
            element.style.transform = `translateY(${translateY}px)`;
        });
    }

    // Fade In Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Handle Parallax on Scroll
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax(window.scrollY);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updateParallax(window.scrollY);

    // Craft Section Scroll Animations
    const craftSteps = document.querySelectorAll('.craft-step[data-scroll]');

    const craftObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation
                // craftObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });

    craftSteps.forEach(step => craftObserver.observe(step));
});

// Add CSS for mobile menu toggle animation
const style = document.createElement('style');
style.textContent = `
    .mobile-nav-links {
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }
    
    .mobile-nav-links.show {
        transform: translateY(0);
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style); 