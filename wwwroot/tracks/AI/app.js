"use strict";

/* ============================================================
   TRANSLATIONS — Arabic & English
   ============================================================ */
const TRANSLATIONS = {
    ar: {
        "nav.what": "ما هو AI؟",
        "nav.fw": "الأدوات",
        "nav.cmp": "المقارنة",
        "nav.road": "ابدأ من هنا",
        "nav.badge": "دليلك",
        "hero.tag": "دليل المبتدئ في AI / ML",
        "hero.title1": "كل اللي محتاج",
        "hero.title2": "تعرفه عن",
        "hero.sub": "من أول سطر Python لغاية ما تبني نموذجك الأول — دليل واضح ومبسط بدون تعقيد.",
        "hero.cta1": "ابدأ الرحلة",
        "hero.cta2": "قارن الأدوات",
        "hero.scroll": "اسكرول للأسفل",
        "code.name": '"أنت"',
        "code.goal": '"تبني نماذج ذكاء اصطناعي"',
        "code.log": '"يلا نبدأ!"',
        "what.tag": "الأساسيات",
        "what.title": "إيه هو الـ AI والـ ML؟",
        "what.sub": "الـ Artificial Intelligence هو علم تعليم الآلات تفكر وتتخذ قرارات. الـ Machine Learning هو الفرع الأهم — بدل ما تبرمج القواعد يدوياً، بتديه بيانات يتعلم منها لوحده.",
        "what.analogy.title": "فكر في الأمر كده",
        "what.analogy.body": "بدل ما تعلم طفل قواعد التعرف على القطط بشكل صريح — بتديه <strong>آلاف صور قطط</strong> ويتعلم لوحده. الـ ML بيشتغل بنفس المبدأ — <strong>بيانات + خوارزمية = نموذج يتعلم</strong>.",
        "what.python": "اللغة الأساسية للـ AI. NumPy وPandas للبيانات، Matplotlib للـ Visualization — كلهم Python.",
        "what.math": "Linear Algebra للـ Matrices، Calculus للـ Gradients، الإحصاء للـ Distributions. مش محتاج PhD — محتاج الأساسيات.",
        "what.ml": "Classical ML أولاً — Regression، Classification، Clustering. بعدين Deep Learning — Neural Networks، CNNs، Transformers.",
        "fwintro.tag": "المفهوم",
        "fwintro.title": "إيه هو الـ Framework؟",
        "fwintro.sub1": "تخيل إنك بتبني نموذج AI من الصفر — هتحتاج تكتب كل العمليات الرياضية بإيدك.",
        "fwintro.sub2": "الـ <strong>Framework</strong> بيوفرلك كل ده جاهز — بتركز على الفكرة مش على التنفيذ الرياضي.",
        "fwintro.b1": "عمليات Matrix تشتغل على GPU تلقائياً",
        "fwintro.b2": "Backpropagation جاهزة ومحسّنة",
        "fwintro.b3": "Pre-trained Models جاهزة للاستخدام",
        "fwintro.b4": "Community ضخم يساعدك",
        "fw.tag": "الأدوات",
        "fw.title": "أشهر أدوات الـ AI بالتفصيل",
        "fw.sub": "اعرف كل أداة — مين صنعها، إيه استخدامها، وامتى تستخدمها.",
        "panel.creator": "المبتكر / الشركة",
        "panel.year": "سنة الإطلاق",
        "panel.type": "النوع",
        "panel.used": "مستخدم في",
        "panel.pros": "المميزات",
        "panel.cons": "العيوب",
        "panel.verdict": "الحكم النهائي",
        "cmp.tag": "المقارنة",
        "cmp.title": "مقارنة شاملة بين الأدوات",
        "cmp.sub": "جدول واضح يساعدك تشوف الفروق دفعة واحدة.",
        "cmp.criterion": "المعيار",
        "cmp.diff": "صعوبة البداية",
        "cmp.perf": "الأداء",
        "cmp.community": "الـ Community",
        "cmp.jobs": "فرص العمل",
        "cmp.for": "مناسب لـ",
        "l.easy": "سهل",
        "l.med": "متوسط",
        "l.hard": "صعب",
        "l.great": "ممتاز",
        "l.good": "كويس",
        "l.limited": "محدود",
        "quiz.tag": "اكتشف نفسك",
        "quiz.title": "أنهي أداة AI تناسبك؟",
        "quiz.sub": "جاوب على 3 أسئلة وهنقترح عليك الأنسب.",
        "quiz.step": "السؤال {n} من {total}",
        "quiz.result": "النتيجة",
        "quiz.rec": "الأداة الأنسب ليك هي",
        "quiz.restart": "جرب تاني",
        "q1.q": "إيه اللي بيثيرك أكتر في عالم الـ AI؟",
        "q1.o1": "أفهم إزاي الشبكات العصبية بتتعلم من الداخل",
        "q1.o2": "أبني تطبيق AI جاهز يستخدمه الناس",
        "q1.o3": "أحلل بيانات وأتوقع المستقبل بنماذج إحصائية",
        "q1.o4": "أبني AI يتكلم ويفهم اللغة الطبيعية",
        "q2.q": "إيه خلفيتك الحالية؟",
        "q2.o1": "مبتدئ — مش عارف Python كويس لسه",
        "q2.o2": "عارف Python وData Science",
        "q2.o3": "عارف ML وعايز أعمق في Deep Learning",
        "q2.o4": "عارف الأساسيات وعايز أبني تطبيقات LLM",
        "q3.q": "هدفك المهني في الـ AI إيه؟",
        "q3.o1": "ML Engineer — أبني وأنشر Models في Production",
        "q3.o2": "AI Researcher — أفهم وأطور Algorithms جديدة",
        "q3.o3": "AI Product Builder — أبني تطبيقات بالـ LLMs",
        "q3.o4": "Data Scientist — أستخدم ML في تحليل البيانات",
        "road.tag": "خارطة الطريق",
        "road.title": "من فين تبدأ؟",
        "road.sub": "الخطوات الصح، بالترتيب الصح.",
        "road.dur": "المدة",
        "r1.title": "Python والرياضيات الأساسية",
        "r1.desc": "مش محتاج PhD في رياضيات — بس محتاج تفهم Calculus الأساسي (derivatives)، Linear Algebra (matrices)، والإحصاء. 3Blue1Brown على يوتيوب هيعلمك الرياضيات بصرياً ومجاناً.",
        "r1.dur": "شهر",
        "r2.title": "Scikit-learn — الـ Classical ML الأول",
        "r2.desc": "اتعلم Linear Regression، Logistic Regression، Decision Trees، وRandom Forest. افهم إيه الـ Overfitting والـ Bias-Variance Tradeoff. اعمل مشاريع على Kaggle وبيانات حقيقية.",
        "r2.dur": "شهرين",
        "r3.title": "PyTorch — ادخل عالم Deep Learning",
        "r3.desc": "ابدأ بـ fast.ai course — من أحسن الكورسات المجانية. اتعلم Neural Networks، Backpropagation، وCNNs. اعمل Image Classifier بسيط.",
        "r3.dur": "شهرين",
        "r4.title": "NLP وHugging Face Transformers",
        "r4.desc": "اتعلم إيه الـ Attention Mechanism وإيه الـ Transformer Architecture. استخدم Hugging Face تحمّل Model جاهز وجربه على بياناتك.",
        "r4.dur": "شهرين",
        "r5.title": "LLMs وGenAI — الجيل الجديد",
        "r5.desc": "اتعلم Prompt Engineering. جرب Fine-tuning باستخدام PEFT وLoRA. ابني RAG System باستخدام LangChain.",
        "r5.dur": "شهرين",
        "r6.title": "MLOps — نشر الـ Models في Production",
        "r6.desc": "الـ Model اللي مش في Production هو مجرد experiment. اتعلم Docker، FastAPI، وMLflow لتتبع الـ experiments.",
        "r6.dur": "شهر",
        "footer.sub": "الذكاء الاصطناعي مش سحر — هو رياضيات وبيانات وصبر.",
        "footer.copy": "صُنع بـ",
        "footer.copy2": "لكل مبتدئ بيحلم يبني الـ AI",
    },

    en: {
        "nav.what": "What is AI?",
        "nav.fw": "Tools",
        "nav.cmp": "Comparison",
        "nav.road": "Start Here",
        "nav.badge": "Your Guide",
        "hero.tag": "Beginner's Guide to AI / ML",
        "hero.title1": "Everything you need",
        "hero.title2": "to know about",
        "hero.sub": "From your first line of Python to building your first model — a clear, beginner-friendly guide.",
        "hero.cta1": "Start the Journey",
        "hero.cta2": "Compare Tools",
        "hero.scroll": "Scroll Down",
        "code.name": '"You"',
        "code.goal": '"build AI models"',
        "code.log": '"Let\'s go!"',
        "what.tag": "The Basics",
        "what.title": "What is AI & ML?",
        "what.sub": "Artificial Intelligence is the science of teaching machines to think and make decisions. Machine Learning is its most important branch — instead of programming rules manually, you give it data and it learns on its own.",
        "what.analogy.title": "Think of it this way",
        "what.analogy.body": "Instead of teaching a child explicit rules about cats — you give it <strong>thousands of cat photos</strong> and it learns by itself. ML works the same way — <strong>data + algorithm = a model that learns</strong>.",
        "what.python": "The primary language for AI. NumPy and Pandas for data, Matplotlib for visualization — all Python.",
        "what.math": "Linear Algebra for matrices, Calculus for gradients, Statistics for distributions. No PhD needed — just the fundamentals.",
        "what.ml": "Classical ML first — Regression, Classification, Clustering. Then Deep Learning — Neural Networks, CNNs, Transformers.",
        "fwintro.tag": "The Concept",
        "fwintro.title": "What is a Framework?",
        "fwintro.sub1": "Imagine building an AI model from scratch — you'd have to write every mathematical operation by hand.",
        "fwintro.sub2": "A <strong>Framework</strong> provides all that pre-built — so you focus on the idea, not the math.",
        "fwintro.b1": "Matrix operations run on GPU automatically",
        "fwintro.b2": "Backpropagation built-in and optimized",
        "fwintro.b3": "Pre-trained models ready to use",
        "fwintro.b4": "Huge community to help you",
        "fw.tag": "Tools",
        "fw.title": "Most Popular AI Tools in Detail",
        "fw.sub": "Know each tool — who made it, what it's for, and when to use it.",
        "panel.creator": "Creator / Company",
        "panel.year": "Released",
        "panel.type": "Type",
        "panel.used": "Used By",
        "panel.pros": "Pros",
        "panel.cons": "Cons",
        "panel.verdict": "Final Verdict",
        "cmp.tag": "Comparison",
        "cmp.title": "Full Tool Comparison",
        "cmp.sub": "A clear table to see all differences at once.",
        "cmp.criterion": "Criterion",
        "cmp.diff": "Difficulty",
        "cmp.perf": "Performance",
        "cmp.community": "Community",
        "cmp.jobs": "Job Market",
        "cmp.for": "Best For",
        "l.easy": "Easy",
        "l.med": "Medium",
        "l.hard": "Hard",
        "l.great": "Excellent",
        "l.good": "Good",
        "l.limited": "Limited",
        "quiz.tag": "Discover Yourself",
        "quiz.title": "Which AI Tool Suits You?",
        "quiz.sub": "Answer 3 questions and we'll suggest the best fit.",
        "quiz.step": "Question {n} of {total}",
        "quiz.result": "Result",
        "quiz.rec": "Your best tool match is",
        "quiz.restart": "Try Again",
        "q1.q": "What excites you most about AI?",
        "q1.o1": "Understanding how neural networks actually learn",
        "q1.o2": "Building a real AI app for people to use",
        "q1.o3": "Analyzing data and predicting the future",
        "q1.o4": "Building AI that understands natural language",
        "q2.q": "What is your current background?",
        "q2.o1": "Beginner — don't know Python well yet",
        "q2.o2": "Know Python and some Data Science",
        "q2.o3": "Know ML and want to go deeper into Deep Learning",
        "q2.o4": "Know the basics and want to build LLM applications",
        "q3.q": "What is your career goal in AI?",
        "q3.o1": "ML Engineer — build and deploy models to Production",
        "q3.o2": "AI Researcher — understand and develop new algorithms",
        "q3.o3": "AI Product Builder — build apps powered by LLMs",
        "q3.o4": "Data Scientist — use ML for data analysis",
        "road.tag": "Roadmap",
        "road.title": "Where to Start?",
        "road.sub": "The right steps, in the right order.",
        "road.dur": "Duration",
        "r1.title": "Python & Core Mathematics",
        "r1.desc": "No PhD required — but you need basic Calculus (derivatives), Linear Algebra (matrices), and Statistics. 3Blue1Brown on YouTube teaches you math visually and for free.",
        "r1.dur": "1 month",
        "r2.title": "Scikit-learn — Classical ML First",
        "r2.desc": "Learn Linear Regression, Logistic Regression, Decision Trees, and Random Forest. Understand Overfitting and the Bias-Variance Tradeoff. Build projects on Kaggle with real data.",
        "r2.dur": "2 months",
        "r3.title": "PyTorch — Enter Deep Learning",
        "r3.desc": "Start with the fast.ai course — one of the best free courses available. Learn Neural Networks, Backpropagation, and CNNs. Build a simple Image Classifier.",
        "r3.dur": "2 months",
        "r4.title": "NLP & Hugging Face Transformers",
        "r4.desc": "Learn what Attention Mechanism and Transformer Architecture are. Use Hugging Face to load a pre-trained model and test it on your own data.",
        "r4.dur": "2 months",
        "r5.title": "LLMs & GenAI — The New Generation",
        "r5.desc": "Learn Prompt Engineering from scratch. Try Fine-tuning using PEFT and LoRA. Build a RAG System using LangChain.",
        "r5.dur": "2 months",
        "r6.title": "MLOps — Deploy Models to Production",
        "r6.desc": "A model not in production is just an experiment. Learn Docker, FastAPI, and MLflow for experiment tracking.",
        "r6.dur": "1 month",
        "footer.sub": "AI isn't magic — it's math, data, and patience.",
        "footer.copy": "Made with",
        "footer.copy2": "for every beginner who dreams of building AI",
    },
};

