"use strict";

/* ============================================================
   PLATFORMS DATA
   ============================================================ */
const FRAMEWORKS = {
  arduino: {
    name: "Arduino",
    tagline: "The gateway to hardware programming for everyone",
    icon: '<i class="bi bi-lightning-fill" style="color:#00979d"></i>',
    iconColor: "#00979d",
    desc: `Arduino ظهر سنة 2005 في إيطاليا وغيّر عالم الـ Embedded للأبد. لأول مرة المهندسين والهواة قدروا يتحكموا في الـ Hardware من غير ما يحتاجوا خلفية عميقة في الإلكترونيات. Arduino Uno يعمل على AVR Microcontroller (ATmega328P) — بطيء ومحدود الذاكرة، لكن Abstraction Layer بتاعته بيخفي التعقيد. الـ Arduino IDE بسيطة جداً، والـ Community ضخم بشكل لا يصدق.`,
    meta: {
      creator: "Massimo Banzi & Team — Ivrea, Italy",
      year: "2005",
      type: "AVR Microcontroller Platform",
      used_by: "Makers, Education, Prototyping",
    },
    pros: [
      "أسهل بداية ممكنة في الـ Embedded — بيشتغل في دقائق",
      "Community ضخم جداً وفيه مكتبات لكل sensor وmodule",
      "رخيص جداً — Arduino Uno أقل من 5 دولار",
      "آلاف الـ Tutorials على اليوتيوب وبالعربي",
    ],
    cons: [
      "AVR بطيء ومحدود جداً — 16MHz و2KB RAM فقط",
      "Abstraction Layer يخفي المفاهيم الحقيقية",
      "مش للـ Production في المنتجات الاحترافية",
    ],
    verdict: "أول حاجة تشتريها وتبدأ بيها من غير تفكير. اعمل Blink LED، اقرا Sensors، تحكم في Motors — بعدين انتقل لـ STM32.",
  },

  stm32: {
    name: "STM32",
    tagline: "The industry-standard ARM Cortex microcontroller",
    icon: '<i class="bi bi-cpu" style="color:#03a9f4"></i>',
    iconColor: "#03a9f4",
    desc: `STM32 من شركة STMicroelectronics — الـ Microcontroller الأكثر استخداماً في الصناعة. بيعمل على ARM Cortex-M Architecture اللي موجودة في مليارات الأجهزة حول العالم. من الساعات الذكية للسيارات للطائرات. هنا الأمور بتتعقد — رح تتعلم Registers، DMA، Clock Trees، HAL Library. STM32CubeIDE هو الـ IDE الرسمي، وbig companies كلها بتستخدم STM32 أو نظيراتها.`,
    meta: {
      creator: "STMicroelectronics",
      year: "2007",
      type: "ARM Cortex-M Microcontroller",
      used_by: "Automotive, Medical, Industrial",
    },
    pros: [
      "ARM Cortex-M — أسرع وأقوى بكتير من AVR",
      "الأكثر طلباً في سوق العمل للـ Embedded",
      "STM32CubeMX — Code Generator رائع",
      "Peripheral ضخم — DMA, Timers, ADC, DAC متعدد",
    ],
    cons: [
      "Learning Curve شديد للمبتدئ",
      "Datasheet بـ 1000+ صفحة — لازم تتعلم تقراه",
      "Debugging أصعب — محتاج J-Link أو ST-Link",
    ],
    verdict: "هدفك بعد Arduino. ده اللي هيفتحلك باب سوق العمل. ابدأ بـ STM32F103 (Blue Pill) — رخيصة وفيها resources كتيرة.",
  },

  esp32: {
    name: "ESP32",
    tagline: "WiFi + Bluetooth + powerful MCU — all for $5",
    icon: '<i class="bi bi-wifi" style="color:#e7352c"></i>',
    iconColor: "#e7352c",
    desc: `ESP32 من شركة Espressif الصينية — الثورة الحقيقية في الـ IoT. بـ 5 دولار بس بتجيب Dual-Core processor، WiFi، Bluetooth، وكمية كبيرة من GPIO. Arduino IDE بتدعمه، وفيه كمان ESP-IDF للمحترفين. لو مشروعك محتاج wireless connectivity — ESP32 هو الاختيار الواضح. MicroPython كمان بيشتغل عليه لو مش بتحب C.`,
    meta: {
      creator: "Espressif Systems",
      year: "2016",
      type: "WiFi + BT Microcontroller",
      used_by: "IoT, Smart Home, Wearables",
    },
    pros: [
      "WiFi + Bluetooth Built-in — من غير chips إضافية",
      "Dual-Core 240MHz — قوي جداً بسعره",
      "يشتغل مع Arduino IDE وESP-IDF وMicroPython",
      "رخيص جداً ومتاح في كل مكان",
    ],
    cons: [
      "استهلاك طاقة أعلى من AVR — مش للـ Battery-powered المطول",
      "Real-Time أضعف من STM32 في بعض التطبيقات",
      "WiFi Stack يأخذ من الـ RAM الكتير",
    ],
    verdict: "مثالي لأي مشروع IoT أو Smart Home. لو عايز ترسل بيانات للـ Cloud أو تتحكم في حاجة من الموبايل — ESP32 هو اختيارك.",
  },

  rpi: {
    name: "Raspberry Pi",
    tagline: "A full Linux computer the size of your palm",
    icon: '<i class="bi bi-pie-chart-fill" style="color:#c51a4a"></i>',
    iconColor: "#c51a4a",
    desc: `Raspberry Pi مش Microcontroller — ده Microprocessor بيشغّل Linux كامل. Raspberry Pi 4 عنده 4 Cores، 8GB RAM، USB، HDMI، وGPIO. بتقدر تشغّل Python وC وJava وDocker وأي حاجة بتشتغل على Linux. مثالي للـ Embedded Linux، الـ Computer Vision، الـ Media Center، والمشاريع اللي محتاجة processing قوي. مش للـ Real-Time الصارم.`,
    meta: {
      creator: "Raspberry Pi Foundation",
      year: "2012",
      type: "Single-Board Computer",
      used_by: "Education, Robotics, Media Centers",
    },
    pros: [
      "Linux كامل — بتشتغل بأي لغة بتعرفها",
      "GPIO متصل بـ Linux — بتتحكم في Hardware من Python",
      "Community ضخم جداً وفيه projects لكل حاجة",
      "مثالي للـ Computer Vision مع OpenCV",
    ],
    cons: [
      "مش Real-Time — Linux Scheduler مش deterministic",
      "أغلى من Arduino وESP32 بكتير",
      "Boot Time بطيء — مش للأجهزة اللي محتاجة تشتغل فوراً",
    ],
    verdict: "اختاره لو مشروعك محتاج Linux أو processing قوي أو Camera. مش بديل للـ Microcontrollers الحقيقية في التطبيقات الصناعية.",
  },

  rtos: {
    name: "FreeRTOS",
    tagline: "Real-Time operating system for microcontrollers",
    icon: '<i class="bi bi-clock-history" style="color:#ffd93d"></i>',
    iconColor: "#ffd93d",
    desc: `FreeRTOS هو الـ RTOS الأشهر والأكثر استخداماً في الصناعة — مفتوح المصدر ومجاني. بيديك القدرة تشغّل Tasks متعددة على نفس الـ Microcontroller بشكل منظم. الـ Scheduler بيضمن إن كل Task بتشتغل في الوقت المحدد. Semaphores، Queues، Mutexes — هما بيانات التزامن في الـ Real-Time. AWS اشترته سنة 2017 وبيدعمه بشكل كبير.`,
    meta: {
      creator: "Richard Barry / Amazon Web Services",
      year: "2003",
      type: "Real-Time Operating System",
      used_by: "Automotive, Medical, Aerospace",
    },
    pros: [
      "مجاني ومفتوح المصدر مع دعم AWS",
      "يشتغل على STM32 وESP32 وكتير من الـ MCUs",
      "Task Scheduling — إدارة المهام المتعددة بكفاءة",
      "Documentation ممتازة وأمثلة كتيرة",
    ],
    cons: [
      "يحتاج فهم عميق بـ Embedded الأول",
      "Overhead على الـ RAM والـ CPU",
      "Debugging في بيئة Multitasking أصعب",
    ],
    verdict: "تعلمه بعد STM32. لما تبني مشروع فيه أكتر من Task تشتغل مع بعض — FreeRTOS بيوفر عليك تعب هائل في الـ Scheduling.",
  },
};

