"use strict";

/* ============================================================
   TRACKS CONFIG — 11 tracks
   ============================================================ */
const TRACKS = {
  frontend:  {
    id:"frontend",  label:"Frontend",   page:"../Frontend/frontend.html",    icon:"bi-palette-fill",   color:"#e8ff47",
    desc:"أنت إنسان مبدع وحساس للجمال، بتلاحظ أدق التفاصيل اللي غيرك مش بيشوفها. بتحب لما شغلك يظهر قدامك مباشرة ويأثر في الناس. تخيلك البصري وذوقك الرفيع هما سلاحك.",
    traits:["حساس للتفاصيل البصرية","ذوق تصميمي رفيع","بتحب النتيجة الفورية","مبدع وعنده رؤية"],
  },
  backend:   {
    id:"backend",   label:"Backend",        icon:"bi-server",         color:"#00e5ff",
    desc:"عقلك منطقي وهادئ، بتحب تفهم كيف الأشياء شغالة من الجوه مش من البره. الغموض بالنسبالك تحدي مش عائق. بتبني حلول قوية حتى لو ما حدش شايفها.",
    traits:["منطقي وتحليلي","بيحب يفهم السيستم","صبور على المشاكل","بيبني أشياء قوية"],
  },
  
  ai:        {
    id:"ai",        label:"AI / ML",        icon:"bi-robot",          color:"#ff6b6b",
    desc:"فضولك لا حدود له. الرياضيات والأنماط بتجذبك. بتحب تشوف الجهاز يتعلم ويتطور زيك. التجارب الفاشلة عندك مش فشل — هي بيانات.",
    traits:["فضولي جداً","بيحب الرياضيات","صبور على التجارب","بيبحث عن الأنماط"],
  },
  data:      {
    id:"data",      label:"Data Science",   icon:"bi-bar-chart-fill", color:"#ffd93d",
    desc:"الأرقام بتتكلم معاك. بتحب تحط كل حاجة في جدول أو رسمة بيانية وتشوف الحقيقة وراء الأرقام. منظم ودقيق ومش بتقبل تخمين من غير دليل.",
    traits:["بيحب الأرقام والبيانات","منظم ومرتب","بيعرف يحكي بالبيانات","تحليلي وعميق"],
  },
  mobile:    {
    id:"mobile",    label:"Mobile Dev",     icon:"bi-phone-fill",     color:"#c77dff",
    desc:"أنت عملي وبتفكر في الناس. بتحب لما المنتج بيكون في إيدك حرفياً. تجربة المستخدم ليها أولوية عندك — بتفكر إزاي الناس هتستخدم الحاجة دي في الحياة الحقيقية.",
    traits:["بيحب الحاجة الملموسة","مهتم بالمستخدم","عملي وهادف","ذوق في UX"],
  },
  devops:    {
    id:"devops",    label:"DevOps",         icon:"bi-gear-wide-connected", color:"#ff9f43",
    desc:"الفوضى بتضايقك. بتحب لما كل حاجة تشتغل لوحدها من غير ما حد يلمسها. الأتمتة ليها مكانة خاصة عندك، وبتكره تعمل نفس الحاجة أكتر من مرة.",
    traits:["بيحب الأتمتة","بيكره التكرار","منظم ومحكم","بيحب الأنظمة"],
  },
  cyber:     {
    id:"cyber",     label:"Cyber Security", icon:"bi-shield-lock-fill", color:"#ee5a24",
    desc:"أنت شكّاك بطبعك — وده ميزة مش عيب. بتشوف الثغرة اللي غيرك مش واخد باله. عقلك زي المحقق — بيفكر في كيف الحاجة ممكن تتكسر قبل ما تثق فيها.",
    traits:["عقلية محقق","بيحب يكتشف الثغرات","شكاك وحذر","بيحب التحدي"],
  },
  gamedev:   {
    id:"gamedev",   label:"Game Dev",       icon:"bi-controller",     color:"#0abde3",
    desc:"خيالك واسع وبتحب تبني عوالم كاملة من الصفر. القصص والتجارب بتحركك. صبور على التفاصيل الصغيرة لأنك بتعرف إنها بتفرق في التجربة الكاملة.",
    traits:["خيال واسع","بيحب القصص","مبدع في البناء","صبور على التفاصيل"],
  },
  embedded:  {
    id:"embedded",  label:"Embedded",       icon:"bi-cpu",            color:"#badc58",
    desc:"أنت من النوع اللي مش بيكتفي بالشاشة — عايز يشوف الكود يتحرك في الواقع. الهاردوير والسوفتوير مع بعض ده بيتاعك. بتحب الأشياء الملموسة والدقيقة.",
    traits:["بيحب الهاردوير","عملي جداً","دقيق في الأداء","بيحب الأجهزة الحقيقية"],
  },
  testing:   {
    id:"testing",   label:"Testing/QA",     icon:"bi-bug-fill",       color:"#fd79a8",
    desc:"أنت دقيق بطبعك، ومش بتمر على حاجة من غير ما تتأكد إنها صح. بتلاقي الأخطاء اللي غيرك مش بيشوفها. الجودة بالنسبالك مش خطوة — هي أسلوب تفكير.",
    traits:["دقيق وملاحظ","بيحب يكتشف الأخطاء","صبور وركّز","بيحب الجودة"],
  },
};

/* ============================================================
   50 QUESTIONS
   each option: { text, tracks: ["id", ...] }  → +1 per track listed
   ============================================================ */
