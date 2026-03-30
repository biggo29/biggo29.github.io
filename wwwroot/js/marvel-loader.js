/* ═══════════════════════════════════════════════════════════════
   Marvel-Themed Loader — Full Sequence
   Phase 1 : Black screen + film grain         (0 – 200ms)
   Phase 2 : Tech stack panel shuffle          (200 – ~2050ms)
   Phase 3 : Red flash burst                   (~2050 – ~2320ms)
   Phase 4 : Name reveal — SHOAIB SHAHRIAR     (~2320 – ~4020ms)
   Phase 5 : White flash + portfolio reveal    (~4020 – ~4500ms)
   ═══════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    var loader = document.getElementById('marvel-loader');
    if (!loader) return;

    /* ── One-shot per session ───────────────────────────────────── */
    if (sessionStorage.getItem('ml-seen')) {
        loader.style.display = 'none';
        return;
    }

    /* ── Reduced-motion: skip entirely ─────────────────────────── */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        loader.style.opacity    = '0';
        loader.style.transition = 'opacity 0.3s ease';
        setTimeout(function () {
            loader.remove();
            sessionStorage.setItem('ml-seen', '1');
        }, 350);
        return;
    }

    /* ── Element refs ───────────────────────────────────────────── */
    var panelsEl     = document.getElementById('ml-panels');
    var flashRedEl   = document.getElementById('ml-flash-red');
    var nameEl       = document.getElementById('ml-name');
    var flashWhiteEl = document.getElementById('ml-flash-white');
    var words        = nameEl ? Array.prototype.slice.call(nameEl.querySelectorAll('.ml-word')) : [];

    /* ── Tech stack — 18 frames ─────────────────────────────────── */
    var TECH = [
        'C#', '.NET', 'ASP.NET CORE', 'CQRS', 'AZURE',
        'DOCKER', 'SQL SERVER', 'MICROSERVICES', 'CLEAN ARCH',
        'NSERVICEBUS', 'TDD', 'JAVA', 'ELK STACK',
        'BLAZOR', 'REST APIS', 'CI/CD', 'XUNIT', 'DDD'
    ];

    /* Acceleration curve: starts 200ms, bottoms at 40ms (~1850ms total) */
    var INTERVALS = [
        200, 185, 170, 155, 140, 125,
        115, 105,  95,  85,  75,  65,
         60,  55,  50,  45,  40,  40
    ];

    /* Off-white palette — subtle variation between panels */
    var COLORS = [
        '#d0d0d0', '#c4c4c4', '#dcdcdc', '#b8b8b8', '#d8d8d8',
        '#cccccc', '#e2e2e2', '#c0c0c0', '#d4d4d4', '#c8c8c8',
        '#dedede', '#bbbbbb', '#d2d2d2', '#c6c6c6', '#e0e0e0',
        '#bdbdbd', '#d6d6d6', '#cbcbcb'
    ];

    /* ── Helper ─────────────────────────────────────────────────── */
    function setOpacity(el, val) {
        if (el) el.style.opacity = String(val);
    }

    /* ── Exit ───────────────────────────────────────────────────── */
    function exitLoader() {
        loader.classList.add('ml-exit');
        setTimeout(function () {
            loader.remove();
            sessionStorage.setItem('ml-seen', '1');
        }, 460);
    }

    /* ════════════════════════════════════════════════════════════
       PHASE 2 — Tech Stack Panel Shuffle
       ════════════════════════════════════════════════════════════ */
    function runPanels(onDone) {
        setOpacity(panelsEl, 1);

        var panel  = document.createElement('div');
        panel.className = 'ml-panel';
        var textEl = document.createElement('span');
        textEl.className = 'ml-panel-text';
        panel.appendChild(textEl);
        panelsEl.appendChild(panel);

        var i = 0;

        function nextFrame() {
            if (i >= TECH.length) {
                panel.style.display  = 'none';
                panel.style.opacity  = '0';
                onDone();
                return;
            }

            textEl.textContent      = TECH[i];
            textEl.style.color      = COLORS[i] || '#d4d4d4';

            /* Camera-shake jitter: scale 0.96–1.04 */
            var jitter = 0.96 + Math.random() * 0.08;
            textEl.style.transform  = 'scale(' + jitter.toFixed(3) + ')';

            /* Fix: panel needs opacity:1 — CSS default is 0 */
            panel.style.opacity     = '1';
            panel.style.display     = 'flex';

            var delay = INTERVALS[i] || 40;
            i++;
            setTimeout(nextFrame, delay);
        }

        nextFrame();
    }

    /* ════════════════════════════════════════════════════════════
       PHASE 3 — Red Flash Burst
       Instant on → 120ms hold → 150ms fade out  (~270ms total)
       ════════════════════════════════════════════════════════════ */
    function runRedFlash(onDone) {
        /* Hard cut to Marvel red — no transition, punchy */
        flashRedEl.style.transition = 'none';
        setOpacity(flashRedEl, 1);

        setTimeout(function () {
            flashRedEl.style.transition = 'opacity 0.15s ease';
            setOpacity(flashRedEl, 0);
            setTimeout(onDone, 160);
        }, 120);
    }

    /* ════════════════════════════════════════════════════════════
       PHASE 4 — Name Reveal: SHOAIB SHAHRIAR
       Chrome silver text on deep crimson red (matched to marvel-theme.png)
       Word 1 slams in → Word 2 slams in (+90ms) → hold
       Total: ~1700ms  (+1s from original 700ms)
       ════════════════════════════════════════════════════════════ */
    function runNameReveal(onDone) {
        setOpacity(nameEl, 1);

        /* Slam word 0: SHOAIB */
        if (words[0]) words[0].classList.add('ml-word-in');

        /* Slam word 1: SHAHRIAR — stagger 90ms */
        setTimeout(function () {
            if (words[1]) words[1].classList.add('ml-word-in');
        }, 90);

        /* Lock final state inline after both slams complete
           (prevents any animation restart from resetting values) */
        setTimeout(function () {
            words.forEach(function (w) {
                w.style.opacity   = '1';
                w.style.transform = 'scale(1)';
            });
        }, 220);

        /* Hold chrome name on crimson — 1700ms before white flash */
        setTimeout(onDone, 1700);
    }

    /* ════════════════════════════════════════════════════════════
       PHASE 5 — White Flash + Portfolio Reveal
       Quick flash in (70ms) → fade out (350ms) → exit (~480ms)
       ════════════════════════════════════════════════════════════ */
    function runWhiteFlash(onDone) {
        flashWhiteEl.style.transition = 'opacity 0.07s ease';
        setOpacity(flashWhiteEl, 1);

        setTimeout(function () {
            flashWhiteEl.style.transition = 'opacity 0.35s ease';
            setOpacity(flashWhiteEl, 0);
            setTimeout(onDone, 360);
        }, 70);
    }

    /* ════════════════════════════════════════════════════════════
       MASTER SEQUENCE
       ════════════════════════════════════════════════════════════ */
    /* Phase 1: 200ms black screen + grain (CSS handles the grain) */
    setTimeout(function () {

        runPanels(function () {             /* Phase 2 ~1850ms */
            runRedFlash(function () {       /* Phase 3  ~270ms */
                runNameReveal(function () { /* Phase 4  ~700ms */
                    runWhiteFlash(function () { /* Phase 5 ~480ms */
                        exitLoader();
                    });
                });
            });
        });

    }, 200);

}());
