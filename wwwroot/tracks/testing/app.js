"use strict";

/* ============================================================
   FRAMEWORKS / TESTING TYPES DATA
   ============================================================ */
const FRAMEWORKS = {
  unit: {
    name: "Unit Testing",
    tagline: "Test the smallest piece of code in isolation",
    icon: '<i class="fa-solid fa-cube" style="color:#ff4757"></i>',
    iconColor: "#ff4757",
    desc: `الـ Unit Testing هو اختبار أصغر جزء من الكود بشكل منعزل — زي function أو method واحدة. الفكرة إنك بتتأكد إن كل حتة صغيرة شغالة صح قبل ما تجمعها مع بعض. ده أسرع أنواع الـ Testing وأرخصها وأكثرها فائدة على المدى البعيد.`,
    meta: {
      level: "المستوى الأول",
      speed: "ثوان",
      scope: "Function / Method",
      tools: "Jest / PyTest / JUnit",
    },
    pros: [
      "سريع جداً — بيشتغل في ثوان",
      "بيكتشف الـ Bugs بدري قبل ما يتراكموا",
      "بيسهّل الـ Refactoring بدون خوف",
      "بيوثق الكود ويوضح الغرض من كل function",
    ],
    cons: [
      "مش بيكتشف مشاكل الـ Integration بين الأجزاء",
      "لو الكود مش معمول Mock صح بيبقى صعب",
      "كتابة tests كتير ممكن تاخد وقت",
    ],
    verdict: "ابدأ هنا. الـ Unit Testing هو الأساس اللي كل تراك تاني بيتبني عليه. Jest للـ JavaScript، PyTest للـ Python، JUnit للـ Java.",
  },

  integration: {
    name: "Integration Testing",
    tagline: "Test how components work together",
    icon: '<i class="fa-solid fa-link" style="color:#5eba87"></i>',
    iconColor: "#5eba87",
    desc: `الـ Integration Testing بيختبر إزاي الأجزاء بتتكلم مع بعض — الـ API مع الـ Database، الـ Service مع التاني، أو الـ Frontend مع الـ Backend. حتى لو كل جزء شغال لوحده صح، ممكن يتعطلوا لما يتجمعوا مع بعض.`,
    meta: {
      level: "المستوى التاني",
      speed: "ثوان — دقائق",
      scope: "Components / APIs",
      tools: "Postman / REST Assured / Supertest",
    },
    pros: [
      "بيكتشف مشاكل الـ Integration المخفية",
      "بيتأكد إن الـ APIs شغالة صح",
      "أشمل من Unit Testing في كتير من الحالات",
      "ممكن يشتغل مع Test Containers للـ Database",
    ],
    cons: [
      "أبطأ من Unit Testing",
      "يحتاج بيئة أقرب للـ Production",
      "تحديد سبب الفشل ممكن يكون أصعب",
    ],
    verdict: "مهم جداً للـ APIs والـ Microservices. Postman للاختبار اليدوي، REST Assured أو Supertest للأوتوماتيك.",
  },

  e2e: {
    name: "E2E Testing",
    tagline: "Test the full user journey from start to finish",
    icon: '<i class="fa-solid fa-display" style="color:#a55eea"></i>',
    iconColor: "#a55eea",
    desc: `الـ End-to-End Testing بيحاكي المستخدم الحقيقي — بيفتح المتصفح، بيضغط على أزرار، بيملا forms، وبيتأكد إن كل الـ Flow شغال من الأول للآخر. ده أشمل نوع Testing لكن الأبطأ والأغلى.`,
    meta: {
      level: "المستوى التالت",
      speed: "دقائق — ساعات",
      scope: "Full User Flow",
      tools: "Cypress / Playwright / Selenium",
    },
    pros: [
      "أكتر نوع يعكس تجربة المستخدم الحقيقية",
      "بيكتشف مشاكل مش بتظهر في Unit/Integration",
      "Cypress وPlaywright سهلين جداً في البداية",
      "بيعطيك ثقة قبل كل Release",
    ],
    cons: [
      "بطيء جداً مقارنة بالأنواع التانية",
      "Flaky Tests — ممكن يفشل بدون سبب واضح",
      "يحتاج maintenance دوري",
    ],
    verdict: "Cypress هو الأسهل للبداية لو Frontend. Playwright بيدعم أكتر من متصفح. اعمله قبل كل Release مهم.",
  },

  performance: {
    name: "Performance Testing",
    tagline: "How does your app behave under load?",
    icon: '<i class="fa-solid fa-gauge-high" style="color:#ffa502"></i>',
    iconColor: "#ffa502",
    desc: `الـ Performance Testing بيسأل سؤال واحد مهم: التطبيق هيتحمل الضغط ولا لا؟ بيحاكي آلاف المستخدمين في نفس الوقت ويشوف السيرفر هيستجيب إزاي. Load Testing، Stress Testing، وSpike Testing كلهم تحت المظلة دي.`,
    meta: {
      level: "متقدم",
      speed: "دقائق — ساعات",
      scope: "System / Infrastructure",
      tools: "JMeter / k6 / Gatling / Locust",
    },
    pros: [
      "بيكتشف الـ Bottlenecks قبل الـ Launch",
      "بيحدد عدد المستخدمين اللي السيرفر يتحملهم",
      "k6 وLocust سهلين للكتابة بالكود",
      "ضروري قبل أي حدث أو Launch ضخم",
    ],
    cons: [
      "يحتاج بيئة مشابهة للـ Production",
      "النتائج بتختلف حسب الـ Infrastructure",
      "يحتاج تحليل دقيق للنتائج",
    ],
    verdict: "ضروري قبل أي Launch كبير. k6 الأسهل لو بتكتب الكود. JMeter الأشمل. Locust لو بتحب Python.",
  },

  security: {
    name: "Security Testing",
    tagline: "Find vulnerabilities before hackers do",
    icon: '<i class="fa-solid fa-shield-halved" style="color:#3dc1d3"></i>',
    iconColor: "#3dc1d3",
    desc: `الـ Security Testing بيدور على الثغرات قبل ما الهاكرز يلاقوها. SQL Injection، XSS، CSRF، Authentication Bypass — كلها حاجات لازم تتاختبر. OWASP بيديك قايمة بأشهر 10 ثغرات لازم تتأكد منهم في أي تطبيق.`,
    meta: {
      level: "متقدم",
      speed: "ساعات — أيام",
      scope: "Full Application",
      tools: "OWASP ZAP / Burp Suite / Snyk",
    },
    pros: [
      "بيحمي المستخدمين وبيانتهم",
      "OWASP ZAP أداة مجانية وقوية",
      "Snyk بيعمل Scan تلقائي في الـ CI/CD",
      "بيرفع ثقة العملاء في المنتج",
    ],
    cons: [
      "يحتاج خبرة متخصصة في الأمان",
      "Burp Suite المدفوع غالي",
      "Penetration Testing الكامل يحتاج متخصص",
    ],
    verdict: "ابدأ بـ OWASP Top 10 — وتأكد إن تطبيقك محمي منهم. Snyk سهل تضيفه في الـ CI/CD من أول يوم.",
  },
};

