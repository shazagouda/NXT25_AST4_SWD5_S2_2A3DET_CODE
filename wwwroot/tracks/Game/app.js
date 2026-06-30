"use strict";

/* ============================================================
   ENGINES DATA
   ============================================================ */
const FRAMEWORKS = {
  godot: {
    name: "Godot Engine",
    tagline: "The free, open-source engine that's taking over indie game dev",
    icon: '<i class="bi bi-joystick" style="color:#478cbf"></i>',
    iconColor: "#478cbf",
    desc: `Godot مفتوح المصدر بالكامل ومجاني — مش جزئياً، مجاني 100% من غير royalties أو subscriptions. اخترعه Juan Linietsky وAriello Manzur في أمريكا اللاتينية واتفتح للعالم سنة 2014. اللغة الأساسية بتاعته GDScript شبه Python — سهلة جداً للمبتدئين. مع Godot 4، الـ 3D بقى أقوى بكتير. الـ indie game dev community اتحرك ليه بشكل كبير بعد أحداث Unity 2023.`,
    meta: {
      creator: "Juan Linietsky & Ariel Manzur",
      year: "2014",
      type: "2D & 3D Game Engine",
      license: "MIT — مجاني 100%",
    },
    pros: [
      "مجاني تماماً — مفيش royalties أو رسوم مخفية",
      "GDScript سهل جداً وشبه Python للمبتدئين",
      "Node System رائع — بيخلي تنظيم المشروع سهل",
      "خفيف جداً — بيشتغل على أي جهاز قديم",
    ],
    cons: [
      "الـ 3D أضعف من Unity وUnreal للألعاب الضخمة",
      "Community أصغر من Unity رغم إنه بيكبر بسرعة",
      "موارد التعلم باللغة العربية أقل",
    ],
    verdict: "أفضل محرك للمبتدئ في 2025. مجاني، سهل، وبـ community نشيط. ابدأ بيه من أول يوم واعمل لعبة 2D بسيطة.",
  },

  unity: {
    name: "Unity",
    tagline: "The most popular game engine on the planet",
    icon: '<i class="bi bi-unity" style="color:#e8e8e8"></i>',
    iconColor: "#e8e8e8",
    desc: `Unity الأكثر استخداماً في الصناعة — 50% من الألعاب على الـ App Store اتعملت بيه. صنعته شركة Unity Technologies سنة 2005 وبيستخدم C# كلغة برمجة. بيشتغل على أكتر من 20 منصة — Mobile، Console، PC، VR، AR. Asset Store بيه ملايين الـ assets الجاهزة. بعد أحداث Runtime Fee سنة 2023 خسر كتير من الثقة، لكن لسه الأقوى في Mobile.`,
    meta: {
      creator: "Unity Technologies",
      year: "2005",
      type: "2D & 3D Multi-platform Engine",
      used_by: "Pokémon GO, Hollow Knight, Cities Skylines",
    },
    pros: [
      "Asset Store ضخم — ملايين الـ assets الجاهزة",
      "يشتغل على أكتر من 20 منصة بنفس الكود",
      "Community ضخم جداً وفيه tutorials لكل حاجة",
      "C# قوية ومطلوبة في سوق العمل",
    ],
    cons: [
      "Runtime Fee controversy أثّر في الثقة",
      "أثقل من Godot ومحتاج جهاز أحسن",
      "Free plan بيه قيود في الـ splash screen والـ features",
    ],
    verdict: "ممتاز لو هدفك Mobile Gaming أو عندك خلفية C#. الـ community والـ resources أضخم من أي محرك تاني. بس مع Godot كبديل مجاني — فكر كويس.",
  },

  unreal: {
    name: "Unreal Engine 5",
    tagline: "Hollywood-quality visuals for games and beyond",
    icon: '<i class="bi bi-pentagon-fill" style="color:#c8c8c8"></i>',
    iconColor: "#c8c8c8",
    desc: `Unreal Engine من Epic Games — المحرك اللي وراء Fortnite والعاب AAA ضخمة. Nanite وLumen في UE5 بيحولوا اللعبة لفيلم سينمائي. C++ هي اللغة الأساسية لكن فيه Blueprints — visual scripting بدون كود. مجاني للاستخدام، بس بياخد 5% royalty لما اللعبة تعمل أكتر من 1 مليون دولار. متشيلهوش من الأول — ده محرك للمحترفين.`,
    meta: {
      creator: "Epic Games",
      year: "1998",
      type: "AAA 3D Game Engine",
      used_by: "Fortnite, Hogwarts Legacy, The Matrix Demo",
    },
    pros: [
      "رسومات لا يصدق — Nanite وLumen غيّروا الصناعة",
      "Blueprints — تعمل gameplay بدون كود C++",
      "مجاني لحد ما تعمل مليون دولار",
      "MetaHuman وفيه tools للـ Film وArchitecture",
    ],
    cons: [
      "صعب جداً على المبتدئ — Learning curve شديد",
      "محتاج جهاز قوي جداً حتى تشغّله بشكل محترم",
      "C++ صعبة للمبتدئين ومعقدة",
    ],
    verdict: "مش لأول لعبة. لما تبقى مرتاح مع الأساسيات وعندك مشروع طموح يحتاج رسومات AAA — وقتها افتح Unreal.",
  },

  pygame: {
    name: "Pygame",
    tagline: "Learn game dev fundamentals with pure Python",
    icon: '<i class="bi bi-braces" style="color:#ffd43b"></i>',
    iconColor: "#ffd43b",
    desc: `Pygame مش محرك كامل زي Godot — هو library فوق Python بتديك الأدوات الأساسية تبني لعبة من الصفر. مفيش visual editor ومفيش drag-and-drop. كل حاجة بتكتبها بالكود. ده بالظبط هو سبب قوته للتعلم — بتفهم كيف الـ Game Loop شغال من الجوه. لما تعرف Pygame كويس، أي محرك تاني هيبقى أسهل.`,
    meta: {
      creator: "Pete Shinners",
      year: "2000",
      type: "Python Game Library",
      used_by: "Learning & Prototyping",
    },
    pros: [
      "Python — اللغة الأسهل في العالم للبداية",
      "بتفهم الـ Game Loop والـ fundamentals من الجذر",
      "مجاني 100% ومفتوح المصدر",
      "ممتاز للـ prototyping السريع",
    ],
    cons: [
      "مش للألعاب الكبيرة — الـ performance محدودة",
      "مفيش visual editor — كل حاجة بالكود",
      "مش بيشتغل على Mobile بسهولة",
    ],
    verdict: "ابدأ بيه لو عارف Python وعايز تفهم الأساسيات. اعمل لعبة Snake أو Pong أو Space Invaders — هتفهم كل حاجة. بعدين روح Godot.",
  },

  gms: {
    name: "GameMaker",
    tagline: "The legendary 2D engine behind indie classics",
    icon: '<i class="bi bi-grid-3x3-gap-fill" style="color:#ec1c24"></i>',
    iconColor: "#ec1c24",
    desc: `GameMaker موجود من 1999 وخلف خلفه ألعاب indie كلاسيكية — Undertale، Hotline Miami، Hyper Light Drifter. مصمم خصيصاً للـ 2D. لغته GML (GameMaker Language) سهلة وفيه drag-and-drop للمبتدئين. لكن دلوقتي له منافسة قوية من Godot اللي مجاني ومش مدفوع.`,
    meta: {
      creator: "Mark Overmars / YoYo Games",
      year: "1999",
      type: "2D Game Engine",
      used_by: "Undertale, Hotline Miami, Chicory",
    },
    pros: [
      "مصمم بالكامل للـ 2D — بيتفوق فيها",
      "GML سهلة ومصممة خصيصاً للألعاب",
      "Drag-and-drop للمبتدئين المبتدئين",
      "Legacy ضخم من الألعاب الناجحة",
    ],
    cons: [
      "مدفوع — ومش مبرر مع وجود Godot مجاناً",
      "الـ 3D شبه معدوم",
      "Community أصغر بكتير من Unity وGodot",
    ],
    verdict: "لو بتبني لعبة 2D بسيطة وعندك ميزانية — GameMaker خيار. لكن لو مش عندك ميزانية — Godot بيعمل نفس الحاجة مجاناً.",
  },
};