/* ============================================================
   FRAMEWORKS DATA (bilingual)
   ============================================================ */
const FRAMEWORKS = {
    pytorch: {
        name: "PyTorch",
        tagline: "The researcher's framework — dynamic, Pythonic, powerful",
        icon: '<i class="fa-solid fa-fire" style="color:#ee4c2c"></i>',
        iconColor: "#ee4c2c",
        desc: {
            ar: `PyTorch صنعته Meta سنة 2016 وغيّر عالم البحث في AI بالكامل. مكتوب بـ Python بشكل طبيعي — Dynamic Computation Graph يعني بتغير الـ model وأنت بتشغله. ده اللي بيخليه مفضل في الـ Research وفي الـ Academia.`,
            en: `PyTorch was created by Meta in 2016 and completely changed the world of AI research. It's written in natural Python — Dynamic Computation Graph means you can modify the model while it's running. This is what makes it the favorite in Research and Academia.`,
        },
        meta: { creator: "Meta AI Research", year: "2016", type: "Deep Learning Framework", used_by: "OpenAI, Tesla, Uber" },
        pros: {
            ar: ["Pythonic جداً — سهل في القراءة والـ Debugging", "Dynamic graphs — مرونة كاملة في بناء الـ Models", "الأكثر استخداماً في الـ Research Papers", "TorchServe للـ Deployment وTorchScript للـ Production"],
            en: ["Very Pythonic — easy to read and debug", "Dynamic graphs — full flexibility in model design", "Most used in Research Papers worldwide", "TorchServe for deployment and TorchScript for production"],
        },
        cons: {
            ar: ["أبطأ من TensorFlow في بعض حالات الـ Production", "Mobile deployment أصعب نسبياً"],
            en: ["Slower than TensorFlow in some production scenarios", "Mobile deployment is relatively harder"],
        },
        verdict: {
            ar: "ابدأ بيه لو مهتم بالـ Research أو Deep Learning. الـ Community ضخم والـ Documentation ممتازة. أفضل Framework للـ 2025.",
            en: "Start here if you're into Research or Deep Learning. Huge community, excellent documentation. Best framework for 2025.",
        },
    },
    tensorflow: {
        name: "TensorFlow",
        tagline: "Google's powerhouse for production ML",
        icon: '<i class="fa-solid fa-bolt" style="color:#ff6f00"></i>',
        iconColor: "#ff6f00",
        desc: {
            ar: `TensorFlow صنعته Google ونشرته سنة 2015. Keras بقى الـ High-Level API الرسمي بتاعه وخلاه أسهل بكتير. TensorFlow Lite للـ Mobile وTensorFlow.js للـ Browser. الأقوى في Production.`,
            en: `TensorFlow was made by Google and released in 2015. Keras became its official high-level API making it much easier. TensorFlow Lite for Mobile and TensorFlow.js for the browser. The strongest option for production.`,
        },
        meta: { creator: "Google Brain", year: "2015", type: "Deep Learning Framework", used_by: "Google, Airbnb, Dropbox" },
        pros: {
            ar: ["TensorFlow Serving — Deployment احترافي في Production", "TensorFlow Lite — بيشغّل الـ Models على Mobile", "TensorBoard — Visualization ممتازة للـ Training", "Keras API بسيطة جداً للمبتدئين"],
            en: ["TensorFlow Serving — professional production deployment", "TensorFlow Lite — runs models on Mobile", "TensorBoard — excellent training visualization", "Keras API is very beginner-friendly"],
        },
        cons: {
            ar: ["تغيير مستمر في الـ API بين الإصدارات", "Learning curve أصعب من PyTorch في البداية"],
            en: ["Frequent API changes between versions", "Learning curve steeper than PyTorch initially"],
        },
        verdict: {
            ar: "ممتاز للـ Production وللـ Mobile. لو بتشتغل مع Google Cloud أو محتاج TFLite — هو اختيارك.",
            en: "Excellent for Production and Mobile. If you work with Google Cloud or need TFLite — this is your choice.",
        },
    },
    sklearn: {
        name: "Scikit-learn",
        tagline: "The starting point for every ML engineer",
        icon: '<i class="fa-solid fa-gear" style="color:#f89406"></i>',
        iconColor: "#f89406",
        desc: {
            ar: `Scikit-learn هي نقطة البداية الحقيقية في Machine Learning. موجودة من 2007. بتيجيلك بكل الـ Algorithms الكلاسيكية جاهزة — Linear Regression, Random Forest, SVM, KMeans. واجهتها موحدة: fit(), predict(), score().`,
            en: `Scikit-learn is the real starting point for Machine Learning. Around since 2007. It comes with all classical algorithms ready — Linear Regression, Random Forest, SVM, KMeans. Unified interface: fit(), predict(), score().`,
        },
        meta: { creator: "David Cournapeau + INRIA", year: "2007", type: "Classical Machine Learning", used_by: "Netflix, Spotify, JP Morgan" },
        pros: {
            ar: ["API موحدة وبسيطة جداً — fit/predict/score", "كل الـ Classical ML Algorithms في مكان واحد", "Pipelines قوية للـ Preprocessing والـ Modeling", "Documentation من أحسن الـ Docs في الـ Python ecosystem"],
            en: ["Unified simple API — fit/predict/score", "All classical ML algorithms in one place", "Powerful pipelines for preprocessing and modeling", "Documentation is among the best in Python ecosystem"],
        },
        cons: {
            ar: ["مش مصممة للـ Deep Learning — استخدم PyTorch", "GPU Support معدومة تقريباً"],
            en: ["Not designed for Deep Learning — use PyTorch instead", "GPU support is practically absent"],
        },
        verdict: {
            ar: "أول حاجة تتعلمها في ML. قبل PyTorch وTensorFlow — اتعلم Scikit-learn وافهم الـ Fundamentals منها.",
            en: "The first thing to learn in ML. Before PyTorch and TensorFlow — learn Scikit-learn and understand the fundamentals.",
        },
    },
    huggingface: {
        name: "Hugging Face",
        tagline: "The GitHub of AI models — transformers made easy",
        icon: '<i class="fa-solid fa-face-smile" style="color:#ffd21e"></i>',
        iconColor: "#ffd21e",
        desc: {
            ar: `Hugging Face غيّرت AI بالكامل. فيه Hub بفيه مئات الآلاف من الـ Pre-trained Models جاهزة للاستخدام. Transformers library بتيجيلك بـ BERT، GPT، Llama، وكل LLM بكود بسيط.`,
            en: `Hugging Face transformed AI completely. It has a Hub with hundreds of thousands of pre-trained models ready to use. The Transformers library gives you BERT, GPT, Llama, and every LLM with simple code.`,
        },
        meta: { creator: "Clément Delangue & Julien Chaumond", year: "2016", type: "Model Hub & Transformers", used_by: "Google, Microsoft, Nvidia" },
        pros: {
            ar: ["Hub بمئات الآلاف من الـ Pre-trained Models مجاناً", "Transformers library — كل LLM بـ 3 سطور", "Datasets library — بيانات جاهزة لأي مجال", "Spaces — تشغّل المشاريع مجاناً على الإنترنت"],
            en: ["Hub with hundreds of thousands of free pre-trained models", "Transformers library — every LLM in 3 lines", "Datasets library — ready-made datasets for any domain", "Spaces — run projects for free online"],
        },
        cons: {
            ar: ["بعض الـ Models تحتاج GPU قوي تشغيلها", "Inference API المجاني محدود السرعة"],
            en: ["Some models require a powerful GPU to run", "Free Inference API has speed limitations"],
        },
        verdict: {
            ar: "ضروري جداً لأي شخص يشتغل في NLP أو LLMs. ابدأ بيه من أول مشروع بيستخدم Language Models.",
            en: "Essential for anyone working in NLP or LLMs. Start with it from your first Language Model project.",
        },
    },
    langchain: {
        name: "LangChain",
        tagline: "Build applications powered by language models",
        icon: '<i class="fa-solid fa-link" style="color:#74b9ff"></i>',
        iconColor: "#74b9ff",
        desc: {
            ar: `LangChain ظهر مع موجة الـ LLMs سنة 2022. فكرته الأساسية إنك بدل ما تتعامل مع الـ LLM مباشرة، بتبني حوله Chains وAgents قادرة تفكر وتتخذ قرارات. RAG هو اللي بيخلي الـ AI يقرأ ملفاتك ويجاوب منها.`,
            en: `LangChain appeared with the LLM wave in 2022. Its core idea is that instead of dealing with the LLM directly, you build Chains and Agents around it that can think and make decisions. RAG lets AI read your own files and answer from them.`,
        },
        meta: { creator: "Harrison Chase", year: "2022", type: "LLM Application Framework", alternatives: "LlamaIndex / Haystack / CrewAI" },
        pros: {
            ar: ["بيربط الـ LLM بـ Tools، Databases، وAPIs", "RAG — اعمل AI بيجاوب من بياناتك الخاصة", "Agents — AI بيتخذ قرارات ويشتغل أوتوماتيك", "يدعم كل الـ LLM Providers: OpenAI, Anthropic, Local"],
            en: ["Connects LLM to Tools, Databases, and APIs", "RAG — build AI that answers from your own data", "Agents — AI makes decisions and acts automatically", "Supports all LLM providers: OpenAI, Anthropic, Local"],
        },
        cons: {
            ar: ["Abstraction كتير — ممكن تتوه من الـ Internals", "تغيير مستمر في الـ API والـ Breaking changes"],
            en: ["Heavy abstraction — easy to lose track of internals", "Frequent API changes and breaking changes"],
        },
        verdict: {
            ar: "ممتاز لو بتبني تطبيق AI حقيقي — Chatbots، RAG Systems، أو AI Agents. ابدأ بيه بعد ما تفهم الـ LLMs الأول.",
            en: "Excellent for building real AI apps — Chatbots, RAG Systems, or AI Agents. Start with it after understanding LLMs.",
        },
    },
};