const QUESTIONS = [
  // ═══════════════════════════ BLOCK 1: أسلوب التفكير ═══════════════════════════
  {
    category: "أسلوب تفكيرك",
    text: "لما بتواجه مشكلة جديدة في حياتك، أول حاجة بتعملها إيه؟",
    options: [
      { text: "بفكر في أجمل طريقة أقدمها بيها",              tracks: ["frontend","gamedev","mobile"] },
      { text: "بحلل المشكلة من الجذر وبدور على السبب الحقيقي", tracks: ["backend","cyber","embedded"] },
      { text: "بحط الموضوع في جدول أو خطوات منظمة",          tracks: ["data","devops","testing"] },
      { text: "بجرب حاجات كتير وبشوف النتيجة",               tracks: ["ai","backend","gamedev"] },
    ],
  },
  {
    category: "أسلوب تفكيرك",
    text: "أنت في مكان جديد — أول حاجة بتلاحظها إيه؟",
    options: [
      { text: "الألوان والتصميم والترتيب الجمالي",            tracks: ["frontend","gamedev"] },
      { text: "كيف المكان ده شغال من جوه وليه اتبنى كده",    tracks: ["backend","embedded","devops"] },
      { text: "الناس وسلوكهم وطريقة تفاعلهم مع المكان",      tracks: ["mobile","backend","data"] },
      { text: "الأنماط والتكرارات اللي ما حدش بيلاحظها",      tracks: ["ai","data","cyber","testing"] },
    ],
  },
  {
    category: "أسلوب تفكيرك",
    text: "لما بتتعلم حاجة جديدة، بتفضل إيه؟",
    options: [
      { text: "أشوفها مرسومة أو مصورة بصرياً",               tracks: ["frontend","data","gamedev"] },
      { text: "أفهم النظرية والمبادئ الأساسية الأول",         tracks: ["backend","ai","embedded"] },
      { text: "أجرب بإيدي من أول ما أسمع عنها",              tracks: ["backend","devops","mobile"] },
      { text: "أقرا الـ docs بالتفصيل وأتأكد من كل حاجة",    tracks: ["cyber","testing","data"] },
    ],
  },
  {
    category: "أسلوب تفكيرك",
    text: "إيه اللي بيخليك تحس إن يومك كان ناجح؟",
    options: [
      { text: "لما شفت حاجة جميلة بنيتها بإيدي",             tracks: ["frontend","gamedev","embedded"] },
      { text: "لما حليت مشكلة كانت صعبة ومعقدة",             tracks: ["backend","cyber","ai"] },
      { text: "لما كل حاجة اشتغلت لوحدها من غير تدخل",       tracks: ["devops","backend"] },
      { text: "لما لقيت خطأ قبل ما حد تاني يلاقيه",          tracks: ["testing","cyber","data"] },
    ],
  },
  {
    category: "أسلوب تفكيرك",
    text: "لو اتعطلت حاجة — ساعة — كيف ردة فعلك الأولى؟",
    options: [
      { text: "بزعل بس بحاول أصلح الشكل بسرعة",              tracks: ["frontend","mobile"] },
      { text: "بفرح لأن فيه مشكلة أكتشف سببها",              tracks: ["backend","cyber","embedded"] },
      { text: "بجمع الـ Logs وبحلل البيانات الأول",           tracks: ["data","ai","testing","devops"] },
      { text: "بعمل rollback وبفكر في الـ process اللي فشل",  tracks: ["devops","testing","backend"] },
    ],
  },

  // ═══════════════════════════ BLOCK 2: الشخصية ═══════════════════════════
  {
    category: "شخصيتك",
    text: "صاحبك بيوصفك بإيه أكتر من غيره؟",
    options: [
      { text: "مبدع وعنده ذوق رفيع في كل حاجة",              tracks: ["frontend","gamedev"] },
      { text: "منطقي وهادئ وبيحل المشاكل بعقل بارد",         tracks: ["backend","embedded","data"] },
      { text: "فضولي ودايماً سايل أسئلة ومش مصدّق",          tracks: ["ai","cyber","testing"] },
      { text: "عملي ومنظم وبينجز الحاجات",                    tracks: ["devops","mobile","backend"] },
    ],
  },
  {
    category: "شخصيتك",
    text: "في الشغل الجماعي، بتلعب أنهي دور عادةً؟",
    options: [
      { text: "اللي بيعمل الحاجات تبان حلوة وتتقدم صح",      tracks: ["frontend","mobile","gamedev"] },
      { text: "اللي بيحل المشاكل التقنية الصعبة من الأساس",  tracks: ["backend","embedded","cyber"] },
      { text: "اللي بيربط الأجزاء مع بعض ويضمن الجودة",      tracks: ["backend","testing","devops"] },
      { text: "اللي بيسأل أسئلة ما حدش فكر فيها",            tracks: ["ai","cyber","data","testing"] },
    ],
  },
  {
    category: "شخصيتك",
    text: "إيه اللي بيضايقك أكتر في أي مشروع؟",
    options: [
      { text: "لما التصميم وحش أو الـ UX مش مريح",            tracks: ["frontend","gamedev","mobile"] },
      { text: "لما في bug مش واضح وما حدش يعرف سببه",         tracks: ["backend","embedded","ai"] },
      { text: "لما في فوضى وما فيش نظام أو process واضحة",    tracks: ["devops","data","testing"] },
      { text: "لما حاجة بتشتغل ومحدش يعرف ليه!",             tracks: ["cyber","backend","testing"] },
    ],
  },
  {
    category: "شخصيتك",
    text: "بتتمتع بإيه في وقت فراغك؟",
    options: [
      { text: "حاجات إبداعية — رسم أو موسيقى أو تصوير",       tracks: ["frontend","gamedev"] },
      { text: "ألغاز وأحاجي وألعاب تحتاج تفكير",              tracks: ["backend","cyber","ai","embedded"] },
      { text: "تحليل بيانات أو قراءة إحصاءات وأرقام",         tracks: ["data","ai"] },
      { text: "بناء أو تصليح أجهزة أو تنظيم حاجات",           tracks: ["embedded","devops","testing"] },
    ],
  },
  {
    category: "شخصيتك",
    text: "لما بتشتغل على حاجة، بتركز على إيه أكتر؟",
    options: [
      { text: "إن الحاجة تبقى جميلة ومريحة في الاستخدام",     tracks: ["frontend","gamedev","mobile"] },
      { text: "إن الحاجة تشتغل صح بدون أي أخطاء",            tracks: ["backend","embedded","cyber"] },
      { text: "إن كل خطوة موثقة وقابلة للتكرار",              tracks: ["devops","testing","data"] },
      { text: "إن التجربة دي تعلمني pattern جديد",             tracks: ["ai","backend","data"] },
    ],
  },

  // ═══════════════════════════ BLOCK 3: التفضيلات ═══════════════════════════
  {
    category: "تفضيلاتك",
    text: "لو اخترت لعبة، هتختار إيه؟",
    options: [
      { text: "لعبة بناء وتصميم (Minecraft, Sims, Cities)",   tracks: ["frontend","gamedev","embedded"] },
      { text: "لعبة استراتيجية وتخطيط (Chess, Civilization)", tracks: ["backend","devops","data"] },
      { text: "لعبة مغامرة وقصة وعوالم (RPG, Witcher)",       tracks: ["gamedev","ai","backend"] },
      { text: "لعبة تحديات وألغاز (Portal, Witness, Myst)",   tracks: ["cyber","ai","testing"] },
    ],
  },
  {
    category: "تفضيلاتك",
    text: "لو اشتريت جهاز جديد، أول حاجة بتعملها إيه؟",
    options: [
      { text: "بغير الشكل والـ wallpaper والـ theme",          tracks: ["frontend","mobile"] },
      { text: "بقرا كل المواصفات التقنية والـ internals",      tracks: ["embedded","backend","cyber"] },
      { text: "بنظم التطبيقات وبعمل folders وأوتوماشن",       tracks: ["devops","data","backend"] },
      { text: "بجرب كل الإعدادات وبشوف لو في حاجة غريبة",    tracks: ["testing","cyber","backend"] },
    ],
  },
  {
    category: "تفضيلاتك",
    text: "أنهي نوع من المحتوى بيشدك أكتر؟",
    options: [
      { text: "تصميم، فن، UX، وجماليات",                      tracks: ["frontend","gamedev"] },
      { text: "أمن معلومات، هاكينج، وتكنولوجيا",              tracks: ["cyber","backend","embedded"] },
      { text: "إحصاء، بيانات، وتقارير ونتائج",                tracks: ["data","ai","testing"] },
      { text: "قصص ومغامرات وبناء أنظمة من الصفر",           tracks: ["gamedev","ai","mobile"] },
    ],
  },
  {
    category: "تفضيلاتك",
    text: "في يوم عطلة مثالي، أنت بتعمل إيه؟",
    options: [
      { text: "بعمل حاجة إبداعية من الصفر",                   tracks: ["frontend","gamedev","embedded"] },
      { text: "بحل مسألة أو بتعلم موضوع جديد",                tracks: ["ai","backend","data"] },
      { text: "بنظم حاجات متراكمة وبخلي كل حاجة تشتغل",      tracks: ["devops","testing","backend"] },
      { text: "بلعب وبجرب تجارب جديدة وبكسّر الحاجات",       tracks: ["gamedev","mobile","cyber","testing"] },
    ],
  },
  {
    category: "تفضيلاتك",
    text: "أي جملة بتوصف علاقتك بالـ Internet أكتر؟",
    options: [
      { text: "بلاحظ كل موقع ليه تصميم حلو أو وحش",           tracks: ["frontend","mobile"] },
      { text: "بتساءل السيرفر بيتعامل مع الـ requests إزاي",  tracks: ["backend","devops","cyber"] },
      { text: "بحلل ترندات ومش بيفوتني رقم أو إحصاء",        tracks: ["data","ai"] },
      { text: "بدور على الأشياء الغريبة والثغرات المحتملة",   tracks: ["cyber","testing","ai"] },
    ],
  },

  // ═══════════════════════════ BLOCK 4: المواقف ═══════════════════════════
  {
    category: "مواقفك",
    text: "لما تشتري حاجة جديدة، بتاخد قرارك إزاي؟",
    options: [
      { text: "بشوف الشكل والـ design والتصميم الأول",         tracks: ["frontend","mobile","gamedev"] },
      { text: "بقارن المواصفات التقنية بالتفصيل",              tracks: ["backend","embedded","data"] },
      { text: "بقرا الـ reviews وبحلل الشكاوى والمشاكل",      tracks: ["testing","data","cyber"] },
      { text: "بجرب وبشتري وبكمل من غير تفكير كتير",          tracks: ["backend","devops","mobile"] },
    ],
  },
  {
    category: "مواقفك",
    text: "إيه اللي بتتجنبه في الحياة؟",
    options: [
      { text: "الأشياء القبيحة أو الغير منسقة بصرياً",        tracks: ["frontend","mobile","gamedev"] },
      { text: "الغموض وعدم فهم حاجة من جوها",                 tracks: ["backend","embedded","ai"] },
      { text: "الفوضى والعشوائية وغياب الـ process",           tracks: ["devops","testing","data"] },
      { text: "إن حاجة تشتغل من غير ما أعرف السبب",           tracks: ["cyber","backend","testing"] },
    ],
  },
  {
    category: "مواقفك",
    text: "لو لقيت باب مقفول، ردة فعلك إيه؟",
    options: [
      { text: "بدور على طريقة تانية أجمل وأسهل",              tracks: ["frontend","gamedev"] },
      { text: "بحاول أفهم ليه متقفل أصلاً وما الغرض",        tracks: ["backend","cyber","embedded"] },
      { text: "بدور على المفتاح بشكل منهجي وأجرب كل الخيارات", tracks: ["testing","devops","data"] },
      { text: "بجرب أفتحه بأكتر من طريقة وأكسّره لو لزم",     tracks: ["cyber","ai","embedded"] },
    ],
  },
  {
    category: "مواقفك",
    text: "لما بيعملوا فيلم عنك، هتكون في أنهي دور؟",
    options: [
      { text: "المصمم اللي بيعمل حاجات جميلة تغير العالم",    tracks: ["frontend","gamedev","mobile"] },
      { text: "المهندس اللي بيبني الأساس من الصفر",           tracks: ["backend","embedded","devops"] },
      { text: "المحقق اللي بيكتشف الأسرار والثغرات",         tracks: ["cyber","testing","ai"] },
      { text: "العالِم اللي بيحلل البيانات ويتوقع المستقبل",  tracks: ["ai","data"] },
    ],
  },
  {
    category: "مواقفك",
    text: "قبل ما تنام، التفكير اللي بيجي ببالك عادةً بيكون؟",
    options: [
      { text: "أفكار إبداعية جديدة وحلول جمالية",             tracks: ["frontend","gamedev"] },
      { text: "مشكلة تقنية محتاج أفهمها أو أحلها",           tracks: ["backend","cyber","ai","embedded"] },
      { text: "إزاي أنظم شغلي أحسن وأأتمت حاجات",            tracks: ["devops","testing","data"] },
      { text: "سيناريوهات ممكن تتغلط في الـ production",       tracks: ["testing","cyber","devops"] },
    ],
  },

  // ═══════════════════════════ BLOCK 5: أسلوب العمل ═══════════════════════════
  {
    category: "أسلوب عملك",
    text: "لو في مشروع كبير، إيه أول حاجة بتعملها؟",
    options: [
      { text: "بعمل wireframe أو sketch للشكل النهائي",        tracks: ["frontend","gamedev","mobile"] },
      { text: "بكتب architecture وبحدد الـ structure والـ DB", tracks: ["backend","devops","embedded"] },
      { text: "بجمع البيانات وبحلل المتطلبات والـ use cases",  tracks: ["data","ai","backend"] },
      { text: "بعمل test plan وبحدد السيناريوهات المحتملة",    tracks: ["testing","cyber","devops"] },
    ],
  },
  {
    category: "أسلوب عملك",
    text: "إيه الحاجة اللي بتخليك تكمل في مشروع صعب؟",
    options: [
      { text: "لما بشوف الشكل النهائي بيتحسن شوية شوية",       tracks: ["frontend","gamedev","mobile"] },
      { text: "لما حلقة التحدي والحل بتعجبني وبتعلمني",        tracks: ["backend","embedded","cyber"] },
      { text: "لما بشوف أرقام بتتحسن ونتائج بتتحقق",          tracks: ["data","ai","testing"] },
      { text: "لما بتخيل التطبيق شغال بدون تدخل مني",          tracks: ["devops","backend","embedded"] },
    ],
  },
  {
    category: "أسلوب عملك",
    text: "بتشتغل أحسن لما؟",
    options: [
      { text: "عندي حرية إبداعية كاملة في الشكل",              tracks: ["frontend","gamedev","ai"] },
      { text: "عندي مشكلة محددة وواضحة أحلها",                 tracks: ["backend","embedded","cyber"] },
      { text: "عندي خطة واضحة وبيئة منظمة ومستقرة",            tracks: ["devops","testing","data"] },
      { text: "عندي بيانات كتيرة وقدرة على التجريب",           tracks: ["data","ai","backend"] },
    ],
  },
  {
    category: "أسلوب عملك",
    text: "لو حاجة اتعطلت وما قدرتش تصلحها في ساعتين؟",
    options: [
      { text: "بعمل حل مؤقت يشتغل ويبقى شكله مقبول",          tracks: ["frontend","mobile","backend"] },
      { text: "بكمل أحفر وأبحث لحد ما ألاقي السبب الحقيقي",   tracks: ["backend","embedded","cyber"] },
      { text: "بجمع الـ logs والبيانات وبحللها بشكل منهجي",    tracks: ["data","ai","testing","devops"] },
      { text: "بعمل rollback وبفتح incident report منظم",       tracks: ["devops","testing","backend"] },
    ],
  },
  {
    category: "أسلوب عملك",
    text: "الـ feedback الأحسن بالنسبالك بيجيلك إزاي؟",
    options: [
      { text: "لما حد يقولي 'ده جميل جداً وتجربته ممتازة'",    tracks: ["frontend","gamedev","mobile"] },
      { text: "لما حاجة بنيتها بتحل مشكلة ناس كتير",          tracks: ["backend","backend","embedded"] },
      { text: "لما شوف رقم تحسّن أو metric اتحسن بشكل واضح",   tracks: ["data","ai","devops","testing"] },
      { text: "لما أكتشف ثغرة أو مشكلة قبل ما حد تاني يشوفها", tracks: ["cyber","testing","ai"] },
    ],
  },

  // ═══════════════════════════ BLOCK 6: القيم ═══════════════════════════
  {
    category: "قيمك",
    text: "إيه الأهم ليك في أي مشروع تشتغل عليه؟",
    options: [
      { text: "إن الناس تحبه وتحس بجماله وسهولته",            tracks: ["frontend","gamedev","mobile"] },
      { text: "إنه يشتغل بدون أخطاء وبأداء عالي",             tracks: ["backend","embedded","devops"] },
      { text: "إن قراراته مبنية على بيانات حقيقية",            tracks: ["data","ai","testing"] },
      { text: "إنه آمن ومفيش ثغرات ممكن تتاستغل",             tracks: ["cyber","devops","testing"] },
    ],
  },
  {
    category: "قيمك",
    text: "إيه اللي بيعنيك أكتر في حياتك المهنية؟",
    options: [
      { text: "إن شغلي يبان ويأثر في تجربة الناس مباشرة",     tracks: ["frontend","mobile","gamedev"] },
      { text: "إني دايماً أحل مشاكل أعقد وأتعلم أكتر",        tracks: ["backend","ai","embedded"] },
      { text: "إن كل حاجة تشتغل بأقل جهد وأقصر وقت",         tracks: ["devops","backend","data"] },
      { text: "إن الكود والسيستم موثوق وما فيهوش أخطاء",      tracks: ["testing","cyber","backend"] },
    ],
  },
  {
    category: "قيمك",
    text: "لو قدرت تغير حاجة واحدة في العالم بالتكنولوجيا، هتغير إيه؟",
    options: [
      { text: "أخلي كل التطبيقات أجمل وأسهل في الاستخدام",    tracks: ["frontend","mobile","gamedev"] },
      { text: "أخلي الأنظمة أسرع وأقوى وأموثوق",              tracks: ["backend","embedded","devops"] },
      { text: "أخلي قرارات الناس مبنية على بيانات صح",        tracks: ["data","ai"] },
      { text: "أخلي الإنترنت أكتر أماناً وخصوصية",            tracks: ["cyber","devops","testing"] },
    ],
  },
  {
    category: "قيمك",
    text: "إيه اللي بيحفزك تتعلم تكنولوجيا جديدة؟",
    options: [
      { text: "لما بتخيل حاجة جميلة هعملها بيها",              tracks: ["frontend","gamedev","mobile"] },
      { text: "لما تقدر تحل مشكلة كانت معقدة قبل كده",         tracks: ["backend","embedded","cyber"] },
      { text: "لما تكون أداة قوية في التحليل أو الأتمتة",      tracks: ["data","devops","ai"] },
      { text: "لما أشوف إنها بتقلل الأخطاء وبتحسّن الجودة",    tracks: ["testing","devops","backend"] },
    ],
  },
  {
    category: "قيمك",
    text: "إيه مفهوم 'النجاح' عندك في الشغل؟",
    options: [
      { text: "مستخدم سعيد ومنتج جميل وسهل",                   tracks: ["frontend","mobile","gamedev"] },
      { text: "نظام يشتغل بدون downtime من غير تدخل",          tracks: ["devops","backend","embedded"] },
      { text: "قرار صح مبني على أدلة وبيانات حقيقية",         tracks: ["data","ai","testing"] },
      { text: "كود نظيف بدون ثغرات وبدون bugs",                tracks: ["testing","cyber","backend"] },
    ],
  },

  // ═══════════════════════════ BLOCK 7: مواقف حياتية ═══════════════════════════
  {
    category: "مواقف حياتية",
    text: "في السوبرماركت، بتختار المنتج إزاي؟",
    options: [
      { text: "بشوف العبوة والشكل والـ design الأحسن",         tracks: ["frontend","mobile"] },
      { text: "بقرا المكونات والتفاصيل الغامضة في الـ label",  tracks: ["backend","embedded","testing"] },
      { text: "بقارن الأسعار والقيمة وبختار الأوفر",          tracks: ["data","devops","backend"] },
      { text: "بدور على أي حاجة غريبة أو مش طبيعية في المحتوى", tracks: ["cyber","testing","ai"] },
    ],
  },
  {
    category: "مواقف حياتية",
    text: "لما بتسافر لمكان جديد، بتخطط إزاي؟",
    options: [
      { text: "بدور على الأماكن الجميلة والـ Instagrammable",  tracks: ["frontend","gamedev","mobile"] },
      { text: "بقرا عن التاريخ والثقافة والتفاصيل من الجذر",  tracks: ["backend","data","ai"] },
      { text: "بعمل جدول مفصل بالأوقات والأماكن والـ backup",  tracks: ["devops","testing","data"] },
      { text: "بمشي من غير خطة وبشوف إيه اللي بيحصل",         tracks: ["backend","cyber","gamedev"] },
    ],
  },
  {
    category: "مواقف حياتية",
    text: "غرفتك أو مكتبك بيكون عادةً إزاي؟",
    options: [
      { text: "منظم بجمال — كل حاجة في مكانها وليها ستايل",   tracks: ["frontend","mobile"] },
      { text: "مرتب وظيفياً — كل حاجة في مكانها للوصول السريع", tracks: ["devops","testing","data"] },
      { text: "فوضى منظمة — أنا عارف كل حاجة فين",            tracks: ["cyber","ai","embedded"] },
      { text: "مليان أدوات وأجهزة وكتب وكابلات متناثرة",      tracks: ["embedded","gamedev","backend"] },
    ],
  },
  {
    category: "مواقف حياتية",
    text: "لما بتتعلم تركيب جهاز جديد، بتعمل إيه؟",
    options: [
      { text: "بتبع الـ manual خطوة بخطوة بدون اختصار",        tracks: ["testing","data","devops"] },
      { text: "بجرب لوحدي وبرجع للـ manual لو اتعطلت",        tracks: ["backend","cyber","embedded"] },
      { text: "بشوف فيديو على يوتيوب ومش بقرا",                tracks: ["frontend","mobile","gamedev"] },
      { text: "بفك كل حاجة وأفهم كيف بتشتغل من الجوه",        tracks: ["embedded","cyber","backend"] },
    ],
  },
  {
    category: "مواقف حياتية",
    text: "لو سألتك 'الرياضيات' — إيه أول كلمة بتيجي ببالك؟",
    options: [
      { text: "ممتعة ومثيرة وأحبها",                           tracks: ["ai","data","embedded"] },
      { text: "أداة أستخدمها لحل مشاكل عملية",                tracks: ["backend","devops","cyber"] },
      { text: "ضرورية بس مش من المفضلين عندي",                 tracks: ["frontend","mobile","gamedev"] },
      { text: "صعبة بس بستمتع بتحدياتها",                      tracks: ["ai","data","testing"] },
    ],
  },

  // ═══════════════════════════ BLOCK 8: الاجتماعي ═══════════════════════════
  {
    category: "طبيعتك الاجتماعية",
    text: "في اجتماع، أنت بتكون إيه؟",
    options: [
      { text: "اللي بيشرح الأفكار بطريقة واضحة وجميلة",        tracks: ["frontend","mobile","data"] },
      { text: "اللي بيسأل الأسئلة الصعبة والمزعجة",           tracks: ["backend","cyber","testing"] },
      { text: "اللي بيحوّل الكلام لخطوات عملية وقابلة للتطبيق", tracks: ["devops","backend","embedded"] },
      { text: "بسمع وبفكر وبقول حاجة في الآخر تغير الاجتماع", tracks: ["ai","data","cyber"] },
    ],
  },
  {
    category: "طبيعتك الاجتماعية",
    text: "لو شفت حاجة غريبة في الشارع، بتعمل إيه؟",
    options: [
      { text: "بصورها — الجمال الغريب شد انتباهي",             tracks: ["frontend","gamedev"] },
      { text: "بقف وأحاول أفهم إيه اللي بيحصل",               tracks: ["backend","cyber","embedded"] },
      { text: "بجمع معلومات وأشوف لو في pattern أو سبب",       tracks: ["data","ai","testing"] },
      { text: "بتجاهل وبكمل طريقي",                            tracks: ["devops","mobile","backend"] },
    ],
  },
  {
    category: "طبيعتك الاجتماعية",
    text: "لما تشرح حاجة معقدة لحد، بتعمل إيه؟",
    options: [
      { text: "بعمل رسمة أو diagram توضيحي",                   tracks: ["frontend","data","mobile"] },
      { text: "بدي مثال من الحياة اليومية",                    tracks: ["backend","backend","mobile"] },
      { text: "بقسمها لخطوات صغيرة ومنطقية ومنظمة",           tracks: ["devops","testing","embedded"] },
      { text: "بشرح من الجذر والسبب الأساسي والـ WHY",          tracks: ["ai","backend","cyber"] },
    ],
  },
  {
    category: "طبيعتك الاجتماعية",
    text: "لو حد طلب منك رأيك في موقع أو تطبيق، بتبدأ إزاي؟",
    options: [
      { text: "بقيّم التصميم والشكل وسهولة الاستخدام",          tracks: ["frontend","mobile","gamedev"] },
      { text: "بشوف هل بيشتغل صح وبدون أخطاء أو crashes",      tracks: ["testing","embedded","devops"] },
      { text: "بشوف الـ data وإزاي بيستخدم معلومات المستخدمين", tracks: ["data","cyber","ai"] },
      { text: "بجرب حاجات غريبة أشوف لو فيه ثغرات أو edge cases", tracks: ["cyber","testing","backend"] },
    ],
  },
  {
    category: "طبيعتك الاجتماعية",
    text: "في أنهي بيئة بتحس إنك بتتنفس؟",
    options: [
      { text: "بيئة إبداعية فيها ناس ذوق وفن",                 tracks: ["frontend","gamedev"] },
      { text: "بيئة هادية تقدر تفكر فيها بعمق وتركيز",         tracks: ["backend","ai","embedded"] },
      { text: "بيئة منظمة فيها processes وأنظمة واضحة",        tracks: ["devops","testing","data"] },
      { text: "بيئة تنافسية فيها تحديات مستمرة",               tracks: ["cyber","ai","gamedev"] },
    ],
  },

  // ═══════════════════════════ BLOCK 9: طريقة التفكير ═══════════════════════════
  {
    category: "طريقة تفكيرك",
    text: "إيه الحاجة اللي بتقولها لنفسك قبل ما تبدأ مشروع جديد؟",
    options: [
      { text: "هيبقى أجمل وأمتع مشروع شفته الناس",            tracks: ["frontend","gamedev","mobile"] },
      { text: "هحل الأشياء صح ومتين من الأساس",               tracks: ["backend","embedded","data"] },
      { text: "هأخلي كل حاجة تشتغل أوتوماتيك من غير تدخل",    tracks: ["devops","backend","ai"] },
      { text: "هتأكد إن كل حاجة شغالة صح وما فيش أخطاء",      tracks: ["testing","cyber","devops"] },
    ],
  },
  {
    category: "طريقة تفكيرك",
    text: "إيه الحاجة اللي بتوقعك أكتر في الشغل؟",
    options: [
      { text: "مشروع جماله أو تجربته استثنائية",               tracks: ["frontend","gamedev","mobile"] },
      { text: "نظام صعب ومعقد بيحتاج تفكير عميق",             tracks: ["backend","embedded","ai"] },
      { text: "بيانات كتيرة وعلاقات مخفية تنتظر الاكتشاف",    tracks: ["data","ai","cyber"] },
      { text: "تحدي تقني محتاج أتمتة أو حل إبداعي",           tracks: ["devops","testing","backend"] },
    ],
  },
  {
    category: "طريقة تفكيرك",
    text: "لو كنت تصف نفسك بحيوان، هتختار إيه؟",
    options: [
      { text: "فراشة — جميلة وعندها أثر بصري واضح",            tracks: ["frontend","gamedev"] },
      { text: "نمل — منظم ويشتغل بذكاء وصبر في الخفاء",       tracks: ["devops","testing","backend"] },
      { text: "بومة — حكيمة وشايفة في الضلام وملاحظة",        tracks: ["cyber","ai","data"] },
      { text: "دلفين — ذكي ومتأقلم وبيحب الاستكشاف",          tracks: ["backend","ai","mobile"] },
    ],
  },
  {
    category: "طريقة تفكيرك",
    text: "لما بتبني حاجة، بتفكر في إيه أول؟",
    options: [
      { text: "الشكل والتجربة اللي هيحس بيها المستخدم",        tracks: ["frontend","mobile","gamedev"] },
      { text: "الـ architecture والـ foundation الصح",          tracks: ["backend","embedded","devops"] },
      { text: "الـ data flow وإزاي المعلومات هتتدار",           tracks: ["data","ai","backend"] },
      { text: "المخاطر واللي ممكن يغلط وكيف نمنعه",            tracks: ["testing","cyber","devops"] },
    ],
  },
  {
    category: "طريقة تفكيرك",
    text: "إيه أكتر حاجة بتأثر في قراراتك؟",
    options: [
      { text: "الحدس والإحساس الجمالي",                        tracks: ["frontend","gamedev","mobile"] },
      { text: "المنطق والتحليل العقلاني",                       tracks: ["backend","data","ai"] },
      { text: "البيانات والأدلة الموضوعية الملموسة",           tracks: ["data","ai","testing"] },
      { text: "التجربة العملية السابقة والـ lessons learned",   tracks: ["devops","backend","embedded"] },
    ],
  },

  // ═══════════════════════════ BLOCK 10: الختام ═══════════════════════════
  {
    category: "نظرتك للتكنولوجيا",
    text: "التكنولوجيا بالنسبالك هي؟",
    options: [
      { text: "أداة للتعبير الإبداعي وبناء أشياء جميلة",       tracks: ["frontend","gamedev"] },
      { text: "طريقة لحل مشاكل معقدة بذكاء وكفاءة",           tracks: ["backend","ai","embedded"] },
      { text: "منظومة تحتاج تُبنى وتُنظم وتُراقب بحكمة",       tracks: ["devops","testing","data"] },
      { text: "ساحة تنافس وتحدي مستمر",                        tracks: ["cyber","ai","gamedev"] },
    ],
  },
  {
    category: "نظرتك للتكنولوجيا",
    text: "إيه اللي بيفرقك عن غيرك في تعاملك مع الكمبيوتر؟",
    options: [
      { text: "بضيف لمسة جمالية لكل حاجة بعملها",              tracks: ["frontend","mobile","gamedev"] },
      { text: "بفهم من جوا قبل ما أحكم من بره",                tracks: ["backend","embedded","cyber"] },
      { text: "بحوّل كل حاجة متكررة لـ automation",            tracks: ["devops","ai","testing"] },
      { text: "بشوف في الأرقام قصص وأنماط ما حدش شايفها",      tracks: ["data","ai","cyber"] },
    ],
  },
  {
    category: "نظرتك للتكنولوجيا",
    text: "أنهي جملة بتوصف رحلتك مع التكنولوجيا؟",
    options: [
      { text: "بنيت عوالم رقمية من مخيلتي",                    tracks: ["frontend","gamedev","ai"] },
      { text: "كسّرت وصلّحت وتعلمت في كل مرة",                tracks: ["cyber","testing","backend"] },
      { text: "حوّلت الفوضى لنظام يشتغل لوحده",               tracks: ["devops","data","backend"] },
      { text: "بحثت عن الحقيقة في بيانات ومشاكل ضايعة",        tracks: ["data","ai","testing"] },
    ],
  },
  {
    category: "نظرتك للتكنولوجيا",
    text: "في 10 سنين، إيه اللي بتتخيل إنك بتعمله في الشغل؟",
    options: [
      { text: "بصمم تجارب رقمية جميلة تلمس الناس",             tracks: ["frontend","gamedev","mobile"] },
      { text: "ببني أنظمة تشغّل الإنترنت من تحت",             tracks: ["backend","devops","embedded"] },
      { text: "بحلل بيانات وبحمي أنظمة ضخمة",                 tracks: ["data","ai","cyber"] },
      { text: "بضمن إن كل حاجة شغالة صح وموثوقة",             tracks: ["testing","devops","cyber"] },
    ],
  },
  {
    category: "نظرتك للتكنولوجيا",
    text: "أخيراً — لو في جملة واحدة توصف نفسك في التك؟",
    options: [
      { text: "بحوّل الأفكار لتجارب بصرية مؤثرة",              tracks: ["frontend","gamedev","mobile"] },
      { text: "بفهم السيستم من الجذر وبخليه أقوى وأمتين",      tracks: ["backend","embedded","devops"] },
      { text: "بكتشف الأنماط المخفية وأضمن الجودة والأمان",    tracks: ["testing","cyber","data"] },
      { text: "بربط كل الأجزاء وأحوّل الأفكار لمنتجات حقيقية", tracks: ["backend","devops","mobile"] },
    ],
  },
];

