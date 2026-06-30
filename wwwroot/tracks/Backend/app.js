"use strict";

/* ============================================================
   TRANSLATIONS — Arabic & English
   ============================================================ */
const TRANSLATIONS = {
  ar: {
    "nav.what":  "ما هو Backend؟",
    "nav.fw":    "التقنيات",
    "nav.cmp":   "المقارنة",
    "nav.road":  "ابدأ من هنا",
    "nav.badge": "دليلك",
    "hero.tag":    "دليل المبتدئ في Backend",
    "hero.title1": "كل اللي محتاج",
    "hero.title2": "تعرفه عن",
    "hero.sub":    "من فهم الـ Server للـ Database لغاية ما تختار اللغة والـ Framework المناسب — دليل واضح ومبسط بدون تعقيد.",
    "hero.cta1":   "ابدأ الرحلة",
    "hero.cta2":   "قارن التقنيات",
    "hero.scroll": "اسكرول للأسفل",
    "code.route": "'/api/hello'",
    "code.msg":   '"مرحباً يا Backend! 🚀"',
    "what.tag":           "الأساسيات",
    "what.title":         "إيه هو الـ Backend؟",
    "what.sub":           "الـ Backend هو الجزء اللي المستخدم مش بيشوفه — لكنه اللي بيخلي كل حاجة تشتغل. البيانات، الأمان، المنطق، الـ Database. ببساطة: هو المطبخ اللي بيطبخ كل حاجة.",
    "what.analogy.title": "فكر في الأمر كده",
    "what.analogy.body":  "المطعم فيه <strong>صالة الاستقبال (Frontend)</strong> اللي الزبون بيشوفها. لكن في الخلف فيه <strong>مطبخ (Backend)</strong> — هنا بيتحضر الأكل، بيتحفظ الوصفات في الـ Database، وبيتم التحقق من هوية الزبون. بدون المطبخ، مفيش أكل. أنت الشيف!",
    "what.server":        "الكمبيوتر اللي شغال 24/7 وبيستقبل الطلبات من المستخدمين ويرد عليهم. هو اللي بيشغّل كودك.",
    "what.api":           "الوسيط بين الـ Frontend والـ Backend. بيحدد كيف يتبادلوا البيانات بشكل منظم ومتفق عليه.",
    "what.db":            "مكان حفظ البيانات بشكل منظم — المستخدمين، المنتجات، الطلبات. بدون Database، مفيش ذاكرة.",
    "fwintro.tag":   "المفهوم",
    "fwintro.title": "ليه تتعلم Backend؟",
    "fwintro.sub1":  "الـ Frontend بيتعامل مع المستخدم، لكن <strong>الـ Backend هو اللي بيتعامل مع البيانات الحقيقية</strong> — التسجيل، الدفع، الأمان، والـ Logic المعقد.",
    "fwintro.sub2":  "مع <strong>Backend قوي</strong> تقدر تبني أي حاجة — من API صغير لـ Platform ضخم زي Netflix أو Uber.",
    "fwintro.b1":    "تحكم كامل في البيانات والمنطق",
    "fwintro.b2":    "راتب أعلى من Frontend في معظم الأسواق",
    "fwintro.b3":    "طلب مستمر في كل شركة بدون استثناء",
    "fwintro.b4":    "يفتح باب الـ Full-Stack والـ DevOps",
    "fw.tag":   "التقنيات",
    "fw.title": "أشهر لغات وFrameworks الـ Backend",
    "fw.sub":   "اعرف كل تقنية — مين بيستخدمها، إيه مميزاتها، وامتى تختارها.",
    "panel.creator":  "الشركة / المطور",
    "panel.year":     "سنة الإطلاق",
    "panel.type":     "النوع",
    "panel.lang":     "اللغة",
    "panel.pros":     "المميزات",
    "panel.cons":     "العيوب",
    "panel.verdict":  "الحكم النهائي",
    "cmp.tag":       "المقارنة",
    "cmp.title":     "مقارنة شاملة بين التقنيات",
    "cmp.sub":       "جدول واضح يساعدك تشوف الفروق دفعة واحدة.",
    "cmp.criterion": "المعيار",
    "cmp.diff":      "صعوبة البداية",
    "cmp.perf":      "الأداء (Performance)",
    "cmp.community": "الـ Community",
    "cmp.jobs":      "فرص العمل",
    "cmp.companies": "الشركات",
    "cmp.for":       "مناسب لـ",
    "cmp.node":   "APIs, Real-time",
    "cmp.python": "AI, Data, Web",
    "cmp.java":   "Enterprise, Android",
    "cmp.dotnet": "Windows, Enterprise",
    "cmp.go":     "Microservices, Cloud",
    "l.easy":    "سهل",
    "l.med":     "متوسط",
    "l.hard":    "صعب",
    "l.great":   "ممتاز",
    "l.good":    "كويس",
    "l.limited": "محدود",
    "quiz.tag":     "اكتشف نفسك",
    "quiz.title":   "أنهي لغة Backend تناسبك؟",
    "quiz.sub":     "جاوب على 3 أسئلة وهنقترح عليك الأنسب.",
    "quiz.step":    "السؤال {n} من {total}",
    "quiz.result":  "النتيجة",
    "quiz.rec":     "اللغة الأنسب ليك هي",
    "quiz.restart": "جرب تاني",
    "q1.q":  "إيه هدفك الأساسي دلوقتي؟",
    "q1.o1": "أدخل سوق العمل بأسرع وقت",
    "q1.o2": "أبني APIs لتطبيقات AI وData Science",
    "q1.o3": "أشتغل في شركات Enterprise كبيرة",
    "q1.o4": "أبني Microservices وCloud Applications",
    "q2.q":  "إيه خلفيتك البرمجية؟",
    "q2.o1": "بعرف JavaScript/Node.js شوية",
    "q2.o2": "بعرف Python أو بحبه",
    "q2.o3": "جايي من Java أو OOP",
    "q2.o4": "مبتدئ تماماً من الصفر",
    "q3.q":  "إيه نوع المشاريع اللي عايز تشتغل عليها؟",
    "q3.o1": "مواقع وتطبيقات ويب عامة وAPIs",
    "q3.o2": "مشاريع AI وML وData Analysis",
    "q3.o3": "أنظمة كبيرة ومعقدة Enterprise",
    "q3.o4": "High-performance وCloud-native systems",
    "road.tag":   "خارطة الطريق",
    "road.title": "من فين تبدأ Backend؟",
    "road.sub":   "الخطوات الصح، بالترتيب الصح — من الصفر للاحتراف.",
    "footer.sub":   "الـ Server مش بيتوقف — وأنت برضو متوقفش.",
    "footer.copy":  "صُنع بـ",
    "footer.copy2": "لكل مبتدئ بيحلم يبني الـ Backend",
  },

  en: {
    "nav.what":  "What is Backend?",
    "nav.fw":    "Technologies",
    "nav.cmp":   "Comparison",
    "nav.road":  "Start Here",
    "nav.badge": "Your Guide",
    "hero.tag":    "Beginner's Guide to Backend",
    "hero.title1": "Everything you need",
    "hero.title2": "to know about",
    "hero.sub":    "From understanding Servers and Databases to choosing the right language and Framework — a clear, beginner-friendly guide.",
    "hero.cta1":   "Start the Journey",
    "hero.cta2":   "Compare Technologies",
    "hero.scroll": "Scroll Down",
    "code.route": "'/api/hello'",
    "code.msg":   '"Hello Backend! 🚀"',
    "what.tag":           "The Basics",
    "what.title":         "What is Backend?",
    "what.sub":           "Backend is the part the user never sees — but it's what makes everything work. Data, security, logic, the Database. Simply put: it's the kitchen that cooks everything.",
    "what.analogy.title": "Think of it this way",
    "what.analogy.body":  "A restaurant has a <strong>dining area (Frontend)</strong> that customers see. But in the back there's a <strong>kitchen (Backend)</strong> — where food is prepared, recipes are stored in the Database, and customer identity is verified. Without the kitchen, no food. You're the chef!",
    "what.server":        "The computer running 24/7 that receives requests from users and responds. It's what runs your code.",
    "what.api":           "The middleman between Frontend and Backend. It defines how they exchange data in an organized, agreed-upon way.",
    "what.db":            "Where data is stored in an organized way — users, products, orders. Without a Database, there's no memory.",
    "fwintro.tag":   "The Concept",
    "fwintro.title": "Why Learn Backend?",
    "fwintro.sub1":  "Frontend deals with the user, but <strong>Backend deals with the real data</strong> — registration, payments, security, and complex Logic.",
    "fwintro.sub2":  "With a <strong>powerful Backend</strong> you can build anything — from a small API to a massive platform like Netflix or Uber.",
    "fwintro.b1":    "Full control over data and logic",
    "fwintro.b2":    "Higher salary than Frontend in most markets",
    "fwintro.b3":    "Constant demand in every company without exception",
    "fwintro.b4":    "Opens the door to Full-Stack and DevOps",
    "fw.tag":   "Technologies",
    "fw.title": "Most Popular Backend Languages & Frameworks",
    "fw.sub":   "Know each technology — who uses it, its strengths, and when to choose it.",
    "panel.creator":  "Creator / Company",
    "panel.year":     "Released",
    "panel.type":     "Type",
    "panel.lang":     "Language",
    "panel.pros":     "Pros",
    "panel.cons":     "Cons",
    "panel.verdict":  "Final Verdict",
    "cmp.tag":       "Comparison",
    "cmp.title":     "Full Technology Comparison",
    "cmp.sub":       "A clear table to see all differences at once.",
    "cmp.criterion": "Criterion",
    "cmp.diff":      "Difficulty",
    "cmp.perf":      "Performance",
    "cmp.community": "Community",
    "cmp.jobs":      "Job Market",
    "cmp.companies": "Used By",
    "cmp.for":       "Best For",
    "cmp.node":   "APIs, Real-time",
    "cmp.python": "AI, Data, Web",
    "cmp.java":   "Enterprise, Android",
    "cmp.dotnet": "Windows, Enterprise",
    "cmp.go":     "Microservices, Cloud",
    "l.easy":    "Easy",
    "l.med":     "Medium",
    "l.hard":    "Hard",
    "l.great":   "Excellent",
    "l.good":    "Good",
    "l.limited": "Limited",
    "quiz.tag":     "Discover Yourself",
    "quiz.title":   "Which Backend Language Suits You?",
    "quiz.sub":     "Answer 3 questions and we'll suggest the best fit.",
    "quiz.step":    "Question {n} of {total}",
    "quiz.result":  "Result",
    "quiz.rec":     "Your best language match is",
    "quiz.restart": "Try Again",
    "q1.q":  "What is your main goal right now?",
    "q1.o1": "Enter the job market as fast as possible",
    "q1.o2": "Build APIs for AI and Data Science projects",
    "q1.o3": "Work at large Enterprise companies",
    "q1.o4": "Build Microservices and Cloud applications",
    "q2.q":  "What is your programming background?",
    "q2.o1": "Know some JavaScript/Node.js",
    "q2.o2": "Know Python or love it",
    "q2.o3": "Coming from Java or OOP background",
    "q2.o4": "Complete beginner starting from scratch",
    "q3.q":  "What type of projects do you want to work on?",
    "q3.o1": "General web apps and APIs",
    "q3.o2": "AI, ML, and Data Analysis projects",
    "q3.o3": "Large, complex Enterprise systems",
    "q3.o4": "High-performance and Cloud-native systems",
    "road.tag":   "Roadmap",
    "road.title": "Where to Start with Backend?",
    "road.sub":   "The right steps, in the right order — from zero to mastery.",
    "footer.sub":   "The server never stops — and neither should you.",
    "footer.copy":  "Made with",
    "footer.copy2": "for every beginner who dreams of building the Backend",
  },
};

