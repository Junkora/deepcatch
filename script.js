// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.getElementById('navbar');
const newsletterForm = document.getElementById('newsletterForm');
const particlesContainer = document.getElementById('particles');
const transactionTable = document.getElementById('transactionTable');
const volumeChart = document.getElementById('volumeChart');
const tokenomicsChart = document.getElementById('tokenomicsChart');
const copyPolicyBtn = document.getElementById('copyPolicyId');
const policyIdElement = document.getElementById('policyId');

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Sticky Navbar with scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = document.body.classList.contains('light-theme') 
            ? 'rgba(248, 250, 252, 0.98)' 
            : 'rgba(11, 18, 33, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = document.body.classList.contains('light-theme') 
            ? 'rgba(248, 250, 252, 0.95)' 
            : 'rgba(11, 18, 33, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Particle Effect
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 25000);
}

// Create initial particles
function initParticles() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createParticle(), i * 500);
    }
    
    // Continue creating particles
    setInterval(createParticle, 2000);
}

// Mock Transaction Data
const mockTransactions = [
    { time: '2 min ago', wallet: '0x7f9a...3b2c', token: 'ETH', amount: '1,250.5', value: '$2,125,850', type: 'Buy' },
    { time: '5 min ago', wallet: '0x2d4f...8a1e', token: 'BTC', amount: '45.2', value: '$1,893,200', type: 'Sell' },
    { time: '8 min ago', wallet: '0x9c3b...5f7d', token: 'SOL', amount: '50,000', value: '$3,250,000', type: 'Buy' },
    { time: '12 min ago', wallet: '0x1a8e...2c9f', token: 'ADA', amount: '2,500,000', value: '$875,000', type: 'Buy' },
    { time: '15 min ago', wallet: '0x6f2d...7b4a', token: 'MATIC', amount: '100,000', value: '$92,500', type: 'Sell' },
    { time: '18 min ago', wallet: '0x3b9c...8e2f', token: 'DOT', amount: '25,000', value: '$187,500', type: 'Buy' },
    { time: '22 min ago', wallet: '0x8e4f...1a7b', token: 'AVAX', amount: '15,000', value: '$345,000', type: 'Buy' },
    { time: '25 min ago', wallet: '0x5c2a...9d3e', token: 'LINK', amount: '35,000', value: '$525,000', type: 'Sell' }
];

function populateTransactionTable() {
    transactionTable.innerHTML = mockTransactions.map(transaction => `
        <tr>
            <td>${transaction.time}</td>
            <td>${transaction.wallet}</td>
            <td>${transaction.token}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.value}</td>
            <td><span class="type-badge ${transaction.type.toLowerCase()}">${transaction.type}</span></td>
        </tr>
    `).join('');
}

// Volume Chart
function drawVolumeChart() {
    const canvas = volumeChart;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Mock volume data
    const hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
    const volumes = [45, 52, 38, 65, 72, 58, 48];
    const maxValue = Math.max(...volumes);
    
    // Chart dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / hours.length * 0.6;
    const spacing = chartWidth / hours.length;
    
    // Get current theme colors
    const isLight = document.body.classList.contains('light-theme');
    const textColor = isLight ? '#1a202c' : '#e6f0ff';
    const gridColor = isLight ? '#e2e8f0' : '#2d3748';
    const gradientColors = isLight 
        ? ['#2b6cff', '#29b6f6', '#3b47ff']
        : ['#2b6cff', '#29b6f6', '#3b47ff'];
    
    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    ctx.setLineDash([]);
    
    // Draw bars with gradient
    hours.forEach((hour, index) => {
        const barHeight = (volumes[index] / maxValue) * chartHeight;
        const x = padding + spacing * index + (spacing - barWidth) / 2;
        const y = height - padding - barHeight;
        
        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
        gradient.addColorStop(0, gradientColors[0]);
        gradient.addColorStop(0.5, gradientColors[1]);
        gradient.addColorStop(1, gradientColors[2]);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw hour labels
        ctx.fillStyle = textColor;
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(hour, x + barWidth / 2, height - padding + 20);
        
        // Draw value labels
        ctx.fillText(volumes[index] + 'M', x + barWidth / 2, y - 5);
    });
    
    // Draw axes
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
}

// Tokenomics Pie Chart
function drawTokenomicsChart() {
    const canvas = tokenomicsChart;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Tokenomics data - matching the HTML content
    const data = [
        { label: 'Fairlaunch', value: 95, color: '#2b6cff' },
        { label: 'Marketing & Development', value: 3, color: '#ff6b6b' },
        { label: 'Team Vested', value: 2, color: '#3b47ff' }
    ];
    
    // Store chart data for hover interactions
    canvas.chartData = data;
    canvas.centerX = centerX;
    canvas.centerY = centerY;
    canvas.radius = radius;
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach((segment, index) => {
        const sliceAngle = (segment.value / 100) * 2 * Math.PI;
        
        // Draw slice with shadow for depth
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = segment.color;
        ctx.fill();
        
        ctx.restore();
        
        // Draw border
        ctx.strokeStyle = document.body.classList.contains('light-theme') ? '#ffffff' : '#0b1221';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw percentage label with better positioning
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;
        
        // Add text shadow for better readability
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(segment.value + '%', labelX, labelY);
        
        ctx.restore();
        
        currentAngle += sliceAngle;
    });
    
    // Draw center circle for donut effect with gradient
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.3);
    const isLight = document.body.classList.contains('light-theme');
    centerGradient.addColorStop(0, isLight ? '#f8fafc' : '#1a2332');
    centerGradient.addColorStop(1, isLight ? '#ffffff' : '#0b1221');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();
    
    // Add center text
    ctx.fillStyle = isLight ? '#1a202c' : '#e6f0ff';
    ctx.font = 'bold 14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$DEEP', centerX, centerY);
}