/* ============================================================
   QUIZ
   ============================================================ */
const QUIZ_QUESTIONS = [
  {
    question: "إيه اللي بتحلم تبنيه؟",
    options: [
      { text: "Robot أو Smart Car يتحرك ويستجيب للأوامر",    icon: "bi-robot",              weight: { arduino: 3, stm32: 3, esp32: 1 } },
      { text: "Smart Home Device متصل بالإنترنت",            icon: "bi-house-fill",         weight: { esp32: 5, rpi: 2 } },
      { text: "نظام صناعي أو جهاز طبي احترافي",              icon: "bi-gear-wide-connected", weight: { stm32: 5, rtos: 3 } },
      { text: "مشروع فيه Camera أو Computer Vision",         icon: "bi-camera-fill",        weight: { rpi: 5, esp32: 1 } },
    ],
  },
  {
    question: "إيه خلفيتك الحالية؟",
    options: [
      { text: "مبتدئ — مش متعلم برمجة ومش عارف إلكترونيات", icon: "bi-person-fill",         weight: { arduino: 5 } },
      { text: "عارف C/C++ بشكل كويس",                        icon: "bi-code-slash",          weight: { stm32: 4, esp32: 2, rtos: 2 } },
      { text: "عارف Python أو Linux بشكل كويس",              icon: "bi-terminal-fill",       weight: { rpi: 4, esp32: 2 } },
      { text: "عارف Arduino وعايز أترقى للاحتراف",           icon: "bi-lightning-charge-fill", weight: { stm32: 4, esp32: 3, rtos: 2 } },
    ],
  },
  {
    question: "إيه الأهم في مشروعك؟",
    options: [
      { text: "سرعة البداية ووضوح الكود",                    icon: "bi-speedometer2",        weight: { arduino: 4, rpi: 2 } },
      { text: "Wireless connectivity — WiFi أو Bluetooth",   icon: "bi-wifi",                weight: { esp32: 5 } },
      { text: "أداء Real-Time ودقة في التوقيت",              icon: "bi-clock-fill",          weight: { stm32: 4, rtos: 4 } },
      { text: "Processing قوي وتعدد المهام",                  icon: "bi-cpu-fill",            weight: { rpi: 4, stm32: 2, rtos: 2 } },
    ],
  },
];