/* ============================================================
   QUIZ DATA
   ============================================================ */
const QUIZ_QUESTIONS = [
  {
    question: "إيه اللي بيهمك أكتر في شغلك؟",
    options: [
      { text: "إن كل function تشتغل صح بالظبط",    emoji: "", weight: { unit: 4, integration: 1 } },
      { text: "إن الأجزاء تتكلم مع بعض بشكل سليم",  emoji: "", weight: { integration: 4, unit: 1 } },
      { text: "إن المستخدم يقدر يكمل رحلته من الأول للآخر", emoji: "", weight: { e2e: 4, integration: 1 } },
      { text: "إن السيستم يتحمل الضغط وما يقعش",    emoji: "", weight: { performance: 4, security: 1 } },
    ],
  },
  {
    question: "إيه اللي بيخوفك أكتر في أي تطبيق؟",
    options: [
      { text: "Bug في منتصف الـ Logic الأساسي",       emoji: "", weight: { unit: 3, integration: 2 } },
      { text: "الـ API بتتكسر مع بعض",                emoji: "", weight: { integration: 4, e2e: 1 } },
      { text: "المستخدم مش قادر يكمل عملية مهمة",    emoji: "", weight: { e2e: 4, performance: 1 } },
      { text: "هاكر يسرق بيانات المستخدمين",         emoji: "", weight: { security: 5 } },
    ],
  },
  {
    question: "إيه اللي بيوصف أسلوب شغلك أكتر؟",
    options: [
      { text: "بكتب Tests وأنا بكتب الكود (TDD)",     emoji: "", weight: { unit: 4, integration: 1 } },
      { text: "بتأكد إن الـ APIs شغالة قبل ما أكمل", emoji: "", weight: { integration: 4, e2e: 1 } },
      { text: "بجرب كل الـ flows قبل أي Deployment",  emoji: "", weight: { e2e: 3, performance: 2 } },
      { text: "بعمل Load Test قبل أي Launch كبير",    emoji: "", weight: { performance: 4, security: 1 } },
    ],
  },
];

