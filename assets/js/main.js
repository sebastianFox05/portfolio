// Utilidades
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const localizeText = (value) => window.FoxI18n?.t(value) || value;

const nav = $(".nav");
const underline = $(".nav-underline");
const links = $$(".nav-link");
const themeBtn = $("#themeBtn");
const toast = $("#toast");

function showToast(msg) {
    if (!toast) return;
    toast.textContent = localizeText(msg);
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("show"), 1600);
}

// Posiciona underline bajo el link activo
function moveUnderlineTo(link) {
    if (!link || !nav || !underline) return;
    const navRect = nav.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    const left = rect.left - navRect.left + nav.scrollLeft;
    underline.style.width = `${rect.width}px`;
    underline.style.transform = `translateX(${left}px)`;
    underline.style.opacity = "0.85";
}

function setActiveLink(targetLink) {
    if (!targetLink) return;
    links.forEach(a => a.classList.remove("is-active"));
    targetLink.classList.add("is-active");

    if (nav && nav.scrollWidth > nav.clientWidth) {
        const centeredLeft = targetLink.offsetLeft - ((nav.clientWidth - targetLink.offsetWidth) / 2);
        nav.scrollLeft = Math.max(0, centeredLeft);
    }

    moveUnderlineTo(targetLink);
}

function getCurrentFile() {
    const file = window.location.pathname.split("/").pop();
    return file || "index.html";
}

function setActiveLinkFromPage() {
    const currentFile = getCurrentFile();
    const active = links.find(link => link.getAttribute("href") === currentFile) || links[0];
    setActiveLink(active);
}

// Smooth scroll + activo
links.forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;

        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveLink(link);
    });
});

// Ripple en botones y en icon buttons
function attachRipple(el) {
    el.addEventListener("pointerdown", (e) => {
        const r = document.createElement("span");
        r.className = "ripple";
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        r.style.left = `${x}px`;
        r.style.top = `${y}px`;
        el.appendChild(r);
        r.addEventListener("animationend", () => r.remove());
    });
}

$$(".btn").forEach(attachRipple);
$$(".icon-btn").forEach(attachRipple);

// Botón de tema (luna)
const THEME_KEY = "sf_theme";
function applyTheme(mode) {
    const isLight = mode === "light";
    document.body.classList.toggle("light", isLight);
    if (themeBtn) {
        themeBtn.innerHTML = isLight
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
}

const saved = localStorage.getItem(THEME_KEY);
applyTheme(saved || "dark");
setActiveLinkFromPage();

themeBtn?.addEventListener("click", () => {
    const next = document.body.classList.contains("light") ? "dark" : "light";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    showToast(next === "light" ? "Light mode" : "Dark mode");
});

// Botones principales
$("#viewProjectsBtn")?.addEventListener("click", () => {
    showToast("Opening projects…");
});

$("#downloadResumeBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    showToast("Opening resume...");
    window.location.href = "assets/CV.pdf";
});

// Observador para marcar sección activa mientras haces scroll
const sections = ["home", "about", "projects", "collaboration", "contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

const sectionToLink = new Map(
    links.map(a => [a.dataset.section, a])
);

const io = new IntersectionObserver((entries) => {
    const visible = entries
        .filter(en => en.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const id = visible.target.id;
    const link = sectionToLink.get(id);
    if (link) setActiveLink(link);
}, {
    root: null,
    threshold: [0.25, 0.4, 0.55, 0.7]
});

sections.forEach(sec => io.observe(sec));


window.addEventListener("load", () => {
    setActiveLinkFromPage();
    window.setTimeout(setActiveLinkFromPage, 80);
    if (document.fonts) {
        document.fonts.ready.then(setActiveLinkFromPage);
    }
});

window.addEventListener("resize", () => {
    setActiveLinkFromPage();
});

window.addEventListener("foxlanguagechange", () => {
    window.requestAnimationFrame(setActiveLinkFromPage);
});

// Interacciones de iconos inferiores (demo)
$$(".icon-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const label = btn.getAttribute("aria-label") || "Action";
        showToast(label);
    });
});




// ===== About Interactions =====

// 1) Reveal on scroll (sin librerías)
const revealEls = document.querySelectorAll("[data-reveal]");
const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            en.target.classList.add("in");
            revealIO.unobserve(en.target);
        }
    });
}, { threshold: 0.18 });

revealEls.forEach(el => revealIO.observe(el));

// 2) Typewriter del título (una sola vez cuando aparece)
function typewriter(el, text, speed = 22) {
    el.classList.add("typing");
    el.textContent = "";
    let i = 0;
    const t = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(t);
            setTimeout(() => el.classList.remove("typing"), 350);
        }
    }, speed);
}

const aboutTitle = document.querySelector(".about-title");
if (aboutTitle) {
    const text = aboutTitle.dataset.type || aboutTitle.textContent.trim();
    const titleIO = new IntersectionObserver((entries) => {
        const en = entries[0];
        if (!en.isIntersecting) return;
        typewriter(aboutTitle, text);
        titleIO.disconnect();
    }, { threshold: 0.55 });
    titleIO.observe(aboutTitle);
}

// 3) Tilt 3D en la imagen
const tilt = document.getElementById("aboutTilt");
if (tilt) {
    const max = 10; // grados
    const damp = 0.12;

    function setTilt(rx, ry) {
        tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    }

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    function animate() {
        currentX += (targetX - currentX) * damp;
        currentY += (targetY - currentY) * damp;
        setTilt(currentX, currentY);
        requestAnimationFrame(animate);
    }
    animate();

    tilt.addEventListener("mousemove", (e) => {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;   // 0..1
        const py = (e.clientY - r.top) / r.height;  // 0..1
        targetX = (0.5 - py) * max * 2;
        targetY = (px - 0.5) * max * 2;
    });

    tilt.addEventListener("mouseleave", () => {
        targetX = 0; targetY = 0;
    });
}

// 4) Barra de progreso “WHO AM I?” según scroll dentro de la sección
const aboutSection = document.getElementById("about");
function updateAboutProgress() {
    if (!aboutSection) return;
    const rect = aboutSection.getBoundingClientRect();
    const vh = window.innerHeight;
    // Progreso cuando la sección atraviesa la ventana
    const start = vh * 0.9;
    const end = -rect.height * 0.2;
    const p = (start - rect.top) / (start - end);
    const clamped = Math.max(0, Math.min(1, p));
    aboutSection.style.setProperty("--aboutProg", `${Math.round(clamped * 100)}%`);
}
window.addEventListener("scroll", updateAboutProgress, { passive: true });
window.addEventListener("resize", updateAboutProgress);
updateAboutProgress();

