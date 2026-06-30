"use strict";

/* ============================================================
   FRAMEWORKS DATA
   ============================================================ */
const FRAMEWORKS = {
  pytorch: {
    name: "PyTorch",
    tagline: "The researcher's framework — dynamic, Pythonic, powerful",
    icon: '<i class="bi bi-fire" style="color:#ee4c2c"></i>',
    iconColor: "#ee4c2c",
    desc: `PyTorch صنعته Meta سنة 2016 وغيّر عالم البحث في AI بالكامل. مكتوب بـ Python بشكل طبيعي — بتكتب الشبكة العصبية زي ما بتكتب أي Python عادي. Dynamic Computation Graph يعني بتغير الـ model وأنت بتشغله. ده اللي بيخليه مفضل في الـ Research وفي الـ Academia.`,
    meta: {
      creator: "Meta AI Research",
      year: "2016",
      type: "Deep Learning Framework",
      used_by: "OpenAI, Tesla, Uber",
    },
    pros: [
      "Pythonic جداً — سهل في القراءة والـ debugging",
      "Dynamic graphs — مرونة كاملة في بناء الـ models",
      "الأكثر استخداماً في الـ Research Papers",
      "TorchServe للـ deployment وTorchScript للـ production",
    ],
    cons: [
      "أبطأ من TensorFlow في بعض حالات الـ production",
      "Mobile deployment أصعب نسبياً",
      "Visualization أقل من TensorBoard",
    ],
    verdict: "ابدأ بيه لو مهتم بالـ Research أو Deep Learning. الـ Community ضخم والـ documentation ممتازة. أفضل framework للـ 2025.",
  },

  tensorflow: {
    name: "TensorFlow",
    tagline: "Google's powerhouse for production ML",
    icon: '<i class="bi bi-lightning-fill" style="color:#ff6f00"></i>',
    iconColor: "#ff6f00",
    desc: `TensorFlow صنعته Google ونشرته سنة 2015. كان الأضخم في الصناعة لسنين طويلة. Keras بقى الـ high-level API الرسمي بتاعه وخلاه أسهل بكتير. TensorFlow Lite للـ Mobile وTensorFlow.js للـ Browser. لو شغلتك إن الـ Model يشتغل في Production بكفاءة — TF أقوى.`,
    meta: {
      creator: "Google Brain",
      year: "2015",
      type: "Deep Learning Framework",
      used_by: "Google, Airbnb, Dropbox",
    },
    pros: [
      "TensorFlow Serving — deployment احترافي في Production",
      "TensorFlow Lite — بيشغّل الـ Models على Mobile",
      "TensorBoard — visualization ممتازة للـ training",
      "Keras API بسيطة جداً للمبتدئين",
    ],
    cons: [
      "Static graphs تقليدياً — أقل مرونة من PyTorch",
      "تغيير مستمر في الـ API بين الإصدارات",
      "Learning curve أصعب من PyTorch في البداية",
    ],
    verdict: "ممتاز للـ Production وللـ Mobile. لو بتشتغل مع Google Cloud أو محتاج TFLite للـ Mobile — هو اختيارك. Keras بيخليه سهل للبداية.",
  },

  sklearn: {
    name: "Scikit-learn",
    tagline: "The starting point for every ML engineer",
    icon: '<i class="bi bi-gear-fill" style="color:#f89406"></i>',
    iconColor: "#f89406",
    desc: `Scikit-learn هي نقطة البداية الحقيقية في Machine Learning. موجودة من 2007 وما أحدش بيتخيل ML بدونها. بتيجيلك بكل الـ Algorithms الكلاسيكية جاهزة — Linear Regression, Random Forest, SVM, KMeans. واجهتها موحدة: fit(), predict(), score() في كل حاجة. وتكامل ممتاز مع Pandas وNumPy.`,
    meta: {
      creator: "David Cournapeau + INRIA",
      year: "2007",
      type: "Classical Machine Learning",
      used_by: "Netflix, Spotify, JP Morgan",
    },
    pros: [
      "API موحدة وبسيطة جداً — fit/predict/score",
      "كل الـ Classical ML Algorithms في مكان واحد",
      "Pipelines قوية للـ preprocessing والـ modeling",
      "Documentation من أحسن الـ docs في الـ Python ecosystem",
    ],
    cons: [
      "مش مصممة للـ Deep Learning — استخدم PyTorch",
      "GPU support معدومة تقريباً",
      "للبيانات الضخمة جداً محتاج Spark ML أو Dask",
    ],
    verdict: "أول حاجة تتعلمها في ML. قبل PyTorch وTensorFlow — اتعلم Scikit-learn وافهم الـ fundamentals منها. ده الأساس.",
  },

  huggingface: {
    name: "Hugging Face",
    tagline: "The GitHub of AI models — transformers made easy",
    icon: '<i class="bi bi-emoji-smile-fill" style="color:#ffd21e"></i>',
    iconColor: "#ffd21e",
    desc: `Hugging Face غيّرت AI بالكامل. بدل ما كل شركة تتعلم من الصفر — دلوقتي فيه Hub بفيه مئات الآلاف من الـ Pre-trained Models جاهزة للاستخدام. Transformers library بتيجيلك بـ BERT، GPT، Llama، وكل LLM تسمع عنه بكود بسيط. ده اللي خلى AI متاح للجميع.`,
    meta: {
      creator: "Clément Delangue & Julien Chaumond",
      year: "2016",
      type: "Model Hub & Transformers",
      used_by: "Google, Microsoft, Nvidia",
    },
    pros: [
      "Hub بمئات الآلاف من الـ Pre-trained Models مجاناً",
      "Transformers library — كل LLM بـ 3 سطور",
      "Datasets library — بيانات جاهزة لأي مجال",
      "Spaces — تشغّل المشاريع مجاناً على الإنترنت",
    ],
    cons: [
      "بعض الـ Models تحتاج GPU قوي تشغيلها",
      "Tokenizers ممكن تكون مربكة في البداية",
      "Inference API المجاني محدود السرعة",
    ],
    verdict: "ضروري جداً لأي شخص يشتغل في NLP أو LLMs. ابدأ بيه من أول مشروع بيستخدم Language Models.",
  },

  langchain: {
    name: "LangChain",
    tagline: "Build applications powered by language models",
    icon: '<i class="bi bi-link-45deg" style="color:#74b9ff"></i>',
    iconColor: "#74b9ff",
    desc: `LangChain ظهر مع موجة الـ LLMs سنة 2022 وانتشر بسرعة جنونية. فكرته الأساسية إنك بدل ما تتعامل مع الـ LLM مباشرة، بتبني حوله Chains وAgents قادرة تفكر وتتخذ قرارات. RAG (Retrieval Augmented Generation) هو اللي بيخلي الـ AI يقرأ ملفاتك ويجاوب منها.`,
    meta: {
      creator: "Harrison Chase",
      year: "2022",
      type: "LLM Application Framework",
      alternatives: "LlamaIndex / Haystack / CrewAI",
    },
    pros: [
      "بيربط الـ LLM بـ Tools، Databases، وAPIs",
      "RAG — اعمل AI بيجاوب من بياناتك الخاصة",
      "Agents — AI بيخذ قرارات ويشتغل أوتوماتيك",
      "يدعم كل الـ LLM providers: OpenAI, Anthropic, Local",
    ],
    cons: [
      "Abstraction كتير — ممكن تتوه من الـ internals",
      "تغيير مستمر في الـ API والـ breaking changes",
      "للمشاريع البسيطة — مباشرة مع الـ LLM API أسهل",
    ],
    verdict: "ممتاز لو بتبني تطبيق AI حقيقي — Chatbots، RAG Systems، أو AI Agents. ابدأ بيه بعد ما تفهم الـ LLMs الأول.",
  },
};

