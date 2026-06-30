"use strict";

/* ============================================================
   TOOLS DATA
   ============================================================ */
const FRAMEWORKS = {
  docker: {
    name: "Docker",
    tagline: "Build, ship, and run anywhere",
    icon: '<i class="fa-brands fa-docker" style="color:#2496ed"></i>',
    iconColor: "#2496ed",
    desc: `Docker اخترعته شركة dotCloud ونشرته سنة 2013 وغيّر صناعة البرمجيات بالكامل. الفكرة بسيطة: بتحط تطبيقك وكل اللي يحتاجه في "Container" — صندوق معزول بيشتغل نفس الشيء على أي جهاز. خلّى جملة "بيشتغل عندي بس" تختفي من القاموس.`,
    meta: {
      creator: "Solomon Hykes / dotCloud",
      year: "2013",
      type: "Containerization",
      used_by: "Netflix, Uber, Spotify",
    },
    pros: [
      "بيضمن إن التطبيق يشتغل نفس الشيء في كل بيئة",
      "Dockerfile — بتوثق البيئة بالكامل ككود",
      "Docker Compose — بتشغّل multi-service بأمر واحد",
      "Docker Hub — مليارات الـ Images الجاهزة",
    ],
    cons: [
      "Overhead في الأداء مقارنة بالـ bare metal",
      "Security يحتاج اهتمام — Containers مش VMs",
      "لإدارة Containers كتير محتاج Kubernetes",
    ],
    verdict: "أول حاجة تتعلمها في DevOps بدون نقاش. اتعلم Docker وDockerfile وDocker Compose — هتستخدمهم كل يوم في حياتك.",
  },

  k8s: {
    name: "Kubernetes",
    tagline: "The operating system of the cloud",
    icon: '<i class="fa-solid fa-dharmachakra" style="color:#326ce5"></i>',
    iconColor: "#326ce5",
    desc: `Kubernetes — اللي بيتنادى K8s — صنعته Google داخلياً واسمه Borg قبل ما يكون Open Source سنة 2014. لما عندك Container واحد Docker كافي — لما عندك مئات الـ Containers محتاج حاجة تديرهم، تscaleهم، وتصلح اللي بيتعطل منهم أوتوماتيك. ده K8s.`,
    meta: {
      creator: "Google",
      year: "2014",
      type: "Container Orchestration",
      used_by: "Google, Airbnb, Pinterest",
    },
    pros: [
      "Auto-scaling — بيزيد الـ Containers لما الضغط يزيد",
      "Self-healing — بيعيد تشغيل اللي بيتعطل أوتوماتيك",
      "Load Balancing مدمج وبيشتغل لوحده",
      "Rolling Updates — بيحدّث من غير Downtime",
    ],
    cons: [
      "Learning curve شديد جداً للمبتدئين",
      "Over-engineering لو مشروعك صغير",
      "يحتاج Resources كتير لتشغيله",
    ],
    verdict: "متتعلمش K8s قبل Docker. لما تبقى مرتاح مع Containers وعندك مشروع فيه services كتيرة — وقتها ابدأ. Managed K8s (EKS, GKE, AKS) أسهل للبداية.",
  },

  cicd: {
    name: "CI/CD",
    tagline: "Code to production, automatically",
    icon: '<i class="fa-brands fa-github" style="color:#f0f0f0"></i>',
    iconColor: "#f0f0f0",
    desc: `الـ CI/CD هو العمود الفقري للـ DevOps. Continuous Integration يعني كل Push بيشغّل Tests أوتوماتيك. Continuous Delivery يعني كل كود جديد جاهز للـ Deploy في أي وقت. GitHub Actions هو الأشهر والأسهل دلوقتي — بيشتغل مع GitHub مباشرة وبيجيلك بـ Free plan كويس.`,
    meta: {
      creator: "GitHub (Microsoft)",
      year: "2018",
      type: "CI/CD Platform",
      alternatives: "GitLab CI / Jenkins / CircleCI",
    },
    pros: [
      "مجاني مع GitHub ويشتغل من أول يوم",
      "YAML بسيط وفيه Templates جاهزة لكل حاجة",
      "Marketplace — آلاف الـ Actions الجاهزة",
      "يشتغل مع أي لغة وأي Cloud",
    ],
    cons: [
      "للمشاريع الكبيرة ممكن يبقى غالي",
      "Debugging الـ Pipelines بطيء ومزعج أحياناً",
      "Jenkins أقوى بس أصعب بكتير",
    ],
    verdict: "ابدأ بـ GitHub Actions من أول مشروع. اعمل Pipeline بيرن Tests وبيعمل Deploy أوتوماتيك — ده اللي بيميزك في أي Interview.",
  },

  terraform: {
    name: "Terraform",
    tagline: "Write infrastructure, not clicks",
    icon: '<i class="fa-solid fa-cube" style="color:#7b42bc"></i>',
    iconColor: "#7b42bc",
    desc: `Terraform صنعته HashiCorp سنة 2014. بدل ما تروح الـ Console وتعمل السيرفرات بإيدك خطوة خطوة — بتكتب الـ Infrastructure بتاعتك ككود. HCL لغة بسيطة بتقول فيها "عايز Server هنا، Database هنا، Network هنا" — وTerraform بيعملها على AWS أو GCP أو Azure.`,
    meta: {
      creator: "HashiCorp",
      year: "2014",
      type: "Infrastructure as Code",
      alternatives: "Pulumi / AWS CloudFormation / Ansible",
    },
    pros: [
      "Declarative — بتقول عايز إيه مش إزاي",
      "Multi-cloud — نفس الكود على AWS وGCP وAzure",
      "State management — عارف الـ Infrastructure الحالية",
      "Plan قبل Apply — بتشوف التغييرات قبل التطبيق",
    ],
    cons: [
      "State file محتاج تتعامل معاه بحذر",
      "HCL لغة جديدة لازم تتعلمها",
      "للـ Configuration Management استخدم Ansible معاه",
    ],
    verdict: "تعلمه بعد ما تعرف Cloud basics. ابدأ بـ AWS Free Tier وTerraform Free — اعمل VPC وEC2 بالكود وشوف الفرق.",
  },

  monitoring: {
    name: "Monitoring & Observability",
    tagline: "You can't fix what you can't see",
    icon: '<i class="fa-solid fa-chart-line" style="color:#e6522c"></i>',
    iconColor: "#e6522c",
    desc: `الـ Monitoring مش رفاهية — هو ضرورة. لو ما شفتش إيه اللي بيحصل في Production مش هتعرف المشكلة غير لما المستخدم يشتكي. Prometheus بيجمع الـ Metrics، Grafana بيعرضها في Dashboards جميلة، وELK Stack للـ Logs. الهدف: تعرف المشكلة قبل الناس.`,
    meta: {
      creator: "SoundCloud (Prometheus) / Elastic (ELK)",
      year: "2012 / 2010",
      type: "Monitoring & Logging",
      stack: "Prometheus + Grafana + ELK",
    },
    pros: [
      "Prometheus + Grafana مجانيين وقويين جداً",
      "Alerting أوتوماتيك لما حاجة بتعطل",
      "بيساعدك تفهم سلوك التطبيق في الـ Production",
      "Dashboards جاهزة لـ Docker وKubernetes",
    ],
    cons: [
      "Setup معقد شوية في البداية",
      "Retention للبيانات يحتاج تخطيط",
      "للـ Distributed Tracing محتاج Jaeger أو Tempo",
    ],
    verdict: "من أول Deploy حقيقي — ابدأ بـ Prometheus وGrafana. Dashboard واحدة بتعرض CPU وMemory وLatency بتوفر عليك ساعات من الـ Debugging.",
  },
};

