"use strict";

/* ============================================================
   FRAMEWORKS DATA
   ============================================================ */
const FRAMEWORKS = {
  flutter: {
    name: "Flutter",
    tagline: "Google's UI toolkit — one codebase, every screen",
    icon: '<i class="bi bi-phone-landscape-fill" style="color:#54c5f8"></i>',
    iconColor: "#54c5f8",
    desc: `Flutter صنعته Google وأعلن عنه سنة 2018، وبسرعة جنونية بقى أشهر Framework لـ Cross-Platform Mobile. الفكرة الجوهرية إنه مش بيستخدم الـ Native Widgets — بيرسم كل حاجة بنفسه باستخدام Skia وImpeiler Rendering Engine. ده بيدي Pixel-Perfect UI متطابق على iOS وAndroid. لغته Dart سهلة وسريعة. Flutter مش بس Mobile — بيشتغل كمان على Web وDesktop وEmbedded.`,
    meta: {
      creator: "Google",
      year: "2018",
      type: "Cross-Platform Framework",
      used_by: "BMW, Alibaba, eBay, Nubank",
    },
    pros: [
      "كود واحد لـ iOS + Android + Web + Desktop",
      "Hot Reload — بتشوف التغييرات فوراً من غير ما تعيد التشغيل",
      "Pixel-Perfect UI — نفس الشكل بالظبط على كل جهاز",
      "Dart سهلة التعلم وقريبة من Java وC#",
    ],
    cons: [
      "Dart مش شائعة خارج Flutter — ما ينفعش كتير في حاجات تانية",
      "App Size أكبر شوية من Native",
      "بعض الـ Platform-specific features محتاجة Plugins",
    ],
    verdict: "أفضل اختيار للمبتدئ في 2025. مجاني، Community ضخم، وبـ job market قوي. ابدأ بيه من أول يوم وهتغطي iOS وAndroid بكود واحد.",
  },

  rn: {
    name: "React Native",
    tagline: "JavaScript everywhere — even in your pocket",
    icon: '<i class="bi bi-phone-fill" style="color:#61dafb"></i>',
    iconColor: "#61dafb",
    desc: `React Native صنعته Meta سنة 2015 وخلّى ملايين الـ Web Developers يدخلوا عالم Mobile. بيستخدم JavaScript وReact — نفس المفاهيم اللي بتشتغل بيها على الـ Web. بدل ما يرسم الـ UI لوحده زي Flutter، بيتكلم مع الـ Native Components. ده بيدي Look & Feel أقرب للـ Platform. Expo بيخلي البداية أسهل بكتير من غير ما تفهم Native Build Systems.`,
    meta: {
      creator: "Meta (Facebook)",
      year: "2015",
      type: "Cross-Platform Framework",
      used_by: "Facebook, Shopify, Discord, Wix",
    },
    pros: [
      "JavaScript — لو بتعرف React، نص الشغل اتعمل",
      "Expo — ابدأ من غير ما تفتح Xcode أو Android Studio",
      "Over-the-Air Updates — بتحدّث التطبيق من غير App Store",
      "Community ضخم وفيه libraries لكل حاجة",
    ],
    cons: [
      "Performance أقل من Flutter في الـ Animations المعقدة",
      "JavaScript Bridge ممكن يسبب Bottlenecks",
      "Debug أصعب أحياناً لما الـ Native Code بيتدخل",
    ],
    verdict: "لو عارف JavaScript وReact — ابدأ هنا فوراً. وقت التعلم هيتقلص بشكل كبير. Expo هو الطريق الأسرع لأول تطبيق.",
  },

  swift: {
    name: "Swift + SwiftUI",
    tagline: "Apple's modern language — built for the Apple ecosystem",
    icon: '<i class="bi bi-apple" style="color:#f05138"></i>',
    iconColor: "#f05138",
    desc: `Swift ظهرت سنة 2014 كبديل لـ Objective-C. Apple صممتها تكون سريعة وآمنة وعصرية. SwiftUI هو الـ Framework الجديد لبناء الـ UI — Declarative زي React وFlutter. لو هدفك iOS App أو macOS App أو أي حاجة في الـ Apple Ecosystem — Swift هي الطريق الصح والرسمي. الـ Performance مش أحسن من Kotlin في الغالب — كلهم Native.`,
    meta: {
      creator: "Apple",
      year: "2014",
      type: "Native iOS Development",
      used_by: "كل تطبيقات Apple الرسمية",
    },
    pros: [
      "Native iOS — أعلى أداء ممكن على iPhone وiPad",
      "SwiftUI — Declarative UI حديثة وجميلة",
      "وصول كامل لكل APIs الخاصة بـ Apple",
      "Xcode Preview — بتشوف الـ UI تغيير فوري",
    ],
    cons: [
      "iOS فقط — مش بيشتغل على Android",
      "محتاج Mac لتطوير iOS (مش اختياري)",
      "SwiftUI لسه بيتطور — بعض الـ features ناقصة",
    ],
    verdict: "اختارها لو هدفك iOS فقط وعندك Mac. لو عايز تغطي Android كمان — فكر في Flutter أو React Native.",
  },

  kotlin: {
    name: "Kotlin + Jetpack Compose",
    tagline: "The modern way to build Android apps",
    icon: '<i class="bi bi-android2" style="color:#7f52ff"></i>',
    iconColor: "#7f52ff",
    desc: `Kotlin ظهرت سنة 2011 وأصبحت لغة Android الرسمية سنة 2017 بعد ما Google أعلنت دعمها. مصممة فوق JVM بس أنظف وأأمن من Java بكتير. Jetpack Compose هو الـ Modern UI Toolkit من Google — Declarative وسهل. لو هدفك Android App بأعلى أداء ممكن مع وصول كامل لكل Android APIs — Kotlin هي الطريق.`,
    meta: {
      creator: "JetBrains + Google",
      year: "2011",
      type: "Native Android Development",
      used_by: "Google, Pinterest, Coursera, Evernote",
    },
    pros: [
      "Native Android — أعلى أداء وأقل استهلاك للبطارية",
      "Jetpack Compose — Declarative UI حديثة من Google",
      "وصول كامل لكل Android APIs والـ Hardware",
      "Coroutines — Async Programming سهل وقوي",
    ],
    cons: [
      "Android فقط — مش بيشتغل على iOS",
      "Jetpack Compose لسه بيتطور مع بعض الـ quirks",
      "Android Fragmentation — كتير من الأجهزة بـ Android versions قديمة",
    ],
    verdict: "اختاره لو هدفك Android فقط. لو عايز iOS كمان — Flutter أو React Native أذكى. الـ Job Market لـ Android Native لسه قوي جداً.",
  },

  maui: {
    name: ".NET MAUI",
    tagline: "Microsoft's cross-platform framework for .NET developers",
    icon: '<i class="bi bi-microsoft" style="color:#512bd4"></i>',
    iconColor: "#512bd4",
    desc: `.NET MAUI (Multi-platform App UI) هو خليفة Xamarin من Microsoft. لو عندك خلفية C# وعارف .NET — ده أسرع طريق ليك لـ Mobile Development. بيشتغل على iOS وAndroid وWindows وmacOS من كود واحد. مش الأشهر في Mobile لكن في بيئات Enterprise اللي بيشتغلوا بـ Microsoft Stack ده بيفرق.`,
    meta: {
      creator: "Microsoft",
      year: "2022",
      type: "Cross-Platform .NET Framework",
      used_by: "Enterprise & Microsoft ecosystem",
    },
    pros: [
      "C# — لو جاي من .NET عالم مألوف",
      "iOS + Android + Windows + macOS من كود واحد",
      "Visual Studio — أقوى IDE في العالم",
      "Integration ممتازة مع Azure وMicrosoft services",
    ],
    cons: [
      "Community أصغر من Flutter وReact Native",
      "Setup معقد شوية في البداية",
      "ليه حضور أضعف في سوق العمل للـ Mobile",
    ],
    verdict: "اختاره بس لو جاي من .NET وعايز تدخل Mobile من غير ما تتعلم لغة جديدة. غير كده Flutter أو React Native أفضل.",
  },
};

