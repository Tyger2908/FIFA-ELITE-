// Player page specific animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate stat bars sequentially
    const statBars = document.querySelectorAll('.stat-fill');
    statBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.style.width;
        }, index * 200);
    });
    
    // Add confetti on page load
    function createConfetti() {
        const colors = ['#ff6b6b', '#00ff88', '#ffdd59', '#4d96ff', '#9d4edd', '#ff9e6d'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                top: -20px;
                left: ${Math.random() * 100}vw;
                opacity: 0.7;
                z-index: 9999;
                pointer-events: none;
            `;
            
            const animation = confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 0.7 },
                { transform: `translateY(${window.innerHeight + 20}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 3000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                delay: Math.random() * 1000
            });
            
            animation.onfinish = () => confetti.remove();
            document.body.appendChild(confetti);
        }
    }
    
    // Create confetti after a delay
    setTimeout(createConfetti, 1000);
    
    // Secret stat click effect
    const secretStat = document.querySelector('.secret-stat');
    if (secretStat) {
        secretStat.addEventListener('click', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.borderStyle = 'solid';
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Play secret sound if available
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3');
            audio.volume = 0.3;
            audio.play().catch(e => console.log("Audio play failed"));
        });
    }
    
    // Typewriter effect for quote
    const quote = document.querySelector('.quote');
    if (quote) {
        const originalText = quote.textContent;
        quote.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                quote.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Start typing when quote is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.unobserve(quote);
            }
        }, { threshold: 0.5 });
        
        observer.observe(quote);
    }
    
    // Player rating animation
    const rating = document.querySelector('.player-rating');
    if (rating) {
        let count = 0;
        const target = parseInt(rating.textContent);
        const counter = setInterval(() => {
            if (count >= target) {
                clearInterval(counter);
                rating.textContent = target;
            } else {
                count++;
                rating.textContent = count;
                rating.style.transform = `scale(${1 + Math.sin(count * 0.1) * 0.1})`;
            }
        }, 30);
    }
    
    // Mouse follower effect
    const follower = document.createElement('div');
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--player-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.5;
        mix-blend-mode: screen;
        transition: transform 0.1s;
    `;
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
        follower.style.left = `${e.clientX - 10}px`;
        follower.style.top = `${e.clientY - 10}px`;
    });
});