/* ============================================================
   QUIZ QUESTIONS (bilingual)
   ============================================================ */
const QUIZ_QUESTIONS_DATA = [
    {
        q: { ar: "q1.q", en: "q1.q" },
        options: [
            { ar: "q1.o1", en: "q1.o1", icon: "fa-solid fa-diagram-project", weight: { pytorch: 4, tensorflow: 2 } },
            { ar: "q1.o2", en: "q1.o2", icon: "fa-solid fa-app-store", weight: { huggingface: 3, langchain: 3, tensorflow: 1 } },
            { ar: "q1.o3", en: "q1.o3", icon: "fa-solid fa-chart-line", weight: { sklearn: 4, pytorch: 1 } },
            { ar: "q1.o4", en: "q1.o4", icon: "fa-solid fa-comment-dots", weight: { huggingface: 4, langchain: 2 } },
        ],
    },
    {
        q: { ar: "q2.q", en: "q2.q" },
        options: [
            { ar: "q2.o1", en: "q2.o1", icon: "fa-solid fa-user", weight: { sklearn: 5 } },
            { ar: "q2.o2", en: "q2.o2", icon: "fa-solid fa-chart-bar", weight: { sklearn: 2, pytorch: 2, huggingface: 2 } },
            { ar: "q2.o3", en: "q2.o3", icon: "fa-solid fa-layer-group", weight: { pytorch: 4, tensorflow: 2 } },
            { ar: "q2.o4", en: "q2.o4", icon: "fa-solid fa-robot", weight: { huggingface: 3, langchain: 4 } },
        ],
    },
    {
        q: { ar: "q3.q", en: "q3.q" },
        options: [
            { ar: "q3.o1", en: "q3.o1", icon: "fa-solid fa-cloud-arrow-up", weight: { pytorch: 3, tensorflow: 3, sklearn: 1 } },
            { ar: "q3.o2", en: "q3.o2", icon: "fa-solid fa-microscope", weight: { pytorch: 5 } },
            { ar: "q3.o3", en: "q3.o3", icon: "fa-solid fa-box", weight: { huggingface: 3, langchain: 4 } },
            { ar: "q3.o4", en: "q3.o4", icon: "fa-solid fa-database", weight: { sklearn: 4, pytorch: 1 } },
        ],
    },
];

