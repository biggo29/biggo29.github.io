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
