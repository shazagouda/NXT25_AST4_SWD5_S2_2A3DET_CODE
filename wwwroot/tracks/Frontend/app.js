"use strict";

const TRANSLATIONS = {
  ar: {
    /* Nav */
    "nav.what":  "ما هو Frontend؟",
    "nav.fw":    "الـ Frameworks",
    "nav.cmp":   "المقارنة",
    "nav.road":  "ابدأ من هنا",
    "nav.badge": "دليلك",
    /* Hero */
    "hero.tag":    "دليل المبتدئ في Frontend",
    "hero.title1": "كل اللي محتاج",
    "hero.title2": "تعرفه عن",
    "hero.sub":    "من أول سطر كود لغاية ما تختار الـ Framework المناسب ليك — دليل واضح ومبسط بدون تعقيد.",
    "hero.cta1":   "ابدأ الرحلة",
    "hero.cta2":   "قارن الـ Frameworks",
    "hero.scroll": "اسكرول للأسفل",
    /* Code block */
    "code.name": '"أنت"',
    "code.goal": '"تبني مواقع رائعة"',
    "code.log":  '"يلا نبدأ! "',
    /* What is */
    "what.tag":           "الأساسيات",
    "what.title":         "إيه هو الـ Frontend؟",
    "what.sub":           "الـ Frontend هو كل اللي بيشوفه المستخدم ويتفاعل معاه على الموقع أو التطبيق — الأزرار، الألوان، الحركات، النصوص. باختصار: هو الوجه الجميل للـ Web.",
    "what.analogy.title": "فكر في الأمر كده",
    "what.analogy.body":  "المطعم فيه <strong>مطبخ (Backend)</strong> بيتحضر فيه الأكل — والزبون مش شايفه. وفيه <strong>صالة الاستقبال (Frontend)</strong> — التصميم، المنيو، الطاولات، وطريقة التقديم. ده اللي بيأثر على تجربة الزبون مباشرةً. أنت بتشتغل في الصالة!",
    "what.html":          "الهيكل العظمي للصفحة. بيحدد الترتيب والمحتوى — نصوص، صور، أزرار. بدونه ما فيش صفحة.",
    "what.css":           "المسؤول عن الشكل والجمال. الألوان، الحجم، المسافات، الحركات — CSS بيحوّل الهيكل لتحفة.",
    "what.js":            "الروح اللي بتحرّك كل حاجة. التفاعل مع المستخدم، جلب البيانات، الـ Animations المعقدة — كله JS.",
    /* Framework intro */
    "fwintro.tag":   "المفهوم",
    "fwintro.title": "إيه هو الـ Framework؟",
    "fwintro.sub1":  "تخيل إنك بتبني بيت. تقدر تبني كل حاجة من الصفر — أو تاخد <strong>مواد جاهزة ومنظمة</strong> وتبني بيها أسرع وأحسن.",
    "fwintro.sub2":  "الـ <strong>Framework</strong> هو الأدوات والمواد الجاهزة دي. بيوفر عليك وقت وجهد، ويخليك تركز على بناء المنتج.",
    "fwintro.b1":    "كود منظم وقابل للتكرار (Reusable)",
    "fwintro.b2":    "أداء أسرع وأفضل",
    "fwintro.b3":    "Community ضخم يساعدك",
    "fwintro.b4":    "حلول جاهزة لمشاكل شائعة",
    /* Frameworks section */
    "fw.tag":   "الـ Frameworks",
    "fw.title": "أشهر الـ Frameworks بالتفصيل",
    "fw.sub":   "اعرف كل Framework — مين صنعه، إيه مميزاته، وامتى تستخدمه.",
    /* FW panel labels */
    "panel.creator":  "صانع الـ Framework",
    "panel.year":     "سنة الإطلاق",
    "panel.type":     "النوع",
    "panel.lang":     "اللغة",
    "panel.pros":     "المميزات",
    "panel.cons":     "العيوب",
    "panel.verdict":  "الحكم النهائي",
    /* Comparison */
    "cmp.tag":       "المقارنة",
    "cmp.title":     "مقارنة شاملة بين الـ Frameworks",
    "cmp.sub":       "جدول واضح يساعدك تشوف الفروق دفعة واحدة.",
    "cmp.criterion": "المعيار",
    "cmp.diff":      "صعوبة البداية",
    "cmp.perf":      "الأداء (Performance)",
    "cmp.community": "الـ Community",
    "cmp.jobs":      "فرص العمل",
    "cmp.companies": "الشركات المستخدمة",
    "cmp.for":       "مناسب لـ",
    "cmp.react":     "SPAs, كبير",
    "cmp.vue":       "مبتدئين, متوسط",
    "cmp.angular":   "Enterprise",
    "cmp.svelte":    "سريع + خفيف",
    "cmp.next":      "Full-stack",
    /* Levels */
    "l.easy":    "سهل",
    "l.med":     "متوسط",
    "l.hard":    "صعب",
    "l.great":   "ممتاز",
    "l.good":    "كويس",
    "l.limited": "محدود",
    /* Quiz */
    "quiz.tag":     "اكتشف نفسك",
    "quiz.title":   "أنهي Framework يناسبك؟",
    "quiz.sub":     "جاوب على 3 أسئلة وهنقترح عليك الأنسب.",
    "quiz.step":    "السؤال {n} من {total}",
    "quiz.result":  "النتيجة",
    "quiz.rec":     "الـ Framework الأنسب ليك هو",
    "quiz.restart": "جرب تاني",
    /* Quiz questions */
    "q1.q":  "إيه هدفك الأساسي دلوقتي؟",
    "q1.o1": "أدخل سوق العمل بأسرع وقت",
    "q1.o2": "أفهم البرمجة وأتعلم صح من الأساس",
    "q1.o3": "أشتغل في شركات كبيرة Enterprise",
    "q1.o4": "أبني مشاريع مستقلة بدوام أسرع",
    "q2.q":  "إيه مستواك الحالي في JavaScript؟",
    "q2.o1": "مبتدئ تماماً — عارف أساسيات بس",
    "q2.o2": "كويس — شغال بيه بس مش متعمق",
    "q2.o3": "عارف TypeScript وبيشغلني",
    "q2.o4": "متعمق وعايز تحدي حقيقي",
    "q3.q":  "إيه نوع المشاريع اللي عايز تبنيها؟",
    "q3.o1": "مواقع وتطبيقات تفاعلية عامة",
    "q3.o2": "مواقع بـ SEO مهم فيها (Blog, E-commerce)",
    "q3.o3": "تطبيقات شركات ضخمة ومعقدة",
    "q3.o4": "مشاريع تجريبية وتعلمية",
    /* Roadmap */
    "road.tag":   "خارطة الطريق",
    "road.title": "من فين تبدأ؟",
    "road.sub":   "الخطوات الصح، بالترتيب الصح.",
    "road.dur":   "المدة",
    /* Roadmap steps */
    "r1.title": "أتقن الأساسيات — HTML, CSS, JavaScript",
    "r1.desc":  "مفيش Framework بيفيدك من غير أساسيات قوية. اتعلم HTML Semantic، CSS Flexbox & Grid، وJavaScript الحديث (ES6+). ده اللي هيفرق بين Developer ومجرد حد بيحفظ Frameworks.",
    "r1.dur":   "2–3 شهور",
    "r2.title": "فهم مفاهيم الـ DOM والـ APIs",
    "r2.desc":  "اتعلم تتعامل مع الـ DOM برمجياً، اعرف إيه هو fetch() وكيف تجيب بيانات من الـ Internet. ده هيخليك تفهم كيف الـ Frameworks شغالة من الأساس.",
    "r2.dur":   "3–4 أسابيع",
    "r3.title": "ابدأ بـ React (أو Vue لو مبتدئ)",
    "r3.desc":  "React لو هدفك سوق العمل بسرعة. Vue لو عايز تفهم أكتر وتتعلم بتدرج. ابدأ بـ Components، State، Props، وEvents. اعمل مشاريع صغيرة فعلاً.",
    "r3.dur":   "2–4 شهور",
    "r4.title": "اتعلم Version Control مع Git & GitHub",
    "r4.desc":  "Git مش اختياري — ده ضروري زي الهواء. اتعلم commit, push, pull, branches, وmerge. الشغل في الشركات بيبدأ من هنا.",
    "r4.dur":   "1–2 أسابيع",
    "r5.title": "ابني Portfolio Projects حقيقية",
    "r5.desc":  "أحسن CV هو كودك على GitHub. ابني 3–5 مشاريع حقيقية — مش tutorial clones. فكر في حاجة تحل مشكلة فعلية. الـ Recruiters بيدوروا على ده بالظبط.",
    "r5.dur":   "مستمر ✦",
    "r6.title": "تعمق في Next.js أو TypeScript",
    "r6.desc":  "بعد ما تتقن React، Next.js بيفتح عليك باب الـ Full-Stack. TypeScript بيخلي كودك أكثر موثوقية وبيرفع قيمتك السوقية.",
    "r6.dur":   "2–3 شهور",
    /* Footer */
    "footer.sub":   "الكود مش بس مهنة — ده فن.",
    "footer.copy":  "صُنع بـ",
    "footer.copy2": "لكل مبتدئ بيحلم يبني الويب",
  },

  en: {
    /* Nav */
    "nav.what":  "What is Frontend?",
    "nav.fw":    "Frameworks",
    "nav.cmp":   "Comparison",
    "nav.road":  "Start Here",
    "nav.badge": "Your Guide",
    /* Hero */
    "hero.tag":    "Beginner's Guide to Frontend",
    "hero.title1": "Everything you need",
    "hero.title2": "to know about",
    "hero.sub":    "From your first line of code to choosing the right framework — a clear, beginner-friendly guide.",
    "hero.cta1":   "Start the Journey",
    "hero.cta2":   "Compare Frameworks",
    "hero.scroll": "Scroll Down",
    /* Code block */
    "code.name": '"You"',
    "code.goal": '"build amazing websites"',
    "code.log":  '"Let\'s go! "',
    /* What is */
    "what.tag":           "The Basics",
    "what.title":         "What is Frontend?",
    "what.sub":           "Frontend is everything a user sees and interacts with — buttons, colors, animations, text. In short: it's the beautiful face of the Web.",
    "what.analogy.title": "Think of it this way",
    "what.analogy.body":  "A restaurant has a <strong>kitchen (Backend)</strong> where food is prepared — hidden from customers. And it has a <strong>dining area (Frontend)</strong> — the design, menu, tables, and presentation. That's what directly affects the customer's experience. You work in the dining area!",
    "what.html":          "The skeleton of every page. Defines structure and content — text, images, buttons. Nothing exists without it.",
    "what.css":           "Responsible for looks and beauty. Colors, sizing, spacing, animations — CSS transforms structure into art.",
    "what.js":            "The soul that moves everything. User interaction, data fetching, complex animations — all JavaScript.",
    /* Framework intro */
    "fwintro.tag":   "The Concept",
    "fwintro.title": "What is a Framework?",
    "fwintro.sub1":  "Imagine building a house. You could make everything from scratch — or use <strong>pre-made, organized materials</strong> to build faster and better.",
    "fwintro.sub2":  "A <strong>Framework</strong> is those pre-made tools. It saves you time and effort, letting you focus on building the product instead of reinventing the wheel.",
    "fwintro.b1":    "Organized, reusable code",
    "fwintro.b2":    "Better and faster performance",
    "fwintro.b3":    "Huge community to help you",
    "fwintro.b4":    "Ready-made solutions for common problems",
    /* Frameworks section */
    "fw.tag":   "Frameworks",
    "fw.title": "Most Popular Frameworks in Detail",
    "fw.sub":   "Know each framework — who made it, its strengths, and when to use it.",
    /* FW panel labels */
    "panel.creator":  "Creator",
    "panel.year":     "Released",
    "panel.type":     "Type",
    "panel.lang":     "Language",
    "panel.pros":     "Pros",
    "panel.cons":     "Cons",
    "panel.verdict":  "Final Verdict",
    /* Comparison */
    "cmp.tag":       "Comparison",
    "cmp.title":     "Full Framework Comparison",
    "cmp.sub":       "A clear table to see all differences at once.",
    "cmp.criterion": "Criterion",
    "cmp.diff":      "Difficulty",
    "cmp.perf":      "Performance",
    "cmp.community": "Community",
    "cmp.jobs":      "Job Market",
    "cmp.companies": "Used By",
    "cmp.for":       "Best For",
    "cmp.react":     "SPAs, large apps",
    "cmp.vue":       "Beginners, medium apps",
    "cmp.angular":   "Enterprise",
    "cmp.svelte":    "Fast + lightweight",
    "cmp.next":      "Full-stack",
    /* Levels */
    "l.easy":    "Easy",
    "l.med":     "Medium",
    "l.hard":    "Hard",
    "l.great":   "Excellent",
    "l.good":    "Good",
    "l.limited": "Limited",
    /* Quiz */
    "quiz.tag":     "Discover Yourself",
    "quiz.title":   "Which Framework Suits You?",
    "quiz.sub":     "Answer 3 questions and we'll suggest the best fit.",
    "quiz.step":    "Question {n} of {total}",
    "quiz.result":  "Result",
    "quiz.rec":     "Your best Framework match is",
    "quiz.restart": "Try Again",
    /* Quiz questions */
    "q1.q":  "What is your main goal right now?",
    "q1.o1": "Enter the job market as fast as possible",
    "q1.o2": "Learn programming fundamentals properly",
    "q1.o3": "Work at large Enterprise companies",
    "q1.o4": "Build freelance projects faster",
    "q2.q":  "What is your current JavaScript level?",
    "q2.o1": "Complete beginner — only know the basics",
    "q2.o2": "Good — use it but not deeply",
    "q2.o3": "Know TypeScript and I'm into it",
    "q2.o4": "Advanced and want a real challenge",
    "q3.q":  "What type of projects do you want to build?",
    "q3.o1": "General interactive websites and apps",
    "q3.o2": "SEO-heavy sites (Blog, E-commerce)",
    "q3.o3": "Large, complex enterprise applications",
    "q3.o4": "Experimental and learning projects",
    /* Roadmap */
    "road.tag":   "Roadmap",
    "road.title": "Where to Start?",
    "road.sub":   "The right steps, in the right order.",
    "road.dur":   "Duration",
    /* Roadmap steps */
    "r1.title": "Master the Basics — HTML, CSS, JavaScript",
    "r1.desc":  "No framework will help you without a solid foundation. Learn HTML Semantics, CSS Flexbox & Grid, and modern JavaScript (ES6+). This is what separates developers from those who just memorize frameworks.",
    "r1.dur":   "2–3 months",
    "r2.title": "Understand the DOM & APIs",
    "r2.desc":  "Learn to manipulate the DOM programmatically, understand fetch() and how to get data from the Internet. This will help you understand how frameworks work under the hood.",
    "r2.dur":   "3–4 weeks",
    "r3.title": "Start with React (or Vue for beginners)",
    "r3.desc":  "React if your goal is the job market fast. Vue if you want to understand more and learn gradually. Start with Components, State, Props, and Events. Build small real projects.",
    "r3.dur":   "2–4 months",
    "r4.title": "Learn Version Control with Git & GitHub",
    "r4.desc":  "Git is not optional — it's as essential as air. Learn commit, push, pull, branches, and merge. Every job starts from here.",
    "r4.dur":   "1–2 weeks",
    "r5.title": "Build Real Portfolio Projects",
    "r5.desc":  "The best CV is your code on GitHub. Build 3–5 real projects — not tutorial clones. Think of something that solves an actual problem. That's exactly what recruiters look for.",
    "r5.dur":   "Ongoing ✦",
    "r6.title": "Dive deeper into Next.js or TypeScript",
    "r6.desc":  "After mastering React, Next.js opens the door to Full-Stack. TypeScript makes your code more reliable and raises your market value.",
    "r6.dur":   "2–3 months",
    /* Footer */
    "footer.sub":   "Code is not just a career — it's an art.",
    "footer.copy":  "Made with",
    "footer.copy2": "for every beginner who dreams of building the web",
  },
};