/* ============================================================
   ROADMAP DATA (bilingual)
   ============================================================ */
const ROADMAP_KEYS = ["r1", "r2", "r3", "r4", "r5", "r6"];

/* ============================================================
   STATE
   ============================================================ */
let currentLang = localStorage.getItem("lang") || "ar";
let currentTheme = localStorage.getItem("theme") || "dark";
let quizAnswers = {};
let currentQuestion = 0;

function t(key) {
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS["ar"][key] || key;
}

/* ============================================================
   TRANSLATIONS APPLY
   ============================================================ */
function applyTranslations() {
    const isEn = currentLang === "en";
    document.documentElement.setAttribute("lang", isEn ? "en" : "ar");
    document.documentElement.setAttribute("dir", isEn ? "ltr" : "rtl");
    document.documentElement.setAttribute("data-lang", currentLang);

    const bsLink = document.querySelector('link[href*="bootstrap"]');
    if (bsLink) {
        bsLink.href = isEn
            ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css";
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const val = t(el.getAttribute("data-i18n"));
        if (val) el.innerHTML = val;
    });

    const langLabel = document.getElementById("langLabel");
    if (langLabel) langLabel.textContent = isEn ? "AR" : "EN";

    document.title = isEn
        ? "AI & Machine Learning — Beginner's Guide"
        : "AI & Machine Learning — دليل المبتدئين";
}

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const iconL = document.getElementById("iconLight");
    const iconD = document.getElementById("iconDark");
    if (iconL) iconL.style.display = theme === "dark" ? "inline" : "none";
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
   LANGUAGE TOGGLE
   ============================================================ */