/* ============================================================
   STATE
   ============================================================ */
let answers = {};
let currentQ = 0;

/* ============================================================
   SCORE ENGINE — percentage from total votes
   ============================================================ */
function calcScores() {
  // raw counts
  const raw = {};
  Object.keys(TRACKS).forEach((k) => (raw[k] = 0));

  Object.entries(answers).forEach(([qIdx, optIdx]) => {
    const q = QUESTIONS[parseInt(qIdx)];
    if (!q) return;
    const opt = q.options[optIdx];
    if (!opt) return;
    opt.tracks.forEach((t) => { if (raw[t] !== undefined) raw[t]++; });
  });

  // total votes cast across all tracks
  const total = Object.values(raw).reduce((s, v) => s + v, 0) || 1;

  // convert to percentages that sum to 100
  const pct = {};
  let sumRounded = 0;
  const entries = Object.entries(raw).sort((a, b) => b[1] - a[1]);

  entries.forEach(([k, v], i) => {
    if (i < entries.length - 1) {
      const p = Math.round((v / total) * 100);
      pct[k] = p;
      sumRounded += p;
    } else {
      pct[k] = 100 - sumRounded; // last one gets the remainder
    }
  });

  return pct;
}

function getSortedTracks(pct) {
  return Object.entries(pct)
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ ...TRACKS[id], score }));
}