// 5) Copy-to-clipboard en chips (Name/Address/Email/Phone)
document.querySelectorAll(".data-chip[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
        const value = btn.getAttribute("data-copy");
        try {
            await navigator.clipboard.writeText(value);
            showToast("Copied to clipboard");
        } catch {
            // Fallback (por si el navegador bloquea clipboard)
            const ta = document.createElement("textarea");
            ta.value = value;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
            showToast("Copied");
        }
    });
});

// 6) Botones Download CV / Hire Me
const downloadCvBtn = document.getElementById("downloadCvBtn");
if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Aquí puedes cambiar a tu archivo real, ej: window.location.href = "assets/cv.pdf";
        showToast("Opening CV...");
        window.location.href = "assets/CV.pdf";
    });
}

const hireMeBtn = document.getElementById("hireMeBtn");
if (hireMeBtn) {
    hireMeBtn.addEventListener("click", () => {
        showToast("Scrolling to Contact…");
    });
}

// 7) Brands: activar + feedback
document.querySelectorAll(".about-brands .brand").forEach(b => {
    b.addEventListener("click", () => {
        document.querySelectorAll(".about-brands .brand").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        const name = b.getAttribute("data-brand") || b.textContent.trim();
        showToast(name);
    });
});




// ===== Portfolio v2: ALWAYS 3 visible + infinite loop + modal (centrado + sin saltos) =====

// 1) DATA
const pf2Data = [
    { img: "assets/img/foxDev.jpeg", title: "FOXDEV", sub: "Developer · Brand", desc: "Identidad visual FOXDEV." },
    { img: "assets/img/ISOTIPOFOXBEIGE.jpg", title: "Isotipo Fox", sub: "Monogram · Identity", desc: "Monograma / isotipo." },
    { img: "assets/img/LOGOSIGNATURE.png", title: "JF Signature", sub: "Signature · Logo", desc: "Logo tipo firma." },
    { img: "assets/img/3.png", title: "Project 01", sub: "Frontend · UI", desc: "Descripción del proyecto 01." },
    { img: "assets/img/blog2.jpg", title: "Project 02", sub: "Landing · UX", desc: "Descripción del proyecto 02." },
    { img: "assets/img/blog3.jpg", title: "Project 03", sub: "Dashboard · UI", desc: "Descripción del proyecto 03." },
    { img: "assets/img/blog4.jpg", title: "Project 04", sub: "Brand · Web", desc: "Descripción del proyecto 04." },
    { img: "assets/img/fondo3.jpg", title: "Project 05", sub: "E-commerce · UI", desc: "Descripción del proyecto 05." },
    { img: "assets/img/blog1.jpg", title: "Project 06", sub: "Portfolio · UX", desc: "Descripción del proyecto 06." },
    { img: "assets/img/blog2.jpg", title: "Project 07", sub: "UI Kit · Design", desc: "Descripción del proyecto 07." },
    { img: "assets/img/blog3.jpg", title: "Project 08", sub: "Web App · UI", desc: "Descripción del proyecto 08." }
];

let pf2Index = 0;

// 2) ELEMENTS (carousel)
const pf2PrevBtn = document.getElementById("pf2Prev");
const pf2NextBtn = document.getElementById("pf2Next");
const pf2Slots = document.getElementById("pf2Slots");

const pf2PrevImg = document.getElementById("pf2PrevImg");
const pf2CurImg = document.getElementById("pf2CurImg");
const pf2NextImg = document.getElementById("pf2NextImg");

const pf2PrevCard = document.getElementById("pf2PrevCard");
const pf2CurCard = document.getElementById("pf2CurCard");
const pf2NextCard = document.getElementById("pf2NextCard");

const pf2Dots = document.getElementById("pf2Dots");
const pf2View = document.getElementById("pf2View");

// 3) MODAL ELEMENTS
const pf2Modal = document.getElementById("pf2Modal");
const pf2ModalImg = document.getElementById("pf2ModalImg");
const pf2ModalTitle = document.getElementById("pf2ModalTitle");
const pf2ModalSub = document.getElementById("pf2ModalSub");
const pf2ModalDesc = document.getElementById("pf2ModalDesc");

// 4) HELPERS
function mod(n, m) { return ((n % m) + m) % m; }

function isLogoPath(src) {
    return /ISOTIPOFOXBEIGE\.jpg$/i.test(src) || /LOGOSIGNATURE\.png$/i.test(src);
}

function setFit(imgEl, src) {
    const logo = isLogoPath(src);
    imgEl.style.objectFit = logo ? "contain" : "cover";
    imgEl.style.padding = logo ? "18px" : "0";
    imgEl.style.background = logo ? "rgba(255,255,255,.06)" : "transparent";
}

function renderDots() {
    if (!pf2Dots) return;
    pf2Dots.innerHTML = "";
    pf2Data.forEach((_, i) => {
        const d = document.createElement("div");
        d.className = "pf2-dot" + (i === pf2Index ? " active" : "");
        d.addEventListener("click", () => { pf2Index = i; render(); });
        pf2Dots.appendChild(d);
    });
}

function render() {
    const n = pf2Data.length;
    if (!n || !pf2PrevImg || !pf2CurImg || !pf2NextImg) return;

    const prev = pf2Data[mod(pf2Index - 1, n)];
    const cur = pf2Data[mod(pf2Index, n)];
    const next = pf2Data[mod(pf2Index + 1, n)];

    pf2PrevImg.src = prev.img; pf2PrevImg.alt = prev.title || "Previous";
    pf2CurImg.src = cur.img; pf2CurImg.alt = cur.title || "Current";
    pf2NextImg.src = next.img; pf2NextImg.alt = next.title || "Next";

    setFit(pf2PrevImg, prev.img);
    setFit(pf2CurImg, cur.img);
    setFit(pf2NextImg, next.img);

    renderDots();
}

function next() { pf2Index = mod(pf2Index + 1, pf2Data.length); render(); }
function prev() { pf2Index = mod(pf2Index - 1, pf2Data.length); render(); }

// 5) SCROLL LOCK (evita que el modal "salte" arriba/abajo)
let pf2ScrollY = 0;
function lockBodyScroll() {
    pf2ScrollY = window.scrollY || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${pf2ScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
}
function unlockBodyScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, pf2ScrollY);
}

