/**
 * AG1 Workspace Portal Core Application Script
 * Fully custom responsive UI dynamics & widgets
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initializers
    initClock();
    initSpaceParticles();
    initCardGlowEffects();
    initPomodoroTimer();
    initQuickNotes();
    initGitDashboardInteraction();
});

/* ==========================================================================
   1. Live Clock & Dynamic Greeting
   ========================================================================== */
function initClock() {
    const clockSpan = document.getElementById('live-time');
    const greetingHeader = document.getElementById('dynamic-greeting');

    function updateTime() {
        const now = new Date();
        
        // Format time nicely
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Hour '0' should be '12'
        
        clockSpan.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        
        // Update greeting based on time of day
        const currentHour = now.getHours();
        let greeting = "Welcome back, wcope80";
        if (currentHour < 12) {
            greeting = "Good Morning, wcope80 🌅";
        } else if (currentHour < 17) {
            greeting = "Good Afternoon, wcope80 ⚡";
        } else {
            greeting = "Good Evening, wcope80 🌌";
        }
        greetingHeader.textContent = greeting;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/* ==========================================================================
   2. Space Particle Canvas Background (Interactive & Responsive)
   ========================================================================== */
function initSpaceParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 75;

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for hover reactions
    const mouse = {
        x: null,
        y: null,
        radius: 120
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Blueprint
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = Math.random() > 0.5 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(236, 72, 153, 0.3)'; // Primary / Secondary HSL equivalent glows
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Screen boundary bounce
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

            // Interactive attraction/repulsion to mouse
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= forceDirectionX * force * 1.2;
                    this.y -= forceDirectionY * force * 1.2;
                }
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    init();

    // Connect dots with thin elegant cosmic dust lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 110) {
                    opacityValue = 1 - (distance / 110);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${opacityValue * 0.12})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connect();
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   3. Card Glow Interaction (Cursor Position Radial Gradients)
   ========================================================================== */
function initCardGlowEffects() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
}

/* ==========================================================================
   4. Circular Pomodoro Focus Timer
   ========================================================================== */
function initPomodoroTimer() {
    const timeLeftSpan = document.getElementById('time-left');
    const toggleBtn = document.getElementById('btn-timer-toggle');
    const resetBtn = document.getElementById('btn-timer-reset');
    const skipBtn = document.getElementById('btn-timer-skip');
    const modeSpan = document.getElementById('current-mode');
    const progressCircle = document.getElementById('timer-progress');

    // Create SVG Gradient dynamic color injection
    const svg = document.querySelector('.timer-svg');
    if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="hsl(260, 85%, 65%)" />
                <stop offset="100%" stop-color="hsl(320, 90%, 65%)" />
            </linearGradient>
        `;
        svg.appendChild(defs);
    }

    let workTime = 25 * 60; // 25 minutes
    let breakTime = 5 * 60; // 5 minutes
    let timeRemaining = workTime;
    let isRunning = false;
    let isWorkSession = true;
    let timerInterval = null;

    const circumference = 2 * Math.PI * 45; // 282.74
    if (progressCircle) {
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = 0;
    }

    function setCircleProgress(percent) {
        if (!progressCircle) return;
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }

    function updateDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timeLeftSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        const totalDuration = isWorkSession ? workTime : breakTime;
        const percentage = ((totalDuration - timeRemaining) / totalDuration) * 100;
        setCircleProgress(percentage);
    }

    function toggleTimer() {
        if (isRunning) {
            // Pause
            clearInterval(timerInterval);
            toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            isRunning = false;
        } else {
            // Play
            isRunning = true;
            toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            timerInterval = setInterval(() => {
                timeRemaining--;
                if (timeRemaining < 0) {
                    // Session complete
                    clearInterval(timerInterval);
                    notifySessionComplete();
                } else {
                    updateDisplay();
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        isWorkSession = true;
        timeRemaining = workTime;
        toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        modeSpan.textContent = "Focus Mode";
        modeSpan.style.color = "hsl(320, 90%, 65%)";
        updateDisplay();
    }

    function skipSession() {
        clearInterval(timerInterval);
        isRunning = false;
        toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        isWorkSession = !isWorkSession;
        timeRemaining = isWorkSession ? workTime : breakTime;
        modeSpan.textContent = isWorkSession ? "Focus Mode" : "Break Mode";
        modeSpan.style.color = isWorkSession ? "hsl(320, 90%, 65%)" : "hsl(145, 80%, 55%)";
        updateDisplay();
    }

    function notifySessionComplete() {
        // Toggle session type automatically
        isWorkSession = !isWorkSession;
        timeRemaining = isWorkSession ? workTime : breakTime;
        modeSpan.textContent = isWorkSession ? "Focus Mode" : "Break Mode";
        modeSpan.style.color = isWorkSession ? "hsl(320, 90%, 65%)" : "hsl(145, 80%, 55%)";
        
        // Browser standard alert
        setTimeout(() => {
            alert(isWorkSession ? "Break time over! Back to coding." : "Awesome job! Grab a short break.");
            updateDisplay();
        }, 100);
    }

    toggleBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    skipBtn.addEventListener('click', skipSession);

    // Initial display config
    updateDisplay();
}

/* ==========================================================================
   5. Persistent Quick Notes Manager
   ========================================================================== */
function initQuickNotes() {
    const noteInput = document.getElementById('note-input');
    const addBtn = document.getElementById('btn-add-note');
    const notesList = document.getElementById('notes-list');
    const noteCount = document.getElementById('note-count');

    let notes = JSON.parse(localStorage.getItem('ag1_quick_notes')) || [];

    function saveNotes() {
        localStorage.setItem('ag1_quick_notes', JSON.stringify(notes));
        updateNotesDisplay();
    }

    function updateNotesDisplay() {
        notesList.innerHTML = '';
        
        if (notes.length === 0) {
            notesList.innerHTML = '<li class="note-item" style="justify-content: center; color: var(--text-muted); font-size: 0.85rem;">No notes yet. Add one above!</li>';
            noteCount.textContent = '0 Notes';
            return;
        }

        noteCount.textContent = `${notes.length} Note${notes.length > 1 ? 's' : ''}`;

        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.className = 'note-item';
            
            li.innerHTML = `
                <span class="note-content">${escapeHTML(note)}</span>
                <button class="btn-delete-note" data-index="${index}" title="Delete note">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;

            notesList.appendChild(li);
        });

        // Add event listeners for new trash items
        document.querySelectorAll('.btn-delete-note').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                notes.splice(idx, 1);
                saveNotes();
            });
        });
    }

    function addNote() {
        const text = noteInput.value.trim();
        if (text) {
            notes.push(text);
            noteInput.value = '';
            saveNotes();
        }
    }

    addBtn.addEventListener('click', addNote);
    noteInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addNote();
        }
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Populate initially
    updateNotesDisplay();
}

/* ==========================================================================
   6. UI Mock State Synchronization
   ========================================================================== */
function initGitDashboardInteraction() {
    const initBtn = document.getElementById('btn-init-git');
    const pushBtn = document.getElementById('btn-push-git');
    const gitStatusBadge = document.getElementById('git-status-badge');

    // Click handler for UI demonstration
    initBtn.addEventListener('click', () => {
        gitStatusBadge.textContent = 'Initialized (local)';
        gitStatusBadge.className = 'value text-success';
        pushBtn.removeAttribute('disabled');
        initBtn.setAttribute('disabled', 'true');
        initBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Git Configured';
        
        // Show local popup details
        alert("Local Git repository configured in UI! Now run the Git sync tool or request Antigravity to push changes to your GitHub.");
    });
}
