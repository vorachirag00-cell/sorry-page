/* Cinematic Interactive Story Engine — Radhu + Bittu ❤️ */

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. INTRO SCREEN UNSEAL
    // -------------------------------------------------------------
    const introScreen = document.getElementById('intro-screen');
    const btnOpenHeart = document.getElementById('btn-open-heart');

    if (btnOpenHeart && introScreen) {
        btnOpenHeart.addEventListener('click', () => {
            introScreen.classList.add('hidden');
            spawnBurstHearts(window.innerWidth / 2, window.innerHeight / 2, 20);
        });
    }

    // -------------------------------------------------------------
    // 2. CHAPTER 2: MY MISTAKE & HEALING HEART
    // -------------------------------------------------------------
    const heartIcon = document.getElementById('interactive-heart');
    const unfoldLetter = document.getElementById('unfold-letter-box');
    const btnUndo = document.getElementById('btn-undo');
    const undoStatus = document.getElementById('undo-status-text');

    if (heartIcon && unfoldLetter) {
        heartIcon.addEventListener('click', () => {
            unfoldLetter.classList.toggle('active');
        });
    }

    let isUndone = false;
    if (btnUndo && undoStatus && heartIcon) {
        btnUndo.addEventListener('click', () => {
            if (!isUndone) {
                undoStatus.textContent = "Can't undo the past... 💔";
                btnUndo.style.opacity = '0.7';

                setTimeout(() => {
                    undoStatus.textContent = "But I can make the future better. ❤️";
                    heartIcon.textContent = "❤️";
                    heartIcon.classList.add('healed');
                    btnUndo.innerHTML = "<span>❤️ Future Sealed</span>";
                    isUndone = true;
                    spawnBurstHearts(window.innerWidth / 2, window.innerHeight / 2, 15);
                }, 1200);
            }
        });
    }

    // -------------------------------------------------------------
    // 3. CHAPTER 3: BLOOMING FLOWER & REASONS
    // -------------------------------------------------------------
    const flowerWrapper = document.getElementById('flower-wrapper');
    const petals = document.querySelectorAll('.petal');
    const reasonDisplay = document.getElementById('reason-card-display');
    const reasonCounter = document.getElementById('reason-count-text');
    const btnNextReason = document.getElementById('btn-next-reason');

    const petalsReasons = [
        "🌸 You always try to fulfill my little wishes.",
        "🌸 You care about even the smallest things.",
        "🌸 You understand me even when I don't explain everything.",
        "🌸 You make ordinary days feel special.",
        "🌸 You are my favorite person to annoy. 😂",
        "🌸 And somehow, you still love this annoying Bittu. 🥺❤️"
    ];

    const extraReasons = [
        "🌸 Your smile is my daily dose of happiness.",
        "🌸 The way your eyes light up when you're happy.",
        "🌸 You bring peace and comfort to my heart.",
        "🌸 You are the sweetest part of my life.",
        "🌸 Simply because... You're Radhu. ❤️"
    ];

    let currentPetalIndex = 0;
    let totalReasonCount = 0;

    function bloomNextPetal() {
        if (currentPetalIndex < petals.length) {
            petals[currentPetalIndex].classList.add('bloomed');
            reasonDisplay.textContent = petalsReasons[currentPetalIndex];
            currentPetalIndex++;
            totalReasonCount = currentPetalIndex;
            reasonCounter.textContent = `Reasons I love you: 0${totalReasonCount} / ∞`;
            spawnBurstHearts(window.innerWidth / 2, window.innerHeight / 2, 4);

            if (currentPetalIndex === petals.length) {
                setTimeout(() => {
                    reasonDisplay.innerHTML = "<strong>But my favorite reason is simply... You're Radhu. ❤️</strong>";
                }, 1500);
            }
        } else {
            cycleExtraReasons();
        }
    }

    let extraIdx = 0;
    function cycleExtraReasons() {
        reasonDisplay.textContent = extraReasons[extraIdx];
        extraIdx = (extraIdx + 1) % extraReasons.length;
        totalReasonCount++;
        reasonCounter.textContent = `Reasons I love you: ${totalReasonCount < 10 ? '0' + totalReasonCount : totalReasonCount} / ∞`;
        spawnBurstHearts(window.innerWidth / 2, window.innerHeight / 2, 5);
    }

    if (flowerWrapper) flowerWrapper.addEventListener('click', bloomNextPetal);
    if (btnNextReason) btnNextReason.addEventListener('click', bloomNextPetal);

    // -------------------------------------------------------------
    // 4. CHAPTER 4: OUR LITTLE UNIVERSE (STARS)
    // -------------------------------------------------------------
    const starNodes = document.querySelectorAll('.star-node');
    const starModal = document.getElementById('star-memory-modal');

    starNodes.forEach(star => {
        star.addEventListener('click', () => {
            const memory = star.getAttribute('data-memory');
            if (starModal) {
                starModal.style.opacity = '0';
                setTimeout(() => {
                    starModal.textContent = memory;
                    starModal.style.opacity = '1';
                }, 200);
            }
            const rect = star.getBoundingClientRect();
            spawnBurstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
        });
    });

    // -------------------------------------------------------------
    // 5. CHAPTER 5: BITTU'S PROMISES (SCROLL)
    // -------------------------------------------------------------
    const btnUnroll = document.getElementById('btn-unroll-scroll');
    const scrollContainer = document.getElementById('scroll-container');
    const btnSealPromise = document.getElementById('btn-seal-promise');
    const waxSealStamp = document.getElementById('wax-seal-stamp');

    if (btnUnroll && scrollContainer) {
        btnUnroll.addEventListener('click', () => {
            scrollContainer.classList.add('active');
            btnUnroll.style.display = 'none';
        });
    }

    if (btnSealPromise && waxSealStamp) {
        btnSealPromise.addEventListener('click', () => {
            waxSealStamp.style.display = 'block';
            btnSealPromise.style.display = 'none';
            launchConfetti();
        });
    }

    // -------------------------------------------------------------
    // 6. CHAPTER 6: PEACE OFFERING & TRUCE
    // -------------------------------------------------------------
    const giftWrapper = document.getElementById('gift-box-wrapper');
    const giftIcon = document.getElementById('gift-box-icon');
    const peaceBox = document.getElementById('peace-package-box');
    const btnTruceForgive = document.getElementById('btn-truce-forgive');
    const btnTruceAngry = document.getElementById('btn-truce-angry');
    const truceResponse = document.getElementById('truce-response-text');

    if (giftWrapper && peaceBox) {
        giftWrapper.addEventListener('click', () => {
            giftWrapper.classList.add('open');
            if (giftIcon) giftIcon.textContent = '🎉';
            peaceBox.classList.add('active');
            spawnBurstHearts(window.innerWidth / 2, window.innerHeight / 2, 12);
        });
    }

    if (btnTruceAngry && truceResponse) {
        btnTruceAngry.addEventListener('click', () => {
            truceResponse.textContent = "Okay... I'll wait. 🥺❤️ But I'll still be here.";
            btnTruceAngry.textContent = "Try Again ❤️";
        });
    }

    if (btnTruceForgive) {
        btnTruceForgive.addEventListener('click', triggerCelebration);
    }

    // -------------------------------------------------------------
    // 7. CHAPTER 7: FINAL QUESTION YES / NO DODGE
    // -------------------------------------------------------------
    const btnYesFinal = document.getElementById('btn-yes-final');
    const btnNoFinal = document.getElementById('btn-no-final');

    let noDodgeCount = 0;
    const noDialogues = [
        "LET ME THINK 😤",
        "Are you sure? 🥺",
        "Think again! 💭",
        "Dil mat todo na... 💔",
        "Maan jao na please! 🌸",
        "You can't say No! 😜",
        "YES ❤️"
    ];

    function moveNoButton() {
        noDodgeCount++;
        const textIndex = Math.min(noDodgeCount, noDialogues.length - 1);
        btnNoFinal.textContent = noDialogues[textIndex];

        if (noDodgeCount >= noDialogues.length - 1) {
            btnNoFinal.className = 'btn-yes-final';
            btnNoFinal.onclick = triggerCelebration;
            return;
        }

        btnNoFinal.style.position = 'fixed';
        const padding = 30;
        const btnW = btnNoFinal.offsetWidth || 120;
        const btnH = btnNoFinal.offsetHeight || 50;

        const maxL = window.innerWidth - btnW - padding;
        const maxT = window.innerHeight - btnH - padding;

        const randomL = Math.max(padding, Math.floor(Math.random() * maxL));
        const randomT = Math.max(padding, Math.floor(Math.random() * maxT));

        btnNoFinal.style.left = `${randomL}px`;
        btnNoFinal.style.top = `${randomT}px`;
    }

    if (btnNoFinal) {
        btnNoFinal.addEventListener('mouseover', moveNoButton);
        btnNoFinal.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoButton();
        });
    }

    if (btnYesFinal) {
        btnYesFinal.addEventListener('click', triggerCelebration);
    }

    function triggerCelebration() {
        const celebrationModal = document.getElementById('celebration-modal');
        if (celebrationModal) celebrationModal.classList.add('active');
        launchConfetti();
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                spawnBurstHearts(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 2);
            }, i * 80);
        }
    }

    // -------------------------------------------------------------
    // 8. 🔐 SECRET EASTER EGG
    // -------------------------------------------------------------
    const easterEggTrigger = document.getElementById('easter-egg-trigger');
    const easterEggModal = document.getElementById('easter-egg-modal');
    const closeEasterEgg = document.getElementById('close-easter-egg-btn');

    let tapCount = 0;
    if (easterEggTrigger && easterEggModal) {
        easterEggTrigger.addEventListener('click', () => {
            tapCount++;
            if (tapCount >= 3) {
                easterEggModal.classList.add('active');
                tapCount = 0;
            }
        });
    }
    if (closeEasterEgg && easterEggModal) {
        closeEasterEgg.addEventListener('click', () => {
            easterEggModal.classList.remove('active');
        });
    }

    // -------------------------------------------------------------
    // 9. PARTICLE CANVAS & AUDIO PLAYER
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

    for (let i = 0; i < 30; i++) {
        particles.push(new HeartParticle());
    }

    function spawnBurstHearts(x, y, count = 8) {
        for (let i = 0; i < count; i++) {
            const p = new HeartParticle(x, y);
            p.speedY = (Math.random() - 0.5) * 4;
            p.speedX = (Math.random() - 0.5) * 4;
            particles.push(p);
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('pointerdown', (e) => {
        spawnBurstHearts(e.clientX, e.clientY, 3);
    });

    function launchConfetti() {
        if (window.confetti) {
            window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }
    }

    // Audio Control
    const audioToggleBtn = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    const bgAudio = document.getElementById('bg-music');
    let isAudioPlaying = false;
    let audioCtx = null;
    let audioTimer = null;
    const melodyNotes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00, 329.63];

    function startSynth() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        let idx = 0;
        audioTimer = setInterval(() => {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = melodyNotes[idx];
            gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.2);
            idx = (idx + 1) % melodyNotes.length;
        }, 600);
    }

    function stopSynth() {
        if (audioTimer) {
            clearInterval(audioTimer);
            audioTimer = null;
        }
    }

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            isAudioPlaying = !isAudioPlaying;
            if (isAudioPlaying) {
                audioIcon.textContent = "🔊 Music: ON";
                if (bgAudio && bgAudio.src) {
                    bgAudio.play().catch(() => startSynth());
                } else {
                    startSynth();
                }
            } else {
                audioIcon.textContent = "🎵 Music: OFF";
                if (bgAudio) bgAudio.pause();
                stopSynth();
            }
        });
    }

});