/* ============================================================
   QUIZ
   ============================================================ */
const QUIZ_QUESTIONS = [
  {
    question: "إيه هدفك من بناء التطبيق؟",
    options: [
      { text: "تطبيق يشتغل على iOS وAndroid مع بعض",           icon: "bi-intersect",          weight: { flutter: 4, rn: 3 } },
      { text: "تطبيق iOS فقط للـ Apple users",                 icon: "bi-apple",              weight: { swift: 5, flutter: 1 } },
      { text: "تطبيق Android فقط",                             icon: "bi-android2",           weight: { kotlin: 5, flutter: 1 } },
      { text: "مش عارف لسه — عايز أبدأ وأشوف",                icon: "bi-compass-fill",       weight: { flutter: 5 } },
    ],
  },
  {
    question: "إيه خلفيتك البرمجية الحالية؟",
    options: [
      { text: "مبتدئ — مش عارف أي لغة بشكل كويس",             icon: "bi-person-fill",        weight: { flutter: 5 } },
      { text: "عارف JavaScript أو React بشكل كويس",            icon: "bi-filetype-js",        weight: { rn: 5, flutter: 1 } },
      { text: "عارف Java أو C# أو Kotlin",                     icon: "bi-code-slash",         weight: { kotlin: 3, maui: 3, flutter: 1 } },
      { text: "عارف C++ أو Swift أو Objective-C",              icon: "bi-cpu-fill",           weight: { swift: 5, flutter: 1 } },
    ],
  },
  {
    question: "إيه الأهم ليك في الـ Framework؟",
    options: [
      { text: "أداء عالي وتجربة Native حقيقية",                icon: "bi-lightning-charge-fill", weight: { swift: 3, kotlin: 3, flutter: 1 } },
      { text: "سرعة التطوير وكود أقل",                         icon: "bi-speedometer2",       weight: { flutter: 4, rn: 3 } },
      { text: "Community كبير وفيه solutions لكل مشكلة",       icon: "bi-people-fill",        weight: { rn: 4, flutter: 3 } },
      { text: "مجاني ومدعوم من شركة كبيرة",                    icon: "bi-shield-check-fill",  weight: { flutter: 4, kotlin: 2 } },
    ],
  },
];