/* ============================================================
   BACKEND TECHNOLOGIES DATA (bilingual)
   ============================================================ */
const FRAMEWORKS = {
  nodejs: {
    name: "Node.js + Express",
    tagline: { ar: "JavaScript على الـ Server — نفس اللغة في كل حتة", en: "JavaScript on the Server — same language everywhere" },
    icon: '<i class="fa-brands fa-node-js" style="color:#68a063"></i>',
    desc: {
      ar: `Node.js صنعته Ryan Dahl سنة 2009 وقلب الدنيا — خلّى JavaScript تشتغل على الـ Server مش بس في المتصفح. بيشتغل بـ Event Loop غير متزامن (Async) — مما يجعله رائعاً للـ Real-time. Express.js هو الـ Framework الأكثر استخداماً فوقيه. بيستخدمه Netflix, LinkedIn, وPayPal.`,
      en: `Node.js was created by Ryan Dahl in 2009 and changed everything — allowing JavaScript to run on the Server, not just in the browser. It works with an Async Event Loop — making it excellent for Real-time apps. Express.js is the most widely used framework on top of it. Used by Netflix, LinkedIn, and PayPal.`,
    },
    meta: { creator: "Ryan Dahl / OpenJS", year: "2009", type: "JS Runtime + Framework", language: "JavaScript / TypeScript" },
    pros: {
      ar: ["نفس لغة الـ Frontend (JavaScript) — أسهل Full-Stack", "أداء ممتاز في الـ Real-time والـ I/O", "npm: أكبر مكتبة packages في العالم", "Community ضخم جداً وموارد وفيرة"],
      en: ["Same language as Frontend (JavaScript) — easier Full-Stack", "Excellent performance for Real-time and I/O", "npm: largest package library in the world", "Huge community and abundant resources"],
    },
    cons: {
      ar: ["مش مثالي للـ CPU-intensive operations", "Callback Hell ممكن تتشوش في البداية", "Single-threaded بطبيعته"],
      en: ["Not ideal for CPU-intensive operations", "Callback Hell can be confusing at first", "Single-threaded by nature"],
    },
    verdict: {
      ar: "الخيار الأول لو عارف JavaScript أو عايز تتعلم Backend وFrontend بنفس اللغة. Startup-friendly جداً.",
      en: "The first choice if you know JavaScript or want to learn Backend and Frontend with the same language. Very startup-friendly.",
    },
  },
  python: {
    name: "Python + Django / FastAPI",
    tagline: { ar: "اللغة الأسهل — والأقوى في AI وData", en: "The easiest language — and the most powerful in AI & Data" },
    icon: '<i class="fa-brands fa-python" style="color:#3776ab"></i>',
    desc: {
      ar: `Python صنعه Guido van Rossum سنة 1991. الـ Syntax بتاعه بسيط وواضح جداً — أقرب للكلام الإنجليزي. ليه Framework عملاق هو Django (لو عايز كل حاجة جاهزة) وFastAPI الحديث (لو عايز APIs سريعة ومحترفة). اللغة الأولى في AI وData Science والـ Machine Learning.`,
      en: `Python was created by Guido van Rossum in 1991. Its syntax is simple and clear — closer to English. It has the massive Django framework (for batteries-included development) and modern FastAPI (for fast, professional APIs). The #1 language in AI, Data Science, and Machine Learning.`,
    },
    meta: { creator: "Guido van Rossum", year: "1991", type: "Multi-purpose Language", language: "Python" },
    pros: {
      ar: ["أسهل لغة للمبتدئين بشكل عام", "ملك الـ AI وML وData Science", "Django و FastAPI ممتازين للـ APIs", "Community ضخم وحلول لكل مشكلة"],
      en: ["Easiest language for beginners overall", "King of AI, ML, and Data Science", "Django and FastAPI are excellent for APIs", "Huge community with solutions for everything"],
    },
    cons: {
      ar: ["أبطأ من Node.js وGo وJava في الـ Raw Performance", "GIL بيحد من الـ True Multithreading", "Memory consumption أعلى من Go"],
      en: ["Slower than Node.js, Go, and Java in raw performance", "GIL limits true multithreading", "Higher memory consumption than Go"],
    },
    verdict: {
      ar: "الخيار المثالي لو مبتدئ تماماً أو لو مهتم بـ AI وData مع الـ Backend. مرونة هائلة.",
      en: "The ideal choice if you're a complete beginner or interested in AI and Data alongside Backend. Enormous flexibility.",
    },
  },
  java: {
    name: "Java + Spring Boot",
    tagline: { ar: "الملك الأصلي للـ Enterprise — موثوق ومستقر", en: "The original Enterprise king — reliable and stable" },
    icon: '<i class="fa-brands fa-java" style="color:#b07219"></i>',
    desc: {
      ar: `Java صنعته Sun Microsystems سنة 1995 وخضع لـ Oracle. لغة Strongly-typed وObject-Oriented بالكامل. Spring Boot هو الـ Framework الأكثر استخداماً معاه ويجعل بناء الـ Enterprise applications أسرع. بيستخدمه Amazon، LinkedIn، ومعظم البنوك والشركات المالية الكبيرة.`,
      en: `Java was created by Sun Microsystems in 1995 and is now under Oracle. It's a Strongly-typed, fully Object-Oriented language. Spring Boot is the most widely used framework with it, making Enterprise application development faster. Used by Amazon, LinkedIn, and most major banks and financial companies.`,
    },
    meta: { creator: "Sun Microsystems / Oracle", year: "1995", type: "OOP Language + Framework", language: "Java" },
    pros: {
      ar: ["الأكثر استخداماً في البنوك والشركات المالية الكبيرة", "Type Safety قوية جداً — أقل Bugs في الـ Production", "Performance ممتاز للـ Long-running applications", "Ecosystem هائل وناضج جداً"],
      en: ["Most used in banks and large financial companies", "Very strong Type Safety — fewer production bugs", "Excellent performance for long-running applications", "Enormous and very mature ecosystem"],
    },
    cons: {
      ar: ["Verbose كتير — كود طويل لنفس المهمة", "Steep learning curve للمبتدئين", "Slow startup time مقارنة بالبدائل"],
      en: ["Very verbose — long code for the same task", "Steep learning curve for beginners", "Slow startup time compared to alternatives"],
    },
    verdict: {
      ar: "اختاره لو هدفك تشتغل في بنك أو شركة تأمين أو مؤسسة حكومية. مش مثالي للبداية الأولى.",
      en: "Choose it if your goal is working at a bank, insurance company, or government institution. Not ideal as a first start.",
    },
  },
  dotnet: {
    name: ".NET + C#",
    tagline: { ar: "قوة Microsoft — الأسرع في الـ Windows Ecosystem", en: "Microsoft's power — fastest in the Windows Ecosystem" },
    icon: '<i class="fa-solid fa-hashtag" style="color:#512bd4"></i>',
    desc: {
      ar: `.NET صنعته Microsoft وC# هي اللغة الرئيسية بتاعته. ASP.NET Core هو الـ Framework للـ Web Backend وده من أسرع الـ Frameworks في العالم في الـ Benchmarks. منذ .NET Core أصبح Cross-platform (Windows, Mac, Linux). بيستخدمه Microsoft نفسه، Stack Overflow، وكتير من الشركات Enterprise.`,
      en: `.NET was created by Microsoft and C# is its main language. ASP.NET Core is the Web Backend Framework and is one of the fastest frameworks in the world in benchmarks. Since .NET Core it became Cross-platform (Windows, Mac, Linux). Used by Microsoft itself, Stack Overflow, and many Enterprise companies.`,
    },
    meta: { creator: "Microsoft", year: "2002 (.NET Core 2016)", type: "Full Framework", language: "C#" },
    pros: {
      ar: ["من أسرع الـ Frameworks في الـ Benchmarks العالمية", "Type Safety ممتازة مع C#", "Visual Studio — أقوى IDE في العالم", "مثالي للبيئة Microsoft وAzure"],
      en: ["One of the fastest frameworks in global benchmarks", "Excellent Type Safety with C#", "Visual Studio — the most powerful IDE in the world", "Perfect for Microsoft and Azure environments"],
    },
    cons: {
      ar: ["أقل شهرة خارج بيئة Windows والمؤسسات", "Community أصغر من Python وNode.js", "خطوة تعلمية C# أكبر من Python"],
      en: ["Less popular outside Windows and enterprise environments", "Smaller community than Python and Node.js", "C# learning curve larger than Python"],
    },
    verdict: {
      ar: "الخيار الأقوى لو في بيئة Microsoft أو Azure. أداؤه مذهل وC# لغة ممتازة للـ Enterprise.",
      en: "The strongest choice in a Microsoft or Azure environment. Incredible performance and C# is an excellent Enterprise language.",
    },
  },
  go: {
    name: "Go (Golang)",
    tagline: { ar: "سرعة C مع بساطة Python — مستقبل الـ Cloud", en: "Speed of C with simplicity of Python — the Cloud future" },
    icon: '<i class="fa-solid fa-g" style="color:#00acd7"></i>',
    desc: {
      ar: `Go صنعته Google سنة 2009 من قبل Robert Griesemer وRob Pike وKen Thompson. فلسفته: بسيط، سريع، موثوق. Goroutines تجعله ملكاً في الـ Concurrency. Docker وKubernetes وTerraform مكتوبين بـ Go. مش للمبتدئين — لكن لمن يريد أداءً استثنائياً في الـ Microservices والـ Cloud.`,
      en: `Go was created by Google in 2009 by Robert Griesemer, Rob Pike, and Ken Thompson. Its philosophy: simple, fast, reliable. Goroutines make it the king of Concurrency. Docker, Kubernetes, and Terraform are written in Go. Not for beginners — but for those who want exceptional performance in Microservices and Cloud.`,
    },
    meta: { creator: "Google", year: "2009", type: "Compiled Language", language: "Go" },
    pros: {
      ar: ["أداء استثنائي — قريب من C في السرعة", "Concurrency رائعة بـ Goroutines", "Binary صغير وسريع الـ Deploy", "Static typing مع syntax بسيط"],
      en: ["Exceptional performance — close to C in speed", "Excellent Concurrency with Goroutines", "Small binary and fast Deploy", "Static typing with simple syntax"],
    },
    cons: {
      ar: ["Error handling verbose جداً (if err != nil)", "No generics كاملة للتو", "Ecosystem أصغر من Python وJava"],
      en: ["Very verbose error handling (if err != nil)", "No full generics until recently", "Smaller ecosystem than Python and Java"],
    },
    verdict: {
      ar: "اختاره بعد ما تتقن لغة Backend تانية. مثالي للـ Microservices والـ Cloud-native systems. الشركات الكبيرة بتحبه.",
      en: "Choose it after mastering another Backend language. Perfect for Microservices and Cloud-native systems. Large companies love it.",
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
      { ar: "q1.o1", en: "q1.o1", weight: { nodejs: 3, python: 2 } },
      { ar: "q1.o2", en: "q1.o2", weight: { python: 4, nodejs: 1 } },
      { ar: "q1.o3", en: "q1.o3", weight: { java: 4, dotnet: 3 } },
      { ar: "q1.o4", en: "q1.o4", weight: { go: 4, nodejs: 2 } },
    ],
  },
  {
    q: { ar: "q2.q", en: "q2.q" },
    options: [
      { ar: "q2.o1", en: "q2.o1", weight: { nodejs: 4, go: 1 } },
      { ar: "q2.o2", en: "q2.o2", weight: { python: 4, nodejs: 1 } },
      { ar: "q2.o3", en: "q2.o3", weight: { java: 3, dotnet: 3 } },
      { ar: "q2.o4", en: "q2.o4", weight: { python: 3, nodejs: 2 } },
    ],
  },
  {
    q: { ar: "q3.q", en: "q3.q" },
    options: [
      { ar: "q3.o1", en: "q3.o1", weight: { nodejs: 3, python: 2 } },
      { ar: "q3.o2", en: "q3.o2", weight: { python: 5 } },
      { ar: "q3.o3", en: "q3.o3", weight: { java: 4, dotnet: 3 } },
      { ar: "q3.o4", en: "q3.o4", weight: { go: 5, nodejs: 1 } },
    ],
  },
];