/* ============================================================
   UTILS
   ============================================================ */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function initAOS() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("aos-animate"), parseInt(e.target.dataset.aosDelay || 0));
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  $$("[data-aos]").forEach((el) => obs.observe(el));
}

function initNav() {
  window.addEventListener("scroll", () => {
    $("#mainNav").classList.toggle("scrolled", window.scrollY > 40);
  });
}

/* ============================================================
   QUIZ RENDER
   ============================================================ */
function renderQuestion(index) {
  const q = QUESTIONS[index];
  const inner = $("#qcardInner");
  const letters = ["أ", "ب", "ج", "د"];

  inner.classList.remove("slide-in", "slide-out");
  inner.classList.add("slide-out");

  setTimeout(() => {
    inner.innerHTML = `
      <div class="d-flex align-items-center gap-3 mb-3">
        <div class="q-number-badge">${index + 1}</div>
        <span class="q-category">${q.category}</span>
      </div>
      <div class="q-text">${q.text}</div>
      <div class="q-options">
        ${q.options.map((opt, i) => `
          <button class="q-option ${answers[index] === i ? "selected" : ""}" data-opt="${i}">
            <span class="q-opt-letter">${letters[i]}</span>
            <span class="q-opt-text">${opt.text}</span>
          </button>
        `).join("")}
      </div>
    `;

    inner.classList.remove("slide-out");
    inner.classList.add("slide-in");

    inner.querySelectorAll(".q-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        answers[index] = parseInt(btn.dataset.opt);
        inner.querySelectorAll(".q-option").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        updateNavButtons();
        setTimeout(() => {
          if (index < QUESTIONS.length - 1) goToQuestion(index + 1);
          else updateNavButtons();
        }, 350);
      });
    });

    updateProgress(index);
    updateNavButtons();
  }, 220);
}