/* ============================================================
/* ============================================================
   FRAMEWORKS DATA (bilingual)
   ============================================================ */
const FRAMEWORKS = {
  react: {
    name: "React",
    tagline: { ar: "A JavaScript library for building user interfaces", en: "A JavaScript library for building user interfaces" },
    icon: '<i class="fa-brands fa-react" style="color:#61dafb"></i>',
    desc: {
      ar: `React هو مكتبة (Library) مش Framework بالمعنى الكامل، صنعتها شركة Meta (فيسبوك) سنة 2013. بيشتغل على مفهوم الـ Components — وحدات صغيرة قابلة للتكرار. الـ Virtual DOM بيخليه سريع في تحديث الواجهة. ده اللي بيستخدمه معظم الشركات الكبيرة في العالم دلوقتي.`,
      en: `React is a UI Library (not a full framework) created by Meta (Facebook) in 2013. It works on the concept of Components — small reusable units. The Virtual DOM makes it fast at updating the interface. This is what most large companies worldwide use today.`,
    },
    meta: { creator: "Meta (Facebook)", year: "2013", type: "UI Library", language: "JSX / JavaScript" },
    pros: {
      ar: ["Community ضخم جداً وموارد تعليمية وفيرة", "فرص عمل كتير جداً في السوق", "مرونة عالية في اختيار الأدوات", "سريع بفضل Virtual DOM"],
      en: ["Huge community and abundant learning resources", "Many job opportunities in the market", "High flexibility in tool choices", "Fast thanks to Virtual DOM"],
    },
    cons: {
      ar: ["مش Framework كامل، محتاج تجمع أدوات", "Boilerplate كتير في المشاريع الكبيرة", "التحديثات المتكررة ممكن تكون مرهقة"],
      en: ["Not a full framework — you need to assemble tools", "A lot of boilerplate in large projects", "Frequent updates can be overwhelming"],
    },
    verdict: {
      ar: "الخيار الأول لأي حد عايز يدخل سوق العمل بسرعة. لو مش عارف تختار — اختار React.",
      en: "The first choice for anyone who wants to enter the job market fast. If you can't decide — choose React.",
    },
  },
  vue: {
    name: "Vue.js",
    tagline: { ar: "The Progressive JavaScript Framework", en: "The Progressive JavaScript Framework" },
    icon: '<i class="fa-brands fa-vuejs" style="color:#42b883"></i>',
    desc: {
      ar: `Vue.js صنعه Evan You سنة 2014 — اللي كان بيشتغل في Google. مزج أفضل أفكار Angular وReact في أداة أسهل وأوضح. الـ Single File Components بيخلي الكود منظم ومفهوم. شهير جداً في آسيا وفي شركات زي Alibaba وGitLab.`,
      en: `Vue.js was created by Evan You in 2014 — a former Google employee. It blends the best ideas from Angular and React into an easier, clearer tool. Single File Components keep the code organized and readable. Very popular in Asia and companies like Alibaba and GitLab.`,
    },
    meta: { creator: "Evan You", year: "2014", type: "Progressive Framework", language: "SFC / JavaScript" },
    pros: {
      ar: ["أسهل تعلماً من React وAngular", "Documentation ممتازة ومنظمة", "Two-way data binding سهل وسلس", "مرونة — تقدر تستخدم جزء منه بس"],
      en: ["Easier to learn than React and Angular", "Excellent and well-organized documentation", "Easy and smooth two-way data binding", "Flexible — use only parts of it if needed"],
    },
    cons: {
      ar: ["فرص عمل أقل من React في الشرق الأوسط", "Ecosystem أصغر من React", "Vue 2 vs Vue 3 ممكن تتشوش بينهم"],
      en: ["Fewer job opportunities than React in the Middle East", "Smaller ecosystem than React", "Vue 2 vs Vue 3 can be confusing"],
    },
    verdict: {
      ar: "مثالي للمبتدئين اللي عايزين يفهموا كيف تشتغل الـ Frameworks من الأساس، وللمشاريع المتوسطة الحجم.",
      en: "Ideal for beginners who want to understand how frameworks work from the ground up, and for medium-sized projects.",
    },
  },
  angular: {
    name: "Angular",
    tagline: { ar: "Platform for building mobile & desktop web applications", en: "Platform for building mobile & desktop web applications" },
    icon: '<i class="fa-brands fa-angular" style="color:#dd1b16"></i>',
    desc: {
      ar: `Angular هو Framework كامل ومتكامل صنعته Google سنة 2016 (بعد ما أعادت كتابة AngularJS من الصفر). بيستخدم TypeScript وبيجي بكل حاجة تحتاجها جاهزة — Routing, Forms, HTTP, Testing. الـ Architecture بتاعته متشابهة مع البرمجة بالـ OOP.`,
      en: `Angular is a complete, comprehensive framework created by Google in 2016 (after rewriting AngularJS from scratch). It uses TypeScript and comes with everything you need — Routing, Forms, HTTP, Testing. Its architecture is similar to OOP programming.`,
    },
    meta: { creator: "Google", year: "2016", type: "Full Framework", language: "TypeScript" },
    pros: {
      ar: ["Framework متكامل — كل حاجة جوّاه", "TypeScript من البداية — أقل Bugs", "مثالي للمشاريع الكبيرة (Enterprise)", "بنية محددة تمنع الفوضى في الفرق الكبيرة"],
      en: ["Complete framework — everything is included", "TypeScript from the start — fewer bugs", "Perfect for large Enterprise projects", "Defined structure prevents chaos in large teams"],
    },
    cons: {
      ar: ["Steep learning curve — صعب للمبتدئين", "Verbose كتير — الكود طويل", "ثقيل نسبياً مقارنة بالبدائل"],
      en: ["Steep learning curve — difficult for beginners", "Very verbose — lots of boilerplate code", "Relatively heavy compared to alternatives"],
    },
    verdict: {
      ar: "مناسب لو هتشتغل في شركة Enterprise كبيرة أو في مشاريع حكومية ضخمة. مش الخيار الأول للمبتدئ.",
      en: "Best if you'll work at a large Enterprise company or on massive government projects. Not the first choice for beginners.",
    },
  },
  svelte: {
    name: "Svelte",
    tagline: { ar: "Cybernetically enhanced web apps", en: "Cybernetically enhanced web apps" },
    icon: '<i class="fa-solid fa-fire-flame-curved" style="color:#ff3e00"></i>',
    desc: {
      ar: `Svelte اخترعه Rich Harris سنة 2016 وله فلسفة مختلفة تماماً. بدل ما يشتغل في الـ Browser زي React وVue، بيترجم الكود لـ Vanilla JavaScript خالص وقت الـ Build. النتيجة: أداء خرافي وحجم Bundle أصغر بكتير. بس الـ Community لسه صغيرة.`,
      en: `Svelte was invented by Rich Harris in 2016 with a completely different philosophy. Instead of running in the browser like React and Vue, it compiles code to pure Vanilla JavaScript at build time. The result: incredible performance and much smaller bundle sizes. But the community is still small.`,
    },
    meta: { creator: "Rich Harris", year: "2016", type: "Compiler Framework", language: "JavaScript / Svelte" },
    pros: {
      ar: ["أداء استثنائي — أسرع من React وVue", "Bundle Size أصغر بكتير", "Syntax بسيط وواضح", "بدون Virtual DOM — أذكى تحديثاً"],
      en: ["Exceptional performance — faster than React and Vue", "Much smaller bundle size", "Simple and clear syntax", "No Virtual DOM — smarter updates"],
    },
    cons: {
      ar: ["Community صغيرة وموارد أقل", "فرص عمل محدودة جداً", "Ecosystem لسه نامي"],
      en: ["Small community and fewer resources", "Very limited job opportunities", "Ecosystem still growing"],
    },
    verdict: {
      ar: "مثير للاهتمام جداً للمستقبل، لكن مش الوقت المناسب كخيار أول. تعلمه بعد React أو Vue.",
      en: "Very exciting for the future, but not the right time as a first choice. Learn it after React or Vue.",
    },
  },
  nextjs: {
    name: "Next.js",
    tagline: { ar: "The React Framework for Production", en: "The React Framework for Production" },
    icon: '<i class="fa-solid fa-n" style="color:#fff"></i>',
    desc: {
      ar: `Next.js مش بديل عن React — هو Framework فوق React بيضيفله قدرات إضافية. صنعته شركة Vercel. بيتيح لك تعمل Server-Side Rendering وStatic Generation وAPI Routes. ده اللي بيستخدمه TikTok وTwitch وكتير من المواقع الكبيرة.`,
      en: `Next.js is not a replacement for React — it's a framework on top of React that adds extra capabilities. Created by Vercel. It enables Server-Side Rendering, Static Generation, and API Routes. This is what TikTok, Twitch, and many large websites use.`,
    },
    meta: { creator: "Vercel", year: "2016", type: "React Framework", language: "React / TypeScript" },
    pros: {
      ar: ["SEO ممتاز بفضل Server-Side Rendering", "Full-stack في مشروع واحد", "File-based Routing سهل ومريح", "Performance محسّن تلقائياً"],
      en: ["Excellent SEO thanks to Server-Side Rendering", "Full-stack in a single project", "Easy and convenient file-based Routing", "Automatically optimized performance"],
    },
    cons: {
      ar: ["لازم تعرف React الأول", "Hosting أسهل على Vercel، بيقيدك شوية", "App Router الجديد ممكن يكون محير"],
      en: ["Must know React first", "Hosting is easiest on Vercel, which can limit you", "The new App Router can be confusing"],
    },
    verdict: {
      ar: "الخيار الأمثل لو عايز تبني موقع Production-Ready بـ React. تعلم React الأول، وبعدين تعلم Next.js.",
      en: "The optimal choice if you want to build a Production-Ready website with React. Learn React first, then learn Next.js.",
    },
  },
};