/* ============================================================
   ROADMAP DATA
   ============================================================ */
const ROADMAP_DATA = {
  ar: [
    {
      phase: "المرحلة الأولى — الأساسيات البرمجية",
      phase_sub: "قبل أي Backend — لازم تبني أساس برمجي قوي",
      color: "#4ade80", icon: "fa-solid fa-code",
      step: "الخطوة 01", duration: "1–2 شهر",
      title: "أساسيات البرمجة + اختار لغتك",
      desc: "مش مهم تبدأ بأي لغة — المهم تفهم المفاهيم: Variables، Functions، Loops، OOP. بعدين اختار Python أو JavaScript (Node.js) كأول لغة Backend.",
      download: null,
      subs: [
        { tag:"Python للمبتدئين", icon:"fa-brands fa-python", title:"Python — الأسهل للبداية",
          desc:"Syntax واضح وبسيط. Variables، Functions، Lists، Dicts، OOP. مثالي لو بدأت من الصفر.",
          resources:[
            { name:"Python الرسمي", url:"https://docs.python.org/3/tutorial/", icon:"fa-brands fa-python" },
            { name:"CS50 Python - Harvard", url:"https://cs50.harvard.edu/python/2022/", icon:"fa-solid fa-graduation-cap" },
            { name:"freeCodeCamp Python", url:"https://www.freecodecamp.org/learn/scientific-computing-with-python/", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"JavaScript للـ Node.js", icon:"fa-brands fa-js", title:"JavaScript — لو عارف Frontend",
          desc:"لو شغال بـ Frontend خلاص — Node.js هو أسرع طريق للـ Backend. Promises، Async/Await، Modules.",
          resources:[
            { name:"javascript.info", url:"https://javascript.info", icon:"fa-solid fa-book-open" },
            { name:"Node.js Docs", url:"https://nodejs.org/en/docs", icon:"fa-brands fa-node-js" },
          ]},
        { tag:"أساسيات", icon:"fa-solid fa-cubes", title:"OOP + Data Structures الأساسية",
          desc:"Classes، Inheritance، Encapsulation. Arrays، Linked Lists، Hash Maps — دي اللي هتتكلم عنها في الـ Interviews.",
          resources:[
            { name:"OOP in Python", url:"https://realpython.com/python3-object-oriented-programming/", icon:"fa-solid fa-book" },
            { name:"CS50 - Harvard", url:"https://cs50.harvard.edu/x/2024/", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "المرحلة الأولى — الأساسيات البرمجية",
      phase_sub: null,
      color: "#22c55e", icon: "fa-brands fa-git-alt",
      step: "الخطوة 02", duration: "1–2 أسابيع",
      title: "Git + Terminal + Linux Basics",
      desc: "الـ Backend Developer لازم يكون مرتاح في الـ Terminal. Git مش اختياري — ده ضروري زي الهواء. Linux هو الـ OS الأساسي للـ Servers.",
      download: null,
      subs: [
        { tag:"Git", icon:"fa-brands fa-git-alt", title:"Git & GitHub الأساسيات",
          desc:"commit، push، pull، branches، merge. كل الشركات بتستخدمه — ابدأه من أول يوم.",
          resources:[
            { name:"Git Docs", url:"https://git-scm.com/doc", icon:"fa-solid fa-book" },
            { name:"GitHub Skills", url:"https://skills.github.com", icon:"fa-brands fa-github" },
          ]},
        { tag:"Terminal", icon:"fa-solid fa-terminal", title:"Linux & Terminal Commands",
          desc:"ls، cd، mkdir، cat، grep، chmod، ssh. الـ Server بيشتغل على Linux — لازم تحس بيه.",
          resources:[
            { name:"Linux Journey", url:"https://linuxjourney.com", icon:"fa-brands fa-linux" },
            { name:"The Odin Project CLI", url:"https://www.theodinproject.com/lessons/foundations-command-line-basics", icon:"fa-solid fa-terminal" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "المرحلة الثانية — بناء APIs",
      phase_sub: "دلوقتي تبني Backend حقيقي — APIs هي قلب الـ Backend",
      color: "#16a34a", icon: "fa-solid fa-plug",
      step: "الخطوة 03-A", duration: "2–3 شهور",
      title: "Node.js + Express — لو اخترت JavaScript",
      desc: "Express.js هو الأبسط والأسرع في البداية. تعلم كيف تبني REST APIs حقيقية مع Routes، Middleware، وError Handling.",
      download: { label:"ابدأ Node.js", url:"https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", icon:"fa-brands fa-node-js", color:"#68a063" },
      subs: [
        { tag:"Express", icon:"fa-solid fa-server", title:"Express.js — الأساسيات",
          desc:"Routes، Middleware، Request/Response. اعمل CRUD API كامل من الصفر.",
          resources:[
            { name:"Express.js Docs", url:"https://expressjs.com/en/starter/hello-world.html", icon:"fa-solid fa-book" },
            { name:"Traversy Media Express", url:"https://www.youtube.com/@TraversyMedia", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"REST API", icon:"fa-solid fa-plug", title:"REST API Design",
          desc:"HTTP Methods (GET, POST, PUT, DELETE)، Status Codes، Request Body، Query Params، Headers.",
          resources:[
            { name:"REST API Tutorial", url:"https://restfulapi.net", icon:"fa-solid fa-book-open" },
            { name:"HTTP Status Codes", url:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", icon:"fa-solid fa-book" },
          ]},
        { tag:"Auth", icon:"fa-solid fa-lock", title:"Authentication — JWT & Sessions",
          desc:"JSON Web Tokens، bcrypt للـ Password Hashing، Middleware للحماية. الأمان مش اختياري.",
          resources:[
            { name:"JWT.io", url:"https://jwt.io/introduction", icon:"fa-solid fa-key" },
            { name:"Passport.js", url:"https://www.passportjs.org/docs/", icon:"fa-solid fa-shield-halved" },
          ]},
      ], frameworks: ["nodejs"],
    },
    {
      phase: "المرحلة الثانية — بناء APIs",
      phase_sub: null,
      color: "#15803d", icon: "fa-brands fa-python",
      step: "الخطوة 03-B", duration: "2–3 شهور",
      title: "Python + FastAPI / Django — لو اخترت Python",
      desc: "FastAPI لو عايز APIs سريعة وحديثة. Django لو عايز نظام متكامل فيه كل حاجة جاهزة.",
      download: { label:"ابدأ FastAPI", url:"https://fastapi.tiangolo.com/tutorial/", icon:"fa-brands fa-python", color:"#3776ab" },
      subs: [
        { tag:"FastAPI", icon:"fa-solid fa-bolt", title:"FastAPI — الأسرع والأحدث",
          desc:"Type hints، Automatic Docs (Swagger)، Async support. من أسرع Python frameworks للـ APIs.",
          resources:[
            { name:"FastAPI Docs", url:"https://fastapi.tiangolo.com/tutorial/", icon:"fa-brands fa-python" },
            { name:"FastAPI Full Course", url:"https://www.youtube.com/watch?v=7t2alSnE2-I", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Django", icon:"fa-solid fa-cubes", title:"Django — البطاريات مضمّنة",
          desc:"Django Admin، ORM، Forms، Authentication جاهزة. مثالي للـ Full-stack Python projects.",
          resources:[
            { name:"Django Official Tutorial", url:"https://docs.djangoproject.com/en/5.0/intro/tutorial01/", icon:"fa-solid fa-book" },
            { name:"Django REST Framework", url:"https://www.django-rest-framework.org/tutorial/quickstart/", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"Async", icon:"fa-solid fa-rotate", title:"Async Python + Pydantic",
          desc:"asyncio، await، Pydantic للـ Data Validation. ده اللي بيخلي Python Backend سريع.",
          resources:[
            { name:"Python asyncio Docs", url:"https://docs.python.org/3/library/asyncio.html", icon:"fa-brands fa-python" },
            { name:"Pydantic Docs", url:"https://docs.pydantic.dev/latest/", icon:"fa-solid fa-book" },
          ]},
      ], frameworks: ["python"],
    },
    {
      phase: "المرحلة الثالثة — Databases",
      phase_sub: "كل Backend Developer لازم يعرف يتعامل مع Databases",
      color: "#84cc16", icon: "fa-solid fa-database",
      step: "الخطوة 04", duration: "2–3 شهور",
      title: "SQL + NoSQL + ORM",
      desc: "Database هي ذاكرة التطبيق. ابدأ بـ SQL (PostgreSQL) وبعدين تعلم NoSQL (MongoDB). الـ ORM بيخليك تكتب أقل SQL.",
      download: null,
      subs: [
        { tag:"SQL", icon:"fa-solid fa-table", title:"SQL + PostgreSQL",
          desc:"SELECT، INSERT، UPDATE، DELETE، JOINs، Indexes، Transactions. SQL مهارة ستبقى معك للأبد.",
          resources:[
            { name:"PostgreSQL Tutorial", url:"https://www.postgresqltutorial.com", icon:"fa-solid fa-database" },
            { name:"SQLZoo", url:"https://sqlzoo.net", icon:"fa-solid fa-graduation-cap" },
            { name:"Mode SQL Tutorial", url:"https://mode.com/sql-tutorial/", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"NoSQL", icon:"fa-solid fa-leaf", title:"MongoDB — الـ NoSQL الأشهر",
          desc:"Documents، Collections، Queries، Aggregation. مثالي للبيانات المرنة الهيكل.",
          resources:[
            { name:"MongoDB University", url:"https://learn.mongodb.com", icon:"fa-solid fa-graduation-cap" },
            { name:"MongoDB Docs", url:"https://www.mongodb.com/docs/manual/tutorial/getting-started/", icon:"fa-solid fa-book" },
          ]},
        { tag:"ORM", icon:"fa-solid fa-layer-group", title:"Prisma / SQLAlchemy / Sequelize",
          desc:"ORM بيخليك تتعامل مع الـ Database بكود بدل SQL مباشرة. Migrations، Relations، Type-safe queries.",
          resources:[
            { name:"Prisma Docs", url:"https://www.prisma.io/docs/getting-started", icon:"fa-solid fa-database" },
            { name:"SQLAlchemy", url:"https://docs.sqlalchemy.org/en/20/tutorial/index.html", icon:"fa-brands fa-python" },
          ]},
        { tag:"Redis", icon:"fa-solid fa-bolt", title:"Redis — Caching & Sessions",
          desc:"In-memory database للـ Caching والـ Sessions والـ Queues. بيرفع الأداء بشكل درامي.",
          resources:[
            { name:"Redis Docs", url:"https://redis.io/docs/get-started/", icon:"fa-solid fa-database" },
            { name:"Redis University", url:"https://university.redis.com", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: ["nodejs", "python", "java", "dotnet", "go"],
    },
    {
      phase: "المرحلة الثالثة — Databases",
      phase_sub: null,
      color: "#4ade80", icon: "fa-solid fa-shield-halved",
      step: "الخطوة 05", duration: "3–4 أسابيع",
      title: "Security + Validation + Error Handling",
      desc: "الأمان مش feature إضافية — هو أساس. SQL Injection، CORS، Rate Limiting، Input Validation — كل ده لازم تعرفه قبل ما تنزل Production.",
      download: null,
      subs: [
        { tag:"Auth & Security", icon:"fa-solid fa-lock", title:"JWT + OAuth2 + HTTPS",
          desc:"JWT للـ Stateless Auth، OAuth2 لـ Google/GitHub Login، HTTPS دايماً في الـ Production.",
          resources:[
            { name:"OWASP Top 10", url:"https://owasp.org/www-project-top-ten/", icon:"fa-solid fa-shield-halved" },
            { name:"Auth0 Docs", url:"https://auth0.com/docs/get-started", icon:"fa-solid fa-lock" },
          ]},
        { tag:"Validation", icon:"fa-solid fa-check-double", title:"Input Validation + Sanitization",
          desc:"Joi، Zod، Pydantic. كل input من المستخدم مش موثوق — لازم تتحقق منه قبل ما يوصل للـ Database.",
          resources:[
            { name:"Zod Docs", url:"https://zod.dev", icon:"fa-solid fa-book" },
            { name:"Joi Validation", url:"https://joi.dev/api/", icon:"fa-solid fa-book-open" },
          ]},
      ], frameworks: ["nodejs", "python", "java", "dotnet", "go"],
    },
    {
      phase: "المرحلة الرابعة — Deployment",
      phase_sub: "كودك لازم يطلع على الـ Internet — هنا بيبدأ الـ DevOps",
      color: "#3b82f6", icon: "fa-solid fa-cloud-arrow-up",
      step: "الخطوة 06", duration: "2–3 شهور",
      title: "Docker + Cloud + CI/CD",
      desc: "Deploy التطبيق على الـ Internet مش كافي — لازم يكون موثوق ومتاح دايماً. Docker وCloud هم الحل.",
      download: { label:"ابدأ Docker", url:"https://docs.docker.com/get-started/", icon:"fa-brands fa-docker", color:"#2496ed" },
      subs: [
        { tag:"Docker", icon:"fa-brands fa-docker", title:"Docker + Docker Compose",
          desc:"Containerize تطبيقك — يشتغل بنفس الطريقة في أي بيئة. Docker Compose لتشغيل كل الـ Services مع بعض.",
          resources:[
            { name:"Docker Docs", url:"https://docs.docker.com/get-started/", icon:"fa-brands fa-docker" },
            { name:"Play with Docker", url:"https://labs.play-with-docker.com", icon:"fa-solid fa-play" },
          ]},
        { tag:"Cloud", icon:"fa-solid fa-cloud", title:"AWS / GCP / Azure الأساسيات",
          desc:"EC2 أو App Engine للـ Server، S3 للـ Storage، RDS للـ Database. ابدأ بـ Free Tier.",
          resources:[
            { name:"AWS Free Tier", url:"https://aws.amazon.com/free/", icon:"fa-brands fa-aws" },
            { name:"Railway (أسهل للبداية)", url:"https://railway.app", icon:"fa-solid fa-train-subway" },
            { name:"Render.com", url:"https://render.com/docs/deploy-node-express-app", icon:"fa-solid fa-cloud" },
          ]},
        { tag:"CI/CD", icon:"fa-solid fa-rotate", title:"GitHub Actions + Automated Testing",
          desc:"كل push على GitHub يشغل Tests تلقائياً ويعمل Deploy لو كل حاجة ماشية. ده الـ Professional workflow.",
          resources:[
            { name:"GitHub Actions Docs", url:"https://docs.github.com/en/actions/quickstart", icon:"fa-brands fa-github" },
            { name:"CI/CD Tutorial", url:"https://www.youtube.com/watch?v=mFFXuXjVgkU", icon:"fa-brands fa-youtube" },
          ]},
      ], frameworks: ["nodejs", "python", "java", "dotnet", "go"],
    },
    {
      phase: "المرحلة الخامسة — الاحتراف",
      phase_sub: "انت دلوقتي Backend Developer حقيقي — دي التفاصيل اللي بتميزك",
      color: "#f59e0b", icon: "fa-solid fa-rocket",
      step: "الخطوة 07", duration: "مستمر",
      title: "System Design + Testing + Portfolio",
      desc: "الشركات الكبيرة بتسأل عن System Design في الـ Interviews. Testing بيثبت إن كودك موثوق. Portfolio بيثبت إنك شغال.",
      download: null,
      subs: [
        { tag:"System Design", icon:"fa-solid fa-diagram-project", title:"System Design الأساسيات",
          desc:"Load Balancing، Caching، Microservices vs Monolith، Database Sharding. اللي بيتسأل فيه في Senior Interviews.",
          resources:[
            { name:"System Design Primer", url:"https://github.com/donnemartin/system-design-primer", icon:"fa-brands fa-github" },
            { name:"ByteByteGo", url:"https://bytebytego.com", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"Testing", icon:"fa-solid fa-vial", title:"Unit + Integration + E2E Testing",
          desc:"Jest/Pytest للـ Unit Tests، Supertest للـ API Tests. Tests بتوفر الوقت وبتمنع الـ Production bugs.",
          resources:[
            { name:"Pytest Docs", url:"https://docs.pytest.org/en/stable/getting-started.html", icon:"fa-brands fa-python" },
            { name:"Jest Docs", url:"https://jestjs.io/docs/getting-started", icon:"fa-solid fa-vial" },
          ]},
        { tag:"Portfolio", icon:"fa-brands fa-github", title:"مشاريع Portfolio Backend حقيقية",
          desc:"اعمل: REST API كاملة، Blog API بـ Auth، URL Shortener، Chat App بـ WebSockets. ارفعهم على GitHub مع README.",
          resources:[
            { name:"Backend Project Ideas", url:"https://github.com/florinpop17/app-ideas", icon:"fa-brands fa-github" },
            { name:"Public APIs", url:"https://github.com/public-apis/public-apis", icon:"fa-solid fa-cloud" },
          ]},
        { tag:"Interview", icon:"fa-solid fa-microphone", title:"Backend Interview Prep",
          desc:"HTTP، TCP/IP، REST vs GraphQL، Database Optimization، Design Patterns — اللي بيتسأل عنه في كل Interview.",
          resources:[
            { name:"Backend Interview Handbook", url:"https://www.techinterviewhandbook.org/software-engineering-interview-guide/", icon:"fa-solid fa-book-open" },
            { name:"LeetCode", url:"https://leetcode.com/problemset/", icon:"fa-solid fa-code" },
          ]},
      ], frameworks: ["nodejs", "python", "java", "dotnet", "go"],
    },
  ],

  en: [
    {
      phase: "Phase 1 — Programming Foundations",
      phase_sub: "Before any Backend — build a solid programming foundation",
      color: "#4ade80", icon: "fa-solid fa-code",
      step: "Step 01", duration: "1–2 months",
      title: "Programming Basics + Choose Your Language",
      desc: "Doesn't matter which language you start with — what matters is understanding concepts: Variables, Functions, Loops, OOP. Then choose Python or JavaScript (Node.js) as your first Backend language.",
      download: null,
      subs: [
        { tag:"Python for Beginners", icon:"fa-brands fa-python", title:"Python — Easiest to Start",
          desc:"Clear and simple syntax. Variables, Functions, Lists, Dicts, OOP. Perfect if you're starting from scratch.",
          resources:[
            { name:"Python Official Docs", url:"https://docs.python.org/3/tutorial/", icon:"fa-brands fa-python" },
            { name:"CS50P - Harvard", url:"https://cs50.harvard.edu/python/2022/", icon:"fa-solid fa-graduation-cap" },
            { name:"freeCodeCamp Python", url:"https://www.freecodecamp.org/learn/scientific-computing-with-python/", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"JS for Node.js", icon:"fa-brands fa-js", title:"JavaScript — If You Know Frontend",
          desc:"If you already work with Frontend — Node.js is the fastest path to Backend. Promises, Async/Await, Modules.",
          resources:[
            { name:"javascript.info", url:"https://javascript.info", icon:"fa-solid fa-book-open" },
            { name:"Node.js Docs", url:"https://nodejs.org/en/docs", icon:"fa-brands fa-node-js" },
          ]},
        { tag:"Basics", icon:"fa-solid fa-cubes", title:"OOP + Basic Data Structures",
          desc:"Classes, Inheritance, Encapsulation. Arrays, Linked Lists, Hash Maps — what you'll talk about in Interviews.",
          resources:[
            { name:"OOP in Python", url:"https://realpython.com/python3-object-oriented-programming/", icon:"fa-solid fa-book" },
            { name:"CS50 - Harvard", url:"https://cs50.harvard.edu/x/2024/", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "Phase 1 — Programming Foundations",
      phase_sub: null,
      color: "#22c55e", icon: "fa-brands fa-git-alt",
      step: "Step 02", duration: "1–2 weeks",
      title: "Git + Terminal + Linux Basics",
      desc: "A Backend Developer must be comfortable in the Terminal. Git is not optional — it's essential as air. Linux is the primary OS for Servers.",
      download: null,
      subs: [
        { tag:"Git", icon:"fa-brands fa-git-alt", title:"Git & GitHub Basics",
          desc:"commit, push, pull, branches, merge. Every company uses it — start from day one.",
          resources:[
            { name:"Git Docs", url:"https://git-scm.com/doc", icon:"fa-solid fa-book" },
            { name:"GitHub Skills", url:"https://skills.github.com", icon:"fa-brands fa-github" },
          ]},
        { tag:"Terminal", icon:"fa-solid fa-terminal", title:"Linux & Terminal Commands",
          desc:"ls, cd, mkdir, cat, grep, chmod, ssh. Servers run on Linux — you need to be comfortable with it.",
          resources:[
            { name:"Linux Journey", url:"https://linuxjourney.com", icon:"fa-brands fa-linux" },
            { name:"The Odin Project CLI", url:"https://www.theodinproject.com/lessons/foundations-command-line-basics", icon:"fa-solid fa-terminal" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "Phase 2 — Building APIs",
      phase_sub: "Now you build a real Backend — APIs are the heart of Backend",
      color: "#16a34a", icon: "fa-solid fa-plug",
      step: "Step 03-A", duration: "2–3 months",
      title: "Node.js + Express — If You Chose JavaScript",
      desc: "Express.js is the simplest and fastest to start with. Learn how to build real REST APIs with Routes, Middleware, and Error Handling.",
      download: { label:"Start Node.js", url:"https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", icon:"fa-brands fa-node-js", color:"#68a063" },
      subs: [
        { tag:"Express", icon:"fa-solid fa-server", title:"Express.js — Basics",
          desc:"Routes, Middleware, Request/Response. Build a complete CRUD API from scratch.",
          resources:[
            { name:"Express.js Docs", url:"https://expressjs.com/en/starter/hello-world.html", icon:"fa-solid fa-book" },
            { name:"Traversy Media Express", url:"https://www.youtube.com/@TraversyMedia", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"REST API", icon:"fa-solid fa-plug", title:"REST API Design",
          desc:"HTTP Methods (GET, POST, PUT, DELETE), Status Codes, Request Body, Query Params, Headers.",
          resources:[
            { name:"REST API Tutorial", url:"https://restfulapi.net", icon:"fa-solid fa-book-open" },
            { name:"HTTP Status Codes", url:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", icon:"fa-solid fa-book" },
          ]},
        { tag:"Auth", icon:"fa-solid fa-lock", title:"Authentication — JWT & Sessions",
          desc:"JSON Web Tokens, bcrypt for Password Hashing, Middleware for protection. Security is not optional.",
          resources:[
            { name:"JWT.io", url:"https://jwt.io/introduction", icon:"fa-solid fa-key" },
            { name:"Passport.js", url:"https://www.passportjs.org/docs/", icon:"fa-solid fa-shield-halved" },
          ]},
      ], frameworks: ["nodejs"],
    },
    {
      phase: "Phase 2 — Building APIs",
      phase_sub: null,
      color: "#15803d", icon: "fa-brands fa-python",
      step: "Step 03-B", duration: "2–3 months",
      title: "Python + FastAPI / Django — If You Chose Python",
      desc: "FastAPI if you want fast, modern APIs. Django if you want an all-in-one system with everything ready.",
      download: { label:"Start FastAPI", url:"https://fastapi.tiangolo.com/tutorial/", icon:"fa-brands fa-python", color:"#3776ab" },
      subs: [
        { tag:"FastAPI", icon:"fa-solid fa-bolt", title:"FastAPI — Fastest and Most Modern",
          desc:"Type hints, Automatic Docs (Swagger), Async support. One of the fastest Python frameworks for APIs.",
          resources:[
            { name:"FastAPI Docs", url:"https://fastapi.tiangolo.com/tutorial/", icon:"fa-brands fa-python" },
            { name:"FastAPI Full Course", url:"https://www.youtube.com/watch?v=7t2alSnE2-I", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Django", icon:"fa-solid fa-cubes", title:"Django — Batteries Included",
          desc:"Django Admin, ORM, Forms, Authentication all ready. Perfect for full-stack Python projects.",
          resources:[
            { name:"Django Official Tutorial", url:"https://docs.djangoproject.com/en/5.0/intro/tutorial01/", icon:"fa-solid fa-book" },
            { name:"Django REST Framework", url:"https://www.django-rest-framework.org/tutorial/quickstart/", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"Async", icon:"fa-solid fa-rotate", title:"Async Python + Pydantic",
          desc:"asyncio, await, Pydantic for Data Validation. What makes Python Backend fast.",
          resources:[
            { name:"Python asyncio Docs", url:"https://docs.python.org/3/library/asyncio.html", icon:"fa-brands fa-python" },
            { name:"Pydantic Docs", url:"https://docs.pydantic.dev/latest/", icon:"fa-solid fa-book" },
          ]},
      ], frameworks: ["python"],
    },
    {
      phase: "Phase 3 — Databases",
      phase_sub: "Every Backend Developer must know how to work with Databases",
      color: "#84cc16", icon: "fa-solid fa-database",
      step: "Step 04", duration: "2–3 months",
      title: "SQL + NoSQL + ORM",
      desc: "The Database is the application's memory. Start with SQL (PostgreSQL) then learn NoSQL (MongoDB). An ORM lets you write less raw SQL.",
      download: null,
      subs: [
        { tag:"SQL", icon:"fa-solid fa-table", title:"SQL + PostgreSQL",
          desc:"SELECT, INSERT, UPDATE, DELETE, JOINs, Indexes, Transactions. SQL is a skill that will stay with you forever.",
          resources:[
            { name:"PostgreSQL Tutorial", url:"https://www.postgresqltutorial.com", icon:"fa-solid fa-database" },
            { name:"SQLZoo", url:"https://sqlzoo.net", icon:"fa-solid fa-graduation-cap" },
            { name:"Mode SQL Tutorial", url:"https://mode.com/sql-tutorial/", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"NoSQL", icon:"fa-solid fa-leaf", title:"MongoDB — Most Popular NoSQL",
          desc:"Documents, Collections, Queries, Aggregation. Perfect for flexible structured data.",
          resources:[
            { name:"MongoDB University", url:"https://learn.mongodb.com", icon:"fa-solid fa-graduation-cap" },
            { name:"MongoDB Docs", url:"https://www.mongodb.com/docs/manual/tutorial/getting-started/", icon:"fa-solid fa-book" },
          ]},
        { tag:"ORM", icon:"fa-solid fa-layer-group", title:"Prisma / SQLAlchemy / Sequelize",
          desc:"ORM lets you interact with the Database using code instead of raw SQL. Migrations, Relations, Type-safe queries.",
          resources:[
            { name:"Prisma Docs", url:"https://www.prisma.io/docs/getting-started", icon:"fa-solid fa-database" },
            { name:"SQLAlchemy", url:"https://docs.sqlalchemy.org/en/20/tutorial/index.html", icon:"fa-brands fa-python" },
          ]},
        { tag:"Redis", icon:"fa-solid fa-bolt", title:"Redis — Caching & Sessions",
          desc:"In-memory database for Caching, Sessions, and Queues. Dramatically boosts performance.",
          resources:[
            { name:"Redis Docs", url:"https://redis.io/docs/get-started/", icon:"fa-solid fa-database" },
            { name:"Redis University", url:"https://university.redis.com", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: ["nodejs", "python", "java", "dotnet", "go"],
    },
    {
      phase: "Phase 3 — Databases",
      phase_sub: null,
      color: "#4ade80", icon: "fa-solid fa-shield-halved",
      step: "Step 05", duration: "3–4 weeks",
      title: "Security + Validation + Error Handling",
      desc: "Security is not an extra feature — it's foundational. SQL Injection, CORS, Rate Limiting, Input Validation — you must know all of these before going to Production.",
      download: null,
      subs: [
        { tag:"Auth & Security", icon:"fa-solid fa-lock", title:"JWT + OAuth2 + HTTPS",
          desc:"JWT for Stateless Auth, OAuth2 for Google/GitHub Login, HTTPS always in Production.",
          resources:[
            { name:"OWASP Top 10", url:"https://owasp.org/www-project-top-ten/", icon:"fa-solid fa-shield-halved" },
            { name:"Auth0 Docs", url:"https://auth0.com/docs/get-started", icon:"fa-solid fa-lock" },
          ]},
        { tag:"Validation", icon:"fa-solid fa-check-double", title:"Input Validation + Sanitization",
          desc:"Joi, Zod, Pydantic. Every input from the user is untrusted — validate it before it reaches the Database.",
          resources:[
            { name:"Zod Docs", url:"https://zod.dev", icon:"fa-solid fa-book" },
            { name:"Joi Validation", url:"https://joi.dev/api/", icon:"fa-solid fa-book-open" },
          ]},
      ], frameworks: ["nodejs", "python", "java", "dotnet", "go"],
    },
    {
      phase: "Phase 4 — Deployment",
      phase_sub: "Your code needs to be on the Internet — this is where DevOps begins",
      color: "#3b82f6", icon: "fa-solid fa-cloud-arrow-up",
      step: "Step 06", duration: "2–3 months",
      title: "Docker + Cloud + CI/CD",
      desc: "Just deploying isn't enough — it needs to be reliable and always available. Docker and Cloud are the solution.",
      download: { label:"Start Docker", url:"https://docs.docker.com/get-started/", icon:"fa-brands fa-docker", color:"#2496ed" },
      subs: [
        { tag:"Docker", icon:"fa-brands fa-docker", title:"Docker + Docker Compose",
          desc:"Containerize your app — runs the same way in any environment. Docker Compose to run all Services together.",
          resources:[
            { name:"Docker Docs", url:"https://docs.docker.com/get-started/", icon:"fa-brands fa-docker" },
            { name:"Play with Docker", url:"https://labs.play-with-docker.com", icon:"fa-solid fa-play" },
          ]},
        { tag:"Cloud", icon:"fa-solid fa-cloud", title:"AWS / GCP / Azure Basics",
          desc:"EC2 or App Engine for Server, S3 for Storage, RDS for Database. Start with the Free Tier.",
          resources:[
            { name:"AWS Free Tier", url:"https://aws.amazon.com/free/", icon:"fa-brands fa-aws" },
            { name:"Railway (Easiest Start)", url:"https://railway.app", icon:"fa-solid fa-train-subway" },
            { name:"Render.com", url:"https://render.com/docs/deploy-node-express-app", icon:"fa-solid fa-cloud" },
          ]},
        { tag:"CI/CD", icon:"fa-solid fa-rotate", title:"GitHub Actions + Automated Testing",
          desc:"Every GitHub push automatically runs Tests and deploys if everything passes. This is the professional workflow.",
          resources:[
            { name:"GitHub Actions Docs", url:"https://docs.github.com/en/actions/quickstart", icon:"fa-brands fa-github" },
            { name:"CI/CD Tutorial", url:"https://www.youtube.com/watch?v=mFFXuXjVgkU", icon:"fa-brands fa-youtube" },
          ]},
      ], frameworks: ["nodejs", "python", "java", "dotnet", "go"],
    },
    {
      phase: "Phase 5 — Mastery",
      phase_sub: "You're now a real Backend Developer — these details set you apart",
      color: "#f59e0b", icon: "fa-solid fa-rocket",
      step: "Step 07", duration: "Ongoing",
      title: "System Design + Testing + Portfolio",
      desc: "Large companies ask about System Design in interviews. Testing proves your code is reliable. Portfolio proves you work.",
      download: null,
      subs: [
        { tag:"System Design", icon:"fa-solid fa-diagram-project", title:"System Design Basics",
          desc:"Load Balancing, Caching, Microservices vs Monolith, Database Sharding. What gets asked in Senior Interviews.",
          resources:[
            { name:"System Design Primer", url:"https://github.com/donnemartin/system-design-primer", icon:"fa-brands fa-github" },
            { name:"ByteByteGo", url:"https://bytebytego.com", icon:"fa-solid fa-book-open" },
          ]},
        { tag:"Testing", icon:"fa-solid fa-vial", title:"Unit + Integration + E2E Testing",
          desc:"Jest/Pytest for Unit Tests, Supertest for API Tests. Tests save time and prevent Production bugs.",
          resources:[
            { name:"Pytest Docs", url:"https://docs.pytest.org/en/stable/getting-started.html", icon:"fa-brands fa-python" },
            { name:"Jest Docs", url:"https://jestjs.io/docs/getting-started", icon:"fa-solid fa-vial" },
          ]},
        { tag:"Portfolio", icon:"fa-brands fa-github", title:"Real Backend Portfolio Projects",
          desc:"Build: Complete REST API, Blog API with Auth, URL Shortener, Chat App with WebSockets. Upload to GitHub with README.",
          resources:[
            { name:"Backend Project Ideas", url:"https://github.com/florinpop17/app-ideas", icon:"fa-brands fa-github" },
            { name:"Public APIs", url:"https://github.com/public-apis/public-apis", icon:"fa-solid fa-cloud" },
          ]},
        { tag:"Interview", icon:"fa-solid fa-microphone", title:"Backend Interview Prep",
          desc:"HTTP, TCP/IP, REST vs GraphQL, Database Optimization, Design Patterns — what gets asked in every interview.",
          resources:[
            { name:"Backend Interview Handbook", url:"https://www.techinterviewhandbook.org/software-engineering-interview-guide/", icon:"fa-solid fa-book-open" },
            { name:"LeetCode", url:"https://leetcode.com/problemset/", icon:"fa-solid fa-code" },
          ]},
      ], frameworks: ["nodejs", "python", "java", "dotnet", "go"],
    },
  ],
};

/* ============================================================
   FW COLORS & ICONS
   ============================================================ */
const FW_COLORS = {
  nodejs: "#68a063", python: "#3776ab", java: "#b07219",
  dotnet: "#512bd4", go: "#00acd7"
};
const FW_ICONS = {
  nodejs: "fa-brands fa-node-js", python: "fa-brands fa-python",
  java: "fa-brands fa-java", dotnet: "fa-solid fa-hashtag", go: "fa-solid fa-g"
};
const FW_LABELS = {
  nodejs: "Node.js", python: "Python", java: "Java", dotnet: ".NET", go: "Go"
};

/* ============================================================
   STATE
   ============================================================ */
let currentLang  = localStorage.getItem("lang")  || "ar";
let currentTheme = localStorage.getItem("theme") || "dark";
let quizAnswers  = {};
let currentQuestion = 0;

/* ============================================================
   i18n HELPER
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
  if (bsLink) {
    bsLink.href = isEn
      ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";
  }
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val) el.innerHTML = val;
  });
  const langLabel = document.getElementById("langLabel");
  if (langLabel) langLabel.textContent = isEn ? "EN" : "AR";
  document.title = isEn
    ? "Backend Development — Beginner's Guide"
    : "Backend Development — دليل المبتدئين";
}

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const iconL = document.getElementById("iconLight");
  const iconD = document.getElementById("iconDark");
  if (iconL) iconL.style.display = theme === "light" ? "none" : "inline";
  if (iconD) iconD.style.display = theme === "light" ? "inline" : "none";
}

function initTheme() {
  applyTheme(currentTheme);
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });
}

/* ============================================================
   LANGUAGE TOGGLE
   ============================================================ */
function initLang() {
  applyTranslations();
  const btn = document.getElementById("langToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyTranslations();
    renderFrameworkPanel(document.querySelector(".fw-tab.active")?.dataset.fw || "nodejs");
    initRoadmap();
  });
}

/* ============================================================
   NAV
   ============================================================ */
function initNav() {
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 50);
  });
  document.querySelectorAll(".nav-link-item").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
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
        const d = parseInt(e.target.dataset.aosDelay || "0");
        setTimeout(() => e.target.classList.add("aos-animate"), d);
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
  if (!fw) return;
  const lang = currentLang;
  const panel = document.getElementById("fwPanel");
  if (!panel) return;

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
            <h5><i class="fa-solid fa-circle-check" style="color:#4ade80"></i> ${t("panel.pros")}</h5>
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
  renderFrameworkPanel("nodejs");
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
  document.querySelector(".table-wrapper") && obs.observe(document.querySelector(".table-wrapper"));
}

/* ============================================================
   QUIZ
   ============================================================ */
function calcResult() {
  const scores = { nodejs: 0, python: 0, java: 0, dotnet: 0, go: 0 };
  Object.values(quizAnswers).forEach(opt => {
    if (opt.weight) Object.entries(opt.weight).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v; });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function renderQuizResult(fwKey) {
  const fw = FRAMEWORKS[fwKey];
  const content = document.getElementById("quizContent");
  const step = document.getElementById("quizStepIndicator");
  if (!content) return;
  if (step) step.textContent = t("quiz.result");
  content.innerHTML = `
    <div class="quiz-result text-center py-4">
      <div style="font-size:3rem;margin-bottom:1rem">${fw.icon}</div>
      <h3 class="mb-2">${t("quiz.rec")}</h3>
      <div class="quiz-result-fw mb-3" style="font-size:1.8rem;font-weight:900">${fw.name}</div>
      <p class="mb-4">${fw.verdict[currentLang]}</p>
      <button class="quiz-restart" onclick="location.reload()">${t("quiz.restart")}</button>
    </div>`;
}

function renderQuizQuestion(index) {
  const q = QUIZ_QUESTIONS_DATA[index];
  const progress = ((index + 1) / QUIZ_QUESTIONS_DATA.length) * 100;
  const fill = document.getElementById("quizProgressFill");
  const step = document.getElementById("quizStepIndicator");
  const content = document.getElementById("quizContent");
  if (!q || !content) return;
  if (fill) fill.style.width = progress + "%";
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
  let lastPhase = "";
  let html = "";

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

    const downloadBtn = item.download
      ? `<a href="${item.download.url}" target="_blank" rel="noopener" class="download-btn" style="--dl-color:${item.download.color}">
          <i class="${item.download.icon}" style="color:${item.download.color}"></i>
          ${item.download.label}
          <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.65rem;opacity:0.7"></i>
        </a>`
      : "";

    const subHtml = item.subs.map(sub => `
      <div class="roadmap-sub-item">
        <div class="roadmap-sub-header">
          <i class="${sub.icon}" style="font-size:1rem;opacity:0.8"></i>
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
                <div class="roadmap-duration">
                  <i class="fa-regular fa-clock"></i>
                  <span>${item.duration}</span>
                </div>
                ${fwBadges ? `<div class="roadmap-fw-badges">${fwBadges}</div>` : ""}
                ${downloadBtn}
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
  const block = document.getElementById("heroCodeBlock");
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
   KEYBOARD SHORTCUTS
   ============================================================ */
function initKeyboardShortcuts() {
  const keys = Object.keys(FRAMEWORKS);
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "f" && e.target.tagName !== "INPUT") {
      idx = (idx + 1) % keys.length;
      document.querySelectorAll("#fwTabs .fw-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.fw === keys[idx]);
      });
      renderFrameworkPanel(keys[idx]);
    }
    if (e.key.toLowerCase() === "t" && e.target.tagName !== "INPUT") {
      document.getElementById("themeToggle")?.click();
    }
    if (e.key.toLowerCase() === "l" && e.target.tagName !== "INPUT") {
      document.getElementById("langToggle")?.click();
    }
  });
}

/* ============================================================
   ACTIVE NAV HIGHLIGHT
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll(".nav-link-item").forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => obs.observe(s));
}

/* ============================================================
   CURSOR
   ============================================================ */
function initCursor() {
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.appendChild(dot);
  document.addEventListener("mousemove", (e) => {
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
  initKeyboardShortcuts();
  initActiveNav();
  initCursor();

  setTimeout(() => {
    document.querySelectorAll("[data-aos]:not(.aos-animate)").forEach(el => el.classList.add("aos-animate"));
  }, 2000);

  console.log("%c < Backend Guide /> ", "background:#4ade80;color:#0d0d0d;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;");
  console.log("%c🌙 Press T for theme | 🌐 Press L for language | ⚡ Press F for technologies", "color:#4ade80;font-family:monospace;font-size:11px;");
});