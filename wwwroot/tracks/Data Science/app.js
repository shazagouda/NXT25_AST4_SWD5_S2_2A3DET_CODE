"use strict";

/* ============================================================
   TRANSLATIONS — Arabic & English
   ============================================================ */
const TRANSLATIONS = {
  ar: {
    "nav.what":  "ما هو Data Science؟",
    "nav.fw":    "الأدوات",
    "nav.cmp":   "المقارنة",
    "nav.road":  "ابدأ من هنا",
    "nav.badge": "دليلك",

    "hero.tag":    "دليل المبتدئ في Data Science",
    "hero.title1": "كل اللي محتاج",
    "hero.title2": "تعرفه عن",
    "hero.sub":    "من فهم البيانات للـ Machine Learning لغاية ما تبني Model حقيقي — دليل واضح ومبسط بدون تعقيد.",
    "hero.cta1":   "ابدأ الرحلة",
    "hero.cta2":   "قارن الأدوات",
    "hero.scroll": "اسكرول للأسفل",
    "code.file": "'data.csv'",
    "code.acc":  '"accuracy: 97.3%"',

    "what.tag":           "الأساسيات",
    "what.title":         "إيه هو الـ Data Science؟",
    "what.sub":           "الـ Data Science هو فن استخراج المعرفة والقرارات من البيانات — بيجمع بين الإحصاء والبرمجة والفهم التجاري. المجال الأكثر طلباً وأعلى أجراً في القرن الواحد والعشرين.",
    "what.analogy.title": "فكر في الأمر كده",
    "what.analogy.body":  "تخيل إن عندك <strong>ملايين الأرقام والبيانات</strong> عن مبيعات شركة. الـ Data Scientist هو اللي بيحوّل الأرقام دي لـ <strong>قرارات تجارية ذكية</strong> — \"المنتج ده هيبيع أكتر في الشتاء\"، \"العميل ده هيمشي بعد 3 أيام\". ده مش سحر — ده علم.",
    "what.data":     "الخامة الأساسية — أرقام، نصوص، صور، فيديوهات. بدون بيانات نظيفة ومنظمة، مفيش Data Science.",
    "what.analysis": "الإحصاء والـ Visualization — فهم البيانات، إيجاد الأنماط، وعرضها بطريقة واضحة ومقنعة.",
    "what.model":    "الـ Machine Learning — تعليم الكمبيوتر يتعلم من البيانات ويتنبأ بالمستقبل. ده اللي بيميز الـ Data Scientist.",

    "fwintro.tag":   "المفهوم",
    "fwintro.title": "ليه تتعلم Data Science؟",
    "fwintro.sub1":  "كل شركة في العالم دلوقتي عندها بيانات ضخمة ومحتاجة حد <strong>يفهمها ويحولها لقرارات</strong>. الـ Data Scientist هو اللي بيعمل كده.",
    "fwintro.sub2":  "<strong>متوسط الراتب عالمياً</strong> للـ Data Scientist من أعلى التخصصات في الـ Tech — وطلب السوق بيزيد كل سنة.",
    "fwintro.b1":    "من أعلى الرواتب في مجال الـ Tech",
    "fwintro.b2":    "طلب هائل في كل قطاع — مالي، طبي، تقني",
    "fwintro.b3":    "Python + Math = يفتحوا كل الأبواب",
    "fwintro.b4":    "بوابة الـ AI والـ Machine Learning",

    "fw.tag":   "الأدوات",
    "fw.title": "أهم أدوات ومكتبات الـ Data Science",
    "fw.sub":   "اعرف كل أداة — إيه هي، وامتى وليه تستخدمها.",

    "panel.creator":  "الشركة / المطور",
    "panel.year":     "سنة الإطلاق",
    "panel.type":     "النوع",
    "panel.lang":     "اللغة",
    "panel.pros":     "المميزات",
    "panel.cons":     "العيوب",
    "panel.verdict":  "الحكم النهائي",

    "cmp.tag":       "المقارنة",
    "cmp.title":     "مقارنة أدوات الـ Data Science",
    "cmp.sub":       "جدول واضح يساعدك تعرف متى تستخدم كل أداة.",
    "cmp.criterion": "المعيار",
    "cmp.diff":      "صعوبة البداية",
    "cmp.perf":      "الأداء",
    "cmp.community": "الـ Community",
    "cmp.usecase":   "الاستخدام الأساسي",
    "cmp.companies": "الشركات",
    "cmp.for":       "مناسب لـ",
    "cmp.pan":  "Data Wrangling",
    "cmp.npy":  "Math & Arrays",
    "cmp.skl":  "Classic ML",
    "cmp.tf":   "Deep Learning",
    "cmp.pt":   "Research & DL",
    "cmp.pan2": "تنظيف البيانات",
    "cmp.npy2": "العمليات الرياضية",
    "cmp.skl2": "Classic ML Models",
    "cmp.tf2":  "Neural Networks",
    "cmp.pt2":  "البحث والـ DL",

    "l.easy":    "سهل",
    "l.med":     "متوسط",
    "l.hard":    "صعب",
    "l.great":   "ممتاز",
    "l.good":    "كويس",
    "l.limited": "محدود",

    "quiz.tag":     "اكتشف نفسك",
    "quiz.title":   "أنهي مسار Data Science يناسبك؟",
    "quiz.sub":     "جاوب على 3 أسئلة وهنقترح عليك الأنسب.",
    "quiz.step":    "السؤال {n} من {total}",
    "quiz.result":  "النتيجة",
    "quiz.rec":     "المسار الأنسب ليك هو",
    "quiz.restart": "جرب تاني",

    "q1.q":  "إيه هدفك الأساسي في Data Science؟",
    "q1.o1": "أحلل بيانات الأعمال وأساعد في القرارات",
    "q1.o2": "أبني نماذج Machine Learning لتوقع المستقبل",
    "q1.o3": "أشتغل في الـ AI وDeep Learning والـ LLMs",
    "q1.o4": "أعمل تحليل بيانات طبية أو علمية",

    "q2.q":  "إيه خلفيتك الحالية؟",
    "q2.o1": "مش بعرف برمجة — بدأ من الصفر",
    "q2.o2": "بعرف Python أو بحاول أتعلمه",
    "q2.o3": "عندي خلفية رياضيات أو إحصاء",
    "q2.o4": "عندي خلفية برمجة وعايز أتحول لـ Data",

    "q3.q":  "أنهي نوع البيانات اللي هتشتغل عليها؟",
    "q3.o1": "بيانات أعمال — مبيعات، عملاء، تقارير",
    "q3.o2": "بيانات منظمة في جداول وقواعد بيانات",
    "q3.o3": "صور، نصوص، صوت — Unstructured Data",
    "q3.o4": "بيانات علمية أو طبية أو مالية متخصصة",

    "road.tag":   "خارطة الطريق",
    "road.title": "من فين تبدأ Data Science؟",
    "road.sub":   "الخطوات الصح، بالترتيب الصح — من الصفر للاحتراف.",

    "footer.sub":   "البيانات مش بتكذب — وأنت كمان.",
    "footer.copy":  "صُنع بـ",
    "footer.copy2": "لكل مبتدئ بيحلم يفهم البيانات",
  },

  en: {
    "nav.what":  "What is Data Science?",
    "nav.fw":    "Tools",
    "nav.cmp":   "Comparison",
    "nav.road":  "Start Here",
    "nav.badge": "Your Guide",

    "hero.tag":    "Beginner's Guide to Data Science",
    "hero.title1": "Everything you need",
    "hero.title2": "to know about",
    "hero.sub":    "From understanding data to Machine Learning — until you build a real Model. A clear, beginner-friendly guide.",
    "hero.cta1":   "Start the Journey",
    "hero.cta2":   "Compare Tools",
    "hero.scroll": "Scroll Down",
    "code.file": "'data.csv'",
    "code.acc":  '"accuracy: 97.3%"',

    "what.tag":           "The Basics",
    "what.title":         "What is Data Science?",
    "what.sub":           "Data Science is the art of extracting knowledge and decisions from data — combining statistics, programming, and business understanding. The most in-demand and highest-paying field of the 21st century.",
    "what.analogy.title": "Think of it this way",
    "what.analogy.body":  "Imagine you have <strong>millions of numbers and data points</strong> about a company's sales. The Data Scientist is the one who turns those numbers into <strong>smart business decisions</strong> — \"this product will sell more in winter\", \"this customer will churn in 3 days\". That's not magic — that's science.",
    "what.data":     "The fundamental raw material — numbers, text, images, videos. Without clean, organized data, there is no Data Science.",
    "what.analysis": "Statistics and Visualization — understanding the data, finding patterns, and presenting them in a clear, convincing way.",
    "what.model":    "Machine Learning — teaching computers to learn from data and predict the future. This is what sets a Data Scientist apart.",

    "fwintro.tag":   "The Concept",
    "fwintro.title": "Why Learn Data Science?",
    "fwintro.sub1":  "Every company in the world now has massive data and needs someone to <strong>understand it and turn it into decisions</strong>. That's the Data Scientist.",
    "fwintro.sub2":  "<strong>Average global salary</strong> for a Data Scientist is among the highest in Tech — and market demand grows every year.",
    "fwintro.b1":    "Among the highest salaries in Tech",
    "fwintro.b2":    "Massive demand in every sector — finance, medical, tech",
    "fwintro.b3":    "Python + Math = open every door",
    "fwintro.b4":    "Gateway to AI and Machine Learning",

    "fw.tag":   "Tools",
    "fw.title": "Most Important Data Science Tools & Libraries",
    "fw.sub":   "Know each tool — what it is, when and why to use it.",

    "panel.creator":  "Creator / Company",
    "panel.year":     "Released",
    "panel.type":     "Type",
    "panel.lang":     "Language",
    "panel.pros":     "Pros",
    "panel.cons":     "Cons",
    "panel.verdict":  "Final Verdict",

    "cmp.tag":       "Comparison",
    "cmp.title":     "Data Science Tools Comparison",
    "cmp.sub":       "A clear table to help you know when to use each tool.",
    "cmp.criterion": "Criterion",
    "cmp.diff":      "Difficulty",
    "cmp.perf":      "Performance",
    "cmp.community": "Community",
    "cmp.usecase":   "Primary Use",
    "cmp.companies": "Used By",
    "cmp.for":       "Best For",
    "cmp.pan":  "Data Wrangling",
    "cmp.npy":  "Math & Arrays",
    "cmp.skl":  "Classic ML",
    "cmp.tf":   "Deep Learning",
    "cmp.pt":   "Research & DL",
    "cmp.pan2": "Data Cleaning",
    "cmp.npy2": "Math Operations",
    "cmp.skl2": "Classic ML Models",
    "cmp.tf2":  "Neural Networks",
    "cmp.pt2":  "Research & DL",

    "l.easy":    "Easy",
    "l.med":     "Medium",
    "l.hard":    "Hard",
    "l.great":   "Excellent",
    "l.good":    "Good",
    "l.limited": "Limited",

    "quiz.tag":     "Discover Yourself",
    "quiz.title":   "Which Data Science Path Suits You?",
    "quiz.sub":     "Answer 3 questions and we'll suggest the best fit.",
    "quiz.step":    "Question {n} of {total}",
    "quiz.result":  "Result",
    "quiz.rec":     "Your best path is",
    "quiz.restart": "Try Again",

    "q1.q":  "What is your main goal in Data Science?",
    "q1.o1": "Analyze business data and support decisions",
    "q1.o2": "Build Machine Learning models to predict the future",
    "q1.o3": "Work in AI, Deep Learning, and LLMs",
    "q1.o4": "Analyze medical or scientific data",

    "q2.q":  "What is your current background?",
    "q2.o1": "No programming background — starting from scratch",
    "q2.o2": "Know some Python or trying to learn it",
    "q2.o3": "Have a math or statistics background",
    "q2.o4": "Have a programming background, want to move to Data",

    "q3.q":  "What type of data will you work with?",
    "q3.o1": "Business data — sales, customers, reports",
    "q3.o2": "Structured data in tables and databases",
    "q3.o3": "Images, text, audio — Unstructured Data",
    "q3.o4": "Scientific, medical, or financial specialized data",

    "road.tag":   "Roadmap",
    "road.title": "Where to Start with Data Science?",
    "road.sub":   "The right steps, in the right order — from zero to mastery.",

    "footer.sub":   "Data doesn't lie — and neither should you.",
    "footer.copy":  "Made with",
    "footer.copy2": "for every beginner who dreams of understanding data",
  },
};

