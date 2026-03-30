// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', function() {
        if (chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '') {
            chatbotWindow.style.display = 'flex';
        } else {
            chatbotWindow.style.display = 'none';
        }
    });

    // Handle input
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const userMessage = chatbotInput.value.trim();
            if (userMessage) {
                addMessage('user', userMessage);
                chatbotInput.value = '';
                respondToMessage(userMessage);
            }
        }
    });

    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function respondToMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = '';

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = 'Greetings! I\'m the CodePriest assistant. How can I help with your hardware-software engineering project?';
        } else if (lowerMessage.includes('services') || lowerMessage.includes('what do you do')) {
            response = 'We specialize in: Embedded Systems (IoT, PCB design), Software Development (apps, APIs), IT Infrastructure, and Consulting & AI. What interests you?';
        } else if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
            response = 'Our pricing: SMBs from $500 (IT Audit), Manufacturing from $1k (Automation), Startups from $3k (MVP). Contact us for a custom quote!';
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
            response = 'Reach out via email: thapelofata07@gmail.com, WhatsApp: +263 78 098 3721, or check our LinkedIn profile.';
        } else if (lowerMessage.includes('embedded') || lowerMessage.includes('iot') || lowerMessage.includes('arduino') || lowerMessage.includes('raspberry')) {
            response = 'We excel in embedded systems! From IoT sensors to custom PCBs, we handle hardware-software integration. What\'s your project?';
        } else if (lowerMessage.includes('software') || lowerMessage.includes('app') || lowerMessage.includes('web')) {
            response = 'Our software expertise covers mobile apps (Flutter), web APIs (Django/Node.js), and custom solutions. Need an MVP?';
        } else if (lowerMessage.includes('consulting') || lowerMessage.includes('ai') || lowerMessage.includes('automation')) {
            response = 'We provide tech consulting, automation scripts, data analytics, and ML models. Perfect for optimizing your operations!';
        } else {
            response = 'I\'m here to help with hardware-software engineering questions. Ask about our services, pricing, or contact info!';
        }

        setTimeout(() => addMessage('bot', response), 500);
    }
});