/* ============================================================
   QUIZ
   ============================================================ */
const QUIZ_QUESTIONS = [
  {
    question: "إيه اللي بيزعجك أكتر في الـ Development حالياً؟",
    options: [
      { text: "\"بيشتغل عندي بس\" — التطبيق مش بيشتغل على سيرفر تاني", emoji: "😤", weight: { docker: 5, k8s: 1 } },
      { text: "الـ Deploy بياخد وقت وبيتعمل يدوي", emoji: "⏳", weight: { cicd: 5, docker: 1 } },
      { text: "بيخلق سيرفرات من الـ Console يدوياً وده بياخد وقت", emoji: "🖱️", weight: { terraform: 5, cicd: 1 } },
      { text: "مش عارف إيه اللي بيحصل في Production", emoji: "🔍", weight: { monitoring: 5, k8s: 1 } },
    ],
  },
  {
    question: "إيه هدفك المهني في DevOps؟",
    options: [
      { text: "DevOps Engineer — أبني Pipelines وأشتغل بالـ Automation", emoji: "⚙️", weight: { cicd: 3, docker: 2, terraform: 2 } },
      { text: "Cloud Engineer — أبني Infrastructure على Cloud", emoji: "☁️", weight: { terraform: 4, k8s: 2, monitoring: 1 } },
      { text: "SRE — أضمن إن الـ Systems شغالة وموثوقة", emoji: "🛡️", weight: { monitoring: 4, k8s: 3, docker: 1 } },
      { text: "Platform Engineer — أبني الـ Platform للـ Developers", emoji: "🏗️", weight: { k8s: 4, terraform: 2, monitoring: 2 } },
    ],
  },
  {
    question: "إيه خلفيتك البرمجية الحالية؟",
    options: [
      { text: "Developer — بكتب كود وعايز أفهم الـ DevOps جنبه", emoji: "👨‍💻", weight: { docker: 4, cicd: 3 } },
      { text: "SysAdmin / IT — عارف Linux وعايز أتطور", emoji: "🖥️", weight: { terraform: 3, monitoring: 3, k8s: 2 } },
      { text: "مبتدئ تماماً — محتاج أبدأ من الأساس", emoji: "🌱", weight: { docker: 5, cicd: 2 } },
      { text: "عارف Cloud وعايز أعمق في الـ Orchestration", emoji: "🚀", weight: { k8s: 5, terraform: 2 } },
    ],
  },
];