/* ============================================================
   TOOLS DATA (bilingual)
   ============================================================ */
const FRAMEWORKS = {
  pandas: {
    name: "Pandas",
    tagline: { ar: "سلاحك الأول لتنظيف وتحليل البيانات", en: "Your first weapon for data cleaning and analysis" },
    icon: '<i class="fa-brands fa-python" style="color:#a78bfa"></i>',
    desc: {
      ar: `Pandas هي أشهر مكتبة Python للتعامل مع البيانات الجدولية. بتقدر تقرأ CSV وExcel وSQL وتنظفها وتحللها ببضع سطور. الـ DataFrame هو الكائن الأساسي — زي الـ Excel ولكن بقوة برمجة. مش ممكن تكون Data Scientist من غيرها.`,
      en: `Pandas is the most popular Python library for working with tabular data. You can read CSV, Excel, SQL, clean and analyze it in a few lines. The DataFrame is the core object — like Excel but with the power of programming. You can't be a Data Scientist without it.`,
    },
    meta: { creator: "Wes McKinney", year: "2008", type: "Data Manipulation", language: "Python" },
    pros: {
      ar: ["قراءة أي نوع بيانات — CSV, Excel, SQL, JSON", "تنظيف البيانات بسهولة — handle missing values، duplicates", "Groupby وAggregation قوية جداً", "Integration مع كل مكتبات الـ DS الأخرى"],
      en: ["Read any data type — CSV, Excel, SQL, JSON", "Easy data cleaning — handle missing values, duplicates", "Very powerful Groupby and Aggregation", "Integration with all other DS libraries"],
    },
    cons: {
      ar: ["بطيئة مع البيانات الكبيرة جداً (ملايين+ صف)", "Memory usage عالي", "Syntax بيتغير أحياناً بين الإصدارات"],
      en: ["Slow with very large data (millions+ rows)", "High memory usage", "Syntax sometimes changes between versions"],
    },
    verdict: {
      ar: "أول حاجة تتعلمها في Data Science بعد Python. كل مشروع هيبدأ بـ Pandas.",
      en: "The first thing to learn in Data Science after Python. Every project starts with Pandas.",
    },
  },
  numpy: {
    name: "NumPy",
    tagline: { ar: "أساس كل حسابات الـ Data Science والـ ML", en: "Foundation of all Data Science and ML calculations" },
    icon: '<i class="fa-solid fa-calculator" style="color:#4e9fd1"></i>',
    desc: {
      ar: `NumPy هي المكتبة الأساسية للحسابات الرقمية في Python. بتوفر Arrays متعددة الأبعاد وعمليات رياضية سريعة جداً (مكتوبة بـ C). كل مكتبة DS أو ML تعتمد عليها تحت الغطاء — Pandas وScikit-learn وTensorFlow كلهم مبنيين فوقيها.`,
      en: `NumPy is the fundamental library for numerical computing in Python. It provides multi-dimensional arrays and very fast math operations (written in C). Every DS or ML library depends on it under the hood — Pandas, Scikit-learn, and TensorFlow are all built on top of it.`,
    },
    meta: { creator: "Travis Oliphant", year: "2005", type: "Numerical Computing", language: "Python / C" },
    pros: {
      ar: ["أسرع بكتير من Python Lists العادية", "Broadcasting — عمليات على Arrays بشكل ذكي", "Linear Algebra كاملة — matrix operations", "أساس كل مكتبات الـ ML"],
      en: ["Much faster than regular Python Lists", "Broadcasting — smart operations on Arrays", "Complete Linear Algebra — matrix operations", "Foundation of all ML libraries"],
    },
    cons: {
      ar: ["مش مناسبة مباشرة للبيانات الجدولية (دي Pandas)", "Debugging صعب في الـ multi-dimensional arrays", "Memory layout محتاج فهم عميق للأداء"],
      en: ["Not directly suited for tabular data (that's Pandas)", "Debugging multi-dimensional arrays is tricky", "Memory layout needs deep understanding for performance"],
    },
    verdict: {
      ar: "مش لازم تتعلمها بعمق في البداية — لكن لازم تعرف الأساسيات. هتحتاجها في كل Model.",
      en: "You don't need to learn it deeply at first — but you must know the basics. You'll need it in every Model.",
    },
  },
  sklearn: {
    name: "Scikit-learn",
    tagline: { ar: "أسهل وأشمل مكتبة لـ Classic Machine Learning", en: "Easiest and most complete library for Classic Machine Learning" },
    icon: '<i class="fa-solid fa-robot" style="color:#f59e0b"></i>',
    desc: {
      ar: `Scikit-learn هي المكتبة الأولى للـ Machine Learning في Python. بتوفر كل الـ Classic ML Algorithms جاهزة — Linear Regression، Decision Trees، Random Forest، SVM، K-Means. API موحدة وبسيطة جداً: fit() → predict() → score(). مثالية للمبتدئين والمحترفين.`,
      en: `Scikit-learn is the number one Machine Learning library in Python. It provides all Classic ML Algorithms ready-made — Linear Regression, Decision Trees, Random Forest, SVM, K-Means. A unified, very simple API: fit() → predict() → score(). Perfect for beginners and professionals.`,
    },
    meta: { creator: "David Cournapeau / INRIA", year: "2007", type: "Machine Learning", language: "Python" },
    pros: {
      ar: ["API موحدة لكل الـ Algorithms — تعلم مرة استخدم كل حاجة", "Documentation ممتازة مع أمثلة", "Preprocessing كاملة — Scaling، Encoding، Feature Selection", "Model Evaluation شاملة — Cross-validation، Metrics"],
      en: ["Unified API for all Algorithms — learn once, use everything", "Excellent documentation with examples", "Complete Preprocessing — Scaling, Encoding, Feature Selection", "Comprehensive Model Evaluation — Cross-validation, Metrics"],
    },
    cons: {
      ar: ["مش مناسبة للـ Deep Learning (ده TensorFlow/PyTorch)", "GPU support محدود", "مش مثالية للبيانات الضخمة جداً"],
      en: ["Not suitable for Deep Learning (that's TensorFlow/PyTorch)", "Limited GPU support", "Not ideal for very large datasets"],
    },
    verdict: {
      ar: "أساسية لأي Data Scientist. اتقنها قبل ما تمشي للـ Deep Learning.",
      en: "Essential for any Data Scientist. Master it before moving to Deep Learning.",
    },
  },
  tensorflow: {
    name: "TensorFlow / Keras",
    tagline: { ar: "قوة Google في الـ Deep Learning — للإنتاج والبحث", en: "Google's power in Deep Learning — for production and research" },
    icon: '<i class="fa-solid fa-brain" style="color:#ff6f00"></i>',
    desc: {
      ar: `TensorFlow صنعته Google سنة 2015 وده من أشهر Frameworks للـ Deep Learning. Keras هي الـ High-Level API بتاعته اللي بتسهل بناء الـ Neural Networks. بيستخدمه Google وApple وAirbnb في الـ Production. لو عايز تشتغل في شركة Tech كبيرة، TensorFlow هو المطلوب.`,
      en: `TensorFlow was created by Google in 2015 and is one of the most famous Deep Learning Frameworks. Keras is its High-Level API that simplifies building Neural Networks. Used by Google, Apple, and Airbnb in Production. If you want to work at a large Tech company, TensorFlow is what's needed.`,
    },
    meta: { creator: "Google Brain", year: "2015", type: "Deep Learning Framework", language: "Python / C++" },
    pros: {
      ar: ["الأقوى في الـ Production Deployment", "TensorFlow Serving للـ APIs", "TensorFlow Lite للـ Mobile", "Community ضخم ومتقدم"],
      en: ["Strongest in Production Deployment", "TensorFlow Serving for APIs", "TensorFlow Lite for Mobile", "Huge and advanced community"],
    },
    cons: {
      ar: ["Steep learning curve أكبر من PyTorch", "Debugging أصعب", "API تغير كتير بين الإصدارات (v1 vs v2)"],
      en: ["Steeper learning curve than PyTorch", "Harder to debug", "API changed a lot between versions (v1 vs v2)"],
    },
    verdict: {
      ar: "اختاره لو هدفك الـ Production والشركات الكبيرة. تعلم Keras أول كـ High-Level API بتاعته.",
      en: "Choose it if your goal is Production and large companies. Learn Keras first as its High-Level API.",
    },
  },
  viz: {
    name: "Matplotlib / Seaborn / Plotly",
    tagline: { ar: "حوّل الأرقام لصور — الـ Visualization قوة حقيقية", en: "Turn numbers into visuals — Visualization is real power" },
    icon: '<i class="fa-solid fa-chart-pie" style="color:#ec4899"></i>',
    desc: {
      ar: `الـ Visualization مش تزيين — هي طريقة فهم البيانات واتخاذ القرارات. Matplotlib هي الأساس والأقدم. Seaborn فوقيها وأجمل للإحصاء. Plotly للـ Interactive Charts. الـ Data Scientist اللي بيقدر يعرض بياناته بشكل واضح بيتميز في أي Presentation أو Meeting.`,
      en: `Visualization is not decoration — it's the way to understand data and make decisions. Matplotlib is the foundation and oldest. Seaborn is built on top of it and better for statistics. Plotly for Interactive Charts. A Data Scientist who can present their data clearly stands out in any Presentation or Meeting.`,
    },
    meta: { creator: "John Hunter / Michael Waskom / Plotly Team", year: "2003 / 2012 / 2012", type: "Data Visualization", language: "Python" },
    pros: {
      ar: ["Matplotlib: تحكم كامل في كل تفصيلة", "Seaborn: Statistical plots جاهزة وجميلة بسطر", "Plotly: Interactive charts تتشارك فيها مع الآخرين", "Integration مع Pandas و Jupyter"],
      en: ["Matplotlib: Full control over every detail", "Seaborn: Ready and beautiful statistical plots in one line", "Plotly: Interactive charts to share with others", "Integration with Pandas and Jupyter"],
    },
    cons: {
      ar: ["Matplotlib: Verbose جداً للـ complex charts", "Seaborn: Customization محدودة بعض الشيء", "Plotly: File size كبير في الـ HTML exports"],
      en: ["Matplotlib: Very verbose for complex charts", "Seaborn: Somewhat limited customization", "Plotly: Large file size in HTML exports"],
    },
    verdict: {
      ar: "ابدأ بـ Matplotlib تفهم الأساس. اتعلم Seaborn للإحصاء. استخدم Plotly لما تعمل Dashboards أو Presentations.",
      en: "Start with Matplotlib to understand the foundation. Learn Seaborn for statistics. Use Plotly when making Dashboards or Presentations.",
    },
  },
};

