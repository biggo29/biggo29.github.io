// ─── Theme switcher ───────────────────────────────────────────────────────────
// initializeTheme: reads the attribute already set by the FOUC-prevention script
// in index.html and returns the theme string so Blazor can sync its state.
window.initializeTheme = () => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
};

// toggleTheme: flips the attribute, persists to localStorage, and briefly adds
// .theme-transitioning to <html> so CSS transitions fire across every element.
window.toggleTheme = () => {
    const root = document.documentElement;
    const next = (root.getAttribute('data-theme') || 'dark') === 'dark' ? 'light' : 'dark';

    root.classList.add('theme-transitioning');
    root.setAttribute('data-theme', next);

    try { localStorage.setItem('theme', next); } catch (_) { /* private browsing */ }

    setTimeout(() => root.classList.remove('theme-transitioning'), 400);
    return next;
};

// ─── Article carousel ─────────────────────────────────────────────────────────
// carouselScroll: scrolls the track by exactly one card-width in `direction`
//   (-1 = left / previous, +1 = right / next).
// carouselScrollToIndex: snaps directly to a specific card index.
// getCarouselState: returns nav-button state + scroll progress (0-100) so
//   Blazor can update disabled attributes and the progress bar without needing
//   a separate scroll-event listener.

window.carouselScroll = (el, direction) => {
    if (!el) return;
    const child = el.firstElementChild;
    const gap   = parseFloat(getComputedStyle(el).gap) || 28;
    const step  = child ? child.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
};

window.carouselScrollToIndex = (el, index) => {
    if (!el) return;
    const child = el.firstElementChild;
    const gap   = parseFloat(getComputedStyle(el).gap) || 28;
    const step  = child ? child.offsetWidth + gap : el.clientWidth;
    el.scrollTo({ left: index * step, behavior: 'smooth' });
};

window.getCarouselState = (el) => {
    if (!el) return { canPrev: false, canNext: false, currentIndex: 0, progress: 0 };
    const child     = el.firstElementChild;
    const gap       = parseFloat(getComputedStyle(el).gap) || 28;
    const step      = child ? child.offsetWidth + gap : el.clientWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const index     = step > 0 ? Math.round(el.scrollLeft / step) : 0;
    const progress  = maxScroll > 1 ? Math.round((el.scrollLeft / maxScroll) * 100) : 0;
    return {
        canPrev:      el.scrollLeft > 1,
        canNext:      el.scrollLeft < maxScroll - 1,
        currentIndex: index,
        progress
    };
};

// ─── Smooth scroll ────────────────────────────────────────────────────────────
// Called from Blazor via JSInterop on nav link click
window.scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// ─── Active nav highlight ──────────────────────────────────────────────────────
// Called once from OnAfterRenderAsync(firstRender).
// Uses IntersectionObserver to mark the in-view section's nav link as active.
window.initializeNavHighlight = () => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const setActive = (id) => {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    };

    // Activate the first section on load
    setActive(sections[0].id);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, {
        threshold: 0,
        // Top offset accounts for 64px navbar; bottom keeps the detection band tight
        rootMargin: '-64px 0px -65% 0px'
    });

    sections.forEach(s => observer.observe(s));
};

// ─── Section entrance animations ──────────────────────────────────────────────
// Called once from OnAfterRenderAsync(firstRender).
// Adds 'fade-in' to sections as they scroll into view.
window.initializeSectionObserver = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
};

// ─── Body scroll lock ─────────────────────────────────────────────────────────
// Used to lock scroll when overlays are open (e.g. modals)
window.toggleBodyScroll = (disable) => {
    document.body.style.overflow = disable ? 'hidden' : '';
};

// ─── Back to top button ───────────────────────────────────────────────────────
// Called once from OnAfterRenderAsync(firstRender).
// Adds .is-visible to the button once the user scrolls past 400px.
window.initializeBackToTop = () => {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const THRESHOLD = 400;

    const onScroll = () => {
        btn.classList.toggle('is-visible', window.scrollY > THRESHOLD);
    };

    // Set correct state immediately (e.g. after a hot reload mid-page)
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
};