/* ============================================================
   ROADMAP
   ============================================================ */
const ROADMAP_STEPS = [
  {
    step: "Step 01",
    title: "Linux وCommand Line — الأساس اللي بيبني عليه كل حاجة",
    desc: "مفيش DevOps بدون Linux. تعلم الأوامر الأساسية: ls, cd, grep, ps, top, chmod, ssh. اعرف إزاي تقرا الـ Logs وتفهم الـ Processes. ابدأ بـ Ubuntu على VirtualBox أو WSL لو على Windows.",
    duration: "أسبوعان",
  },
  {
    step: "Step 02",
    title: "Git بعمق — مش بس add وcommit",
    desc: "تعلم Branching، Merging، Rebasing، وإزاي تحل الـ Conflicts. اعرف GitFlow وTrunk-Based Development. كل الـ CI/CD بيبدأ من Git — لو مش مسيطر عليه كويس هيتعبك.",
    duration: "أسبوع",
  },
  {
    step: "Step 03",
    title: "Docker — ابني أول Container",
    desc: "اكتب أول Dockerfile، اعمل Build وRun. اتعلم Docker Compose وبيه شغّل تطبيق مع Database مع بعض. اعمل Image صغيرة وOptimized. Docker Hub — اعمل Push وPull. ده أهم خطوة في رحلتك.",
    duration: "3 أسابيع",
  },
  {
    step: "Step 04",
    title: "GitHub Actions — أول CI/CD Pipeline",
    desc: "اعمل Pipeline بسيطة: كل Push بيشغّل Tests، وكل Merge للـ main بيعمل Build للـ Docker Image. اتعلم الـ Secrets والـ Environments. ده اللي بيحوّل الكود للـ Production أوتوماتيك.",
    duration: "أسبوعان",
  },
  {
    step: "Step 05",
    title: "Cloud Basics وTerraform",
    desc: "اختار Cloud واحدة — AWS الأشهر. اتعلم EC2، S3، VPC، RDS بالـ Console الأول. بعدين اعمل نفس الحاجة بـ Terraform. شوف الفرق — وهتعرف ليه IaC بيغير كل حاجة.",
    duration: "شهر",
  },
  {
    step: "Step 06",
    title: "Kubernetes وMonitoring في Production",
    desc: "جرب K8s على Minikube محلياً الأول. اتعلم Pods، Services، Deployments، وIngress. بعدين ابني Prometheus + Grafana وراقب تطبيقك. ده اللي بيخليك DevOps Engineer حقيقي مش بس اسم.",
    duration: "شهرين",
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
   TABS
   ============================================================ */
function renderFrameworkPanel(key) {
  const fw = FRAMEWORKS[key];
  if (!fw) return;
  const metaLabels = ["المبتكر / الشركة", "سنة الإطلاق", "النوع", "بدائل / مكمّلات"];
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
  renderFrameworkPanel("docker");
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
  const scores = { docker: 0, k8s: 0, cicd: 0, terraform: 0, monitoring: 0 };
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
  $("#quizStepIndicator").textContent = "النتيجة 🎉";
  $("#quizContent").innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-icon">${fw.icon}</div>
      <h3>ابدأ بيها دلوقتي</h3>
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
  $("#quizProgressFill").style.width = ((index + 1) / QUIZ_QUESTIONS.length * 100) + "%";
  $("#quizStepIndicator").textContent = `السؤال ${index + 1} من ${QUIZ_QUESTIONS.length}`;
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
      line.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      line.style.opacity = "1";
      line.style.transform = "translateX(0)";
    }, 700 + i * 150);
  });
}

/* ============================================================
   KEYBOARD — press O to cycle tools
   ============================================================ */
function initKeyboardShortcuts() {
  const keys = Object.keys(FRAMEWORKS);
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "o" && e.target.tagName !== "INPUT") {
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
    "%c ⚙ DevOps ⚙ ",
    "background:#ff9f43;color:#0a0c0d;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;"
  );
  console.log(
    "%cنصيحة: اضغط حرف 'O' للتنقل بين الأدوات بسرعة! ♾️",
    "color:#ff9f43;font-family:monospace;font-size:12px;"
  );
});