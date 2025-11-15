// ===================================
// Gallery Filtering System
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            filterGallery(category);
        });
    });

    function filterGallery(category) {
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                // Animate in
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
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
// Lightbox Functionality
// ===================================
let currentImageIndex = 0;
let visibleImages = [];

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Open lightbox when clicking gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateVisibleImages();
            const actualIndex = visibleImages.indexOf(item);
            if (actualIndex !== -1) {
                openLightbox(actualIndex);
            }
        });
    });

    function updateVisibleImages() {
        visibleImages = Array.from(galleryItems).filter(item => {
            return window.getComputedStyle(item).display !== 'none';
        });
    }

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxContent();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }

    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    function updateLightboxContent() {
        const currentItem = visibleImages[currentImageIndex];
        const icon = currentItem.querySelector('.gallery-placeholder').textContent;
        const overlay = currentItem.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h3').textContent;
        const description = overlay.querySelector('p').textContent;

        lightboxImage.innerHTML = `<div style="font-size: 10rem;">${icon}</div>`;
        lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        
        // Update navigation button states
        lightboxPrev.style.opacity = currentImageIndex === 0 ? '0.3' : '1';
        lightboxNext.style.opacity = currentImageIndex === visibleImages.length - 1 ? '0.3' : '1';
    }

    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxContent();
        }
    }

    function showNextImage() {
        if (currentImageIndex < visibleImages.length - 1) {
            currentImageIndex++;
            updateLightboxContent();
        }
    }

    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
});

// ===================================
// Load More Functionality
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading more images
            setTimeout(() => {
                this.textContent = 'All Photos Loaded';
                this.style.opacity = '0.6';
                
                // Show message
                const message = document.createElement('p');
                message.textContent = 'You\'ve reached the end of our gallery!';
                message.style.textAlign = 'center';
                message.style.color = 'var(--light-text)';
                message.style.marginTop = '1rem';
                this.parentNode.appendChild(message);
            }, 1500);
        });
    }
});