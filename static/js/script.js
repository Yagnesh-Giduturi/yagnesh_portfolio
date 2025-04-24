AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out'
});

// Refresh AOS on load to ensure animations trigger
window.addEventListener('load', AOS.refresh);

// Form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formMessage = document.getElementById('form-message');
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        formMessage.style.color = response.ok ? '#28a745' : '#dc3545';
        formMessage.textContent = response.ok ? data.message : data.error;
        if (response.ok) document.getElementById('contact-form').reset();
    } catch (error) {
        formMessage.style.color = '#dc3545';
        formMessage.textContent = 'Error: Could not connect to server';
    }
});
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out'
});

// Refresh AOS on load to ensure animations trigger
window.addEventListener('load', AOS.refresh);

// Form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formMessage = document.getElementById('form-message');
    
    // Basic client-side validation
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    if (!name || !email || !message) {
        formMessage.style.color = '#dc3545';
        formMessage.textContent = 'Please fill in all fields';
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.style.color = '#dc3545';
        formMessage.textContent = 'Please enter a valid email';
        return;
    }

    try {
        const formData = new FormData(form); // Use FormData for form-encoded data
        const response = await fetch('/contact', {
            method: 'POST',
            body: formData // Send FormData instead of JSON
        });
        const data = await response.json();
        formMessage.style.color = response.ok ? '#28a745' : '#dc3545';
        formMessage.textContent = response.ok ? data.message : `${data.error}: ${JSON.stringify(data.details)}`;
        if (response.ok) form.reset();
    } catch (error) {
        console.error('Fetch error:', error);
        formMessage.style.color = '#dc3545';
        formMessage.textContent = 'Error: Could not connect to server';
    }
});