function initLang() {
    applyTranslations();
    document.getElementById("langToggle")?.addEventListener("click", () => {
        currentLang = currentLang === "ar" ? "en" : "ar";
        localStorage.setItem("lang", currentLang);
        applyTranslations();
        renderFrameworkPanel(document.querySelector(".fw-tab.active")?.dataset.fw || "pytorch");
        renderQuizQuestion(currentQuestion);
        initRoadmap();
    });
}

/* ============================================================
   NAV
   ============================================================ */
function initNav() {
    const $ = (s) => document.querySelector(s);
    window.addEventListener("scroll", () => {
        $("#mainNav").classList.toggle("scrolled", window.scrollY > 60);
    });
    document.querySelectorAll(".nav-link-item, .btn-primary-custom, .btn-secondary-custom").forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href?.startsWith("#")) {
                e.preventDefault();
                $(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

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
   FRAMEWORK TABS
   ============================================================ */
function renderFrameworkPanel(key) {
    const fw = FRAMEWORKS[key];
    if (!fw) return;
    const lang = currentLang;
    const panel = document.getElementById("fwPanel");
    if (!panel) return;

    const metaValues = Object.values(fw.meta);
    const metaLabels = [t("panel.creator"), t("panel.year"), t("panel.type"), t("panel.used")];

    panel.innerHTML = `
    <div class="fw-panel-inner">
      <div class="fw-panel-main">
        <div class="fw-panel-header">
          <div class="fw-panel-icon">${fw.icon}</div>
          <div>
            <div class="fw-panel-name">${fw.name}</div>
            <div class="fw-panel-tagline">${fw.tagline}</div>
          </div>
        </div>
        <p class="fw-panel-desc">${fw.desc[lang]}</p>
        <div class="fw-meta-grid">
          ${metaLabels.map((label, i) => `
            <div class="fw-meta-item">
              <div class="fw-meta-label">${label}</div>
              <div class="fw-meta-value">${metaValues[i]}</div>
            </div>`).join("")}
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
    renderFrameworkPanel("pytorch");
    document.querySelectorAll("#fwTabs .fw-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
            document.querySelectorAll("#fwTabs .fw-tab").forEach((t) => t.classList.remove("active"));
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
   QUIZ
   ============================================================ */
function calcResult() {
    const scores = { pytorch: 0, tensorflow: 0, sklearn: 0, huggingface: 0, langchain: 0 };
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
          <span class="quiz-option-icon"><i class="${opt.icon}" style="opacity:0.8"></i></span>
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

/* ============================================================
   ROADMAP
   ============================================================ */
function initRoadmap() {
    const tl = document.getElementById("roadmapTimeline");
    if (!tl) return;
    tl.innerHTML = ROADMAP_KEYS.map((key, i) => `
    <div class="roadmap-item" data-aos="fade-right" data-aos-delay="${i * 80}">
      <div class="roadmap-dot"></div>
      <div class="roadmap-content">
        <div class="roadmap-step-tag">Step 0${i + 1}</div>
        <div class="roadmap-title">${t(key + ".title")}</div>
        <div class="roadmap-desc">${t(key + ".desc")}</div>
        <div class="roadmap-duration">
          <i class="fa-regular fa-clock"></i>
          <span>${t(key + ".dur")}</span>
        </div>
      </div>
    </div>
  `).join("");
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
   KEYBOARD
   ============================================================ */
function initKeyboardShortcuts() {
    const keys = Object.keys(FRAMEWORKS);
    let idx = 0;
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "a" && e.target.tagName !== "INPUT") {
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
   ACTIVE NAV
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
   CURSOR
   ============================================================ */
function initCursor() {
    const dot = document.createElement("div");
    dot.style.cssText = "position:fixed;width:8px;height:8px;background:var(--primary);border-radius:50%;pointer-events:none;z-index:9998;transition:transform .1s ease;opacity:0;mix-blend-mode:difference;";
    document.body.appendChild(dot);
    document.addEventListener("mousemove", (e) => {
        dot.style.opacity = "1";
        dot.style.left = e.clientX - 4 + "px";
        dot.style.top = e.clientY - 4 + "px";
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

    console.log("%c AI / ML Guide ", "background:#2F6FED;color:#fff;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;");
    console.log("%cPress A to cycle tools | T for theme | L for language", "color:#2F6FED;font-family:monospace;font-size:11px;");
});