/* ============================================================
   ROADMAP
   ============================================================ */
const ROADMAP_STEPS = [
  {
    step: "Step 01",
    title: "افهم ليه Testing ضروري",
    desc: "الخطوة الأولى مش تعلم أداة — هي تغيير طريقة التفكير. افهم إن Testing مش إضافة على الكود، هو جزء من الكود. اقرا عن Testing Pyramid وفهم الفرق بين Unit وIntegration وE2E.",
    duration: "أسبوع",
  },
  {
    step: "Step 02",
    title: "ابدأ بـ Unit Testing — Jest أو PyTest",
    desc: "اختار اللغة اللي بتشتغل بيها. JavaScript؟ ابدأ بـ Jest. Python؟ PyTest. Java؟ JUnit. اكتب أول test بسيط لـ function بتجمع عددين — وشوف إيه اللي بيحصل لما الـ Test يفشل.",
    duration: "أسبوعان",
  },
  {
    step: "Step 03",
    title: "تعلم مفهوم Mocking والـ Test Doubles",
    desc: "في Unit Testing محتاج تعزل الـ function من الـ Database والـ APIs. Mock هو بديل مزيف بيحاكي السلوك الحقيقي. ده من أهم المفاهيم اللي هتحتاجها في أي Test كمال.",
    duration: "أسبوعان",
  },
  {
    step: "Step 04",
    title: "انتقل لـ Integration Testing مع APIs",
    desc: "بعد الـ Unit، اتعلم إزاي تختبر الـ API Endpoints. Postman للاختبار اليدوي أولاً — بعدين Supertest لو Node.js أو REST Assured لو Java. اتأكد إن الـ CRUD operations شغالة صح.",
    duration: "شهر",
  },
  {
    step: "Step 05",
    title: "جرب Cypress أو Playwright للـ E2E",
    desc: "Cypress هو الأسهل للبداية — بيفتح متصفح حقيقي ويعمل كل حاجة أوتوماتيك. اكتب Test بيسجل دخول، يضيف منتج، ويتأكد إنه اتضاف صح. ده أقرب حاجة لتجربة المستخدم الحقيقية.",
    duration: "شهر",
  },
  {
    step: "Step 06",
    title: "ادمج الـ Tests في الـ CI/CD",
    desc: "الـ Tests الاحسن من غير أوتوماشن في الـ Pipeline زي السيارة من غير محرك. اتعلم GitHub Actions أو GitLab CI — وخلي الـ Tests تشتغل أوتوماتيك مع كل Push. ده اللي بيفرق بين هواية وشغل Professional.",
    duration: "أسبوعان",
  },
];

/* ============================================================
   UTILS
   ============================================================ */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* ============================================================
   NAV
   ============================================================ */
function initNav() {
  window.addEventListener("scroll", () => {
    $("#mainNav").classList.toggle("scrolled", window.scrollY > 60);
  });
  $$(".nav-link-item, .btn-primary-custom, .btn-secondary-custom").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = $(href);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ============================================================
   AOS
   ============================================================ */
function initAOS() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const d = parseInt(e.target.dataset.aosDelay || "0");
          setTimeout(() => e.target.classList.add("aos-animate"), d);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );
  $$("[data-aos]").forEach((el) => obs.observe(el));
}

/* ============================================================
   FRAMEWORK TABS
   ============================================================ */