/* ============================================================
   ROADMAP
   ============================================================ */
const ROADMAP_STEPS = [
  {
    step: "Step 01",
    title: "الإلكترونيات الأساسية + C Programming",
    desc: "قبل ما تلمس أي Microcontroller — افهم Voltage وCurrent وOhm's Law. بعدين اتعلم C من الجذر: Pointers، Arrays، Functions، والـ Bit Manipulation. الـ Embedded بدون C الصح مش ممكن.",
    duration: "شهر",
  },
  {
    step: "Step 02",
    title: "Arduino — اعمل أول 10 مشاريع",
    desc: "Blink LED، قرا Potentiometer، شغّل Servo Motor، استخدم Ultrasonic Sensor، اعمل LCD Display. كل مشروع بيعلمك مفهوم جديد. مش المهم تحفظ الكود — المهم تفهم ليه كل سطر موجود.",
    duration: "شهرين",
  },
  {
    step: "Step 03",
    title: "STM32 — ادخل عالم Registers الحقيقي",
    desc: "اشتري STM32F103C8T6 (Blue Pill) بـ 2 دولار. اتعلم STM32CubeIDE وHAL Library. اعمل نفس مشاريع Arduino بس بـ STM32 وشوف الفرق. اقرا Reference Manual وافهم كيف الـ GPIO وTimers بيشتغلوا من الـ Registers.",
    duration: "شهرين",
  },
  {
    step: "Step 04",
    title: "Protocols — UART, SPI, I2C, CAN",
    desc: "الـ Protocols هي لغة التواصل بين الـ Chips. UART للـ Serial Communication، SPI للسرعة العالية، I2C للـ Multi-device، CAN للسيارات. اعمل مشاريع تستخدم كل protocol واتعلم Oscilloscope تقرا الـ Signals.",
    duration: "شهر",
  },
  {
    step: "Step 05",
    title: "FreeRTOS — Real-Time Multitasking",
    desc: "اتعلم إزاي تبني system بيه أكتر من Task بتشتغلوا مع بعض. Tasks، Queues، Semaphores، Mutexes. اعمل مشروع فيه Task للـ Sensors وTask للـ Display وTask للـ Communication — وFreeRTOS يدير كل حاجة.",
    duration: "شهرين",
  },
  {
    step: "Step 06",
    title: "مشروع Portfolio حقيقي + MISRA C",
    desc: "اعمل مشروع كامل من الفكرة للـ PCB Design للـ Firmware للـ Testing. اتعلم MISRA C — الـ Coding Standard المستخدم في Automotive والطيران. ده اللي هيميزك في سوق العمل. ارفع الكود على GitHub مع Documentation.",
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
   PLATFORM TABS
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
  renderFrameworkPanel("arduino");
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
  const scores = { arduino: 0, stm32: 0, esp32: 0, rpi: 0, rtos: 0 };
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
    }, 600 + i * 140);
  });
}

/* ============================================================
   KEYBOARD — press E to cycle platforms
   ============================================================ */
function initKeyboardShortcuts() {
  const keys = Object.keys(FRAMEWORKS);
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "e" && e.target.tagName !== "INPUT") {
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
    "%c ⚡ Embedded Systems ⚡ ",
    "background:#badc58;color:#090b07;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;"
  );
  console.log(
    "%cنصيحة: اضغط حرف 'E' للتنقل بين المنصات بسرعة! 🔌",
    "color:#badc58;font-family:monospace;font-size:12px;"
  );
});