// 6) MODAL OPEN/CLOSE
let pf2ModalMountedToBody = false;

function openPf2Modal() {
    const cur = pf2Data[pf2Index];
    if (!cur || !pf2Modal) return;

    if (!pf2ModalMountedToBody) {
        document.body.appendChild(pf2Modal);
        pf2ModalMountedToBody = true;
    }

    pf2ModalImg.src = cur.img;
    pf2ModalImg.alt = cur.title || "Project";
    pf2ModalTitle.textContent = localizeText(cur.title || "Project");
    pf2ModalSub.textContent = localizeText(cur.sub || "");
    if (pf2ModalDesc) pf2ModalDesc.textContent = localizeText(cur.desc || "");

    const logo = isLogoPath(cur.img);
    pf2ModalImg.style.objectFit = logo ? "contain" : "cover";
    pf2ModalImg.style.padding = logo ? "18px" : "0";
    const media = pf2ModalImg.closest(".pf2-modal-media");
    if (media) media.style.background = logo ? "rgba(255,255,255,.10)" : "rgba(255,255,255,.03)";

    lockBodyScroll();

    pf2Modal.classList.add("open");
    pf2Modal.setAttribute("aria-hidden", "false");

    // Garantiza que el contenido empiece arriba
    const body = pf2Modal.querySelector(".pf2-modal-body");
    if (body) body.scrollTop = 0;
}

function closePf2Modal() {
    if (!pf2Modal) return;
    pf2Modal.classList.remove("open");
    pf2Modal.setAttribute("aria-hidden", "true");
    unlockBodyScroll();
}

// 7) EVENTS
pf2NextBtn?.addEventListener("click", next);
pf2PrevBtn?.addEventListener("click", prev);

pf2PrevCard?.addEventListener("click", prev);
pf2NextCard?.addEventListener("click", next);
pf2CurCard?.addEventListener("click", openPf2Modal);

pf2View?.addEventListener("click", (e) => {
    e.preventDefault();
    openPf2Modal();
});

pf2Slots?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "Enter") openPf2Modal();
});

pf2Slots?.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY > 0 || e.deltaX > 0) next();
    else prev();
}, { passive: false });

let down = false, startX = 0, moved = 0;
const onDown = (x) => { down = true; startX = x; moved = 0; };
const onMove = (x) => { if (!down) return; moved = x - startX; };
const onUp = () => {
    if (!down) return;
    down = false;
    if (Math.abs(moved) > 40) {
        if (moved < 0) next();
        else prev();
    }
};

pf2Slots?.addEventListener("mousedown", (e) => onDown(e.clientX));
window.addEventListener("mousemove", (e) => onMove(e.clientX));
window.addEventListener("mouseup", onUp);

pf2Slots?.addEventListener("touchstart", (e) => onDown(e.touches[0].clientX), { passive: true });
pf2Slots?.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX), { passive: true });
pf2Slots?.addEventListener("touchend", onUp);

// Close modal
pf2Modal?.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closePf2Modal();
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pf2Modal?.classList.contains("open")) closePf2Modal();
});

// 8) INIT
render();


// ===== WhatsApp button micro-interaction (ripple) =====
const wa = document.getElementById("waFloat");
if (wa) {
    wa.addEventListener("click", (e) => {
        // ripple
        const r = document.createElement("span");
        r.style.position = "absolute";
        r.style.inset = "0";
        r.style.borderRadius = "999px";
        r.style.background = "rgba(255,255,255,.14)";
        r.style.transform = "scale(.6)";
        r.style.opacity = "1";
        r.style.pointerEvents = "none";
        r.style.transition = "transform .35s ease, opacity .35s ease";
        wa.appendChild(r);

        requestAnimationFrame(() => {
            r.style.transform = "scale(1.25)";
            r.style.opacity = "0";
        });

        setTimeout(() => r.remove(), 360);
    });
}




// ===== Contact form -> WhatsApp + Email (client-side) =====
(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const note = document.getElementById("ctNote");
  const counter = document.getElementById("ctCount");
  const textarea = form.querySelector('textarea[name="message"]');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Counter
  const updateCounter = () => {
    if (!textarea || !counter) return;
    counter.textContent = String(textarea.value.length);
  };
  textarea?.addEventListener("input", updateCounter);
  updateCounter();

  const setNote = (msg, kind = "info") => {
    if (!note) return;
    note.textContent = localizeText(msg);

    note.setAttribute("data-kind", kind);
  };

  const setSubmitting = (isSubmitting) => {
    if (!submitBtn) return;
    submitBtn.disabled = isSubmitting;
    submitBtn.setAttribute("aria-busy", isSubmitting ? "true" : "false");
  };

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Basic validation (coherente con tus required/minlength)
    const name = form.querySelector('input[name="name"]')?.value?.trim() || "";
    const email = form.querySelector('input[name="email"]')?.value?.trim() || "";
    const message = textarea?.value?.trim() || "";

    if (name.length < 2) {
      setNote("Please enter your name (min 2 characters).", "error");
      return;
    }
    if (!isValidEmail(email)) {
      setNote("Please enter a valid email address.", "error");
      return;
    }
    if (message.length < 2) {
      setNote("Please write a short message.", "error");
      return;
    }

    // Honeypot check
    const gotcha = form.querySelector('input[name="_gotcha"]')?.value || "";
    if (gotcha.trim() !== "") {
      // Silencioso: spam
      return;
    }

    const endpoint = form.getAttribute("action");
    if (!endpoint) {
      setNote("Form endpoint is missing (action).", "error");
      return;
    }

    setSubmitting(true);
    setNote("Sending...", "info");

    try {
      const formData = new FormData(form);

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (res.ok) {
        setNote("Message sent successfully. Thanks!", "success");
        form.reset();
        updateCounter();
      } else {
        // Try parse Formspree error payload
        let data = null;
        try { data = await res.json(); } catch (_) {}

        if (data?.errors?.length) {
          const msg = data.errors.map(x => x.message).join(" ");
          setNote(msg || "Could not send. Please try again.", "error");
        } else {
          setNote("Could not send. Please try again.", "error");
        }
      }
    } catch (err) {
      setNote("Network error. Please check your connection and try again.", "error");
    } finally {
      setSubmitting(false);
    }
  });
})();

// ===== Extra portfolio interactions =====
const projectFilters = document.getElementById("projectFilters");
const caseCards = $$(".case-card[data-category]");