function renderFrameworkPanel(key) {
  const fw = FRAMEWORKS[key];
  if (!fw) return;

  const metaKeys = {
    unit:        ["المستوى","السرعة","النطاق","الأدوات"],
    integration: ["المستوى","السرعة","النطاق","الأدوات"],
    e2e:         ["المستوى","السرعة","النطاق","الأدوات"],
    performance: ["المستوى","السرعة","النطاق","الأدوات"],
    security:    ["المستوى","السرعة","النطاق","الأدوات"],
  };
  const labels = metaKeys[key] || ["المستوى","السرعة","النطاق","الأدوات"];
  const metaValues = Object.values(fw.meta);

  $("#fwPanel").innerHTML = `
    <div class="fw-panel-inner">
      <div class="fw-panel-main">
        <div class="fw-panel-header">
          <div class="fw-panel-icon">${fw.icon}</div>
          <div>
            <div class="fw-panel-name">${fw.name}</div>
            <div class="fw-panel-tagline">${fw.tagline}</div>
          </div>
        </div>
        <p class="fw-panel-desc">${fw.desc}</p>
        <div class="fw-meta-grid">
          ${labels.map((label, i) => `
            <div class="fw-meta-item">
              <div class="fw-meta-label">${label}</div>
              <div class="fw-meta-value">${metaValues[i]}</div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="fw-side">
        <div class="fw-pros-cons pros">
          <h5><i class="fa-solid fa-thumbs-up me-2"></i>المميزات</h5>
          ${fw.pros.map((p) => `<div class="fw-list-item"><i class="fa-solid fa-check"></i><span>${p}</span></div>`).join("")}
        </div>
        <div class="fw-pros-cons cons">
          <h5><i class="fa-solid fa-thumbs-down me-2"></i>العيوب</h5>
          ${fw.cons.map((c) => `<div class="fw-list-item"><i class="fa-solid fa-xmark"></i><span>${c}</span></div>`).join("")}
        </div>
        <div class="fw-verdict">
          <h5><i class="fa-solid fa-lightbulb me-2"></i>الحكم النهائي</h5>
          <p>${fw.verdict}</p>
        </div>
      </div>
    </div>
  `;
}

function initFrameworkTabs() {
  const tabs = $$("#fwTabs .fw-tab");
  renderFrameworkPanel("unit");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderFrameworkPanel(tab.dataset.fw);
    });
  });
}

/* ============================================================
   PERF BARS
   ============================================================ */
function initPerfBars() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const perf = parseInt(e.target.dataset.perf);
          e.target.style.setProperty("--perf-width", perf + "%");
          e.target.classList.add("animated");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  $$(".perf-bar").forEach((b) => obs.observe(b));
}

/* ============================================================
   QUIZ
   ============================================================ */
let quizAnswers = {};
let currentQuestion = 0;

function calcResult() {
  const scores = { unit: 0, integration: 0, e2e: 0, performance: 0, security: 0 };
  Object.values(quizAnswers).forEach((weights) => {
    Object.entries(weights).forEach(([fw, score]) => {
      if (scores[fw] !== undefined) scores[fw] += score;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

const RESULT_LABELS = {
  unit:        "Unit Testing",
  integration: "Integration Testing",
  e2e:         "E2E Testing",
  performance: "Performance Testing",
  security:    "Security Testing",
};

function renderQuizResult(fwKey) {
  const fw = FRAMEWORKS[fwKey];
  $("#quizProgressFill").style.width = "100%";
  $("#quizStepIndicator").textContent = "النتيجة ";

  $("#quizContent").innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-icon">${fw.icon}</div>
      <h3>النوع الأنسب ليك</h3>
      <div class="quiz-result-fw">${fw.name}</div>
      <p>${fw.verdict}</p>
      <button class="quiz-restart" id="quizRestart">
        <i class="fa-solid fa-rotate-right me-2"></i>جرب تاني
      </button>
    </div>
  `;

  $("#quizRestart").addEventListener("click", () => {
    quizAnswers = {};
    currentQuestion = 0;
    renderQuizQuestion(0);
  });
}