/* ============================================================
   QUIZ
   ============================================================ */
const QUIZ_QUESTIONS = [
  {
    question: "إيه نوع اللعبة اللي بتحلم تبنيها؟",
    options: [
      { text: "لعبة 2D Indie — platformer أو RPG أو puzzle", icon: "bi-controller",      weight: { godot: 4, gms: 3, pygame: 1 } },
      { text: "لعبة Mobile تنزل على iOS وAndroid",          icon: "bi-phone-fill",       weight: { unity: 5, godot: 2 } },
      { text: "لعبة 3D ضخمة بجرافيك سينمائي",               icon: "bi-stars",            weight: { unreal: 5, unity: 2 } },
      { text: "لعبة بسيطة أتعلم بيها الأساسيات الأول",      icon: "bi-mortarboard-fill", weight: { pygame: 4, godot: 3 } },
    ],
  },
  {
    question: "إيه خلفيتك في البرمجة حالياً؟",
    options: [
      { text: "مبتدئ — مش عارف أي لغة برمجة",              icon: "bi-person-fill",      weight: { godot: 4, gms: 3 } },
      { text: "عارف Python بشكل كويس",                       icon: "bi-braces",           weight: { pygame: 4, godot: 3 } },
      { text: "عارف C# أو Java أو لغة OOP",                  icon: "bi-code-slash",       weight: { unity: 5, godot: 2 } },
      { text: "عارف C++ وعندي خلفية تقنية قوية",             icon: "bi-cpu-fill",         weight: { unreal: 5, unity: 2 } },
    ],
  },
  {
    question: "إيه أهم حاجة بالنسبالك في المحرك؟",
    options: [
      { text: "مجاني ومفيش مصاريف خفية",                    icon: "bi-unlock-fill",      weight: { godot: 5, pygame: 3 } },
      { text: "Community ضخم وفيه resources كتير",           icon: "bi-people-fill",      weight: { unity: 5, unreal: 3 } },
      { text: "رسومات بأعلى جودة ممكنة",                    icon: "bi-gem",              weight: { unreal: 5, unity: 2 } },
      { text: "سهولة البداية وسرعة النتيجة",                icon: "bi-lightning-fill",   weight: { godot: 3, gms: 3, pygame: 2 } },
    ],
  },
];

