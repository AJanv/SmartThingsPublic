// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA button smooth scroll to menu
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#menu').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', function() {
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'white';
        navMenu.style.padding = '1rem';
        navMenu.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    // Show success message
    alert(`Thanks for reaching out, ${name}! We'll get back to you at ${email} soon!`);

    // Reset form
    this.reset();
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.menu-item, .stat, .day-schedule, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Active navigation link highlight
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add hover effect to menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f8f9fa';
    });

    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'white';
    });
});

// Dynamic time-based greeting
function updateGreeting() {
    const hour = new Date().getHours();
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (hour < 12) {
        heroSubtitle.textContent = 'Start your morning with our delicious breakfast specials!';
    } else if (hour < 17) {
        heroSubtitle.textContent = 'Experience gourmet street food made with love and the finest ingredients';
    } else {
        heroSubtitle.textContent = 'End your day with our satisfying dinner options!';
    }
}

updateGreeting();

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Special animation when clicking the truck icon multiple times
let clickCount = 0;
const truckIcon = document.querySelector('.truck-icon');

truckIcon.addEventListener('click', function() {
    clickCount++;

    if (clickCount >= 5) {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'spin 0.5s';
        }, 10);

        // Show special message
        const specialOffer = document.createElement('div');
        specialOffer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #FF6B35, #F7931E);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: fadeIn 0.5s;
        `;
        specialOffer.textContent = '🎉 Secret Unlocked: 10% Off Your Next Order! 🎉';
        document.body.appendChild(specialOffer);

        setTimeout(() => {
            specialOffer.remove();
            clickCount = 0;
        }, 3000);
    }
});

// Add keyframe animation for spin
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg) translateY(0); }
        to { transform: rotate(360deg) translateY(0); }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);

console.log('🚚 Welcome to Street Eats! Enjoy browsing our menu!');
