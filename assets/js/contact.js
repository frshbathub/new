// ===================================
// Contact Form Submission Handler
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateContactForm(this)) {
                showMessage('Please fill in all required fields correctly.', 'error');
                return;
            }
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success
                showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Log form data (for demonstration)
                console.log('Form submitted:', formData);
            }, 1500);
        });
    }
});

// ===================================
// Form Validation
// ===================================
function validateContactForm(form) {
    let isValid = true;
    
    // Name validation
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
        markInvalid(name);
        isValid = false;
    } else {
        markValid(name);
    }
    
    // Email validation
    const email = form.querySelector('#email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
        markInvalid(email);
        isValid = false;
    } else {
        markValid(email);
    }
    
    // Subject validation
    const subject = form.querySelector('#subject');
    if (!subject.value) {
        markInvalid(subject);
        isValid = false;
    } else {
        markValid(subject);
    }
    
    // Message validation
    const message = form.querySelector('#message');
    if (!message.value.trim() || message.value.trim().length < 10) {
        markInvalid(message);
        isValid = false;
    } else {
        markValid(message);
    }
    
    return isValid;
}

function markInvalid(element) {
    element.style.borderColor = '#e76f51';
    element.style.backgroundColor = '#fff5f5';
}

function markValid(element) {
    element.style.borderColor = '#2d7a3e';
    element.style.backgroundColor = '#f0fff4';
    
    // Reset after a short delay
    setTimeout(() => {
        element.style.borderColor = '';
        element.style.backgroundColor = '';
    }, 2000);
}

// ===================================
// Show Message
// ===================================
function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    messageDiv.textContent = message;
    
    // Style based on type
    messageDiv.style.padding = '15px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.marginTop = '20px';
    messageDiv.style.fontWeight = '500';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.animation = 'slideIn 0.3s ease';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '2px solid #c3e6cb';
    } else {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '2px solid #f5c6cb';
    }
    
    // Insert after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);