projectFilters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    const filter = button.dataset.filter;
    projectFilters.querySelectorAll("[data-filter]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    caseCards.forEach(card => {
        const isVisible = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !isVisible);
    });

    showToast(filter === "all" ? "Showing all projects" : `Showing ${filter} projects`);
});

const skillNotes = {
    "HTML semantico": "Estructura clara, headings ordenados y contenido legible para usuarios y buscadores.",
    "Semantic HTML": "Estructura clara, headings ordenados y contenido legible para usuarios y buscadores.",
    "CSS modular": "Componentes visuales reutilizables, baja especificidad y responsive sin pelear con el layout.",
    "Modular CSS": "Componentes visuales reutilizables, baja especificidad y responsive sin pelear con el layout.",
    "JavaScript": "Interacciones no intrusivas: menus, modales, filtros, formularios y estados vivos.",
    "Responsive UI": "Pantallas que se adaptan a desktop, tablet y movil sin perder jerarquia visual.",
    "Micro-interactions": "Detalles de hover, foco, ripple, reveal y feedback para que la interfaz se sienta viva.",
    "Accesibilidad": "Contraste, foco visible, labels, botones reales y navegacion por teclado.",
    "Accessibility": "Contraste, foco visible, labels, botones reales y navegacion por teclado.",
    "Design systems": "Tokens, componentes base y reglas visuales para escalar sin desorden.",
    "Performance": "Assets cuidados, JS ligero y estructura simple para cargar rapido."
};

const skillCloud = document.getElementById("skillCloud");
const skillNote = document.getElementById("skillNote");
const stackShuffle = document.getElementById("stackShuffle");

skillCloud?.addEventListener("click", (event) => {
    const button = event.target.closest(".skill-pill");
    if (!button) return;

    skillCloud.querySelectorAll(".skill-pill").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    if (skillNote) {
        skillNote.textContent = localizeText(skillNotes[button.textContent.trim()] || "Habilidad seleccionada.");
    }
});

stackShuffle?.addEventListener("click", () => {
    const pills = $$(".skill-pill", skillCloud);
    if (!pills.length) return;

    const selected = pills[Math.floor(Math.random() * pills.length)];
    selected.click();
    showToast(`Focus: ${selected.textContent.trim()}`);
});

const estimatePages = document.getElementById("estimatePages");
const estimateMotion = document.getElementById("estimateMotion");
const estimatePagesValue = document.getElementById("estimatePagesValue");
const estimateMotionValue = document.getElementById("estimateMotionValue");
const estimateLabel = document.getElementById("estimateLabel");
const estimateTime = document.getElementById("estimateTime");

function updateEstimate() {
    if (!estimatePages || !estimateMotion || !estimatePagesValue || !estimateMotionValue || !estimateLabel || !estimateTime) return;

    const pages = Number(estimatePages.value);
    const motion = Number(estimateMotion.value);
    const score = pages + motion;

    estimatePagesValue.textContent = String(pages);
    estimateMotionValue.textContent = String(motion);

    if (score <= 4) {
        estimateLabel.textContent = localizeText("Landing esencial");
        estimateTime.textContent = localizeText("1 semana");
    } else if (score <= 8) {
        estimateLabel.textContent = localizeText("Portfolio avanzado");
        estimateTime.textContent = localizeText("2-3 semanas");
    } else {
        estimateLabel.textContent = localizeText("Producto interactivo");
        estimateTime.textContent = localizeText("3-5 semanas");
    }
}

estimatePages?.addEventListener("input", updateEstimate);
estimateMotion?.addEventListener("input", updateEstimate);
updateEstimate();

const metricValues = $$(".metric-value[data-count]");
let hasAnimatedMetrics = false;

function animateMetrics() {
    if (hasAnimatedMetrics || !metricValues.length) return;
    hasAnimatedMetrics = true;

    metricValues.forEach(item => {
        const target = Number(item.dataset.count || 0);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 36));
        const timer = window.setInterval(() => {
            current = Math.min(target, current + step);
            item.textContent = `${current}${target === 100 ? "%" : ""}`;
            if (current >= target) window.clearInterval(timer);
        }, 28);
    });
}

if (metricValues.length) {
    const metricsObserver = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
            animateMetrics();
            metricsObserver.disconnect();
        }
    }, { threshold: .35 });
    metricsObserver.observe(metricValues[0].closest(".metrics-strip"));
}

const focusItems = [
    { number: "01", title: "Portfolio systems", text: "Estructuras multipagina con identidad visual, proyectos, servicios y contacto claro." },
    { number: "02", title: "Interactive UI", text: "Modales, filtros, estimadores, estados y detalles que hacen que la pagina se sienta viva." },
    { number: "03", title: "Responsive polish", text: "Ajustes finos para que cada bloque conserve jerarquia en desktop, tablet y movil." }
];
let focusIndex = 0;
const focusNext = document.getElementById("focusNext");
const focusNumber = document.getElementById("focusNumber");
const focusTitle = document.getElementById("focusTitle");
const focusText = document.getElementById("focusText");

function renderFocus() {
    if (!focusNumber || !focusTitle || !focusText) return;
    const item = focusItems[focusIndex];
    focusNumber.textContent = item.number;
    focusTitle.textContent = localizeText(item.title);
    focusText.textContent = localizeText(item.text);
}

focusNext?.addEventListener("click", () => {
    focusIndex = (focusIndex + 1) % focusItems.length;
    renderFocus();
    showToast(focusItems[focusIndex].title);
});

const timelineNote = document.getElementById("timelineNote");
document.querySelectorAll(".timeline-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".timeline-item").forEach(button => button.classList.remove("active"));
        item.classList.add("active");
        if (timelineNote) timelineNote.textContent = item.dataset.timeline || "";
    });
});

const packageNote = document.getElementById("packageNote");
document.querySelectorAll(".package-card").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".package-card").forEach(button => button.classList.remove("active"));
        item.classList.add("active");
        if (packageNote) packageNote.textContent = item.dataset.package || "";
    });
});

const collabData = {
    build: {
        title: "Build from scratch",
        text: "Construimos una pagina o interfaz completa desde contenido, referencias y objetivos claros.",
        items: ["Arquitectura visual", "Componentes responsive", "Interacciones y estados"]
    },
    audit: {
        title: "Frontend audit",
        text: "Reviso tu UI actual y detecto problemas de layout, responsive, accesibilidad y consistencia.",
        items: ["Reporte accionable", "Prioridades visuales", "Plan de mejora"]
    },
    ship: {
        title: "Launch support",
        text: "Te acompaño en el cierre para pulir detalles, probar flujos y dejar la pagina lista para publicar.",
        items: ["QA visual", "Ajustes finales", "Checklist de salida"]
    }
};
const collabTabs = document.getElementById("collabTabs");
const collabPanel = document.getElementById("collabPanel");