function renderQuizQuestion(index) {
  const q = QUIZ_QUESTIONS[index];
  const fill = $("#quizProgressFill");
  const indicator = $("#quizStepIndicator");

  fill.style.width = ((index + 1) / QUIZ_QUESTIONS.length) * 100 + "%";
  indicator.textContent = `السؤال ${index + 1} من ${QUIZ_QUESTIONS.length}`;

  $("#quizContent").innerHTML = `
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-option="${i}">
          <span class="quiz-option-icon">${opt.emoji}</span>
          <span>${opt.text}</span>
        </button>
      `).join("")}
    </div>
  `;

  $$(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      quizAnswers[index] = QUIZ_QUESTIONS[index].options[parseInt(btn.dataset.option)].weight;
      if (index + 1 < QUIZ_QUESTIONS.length) {
        currentQuestion = index + 1;
        renderQuizQuestion(currentQuestion);
      } else {
        renderQuizResult(calcResult());
      }
    });
  });
}

function initQuiz() {
  renderQuizQuestion(0);
}

/* ============================================================
   ROADMAP
   ============================================================ */
function initRoadmap() {
  const timeline = $("#roadmapTimeline");
  if (!timeline) return;

  timeline.innerHTML = ROADMAP_STEPS.map((step, i) => `
    <div class="roadmap-item" data-aos="fade-right" data-aos-delay="${i * 80}">
      <div class="roadmap-dot"></div>
      <div class="roadmap-content">
        <div class="roadmap-step-tag">${step.step}</div>
        <div class="roadmap-title">${step.title}</div>
        <div class="roadmap-desc">${step.desc}</div>
        <div class="roadmap-duration">
          <i class="fa-regular fa-clock"></i>
          <span>${step.duration}</span>
        </div>
      </div>
    </div>
  `).join("");
}

/* ============================================================
   CODE TYPEWRITER
   ============================================================ */
function initCodeTypewriter() {
  const block = $("#heroCodeBlock");
  if (!block) return;
  block.querySelectorAll(".code-line").forEach((line, i) => {
    line.style.opacity = "0";
    line.style.transform = "translateX(10px)";
    setTimeout(() => {
      line.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      line.style.opacity = "1";
      line.style.transform = "translateX(0)";
    }, 800 + i * 150);
  });
}

/* ============================================================
   KEYBOARD SHORTCUT  — press T to cycle testing types
   ============================================================ */
function initKeyboardShortcuts() {
  const keys = Object.keys(FRAMEWORKS);
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "t" && e.target.tagName !== "INPUT") {
      idx = (idx + 1) % keys.length;
      const fwKey = keys[idx];
      $$("#fwTabs .fw-tab").forEach((t) => {
        t.classList.toggle("active", t.dataset.fw === fwKey);
      });
      renderFrameworkPanel(fwKey);
      $("#frameworks")?.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* ============================================================
   ACTIVE NAV
   ============================================================ */
function initActiveNav() {
  const navLinks = $$(".nav-link-item");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = link.getAttribute("href") === "#" + e.target.id
              ? "var(--primary)" : "";
          });
        }
      });
    },
    { threshold: 0.4, rootMargin: "-80px 0px 0px 0px" }
  );
  $$("section[id]").forEach((s) => obs.observe(s));
}

/* ============================================================
   CURSOR
   ============================================================ */
function initCursor() {
  const dot = document.createElement("div");
  dot.style.cssText = `position:fixed;width:8px;height:8px;background:var(--primary);border-radius:50%;pointer-events:none;z-index:9998;transition:transform .1s ease;opacity:0;mix-blend-mode:difference;`;
  document.body.appendChild(dot);
  document.addEventListener("mousemove", (e) => {
    dot.style.opacity = "1";
    dot.style.left = e.clientX - 4 + "px";
    dot.style.top  = e.clientY - 4 + "px";
  });
  document.addEventListener("mouseleave", () => dot.style.opacity = "0");
  document.querySelectorAll("button, a, .fw-tab, .quiz-option, .pillar-card").forEach((el) => {
    el.addEventListener("mouseenter", () => dot.style.transform = "scale(3)");
    el.addEventListener("mouseleave", () => dot.style.transform = "scale(1)");
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initAOS();
  initFrameworkTabs();
  initPerfBars();
  initQuiz();
  initRoadmap();
  initCodeTypewriter();
  initKeyboardShortcuts();
  initActiveNav();
  initCursor();

  setTimeout(() => {
    $$("[data-aos]:not(.aos-animate)").forEach((el) => el.classList.add("aos-animate"));
  }, 2000);

  console.log(
    "%c [ Testing Guide ] ",
    "background:#ff4757;color:#fff;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;"
  );
  console.log(
    "%cنصيحة: اضغط حرف 'T' للتنقل بين أنواع Testing بسرعة! ",
    "color:#ff4757;font-family:monospace;font-size:12px;"
  );
});