/* ============================================================
   QUIZ
   ============================================================ */
const QUIZ_QUESTIONS = [
  {
    question: "إيه اللي بيثيرك أكتر في عالم الـ AI؟",
    options: [
      { text: "أفهم إزاي الشبكات العصبية بتتعلم من الداخل",    icon: "bi-diagram-3-fill",     weight: { pytorch: 4, tensorflow: 2 } },
      { text: "أبني تطبيق ذكي جاهز للناس يستخدموه",            icon: "bi-app-indicator",      weight: { huggingface: 3, langchain: 3, tensorflow: 1 } },
      { text: "أحلل بيانات وأتوقع المستقبل بنماذج إحصائية",    icon: "bi-graph-up-arrow",     weight: { sklearn: 4, pytorch: 1 } },
      { text: "أبني AI يتكلم ويفهم اللغة الطبيعية",            icon: "bi-chat-dots-fill",     weight: { huggingface: 4, langchain: 2 } },
    ],
  },
  {
    question: "إيه خلفيتك الحالية؟",
    options: [
      { text: "مبتدئ — مش عارف Python كويس لسه",               icon: "bi-person-fill",        weight: { sklearn: 5 } },
      { text: "عارف Python وData Science",                       icon: "bi-bar-chart-fill",     weight: { sklearn: 2, pytorch: 2, huggingface: 2 } },
      { text: "عارف ML وعايز أعمق في Deep Learning",            icon: "bi-layers-fill",        weight: { pytorch: 4, tensorflow: 2 } },
      { text: "عارف الأساسيات وعايز أبني تطبيقات LLM",         icon: "bi-robot",              weight: { huggingface: 3, langchain: 4 } },
    ],
  },
  {
    question: "هدفك المهني في الـ AI إيه؟",
    options: [
      { text: "ML Engineer — أبني وأنشر Models في Production",  icon: "bi-cloud-upload-fill",  weight: { pytorch: 3, tensorflow: 3, sklearn: 1 } },
      { text: "AI Researcher — أفهم وأطور Algorithms جديدة",    icon: "bi-journal-code",       weight: { pytorch: 5 } },
      { text: "AI Product Builder — أبني تطبيقات بالـ LLMs",    icon: "bi-box-fill",           weight: { huggingface: 3, langchain: 4 } },
      { text: "Data Scientist — أستخدم ML في تحليل البيانات",   icon: "bi-database-fill",      weight: { sklearn: 4, pytorch: 1 } },
    ],
  },
];

