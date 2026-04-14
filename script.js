// Unified CodePriest script.js - smooth scroll, animations, interactions, loader, chatbot

// Loader animation & site reveal
document.addEventListener('DOMContentLoaded', function() {
  const loader = document.querySelector('.loader');
  const site = document.querySelector('.site');
  const nav = document.querySelector('nav');
  const hero = document.querySelector('.hero');

  if (loader && site) {
    // Hide loader after 3.4s
    setTimeout(() => {
      loader.classList.add('hidden');
      site.classList.add('revealed');
      
      // Stagger animations
      setTimeout(() => nav.classList.add('visible'), 200);
      setTimeout(() => hero.classList.add('fade-in'), 500);
    }, 3400);
  }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
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

// Card pop-out interaction
let activeCard = null;

function closeActiveCard() {
    if (activeCard) {
        activeCard.classList.remove('card-popout-active');
        document.body.classList.remove('card-popout-open');
        activeCard = null;
    }
}

document.querySelectorAll('.service-card, .pricing-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeCard === card) return;
        
        closeActiveCard();
        activeCard = card;
        card.classList.add('card-popout-active');
        document.body.classList.add('card-popout-open');
    });
    
    card.addEventListener('mouseleave', closeActiveCard);
});

document.addEventListener('click', closeActiveCard);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeActiveCard();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav && window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.98)';
    } else if (nav) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Chatbot
const chatbotToggle = document.getElementById('chatbot-toggle');
if (chatbotToggle) {
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage('user', message);
                chatbotInput.value = '';
                setTimeout(() => respondToMessage(message), 500);
            }
        }
    });

    function addMessage(sender, text) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.textContent = text;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function respondToMessage(message) {
        const lower = message.toLowerCase();
        let response = 'CodePriest engineer here. Ask about services, pricing, or contact!';
        
        if (lower.includes('hello') || lower.includes('hi')) {
            response = 'Greetings! Ready for hardware-software engineering?';
        } else if (lower.includes('embedded') || lower.includes('iot')) {
            response = 'Embedded systems experts: ESP32, Arduino, PCB design.';
        } else if (lower.includes('contact')) {
            response = 'Email: thapelofata07@gmail.com | WhatsApp: +263 78 098 3721';
        }
        
        addMessage('bot', response);
    }
}