/* ============================================================
   ROADMAP
   ============================================================ */
const ROADMAP_STEPS = [
  {
    step: "Step 01",
    title: "افهم Mobile Fundamentals",
    desc: "قبل أي Framework — افهم الفرق بين iOS وAndroid وإيه الـ App Lifecycle وإيه الـ State Management. اتعلم إيه الـ Widget وإيه الـ Component. ده بيوفر عليك تعب كتير لما تبدأ.",
    duration: "أسبوع",
  },
  {
    step: "Step 02",
    title: "نزّل Flutter وابني أول شاشة",
    desc: "نزّل Flutter SDK والـ Android Studio أو VS Code. اعمل مشروع جديد وجرّب تبني Counter App الـ Default. بعدين غيّر الـ UI واعمل شاشتين تقدر تتنقل بينهم. الـ Hot Reload هيعجبك جداً من أول يوم.",
    duration: "أسبوعان",
  },
  {
    step: "Step 03",
    title: "State Management — الأساس الحقيقي",
    desc: "الـ State Management هو أصعب مفهوم في Mobile Dev. ابدأ بـ setState البسيطة، بعدين Provider، بعدين Riverpod لو محتاج أكتر. مش لازم تتعلم كل حاجة من أول يوم — ابدأ بالأبسط وتطور.",
    duration: "شهر",
  },
  {
    step: "Step 04",
    title: "Navigation + APIs + Local Storage",
    desc: "اعمل تطبيق بيتكلم مع API حقيقية — Dio أو http package. اتعلم Navigation بين الشاشات. اتعلم SharedPreferences وHive للـ Local Storage. ده بيخليك تبني تطبيق حقيقي كامل.",
    duration: "شهر",
  },
  {
    step: "Step 05",
    title: "انشر تطبيقك على المتجر",
    desc: "App Store Deployment على iOS محتاج Apple Developer Account بـ 99 دولار سنوياً. Google Play أرخص — 25 دولار مرة واحدة. اتعلم إزاي تعمل Signed APK وBundle، وإزاي تكتب Description وتختار Screenshots.",
    duration: "أسبوعان",
  },
  {
    step: "Step 06",
    title: "Firebase + Push Notifications + Analytics",
    desc: "Firebase من Google بيدي تطبيقك Superpowers — Auth، Firestore Database، Push Notifications، Crashlytics، وAnalytics. كلهم مجانيين للبداية. ده اللي بيحوّل تطبيقك من Prototype لـ Product حقيقي.",
    duration: "شهر",
  },
];