/* ============================================================
   QUIZ PATHS DATA
   ============================================================ */
const QUIZ_PATHS = {
  analyst: {
    name: { ar: "Data Analyst", en: "Data Analyst" },
    icon: '<i class="fa-solid fa-chart-bar" style="color:#a78bfa; font-size:3rem"></i>',
    verdict: {
      ar: "مسارك هو الـ Data Analyst — تحليل البيانات التجارية، SQL، Excel، Power BI، وPython. الأكثر طلباً في الشركات المصرية والعربية.",
      en: "Your path is Data Analyst — business data analysis, SQL, Excel, Power BI, and Python. Most in-demand in Egyptian and Arab companies.",
    },
  },
  ml_engineer: {
    name: { ar: "ML Engineer", en: "ML Engineer" },
    icon: '<i class="fa-solid fa-robot" style="color:#f59e0b; font-size:3rem"></i>',
    verdict: {
      ar: "مسارك هو الـ ML Engineer — بناء وتدريب Models، Feature Engineering، Model Deployment. مزيج من Data Science والـ Software Engineering.",
      en: "Your path is ML Engineer — building and training Models, Feature Engineering, Model Deployment. A mix of Data Science and Software Engineering.",
    },
  },
  ai_researcher: {
    name: { ar: "AI / Deep Learning", en: "AI / Deep Learning" },
    icon: '<i class="fa-solid fa-brain" style="color:#38bdf8; font-size:3rem"></i>',
    verdict: {
      ar: "مسارك هو الـ AI — Deep Learning، Neural Networks، NLP، Computer Vision. محتاج رياضيات قوية وصبر — لكن الحلم الأكبر في الـ Tech.",
      en: "Your path is AI — Deep Learning, Neural Networks, NLP, Computer Vision. Requires strong math and patience — but the biggest dream in Tech.",
    },
  },
  research_analyst: {
    name: { ar: "Research / Domain Expert", en: "Research / Domain Expert" },
    icon: '<i class="fa-solid fa-microscope" style="color:#4ade80; font-size:3rem"></i>',
    verdict: {
      ar: "مسارك هو الـ Research Analyst — تخصصك في مجال معين (طب، مالية، علوم) + Data Science. الأندر والأعلى قيمة.",
      en: "Your path is Research Analyst — specialize in a domain (medical, finance, science) + Data Science. The rarest and most valuable.",
    },
  },
};

/* ============================================================
   QUIZ QUESTIONS
   ============================================================ */
const QUIZ_QUESTIONS_DATA = [
  {
    q: { ar: "q1.q", en: "q1.q" },
    options: [
      { ar: "q1.o1", en: "q1.o1", weight: { analyst: 4, ml_engineer: 1 } },
      { ar: "q1.o2", en: "q1.o2", weight: { ml_engineer: 4, analyst: 1 } },
      { ar: "q1.o3", en: "q1.o3", weight: { ai_researcher: 5, ml_engineer: 2 } },
      { ar: "q1.o4", en: "q1.o4", weight: { research_analyst: 5, analyst: 1 } },
    ],
  },
  {
    q: { ar: "q2.q", en: "q2.q" },
    options: [
      { ar: "q2.o1", en: "q2.o1", weight: { analyst: 3 } },
      { ar: "q2.o2", en: "q2.o2", weight: { analyst: 2, ml_engineer: 2 } },
      { ar: "q2.o3", en: "q2.o3", weight: { ai_researcher: 3, research_analyst: 2 } },
      { ar: "q2.o4", en: "q2.o4", weight: { ml_engineer: 4, ai_researcher: 2 } },
    ],
  },
  {
    q: { ar: "q3.q", en: "q3.q" },
    options: [
      { ar: "q3.o1", en: "q3.o1", weight: { analyst: 4 } },
      { ar: "q3.o2", en: "q3.o2", weight: { analyst: 3, ml_engineer: 2 } },
      { ar: "q3.o3", en: "q3.o3", weight: { ai_researcher: 4, ml_engineer: 2 } },
      { ar: "q3.o4", en: "q3.o4", weight: { research_analyst: 5, analyst: 1 } },
    ],
  },
];

/* ============================================================
   ROADMAP DATA
   ============================================================ */