/* ============================================================
   ROADMAP
   ============================================================ */
const ROADMAP_STEPS = [
  {
    step: "Step 01",
    title: "Python والرياضيات الأساسية",
    desc: "مش محتاج PhD في رياضيات — بس محتاج تفهم Calculus الأساسي (derivatives)، Linear Algebra (matrices)، والإحصاء (mean, variance, distributions). 3Blue1Brown على يوتيوب هيعلمك الرياضيات بصرياً ومجاناً.",
    duration: "شهر",
  },
  {
    step: "Step 02",
    title: "Scikit-learn — الـ Classical ML الأول",
    desc: "اتعلم Linear Regression، Logistic Regression، Decision Trees، وRandom Forest. افهم إيه الـ Overfitting والـ Bias-Variance Tradeoff. اعمل مشاريع على Kaggle وبيانات حقيقية. ده الأساس اللي كل حاجة بتتبنى عليه.",
    duration: "شهرين",
  },
  {
    step: "Step 03",
    title: "PyTorch — ادخل عالم Deep Learning",
    desc: "ابدأ بـ fast.ai course — من أحسن الكورسات المجانية. اتعلم Neural Networks، Backpropagation، وCNNs. اعمل Image Classifier بسيط. فهم كيف الـ Gradient Descent بيشتغل — ده اللي بيفرق بين اللي بيستخدم والي بيفهم.",
    duration: "شهرين",
  },
  {
    step: "Step 04",
    title: "NLP وHugging Face Transformers",
    desc: "اتعلم إيه الـ Attention Mechanism وإيه الـ Transformer Architecture. استخدم Hugging Face تحمّل Model جاهز وجربه على بياناتك. اعمل Text Classification، Sentiment Analysis، أو Question Answering. ده اللي بيفتحلك بوابة LLMs.",
    duration: "شهرين",
  },
  {
    step: "Step 05",
    title: "LLMs وGenAI — الجيل الجديد",
    desc: "اتعلم Prompt Engineering من الأول. جرب Fine-tuning باستخدام PEFT وLoRA. ابني RAG System بيجاوب من ملفاتك الخاصة باستخدام LangChain. اتعلم Evaluation — إزاي بتتأكد إن الـ LLM بيجاوب صح.",
    duration: "شهرين",
  },
  {
    step: "Step 06",
    title: "MLOps — نشر الـ Models في Production",
    desc: "الـ Model اللي مش في Production هو مجرد experiment. اتعلم Docker لـ packaging، FastAPI لبناء ML APIs، وMLflow لتتبع الـ experiments. اعرف إزاي تعمل Model Monitoring وتكتشف الـ Data Drift بدري.",
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
  renderFrameworkPanel("pytorch");
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
  const scores = { pytorch: 0, tensorflow: 0, sklearn: 0, huggingface: 0, langchain: 0 };
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
      <h3>ابدأ بيها دلوقتي</h3>
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
          <span class="quiz-option-icon">
            <i class="bi ${opt.icon}"></i>
          </span>
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
    }, 700 + i * 160);
  });
}

/* ============================================================
   KEYBOARD — press A to cycle tools
   ============================================================ */
function initKeyboardShortcuts() {
  const keys = Object.keys(FRAMEWORKS);
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "a" && e.target.tagName !== "INPUT") {
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
    "%c ∂ AI / ML ∞ ",
    "background:#ff6b6b;color:#0d0a0d;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;"
  );
  console.log(
    "%cنصيحة: اضغط حرف 'A' للتنقل بين الأدوات بسرعة!",
    "color:#ff6b6b;font-family:monospace;font-size:12px;"
  );
});