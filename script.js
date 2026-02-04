// Interactive animations and effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats
    function animateCounter(elementId, target, duration = 2000) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Start counters
    animateCounter('rageCount', 156);
    animateCounter('ghostGoals', 29);
    
    // Player card hover effects
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
            audio.volume = 0.2;
            audio.play().catch(e => console.log("Audio play failed:", e));
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: 100px;
                height: 100px;
                top: 50%;
                left: 50%;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            // Create keyframes for ripple
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Randomize stats on each visit
        if (Math.random() > 0.5) {
            const stats = card.querySelectorAll('.stat');
            stats.forEach(stat => {
                const icon = stat.querySelector('i');
                if (icon) {
                    icon.style.animationDelay = `${Math.random() * 2}s`;
                    icon.style.animationDuration = `${1 + Math.random() * 2}s`;
                }
            });
        }
    });
    
    // Easter egg: Click logo 3 times
    let clickCount = 0;
    const logo = document.querySelector('.fifa-text');
    
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 3) {
                this.style.color = '#ff00ff';
                this.style.textShadow = '0 0 30px #ff00ff';
                setTimeout(() => {
                    this.style.color = '';
                    this.style.textShadow = '';
                }, 3000);
                
                // Show secret message
                const secret = document.createElement('div');
                secret.textContent = 'EA Scripting Confirmed! 🎮';
                secret.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0,0,0,0.9);
                    color: #ff00ff;
                    padding: 20px 40px;
                    border-radius: 10px;
                    z-index: 1000;
                    font-size: 2rem;
                    border: 3px solid #ff00ff;
                    animation: fadeInOut 3s forwards;
                `;
                
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes fadeInOut {
                        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                        20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
                    }
                `;
                document.head.appendChild(style);
                
                document.body.appendChild(secret);
                setTimeout(() => secret.remove(), 3000);
                clickCount = 0;
            }
        });
    }
    
    // Dynamic background color shift
    let hue = 200;
    const bgShift = setInterval(() => {
        hue = (hue + 0.1) % 360;
        document.body.style.background = `linear-gradient(135deg, 
            hsl(${hue}, 70%, 10%), 
            hsl(${(hue + 30) % 360}, 70%, 20%), 
            hsl(${(hue + 60) % 360}, 70%, 15%))`;
    }, 100);
    
    // Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        
        document.querySelectorAll('.player-card').forEach(card => {
            card.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        });
    });
});