/* ═══════════════════════════════════════════════════════════════
   Marvel-Themed Loader — Sequencer
   Theme is read from  data-loader-theme  on  #marvel-loader.
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

    /* ── Theme config map ───────────────────────────────────────── */
    var THEMES = {
        'loader-theme-marvel-old': {
            sweepToRed:  true,
            panelColors: [          /* grey — classic Marvel mono    */
                '#d0d0d0', '#c4c4c4', '#dcdcdc', '#b8b8b8', '#d8d8d8',
                '#cccccc', '#e2e2e2', '#c0c0c0', '#d4d4d4', '#c8c8c8',
                '#dedede', '#bbbbbb', '#d2d2d2', '#c6c6c6', '#e0e0e0',
                '#bdbdbd', '#d6d6d6', '#cbcbcb'
            ]
        },
        'loader-theme-marvel-studio': {
            sweepToRed:  false,
            panelColors: [          /* grey — chrome on dark          */
                '#d0d0d0', '#c4c4c4', '#dcdcdc', '#b8b8b8', '#d8d8d8',
                '#cccccc', '#e2e2e2', '#c0c0c0', '#d4d4d4', '#c8c8c8',
                '#dedede', '#bbbbbb', '#d2d2d2', '#c6c6c6', '#e0e0e0',
                '#bdbdbd', '#d6d6d6', '#cbcbcb'
            ]
        },
        'loader-theme-avengers': {
            sweepToRed:  false,
            panelColors: [          /* steel-blue — Avengers palette  */
                '#7BB8E8', '#6BAAD8', '#8EC8F0', '#5A9AC8', '#7CB4E4',
                '#69A6D6', '#90CCF4', '#5C9CCA', '#80BCE8', '#72B0DE',
                '#92CEF6', '#5E9ECC', '#82C0EC', '#6AACDC', '#88C8F2',
                '#609CC8', '#84C2EE', '#6CB0E0'
            ]
        },
        'loader-theme-avengers-doomsday': {
            sweepToRed:  false,
            panelColors: [          /* copper/ember — Doom palette    */
                '#A06820', '#906015', '#B07828', '#886010', '#A87025',
                '#986818', '#B8802E', '#8A6212', '#AA7222', '#986A1A',
                '#BC8232', '#8C6414', '#AC7426', '#9A6C1C', '#BA8030',
                '#8E6616', '#AE7628', '#9C6E1E'
            ]
        }
    };

    /* Resolve active theme — default to marvel-studio */
    var themeKey = loader.dataset.loaderTheme || 'loader-theme-marvel-studio';
    var cfg      = THEMES[themeKey] || THEMES['loader-theme-marvel-studio'];

    /* ── Tech stack — 18 frames ─────────────────────────────────── */
    var TECH = [
        'C#', '.NET', 'ASP.NET CORE', 'CQRS', 'AZURE',
        'DOCKER', 'SQL SERVER', 'MICROSERVICES', 'CLEAN ARCH',
        'NSERVICEBUS', 'TDD', 'JAVA', 'ELK STACK',
        'BLAZOR', 'REST APIS', 'CI/CD', 'XUNIT', 'DDD'
    ];

    /* Acceleration curve: starts 200ms, bottoms at 40ms (~1850ms) */
    var INTERVALS = [
        200, 185, 170, 155, 140, 125,
        115, 105,  95,  85,  75,  65,
         60,  55,  50,  45,  40,  40
    ];

    /* ── Element refs ───────────────────────────────────────────── */
    var panelsEl     = document.getElementById('ml-panels');
    var flashRedEl   = document.getElementById('ml-flash-red');
    var nameEl       = document.getElementById('ml-name');
    var flashWhiteEl = document.getElementById('ml-flash-white');
    var words        = nameEl
        ? Array.prototype.slice.call(nameEl.querySelectorAll('.ml-word'))
        : [];

    /* ── Helper ─────────────────────────────────────────────────── */
    function setOpacity(el, val) { if (el) el.style.opacity = String(val); }

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
                panel.style.display = 'none';
                panel.style.opacity = '0';
                onDone();
                return;
            }
            textEl.textContent     = TECH[i];
            textEl.style.color     = cfg.panelColors[i] || '#d4d4d4';
            /* Camera-shake jitter: scale 0.96–1.04 */
            var jitter = 0.96 + Math.random() * 0.08;
            textEl.style.transform = 'scale(' + jitter.toFixed(3) + ')';
            panel.style.opacity    = '1';
            panel.style.display    = 'flex';
            var delay = INTERVALS[i] || 40;
            i++;
            setTimeout(nextFrame, delay);
        }

        nextFrame();
    }

    /* ════════════════════════════════════════════════════════════
       PHASE 3 — Accent Flash Burst  (~270ms)
       Color is driven by CSS  --ml-flash-color  per theme.
       ════════════════════════════════════════════════════════════ */
    function runRedFlash(onDone) {
        flashRedEl.style.transition = 'none';
        setOpacity(flashRedEl, 1);
        setTimeout(function () {
            flashRedEl.style.transition = 'opacity 0.15s ease';
            setOpacity(flashRedEl, 0);
            setTimeout(onDone, 160);
        }, 120);
    }

    /* ════════════════════════════════════════════════════════════
       PHASE 4 — Name Reveal  (~1700ms)
       Layout + text colour driven by CSS theme variables.
       Red sweep only active on  loader-theme-marvel-old.
       ════════════════════════════════════════════════════════════ */
    function runNameReveal(onDone) {
        setOpacity(nameEl, 1);

        if (words[0]) words[0].classList.add('ml-word-in');

        setTimeout(function () {
            if (words[1]) words[1].classList.add('ml-word-in');
        }, 90);

        /* Lock final state inline once both slams complete */
        setTimeout(function () {
            words.forEach(function (w) {
                w.style.opacity   = '1';
                w.style.transform = 'scale(1)';
            });

            /* Red sweep — old theme only */
            if (cfg.sweepToRed) {
                if (words[0]) words[0].classList.add('ml-word-red');
                setTimeout(function () {
                    if (words[1]) words[1].classList.add('ml-word-red');
                }, 80);
            }
        }, 220);

        setTimeout(onDone, 1700);
    }

    /* ════════════════════════════════════════════════════════════
       PHASE 5 — White Flash + Portfolio Reveal  (~480ms)
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
    setTimeout(function () {                  /* Phase 1: 200ms grain  */
        runPanels(function () {               /* Phase 2: ~1850ms      */
            runRedFlash(function () {         /* Phase 3: ~270ms       */
                runNameReveal(function () {   /* Phase 4: ~1700ms      */
                    runWhiteFlash(function () {/* Phase 5: ~480ms      */
                        exitLoader();
                    });
                });
            });
        });
    }, 200);

}());
