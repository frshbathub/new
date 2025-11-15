// ===================================
// Product Filtering System
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(category);
        });
    });

    function filterProducts(category) {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                // Animate in
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Update URL hash without scrolling
        if (category !== 'all') {
            history.replaceState(null, null, `#${category}`);
        } else {
            history.replaceState(null, null, window.location.pathname);
        }
    }

    // Check for hash in URL on load
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetButton = document.querySelector(`[data-category="${hash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
});

// ===================================
// Product Card Hover Effects
// ===================================
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.product-icon').style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.product-icon').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add transition to product icons
document.querySelectorAll('.product-icon').forEach(icon => {
    icon.style.transition = 'transform 0.3s ease';
});