function updateProgress(index) {
  const answered = Object.keys(answers).length;
  const pct = (answered / QUESTIONS.length) * 100;
  $("#overallProgressFill").style.width = pct + "%";
  $("#progressCount").textContent = `${answered} / ${QUESTIONS.length}`;
  $("#navProgressText").textContent = `${answered} / ${QUESTIONS.length}`;
  $("#navProgress").style.opacity = "1";
}

function updateNavButtons() {
  const prevBtn   = $("#prevBtn");
  const nextBtn   = $("#nextBtn");
  const finishBtn = $("#finishBtn");
  const isLast     = currentQ === QUESTIONS.length - 1;
  const isAnswered = answers[currentQ] !== undefined;

  prevBtn.disabled = currentQ === 0;

  if (isLast && isAnswered) {
    nextBtn.classList.add("d-none");
    finishBtn.classList.remove("d-none");
  } else if (!isLast && isAnswered) {
    nextBtn.classList.remove("d-none");
    finishBtn.classList.add("d-none");
  } else {
    nextBtn.classList.add("d-none");
    finishBtn.classList.add("d-none");
  }
}

function goToQuestion(index) {
  currentQ = index;
  renderQuestion(index);
}

/* ============================================================
   RESULTS RENDER
   ============================================================ */
function showResults() {
  $("#quizSection").classList.add("d-none");
  $("#resultsSection").classList.remove("d-none");
  window.scrollTo({ top: 0, behavior: "smooth" });

  const pct     = calcScores();
  const sorted  = getSortedTracks(pct);
  const top     = sorted[0];

  setTimeout(initAOS, 100);

  // ── Hero result ──
  $("#resultHero").innerHTML = `
    <div class="result-hero-banner" style="--track-color:${top.color}">
      <div class="result-track-icon mb-3">
        <i class="bi ${top.icon}" style="font-size:4rem;color:${top.color}"></i>
      </div>
      <div class="result-track-label">// شخصيتك التقنية</div>
      <div class="result-track-name">${top.label}</div>
      <div class="result-match-pct">نسبة التوافق: <span>${top.score}%</span></div>
      <p class="result-desc">${top.desc}</p>
      <div class="result-traits">
        ${top.traits.map((t) => `
          <span class="result-trait">
            <i class="bi bi-check2-circle me-1" style="color:${top.color}"></i>${t}
          </span>
        `).join("")}
      </div>
    </div>
  `;

  // ── Top 3 ──
  const ranks = [
    { icon: "bi-trophy-fill",  color: "#ffd700" },
    { icon: "bi-award-fill",   color: "#c0c0c0" },
    { icon: "bi-patch-check-fill", color: "#cd7f32" },
  ];
  $("#top3Grid").innerHTML = sorted.slice(0, 3).map((t, i) => `
    <div class="top3-card" style="--track-color:${t.color}">
      <div class="top3-rank">
        <i class="bi ${ranks[i].icon}" style="color:${ranks[i].color};font-size:1.1rem"></i>
      </div>
      <i class="bi ${t.icon} top3-emoji" style="color:${t.color}"></i>
      <div class="top3-name">${t.label}</div>
      <div class="top3-pct">${t.score}%</div>
      <div class="top3-pct-label">توافق</div>
      <div class="top3-bar"><div class="top3-bar-fill" data-w="${t.score}" style="background:${t.color}"></div></div>
    </div>
  `).join("");

  // ── All scores ──
  $("#scoresList").innerHTML = sorted.map((t) => `
    <div class="score-row" style="--track-color:${t.color}">
      <div class="score-emoji">
        <i class="bi ${t.icon}" style="color:${t.color};font-size:1.3rem"></i>
      </div>
      <div class="score-info">
        <div class="score-name">${t.label}</div>
        <div class="score-bar"><div class="score-bar-fill" data-w="${t.score}" style="background:${t.color}"></div></div>
      </div>
      <div class="score-pct" style="color:${t.color}">${t.score}%</div>
    </div>
  `).join("");

  // Animate bars
  setTimeout(() => {
    $$(".top3-bar-fill, .score-bar-fill").forEach((bar) => {
      bar.style.width = bar.dataset.w + "%";
    });
  }, 400);
}