/* ============================================================
   ROADMAP
   ============================================================ */
const ROADMAP_STEPS = [
  {
    step: "Step 01",
    title: "افهم الـ Game Loop والـ Fundamentals",
    desc: "قبل أي محرك — افهم إيه الـ Game Loop وإيه الـ Sprite وإيه الـ Collision Detection. Pygame أو كورس يوتيوب بسيط هيعلمك الأساسيات من الجذر. الهدف مش لعبة جميلة — الهدف تفهم كيف الأشياء بتتحرك.",
    duration: "أسبوعان",
  },
  {
    step: "Step 02",
    title: "نزّل Godot واعمل أول لعبة 2D",
    desc: "الـ Dodge the Creeps Tutorial الرسمي في Godot — من أحسن tutorials في العالم. بيعلمك GDScript، الـ Scenes، الـ Nodes، والـ Signals. اعمله خطوة بخطوة ومتتجاوزش أي حاجة مش فاهمها.",
    duration: "أسبوعان",
  },
  {
    step: "Step 03",
    title: "اعمل Clone لعبة كلاسيكية",
    desc: "Pong، Snake، Space Invaders، Flappy Bird — اختار لعبة كلاسيكية وعمل نسختك منها. مش مهم تكون أصلية — المهم تحل المشاكل الحقيقية: الـ Physics، الـ Scoring، الـ Game Over screen، والـ Restart.",
    duration: "شهر",
  },
  {
    step: "Step 04",
    title: "Game Design — افهم إيه اللي بيخلي اللعبة ممتعة",
    desc: "اقرا 'The Art of Game Design' لـ Jesse Schell. العب ألعاب كتيرة وحاول تحلل: ليه ممتعة؟ إيه الـ Game Feel؟ إيه الـ Feedback Loop؟ Game Designer من غير لعب ومن غير تحليل — مش Game Designer.",
    duration: "مستمر",
  },
  {
    step: "Step 05",
    title: "مشروعك الأول الأصيل — Jam واحدة",
    desc: "Game Jams هي أفضل طريقة للتطور — بتبني لعبة كاملة في 48 أو 72 ساعة مع theme محدد. itch.io فيها Jams كل أسبوع تقريباً. الهدف إنك تُكمّل وتنشر — مش إن تعمل تحفة. اللعبة المنشورة أفضل من الكاملة المخفية.",
    duration: "شهر",
  },
  {
    step: "Step 06",
    title: "انشر ألعابك وابني Portfolio",
    desc: "itch.io مجاني وسهل الرفع عليه. اعمل Page محترمة للعبة — Screenshots، GIF، وصف واضح. بعدين GitHub للكود المفتوح. كل لعبة بتنشرها بتعلمك أكتر من أي كورس. شارك في الـ community وخد feedback.",
    duration: "مستمر",
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
   ENGINE TABS
   ============================================================ */
function renderFrameworkPanel(key) {
  const fw = FRAMEWORKS[key];
  if (!fw) return;
  const metaLabels = ["المبتكر / الشركة", "سنة الإطلاق", "النوع", "أشهر ألعابه"];
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
  renderFrameworkPanel("godot");
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
  const scores = { godot: 0, unity: 0, unreal: 0, pygame: 0, gms: 0 };
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
      line.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      line.style.opacity = "1";
      line.style.transform = "translateX(0)";
    }, 700 + i * 140);
  });
}

/* ============================================================
   KEYBOARD — press G to cycle engines
   ============================================================ */
function initKeyboardShortcuts() {
  const keys = Object.keys(FRAMEWORKS);
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "g" && e.target.tagName !== "INPUT") {
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
    "%c ▶ GameDev ■ ",
    "background:#0abde3;color:#090d10;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;"
  );
  console.log(
    "%cنصيحة: اضغط حرف 'G' للتنقل بين المحركات بسرعة! 🎮",
    "color:#0abde3;font-family:monospace;font-size:12px;"
  );
});