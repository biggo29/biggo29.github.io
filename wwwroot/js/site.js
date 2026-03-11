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