const ROADMAP_DATA = {
  ar: [
    /* ─── Phase 1 ─── */
    {
      phase: "المرحلة الأولى — الأساسيات",
      phase_sub: "قبل أي Data Science — لازم تبني الأساس الصح",
      color: "#a78bfa", icon: "fa-brands fa-python",
      step: "الخطوة 01", duration: "1–2 شهر",
      title: "Python — اللغة الأساسية للـ Data Science",
      desc: "Python هي لغة الـ Data Science بلا منافس. مش محتاج تبقى خبير برمجة — محتاج تعرف الأساسيات كويس. Variables، Functions، Loops، Lists، Dicts، وOOP الأساسي.",
      download: { label:"ابدأ Python", url:"https://docs.python.org/3/tutorial/", icon:"fa-brands fa-python", color:"#3776ab" },
      subs: [
        { tag:"Python Basics", icon:"fa-brands fa-python", title:"Python من الصفر",
          desc:"Variables، Functions، Lists، Dicts، Loops، Conditions. ركز على الأجزاء دي — هي اللي هتحتاجها في كل يوم.",
          resources:[
            { name:"CS50P – Harvard", url:"https://cs50.harvard.edu/python/2022/", icon:"fa-solid fa-graduation-cap" },
            { name:"Python.org Tutorial", url:"https://docs.python.org/3/tutorial/", icon:"fa-brands fa-python" },
            { name:"Automate the Boring Stuff", url:"https://automatetheboringstuff.com", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"Jupyter", icon:"fa-solid fa-laptop-code", title:"Jupyter Notebook / Google Colab",
          desc:"بيئة الشغل في الـ Data Science. تقدر تكتب كود وتشوف النتائج فوراً. Google Colab مجاني ومحتاجش تنصب حاجة.",
          resources:[
            { name:"Google Colab", url:"https://colab.research.google.com", icon:"fa-brands fa-google" },
            { name:"Jupyter Docs", url:"https://jupyter.org/try", icon:"fa-solid fa-laptop-code" },
          ]},
        { tag:"Git", icon:"fa-brands fa-git-alt", title:"Git & GitHub الأساسيات",
          desc:"احفظ كودك وشاركه. كل Data Scientist لازم عنده GitHub profile بيعرض مشاريعه.",
          resources:[
            { name:"GitHub Skills", url:"https://skills.github.com", icon:"fa-brands fa-github" },
            { name:"Git Docs", url:"https://git-scm.com/doc", icon:"fa-solid fa-book" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "المرحلة الأولى — الأساسيات",
      phase_sub: null,
      color: "#8b5cf6", icon: "fa-solid fa-calculator",
      step: "الخطوة 02", duration: "3–4 أسابيع",
      title: "الرياضيات والإحصاء الأساسية",
      desc: "مش محتاج تبقى رياضياتي — بس محتاج تفهم المفاهيم دي كويس. Statistics، Probability، وLinear Algebra الأساسية هي سلاحك في فهم الـ Models.",
      download: null,
      subs: [
        { tag:"Statistics", icon:"fa-solid fa-chart-bar", title:"Statistics الأساسية",
          desc:"Mean، Median، Variance، Standard Deviation، Distributions، Hypothesis Testing. ده اللي بيفرق بين حد فاهم وحد حافظ.",
          resources:[
            { name:"Khan Academy Statistics", url:"https://www.khanacademy.org/math/statistics-probability", icon:"fa-solid fa-graduation-cap" },
            { name:"StatQuest YouTube", url:"https://www.youtube.com/@statquest", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Linear Algebra", icon:"fa-solid fa-vector-square", title:"Linear Algebra للـ ML",
          desc:"Vectors، Matrices، Dot Product، Eigenvalues. مش عارف أتعمق — بس اتعلم الأساسيات اللي هتحتاجها في الـ Neural Networks.",
          resources:[
            { name:"3Blue1Brown – Essence of LA", url:"https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", icon:"fa-brands fa-youtube" },
            { name:"Khan Academy Linear Algebra", url:"https://www.khanacademy.org/math/linear-algebra", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Probability", icon:"fa-solid fa-dice", title:"Probability الأساسية",
          desc:"Conditional Probability، Bayes' Theorem، Distributions. ده أساس فهم الـ Bayesian ML والـ Naive Bayes.",
          resources:[
            { name:"Khan Academy Probability", url:"https://www.khanacademy.org/math/probability", icon:"fa-solid fa-graduation-cap" },
            { name:"Seeing Theory", url:"https://seeing-theory.brown.edu", icon:"fa-solid fa-book-open" },
          ]},
      ], frameworks: null,
    },

    /* ─── Phase 2 ─── */
    {
      phase: "المرحلة الثانية — أدوات البيانات",
      phase_sub: "دلوقتي تتعلم تتعامل مع البيانات فعلاً",
      color: "#7c3aed", icon: "fa-brands fa-python",
      step: "الخطوة 03", duration: "1–2 شهر",
      title: "Pandas + NumPy + Matplotlib",
      desc: "الثالوث المقدس للـ Data Science. Pandas لتنظيف البيانات، NumPy للحسابات، Matplotlib/Seaborn لعرضها. ابدأ بـ Dataset حقيقية من Kaggle.",
      download: { label:"ابدأ Pandas", url:"https://pandas.pydata.org/docs/getting_started/intro_tutorials/", icon:"fa-brands fa-python", color:"#a78bfa" },
      subs: [
        { tag:"Pandas", icon:"fa-brands fa-python", title:"Pandas — تنظيف وتحليل البيانات",
          desc:"DataFrame، Series، read_csv، groupby، merge، fillna، dropna. اعمل Exploratory Data Analysis (EDA) كاملة على Dataset حقيقية.",
          resources:[
            { name:"Pandas Official Tutorial", url:"https://pandas.pydata.org/docs/getting_started/intro_tutorials/", icon:"fa-brands fa-python" },
            { name:"Kaggle Pandas Course", url:"https://www.kaggle.com/learn/pandas", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"NumPy", icon:"fa-solid fa-calculator", title:"NumPy — الحسابات الرقمية",
          desc:"Arrays، Broadcasting، Linear Algebra Functions. مش لازم تعمق — اتعلم الـ basics اللي Pandas وScikit-learn هتحتاجها.",
          resources:[
            { name:"NumPy Official Docs", url:"https://numpy.org/doc/stable/user/absolute_beginners.html", icon:"fa-solid fa-book" },
            { name:"Kaggle NumPy", url:"https://www.kaggle.com/learn/pandas", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Visualization", icon:"fa-solid fa-chart-pie", title:"Matplotlib + Seaborn",
          desc:"Line plots، Bar charts، Histograms، Heatmaps، Pair plots. الـ EDA مش ممكن من غير Visualization. خليها جزء من كل Analysis.",
          resources:[
            { name:"Seaborn Tutorial", url:"https://seaborn.pydata.org/tutorial.html", icon:"fa-solid fa-chart-pie" },
            { name:"Matplotlib Tutorials", url:"https://matplotlib.org/stable/tutorials/index.html", icon:"fa-solid fa-book" },
          ]},
        { tag:"SQL", icon:"fa-solid fa-database", title:"SQL — لازم تعرفه",
          desc:"SELECT، WHERE، GROUP BY، JOIN. معظم البيانات في الشركات في Databases — SQL مهارة لا غنى عنها لأي Data Analyst أو Scientist.",
          resources:[
            { name:"Mode SQL Tutorial", url:"https://mode.com/sql-tutorial/", icon:"fa-solid fa-book-open" },
            { name:"Kaggle SQL", url:"https://www.kaggle.com/learn/intro-to-sql", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: ["pandas", "numpy"],
    },

    /* ─── Phase 3 ─── */
    {
      phase: "المرحلة الثالثة — Machine Learning",
      phase_sub: "هنا بيبدأ الجزء الأكثر إثارة — تعليم الكمبيوتر",
      color: "#f59e0b", icon: "fa-solid fa-robot",
      step: "الخطوة 04", duration: "2–3 شهور",
      title: "Scikit-learn — Classic Machine Learning",
      desc: "ابدأ بالـ Supervised Learning. Linear Regression للأرقام، Logistic Regression للتصنيف. بعدين Decision Trees، Random Forest، وSVM. اتعلم الـ workflow الصح لكل مشروع ML.",
      download: { label:"ابدأ Scikit-learn", url:"https://scikit-learn.org/stable/getting_started.html", icon:"fa-solid fa-robot", color:"#f59e0b" },
      subs: [
        { tag:"Supervised", icon:"fa-solid fa-sitemap", title:"Supervised Learning",
          desc:"Regression: تتنبأ بأرقام (أسعار عقارات). Classification: تتنبأ بفئات (Spam أو لا). اتعلم Train/Test Split وCross-Validation.",
          resources:[
            { name:"Scikit-learn User Guide", url:"https://scikit-learn.org/stable/user_guide.html", icon:"fa-solid fa-book" },
            { name:"Kaggle Intro to ML", url:"https://www.kaggle.com/learn/intro-to-machine-learning", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Unsupervised", icon:"fa-solid fa-circle-nodes", title:"Unsupervised Learning",
          desc:"Clustering (K-Means) لتجميع البيانات المتشابهة. PCA لتقليل الأبعاد. مفيش labels — الـ Model بيكتشف الأنماط بنفسه.",
          resources:[
            { name:"Scikit-learn Clustering", url:"https://scikit-learn.org/stable/modules/clustering.html", icon:"fa-solid fa-book" },
            { name:"StatQuest – Clustering", url:"https://www.youtube.com/@statquest", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Evaluation", icon:"fa-solid fa-gauge-high", title:"Model Evaluation — الأهم",
          desc:"Accuracy، Precision، Recall، F1-Score، ROC-AUC. فهم الـ Metrics هو الفرق بين حد بيشغل Model وحد بيفهم نتايجه.",
          resources:[
            { name:"Scikit-learn Metrics", url:"https://scikit-learn.org/stable/modules/model_evaluation.html", icon:"fa-solid fa-book" },
            { name:"ML Metrics Explained", url:"https://www.kaggle.com/learn/intermediate-machine-learning", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Feature Eng.", icon:"fa-solid fa-wand-magic-sparkles", title:"Feature Engineering",
          desc:"تحويل البيانات الخام لـ Features مفيدة للـ Model. Encoding، Scaling، Imputation، Feature Selection. ده اللي بيفرق الـ Model الكويس.",
          resources:[
            { name:"Kaggle Feature Engineering", url:"https://www.kaggle.com/learn/feature-engineering", icon:"fa-solid fa-graduation-cap" },
            { name:"Sklearn Preprocessing", url:"https://scikit-learn.org/stable/modules/preprocessing.html", icon:"fa-solid fa-book" },
          ]},
      ], frameworks: ["sklearn"],
    },
    {
      phase: "المرحلة الثالثة — Machine Learning",
      phase_sub: null,
      color: "#ec4899", icon: "fa-solid fa-chart-line",
      step: "الخطوة 05", duration: "3–4 أسابيع",
      title: "مشاريع Kaggle حقيقية — الممارسة الأساسية",
      desc: "Kaggle هو أفضل مكان تطبق فيه اللي اتعلمته. ابدأ بـ Titanic (أسهل competition). بعدين House Prices. كل مشروع بيعلمك حاجة جديدة مش ممكن تتعلمها من tutorial.",
      download: { label:"ابدأ على Kaggle", url:"https://www.kaggle.com/competitions?listBy=entered", icon:"fa-solid fa-chart-line", color:"#20beff" },
      subs: [
        { tag:"EDA", icon:"fa-solid fa-magnifying-glass-chart", title:"Exploratory Data Analysis الكاملة",
          desc:"افهم بياناتك قبل ما تبني أي Model. Missing values، Distributions، Correlations، Outliers. الـ EDA هو 70% من أي مشروع DS.",
          resources:[
            { name:"Kaggle Titanic", url:"https://www.kaggle.com/competitions/titanic", icon:"fa-solid fa-graduation-cap" },
            { name:"EDA Tutorial", url:"https://www.kaggle.com/code/spscientist/student-performance-in-exams", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"Competitions", icon:"fa-solid fa-trophy", title:"Kaggle Competitions للتعلم",
          desc:"Titanic → House Prices → أي Competition في مجالك. اقرأ الـ Notebooks الأولى وافهم كيف بيفكروا — مش بس اكتب كود.",
          resources:[
            { name:"Kaggle Learn Path", url:"https://www.kaggle.com/learn", icon:"fa-solid fa-graduation-cap" },
            { name:"Kaggle House Prices", url:"https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques", icon:"fa-solid fa-house" },
          ]},
      ], frameworks: ["pandas", "sklearn"],
    },

    /* ─── Phase 4 ─── */
    {
      phase: "المرحلة الرابعة — Deep Learning",
      phase_sub: "بعد ما اتقنت الـ Classic ML — جهز نفسك للـ Deep Learning",
      color: "#38bdf8", icon: "fa-solid fa-brain",
      step: "الخطوة 06", duration: "2–4 شهور",
      title: "TensorFlow / Keras + PyTorch",
      desc: "الـ Deep Learning هو مستقبل الـ AI. Neural Networks، CNNs للصور، RNNs/Transformers للنصوص. ابدأ بـ Keras لأنها الأسهل.",
      download: { label:"ابدأ Keras", url:"https://keras.io/getting_started/", icon:"fa-solid fa-brain", color:"#ff6f00" },
      subs: [
        { tag:"Neural Networks", icon:"fa-solid fa-brain", title:"Neural Networks الأساسيات",
          desc:"Perceptron، Activation Functions، Backpropagation، Gradient Descent. افهم كيف بيتعلم الـ Model — مش بس تشغّله.",
          resources:[
            { name:"3Blue1Brown – Neural Networks", url:"https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", icon:"fa-brands fa-youtube" },
            { name:"fast.ai – Practical DL", url:"https://course.fast.ai", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Keras / TF", icon:"fa-solid fa-layer-group", title:"Keras — أسهل طريق للـ Deep Learning",
          desc:"Sequential API، Dense Layers، Compile، Fit، Evaluate. اعمل Image Classifier وText Classifier من الصفر.",
          resources:[
            { name:"Keras Official Docs", url:"https://keras.io/getting_started/", icon:"fa-solid fa-book" },
            { name:"TensorFlow Tutorials", url:"https://www.tensorflow.org/tutorials", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"PyTorch", icon:"fa-solid fa-fire-flame-curved", title:"PyTorch — للبحث والتجريب",
          desc:"الأكثر استخداماً في الـ Research. Dynamic Graph بيخليه أسهل في الـ Debugging. Meta وTesla بيستخدموه.",
          resources:[
            { name:"PyTorch Official Tutorials", url:"https://pytorch.org/tutorials/beginner/basics/intro.html", icon:"fa-solid fa-book" },
            { name:"fast.ai PyTorch", url:"https://course.fast.ai", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"NLP", icon:"fa-solid fa-comment-dots", title:"NLP + Transformers + HuggingFace",
          desc:"معالجة النصوص — Tokenization، Embeddings، BERT، GPT. HuggingFace بيديك Models جاهزة بسطرين.",
          resources:[
            { name:"HuggingFace Course", url:"https://huggingface.co/learn/nlp-course/chapter1/1", icon:"fa-solid fa-graduation-cap" },
            { name:"HuggingFace Docs", url:"https://huggingface.co/docs", icon:"fa-solid fa-book" },
          ]},
      ], frameworks: ["tensorflow", "sklearn"],
    },

    /* ─── Phase 5 ─── */
    {
      phase: "المرحلة الخامسة — الاحتراف",
      phase_sub: "انت دلوقتي Data Scientist حقيقي — ده اللي بيميزك",
      color: "#f59e0b", icon: "fa-solid fa-rocket",
      step: "الخطوة 07", duration: "مستمر",
      title: "Portfolio + MLOps + المجتمع",
      desc: "الشهادات والـ Certificates مش كافية — الـ Portfolio والمشاريع هي اللي بتقنع أي Recruiter. وابقى جزء من مجتمع الـ Data Science.",
      download: null,
      subs: [
        { tag:"Portfolio", icon:"fa-brands fa-github", title:"Portfolio Projects حقيقية",
          desc:"اعمل 3–5 مشاريع DS متكاملة — كل مشروع فيه EDA، Model، ونتايج واضحة. ارفعهم على GitHub مع README تفصيلي.",
          resources:[
            { name:"GitHub Pages", url:"https://pages.github.com", icon:"fa-brands fa-github" },
            { name:"Streamlit للـ Apps", url:"https://streamlit.io", icon:"fa-solid fa-rocket" },
            { name:"DS Project Ideas", url:"https://github.com/academic/awesome-datascience", icon:"fa-solid fa-lightbulb" },
          ]},
        { tag:"MLOps", icon:"fa-solid fa-gears", title:"MLOps — Deploy الـ Models",
          desc:"MLflow لتتبع الـ Experiments. FastAPI لبناء API على الـ Model. Docker للـ Deployment. ده اللي بيفرق الـ Junior عن الـ Mid.",
          resources:[
            { name:"MLflow Docs", url:"https://mlflow.org/docs/latest/getting-started.html", icon:"fa-solid fa-gears" },
            { name:"FastAPI for ML", url:"https://fastapi.tiangolo.com/tutorial/", icon:"fa-solid fa-rocket" },
          ]},
        { tag:"Community", icon:"fa-brands fa-kaggle", title:"المجتمع والبقاء محدّث",
          desc:"Kaggle، Papers with Code، ArXiv للـ Research. تابع الـ DS newsletters وKaggle Grandmasters.",
          resources:[
            { name:"Papers with Code", url:"https://paperswithcode.com", icon:"fa-solid fa-file-lines" },
            { name:"Towards Data Science", url:"https://towardsdatascience.com", icon:"fa-brands fa-medium" },
            { name:"Kaggle Notebooks", url:"https://www.kaggle.com/code", icon:"fa-solid fa-code" },
          ]},
        { tag:"Interview", icon:"fa-solid fa-microphone", title:"DS Interview Prep",
          desc:"Statistics، ML Concepts، SQL، Python Coding، وCase Studies. الـ DS Interview مختلف — بيسألك تفسر نتايج وتحل مشاكل حقيقية.",
          resources:[
            { name:"DS Interview Questions", url:"https://www.interviewquery.com", icon:"fa-solid fa-book-open" },
            { name:"LeetCode SQL", url:"https://leetcode.com/studyplan/top-sql-50/", icon:"fa-solid fa-code" },
          ]},
      ], frameworks: ["pandas", "sklearn", "tensorflow", "viz"],
    },
  ],

  en: [
    {
      phase: "Phase 1 — Foundations",
      phase_sub: "Before any Data Science — build the right foundation",
      color: "#a78bfa", icon: "fa-brands fa-python",
      step: "Step 01", duration: "1–2 months",
      title: "Python — The Core Language of Data Science",
      desc: "Python is the undisputed language of Data Science. You don't need to be a programming expert — you need to know the basics well. Variables, Functions, Loops, Lists, Dicts, and basic OOP.",
      download: { label:"Start Python", url:"https://docs.python.org/3/tutorial/", icon:"fa-brands fa-python", color:"#3776ab" },
      subs: [
        { tag:"Python Basics", icon:"fa-brands fa-python", title:"Python from Zero",
          desc:"Variables, Functions, Lists, Dicts, Loops, Conditions. Focus on these parts — they're what you'll need every day.",
          resources:[
            { name:"CS50P – Harvard", url:"https://cs50.harvard.edu/python/2022/", icon:"fa-solid fa-graduation-cap" },
            { name:"Python.org Tutorial", url:"https://docs.python.org/3/tutorial/", icon:"fa-brands fa-python" },
            { name:"Automate the Boring Stuff", url:"https://automatetheboringstuff.com", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"Jupyter", icon:"fa-solid fa-laptop-code", title:"Jupyter Notebook / Google Colab",
          desc:"The working environment in Data Science. Write code and see results instantly. Google Colab is free and needs no installation.",
          resources:[
            { name:"Google Colab", url:"https://colab.research.google.com", icon:"fa-brands fa-google" },
            { name:"Jupyter Docs", url:"https://jupyter.org/try", icon:"fa-solid fa-laptop-code" },
          ]},
        { tag:"Git", icon:"fa-brands fa-git-alt", title:"Git & GitHub Basics",
          desc:"Save and share your code. Every Data Scientist needs a GitHub profile showcasing their projects.",
          resources:[
            { name:"GitHub Skills", url:"https://skills.github.com", icon:"fa-brands fa-github" },
            { name:"Git Docs", url:"https://git-scm.com/doc", icon:"fa-solid fa-book" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "Phase 1 — Foundations",
      phase_sub: null,
      color: "#8b5cf6", icon: "fa-solid fa-calculator",
      step: "Step 02", duration: "3–4 weeks",
      title: "Math & Statistics Foundations",
      desc: "You don't need to be a mathematician — but you need to understand these concepts well. Statistics, Probability, and basic Linear Algebra are your weapon for understanding Models.",
      download: null,
      subs: [
        { tag:"Statistics", icon:"fa-solid fa-chart-bar", title:"Basic Statistics",
          desc:"Mean, Median, Variance, Standard Deviation, Distributions, Hypothesis Testing. This is what separates someone who understands from someone who memorizes.",
          resources:[
            { name:"Khan Academy Statistics", url:"https://www.khanacademy.org/math/statistics-probability", icon:"fa-solid fa-graduation-cap" },
            { name:"StatQuest YouTube", url:"https://www.youtube.com/@statquest", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Linear Algebra", icon:"fa-solid fa-vector-square", title:"Linear Algebra for ML",
          desc:"Vectors, Matrices, Dot Product, Eigenvalues. No need to go deep — learn the basics you'll need for Neural Networks.",
          resources:[
            { name:"3Blue1Brown – Essence of LA", url:"https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", icon:"fa-brands fa-youtube" },
            { name:"Khan Academy Linear Algebra", url:"https://www.khanacademy.org/math/linear-algebra", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Probability", icon:"fa-solid fa-dice", title:"Basic Probability",
          desc:"Conditional Probability, Bayes' Theorem, Distributions. Foundation for understanding Bayesian ML and Naive Bayes.",
          resources:[
            { name:"Khan Academy Probability", url:"https://www.khanacademy.org/math/probability", icon:"fa-solid fa-graduation-cap" },
            { name:"Seeing Theory", url:"https://seeing-theory.brown.edu", icon:"fa-solid fa-book-open" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "Phase 2 — Data Tools",
      phase_sub: "Now you learn to actually work with data",
      color: "#7c3aed", icon: "fa-brands fa-python",
      step: "Step 03", duration: "1–2 months",
      title: "Pandas + NumPy + Matplotlib",
      desc: "The holy trinity of Data Science. Pandas to clean data, NumPy for calculations, Matplotlib/Seaborn to visualize. Start with a real Dataset from Kaggle.",
      download: { label:"Start Pandas", url:"https://pandas.pydata.org/docs/getting_started/intro_tutorials/", icon:"fa-brands fa-python", color:"#a78bfa" },
      subs: [
        { tag:"Pandas", icon:"fa-brands fa-python", title:"Pandas — Data Cleaning & Analysis",
          desc:"DataFrame, Series, read_csv, groupby, merge, fillna, dropna. Do a full Exploratory Data Analysis (EDA) on a real Dataset.",
          resources:[
            { name:"Pandas Official Tutorial", url:"https://pandas.pydata.org/docs/getting_started/intro_tutorials/", icon:"fa-brands fa-python" },
            { name:"Kaggle Pandas Course", url:"https://www.kaggle.com/learn/pandas", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"NumPy", icon:"fa-solid fa-calculator", title:"NumPy — Numerical Computing",
          desc:"Arrays, Broadcasting, Linear Algebra Functions. No need to go deep — learn the basics Pandas and Scikit-learn will need.",
          resources:[
            { name:"NumPy Official Docs", url:"https://numpy.org/doc/stable/user/absolute_beginners.html", icon:"fa-solid fa-book" },
            { name:"Kaggle NumPy", url:"https://www.kaggle.com/learn/pandas", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Visualization", icon:"fa-solid fa-chart-pie", title:"Matplotlib + Seaborn",
          desc:"Line plots, Bar charts, Histograms, Heatmaps, Pair plots. EDA is impossible without Visualization. Make it part of every Analysis.",
          resources:[
            { name:"Seaborn Tutorial", url:"https://seaborn.pydata.org/tutorial.html", icon:"fa-solid fa-chart-pie" },
            { name:"Matplotlib Tutorials", url:"https://matplotlib.org/stable/tutorials/index.html", icon:"fa-solid fa-book" },
          ]},
        { tag:"SQL", icon:"fa-solid fa-database", title:"SQL — You Must Know It",
          desc:"SELECT, WHERE, GROUP BY, JOIN. Most company data lives in Databases — SQL is an essential skill for any Data Analyst or Scientist.",
          resources:[
            { name:"Mode SQL Tutorial", url:"https://mode.com/sql-tutorial/", icon:"fa-solid fa-book-open" },
            { name:"Kaggle SQL", url:"https://www.kaggle.com/learn/intro-to-sql", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: ["pandas", "numpy"],
    },
    {
      phase: "Phase 3 — Machine Learning",
      phase_sub: "This is where it gets exciting — teaching the computer",
      color: "#f59e0b", icon: "fa-solid fa-robot",
      step: "Step 04", duration: "2–3 months",
      title: "Scikit-learn — Classic Machine Learning",
      desc: "Start with Supervised Learning. Linear Regression for numbers, Logistic Regression for classification. Then Decision Trees, Random Forest, and SVM. Learn the correct workflow for every ML project.",
      download: { label:"Start Scikit-learn", url:"https://scikit-learn.org/stable/getting_started.html", icon:"fa-solid fa-robot", color:"#f59e0b" },
      subs: [
        { tag:"Supervised", icon:"fa-solid fa-sitemap", title:"Supervised Learning",
          desc:"Regression: predict numbers (house prices). Classification: predict categories (Spam or not). Learn Train/Test Split and Cross-Validation.",
          resources:[
            { name:"Scikit-learn User Guide", url:"https://scikit-learn.org/stable/user_guide.html", icon:"fa-solid fa-book" },
            { name:"Kaggle Intro to ML", url:"https://www.kaggle.com/learn/intro-to-machine-learning", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Unsupervised", icon:"fa-solid fa-circle-nodes", title:"Unsupervised Learning",
          desc:"Clustering (K-Means) to group similar data. PCA for dimensionality reduction. No labels — the Model discovers patterns itself.",
          resources:[
            { name:"Scikit-learn Clustering", url:"https://scikit-learn.org/stable/modules/clustering.html", icon:"fa-solid fa-book" },
            { name:"StatQuest – Clustering", url:"https://www.youtube.com/@statquest", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Evaluation", icon:"fa-solid fa-gauge-high", title:"Model Evaluation — Most Important",
          desc:"Accuracy, Precision, Recall, F1-Score, ROC-AUC. Understanding Metrics is the difference between someone who runs a Model and someone who understands its results.",
          resources:[
            { name:"Scikit-learn Metrics", url:"https://scikit-learn.org/stable/modules/model_evaluation.html", icon:"fa-solid fa-book" },
            { name:"Kaggle Intermediate ML", url:"https://www.kaggle.com/learn/intermediate-machine-learning", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Feature Eng.", icon:"fa-solid fa-wand-magic-sparkles", title:"Feature Engineering",
          desc:"Transform raw data into useful Features for the Model. Encoding, Scaling, Imputation, Feature Selection. This is what makes a good Model great.",
          resources:[
            { name:"Kaggle Feature Engineering", url:"https://www.kaggle.com/learn/feature-engineering", icon:"fa-solid fa-graduation-cap" },
            { name:"Sklearn Preprocessing", url:"https://scikit-learn.org/stable/modules/preprocessing.html", icon:"fa-solid fa-book" },
          ]},
      ], frameworks: ["sklearn"],
    },
    {
      phase: "Phase 3 — Machine Learning",
      phase_sub: null,
      color: "#ec4899", icon: "fa-solid fa-chart-line",
      step: "Step 05", duration: "3–4 weeks",
      title: "Real Kaggle Projects — Essential Practice",
      desc: "Kaggle is the best place to apply what you've learned. Start with Titanic (easiest competition). Then House Prices. Each project teaches something you can't learn from a tutorial.",
      download: { label:"Start on Kaggle", url:"https://www.kaggle.com/competitions?listBy=entered", icon:"fa-solid fa-chart-line", color:"#20beff" },
      subs: [
        { tag:"EDA", icon:"fa-solid fa-magnifying-glass-chart", title:"Full Exploratory Data Analysis",
          desc:"Understand your data before building any Model. Missing values, Distributions, Correlations, Outliers. EDA is 70% of any DS project.",
          resources:[
            { name:"Kaggle Titanic", url:"https://www.kaggle.com/competitions/titanic", icon:"fa-solid fa-graduation-cap" },
            { name:"EDA Tutorial", url:"https://www.kaggle.com/code/spscientist/student-performance-in-exams", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"Competitions", icon:"fa-solid fa-trophy", title:"Kaggle Competitions for Learning",
          desc:"Titanic → House Prices → any Competition in your domain. Read the top Notebooks and understand how they think — not just write code.",
          resources:[
            { name:"Kaggle Learn Path", url:"https://www.kaggle.com/learn", icon:"fa-solid fa-graduation-cap" },
            { name:"Kaggle House Prices", url:"https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques", icon:"fa-solid fa-house" },
          ]},
      ], frameworks: ["pandas", "sklearn"],
    },
    {
      phase: "Phase 4 — Deep Learning",
      phase_sub: "After mastering Classic ML — prepare yourself for Deep Learning",
      color: "#38bdf8", icon: "fa-solid fa-brain",
      step: "Step 06", duration: "2–4 months",
      title: "TensorFlow / Keras + PyTorch",
      desc: "Deep Learning is the future of AI. Neural Networks, CNNs for images, RNNs/Transformers for text. Start with Keras — it's the easiest.",
      download: { label:"Start Keras", url:"https://keras.io/getting_started/", icon:"fa-solid fa-brain", color:"#ff6f00" },
      subs: [
        { tag:"Neural Networks", icon:"fa-solid fa-brain", title:"Neural Networks Basics",
          desc:"Perceptron, Activation Functions, Backpropagation, Gradient Descent. Understand how the Model learns — not just how to run it.",
          resources:[
            { name:"3Blue1Brown – Neural Networks", url:"https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", icon:"fa-brands fa-youtube" },
            { name:"fast.ai – Practical DL", url:"https://course.fast.ai", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Keras / TF", icon:"fa-solid fa-layer-group", title:"Keras — Easiest Path to Deep Learning",
          desc:"Sequential API, Dense Layers, Compile, Fit, Evaluate. Build an Image Classifier and Text Classifier from scratch.",
          resources:[
            { name:"Keras Official Docs", url:"https://keras.io/getting_started/", icon:"fa-solid fa-book" },
            { name:"TensorFlow Tutorials", url:"https://www.tensorflow.org/tutorials", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"PyTorch", icon:"fa-solid fa-fire-flame-curved", title:"PyTorch — For Research & Experimentation",
          desc:"Most used in Research. Dynamic Graph makes it easier to debug. Used by Meta and Tesla.",
          resources:[
            { name:"PyTorch Official Tutorials", url:"https://pytorch.org/tutorials/beginner/basics/intro.html", icon:"fa-solid fa-book" },
            { name:"fast.ai PyTorch", url:"https://course.fast.ai", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"NLP", icon:"fa-solid fa-comment-dots", title:"NLP + Transformers + HuggingFace",
          desc:"Text processing — Tokenization, Embeddings, BERT, GPT. HuggingFace gives you ready Models in two lines.",
          resources:[
            { name:"HuggingFace Course", url:"https://huggingface.co/learn/nlp-course/chapter1/1", icon:"fa-solid fa-graduation-cap" },
            { name:"HuggingFace Docs", url:"https://huggingface.co/docs", icon:"fa-solid fa-book" },
          ]},
      ], frameworks: ["tensorflow", "sklearn"],
    },
    {
      phase: "Phase 5 — Mastery",
      phase_sub: "You're now a real Data Scientist — this is what sets you apart",
      color: "#f59e0b", icon: "fa-solid fa-rocket",
      step: "Step 07", duration: "Ongoing",
      title: "Portfolio + MLOps + Community",
      desc: "Certificates alone aren't enough — Portfolio and projects are what convince any Recruiter. Become part of the Data Science community.",
      download: null,
      subs: [
        { tag:"Portfolio", icon:"fa-brands fa-github", title:"Real Portfolio Projects",
          desc:"Build 3–5 complete DS projects — each with EDA, Model, and clear results. Upload to GitHub with a detailed README.",
          resources:[
            { name:"GitHub Pages", url:"https://pages.github.com", icon:"fa-brands fa-github" },
            { name:"Streamlit for Apps", url:"https://streamlit.io", icon:"fa-solid fa-rocket" },
            { name:"DS Project Ideas", url:"https://github.com/academic/awesome-datascience", icon:"fa-solid fa-lightbulb" },
          ]},
        { tag:"MLOps", icon:"fa-solid fa-gears", title:"MLOps — Deploy Your Models",
          desc:"MLflow to track Experiments. FastAPI to build an API on your Model. Docker for Deployment. What separates Junior from Mid.",
          resources:[
            { name:"MLflow Docs", url:"https://mlflow.org/docs/latest/getting-started.html", icon:"fa-solid fa-gears" },
            { name:"FastAPI for ML", url:"https://fastapi.tiangolo.com/tutorial/", icon:"fa-solid fa-rocket" },
          ]},
        { tag:"Community", icon:"fa-brands fa-kaggle", title:"Community & Staying Updated",
          desc:"Kaggle, Papers with Code, ArXiv for Research. Follow DS newsletters and Kaggle Grandmasters.",
          resources:[
            { name:"Papers with Code", url:"https://paperswithcode.com", icon:"fa-solid fa-file-lines" },
            { name:"Towards Data Science", url:"https://towardsdatascience.com", icon:"fa-brands fa-medium" },
            { name:"Kaggle Notebooks", url:"https://www.kaggle.com/code", icon:"fa-solid fa-code" },
          ]},
        { tag:"Interview", icon:"fa-solid fa-microphone", title:"DS Interview Prep",
          desc:"Statistics, ML Concepts, SQL, Python Coding, and Case Studies. DS interviews are different — they ask you to interpret results and solve real problems.",
          resources:[
            { name:"DS Interview Questions", url:"https://www.interviewquery.com", icon:"fa-solid fa-book-open" },
            { name:"LeetCode SQL", url:"https://leetcode.com/studyplan/top-sql-50/", icon:"fa-solid fa-code" },
          ]},
      ], frameworks: ["pandas", "sklearn", "tensorflow", "viz"],
    },
  ],
};

/* ============================================================
   FW COLORS & ICONS
   ============================================================ */
const FW_COLORS = {
  pandas: "#a78bfa", numpy: "#4e9fd1", sklearn: "#f59e0b",
  tensorflow: "#ff6f00", viz: "#ec4899"
};
const FW_ICONS = {
  pandas: "fa-brands fa-python", numpy: "fa-solid fa-calculator",
  sklearn: "fa-solid fa-robot", tensorflow: "fa-solid fa-brain", viz: "fa-solid fa-chart-pie"
};
const FW_LABELS = {
  pandas: "Pandas", numpy: "NumPy", sklearn: "Scikit-learn",
  tensorflow: "TensorFlow", viz: "Viz"
};

/* ============================================================
   STATE
   ============================================================ */
let currentLang  = localStorage.getItem("lang")  || "ar";
let currentTheme = localStorage.getItem("theme") || "dark";
let quizAnswers  = {};
let currentQuestion = 0;

/* ============================================================
   i18n
   ============================================================ */
function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS["ar"][key] || key;
}

function applyTranslations() {
  const isEn = currentLang === "en";
  document.documentElement.setAttribute("lang", isEn ? "en" : "ar");
  document.documentElement.setAttribute("dir",  isEn ? "ltr" : "rtl");
  document.documentElement.setAttribute("data-lang", currentLang);

  const bsLink = document.querySelector('link[href*="bootstrap"]');
  if (bsLink) bsLink.href = isEn
    ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const val = t(el.getAttribute("data-i18n"));
    if (val) el.innerHTML = val;
  });
  const ll = document.getElementById("langLabel");
  if (ll) ll.textContent = isEn ? "EN" : "AR";
  document.title = isEn
    ? "Data Science — Beginner's Guide"
    : "Data Science — دليل المبتدئين";
}

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const iL = document.getElementById("iconLight");
  const iD = document.getElementById("iconDark");
  if (iL) iL.style.display = theme === "light" ? "none" : "inline";
  if (iD) iD.style.display = theme === "light" ? "inline" : "none";
}
function initTheme() {
  applyTheme(currentTheme);
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });
}

/* ============================================================
   LANG
   ============================================================ */
function initLang() {
  applyTranslations();
  document.getElementById("langToggle")?.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyTranslations();
    renderFrameworkPanel(document.querySelector(".fw-tab.active")?.dataset.fw || "pandas");
    initRoadmap();
  });
}

/* ============================================================
   NAV
   ============================================================ */
function initNav() {
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => nav?.classList.toggle("scrolled", window.scrollY > 50));
  document.querySelectorAll(".nav-link-item").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ============================================================
   AOS
   ============================================================ */
function initAOS() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("aos-animate"),
          parseInt(e.target.dataset.aosDelay || "0"));
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll("[data-aos]").forEach(el => obs.observe(el));
}

/* ============================================================
   FRAMEWORK TABS
   ============================================================ */
function renderFrameworkPanel(key) {
  const fw = FRAMEWORKS[key];
  const panel = document.getElementById("fwPanel");
  if (!fw || !panel) return;
  const lang = currentLang;
  panel.innerHTML = `
    <div class="fw-panel-inner">
      <div class="d-flex align-items-center gap-3 mb-4">
        <div class="fw-panel-icon">${fw.icon}</div>
        <div>
          <div class="fw-panel-name">${fw.name}</div>
          <div class="fw-panel-tagline">${fw.tagline[lang]}</div>
        </div>
      </div>
      <p class="fw-panel-desc mb-4">${fw.desc[lang]}</p>
      <div class="d-flex flex-wrap gap-2 mb-4">
        <div class="fw-meta-item"><div class="fw-meta-label">${t("panel.creator")}</div><div class="fw-meta-value">${fw.meta.creator}</div></div>
        <div class="fw-meta-item"><div class="fw-meta-label">${t("panel.year")}</div><div class="fw-meta-value">${fw.meta.year}</div></div>
        <div class="fw-meta-item"><div class="fw-meta-label">${t("panel.type")}</div><div class="fw-meta-value">${fw.meta.type}</div></div>
        <div class="fw-meta-item"><div class="fw-meta-label">${t("panel.lang")}</div><div class="fw-meta-value">${fw.meta.language}</div></div>
      </div>
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-6">
          <div class="fw-pros-cons">
            <h5><i class="fa-solid fa-circle-check" style="color:#a78bfa"></i> ${t("panel.pros")}</h5>
            <ul class="fw-list mt-2">
              ${fw.pros[lang].map(p => `<li class="fw-list-item"><i class="fa-solid fa-check"></i><span>${p}</span></li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="fw-pros-cons">
            <h5><i class="fa-solid fa-circle-xmark" style="color:#f87171"></i> ${t("panel.cons")}</h5>
            <ul class="fw-list mt-2">
              ${fw.cons[lang].map(c => `<li class="fw-list-item"><i class="fa-solid fa-xmark"></i><span>${c}</span></li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
      <div class="fw-verdict">
        <h5><i class="fa-solid fa-scale-balanced"></i> ${t("panel.verdict")}</h5>
        <p class="mt-2">${fw.verdict[lang]}</p>
      </div>
    </div>`;
}

function initFrameworkTabs() {
  renderFrameworkPanel("pandas");
  document.querySelectorAll(".fw-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".fw-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderFrameworkPanel(tab.dataset.fw);
    });
  });
}

/* ============================================================
   PERF BARS
   ============================================================ */
function initPerfBars() {
  const tw = document.querySelector(".table-wrapper");
  if (!tw) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".perf-bar").forEach(bar => {
          const v = bar.dataset.perf || "50";
          bar.style.setProperty("--perf", v + "%");
          bar.classList.add("animate");
        });
      }
    });
  }, { threshold: 0.2 });
  obs.observe(tw);
}

/* ============================================================
   QUIZ
   ============================================================ */
function calcResult() {
  const scores = { analyst: 0, ml_engineer: 0, ai_researcher: 0, research_analyst: 0 };
  Object.values(quizAnswers).forEach(opt => {
    if (opt.weight) Object.entries(opt.weight).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v; });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function renderQuizResult(pathKey) {
  const path = QUIZ_PATHS[pathKey];
  const content = document.getElementById("quizContent");
  const step = document.getElementById("quizStepIndicator");
  if (!content) return;
  if (step) step.textContent = t("quiz.result");
  content.innerHTML = `
    <div class="quiz-result text-center py-4">
      <div style="margin-bottom:1rem">${path.icon}</div>
      <h3 class="mb-2">${t("quiz.rec")}</h3>
      <div class="quiz-result-fw mb-3" style="font-size:1.8rem;font-weight:900">${path.name[currentLang]}</div>
      <p class="mb-4">${path.verdict[currentLang]}</p>
      <button class="quiz-restart" onclick="location.reload()">${t("quiz.restart")}</button>
    </div>`;
}

function renderQuizQuestion(index) {
  const q = QUIZ_QUESTIONS_DATA[index];
  const fill = document.getElementById("quizProgressFill");
  const step = document.getElementById("quizStepIndicator");
  const content = document.getElementById("quizContent");
  if (!q || !content) return;
  if (fill) fill.style.width = (((index + 1) / QUIZ_QUESTIONS_DATA.length) * 100) + "%";
  if (step) step.textContent = t("quiz.step").replace("{n}", index + 1).replace("{total}", QUIZ_QUESTIONS_DATA.length);
  content.innerHTML = `
    <div class="quiz-question mb-4">${t(q.q[currentLang])}</div>
    <div class="quiz-options d-flex flex-column gap-3">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-idx="${i}">
          <i class="fa-regular fa-circle"></i>
          <span>${t(opt[currentLang])}</span>
        </button>`).join("")}
    </div>`;
  content.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", () => {
      quizAnswers[index] = q.options[parseInt(btn.dataset.idx)];
      if (index + 1 < QUIZ_QUESTIONS_DATA.length) {
        currentQuestion++;
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
  const tl = document.getElementById("roadmapTimeline");
  if (!tl) return;
  const data = ROADMAP_DATA[currentLang];
  let lastPhase = "", html = "";

  data.forEach((item, i) => {
    if (item.phase !== lastPhase) {
      html += `
        <div class="roadmap-phase-header" data-aos="fade-up">
          <div class="roadmap-phase-title">${item.phase}</div>
          ${item.phase_sub ? `<div class="roadmap-phase-sub">${item.phase_sub}</div>` : ""}
        </div>`;
      lastPhase = item.phase;
    }

    const fwBadges = item.frameworks
      ? item.frameworks.map(fw => `
          <span class="roadmap-fw-badge" style="--fw-color:${FW_COLORS[fw]}">
            <i class="${FW_ICONS[fw]}"></i> ${FW_LABELS[fw]}
          </span>`).join("")
      : "";

    const dlBtn = item.download
      ? `<a href="${item.download.url}" target="_blank" rel="noopener" class="download-btn" style="--dl-color:${item.download.color}">
          <i class="${item.download.icon}" style="color:${item.download.color}"></i>
          ${item.download.label}
          <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:.65rem;opacity:.7"></i>
        </a>`
      : "";

    const subHtml = item.subs.map(sub => `
      <div class="roadmap-sub-item">
        <div class="roadmap-sub-header">
          <i class="${sub.icon}" style="font-size:1rem;opacity:.8"></i>
          <span class="roadmap-sub-tag">${sub.tag}</span>
          <span class="roadmap-sub-title">${sub.title}</span>
        </div>
        <p class="roadmap-sub-desc">${sub.desc}</p>
        <div class="roadmap-sub-resources">
          ${sub.resources.map(r => `
            <a href="${r.url}" target="_blank" rel="noopener" class="roadmap-resource-link">
              <i class="${r.icon}"></i> ${r.name}
            </a>`).join("")}
        </div>
      </div>`).join("");

    html += `
      <div class="roadmap-item" data-aos="fade-right" data-aos-delay="${(i % 3) * 80}">
        <div class="roadmap-dot" style="background:${item.color};box-shadow:0 0 0 4px ${item.color}22"></div>
        <div class="roadmap-content roadmap-content-big">
          <div class="roadmap-content-top">
            <div class="roadmap-left-col">
              <div class="roadmap-step-tag">${item.step}</div>
              <div class="roadmap-title">
                <i class="${item.icon}" style="color:${item.color};margin-left:10px;margin-right:0"></i>
                ${item.title}
              </div>
              <p class="roadmap-desc">${item.desc}</p>
              <div class="roadmap-meta-row">
                <div class="roadmap-duration"><i class="fa-regular fa-clock"></i><span>${item.duration}</span></div>
                ${fwBadges ? `<div class="roadmap-fw-badges">${fwBadges}</div>` : ""}
                ${dlBtn}
              </div>
            </div>
          </div>
          <div class="roadmap-subs">${subHtml}</div>
        </div>
      </div>`;
  });

  tl.innerHTML = html;
}

/* ============================================================
   CODE TYPEWRITER
   ============================================================ */
function initCodeTypewriter() {
  document.getElementById("heroCodeBlock")?.querySelectorAll(".code-line").forEach((line, i) => {
    line.style.opacity = "0";
    line.style.transform = "translateX(10px)";
    setTimeout(() => {
      line.style.transition = "opacity .4s ease, transform .4s ease";
      line.style.opacity = "1";
      line.style.transform = "translateX(0)";
    }, 800 + i * 150);
  });
}

/* ============================================================
   ACTIVE NAV
   ============================================================ */
function initActiveNav() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting)
        document.querySelectorAll(".nav-link-item").forEach(a =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { threshold: 0.4 });
  document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
}

/* ============================================================
   CURSOR
   ============================================================ */
function initCursor() {
  const dot = Object.assign(document.createElement("div"), { className: "cursor-dot" });
  document.body.appendChild(dot);
  document.addEventListener("mousemove", e => {
    dot.style.left = e.clientX + "px";
    dot.style.top  = e.clientY + "px";
    dot.style.opacity = "1";
  });
  document.addEventListener("mouseleave", () => dot.style.opacity = "0");
  document.querySelectorAll("a,button,.fw-tab,.quiz-option").forEach(el => {
    el.addEventListener("mouseenter", () => dot.style.transform = "translate(-50%,-50%) scale(2.5)");
    el.addEventListener("mouseleave", () => dot.style.transform = "translate(-50%,-50%) scale(1)");
  });
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
function initKeyboardShortcuts() {
  const keys = Object.keys(FRAMEWORKS);
  let idx = 0;
  document.addEventListener("keydown", e => {
    if (e.target.tagName === "INPUT") return;
    if (e.key.toLowerCase() === "f") {
      idx = (idx + 1) % keys.length;
      document.querySelectorAll("#fwTabs .fw-tab").forEach(tab =>
        tab.classList.toggle("active", tab.dataset.fw === keys[idx]));
      renderFrameworkPanel(keys[idx]);
    }
    if (e.key.toLowerCase() === "t") document.getElementById("themeToggle")?.click();
    if (e.key.toLowerCase() === "l") document.getElementById("langToggle")?.click();
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLang();
  initNav();
  initAOS();
  initFrameworkTabs();
  initPerfBars();
  initQuiz();
  initRoadmap();
  initCodeTypewriter();
  initActiveNav();
  initCursor();
  initKeyboardShortcuts();
  setTimeout(() => {
    document.querySelectorAll("[data-aos]:not(.aos-animate)").forEach(el => el.classList.add("aos-animate"));
  }, 2000);
  console.log("%c Σ DataSci n=∞ ", "background:#a78bfa;color:#0d0d0d;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;");
  console.log("%c🎨 T = theme | 🌐 L = language | ⚡ F = tools", "color:#a78bfa;font-family:monospace;font-size:11px;");
});