/* ================================================================
   TRACKS.JS — صفحة اختيار المسار فقط
   نفس منطق initNav / initAOS المستخدم في صفحات الـ Tracks التفصيلية،
   زائد theme/lang toggle شغالة فعليًا (مش موجودة في app.js الأصلي).
   ================================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ============================================================
   NAV — scrolled shadow state
   ============================================================ */
function initNav() {
  const nav = $("#mainNav");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ============================================================
   REVEAL ON SCROLL (same IntersectionObserver pattern as app.js)
   ============================================================ */
function initAOS() {
  const els = $$("[data-aos]");
  if (!els.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.aosDelay || "0", 10);
          setTimeout(() => entry.target.classList.add("aos-animate"), delay);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );

  els.forEach((el) => obs.observe(el));
}

/* ============================================================
   THEME TOGGLE (dark / light) — persisted in localStorage
   ============================================================ */
function initThemeToggle() {
  const btn = $("#themeToggle");
  const iconLight = $("#iconLight");
  const iconDark = $("#iconDark");
  if (!btn) return;

  const apply = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (iconLight && iconDark) {
      iconLight.style.display = theme === "dark" ? "inline-block" : "none";
      iconDark.style.display = theme === "dark" ? "none" : "inline-block";
    }
    localStorage.setItem("a3det-theme", theme);
  };

  const saved = localStorage.getItem("a3det-theme") || "dark";
  apply(saved);

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    apply(current === "dark" ? "light" : "dark");
  });
}

/* ============================================================
   LANGUAGE TOGGLE — AR / EN label only on this page
   (full i18n dictionary lives with each track page; this page
   keeps a lightweight EN fallback for its own static strings)
   ============================================================ */
const TRACKS_I18N_EN = {
  ".nav-link-item:nth-of-type(1)": "All Tracks",
  ".nav-link-item:nth-of-type(2)": "How It Works"
};

function initLangToggle() {
  const btn = $("#langToggle");
  const label = $("#langLabel");
  if (!btn) return;

  let current = localStorage.getItem("a3det-lang") || "ar";

  const apply = (lang) => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("data-lang", lang);
    if (label) label.textContent = lang.toUpperCase();
    localStorage.setItem("a3det-lang", lang);
  };

  apply(current);

  btn.addEventListener("click", () => {
    current = current === "ar" ? "en" : "ar";
    apply(current);
  });
}

/* ============================================================
   TRACK CARDS — keyboard accessibility + click feedback
   ============================================================ */
function initTrackCards() {
  $$(".track-select-card").forEach((card) => {
    if (card.classList.contains("is-disabled")) return;

    // Allow Enter key activation when focused (anchor already supports click/Enter,
    // this just adds a small press animation for consistency with the rest of the UI).
    card.addEventListener("mousedown", () => card.style.transform = "translateY(-4px) scale(0.99)");
    card.addEventListener("mouseup", () => card.style.transform = "");
    card.addEventListener("mouseleave", () => card.style.transform = "");
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initAOS();
  initThemeToggle();
  initLangToggle();
  initTrackCards();
});