// ─── Metric chip counter animation ────────────────────────────────────────────
// Called from MetricChip.razor via JSInterop on first render.
// Uses IntersectionObserver to defer start until the chip is visible, then
// counts from 0 to `target` over `duration` ms with a cubic ease-out curve.
window.animateCounter = (el, target, duration) => {
    if (!el) return;

    const runCounter = () => {
        // Honour the OS reduced-motion preference — jump straight to final value
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = target;
            return;
        }

        const start = performance.now();

        const step = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease-out: fast start, smooth deceleration into the final digit
            const eased    = 1 - Math.pow(1 - progress, 3);

            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target; // guarantee exact final value
            }
        };

        requestAnimationFrame(step);
    };

    // Wait until the chip element is at least half visible before counting.
    // This naturally aligns with the hero stagger entrance without needing
    // hard-coded delay values that would need updating if timings change.
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            observer.disconnect();
            // 120 ms grace period — lets the chip's entrance animation settle
            setTimeout(runCounter, 120);
        }
    }, { threshold: 0.5 });

    observer.observe(el);
};

// ─── Scroll-triggered card animations ────────────────────────────────────────
// Called from MainLayout.razor on first render (all sections) and from
// CaseStudiesSection.razor after each filter change (newly rendered .cs-cards).
// Idempotent — skips cards already marked .card-visible.
//
// Algorithm:
//   1. Collect all card elements that haven't animated yet.
//   2. Group by parent element → compute per-group stagger index (--card-i).
//   3. IntersectionObserver adds .card-visible when a card enters the viewport,
//      which triggers the card-enter CSS animation (defined in app.css).
window.initializeCardAnimations = () => {
    const SELECTORS = '.impact-card, .cs-card, .arch-card, .cap-card, .exp-entry, .edu-card';

    // Skip cards that are already visible to keep the function idempotent
    const newCards = Array.from(document.querySelectorAll(SELECTORS))
        .filter(el => !el.classList.contains('card-visible'));

    if (!newCards.length) return;

    // Assign stagger index per parent group so each section's cards cascade
    // independently. Cap at 6 (max 480 ms delay) to avoid long waits in
    // sections with many items.
    const groups = new Map();
    newCards.forEach(card => {
        const parent = card.parentElement;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(card);
    });

    groups.forEach(groupCards => {
        groupCards.forEach((card, i) => {
            card.style.setProperty('--card-i', Math.min(i, 6));
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    newCards.forEach(card => observer.observe(card));
};

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
// Reads window.scrollY each scroll event and writes --scroll-progress to :root
// so the CSS #scroll-progress-bar can track it with no layout cost.
window.initializeScrollProgress = () => {
    const update = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
        document.documentElement.style.setProperty('--scroll-progress', pct + '%');
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
};

// ─── Cursor Spotlight ─────────────────────────────────────────────────────────
// Tracks mouse position into --cx / --cy on :root so the .cursor-spotlight
// div can paint a radial gradient centred on the cursor (pure CSS, zero repaints).
window.initializeCursorSpotlight = () => {
    const root = document.documentElement;
    document.addEventListener('mousemove', e => {
        root.style.setProperty('--cx', e.clientX + 'px');
        root.style.setProperty('--cy', e.clientY + 'px');
    }, { passive: true });
};

// ─── Section Navigator ────────────────────────────────────────────────────────
// Dynamically builds a fixed right-side dot navigator from section[id] elements.
// Uses IntersectionObserver (same margin as initializeNavHighlight) to keep the
// active dot in sync while scrolling.  Hidden on < 900 px via CSS.
window.initializeSectionNav = () => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;

    const existing = document.getElementById('section-nav');
    if (existing) existing.remove();

    const nav = document.createElement('nav');
    nav.id    = 'section-nav';
    nav.className = 'section-nav';
    nav.setAttribute('aria-label', 'Jump to section');

    const labels = {
        'home':         'Home',
        'impact':       'Impact',
        'case-studies': 'Case Studies',
        'architecture': 'Technical',
        'experience':   'Experience',
        'github':       'GitHub',
        'certificates': 'Certificates',
        'writing':      'Writing',
        'contact':      'Contact'
    };

    sections.forEach(section => {
        const btn   = document.createElement('button');
        btn.className = 'section-nav-item';
        btn.setAttribute('aria-label', 'Go to ' + (labels[section.id] || section.id));

        const label = document.createElement('span');
        label.className = 'section-nav-label';
        label.textContent = labels[section.id] || section.id;

        const dot = document.createElement('span');
        dot.className = 'section-nav-dot';

        btn.appendChild(label);
        btn.appendChild(dot);
        btn.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        nav.appendChild(btn);
    });

    document.body.appendChild(nav);

    const items = Array.from(nav.querySelectorAll('.section-nav-item'));

    const setActive = id => {
        items.forEach((item, i) => {
            item.classList.toggle('active', sections[i]?.id === id);
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) setActive(entry.target.id);
        });
    }, { threshold: 0, rootMargin: '-64px 0px -65% 0px' });

    sections.forEach(s => observer.observe(s));
    setActive(sections[0].id);
};

// ─── 3D Card Tilt ─────────────────────────────────────────────────────────────
// Adds perspective tilt + glare to .impact-card, .cs-card, .arch-card on hover.
// Injects a glare child element (avoids ::after conflicts with scoped CSS).
// Skipped for touch devices and when prefers-reduced-motion is set.
window.initializeTilt = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const SELECTORS = '.impact-card, .cs-card, .arch-card';

    const applyTilt = card => {
        if (card._tiltApplied) return;
        card._tiltApplied = true;

        const glare = document.createElement('div');
        glare.setAttribute('aria-hidden', 'true');
        Object.assign(glare.style, {
            position: 'absolute', inset: '0',
            borderRadius: 'inherit', pointerEvents: 'none',
            zIndex: '2', opacity: '0',
            transition: 'opacity 0.2s ease',
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.09), transparent 55%)'
        });
        card.style.position = 'relative';
        card.appendChild(glare);

        card.addEventListener('mousemove', e => {
            const r  = card.getBoundingClientRect();
            const cx = e.clientX - r.left;
            const cy = e.clientY - r.top;
            const rx = ((cy / r.height) - 0.5) * -14;
            const ry = ((cx / r.width)  - 0.5) *  14;

            card.style.transform  = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
            glare.style.background = `radial-gradient(circle at ${(cx/r.width*100).toFixed(0)}% ${(cy/r.height*100).toFixed(0)}%, rgba(255,255,255,0.09), transparent 55%)`;
            glare.style.opacity   = '1';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            glare.style.opacity  = '0';
        });

        card.style.transition = 'transform 0.18s ease-out, box-shadow 0.3s ease';
        card.style.willChange = 'transform';
    };

    document.querySelectorAll(SELECTORS).forEach(applyTilt);

    // Re-apply after Blazor re-renders (e.g. case-study filter change)
    new MutationObserver(() => {
        document.querySelectorAll(SELECTORS).forEach(applyTilt);
    }).observe(document.body, { childList: true, subtree: true });
};

