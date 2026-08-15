/* Girlfriend Apology Interactive Engine */

// Default Configuration State
const defaultConfig = {
    herName: "Meri Sweet Jaan",
    hisName: "Aapka Deewana",
    whatsappNum: "", // Optional phone number (e.g. 919876543210)
    apologyLetter: `My dearest Jaan,

I am writing this from the bottom of my heart because making you sad was the last thing I ever wanted to do. 

I know I made a mistake, and I am truly, deeply sorry. You mean the entire world to me—your smile brightens up my darkest days, and your laughter is my favorite sound.

I promise to listen more, understand better, and cherish you even more every single day. Please forgive me and let me make it up to you with unlimited love, hugs, and your favorite treats!

Forever Yours,
❤️`
};

let config = { ...defaultConfig };

// Load saved config from localStorage if present
function loadSavedConfig() {
    const saved = localStorage.getItem('gf_apology_config');
    if (saved) {
        try {
            config = { ...defaultConfig, ...JSON.parse(saved) };
        } catch (e) {
            console.error("Could not parse saved config", e);
        }
    }
    updateDOMWithConfig();
}

function updateDOMWithConfig() {
    document.querySelectorAll('.her-name-text').forEach(el => el.textContent = config.herName);
    document.querySelectorAll('.his-name-text').forEach(el => el.textContent = config.hisName);
    const letterBody = document.getElementById('letter-body-text');
    if (letterBody) letterBody.textContent = config.apologyLetter;

    // Fill settings inputs
    document.getElementById('input-her-name').value = config.herName;
    document.getElementById('input-his-name').value = config.hisName;
    document.getElementById('input-whatsapp').value = config.whatsappNum;
    document.getElementById('input-letter').value = config.apologyLetter;
}

// -------------------------------------------------------------
// 1. Runaway "No" Button Logic & Evolving Dialogues
// -------------------------------------------------------------
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
let noDodgeCount = 0;
let yesScale = 1;

const noDialogues = [
    "No 💔",
    "Are you sure? 🥺",
    "Think again! 💭",
    "Dil mat todo na... 💔",
    "Maan jao na please! 🌸",
    "Ek chance to banta hai! ✨",
    "Really sure??? 😭",
    "I'll give you chocolates! 🍫",
    "Aise mat karo na... 🥺",
    "You can't say No! 😜",
    "Okay fine, YES! ❤️"
];

function moveNoButton() {
    noDodgeCount++;
    
    // Update No button text sequentially
    const textIndex = Math.min(noDodgeCount, noDialogues.length - 1);
    noBtn.textContent = noDialogues[textIndex];

    // Grow the YES button with each dodge
    yesScale += 0.08;
    if (yesScale > 1.8) yesScale = 1.8;
    yesBtn.style.transform = `scale(${yesScale})`;

    // If she dodges many times, turn No button into Yes
    if (noDodgeCount >= noDialogues.length - 1) {
        noBtn.style.position = 'static';
        noBtn.className = 'btn-yes';
        noBtn.onclick = triggerCelebration;
        return;
    }

    // Teleport No button within window bounds
    noBtn.style.position = 'fixed';
    const padding = 30;
    const btnWidth = noBtn.offsetWidth || 120;
    const btnHeight = noBtn.offsetHeight || 50;

    const maxLeft = window.innerWidth - btnWidth - padding;
    const maxTop = window.innerHeight - btnHeight - padding;

    const randomLeft = Math.max(padding, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(padding, Math.floor(Math.random() * maxTop));

    noBtn.style.left = `${randomLeft}px`;
    noBtn.style.top = `${randomTop}px`;
}

// Attach runaway events for desktop & mobile touch
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// -------------------------------------------------------------
// 2. Interactive Apology Envelope & Modal
// -------------------------------------------------------------
const envelope = document.getElementById('envelope');
const letterModal = document.getElementById('letter-modal');
const closeLetterBtn = document.getElementById('close-letter-btn');

envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
        letterModal.classList.add('active');
    }, 400);
});

closeLetterBtn.addEventListener('click', () => {
    letterModal.classList.remove('active');
    setTimeout(() => {
        envelope.classList.remove('open');
    }, 300);
});

// -------------------------------------------------------------
// 3. 3D Memory Cards Flip
// -------------------------------------------------------------
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// -------------------------------------------------------------
// 4. Interactive Anger Level Slider
// -------------------------------------------------------------
const angerSlider = document.getElementById('anger-slider');
const angerEmoji = document.getElementById('anger-emoji');
const angerStatusText = document.getElementById('anger-status-text');

const angerStates = [
    { max: 10, emoji: "🥰", text: "100% Forgiven! I love you so much! ❤️" },
    { max: 30, emoji: "😊", text: "Almost smiling... feeling much better 💕" },
    { max: 50, emoji: "🤔", text: "Thinking about it... keep trying! 💭" },
    { max: 75, emoji: "😒", text: "Still a little annoyed with you... 😤" },
    { max: 100, emoji: "😡", text: "Super Angry! Katti forever! 💥" }
];

angerSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    const state = angerStates.find(s => val <= s.max) || angerStates[angerStates.length - 1];
    angerEmoji.textContent = state.emoji;
    angerStatusText.textContent = state.text;

    // Trigger soft heart burst when slider reaches low anger (<20%)
    if (val <= 15) {
        spawnBurstHearts(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 5);
    }
});