// Add hover effect for tokenomics chart
tokenomicsChart.addEventListener('mousemove', (e) => {
    const canvas = tokenomicsChart;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = canvas.centerX;
    const centerY = canvas.centerY;
    const radius = canvas.radius;
    
    // Calculate distance from center
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    
    // Check if mouse is within the donut
    if (distance <= radius && distance >= radius * 0.3) {
        canvas.style.cursor = 'pointer';
        
        // Calculate angle to determine which segment
        let angle = Math.atan2(y - centerY, x - centerX);
        angle = angle < -Math.PI / 2 ? angle + 2 * Math.PI : angle;
        angle += Math.PI / 2;
        
        // Find which segment the mouse is over
        let currentAngle = 0;
        const data = canvas.chartData;
        
        for (let i = 0; i < data.length; i++) {
            const sliceAngle = (data[i].value / 100) * 2 * Math.PI;
            if (angle >= currentAngle && angle < currentAngle + sliceAngle) {
                // Show tooltip or highlight effect
                canvas.title = `${data[i].label}: ${data[i].value}%`;
                break;
            }
            currentAngle += sliceAngle;
        }
    } else {
        canvas.style.cursor = 'default';
        canvas.title = '';
    }
});

tokenomicsChart.addEventListener('mouseleave', () => {
    tokenomicsChart.style.cursor = 'default';
    tokenomicsChart.title = '';
});

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Show success message
    const originalButton = e.target.querySelector('button[type="submit"]');
    const originalText = originalButton.textContent;
    
    originalButton.textContent = '✓ Subscribed!';
    originalButton.style.background = '#10b981';
    originalButton.disabled = true;
    
    // Reset after 3 seconds
    setTimeout(() => {
        originalButton.textContent = originalText;
        originalButton.style.background = '';
        originalButton.disabled = false;
        e.target.reset();
    }, 3000);
    
    console.log('Newsletter subscription:', email);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .timeline-item, .dashboard-table, .dashboard-chart');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate-on-scroll');
            setTimeout(() => {
                element.classList.add('animated');
            }, 100);
        }
    });
}

// Initialize charts when theme changes
function redrawCharts() {
    drawVolumeChart();
    drawTokenomicsChart();
}

// Watch for theme changes
const observer = new MutationObserver(() => {
    redrawCharts();
});

observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
});

// Button interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add CSS for type badges
const style = document.createElement('style');
style.textContent = `
    .type-badge {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .type-badge.buy {
        background: #10b981;
        color: white;
    }
    
    .type-badge.sell {
        background: #ef4444;
        color: white;
    }
`;
document.head.appendChild(style);

// Copy Policy ID functionality
if (copyPolicyBtn && policyIdElement) {
    copyPolicyBtn.addEventListener('click', async () => {
        const policyId = policyIdElement.textContent;
        
        try {
            // Try to use the modern clipboard API first
            await navigator.clipboard.writeText(policyId);
            
            // Show success feedback
            copyPolicyBtn.classList.add('copied');
            copyPolicyBtn.textContent = '✓';
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyPolicyBtn.classList.remove('copied');
                copyPolicyBtn.textContent = '📋';
            }, 2000);
            
        } catch (err) {
            // Fallback for older browsers
            try {
                const textArea = document.createElement('textarea');
                textArea.value = policyId;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Show success feedback
                copyPolicyBtn.classList.add('copied');
                copyPolicyBtn.textContent = '✓';
                
                setTimeout(() => {
                    copyPolicyBtn.classList.remove('copied');
                    copyPolicyBtn.textContent = '📋';
                }, 2000);
                
            } catch (fallbackErr) {
                console.error('Failed to copy policy ID:', fallbackErr);
                // Show error feedback
                copyPolicyBtn.textContent = '✗';
                setTimeout(() => {
                    copyPolicyBtn.textContent = '📋';
                }, 2000);
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initParticles();
    populateTransactionTable();
    drawVolumeChart();
    drawTokenomicsChart();
    animateOnScroll();
    
    // Redraw charts on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            drawVolumeChart();
            drawTokenomicsChart();
        }, 250);
    });
    
    // Run scroll animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add some interactivity to feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effect to roadmap items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
});

// Periodically update transaction table to simulate real-time data
setInterval(() => {
    // Rotate transactions
    const firstTransaction = mockTransactions.shift();
    mockTransactions.push(firstTransaction);
    
    // Update time for first transaction
    mockTransactions[mockTransactions.length - 1].time = 'Just now';
    
    populateTransactionTable();
}, 30000); // Update every 30 seconds

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    animateOnScroll();
}, 100);

window.addEventListener('scroll', debouncedScroll);