// ─── Constellation Hero ───────────────────────────────────────────────────────
// Draws an interactive particle network on a <canvas> element.
// 60 base dots connect with lines when within 120 px.
//
// Phase E enhancements:
//   • Stronger cursor repel: 130 px radius, 1.0 force (was 100 px / 0.65)
//   • Click-to-burst: spawns 8–12 particles at click position; max 80 total
//   • Proximity line glow: lines near cursor spike in opacity
//   • Double-click disturbance: all particles get a random velocity spike
//   • Performance guard: particle count capped at MAX_PARTICLES = 80
//
// Pauses rAF loop via IntersectionObserver when hero scrolls off-screen.
window.initializeConstellation = canvasId => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Respect OS reduced-motion preference — draw one static frame, no loop
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        const ctx = canvas.getContext('2d');
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const N = 40;
        const pts = Array.from({ length: N }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.5
        }));
        const dark = document.documentElement.getAttribute('data-theme') !== 'light';
        pts.forEach(p => {
            ctx.fillStyle = dark ? 'rgba(99,155,246,0.4)' : 'rgba(37,99,235,0.45)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        return;
    }

    const ctx   = canvas.getContext('2d');
    let   raf   = null;
    const mouse = { x: -2000, y: -2000 };

    // Phase E constants
    const REPEL_R      = 130;   // cursor repel radius (px)
    const REPEL_F      = 1.0;   // repel force multiplier
    const CONNECT_R    = 120;   // line connection radius (px)
    const GLOW_R       = 150;   // proximity glow radius around cursor (px)
    const MAX_PARTICLES = 80;  // hard cap including burst-spawned particles

    const resize = () => {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    resize();
    new ResizeObserver(resize).observe(canvas);

    // Base 60 permanent particles + burst particles (have finite life)
    const pts = Array.from({ length: 60 }, () => ({
        x:    Math.random() * canvas.width,
        y:    Math.random() * canvas.height,
        vx:   (Math.random() - 0.5) * 0.42,
        vy:   (Math.random() - 0.5) * 0.42,
        r:    Math.random() * 1.2 + 0.5,
        life: Infinity   // permanent particles never expire
    }));

    const dark = () => document.documentElement.getAttribute('data-theme') !== 'light';

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const d = dark();

        // Update physics + expire burst particles (iterate backwards for safe splice)
        for (let i = pts.length - 1; i >= 0; i--) {
            const p = pts[i];

            if (p.life !== Infinity) {
                p.life--;
                if (p.life <= 0) { pts.splice(i, 1); continue; }
            }

            const dx   = p.x - mouse.x;
            const dy   = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < REPEL_R && dist > 0) {
                const f = ((REPEL_R - dist) / REPEL_R) * REPEL_F;
                p.vx += (dx / dist) * f;
                p.vy += (dy / dist) * f;
            }
            p.vx *= 0.97; p.vy *= 0.97;
            p.x  += p.vx;  p.y  += p.vy;
            if (p.x < 0 || p.x > canvas.width)  { p.vx *= -1; p.x = Math.max(0, Math.min(canvas.width,  p.x)); }
            if (p.y < 0 || p.y > canvas.height) { p.vy *= -1; p.y = Math.max(0, Math.min(canvas.height, p.y)); }
        }

        const n = pts.length;

        // Draw connection lines with proximity glow boost
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const dx   = pts[i].x - pts[j].x;
                const dy   = pts[i].y - pts[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < CONNECT_R) {
                    let a = (1 - dist / CONNECT_R) * (d ? 0.22 : 0.20);

                    // Boost alpha when either endpoint is near the cursor
                    const m1 = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
                    const m2 = Math.hypot(pts[j].x - mouse.x, pts[j].y - mouse.y);
                    const nearestMouse = Math.min(m1, m2);
                    if (nearestMouse < GLOW_R) {
                        a += (1 - nearestMouse / GLOW_R) * (d ? 0.28 : 0.22);
                    }

                    ctx.strokeStyle = d ? `rgba(99,155,246,${a})` : `rgba(37,99,235,${a})`;
                    ctx.lineWidth   = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles (burst particles fade in/out via life counter)
        pts.forEach(p => {
            let lifeAlpha = 1;
            if (p.life !== Infinity) {
                const age     = p.maxLife - p.life;
                const fadeIn  = Math.min(age  / 30, 1);   // 0 → 1 in first 30 frames
                const fadeOut = Math.min(p.life / 60, 1);  // 1 → 0 in last 60 frames
                lifeAlpha = fadeIn * fadeOut;
            }
            ctx.fillStyle = d
                ? `rgba(99,155,246,${(0.6 * lifeAlpha).toFixed(3)})`
                : `rgba(37,99,235,${(0.55 * lifeAlpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        raf = requestAnimationFrame(draw);
    };

    // Pause loop when hero is scrolled off-screen
    const section = canvas.closest('section');
    if (section) {
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { if (!raf) draw(); }
                else { cancelAnimationFrame(raf); raf = null; }
            });
        }, { threshold: 0.01 }).observe(section);
    }

    draw();

    canvas.addEventListener('mousemove', e => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
    }, { passive: true });

    canvas.addEventListener('mouseleave', () => { mouse.x = -2000; mouse.y = -2000; });

    // Phase E — Click-to-burst: spawn 8–12 particles at the click position
    canvas.addEventListener('click', e => {
        if (pts.length >= MAX_PARTICLES) return;
        const rect   = canvas.getBoundingClientRect();
        const cx     = e.clientX - rect.left;
        const cy     = e.clientY - rect.top;
        const count  = Math.floor(Math.random() * 5) + 8; // 8–12
        const toAdd  = Math.min(count, MAX_PARTICLES - pts.length);
        for (let i = 0; i < toAdd; i++) {
            const angle   = (i / toAdd) * Math.PI * 2 + Math.random() * 0.4;
            const speed   = 1.0 + Math.random() * 2.0;
            const maxLife = 240;
            pts.push({
                x:    cx,
                y:    cy,
                vx:   Math.cos(angle) * speed,
                vy:   Math.sin(angle) * speed,
                r:    Math.random() * 1.2 + 0.5,
                life: maxLife,
                maxLife
            });
        }
    });

    // Phase E — Double-click system disturbance: spike all particle velocities
    canvas.addEventListener('dblclick', () => {
        pts.forEach(p => {
            p.vx += (Math.random() - 0.5) * 4.5;
            p.vy += (Math.random() - 0.5) * 4.5;
        });
    });
};

// ─── Button Particle Burst ────────────────────────────────────────────────────
// On .cta-primary click, spawns 12 particles that burst radially and fade.
// Particles are fixed-position DOM nodes removed after 700 ms.
window.initializeParticleBurst = () => {
    const burst = btn => {
        const rect = btn.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const el    = document.createElement('div');
            const angle = (i / 12) * Math.PI * 2;
            const dist  = 26 + Math.random() * 22;
            const size  = 3 + Math.random() * 3;

            el.setAttribute('aria-hidden', 'true');
            el.style.cssText = [
                'position:fixed',
                `left:${cx}px`, `top:${cy}px`,
                `width:${size}px`, `height:${size}px`,
                'border-radius:50%',
                'background:var(--primary)',
                'pointer-events:none',
                'z-index:9997',
                'transform:translate(-50%,-50%)',
                'animation:particle-burst 0.6s ease-out forwards',
                `--tx:${(Math.cos(angle) * dist).toFixed(1)}px`,
                `--ty:${(Math.sin(angle) * dist).toFixed(1)}px`
            ].join(';');
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 700);
        }
    };

    const attach = btn => {
        if (btn._burstApplied) return;
        btn._burstApplied = true;
        btn.addEventListener('click', () => burst(btn));
    };

    document.querySelectorAll('.cta-primary').forEach(attach);

    new MutationObserver(() => {
        document.querySelectorAll('.cta-primary').forEach(attach);
    }).observe(document.body, { childList: true, subtree: true });
};

// ─── Theme Toggle Sparkle ─────────────────────────────────────────────────────
// Bursts 8 small coloured particles from the theme button after each toggle.
// Called from Blazor ToggleThemeAsync after the theme has been switched.
window.triggerThemeSparkle = btnSelector => {
    const btn = document.querySelector(btnSelector);
    if (!btn) return;

    const rect  = btn.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const isDk  = document.documentElement.getAttribute('data-theme') !== 'light';
    const color = isDk ? 'rgba(251,191,36,0.9)' : 'rgba(99,155,246,0.9)';

    for (let i = 0; i < 8; i++) {
        const el    = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const dist  = 18 + Math.random() * 14;

        el.setAttribute('aria-hidden', 'true');
        el.style.cssText = [
            'position:fixed',
            `left:${cx}px`, `top:${cy}px`,
            'width:4px', 'height:4px',
            'border-radius:50%',
            `background:${color}`,
            'pointer-events:none',
            'z-index:9997',
            'transform:translate(-50%,-50%)',
            'animation:particle-burst 0.55s ease-out forwards',
            `--tx:${(Math.cos(angle) * dist).toFixed(1)}px`,
            `--ty:${(Math.sin(angle) * dist).toFixed(1)}px`
        ].join(';');
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 650);
    }
};

// ─── Magnetic Buttons ─────────────────────────────────────────────────────────
// .cta-primary buttons subtly attract toward the cursor within ~80 px.
// Skipped for touch devices and prefers-reduced-motion.
window.initializeMagneticButtons = () => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const attach = btn => {
        if (btn._magnetApplied) return;
        btn._magnetApplied = true;

        btn.addEventListener('mousemove', e => {
            const r  = btn.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width  / 2)) * 0.32;
            const dy = (e.clientY - (r.top  + r.height / 2)) * 0.32;
            btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    };

    document.querySelectorAll('.cta-primary').forEach(attach);

    new MutationObserver(() => {
        document.querySelectorAll('.cta-primary').forEach(attach);
    }).observe(document.body, { childList: true, subtree: true });
};

// ─── Code snippet typewriter ──────────────────────────────────────────────────
// Reveals the floating hero code block by typing it character-by-character while
// preserving syntax-highlighted <span> elements.
//
// Algorithm:
//   1. Walk pre.childNodes and collect tokens (text nodes → type char by char;
//      span elements → create the span first, then type its text).
//   2. Clear pre content.
//   3. Show the wrapper div (opacity 0 → 0.14 via CSS transition).
//   4. Replay each token character by character with a configurable delay.
//
// Reduced-motion: skips animation, shows final content immediately.
// Touch: still runs (snippet is hidden on mobile via CSS, so this is a no-op there).
window.initializeCodeTypewriter = elementId => {
    const wrapper = document.getElementById(elementId);
    if (!wrapper) return;

    const pre = wrapper.querySelector('pre');
    if (!pre) return;

    // Tokenize before clearing
    const tokens = [];
    pre.childNodes.forEach(node => {
        if (node.nodeType === 3 /* TEXT_NODE */) {
            tokens.push({ kind: 'text', content: node.textContent });
        } else if (node.nodeType === 1 /* ELEMENT_NODE */) {
            tokens.push({ kind: 'span', content: node.textContent, cls: node.className });
        }
    });

    // Reduced-motion: reveal immediately without typing
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        wrapper.style.opacity = '0.14';
        return;
    }

    // Clear and show container so the typing itself is the reveal
    pre.textContent = '';
    wrapper.style.opacity = '0.14';

    const CHAR_MS = 28;  // ms per character — fast but readable
    const NL_MS   = 85;  // extra pause at line breaks (lets each line register)

    let tIdx    = 0;  // current token index
    let cIdx    = 0;  // character index within current token
    let txtNode = null;  // active text node being appended to
    let spanEl  = null;  // active span element being typed into
    let spanCIdx = 0;   // character index within active span

    const tick = () => {
        if (tIdx >= tokens.length) return;

        const tok = tokens[tIdx];

        if (tok.kind === 'text') {
            // Append to (or create) a text node
            if (!txtNode) {
                txtNode = document.createTextNode('');
                pre.appendChild(txtNode);
            }

            const ch = tok.content[cIdx];
            txtNode.textContent += ch;
            cIdx++;

            if (cIdx >= tok.content.length) {
                tIdx++;
                cIdx    = 0;
                txtNode = null;
            }

            setTimeout(tick, ch === '\n' ? NL_MS : CHAR_MS);

        } else { // 'span'
            // Create the span on the first character, then type into it
            if (!spanEl) {
                spanEl   = document.createElement('span');
                spanEl.className = tok.cls;
                pre.appendChild(spanEl);
                spanCIdx = 0;
            }

            spanEl.textContent += tok.content[spanCIdx];
            spanCIdx++;

            if (spanCIdx >= tok.content.length) {
                tIdx++;
                cIdx     = 0;
                spanEl   = null;
                spanCIdx = 0;
            }

            setTimeout(tick, CHAR_MS);
        }
    };

    // Delay start until after the hero entrance animations have settled
    // Role typewriter starts at 820 ms; code snippet begins after it's done typing
    setTimeout(tick, 1800);
};

// ─── Hero role typewriter effect ──────────────────────────────────────────────
// Called from HeroSection.razor via JSInterop on first render.
// Types `text` into `el` one character at a time, then fades out the cursor.
//
// Parameters:
//   el         – the .hero-role-typed <span> ElementReference
//   text       – full string to type ("Backend Architect · .NET · …")
//   charSpeed  – ms per character (default 40)
//   startDelay – ms to wait before the first character (aligns with stagger)
window.startTypewriter = (el, text, charSpeed, startDelay) => {
    if (!el) return;

    const cursor = el.nextElementSibling; // .hero-role-cursor

    // Reduced motion: show the complete text instantly and hide the cursor
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = text;
        if (cursor) cursor.style.display = 'none';
        return;
    }

    let i = 0;

    const typeNext = () => {
        if (i >= text.length) {
            // Typing complete — let the cursor blink briefly, then fade it out
            if (cursor) setTimeout(() => cursor.classList.add('typer-done'), 1800);
            return;
        }

        el.textContent = text.slice(0, ++i);

        // Add a natural rhythm: pause after each '·' separator so the three
        // role segments feel distinct rather than a single continuous stream
        const justTyped = text[i - 1];
        const delay = justTyped === '·' ? charSpeed * 5 : charSpeed;

        setTimeout(typeNext, delay);
    };

    setTimeout(typeNext, startDelay);
};