/* ============================================================
   START / RESET
   ============================================================ */
function startQuiz() {
  answers = {};
  currentQ = 0;
  $("#landingSection").classList.add("d-none");
  $("#resultsSection").classList.add("d-none");
  $("#quizSection").classList.remove("d-none");
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderQuestion(0);
}

function resetQuiz() {
  answers = {};
  currentQ = 0;
  $("#resultsSection").classList.add("d-none");
  $("#landingSection").classList.remove("d-none");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   CURSOR
   ============================================================ */
function initCursor() {
  const dot = document.createElement("div");
  dot.style.cssText = `position:fixed;width:8px;height:8px;background:var(--primary);border-radius:50%;pointer-events:none;z-index:9998;opacity:0;mix-blend-mode:difference;transition:transform .1s ease;`;
  document.body.appendChild(dot);
  document.addEventListener("mousemove", (e) => {
    dot.style.opacity = "1";
    dot.style.left = e.clientX - 4 + "px";
    dot.style.top  = e.clientY - 4 + "px";
  });
  document.addEventListener("mouseleave", () => dot.style.opacity = "0");
  document.querySelectorAll("button, .q-option, .track-chip").forEach((el) => {
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
  initCursor();

  $("#startBtn").addEventListener("click", startQuiz);
  $("#retakeBtn").addEventListener("click", resetQuiz);

  $("#prevBtn").addEventListener("click", () => {
    if (currentQ > 0) goToQuestion(currentQ - 1);
  });
  $("#nextBtn").addEventListener("click", () => {
    if (currentQ < QUESTIONS.length - 1) goToQuestion(currentQ + 1);
  });
  $("#finishBtn").addEventListener("click", () => {
    const unanswered = QUESTIONS.length - Object.keys(answers).length;
    if (unanswered > 0 && !confirm(`لسه في ${unanswered} سؤال ما اجبتش عليه. تكمل على أي حال؟`)) return;
    showResults();
  });

  console.log(
    "%c < TechType Quiz v2 /> ",
    "background:#e8ff47;color:#0d0d0d;font-family:monospace;font-weight:bold;font-size:14px;padding:8px 16px;border-radius:4px;"
  );
});