/* ============================================================
   UTILS
   ============================================================ */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function initNav() {
  window.addEventListener("scroll", () => {
    $("#mainNav").classList.toggle("scrolled", window.scrollY > 60);
  });
  $$(".nav-link-item, .btn-primary-custom, .btn-secondary-custom").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        $(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

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
  const metaLabels = ["المبتكر / الشركة", "سنة الإطلاق", "النوع", "مستخدم في"];
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
          ${metaLabels.map((label, i) => `
            <div class="fw-meta-item">
              <div class="fw-meta-label">${label}</div>
              <div class="fw-meta-value">${metaValues[i]}</div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="fw-side">
        <div class="fw-pros-cons pros">
          <h5><i class="bi bi-hand-thumbs-up-fill me-2"></i>المميزات</h5>
          ${fw.pros.map((p) => `
            <div class="fw-list-item">
              <i class="bi bi-check-lg"></i><span>${p}</span>
            </div>`).join("")}
        </div>
        <div class="fw-pros-cons cons">
          <h5><i class="bi bi-hand-thumbs-down-fill me-2"></i>العيوب</h5>
          ${fw.cons.map((c) => `
            <div class="fw-list-item">
              <i class="bi bi-x-lg"></i><span>${c}</span>
            </div>`).join("")}
        </div>
        <div class="fw-verdict">
          <h5><i class="bi bi-lightbulb-fill me-2"></i>الحكم النهائي</h5>
          <p>${fw.verdict}</p>
        </div>
      </div>
    </div>
  `;
}

function initFrameworkTabs() {
  const tabs = $$("#fwTabs .fw-tab");
  renderFrameworkPanel("flutter");
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
          e.target.style.setProperty("--perf-width", e.target.dataset.perf + "%");
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
  const scores = { flutter: 0, rn: 0, swift: 0, kotlin: 0, maui: 0 };
  Object.values(quizAnswers).forEach((weights) => {
    Object.entries(weights).forEach(([k, v]) => {
      if (scores[k] !== undefined) scores[k] += v;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function renderQuizResult(key) {
  const fw = FRAMEWORKS[key];
  $("#quizProgressFill").style.width = "100%";
  $("#quizStepIndicator").textContent = "النتيجة";
  $("#quizContent").innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-icon">${fw.icon}</div>
      <h3>ابدأ بيه دلوقتي</h3>
      <div class="quiz-result-fw">${fw.name}</div>
      <p>${fw.verdict}</p>
      <button class="quiz-restart" id="quizRestart">
        <i class="bi bi-arrow-counterclockwise me-2"></i>جرب تاني
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
  $("#quizProgressFill").style.width = ((index + 1) / QUIZ_QUESTIONS.length * 100) + "%";
  $("#quizStepIndicator").textContent = `السؤال ${index + 1} من ${QUIZ_QUESTIONS.length}`;
  $("#quizContent").innerHTML = `
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-option="${i}">
          <span class="quiz-option-icon"><i class="bi ${opt.icon}"></i></span>
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

function initQuiz() { renderQuizQuestion(0); }

/* ============================================================
   ROADMAP
   ============================================================ */
function initRoadmap() {
  const tl = $("#roadmapTimeline");
  if (!tl) return;
  tl.innerHTML = ROADMAP_STEPS.map((step, i) => `
    <div class="roadmap-item" data-aos="fade-right" data-aos-delay="${i * 80}">
      <div class="roadmap-dot"></div>
      <div class="roadmap-content">
        <div class="roadmap-step-tag">${step.step}</div>
        <div class="roadmap-title">${step.title}</div>
        <div class="roadmap-desc">${step.desc}</div>
        <div class="roadmap-duration">
          <i class="bi bi-clock me-1"></i>
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
      line.style.transition = "opacity 0.38s ease, transform 0.38s ease";
      line.style.opacity = "1";
      line.style.transform = "translateX(0)";
    }, 600 + i * 130);
  });
}

/* ============================================================
   KEYBOARD — press M to cycle frameworks
   ============================================================ */
function initKeyboardShortcuts() {
  const keys = Object.keys(FRAMEWORKS);
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "m" && e.target.tagName !== "INPUT") {
      idx = (idx + 1) % keys.length;
      $$("#fwTabs .fw-tab").forEach((t) => t.classList.toggle("active", t.dataset.fw === keys[idx]));
      renderFrameworkPanel(keys[idx]);
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
    "%c ✿ Mobile Dev ✿ ",
    "background:#c77dff;color:#0c090f;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;"
  );
  console.log(
    "%cنصيحة: اضغط حرف 'M' للتنقل بين الـ Frameworks بسرعة! 📱",
    "color:#c77dff;font-family:monospace;font-size:12px;"
  );
});