/* ============================================================
/* ============================================================
   QUIZ QUESTIONS (bilingual)
   ============================================================ */
const QUIZ_QUESTIONS_DATA = [
  {
    q: { ar: "q1.q", en: "q1.q" },
    options: [
      { ar: "q1.o1", en: "q1.o1", weight: { react: 3, nextjs: 2, vue: 1 } },
      { ar: "q1.o2", en: "q1.o2", weight: { vue: 3, react: 1 } },
      { ar: "q1.o3", en: "q1.o3", weight: { angular: 4, react: 1 } },
      { ar: "q1.o4", en: "q1.o4", weight: { nextjs: 3, svelte: 2, vue: 1 } },
    ],
  },
  {
    q: { ar: "q2.q", en: "q2.q" },
    options: [
      { ar: "q2.o1", en: "q2.o1", weight: { vue: 3, react: 1 } },
      { ar: "q2.o2", en: "q2.o2", weight: { react: 3, vue: 2, nextjs: 1 } },
      { ar: "q2.o3", en: "q2.o3", weight: { angular: 3, nextjs: 2, react: 1 } },
      { ar: "q2.o4", en: "q2.o4", weight: { angular: 2, svelte: 3, nextjs: 2 } },
    ],
  },
  {
    q: { ar: "q3.q", en: "q3.q" },
    options: [
      { ar: "q3.o1", en: "q3.o1", weight: { react: 3, vue: 2 } },
      { ar: "q3.o2", en: "q3.o2", weight: { nextjs: 4, vue: 1 } },
      { ar: "q3.o3", en: "q3.o3", weight: { angular: 4, react: 1 } },
      { ar: "q3.o4", en: "q3.o4", weight: { svelte: 3, vue: 2, react: 1 } },
    ],
  },
];

const ROADMAP_KEYS = ["r1","r2","r3","r4","r5","r6"];

/* ============================================================
/* ============================================================
   ROADMAP DATA — Detailed per-framework
   ============================================================ */
/* ============================================================
   ROADMAP DATA — Detailed with real download links
   ============================================================ */
