const PAYSTACK_PUBLIC_KEY = 'pk_live_d47dbe55f3aad7ec69fe10793782c602aa5e5e90';

const services = [
  {
    id: 1,
    title: 'Web Solutions',
    description: 'Professional websites designed for businesses, portfolios, startups, and brands—with performance, scalability, and user experience in mind.',
    price: 12000000,
    display_price: '$80 / ₦120,000',
    icon: '🌐'
  },
  {
    id: 2,
    title: 'Automation Strategy',
    description: 'Custom workflow automation that eliminates repetitive work and connects the tools your business relies on.',
    price: 15000000,
    display_price: '$100 / ₦150,000',
    icon: '🤖'
  },
  {
    id: 3,
    title: 'Bot Development',
    description: 'Custom bots for Telegram, WhatsApp, Discord, and other platforms that automate communication and business processes.',
    price: 12000000,
    display_price: '$80 / ₦120,000',
    icon: '💬'
  },
  {
    id: 4,
    title: 'Technical Solutions',
    description: 'Custom-built technical systems tailored to unique business requirements, internal operations, APIs, dashboards, and integrations.',
    price: 12000000,
    display_price: '$80 / ₦120,000',
    icon: '🧾'
  },
  {
    id: 5,
    title: 'Complete Business Systems',
    description: 'An end-to-end business solution combining web development, automation, bots, integrations, and technical consulting into one complete system.',
    price: 45000000,
    display_price: '$300 / ₦450,000',
    icon: '📦'
  }
];

function renderServices() {
  const grid = document.getElementById('services-grid');
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <span class="service-icon">${service.icon}</span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <div class="price-label">Starting from</div>
      <div class="service-price-wrap">
        <div class="service-price">${service.display_price}</div>
      </div>
      <p class="price-disclaimer">Final pricing depends on project scope, integrations, and business requirements.</p>
      <button class="pay-btn" onclick="initiatePayment(${service.id})">
        Start Your Project →
      </button>
    `;
    grid.appendChild(card);
  });
}

function initiatePayment(serviceId) {
  const service = services.find(s => s.id === serviceId);
  const email = document.getElementById('client-email').value.trim();

  if (!email) {
    alert('Please enter your email address first.');
    document.getElementById('client-email').focus();
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: service.price,
    currency: 'NGN',
    ref: 'LA_' + Math.floor(Math.random() * 1000000000),
    metadata: {
      custom_fields: [
        {
          display_name: 'Service',
          variable_name: 'service',
          value: service.title
        }
      ]
    },
    callback: function(response) {
      document.getElementById('success-message').style.display = 'block';
      document.getElementById('success-message').innerHTML = `
        ✅ Payment Successful!<br>
        Thank you for your payment.<br>
        Reference: ${response.reference}<br>
        I will contact you within 24 hours to get started.
      `;
      window.scrollTo(0, 0);
    },
    onClose: function() {
      console.log('Payment window closed');
    }
  });

  handler.openIframe();
}

document.addEventListener('DOMContentLoaded', renderServices);