collabTabs?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-collab]");
    if (!button || !collabPanel) return;
    const data = collabData[button.dataset.collab];
    if (!data) return;

    collabTabs.querySelectorAll("[data-collab]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    collabPanel.innerHTML = `<h3>${localizeText(data.title)}</h3><p>${localizeText(data.text)}</p><ul>${data.items.map(item => `<li>${localizeText(item)}</li>`).join("")}</ul>`;
});

const quickSubjects = document.getElementById("quickSubjects");
quickSubjects?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-message]");
    const textarea = document.querySelector('textarea[name="message"]');
    if (!button || !textarea) return;

    quickSubjects.querySelectorAll("[data-message]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    textarea.value = button.dataset.message || "";
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
});

document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".faq-item").forEach(button => {
            if (button !== item) button.classList.remove("active");
        });
        item.classList.toggle("active");
    });
});



// ===== Footer small interactivity =====
(() => {
    const y = document.getElementById("ftYear");
    if (y) y.textContent = String(new Date().getFullYear());

    // Smooth scroll "Back to top" (if browser doesn't already)
    const topLink = document.querySelector(".ft-toplink");
    if (topLink) {
        topLink.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector("#home") || document.body;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
})();





// ===== INTERACTION SCORE (Live local counters) =====
(() => {
    const el = (id) => document.getElementById(id);

    const scoreEl = el("isecScore");
    const scoreFill = el("isecScoreFill");
    const moodEl = el("isecMood");
    const hintEl = el("isecHint");

    const clicksEl = el("isecClicks");
    const clicksDeltaEl = el("isecClicksDelta");
    const clicksSpark = el("isecClicksSpark");

    const scrollEl = el("isecScroll");
    const scrollDeltaEl = el("isecScrollDelta");
    const scrollFill = el("isecScrollFill");

    const timeEl = el("isecTime");
    const focusEl = el("isecFocus");

    const modalsEl = el("isecModals");
    const themesEl = el("isecThemes");

    const resetBtn = el("isecReset");
    const pauseBtn = el("isecPause");

    // If section isn't in DOM, exit
    if (!scoreEl || !clicksEl || !scrollEl || !timeEl) return;

    // Local state
    const state = {
        paused: false,
        clicks: 0,
        clicksBurst: 0,
        maxClicksBurst: 10,
        scrollDepth: 0,
        lastScrollDepth: 0,
        activeSeconds: 0,
        focused: true,
        modals: 0,
        themes: 0,
        lastClickTs: 0,
        lastInteractTs: Date.now(),
    };

    // ===== Utilities =====
    function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${String(s).padStart(2, "0")}`;
    }

    function computeScore() {
        // Simple, understandable scoring:
        // clicks (0-30) + scroll (0-35) + time (0-20) + modals (0-10) + themes (0-5) = 100
        const clicksScore = clamp(state.clicks, 0, 30);
        const scrollScore = clamp(Math.round(state.scrollDepth * 0.35), 0, 35); // scrollDepth is 0-100
        const timeScore = clamp(Math.floor(state.activeSeconds / 8), 0, 20);     // caps at ~160s
        const modalsScore = clamp(state.modals * 5, 0, 10);
        const themeScore = clamp(state.themes * 2, 0, 5);

        return clicksScore + scrollScore + timeScore + modalsScore + themeScore;
    }

    function moodFromScore(score) {
        if (score < 20) return "Calm";
        if (score < 45) return "Exploring";
        if (score < 70) return "Engaged";
        if (score < 90) return "Focused";
        return "Power user";
    }

    function setDelta(elm, text) {
        if (!elm) return;
        elm.textContent = text;
        elm.style.opacity = "1";
        clearTimeout(elm._t);
        elm._t = setTimeout(() => { elm.style.opacity = ".65"; }, 550);
    }

    function render() {
        const score = computeScore();
        scoreEl.textContent = String(score);
        scoreFill.style.width = `${score}%`;

        const mood = moodFromScore(score);
        moodEl.textContent = mood;

        clicksEl.textContent = String(state.clicks);

        scrollEl.textContent = `${state.scrollDepth}%`;
        scrollFill.style.width = `${state.scrollDepth}%`;

        timeEl.textContent = formatTime(state.activeSeconds);

        if (focusEl) focusEl.textContent = state.focused ? "active" : "idle";

        if (modalsEl) modalsEl.textContent = String(state.modals);
        if (themesEl) themesEl.textContent = String(state.themes);

        // Hint changes based on behavior
        const idleFor = Date.now() - state.lastInteractTs;
        if (idleFor > 6000 && hintEl) {
            hintEl.textContent = "Tip: try opening a project modal or toggle the theme.";
        } else if (hintEl) {
            hintEl.textContent = "This panel updates in real time based on how you interact.";
        }
    }

    // ===== Track events =====
    function onClick(e) {
        if (state.paused) return;

        // ignore clicks within the analytics section buttons to avoid self-inflating too much
        const t = e.target;
        if (t && t.closest && t.closest("#interaction-score")) {
            // Still count, but lighter
            state.clicks += 0;
        } else {
            state.clicks += 1;
            setDelta(clicksDeltaEl, "+1");
        }

        // burst spark
        const now = Date.now();
        if (now - state.lastClickTs < 700) state.clicksBurst += 1;
        else state.clicksBurst = 1;
        state.lastClickTs = now;

        const sparkW = clamp((state.clicksBurst / state.maxClicksBurst) * 100, 0, 100);
        if (clicksSpark) clicksSpark.style.width = `${sparkW}%`;

        state.lastInteractTs = Date.now();
        render();
    }

    function computeScrollDepth() {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
        const y = window.scrollY || doc.scrollTop || 0;
        return clamp(Math.round((y / max) * 100), 0, 100);
    }

    function onScroll() {
        if (state.paused) return;

        const d = computeScrollDepth();
        state.scrollDepth = Math.max(state.scrollDepth, d);

        const delta = state.scrollDepth - state.lastScrollDepth;
        if (delta >= 3) {
            setDelta(scrollDeltaEl, `+${delta}%`);
            state.lastScrollDepth = state.scrollDepth;
        }

        state.lastInteractTs = Date.now();
        render();
    }

    // Focus/visibility
    window.addEventListener("focus", () => { state.focused = true; render(); });
    window.addEventListener("blur", () => { state.focused = false; render(); });

    document.addEventListener("visibilitychange", () => {
        state.focused = !document.hidden;
        render();
    });

    // Modals opened: detect when a modal becomes open (works with your .pf2-modal.open)
    const modalObserver = new MutationObserver(() => {
        if (state.paused) return;

        const openNow = document.querySelectorAll(".pf2-modal.open").length;
        // Count only increments on transition to open
        if (openNow > state.modals) {
            state.modals = openNow; // show current open count
            // But also increment "opened" metric:
            // Use a separate accumulator for opens
        }
    });

    // We will also increment when any element with class ".pf2-modal" gets "open"
    const body = document.body;
    if (body) {
        modalObserver.observe(body, { attributes: true, subtree: true, attributeFilter: ["class"] });
    }

    // Theme toggles: detect body class changes (assumes your theme uses body.light)
    let lastTheme = document.body.classList.contains("light") ? "light" : "dark";
    const themeObserver = new MutationObserver(() => {
        if (state.paused) return;
        const nowTheme = document.body.classList.contains("light") ? "light" : "dark";
        if (nowTheme !== lastTheme) {
            state.themes += 1;
            lastTheme = nowTheme;
            state.lastInteractTs = Date.now();
            render();
        }
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    // Precise modal open count (opened events):
    // Hook into clicks on elements that open modals: button "View Project" or center card
    document.addEventListener("click", (e) => {
        const t = e.target;
        if (!t || !t.closest) return;
        const isModalTrigger =
            t.closest("#pf2View") ||
            t.closest("#pf2CurCard") ||
            t.closest("[data-open-modal]") ||
            t.closest(".pf2-slot.is-center");

        if (isModalTrigger && !state.paused) {
            // increment opened counter
            state.modals += 1;
            state.lastInteractTs = Date.now();
            render();
        }
    }, true);

    // Timer
    let timer = setInterval(() => {
        if (state.paused) return;
        if (!state.focused) return;
        state.activeSeconds += 1;
        render();
    }, 1000);

    // Buttons
    resetBtn?.addEventListener("click", () => {
        state.clicks = 0;
        state.clicksBurst = 0;
        state.scrollDepth = 0;
        state.lastScrollDepth = 0;
        state.activeSeconds = 0;
        state.modals = 0;
        state.themes = 0;
        state.lastInteractTs = Date.now();
        if (clicksSpark) clicksSpark.style.width = "0%";
        if (scrollFill) scrollFill.style.width = "0%";
        setDelta(clicksDeltaEl, "+0");
        setDelta(scrollDeltaEl, "+0%");
        render();
    });

    pauseBtn?.addEventListener("click", () => {
        state.paused = !state.paused;
        pauseBtn.textContent = state.paused ? "Resume" : "Pause";
        setNote(state.paused ? "Paused." : "");
        render();
    });

    function setNote(txt) {
        if (!hintEl) return;
        if (!txt) return;
        hintEl.textContent = txt;
    }

    // Global listeners
    document.addEventListener("click", onClick, true);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Init
    render();
})();






// ===== LIVE USER FLOW =====
(() => {
    const nowEl = document.getElementById("flowNow");
    const nodesEl = document.getElementById("flowNodes");
    const edgesEl = document.getElementById("flowEdges");
    const listEl = document.getElementById("flowList");
    const countEl = document.getElementById("flowCount");
    const mostEl = document.getElementById("flowMost");
    const deepEl = document.getElementById("flowDeep");
    const timeEl = document.getElementById("flowTime");
    const barFill = document.getElementById("flowBarFill");
    const hintEl = document.getElementById("flowHint");
    const resetBtn = document.getElementById("flowReset");
    const pauseBtn = document.getElementById("flowPause");

    if (!nowEl || !nodesEl || !listEl) return;

    // Change these to match your real section ids
    const FLOW_SECTIONS = [
        { id: "home", label: "Home" },
        { id: "projects", label: "Portfolio" },          // if your portfolio section uses another id, change it
        { id: "collaboration", label: "Collaboration" },
        { id: "contact", label: "Contact" },
        { id: "interaction-score", label: "Score" },
        { id: "live-flow", label: "Flow" },
        { id: "component-sandbox", label: "Sandbox" }
    ];

    const state = {
        paused: false,
        current: null,
        last: null,
        transitions: [],
        visits: Object.fromEntries(FLOW_SECTIONS.map(s => [s.id, 0])),
        enteredAt: Date.now(),
        deepest: "—",
        deepestIndex: -1
    };

    function getSectionIndex(id) {
        return FLOW_SECTIONS.findIndex(s => s.id === id);
    }

    function formatAgo(ms) {
        const s = Math.max(0, Math.floor(ms / 1000));
        return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
    }

    function renderNodes() {
        nodesEl.innerHTML = "";
        FLOW_SECTIONS.forEach((s) => {
            const row = document.createElement("div");
            row.className = "flow-node" + (state.current === s.id ? " is-active" : "");
            row.dataset.flowId = s.id;

            row.innerHTML = `
        <div class="flow-node-left">
          <div class="flow-dot" aria-hidden="true"></div>
          <div class="flow-node-name">${s.label}</div>
        </div>
        <div class="flow-node-count">${state.visits[s.id]}x</div>
      `;

            row.addEventListener("click", () => {
                const target = document.getElementById(s.id);
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            });

            nodesEl.appendChild(row);
        });
    }

    function renderEdges() {
        edgesEl.innerHTML = "";
        // subtle line indicators for last transition
        const idxFrom = state.last ? getSectionIndex(state.last) : -1;
        const idxTo = state.current ? getSectionIndex(state.current) : -1;
        if (idxFrom < 0 || idxTo < 0 || idxFrom === idxTo) return;

        const min = Math.min(idxFrom, idxTo);
        const max = Math.max(idxFrom, idxTo);

        // Create a few horizontal lines at approximate y positions
        for (let i = min; i <= max; i++) {
            const edge = document.createElement("div");
            edge.className = "flow-edge is-on";
            // distribute along container: this maps to node list spacing
            const top = 86 + i * 54; // tuned for node spacing
            edge.style.top = `${top}px`;
            edgesEl.appendChild(edge);
        }
    }

    function renderLog() {
        listEl.innerHTML = "";
        const last8 = state.transitions.slice(-8).reverse();
        last8.forEach((t) => {
            const item = document.createElement("div");
            item.className = "flow-item";
            item.innerHTML = `
        <strong>${t.from} → ${t.to}</strong>
        <span>${t.when}</span>
      `;
            listEl.appendChild(item);
        });

        countEl && (countEl.textContent = String(state.transitions.length));
    }

    function renderHighlights() {
        // most visited
        let maxId = null, maxV = -1;
        for (const [id, v] of Object.entries(state.visits)) {
            if (v > maxV) { maxV = v; maxId = id; }
        }
        const mostLabel = FLOW_SECTIONS.find(s => s.id === maxId)?.label || "—";
        mostEl && (mostEl.textContent = mostLabel);

        // deepest
        deepEl && (deepEl.textContent = state.deepest);

        // time in current
        const ms = Date.now() - state.enteredAt;
        timeEl && (timeEl.textContent = formatAgo(ms));

        // progress bar: depth based on index of current section
        const idx = state.current ? getSectionIndex(state.current) : 0;
        const pct = Math.round(((idx + 1) / Math.max(1, FLOW_SECTIONS.length)) * 100);
        barFill && (barFill.style.width = `${pct}%`);
    }

    function setCurrent(id) {
        if (!id || state.current === id) return;

        state.last = state.current;
        state.current = id;

        // visits
        state.visits[id] = (state.visits[id] || 0) + 1;

        // deepest
        const idx = getSectionIndex(id);
        if (idx > state.deepestIndex) {
            state.deepestIndex = idx;
            state.deepest = FLOW_SECTIONS[idx]?.label || "—";
        }

        // log transition
        if (state.last) {
            const from = FLOW_SECTIONS.find(s => s.id === state.last)?.label || state.last;
            const to = FLOW_SECTIONS.find(s => s.id === id)?.label || id;
            state.transitions.push({ from, to, when: new Date().toLocaleTimeString() });
        }

        nowEl.textContent = FLOW_SECTIONS.find(s => s.id === id)?.label || "—";
        state.enteredAt = Date.now();

        renderNodes();
        renderEdges();
        renderLog();
        renderHighlights();

        if (hintEl) hintEl.textContent = "Flow is updating as you navigate.";
    }

    // Observe section visibility
    const targets = FLOW_SECTIONS
        .map(s => document.getElementById(s.id))
        .filter(Boolean);

    // If your page doesn't have all ids, this still works with existing ones.
    const io = new IntersectionObserver((entries) => {
        if (state.paused) return;

        // choose the most visible section
        let best = null;
        for (const e of entries) {
            if (!e.isIntersecting) continue;
            const ratio = e.intersectionRatio || 0;
            if (!best || ratio > best.ratio) {
                best = { id: e.target.id, ratio };
            }
        }
        if (best) setCurrent(best.id);
    }, { threshold: [0.35, 0.5, 0.65] });

    targets.forEach(t => io.observe(t));

    // Buttons
    resetBtn?.addEventListener("click", () => {
        state.last = null;
        state.current = null;
        state.transitions = [];
        state.visits = Object.fromEntries(FLOW_SECTIONS.map(s => [s.id, 0]));
        state.enteredAt = Date.now();
        state.deepest = "—";
        state.deepestIndex = -1;

        nowEl.textContent = "Home";
        barFill && (barFill.style.width = "0%");
        hintEl && (hintEl.textContent = "Tip: scroll to another section to see the route update.");

        renderNodes();
        renderEdges();
        renderLog();
        renderHighlights();
    });

    pauseBtn?.addEventListener("click", () => {
        state.paused = !state.paused;
        pauseBtn.textContent = state.paused ? "Resume" : "Pause";
        hintEl && (hintEl.textContent = state.paused ? "Paused. Resume to keep updating." : "Flow resumed.");
    });

    // Timer for time-in-current
    setInterval(() => {
        if (state.paused) return;
        if (!state.current) return;
        renderHighlights();
    }, 1000);

    // Init
    renderNodes();
    renderLog();
    renderHighlights();
})();





// ===== COMPONENT SANDBOX =====
(() => {
    const preview = document.getElementById("sbPreview");
    if (!preview) return;

    const r = document.getElementById("sbRadius");
    const p = document.getElementById("sbPadding");
    const s = document.getElementById("sbShadow");
    const b = document.getElementById("sbBlur");

    const rv = document.getElementById("sbRadiusV");
    const pv = document.getElementById("sbPaddingV");
    const sv = document.getElementById("sbShadowV");
    const bv = document.getElementById("sbBlurV");

    const tr = document.getElementById("sbTRadius");
    const tp = document.getElementById("sbTPad");
    const ts = document.getElementById("sbTShadow");
    const tb = document.getElementById("sbTBlur");

    const toast = document.getElementById("sbToast");
    const action = document.getElementById("sbAction");

    const presetMinimal = document.getElementById("sbPresetMinimal");
    const presetGlass = document.getElementById("sbPresetGlass");
    const reset = document.getElementById("sbReset");

    const defaults = { radius: 18, pad: 18, shadow: 42, blur: 8 };

    function apply(vals) {
        preview.style.setProperty("--radius", `${vals.radius}px`);
        preview.style.setProperty("--pad", `${vals.pad}px`);
        preview.style.setProperty("--shadow", `${vals.shadow}`);
        preview.style.setProperty("--blur", `${vals.blur}px`);

        if (r) r.value = String(vals.radius);
        if (p) p.value = String(vals.pad);
        if (s) s.value = String(vals.shadow);
        if (b) b.value = String(vals.blur);

        if (rv) rv.textContent = `${vals.radius}px`;
        if (pv) pv.textContent = `${vals.pad}px`;
        if (sv) sv.textContent = `${vals.shadow}`;
        if (bv) bv.textContent = `${vals.blur}px`;

        if (tr) tr.textContent = `${vals.radius}px`;
        if (tp) tp.textContent = `${vals.pad}px`;
        if (ts) ts.textContent = `${vals.shadow}`;
        if (tb) tb.textContent = `${vals.blur}px`;
    }

    function read() {
        return {
            radius: Number(r?.value || defaults.radius),
            pad: Number(p?.value || defaults.pad),
            shadow: Number(s?.value || defaults.shadow),
            blur: Number(b?.value || defaults.blur),
        };
    }

    function bindSlider(slider) {
        if (!slider) return;
        slider.addEventListener("input", () => apply(read()));
    }

    [r, p, s, b].forEach(bindSlider);

    presetMinimal?.addEventListener("click", () => apply({ radius: 14, pad: 16, shadow: 22, blur: 0 }));
    presetGlass?.addEventListener("click", () => apply({ radius: 22, pad: 20, shadow: 55, blur: 12 }));
    reset?.addEventListener("click", () => apply(defaults));

    // Micro interaction: small “pulse” + toast
    action?.addEventListener("click", () => {
        preview.animate(
            [
                { transform: "translateY(0)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ],
            { duration: 220, easing: "ease-out" }
        );

        if (toast) {
            toast.textContent = "Interaction fired.";
            clearTimeout(toast._t);
            toast._t = setTimeout(() => (toast.textContent = ""), 900);
        }
    });

    // Init
    apply(defaults);
})();



// ===== FOX SIGNATURE LAYER: global dock + page scanner + card motion =====
(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pageName = (() => {
        const file = getCurrentFile().replace(".html", "") || "home";
        const labels = {
            index: "Home",
            about: "About",
            projects: "Projects",
            services: "Services",
            collabs: "Collabs",
            contact: "Contact"
        };
        return labels[file] || file;
    })();

    const signature = document.createElement("div");
    signature.className = "fox-signature";
    signature.innerHTML = `
        <div class="fox-progress" aria-hidden="true"><span id="foxProgressFill"></span></div>
        <div class="fox-page-chip" id="foxPageChip">
            <span class="fox-page-dot" aria-hidden="true"></span>
            <strong>${pageName}</strong>
            <em id="foxPagePercent">0%</em>
        </div>
        <div class="fox-scanline" id="foxScanline" aria-hidden="true"></div>
        <div class="fox-dock" id="foxDock">
            <button class="fox-dock-toggle" type="button" id="foxDockToggle" aria-expanded="false" aria-label="Abrir Fox dock">
                <i class="fa-solid fa-bolt"></i>
            </button>
            <div class="fox-dock-menu" aria-label="Acciones rapidas">
                <button class="fox-action" type="button" data-fox-action="scan"><i class="fa-solid fa-wand-magic-sparkles"></i><span>Scan</span></button>
                <button class="fox-action" type="button" data-fox-action="focus"><i class="fa-solid fa-eye"></i><span>Focus</span></button>
                <button class="fox-action" type="button" data-fox-action="random"><i class="fa-solid fa-shuffle"></i><span>Jump</span></button>
                <button class="fox-action" type="button" data-fox-action="copy"><i class="fa-regular fa-copy"></i><span>Email</span></button>
            </div>
        </div>
    `;
    document.body.appendChild(signature);

    const progressFill = document.getElementById("foxProgressFill");
    const pagePercent = document.getElementById("foxPagePercent");
    const dock = document.getElementById("foxDock");
    const dockToggle = document.getElementById("foxDockToggle");
    const scanline = document.getElementById("foxScanline");

    function getScrollPercent() {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
        return Math.round(((window.scrollY || doc.scrollTop || 0) / max) * 100);
    }

    function updateProgress() {
        const percent = getScrollPercent();
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (pagePercent) pagePercent.textContent = `${percent}%`;
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    dockToggle?.addEventListener("click", () => {
        const open = !dock?.classList.contains("open");
        dock?.classList.toggle("open", open);
        dockToggle.setAttribute("aria-expanded", open ? "true" : "false");
        showToast(open ? "Fox dock abierto" : "Fox dock cerrado");
    });

    function scanPage() {
        const interactiveCount = $$("a, button, input, textarea, .info-card, .case-card, .portfolio-panel").length;
        const sectionCount = $$("section, main").length;

        scanline?.classList.remove("run");
        void scanline?.offsetWidth;
        scanline?.classList.add("run");

        document.body.classList.add("fox-scan-active");
        window.setTimeout(() => document.body.classList.remove("fox-scan-active"), 1000);
        showToast(`Scan: ${sectionCount} zonas y ${interactiveCount} puntos interactivos`);
    }

    function toggleFocusMode() {
        const isOn = document.body.classList.toggle("focus-mode");
        localStorage.setItem("sf_focus_mode", isOn ? "on" : "off");
        showToast(isOn ? "Focus mode activo" : "Focus mode off");
    }

    if (localStorage.getItem("sf_focus_mode") === "on") {
        document.body.classList.add("focus-mode");
    }

    function jumpSomewhere() {
        const localTargets = $$("section[id], main[id]").filter(el => el.offsetParent !== null);
        if (localTargets.length > 1) {
            const currentY = window.scrollY;
            const options = localTargets.filter(el => Math.abs(el.getBoundingClientRect().top + currentY - currentY) > 80);
            const target = (options.length ? options : localTargets)[Math.floor(Math.random() * (options.length ? options.length : localTargets.length))];
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            showToast(`Jump: ${target.id || "section"}`);
            return;
        }

        const pages = ["index.html", "about.html", "projects.html", "services.html", "collabs.html", "contact.html"];
        const current = getCurrentFile();
        const nextPages = pages.filter(page => page !== current);
        window.location.href = nextPages[Math.floor(Math.random() * nextPages.length)];
    }

    async function copyEmail() {
        const email = "Sebasfox0510@gmail.com";
        try {
            await navigator.clipboard.writeText(email);
            showToast("Email copiado");
        } catch {
            const ta = document.createElement("textarea");
            ta.value = email;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
            showToast("Email copiado");
        }
    }

    dock?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-fox-action]");
        if (!button) return;

        const action = button.dataset.foxAction;
        if (action === "scan") scanPage();
        if (action === "focus") toggleFocusMode();
        if (action === "random") jumpSomewhere();
        if (action === "copy") copyEmail();
    });

    document.addEventListener("keydown", (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea") return;

        if (event.key.toLowerCase() === "f") {
            toggleFocusMode();
        }
        if (event.key === "/") {
            event.preventDefault();
            dockToggle?.click();
        }
    });

    if (!prefersReduced) {
        const reactiveCards = $$(".info-card, .case-card, .portfolio-panel, .metric-card, .package-card, .timeline-item, .faq-item, .collab-panel, .service-estimator");
        reactiveCards.forEach(card => {
            card.classList.add("reactive-surface");

            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const px = x / rect.width - .5;
                const py = y / rect.height - .5;

                card.style.setProperty("--mx", `${x}px`);
                card.style.setProperty("--my", `${y}px`);
                card.style.setProperty("--rx", `${(-py * 3).toFixed(2)}deg`);
                card.style.setProperty("--ry", `${(px * 3).toFixed(2)}deg`);
            });

            card.addEventListener("pointerleave", () => {
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
            });
        });
    }
})();