const ROADMAP_DATA = {
  ar: [
    {
      phase: "المرحلة الأولى — الأساسيات",
      phase_sub: "ابني الأساس الصح قبل أي Framework — مفيش shortcut هنا",
      color: "#e44d26", icon: "fa-solid fa-layer-group",
      step: "الخطوة 01", duration: "2–3 شهور",
      title: "HTML + CSS + JavaScript ",
      desc: "مفيش طريق تانية. الـ Frameworks هتتغير، لكن HTML وCSS وJS هيفضلوا معاك للأبد.",
      download: null,
      subs: [
        { tag:"HTML", icon:"fa-brands fa-html5", title:"HTML Semantics & Structure",
          desc:"مش بس تحفظ Tags — افهم معنى كل element. الـ Semantic HTML بيفرق في الـ SEO والـ Accessibility.",
          resources:[
            { name:"MDN Web Docs", url:"https://developer.mozilla.org/en-US/docs/Learn/HTML", icon:"fa-solid fa-book" },
            { name:"freeCodeCamp", url:"https://www.freecodecamp.org/learn/2022/responsive-web-design/", icon:"fa-solid fa-graduation-cap" },
            { name:"HTML Reference", url:"https://htmlreference.io", icon:"fa-solid fa-code" },
          ]},
        { tag:"CSS", icon:"fa-brands fa-css3-alt", title:"CSS من الأساس للاحتراف",
          desc:"Flexbox، Grid، Responsive Design، Animations. الـ CSS أصعب مما يبدو — تعلمه صح من الأول.",
          resources:[
            { name:"CSS-Tricks", url:"https://css-tricks.com/guides/", icon:"fa-solid fa-palette" },
            { name:"Kevin Powell YouTube", url:"https://www.youtube.com/@KevinPowell", icon:"fa-brands fa-youtube" },
            { name:"Flexbox Froggy", url:"https://flexboxfroggy.com", icon:"fa-solid fa-frog" },
          ]},
        { tag:"JS", icon:"fa-brands fa-js", title:"JavaScript الحديث (ES6+)",
          desc:"Variables، Functions، Arrays، Promises، Async/Await، Destructuring. ده اللي بيفرق في الـ Interview.",
          resources:[
            { name:"javascript.info", url:"https://javascript.info", icon:"fa-solid fa-book-open" },
            { name:"Eloquent JavaScript", url:"https://eloquentjavascript.net", icon:"fa-solid fa-book" },
            { name:"freeCodeCamp JS", url:"https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "المرحلة الأولى — الأساسيات",
      phase_sub: null,
      color: "#f0c020", icon: "fa-solid fa-sitemap",
      step: "الخطوة 02", duration: "3–4 أسابيع",
      title: "DOM Manipulation + Fetch API + Git",
      desc: "قبل ما تمس أي Framework — اتعلم تتحكم في الصفحة من غيره. Git مش اختياري — ابدأه دلوقتي.",
      download: null,
      subs: [
        { tag:"DOM", icon:"fa-solid fa-sitemap", title:"DOM Manipulation",
          desc:"querySelector، addEventListener، createElement. اعمل Todo List من غير أي Framework — هتتعلم أكتر من أي tutorial.",
          resources:[
            { name:"javascript.info/DOM", url:"https://javascript.info/document", icon:"fa-solid fa-book-open" },
            { name:"The Odin Project", url:"https://www.theodinproject.com/paths/foundations", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Fetch API", icon:"fa-solid fa-cloud", title:"Fetch API & Async JavaScript",
          desc:"Fetch، Promises، async/await، JSON. اعمل تطبيق يجيب بيانات من API حقيقية زي OpenWeather.",
          resources:[
            { name:"MDN Fetch API", url:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", icon:"fa-solid fa-book" },
            { name:"JSONPlaceholder", url:"https://jsonplaceholder.typicode.com", icon:"fa-solid fa-database" },
          ]},
        { tag:"Git", icon:"fa-brands fa-git-alt", title:"Git & GitHub الأساسيات",
          desc:"commit، push، pull، branches، merge. افتح GitHub account دلوقتي — الـ Recruiters بيبصوا فيه.",
          resources:[
            { name:"Git الرسمي", url:"https://git-scm.com/doc", icon:"fa-solid fa-book" },
            { name:"GitHub Skills", url:"https://skills.github.com", icon:"fa-brands fa-github" },
            { name:"Learn Git Branching", url:"https://learngitbranching.js.org", icon:"fa-solid fa-code-branch" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "المرحلة الثانية — اختار Framework",
      phase_sub: "دلوقتي الطريق بيتفرق — اختار بناءً على هدفك",
      color: "#61dafb", icon: "fa-brands fa-react",
      step: "الخطوة 03-A", duration: "2–4 شهور",
      title: "React — الأول في سوق العمل",
      desc: "لو هدفك تدخل سوق العمل بأسرع وقت — React هو إجابتك. الأكثر طلباً بفارق كبير.",
      download: { label:"ابدأ React", url:"https://react.dev/learn", icon:"fa-brands fa-react", color:"#61dafb" },
      subs: [
        { tag:"أساسيات", icon:"fa-solid fa-cubes", title:"Components + JSX + Props",
          desc:"الـ Component هو الـ Building Block. تعلم Function Components، Props، وكيف تـ render بيانات.",
          resources:[
            { name:"React الرسمي", url:"https://react.dev/learn", icon:"fa-brands fa-react" },
            { name:"Scrimba — React", url:"https://scrimba.com/learn/learnreact", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"State", icon:"fa-solid fa-gear", title:"useState + useEffect + Events",
          desc:"الـ State هو قلب React. useState للبيانات المتغيرة، useEffect للـ Side Effects.",
          resources:[
            { name:"react.dev — State", url:"https://react.dev/learn/state-a-components-memory", icon:"fa-brands fa-react" },
            { name:"Codevolution YouTube", url:"https://www.youtube.com/@Codevolution", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Router + Hooks", icon:"fa-solid fa-route", title:"React Router + Context + Custom Hooks",
          desc:"التنقل بين الصفحات بـ React Router. مشاركة البيانات بـ Context. Custom Hooks لإعادة الاستخدام.",
          resources:[
            { name:"React Router", url:"https://reactrouter.com/en/main/start/tutorial", icon:"fa-solid fa-route" },
            { name:"React Hooks Docs", url:"https://react.dev/reference/react/hooks", icon:"fa-brands fa-react" },
          ]},
        { tag:"مشاريع", icon:"fa-solid fa-hammer", title:"مشاريع حقيقية",
          desc:"اعمل: Weather App، Movie Search، Blog بـ API، Shopping Cart — كل مشروع بيعلمك concept جديد.",
          resources:[
            { name:"RapidAPI", url:"https://rapidapi.com/collection/list-of-free-apis", icon:"fa-solid fa-cloud" },
            { name:"TMDB API", url:"https://www.themoviedb.org/documentation/api", icon:"fa-solid fa-film" },
          ]},
      ], frameworks: ["react"],
    },
    {
      phase: "المرحلة الثانية — اختار Framework",
      phase_sub: null,
      color: "#42b883", icon: "fa-brands fa-vuejs",
      step: "الخطوة 03-B", duration: "2–3 شهور",
      title: "Vue.js — الأوضح للمبتدئين الجادين",
      desc: "لو عايز تفهم الـ Reactivity من الأساس بشكل أوضح — Vue هو أحسن مدرسة.",
      download: { label:"ابدأ Vue.js", url:"https://vuejs.org/guide/quick-start", icon:"fa-brands fa-vuejs", color:"#42b883" },
      subs: [
        { tag:"أساسيات", icon:"fa-solid fa-cube", title:"Vue Instance + Template Syntax",
          desc:"Options API والـ Composition API. v-bind، v-on، v-if، v-for. الـ Syntax أوضح من React للمبتدئ.",
          resources:[
            { name:"Vue الرسمي", url:"https://vuejs.org/guide/introduction.html", icon:"fa-brands fa-vuejs" },
            { name:"Vue Mastery", url:"https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Reactivity", icon:"fa-solid fa-bolt", title:"ref + reactive + computed",
          desc:"الـ Reactivity System في Vue أوضح من React. هتفهم إزاي الـ UI بيتحدث تلقائياً.",
          resources:[
            { name:"Vue Reactivity", url:"https://vuejs.org/guide/essentials/reactivity-fundamentals.html", icon:"fa-brands fa-vuejs" },
            { name:"Academind Vue 3", url:"https://www.youtube.com/@Academind", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Router + Pinia", icon:"fa-solid fa-layer-group", title:"Vue Router + Pinia State",
          desc:"التنقل بين الصفحات وإدارة الـ State مع Pinia — خلف Vuex في Vue 3.",
          resources:[
            { name:"Vue Router", url:"https://router.vuejs.org/guide/", icon:"fa-solid fa-route" },
            { name:"Pinia Docs", url:"https://pinia.vuejs.org/introduction.html", icon:"fa-brands fa-vuejs" },
          ]},
      ], frameworks: ["vue"],
    },
    {
      phase: "المرحلة الثانية — اختار Framework",
      phase_sub: null,
      color: "#dd1b16", icon: "fa-brands fa-angular",
      step: "الخطوة 03-C", duration: "3–5 شهور",
      title: "Angular — شركات Enterprise والمشاريع الكبيرة",
      desc: "مش للمبتدئ الجديد — لكن لو هدفك Enterprise أو مشاريع حكومية ضخمة، ده هو الطريق.",
      download: { label:"ابدأ Angular", url:"https://angular.dev/tutorials", icon:"fa-brands fa-angular", color:"#dd1b16" },
      subs: [
        { tag:"TypeScript أولاً", icon:"fa-solid fa-shield-halved", title:"TypeScript قبل Angular",
          desc:"Angular بيستخدم TypeScript إجبارياً. اتعلم Types، Interfaces، Decorators أولاً.",
          resources:[
            { name:"TypeScript Docs", url:"https://www.typescriptlang.org/docs/handbook/intro.html", icon:"fa-solid fa-book" },
            { name:"Total TypeScript", url:"https://www.totaltypescript.com/tutorials", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"أساسيات", icon:"fa-solid fa-cubes", title:"Components + Modules + Services",
          desc:"Architecture Angular مختلفة — DI، Modules، Services. Boilerplate كتير لكن منظم جداً.",
          resources:[
            { name:"Angular الرسمي", url:"https://angular.dev/tutorials", icon:"fa-brands fa-angular" },
            { name:"Fireship Angular", url:"https://www.youtube.com/@Fireship", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"RxJS", icon:"fa-solid fa-wave-square", title:"RxJS + Router + Reactive Forms",
          desc:"RxJS هو قلب Angular — Observables، Subjects. Reactive Forms للـ Forms المعقدة.",
          resources:[
            { name:"RxJS Docs", url:"https://rxjs.dev/guide/overview", icon:"fa-solid fa-book" },
            { name:"Angular University", url:"https://angular-university.io", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: ["angular"],
    },
    {
      phase: "المرحلة الثانية — اختار Framework",
      phase_sub: null,
      color: "#ff3e00", icon: "fa-solid fa-fire-flame-curved",
      step: "الخطوة 03-D", duration: "1–2 شهر",
      title: "Svelte — الأسرع والأخف — تعلمه كـ Second Framework",
      desc: "Svelte مثير جداً — بس مش هتلاقي وظايف كتير دلوقتي. تعلمه بعد React أو Vue.",
      download: { label:"ابدأ Svelte", url:"https://learn.svelte.dev/tutorial/welcome-to-svelte", icon:"fa-solid fa-fire-flame-curved", color:"#ff3e00" },
      subs: [
        { tag:"أساسيات", icon:"fa-solid fa-bolt", title:"Svelte Syntax + Reactivity",
          desc:"Svelte بيـ compile الكود مباشرة — مش Virtual DOM. Reactivity بسيط جداً.",
          resources:[
            { name:"Svelte Tutorial", url:"https://learn.svelte.dev/tutorial/welcome-to-svelte", icon:"fa-solid fa-book-open" },
            { name:"Joy of Code", url:"https://www.youtube.com/@JoyofCodeDev", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"SvelteKit", icon:"fa-solid fa-server", title:"SvelteKit للـ Full-Stack",
          desc:"SvelteKit زي Next.js لـ React — File-based routing وSSR.",
          resources:[
            { name:"SvelteKit Docs", url:"https://kit.svelte.dev/docs/introduction", icon:"fa-solid fa-book" },
            { name:"Svelte Society", url:"https://sveltesociety.dev", icon:"fa-solid fa-users" },
          ]},
      ], frameworks: ["svelte"],
    },
    {
      phase: "المرحلة الثالثة — ارفع مستواك",
      phase_sub: "بعد ما اتقنت Framework واحد — ارفع من قيمتك السوقية",
      color: "#e5e7eb", icon: "fa-solid fa-n",
      step: "الخطوة 04", duration: "2–3 شهور",
      title: "Next.js — من React لـ Full-Stack",
      desc: "Next.js مش Framework تاني — هو React بـ SSR وSSG وAPI Routes. ده اللي بيستخدمه الـ Production.",
      download: { label:"ابدأ Next.js", url:"https://nextjs.org/learn", icon:"fa-solid fa-n", color:"#e5e7eb" },
      subs: [
        { tag:"SSR / SSG", icon:"fa-solid fa-server", title:"Server vs Static Rendering",
          desc:"الفرق بين SSR وSSG وCSR. App Router الجديد وServer Components.",
          resources:[
            { name:"Next.js Docs", url:"https://nextjs.org/docs", icon:"fa-solid fa-book" },
            { name:"Next.js Learn", url:"https://nextjs.org/learn", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"App Router", icon:"fa-solid fa-route", title:"App Router الجديد (v13+)",
          desc:"Server Components، Client Components، Loading UI، Error Handling — غيّر طريقة الكتابة كلياً.",
          resources:[
            { name:"App Router Docs", url:"https://nextjs.org/docs/app", icon:"fa-solid fa-book" },
            { name:"Josh Tried Coding", url:"https://www.youtube.com/@joshtriedcoding", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Full-Stack", icon:"fa-solid fa-database", title:"API Routes + Database + Auth",
          desc:"API Endpoints جوه Next.js. Prisma مع Database. Auth.js للـ Authentication.",
          resources:[
            { name:"Prisma ORM", url:"https://www.prisma.io/docs/getting-started", icon:"fa-solid fa-database" },
            { name:"Auth.js", url:"https://authjs.dev", icon:"fa-solid fa-lock" },
          ]},
      ], frameworks: ["nextjs", "react"],
    },
    {
      phase: "المرحلة الثالثة — ارفع مستواك",
      phase_sub: null,
      color: "#3178c6", icon: "fa-solid fa-shield-halved",
      step: "الخطوة 05", duration: "2–3 شهور",
      title: "TypeScript + Testing + Performance",
      desc: "ده الفرق بين Junior وMid-Level Developer. الشركات الكبيرة بتطلبهم.",
      download: { label:"ابدأ TypeScript", url:"https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html", icon:"fa-solid fa-shield-halved", color:"#3178c6" },
      subs: [
        { tag:"TypeScript", icon:"fa-solid fa-shield-halved", title:"TypeScript مع React / Vue",
          desc:"Types، Interfaces، Generics، Utility Types. هتلاقي أقل Bugs بكتير.",
          resources:[
            { name:"TypeScript Docs", url:"https://www.typescriptlang.org/docs/handbook/intro.html", icon:"fa-solid fa-book" },
            { name:"Total TypeScript", url:"https://www.totaltypescript.com", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Testing", icon:"fa-solid fa-vial", title:"Vitest + Testing Library + Playwright",
          desc:"Unit Tests بـ Vitest، Component Tests بـ Testing Library، E2E بـ Playwright.",
          resources:[
            { name:"Vitest", url:"https://vitest.dev/guide/", icon:"fa-solid fa-vial" },
            { name:"Testing Library", url:"https://testing-library.com/docs/react-testing-library/intro/", icon:"fa-brands fa-react" },
            { name:"Playwright", url:"https://playwright.dev/docs/intro", icon:"fa-solid fa-robot" },
          ]},
        { tag:"Performance", icon:"fa-solid fa-gauge-high", title:"Web Performance Optimization",
          desc:"Lazy Loading، Code Splitting، React.memo، useMemo. Bundle Analyzer لتقليل الحجم.",
          resources:[
            { name:"web.dev Performance", url:"https://web.dev/learn/performance", icon:"fa-solid fa-gauge-high" },
            { name:"Lighthouse", url:"https://developer.chrome.com/docs/lighthouse/overview/", icon:"fa-brands fa-chrome" },
          ]},
      ], frameworks: ["react", "vue", "angular", "nextjs"],
    },
    {
      phase: "المرحلة الرابعة — الاحتراف",
      phase_sub: "انت دلوقتي جاهز — ده اللي بيميزك عن غيرك",
      color: "#ffd93d", icon: "fa-solid fa-rocket",
      step: "الخطوة 06", duration: "مستمر",
      title: "Portfolio + Open Source + Job Hunt",
      desc: "Skills من غير Portfolio وعارف تتكلم عن نفسك = مش هتشتغل. الـ Network أهم من الـ Certificate.",
      download: null,
      subs: [
        { tag:"Portfolio", icon:"fa-solid fa-briefcase", title:"موقع Portfolio احترافي",
          desc:"اعمل بـ Next.js أو Astro. اعرض 3–5 مشاريع بشكل تفصيلي مع Screenshots وCase Studies.",
          resources:[
            { name:"Astro Framework", url:"https://astro.build", icon:"fa-solid fa-rocket" },
            { name:"Framer Motion", url:"https://www.framer.com/motion/", icon:"fa-solid fa-wand-magic-sparkles" },
            { name:"Tailwind CSS", url:"https://tailwindcss.com/docs/installation", icon:"fa-solid fa-palette" },
          ]},
        { tag:"Open Source", icon:"fa-brands fa-github", title:"ساهم في Open Source",
          desc:"Good First Issues على GitHub. بيثبت إنك بتشتغل مع Teams حقيقية.",
          resources:[
            { name:"First Contributions", url:"https://github.com/firstcontributions/first-contributions", icon:"fa-brands fa-github" },
            { name:"Good First Issue", url:"https://goodfirstissue.dev", icon:"fa-solid fa-hand-holding-heart" },
          ]},
        { tag:"Interview", icon:"fa-solid fa-microphone", title:"Technical Interview Prep",
          desc:"LeetCode للـ DSA، System Design، React/JS Concepts مش بس Syntax.",
          resources:[
            { name:"LeetCode", url:"https://leetcode.com/problemset/", icon:"fa-solid fa-code" },
            { name:"Frontend Interview Handbook", url:"https://www.frontendinterviewhandbook.com", icon:"fa-solid fa-book-open" },
            { name:"GreatFrontEnd", url:"https://www.greatfrontend.com", icon:"fa-solid fa-star" },
          ]},
      ], frameworks: ["react", "vue", "angular", "svelte", "nextjs"],
    },
  ],

  en: [
    {
      phase: "Phase 1 — Foundations",
      phase_sub: "Build on solid ground before any Framework — no shortcut here",
      color: "#e44d26", icon: "fa-solid fa-layer-group",
      step: "Step 01", duration: "2–3 months",
      title: "HTML + CSS + JavaScript — The Holy Trinity",
      desc: "No shortcut. Frameworks will change, but HTML, CSS, and JS will stay with you forever.",
      download: null,
      subs: [
        { tag:"HTML", icon:"fa-brands fa-html5", title:"HTML Semantics & Structure",
          desc:"Don't just memorize tags — understand each element's meaning. Semantic HTML matters for SEO and Accessibility.",
          resources:[
            { name:"MDN Web Docs", url:"https://developer.mozilla.org/en-US/docs/Learn/HTML", icon:"fa-solid fa-book" },
            { name:"freeCodeCamp", url:"https://www.freecodecamp.org/learn/2022/responsive-web-design/", icon:"fa-solid fa-graduation-cap" },
            { name:"HTML Reference", url:"https://htmlreference.io", icon:"fa-solid fa-code" },
          ]},
        { tag:"CSS", icon:"fa-brands fa-css3-alt", title:"CSS from Basics to Mastery",
          desc:"Flexbox, Grid, Responsive Design, Animations. CSS is harder than people think — learn it right from the start.",
          resources:[
            { name:"CSS-Tricks", url:"https://css-tricks.com/guides/", icon:"fa-solid fa-palette" },
            { name:"Kevin Powell YouTube", url:"https://www.youtube.com/@KevinPowell", icon:"fa-brands fa-youtube" },
            { name:"Flexbox Froggy", url:"https://flexboxfroggy.com", icon:"fa-solid fa-frog" },
          ]},
        { tag:"JS", icon:"fa-brands fa-js", title:"Modern JavaScript (ES6+)",
          desc:"Variables, Functions, Arrays, Promises, Async/Await, Destructuring. This is what differentiates you in interviews.",
          resources:[
            { name:"javascript.info", url:"https://javascript.info", icon:"fa-solid fa-book-open" },
            { name:"Eloquent JavaScript", url:"https://eloquentjavascript.net", icon:"fa-solid fa-book" },
            { name:"freeCodeCamp JS", url:"https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "Phase 1 — Foundations",
      phase_sub: null,
      color: "#f0c020", icon: "fa-solid fa-sitemap",
      step: "Step 02", duration: "3–4 weeks",
      title: "DOM Manipulation + Fetch API + Git",
      desc: "Before touching any Framework — learn to control the page without it. Git is not optional — start now.",
      download: null,
      subs: [
        { tag:"DOM", icon:"fa-solid fa-sitemap", title:"DOM Manipulation",
          desc:"querySelector, addEventListener, createElement. Build a Todo List without any Framework — you'll learn more than any tutorial.",
          resources:[
            { name:"javascript.info/DOM", url:"https://javascript.info/document", icon:"fa-solid fa-book-open" },
            { name:"The Odin Project", url:"https://www.theodinproject.com/paths/foundations", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Fetch API", icon:"fa-solid fa-cloud", title:"Fetch API & Async JavaScript",
          desc:"Fetch, Promises, async/await, JSON. Build an app fetching data from a real API like OpenWeather.",
          resources:[
            { name:"MDN Fetch API", url:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", icon:"fa-solid fa-book" },
            { name:"JSONPlaceholder", url:"https://jsonplaceholder.typicode.com", icon:"fa-solid fa-database" },
          ]},
        { tag:"Git", icon:"fa-brands fa-git-alt", title:"Git & GitHub Basics",
          desc:"commit, push, pull, branches, merge. Open a GitHub account now — recruiters check GitHub, not just CVs.",
          resources:[
            { name:"Git Official Docs", url:"https://git-scm.com/doc", icon:"fa-solid fa-book" },
            { name:"GitHub Skills", url:"https://skills.github.com", icon:"fa-brands fa-github" },
            { name:"Learn Git Branching", url:"https://learngitbranching.js.org", icon:"fa-solid fa-code-branch" },
          ]},
      ], frameworks: null,
    },
    {
      phase: "Phase 2 — Choose Your Framework",
      phase_sub: "The path splits here — choose based on your goal",
      color: "#61dafb", icon: "fa-brands fa-react",
      step: "Step 03-A", duration: "2–4 months",
      title: "React — #1 in the Job Market",
      desc: "If your goal is entering the job market fast — React is your answer. The most in-demand by a significant margin.",
      download: { label:"Start React", url:"https://react.dev/learn", icon:"fa-brands fa-react", color:"#61dafb" },
      subs: [
        { tag:"Basics", icon:"fa-solid fa-cubes", title:"Components + JSX + Props",
          desc:"The Component is React's building block. Learn Function Components, Props, and how to render data.",
          resources:[
            { name:"React Official Docs", url:"https://react.dev/learn", icon:"fa-brands fa-react" },
            { name:"Scrimba — React", url:"https://scrimba.com/learn/learnreact", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"State", icon:"fa-solid fa-gear", title:"useState + useEffect + Events",
          desc:"State is the heart of React. useState for changing data, useEffect for Side Effects like data fetching.",
          resources:[
            { name:"react.dev — State", url:"https://react.dev/learn/state-a-components-memory", icon:"fa-brands fa-react" },
            { name:"Codevolution YouTube", url:"https://www.youtube.com/@Codevolution", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Router + Hooks", icon:"fa-solid fa-route", title:"React Router + Context + Custom Hooks",
          desc:"Navigate with React Router. Share data with Context. Build Custom Hooks for reusability.",
          resources:[
            { name:"React Router", url:"https://reactrouter.com/en/main/start/tutorial", icon:"fa-solid fa-route" },
            { name:"React Hooks Docs", url:"https://react.dev/reference/react/hooks", icon:"fa-brands fa-react" },
          ]},
        { tag:"Projects", icon:"fa-solid fa-hammer", title:"Real Projects",
          desc:"Build: Weather App, Movie Search, Blog with API, Shopping Cart — each teaches a new concept.",
          resources:[
            { name:"RapidAPI", url:"https://rapidapi.com/collection/list-of-free-apis", icon:"fa-solid fa-cloud" },
            { name:"TMDB API", url:"https://www.themoviedb.org/documentation/api", icon:"fa-solid fa-film" },
          ]},
      ], frameworks: ["react"],
    },
    {
      phase: "Phase 2 — Choose Your Framework",
      phase_sub: null,
      color: "#42b883", icon: "fa-brands fa-vuejs",
      step: "Step 03-B", duration: "2–3 months",
      title: "Vue.js — Clearest for Serious Beginners",
      desc: "If you want to understand Reactivity from scratch more clearly — Vue is the best school.",
      download: { label:"Start Vue.js", url:"https://vuejs.org/guide/quick-start", icon:"fa-brands fa-vuejs", color:"#42b883" },
      subs: [
        { tag:"Basics", icon:"fa-solid fa-cube", title:"Vue Instance + Template Syntax",
          desc:"Options API and Composition API. v-bind, v-on, v-if, v-for. Clearer syntax than React for beginners.",
          resources:[
            { name:"Vue Official Docs", url:"https://vuejs.org/guide/introduction.html", icon:"fa-brands fa-vuejs" },
            { name:"Vue Mastery", url:"https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Reactivity", icon:"fa-solid fa-bolt", title:"ref + reactive + computed",
          desc:"Vue's Reactivity System is clearer than React's. You'll understand how UI updates automatically.",
          resources:[
            { name:"Vue Reactivity", url:"https://vuejs.org/guide/essentials/reactivity-fundamentals.html", icon:"fa-brands fa-vuejs" },
            { name:"Academind Vue 3", url:"https://www.youtube.com/@Academind", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Router + Pinia", icon:"fa-solid fa-layer-group", title:"Vue Router + Pinia State",
          desc:"Navigate between pages and manage state with Pinia — which replaced Vuex in Vue 3.",
          resources:[
            { name:"Vue Router", url:"https://router.vuejs.org/guide/", icon:"fa-solid fa-route" },
            { name:"Pinia Docs", url:"https://pinia.vuejs.org/introduction.html", icon:"fa-brands fa-vuejs" },
          ]},
      ], frameworks: ["vue"],
    },
    {
      phase: "Phase 2 — Choose Your Framework",
      phase_sub: null,
      color: "#dd1b16", icon: "fa-brands fa-angular",
      step: "Step 03-C", duration: "3–5 months",
      title: "Angular — Enterprise & Large Organizations",
      desc: "Not for brand new beginners — but if your goal is Enterprise companies or government projects, this is the path.",
      download: { label:"Start Angular", url:"https://angular.dev/tutorials", icon:"fa-brands fa-angular", color:"#dd1b16" },
      subs: [
        { tag:"TypeScript First", icon:"fa-solid fa-shield-halved", title:"TypeScript Before Angular",
          desc:"Angular mandates TypeScript. Learn Types, Interfaces, Decorators first.",
          resources:[
            { name:"TypeScript Docs", url:"https://www.typescriptlang.org/docs/handbook/intro.html", icon:"fa-solid fa-book" },
            { name:"Total TypeScript", url:"https://www.totaltypescript.com/tutorials", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Basics", icon:"fa-solid fa-cubes", title:"Components + Modules + Services",
          desc:"Angular's architecture is completely different — DI, Modules, Services. Lots of boilerplate but very organized.",
          resources:[
            { name:"Angular Official Docs", url:"https://angular.dev/tutorials", icon:"fa-brands fa-angular" },
            { name:"Fireship Angular", url:"https://www.youtube.com/@Fireship", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"RxJS", icon:"fa-solid fa-wave-square", title:"RxJS + Router + Reactive Forms",
          desc:"RxJS is the heart of Angular — Observables, Subjects. Reactive Forms for complex forms.",
          resources:[
            { name:"RxJS Docs", url:"https://rxjs.dev/guide/overview", icon:"fa-solid fa-book" },
            { name:"Angular University", url:"https://angular-university.io", icon:"fa-solid fa-graduation-cap" },
          ]},
      ], frameworks: ["angular"],
    },
    {
      phase: "Phase 2 — Choose Your Framework",
      phase_sub: null,
      color: "#ff3e00", icon: "fa-solid fa-fire-flame-curved",
      step: "Step 03-D", duration: "1–2 months",
      title: "Svelte — Fastest & Lightest — Learn as 2nd Framework",
      desc: "Svelte is very exciting — but few jobs use it right now. Learn it after React or Vue.",
      download: { label:"Start Svelte", url:"https://learn.svelte.dev/tutorial/welcome-to-svelte", icon:"fa-solid fa-fire-flame-curved", color:"#ff3e00" },
      subs: [
        { tag:"Basics", icon:"fa-solid fa-bolt", title:"Svelte Syntax + Reactivity",
          desc:"Svelte compiles code directly — no Virtual DOM. Reactivity is very simple and different.",
          resources:[
            { name:"Svelte Tutorial", url:"https://learn.svelte.dev/tutorial/welcome-to-svelte", icon:"fa-solid fa-book-open" },
            { name:"Joy of Code", url:"https://www.youtube.com/@JoyofCodeDev", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"SvelteKit", icon:"fa-solid fa-server", title:"SvelteKit for Full-Stack",
          desc:"SvelteKit is like Next.js for React — File-based routing and SSR.",
          resources:[
            { name:"SvelteKit Docs", url:"https://kit.svelte.dev/docs/introduction", icon:"fa-solid fa-book" },
            { name:"Svelte Society", url:"https://sveltesociety.dev", icon:"fa-solid fa-users" },
          ]},
      ], frameworks: ["svelte"],
    },
    {
      phase: "Phase 3 — Level Up",
      phase_sub: "After mastering at least one Framework — raise your market value",
      color: "#e5e7eb", icon: "fa-solid fa-n",
      step: "Step 04", duration: "2–3 months",
      title: "Next.js — From React to Full-Stack",
      desc: "Next.js isn't another framework — it's React with SSR, SSG, and API Routes. What production projects use.",
      download: { label:"Start Next.js", url:"https://nextjs.org/learn", icon:"fa-solid fa-n", color:"#e5e7eb" },
      subs: [
        { tag:"SSR / SSG", icon:"fa-solid fa-server", title:"Server vs Static Rendering",
          desc:"The difference between SSR, SSG, and CSR. App Router and Server Components.",
          resources:[
            { name:"Next.js Docs", url:"https://nextjs.org/docs", icon:"fa-solid fa-book" },
            { name:"Next.js Learn", url:"https://nextjs.org/learn", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"App Router", icon:"fa-solid fa-route", title:"New App Router (v13+)",
          desc:"Server Components, Client Components, Loading UI, Error Handling — completely changed how you write Next.js.",
          resources:[
            { name:"App Router Docs", url:"https://nextjs.org/docs/app", icon:"fa-solid fa-book" },
            { name:"Josh Tried Coding", url:"https://www.youtube.com/@joshtriedcoding", icon:"fa-brands fa-youtube" },
          ]},
        { tag:"Full-Stack", icon:"fa-solid fa-database", title:"API Routes + Database + Auth",
          desc:"API Endpoints inside Next.js. Prisma with Database. Auth.js for Authentication.",
          resources:[
            { name:"Prisma ORM", url:"https://www.prisma.io/docs/getting-started", icon:"fa-solid fa-database" },
            { name:"Auth.js", url:"https://authjs.dev", icon:"fa-solid fa-lock" },
          ]},
      ], frameworks: ["nextjs", "react"],
    },
    {
      phase: "Phase 3 — Level Up",
      phase_sub: null,
      color: "#3178c6", icon: "fa-solid fa-shield-halved",
      step: "Step 05", duration: "2–3 months",
      title: "TypeScript + Testing + Performance",
      desc: "This is the difference between Junior and Mid-Level Developer. Large companies require both.",
      download: { label:"Start TypeScript", url:"https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html", icon:"fa-solid fa-shield-halved", color:"#3178c6" },
      subs: [
        { tag:"TypeScript", icon:"fa-solid fa-shield-halved", title:"TypeScript with React / Vue",
          desc:"Types, Interfaces, Generics, Utility Types. Far fewer bugs.",
          resources:[
            { name:"TypeScript Docs", url:"https://www.typescriptlang.org/docs/handbook/intro.html", icon:"fa-solid fa-book" },
            { name:"Total TypeScript", url:"https://www.totaltypescript.com", icon:"fa-solid fa-graduation-cap" },
          ]},
        { tag:"Testing", icon:"fa-solid fa-vial", title:"Vitest + Testing Library + Playwright",
          desc:"Unit Tests with Vitest, Component Tests with Testing Library, E2E with Playwright.",
          resources:[
            { name:"Vitest", url:"https://vitest.dev/guide/", icon:"fa-solid fa-vial" },
            { name:"Testing Library", url:"https://testing-library.com/docs/react-testing-library/intro/", icon:"fa-brands fa-react" },
            { name:"Playwright", url:"https://playwright.dev/docs/intro", icon:"fa-solid fa-robot" },
          ]},
        { tag:"Performance", icon:"fa-solid fa-gauge-high", title:"Web Performance Optimization",
          desc:"Lazy Loading, Code Splitting, React.memo, useMemo. Bundle Analyzer to reduce size.",
          resources:[
            { name:"web.dev Performance", url:"https://web.dev/learn/performance", icon:"fa-solid fa-gauge-high" },
            { name:"Lighthouse", url:"https://developer.chrome.com/docs/lighthouse/overview/", icon:"fa-brands fa-chrome" },
          ]},
      ], frameworks: ["react", "vue", "angular", "nextjs"],
    },
    {
      phase: "Phase 4 — Mastery",
      phase_sub: "You're ready for the job market — this is what differentiates you",
      color: "#ffd93d", icon: "fa-solid fa-rocket",
      step: "Step 06", duration: "Ongoing",
      title: "Portfolio + Open Source + Job Hunt",
      desc: "Skills without a Portfolio = no job. Network is more important than certificates in Tech.",
      download: null,
      subs: [
        { tag:"Portfolio", icon:"fa-solid fa-briefcase", title:"Professional Portfolio Site",
          desc:"Build with Next.js or Astro. Showcase 3–5 projects with Screenshots, Case Studies, GitHub links.",
          resources:[
            { name:"Astro Framework", url:"https://astro.build", icon:"fa-solid fa-rocket" },
            { name:"Framer Motion", url:"https://www.framer.com/motion/", icon:"fa-solid fa-wand-magic-sparkles" },
            { name:"Tailwind CSS", url:"https://tailwindcss.com/docs/installation", icon:"fa-solid fa-palette" },
          ]},
        { tag:"Open Source", icon:"fa-brands fa-github", title:"Contribute to Open Source",
          desc:"Good First Issues on GitHub. Proves you can work with real teams.",
          resources:[
            { name:"First Contributions", url:"https://github.com/firstcontributions/first-contributions", icon:"fa-brands fa-github" },
            { name:"Good First Issue", url:"https://goodfirstissue.dev", icon:"fa-solid fa-hand-holding-heart" },
          ]},
        { tag:"Interview", icon:"fa-solid fa-microphone", title:"Technical Interview Prep",
          desc:"LeetCode for DSA, System Design, deep dive React/JS Concepts — not just Syntax.",
          resources:[
            { name:"LeetCode", url:"https://leetcode.com/problemset/", icon:"fa-solid fa-code" },
            { name:"Frontend Interview Handbook", url:"https://www.frontendinterviewhandbook.com", icon:"fa-solid fa-book-open" },
            { name:"GreatFrontEnd", url:"https://www.greatfrontend.com", icon:"fa-solid fa-star" },
          ]},
      ], frameworks: ["react", "vue", "angular", "svelte", "nextjs"],
    },
  ],
};
const FW_COLORS = {
  react: "#61dafb", vue: "#42b883", angular: "#dd1b16", svelte: "#ff3e00", nextjs: "#aaa"
};
const FW_ICONS = {
  react: "fa-brands fa-react", vue: "fa-brands fa-vuejs",
  angular: "fa-brands fa-angular", svelte: "fa-solid fa-fire-flame-curved", nextjs: "fa-solid fa-n"
};

/* ============================================================
/* ============================================================
   STATE
   ============================================================ */
let currentLang  = localStorage.getItem("lang")  || "ar";
let currentTheme = localStorage.getItem("theme") || "dark";
let quizAnswers  = {};
let currentQuestion = 0;
function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS["ar"][key] || key;
}

function applyTranslations() {
  const lang = currentLang;
  const isEn = lang === "en";

  /* html dir + lang */
  document.documentElement.setAttribute("lang", isEn ? "en" : "ar");
  document.documentElement.setAttribute("dir",  isEn ? "ltr" : "rtl");
  document.documentElement.setAttribute("data-lang", lang);

  /* Switch Bootstrap RTL/LTR stylesheet */
  const bsLink = document.querySelector('link[href*="bootstrap"]');
  if (bsLink) {
    bsLink.href = isEn
      ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";
  }

  /* Translate all [data-i18n] elements */
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val !== undefined) el.innerHTML = val;
  });

  /* Lang button label */
  const langLabel = document.getElementById("langLabel");
  if (langLabel) langLabel.textContent = isEn ? "AR" : "EN";

  /* Page title */
  document.title = isEn
    ? "Frontend Development — Beginner's Guide"
    : "Frontend Development — دليل المبتدئين";
}

/* ============================================================
/* ============================================================
   THEME
   ============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const iconL = document.getElementById("iconLight");
  const iconD = document.getElementById("iconDark");
  if (iconL) iconL.style.display = theme === "dark"  ? "inline" : "none";
  if (iconD) iconD.style.display = theme === "light" ? "inline" : "none";
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
/* ============================================================
   LANGUAGE TOGGLE
   ============================================================ */
function initLang() {
  applyTranslations();
  document.getElementById("langToggle")?.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyTranslations();
    /* Re-render dynamic content */
    renderFrameworkPanel(document.querySelector(".fw-tab.active")?.dataset.fw || "react");
    renderQuizQuestion(currentQuestion);
    initRoadmap();
  });
}

/* ============================================================
/* ============================================================
   NAV
   ============================================================ */
function initNav() {
  window.addEventListener("scroll", () => {
    document.getElementById("mainNav").classList.toggle("scrolled", window.scrollY > 60);
  });
  document.querySelectorAll(".nav-link-item, .btn-primary-custom, .btn-secondary-custom").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ============================================================
/* ============================================================
   AOS
   ============================================================ */
function initAOS() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        const d = parseInt(e.target.dataset.aosDelay || "0");
        setTimeout(() => e.target.classList.add("aos-animate"), d);
      }
    }),
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll("[data-aos]").forEach((el) => obs.observe(el));
}

/* ============================================================
/* ============================================================
   FRAMEWORK TABS
   ============================================================ */
function renderFrameworkPanel(key) {
  const fw = FRAMEWORKS[key];
  if (!fw) return;
  const lang = currentLang;
  const panel = document.getElementById("fwPanel");

  panel.innerHTML = `
    <div class="fw-panel-inner">
      <div class="fw-panel-main">
        <div class="fw-panel-header">
          <div class="fw-panel-icon">${fw.icon}</div>
          <div>
            <div class="fw-panel-name">${fw.name}</div>
            <div class="fw-panel-tagline">${fw.tagline[lang]}</div>
          </div>
        </div>
        <p class="fw-panel-desc">${fw.desc[lang]}</p>
        <div class="fw-meta-grid">
          <div class="fw-meta-item"><div class="fw-meta-label">${t("panel.creator")}</div><div class="fw-meta-value">${fw.meta.creator}</div></div>
          <div class="fw-meta-item"><div class="fw-meta-label">${t("panel.year")}</div><div class="fw-meta-value">${fw.meta.year}</div></div>
          <div class="fw-meta-item"><div class="fw-meta-label">${t("panel.type")}</div><div class="fw-meta-value">${fw.meta.type}</div></div>
          <div class="fw-meta-item"><div class="fw-meta-label">${t("panel.lang")}</div><div class="fw-meta-value">${fw.meta.language}</div></div>
        </div>
      </div>
      <div class="fw-side">
        <div class="fw-pros-cons pros">
          <h5><i class="fa-solid fa-thumbs-up me-2"></i>${t("panel.pros")}</h5>
          ${fw.pros[lang].map((p) => `<div class="fw-list-item"><i class="fa-solid fa-check"></i><span>${p}</span></div>`).join("")}
        </div>
        <div class="fw-pros-cons cons">
          <h5><i class="fa-solid fa-thumbs-down me-2"></i>${t("panel.cons")}</h5>
          ${fw.cons[lang].map((c) => `<div class="fw-list-item"><i class="fa-solid fa-xmark"></i><span>${c}</span></div>`).join("")}
        </div>
        <div class="fw-verdict">
          <h5><i class="fa-solid fa-lightbulb me-2"></i>${t("panel.verdict")}</h5>
          <p>${fw.verdict[lang]}</p>
        </div>
      </div>
    </div>
  `;
}

function initFrameworkTabs() {
  renderFrameworkPanel("react");
  document.querySelectorAll("#fwTabs .fw-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#fwTabs .fw-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderFrameworkPanel(tab.dataset.fw);
    });
  });
}

/* ============================================================
/* ============================================================
   PERF BARS
   ============================================================ */
function initPerfBars() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.setProperty("--perf-width", e.target.dataset.perf + "%");
        e.target.classList.add("animated");
        obs.unobserve(e.target);
      }
    }),
    { threshold: 0.5 }
  );
  document.querySelectorAll(".perf-bar").forEach((b) => obs.observe(b));
}

/* ============================================================
/* ============================================================
   QUIZ
   ============================================================ */
function calcResult() {
  const scores = { react: 0, vue: 0, angular: 0, svelte: 0, nextjs: 0 };
  Object.values(quizAnswers).forEach((weights) => {
    Object.entries(weights).forEach(([fw, score]) => { scores[fw] = (scores[fw] || 0) + score; });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function renderQuizResult(fwKey) {
  const fw = FRAMEWORKS[fwKey];
  document.getElementById("quizProgressFill").style.width = "100%";
  document.getElementById("quizStepIndicator").textContent = t("quiz.result");
  document.getElementById("quizContent").innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-icon">${fw.icon}</div>
      <h3>${t("quiz.rec")}</h3>
      <div class="quiz-result-fw">${fw.name}</div>
      <p>${fw.verdict[currentLang]}</p>
      <button class="quiz-restart" id="quizRestart">
        <i class="fa-solid fa-rotate-right me-2"></i>${t("quiz.restart")}
      </button>
    </div>
  `;
  document.getElementById("quizRestart")?.addEventListener("click", () => {
    quizAnswers = {};
    currentQuestion = 0;
    renderQuizQuestion(0);
  });
}

function renderQuizQuestion(index) {
  const q = QUIZ_QUESTIONS_DATA[index];
  const progress = ((index + 1) / QUIZ_QUESTIONS_DATA.length) * 100;
  document.getElementById("quizProgressFill").style.width = progress + "%";
  document.getElementById("quizStepIndicator").textContent =
    t("quiz.step").replace("{n}", index + 1).replace("{total}", QUIZ_QUESTIONS_DATA.length);

  document.getElementById("quizContent").innerHTML = `
    <div class="quiz-question">${t(q.q[currentLang])}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-option="${i}">
          <span class="quiz-option-icon"><i class="fa-solid fa-circle-dot" style="opacity:0.3"></i></span>
          <span>${t(opt[currentLang])}</span>
        </button>
      `).join("")}
    </div>
  `;
  document.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      quizAnswers[index] = QUIZ_QUESTIONS_DATA[index].options[parseInt(btn.dataset.option)].weight;
      if (index + 1 < QUIZ_QUESTIONS_DATA.length) {
        currentQuestion = index + 1;
        renderQuizQuestion(currentQuestion);
      } else {
        renderQuizResult(calcResult());
      }
    });
  });
}

function initQuiz() { renderQuizQuestion(0); }


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
            <i class="${FW_ICONS[fw]}"></i> ${fw === "nextjs" ? "Next.js" : fw.charAt(0).toUpperCase() + fw.slice(1)}
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
   KEYBOARD SHORTCUTS
   ============================================================ */
function initKeyboardShortcuts() {
  const keys = Object.keys(FRAMEWORKS);
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "f" && e.target.tagName !== "INPUT") {
      idx = (idx + 1) % keys.length;
      document.querySelectorAll("#fwTabs .fw-tab").forEach((t) => {
        t.classList.toggle("active", t.dataset.fw === keys[idx]);
      });
      renderFrameworkPanel(keys[idx]);
      document.getElementById("frameworks")?.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* ============================================================
/* ============================================================
   ACTIVE NAV HIGHLIGHT
   ============================================================ */
function initActiveNav() {
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        document.querySelectorAll(".nav-link-item").forEach((link) => {
          link.style.color = link.getAttribute("href") === "#" + e.target.id ? "var(--primary)" : "";
        });
      }
    }),
    { threshold: 0.4, rootMargin: "-80px 0px 0px 0px" }
  );
  document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
}

/* ============================================================
/* ============================================================
   CURSOR
   ============================================================ */
function initCursor() {
  const dot = document.createElement("div");
  dot.style.cssText = "position:fixed;width:8px;height:8px;background:var(--primary);border-radius:50%;pointer-events:none;z-index:9998;transition:transform .1s ease;opacity:0;mix-blend-mode:difference;";
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
/* ============================================================
   INIT
   ============================================================ */

/* ============================================================
   CODE TYPEWRITER
   ============================================================ */
function initCodeTypewriter() {
  const block = document.getElementById('heroCodeBlock');
  if (!block) return;
  block.querySelectorAll('.code-line').forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(10px)';
    setTimeout(() => {
      line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, 800 + i * 150);
  });
}

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
    document.querySelectorAll("[data-aos]:not(.aos-animate)").forEach((el) => el.classList.add("aos-animate"));
  }, 2000);

  console.log("%c < Frontend Guide /> ","background:#e8ff47;color:#0d0d0d;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;");
  console.log("%c🌙 Press T for theme, 🌐 Press L for language, ⚡ Press F for frameworks","color:#e8ff47;font-family:monospace;font-size:11px;");
});