// -------------------------------------------------------------
// 5. Redeemable Love Coupons
// -------------------------------------------------------------
document.querySelectorAll('.voucher').forEach(voucher => {
    voucher.addEventListener('click', () => {
        if (!voucher.classList.contains('claimed')) {
            voucher.classList.add('claimed');
            const btn = voucher.querySelector('.voucher-claim-btn');
            if (btn) btn.textContent = 'Claimed!';
            
            // Burst confetti around voucher
            const rect = voucher.getBoundingClientRect();
            spawnBurstHearts(rect.left + rect.width/2, rect.top + rect.height/2, 12);
        }
    });
});

// -------------------------------------------------------------
// 6. Settings Modal & Persistence
// -------------------------------------------------------------
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const cancelSettingsBtn = document.getElementById('cancel-settings-btn');

settingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('active');
});

cancelSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('active');
});

saveSettingsBtn.addEventListener('click', () => {
    config.herName = document.getElementById('input-her-name').value.trim() || defaultConfig.herName;
    config.hisName = document.getElementById('input-his-name').value.trim() || defaultConfig.hisName;
    config.whatsappNum = document.getElementById('input-whatsapp').value.trim();
    config.apologyLetter = document.getElementById('input-letter').value.trim() || defaultConfig.apologyLetter;

    localStorage.setItem('gf_apology_config', JSON.stringify(config));
    updateDOMWithConfig();
    settingsModal.classList.remove('active');
});

// -------------------------------------------------------------
// 7. Celebration Trigger ("Yes" Click)
// -------------------------------------------------------------
yesBtn.addEventListener('click', triggerCelebration);

function triggerCelebration() {
    const celebrationModal = document.getElementById('celebration-modal');
    celebrationModal.classList.add('active');

    // WhatsApp link setup
    const waBtn = document.getElementById('whatsapp-link-btn');
    const encodedMsg = encodeURIComponent(`I forgive you ${config.hisName}! ❤️ You are my favorite person! 💕`);
    if (config.whatsappNum) {
        waBtn.href = `https://wa.me/${config.whatsappNum}?text=${encodedMsg}`;
    } else {
        waBtn.href = `https://wa.me/?text=${encodedMsg}`;
    }

    // Canvas Confetti & Burst Hearts
    launchConfetti();
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            spawnBurstHearts(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 2);
        }, i * 80);
    }
}

// Canvas Confetti Generator
function launchConfetti() {
    if (window.confetti) {
        window.confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
        });
    } else {
        // Fallback confetti burst using hearts
        for (let i = 0; i < 40; i++) {
            spawnBurstHearts(window.innerWidth / 2, window.innerHeight / 2, 1);
        }
    }
}

// -------------------------------------------------------------
// 8. Particle System (Canvas Floating Hearts & Sparkles)
// -------------------------------------------------------------
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class HeartParticle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || canvas.height + Math.random() * 20;
        this.size = Math.random() * 14 + 10;
        this.speedY = Math.random() * 1.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.color = ["#ff4d6d", "#ff758c", "#c9184a", "#ffb3c1"][Math.floor(Math.random() * 4)];
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -20) {
            this.y = canvas.height + 20;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px serif`;
        ctx.fillText("❤️", this.x, this.y);
        ctx.restore();
    }
}

// Populate background particles
for (let i = 0; i < 30; i++) {
    particles.push(new HeartParticle());
}

function spawnBurstHearts(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
        const p = new HeartParticle(x, y);
        p.speedY = (Math.random() - 0.5) * 4;
        p.speedX = (Math.random() - 0.5) * 4;
        particles.push(p);
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Spawn heart particle on click/tap screen
window.addEventListener('pointerdown', (e) => {
    spawnBurstHearts(e.clientX, e.clientY, 3);
});

// -------------------------------------------------------------
// 9. Romantic Audio Synthesizer (Web Audio API)
// -------------------------------------------------------------
let audioCtx = null;
let isAudioPlaying = false;
let audioTimer = null;

const audioToggleBtn = document.getElementById('audio-toggle');
const audioIcon = document.getElementById('audio-icon');

const romanticMelodyNotes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00, 329.63]; // C4, E4, G4, C5, A4, F4, G4, E4

function playTone(freq, duration) {
    if (!audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.error(e);
    }
}

function startRomanticSynth() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    let noteIdx = 0;
    audioTimer = setInterval(() => {
        playTone(romanticMelodyNotes[noteIdx], 1.2);
        noteIdx = (noteIdx + 1) % romanticMelodyNotes.length;
    }, 600);
}

function stopRomanticSynth() {
    if (audioTimer) {
        clearInterval(audioTimer);
        audioTimer = null;
    }
}

audioToggleBtn.addEventListener('click', () => {
    isAudioPlaying = !isAudioPlaying;
    if (isAudioPlaying) {
        audioIcon.textContent = "🔊 Music: ON";
        startRomanticSynth();
    } else {
        audioIcon.textContent = "🎵 Music: OFF";
        stopRomanticSynth();
    }
});

// Initialize Config on Load
window.addEventListener('DOMContentLoaded', loadSavedConfig);
