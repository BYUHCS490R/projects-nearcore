const STORAGE_KEY = "mandarin-study-hub-v3";
const THEME_KEY = "mandarin-theme";

const dom = {
  lessonSelector: document.querySelector("#lessonSelector"),
  setSelector: document.querySelector("#setSelector"),
  studyModeSelector: document.querySelector("#studyModeSelector"),
  queueSelector: document.querySelector("#queueSelector"),
  shuffleButton: document.querySelector("#shuffleButton"),
  resetProgressButton: document.querySelector("#resetProgressButton"),
  themeToggleButton: document.querySelector("#themeToggleButton"),
  lessonDisplay: document.querySelector("#lessonDisplay"),
  lessonTopic: document.querySelector("#lessonTopic"),
  sessionStatus: document.querySelector("#sessionStatus"),
  statsGrid: document.querySelector("#statsGrid"),
  lessonGoals: document.querySelector("#lessonGoals"),
  grammarPreview: document.querySelector("#grammarPreview"),
  card: document.querySelector("#card"),
  frontPrompt: document.querySelector("#frontPrompt"),
  frontHint: document.querySelector("#frontHint"),
  backChar: document.querySelector("#backChar"),
  backPinyin: document.querySelector("#backPinyin"),
  backMeaning: document.querySelector("#backMeaning"),
  exampleHan: document.querySelector("#exampleHan"),
  examplePinyin: document.querySelector("#examplePinyin"),
  exampleEnglish: document.querySelector("#exampleEnglish"),
  generateSentenceButton: document.querySelector("#generateSentenceButton"),
  prevCardButton: document.querySelector("#prevCardButton"),
  nextCardButton: document.querySelector("#nextCardButton"),
  flipButton: document.querySelector("#flipButton"),
  speakButton: document.querySelector("#speakButton"),
  reviewFeedback: document.querySelector("#reviewFeedback"),
  quizPrompt: document.querySelector("#quizPrompt"),
  quizOptions: document.querySelector("#quizOptions"),
  checkQuizButton: document.querySelector("#checkQuizButton"),
  newQuizButton: document.querySelector("#newQuizButton"),
  quizFeedback: document.querySelector("#quizFeedback")
};

const storage = loadStorage();

const appState = {
  lessonKey: storage.lessonKey || MandarinContent.lessons[0].id,
  setName: storage.setName || "",
  promptMode: storage.promptMode || "hanzi",
  queueMode: storage.queueMode || "lesson",
  theme: localStorage.getItem(THEME_KEY) || storage.theme || "light",
  queue: [],
  currentIndex: 0,
  cardFlipped: false,
  selectedQuizAnswer: null,
  currentQuiz: null,
  currentSentenceSeed: 0
};

const lessonSentenceBank = {
  L11: [
    {
      uses: ["天氣", "冷"],
      hanzi: "今天天氣很冷。",
      pinyin: "Jīntiān tiānqì hěn lěng.",
      english: "The weather is cold today."
    },
    {
      uses: ["比", "更", "暖和"],
      hanzi: "明天比今天更暖和。",
      pinyin: "Míngtiān bǐ jīntiān gèng nuǎnhuo.",
      english: "Tomorrow will be even warmer than today."
    },
    {
      uses: ["下雪", "公園"],
      hanzi: "如果下雪，我們就不去公園了。",
      pinyin: "Rúguǒ xià xuě, wǒmen jiù bú qù gōngyuán le.",
      english: "If it snows, we will not go to the park."
    },
    {
      uses: ["預報", "網上"],
      hanzi: "我剛才在網上看了天氣預報。",
      pinyin: "Wǒ gāngcái zài wǎngshang kàn le tiānqì yùbào.",
      english: "I just checked the weather forecast online."
    },
    {
      uses: ["不但...而且...", "暖和"],
      hanzi: "明天不但不冷，而且很暖和。",
      pinyin: "Míngtiān búdàn bù lěng, érqiě hěn nuǎnhuo.",
      english: "Tomorrow will not only be not cold, but also quite warm."
    }
  ],
  L12: [
    {
      uses: ["點菜", "餃子", "酸辣湯"],
      hanzi: "我們先點一盤餃子，再點一碗酸辣湯。",
      pinyin: "Wǒmen xiān diǎn yì pán jiǎozi, zài diǎn yì wǎn suānlàtāng.",
      english: "Let us order a plate of dumplings first, then a bowl of hot and sour soup."
    },
    {
      uses: ["好吃", "魚"],
      hanzi: "這個魚很好吃。",
      pinyin: "Zhège yú hěn hǎochī.",
      english: "This fish is delicious."
    },
    {
      uses: ["辣", "湯"],
      hanzi: "這個湯有一點辣。",
      pinyin: "Zhège tāng yǒu yìdiǎn là.",
      english: "This soup is a little spicy."
    },
    {
      uses: ["渴", "冰茶"],
      hanzi: "我有一點渴，想喝冰茶。",
      pinyin: "Wǒ yǒu yìdiǎn kě, xiǎng hē bīngchá.",
      english: "I am a little thirsty and want to drink iced tea."
    },
    {
      uses: ["賣完", "青菜"],
      hanzi: "青菜剛剛賣完了。",
      pinyin: "Qīngcài gānggāng mài wán le.",
      english: "The green vegetables were just sold out."
    }
  ],
  L13: [
    {
      uses: ["書店", "旁邊"],
      hanzi: "書店在運動場旁邊。",
      pinyin: "Shūdiàn zài yùndòngchǎng pángbiān.",
      english: "The bookstore is next to the sports field."
    },
    {
      uses: ["離", "近"],
      hanzi: "中國城離這裡不遠，很近。",
      pinyin: "Zhōngguóchéng lí zhèlǐ bù yuǎn, hěn jìn.",
      english: "Chinatown is not far from here; it is quite close."
    },
    {
      uses: ["從", "一直", "往", "南"],
      hanzi: "從這裡一直往南走。",
      pinyin: "Cóng zhèlǐ yìzhí wǎng nán zǒu.",
      english: "Go straight south from here."
    },
    {
      uses: ["路口", "右", "左"],
      hanzi: "到了路口先往右拐，再往左走。",
      pinyin: "Dào le lùkǒu xiān wǎng yòu guǎi, zài wǎng zuǒ zǒu.",
      english: "When you reach the intersection, turn right first, then go left."
    },
    {
      uses: ["前面", "紅綠燈"],
      hanzi: "前面有一個紅綠燈。",
      pinyin: "Qiánmiàn yǒu yí ge hónglǜdēng.",
      english: "There is a traffic light up ahead."
    }
  ],
  L14: [
    {
      uses: ["生日晚會", "禮物"],
      hanzi: "我想帶一個禮物去生日晚會。",
      pinyin: "Wǒ xiǎng dài yí ge lǐwù qù shēngrì wǎnhuì.",
      english: "I want to bring a gift to the birthday party."
    },
    {
      uses: ["水果", "蛋糕"],
      hanzi: "桌上有水果，也有蛋糕。",
      pinyin: "Zhuō shàng yǒu shuǐguǒ, yě yǒu dàngāo.",
      english: "There is fruit on the table, and there is cake too."
    },
    {
      uses: ["最", "可愛"],
      hanzi: "大家都覺得那個孩子最可愛。",
      pinyin: "Dàjiā dōu juéde nàge háizi zuì kě'ài.",
      english: "Everyone thinks that child is the cutest."
    },
    {
      uses: ["像", "臉", "圓"],
      hanzi: "她的臉很圓，看起來像她媽媽。",
      pinyin: "Tā de liǎn hěn yuán, kàn qǐlái xiàng tā māma.",
      english: "Her face is round, and she looks like her mother."
    },
    {
      uses: ["送", "花"],
      hanzi: "他想送她一把花。",
      pinyin: "Tā xiǎng sòng tā yì bǎ huā.",
      english: "He wants to give her a bouquet of flowers."
    }
  ],
  L15: [
    {
      uses: ["肚子", "疼"],
      hanzi: "我肚子很疼，今天不太舒服。",
      pinyin: "Wǒ dùzi hěn téng, jīntiān bú tài shūfu.",
      english: "My stomach hurts a lot, and I do not feel very well today."
    },
    {
      uses: ["最好", "休息"],
      hanzi: "你最好先休息一下。",
      pinyin: "Nǐ zuìhǎo xiān xiūxi yíxià.",
      english: "You had better rest for a bit first."
    },
    {
      uses: ["把", "藥"],
      hanzi: "你先把藥吃了，再回去休息。",
      pinyin: "Nǐ xiān bǎ yào chī le, zài huí qù xiūxi.",
      english: "Take the medicine first, then go back and rest."
    },
    {
      uses: ["發燒", "醫院"],
      hanzi: "如果你發燒了，就去醫院看病。",
      pinyin: "Rúguǒ nǐ fāshāo le, jiù qù yīyuàn kànbìng.",
      english: "If you get a fever, then go to the hospital to see a doctor."
    },
    {
      uses: ["過敏", "藥店"],
      hanzi: "他對花粉過敏，所以先去藥店。",
      pinyin: "Tā duì huāfěn guòmǐn, suǒyǐ xiān qù yàodiàn.",
      english: "He is allergic to pollen, so he is going to the pharmacy first."
    }
  ],
  L16: [
    {
      uses: ["後天", "電影"],
      hanzi: "我們後天一起去看電影吧。",
      pinyin: "Wǒmen hòutiān yìqǐ qù kàn diànyǐng ba.",
      english: "Let us go watch a movie together the day after tomorrow."
    },
    {
      uses: ["印象", "好"],
      hanzi: "那部電影給我的印象很好。",
      pinyin: "Nà bù diànyǐng gěi wǒ de yìnxiàng hěn hǎo.",
      english: "That movie left a very good impression on me."
    },
    {
      uses: ["就", "倆"],
      hanzi: "今天就我們倆去。",
      pinyin: "Jīntiān jiù wǒmen liǎ qù.",
      english: "Today it will be just the two of us going."
    },
    {
      uses: ["記得", "號碼"],
      hanzi: "你還記得他的號碼嗎？",
      pinyin: "Nǐ hái jìde tā de hàomǎ ma?",
      english: "Do you still remember his number?"
    },
    {
      uses: ["一言為定"],
      hanzi: "好，後天見，一言為定。",
      pinyin: "Hǎo, hòutiān jiàn, yì yán wéi dìng.",
      english: "Okay, see you the day after tomorrow. It is settled."
    }
  ],
  L17: [
    {
      uses: ["公寓", "乾淨"],
      hanzi: "這套公寓很乾淨，也很安靜。",
      pinyin: "Zhè tào gōngyù hěn gānjìng, yě hěn ānjìng.",
      english: "This apartment is very clean and also very quiet."
    },
    {
      uses: ["客廳", "臥室", "廚房"],
      hanzi: "這個房子有客廳、臥室和廚房。",
      pinyin: "Zhège fángzi yǒu kètīng, wòshì hé chúfáng.",
      english: "This place has a living room, a bedroom, and a kitchen."
    },
    {
      uses: ["房租", "押金"],
      hanzi: "房租不太貴，但是要先付押金。",
      pinyin: "Fángzū bú tài guì, dànshì yào xiān fù yājīn.",
      english: "The rent is not too expensive, but you need to pay the deposit first."
    },
    {
      uses: ["准", "寵物"],
      hanzi: "這裡不准養寵物。",
      pinyin: "Zhèlǐ bù zhǔn yǎng chǒngwù.",
      english: "Pets are not allowed here."
    },
    {
      uses: ["差不多", "人民幣"],
      hanzi: "這個房租差不多一千人民幣。",
      pinyin: "Zhège fángzū chàbuduō yì qiān rénmínbì.",
      english: "The rent is about one thousand RMB."
    }
  ],
  L18: [
    {
      uses: ["跑步", "簡單"],
      hanzi: "跑步很簡單，可是要每天做。",
      pinyin: "Pǎobù hěn jiǎndān, kěshì yào měitiān zuò.",
      english: "Jogging is simple, but you need to do it every day."
    },
    {
      uses: ["游泳", "危險"],
      hanzi: "不會游泳的時候，下水很危險。",
      pinyin: "Bú huì yóuyǒng de shíhou, xià shuǐ hěn wēixiǎn.",
      english: "When you do not know how to swim, getting in the water is dangerous."
    },
    {
      uses: ["足球", "比賽"],
      hanzi: "他每個星期都看足球比賽。",
      pinyin: "Tā měi ge xīngqí dōu kàn zúqiú bǐsài.",
      english: "He watches soccer matches every week."
    },
    {
      uses: ["應該", "運動服"],
      hanzi: "你應該先換上運動服。",
      pinyin: "Nǐ yīnggāi xiān huàn shàng yùndòngfú.",
      english: "You should put on sportswear first."
    },
    {
      uses: ["半天", "累"],
      hanzi: "我打了半天球，現在很累。",
      pinyin: "Wǒ dǎ le bàntiān qiú, xiànzài hěn lèi.",
      english: "I played ball for a long time, and now I am tired."
    }
  ],
  L19: [
    {
      uses: ["打算", "旅行"],
      hanzi: "我暑假打算去北京旅行。",
      pinyin: "Wǒ shǔjià dǎsuàn qù Běijīng lǚxíng.",
      english: "I plan to travel to Beijing during summer vacation."
    },
    {
      uses: ["護照", "簽證"],
      hanzi: "出國以前要先準備護照和簽證。",
      pinyin: "Chūguó yǐqián yào xiān zhǔnbèi hùzhào hé qiānzhèng.",
      english: "Before going abroad, you need to prepare your passport and visa first."
    },
    {
      uses: ["導遊", "長城"],
      hanzi: "導遊明天會帶我們去長城。",
      pinyin: "Dǎoyóu míngtiān huì dài wǒmen qù Chángchéng.",
      english: "The tour guide will take us to the Great Wall tomorrow."
    },
    {
      uses: ["航班", "直飛"],
      hanzi: "這個航班可以直飛北京。",
      pinyin: "Zhège hángbān kěyǐ zhífēi Běijīng.",
      english: "This flight can go directly to Beijing."
    },
    {
      uses: ["旅館", "訂"],
      hanzi: "我已經訂好了旅館。",
      pinyin: "Wǒ yǐjīng dìng hǎo le lǚguǎn.",
      english: "I have already booked the hotel."
    }
  ],
  L20: [
    {
      uses: ["行李", "托運"],
      hanzi: "這兩件行李都要托運。",
      pinyin: "Zhè liǎng jiàn xíngli dōu yào tuōyùn.",
      english: "Both of these pieces of luggage need to be checked."
    },
    {
      uses: ["箱子", "超重"],
      hanzi: "這個箱子太重了，已經超重了。",
      pinyin: "Zhège xiāngzi tài zhòng le, yǐjīng chāozhòng le.",
      english: "This suitcase is too heavy; it is already overweight."
    },
    {
      uses: ["登機牌", "登機口"],
      hanzi: "請先看登機牌，再去登機口。",
      pinyin: "Qǐng xiān kàn dēngjīpái, zài qù dēngjīkǒu.",
      english: "Please check the boarding pass first, then go to the gate."
    },
    {
      uses: ["照顧", "小心"],
      hanzi: "路上小心，也要照顧好自己。",
      pinyin: "Lùshàng xiǎoxīn, yě yào zhàogù hǎo zìjǐ.",
      english: "Be careful on the way, and take good care of yourself too."
    },
    {
      uses: ["一路平安", "歡迎"],
      hanzi: "祝你一路平安，到了北京大家都歡迎你。",
      pinyin: "Zhù nǐ yí lù píng'ān, dào le Běijīng dàjiā dōu huānyíng nǐ.",
      english: "Have a safe trip; everyone will welcome you when you arrive in Beijing."
    }
  ]
};

const hiddenSentenceDatabase = {
  helperWords: [
    { char: "我", pinyin: "wǒ", english: "I" },
    { char: "你", pinyin: "nǐ", english: "you" },
    { char: "他", pinyin: "tā", english: "he" },
    { char: "她", pinyin: "tā", english: "she" },
    { char: "它", pinyin: "tā", english: "it" },
    { char: "我們", pinyin: "wǒmen", english: "we" },
    { char: "你們", pinyin: "nǐmen", english: "you plural" },
    { char: "他們", pinyin: "tāmen", english: "they" },
    { char: "大家", pinyin: "dàjiā", english: "everyone" },
    { char: "誰", pinyin: "shéi", english: "who" },
    { char: "什麼", pinyin: "shénme", english: "what" },
    { char: "哪", pinyin: "nǎ", english: "which" },
    { char: "哪裡", pinyin: "nǎlǐ", english: "where" },
    { char: "幾", pinyin: "jǐ", english: "how many" },
    { char: "怎麼", pinyin: "zěnme", english: "how" },
    { char: "為什麼", pinyin: "wèishénme", english: "why" },
    { char: "今天", pinyin: "jīntiān", english: "today" },
    { char: "明天", pinyin: "míngtiān", english: "tomorrow" },
    { char: "昨天", pinyin: "zuótiān", english: "yesterday" },
    { char: "前天", pinyin: "qiántiān", english: "the day before yesterday" },
    { char: "後天", pinyin: "hòutiān", english: "the day after tomorrow" },
    { char: "現在", pinyin: "xiànzài", english: "now" },
    { char: "早上", pinyin: "zǎoshang", english: "morning" },
    { char: "中午", pinyin: "zhōngwǔ", english: "noon" },
    { char: "下午", pinyin: "xiàwǔ", english: "afternoon" },
    { char: "晚上", pinyin: "wǎnshang", english: "evening" },
    { char: "星期", pinyin: "xīngqī", english: "week" },
    { char: "星期一", pinyin: "xīngqīyī", english: "Monday" },
    { char: "星期二", pinyin: "xīngqī'èr", english: "Tuesday" },
    { char: "星期三", pinyin: "xīngqīsān", english: "Wednesday" },
    { char: "星期四", pinyin: "xīngqīsì", english: "Thursday" },
    { char: "星期五", pinyin: "xīngqīwǔ", english: "Friday" },
    { char: "星期六", pinyin: "xīngqīliù", english: "Saturday" },
    { char: "星期天", pinyin: "xīngqītiān", english: "Sunday" },
    { char: "星期日", pinyin: "xīngqīrì", english: "Sunday" },
    { char: "月", pinyin: "yuè", english: "month" },
    { char: "一月", pinyin: "yīyuè", english: "January" },
    { char: "二月", pinyin: "èryuè", english: "February" },
    { char: "三月", pinyin: "sānyuè", english: "March" },
    { char: "四月", pinyin: "sìyuè", english: "April" },
    { char: "五月", pinyin: "wǔyuè", english: "May" },
    { char: "六月", pinyin: "liùyuè", english: "June" },
    { char: "七月", pinyin: "qīyuè", english: "July" },
    { char: "八月", pinyin: "bāyuè", english: "August" },
    { char: "九月", pinyin: "jiǔyuè", english: "September" },
    { char: "十月", pinyin: "shíyuè", english: "October" },
    { char: "十一月", pinyin: "shíyīyuè", english: "November" },
    { char: "十二月", pinyin: "shí'èryuè", english: "December" },
    { char: "號", pinyin: "hào", english: "day of month" },
    { char: "時候", pinyin: "shíhou", english: "time; moment" },
    { char: "時間", pinyin: "shíjiān", english: "time" },
    { char: "這裡", pinyin: "zhèlǐ", english: "here" },
    { char: "那裡", pinyin: "nàlǐ", english: "there" },
    { char: "這個", pinyin: "zhège", english: "this" },
    { char: "那個", pinyin: "nàge", english: "that" },
    { char: "裡", pinyin: "lǐ", english: "inside" },
    { char: "外面", pinyin: "wàimiàn", english: "outside" },
    { char: "前面", pinyin: "qiánmiàn", english: "in front" },
    { char: "後面", pinyin: "hòumiàn", english: "behind" },
    { char: "旁邊", pinyin: "pángbiān", english: "beside" },
    { char: "上面", pinyin: "shàngmiàn", english: "above" },
    { char: "下面", pinyin: "xiàmiàn", english: "below" },
    { char: "學校", pinyin: "xuéxiào", english: "school" },
    { char: "家", pinyin: "jiā", english: "home" },
    { char: "教室", pinyin: "jiàoshì", english: "classroom" },
    { char: "商店", pinyin: "shāngdiàn", english: "store" },
    { char: "路", pinyin: "lù", english: "road" },
    { char: "地方", pinyin: "dìfang", english: "place" },
    { char: "北京", pinyin: "Běijīng", english: "Beijing" },
    { char: "中文", pinyin: "Zhōngwén", english: "Chinese language" },
    { char: "朋友", pinyin: "péngyou", english: "friend" },
    { char: "老師", pinyin: "lǎoshī", english: "teacher" },
    { char: "學生", pinyin: "xuésheng", english: "student" },
    { char: "媽媽", pinyin: "māma", english: "mother" },
    { char: "爸爸", pinyin: "bàba", english: "father" },
    { char: "很", pinyin: "hěn", english: "very" },
    { char: "一", pinyin: "yī", english: "one" },
    { char: "二", pinyin: "èr", english: "two" },
    { char: "三", pinyin: "sān", english: "three" },
    { char: "四", pinyin: "sì", english: "four" },
    { char: "五", pinyin: "wǔ", english: "five" },
    { char: "六", pinyin: "liù", english: "six" },
    { char: "七", pinyin: "qī", english: "seven" },
    { char: "八", pinyin: "bā", english: "eight" },
    { char: "九", pinyin: "jiǔ", english: "nine" },
    { char: "十", pinyin: "shí", english: "ten" },
    { char: "兩", pinyin: "liǎng", english: "two for counting" },
    { char: "百", pinyin: "bǎi", english: "hundred" },
    { char: "千", pinyin: "qiān", english: "thousand" },
    { char: "真", pinyin: "zhēn", english: "really" },
    { char: "太", pinyin: "tài", english: "too; very" },
    { char: "有一點", pinyin: "yǒu yìdiǎn", english: "a little" },
    { char: "比較", pinyin: "bǐjiào", english: "relatively; comparatively" },
    { char: "也", pinyin: "yě", english: "also" },
    { char: "都", pinyin: "dōu", english: "all" },
    { char: "還", pinyin: "hái", english: "still; also" },
    { char: "再", pinyin: "zài", english: "again; then" },
    { char: "就", pinyin: "jiù", english: "then; just" },
    { char: "才", pinyin: "cái", english: "only then" },
    { char: "先", pinyin: "xiān", english: "first" },
    { char: "再", pinyin: "zài", english: "then again" },
    { char: "一起", pinyin: "yìqǐ", english: "together" },
    { char: "因為", pinyin: "yīnwèi", english: "because" },
    { char: "所以", pinyin: "suǒyǐ", english: "so; therefore" },
    { char: "但是", pinyin: "dànshì", english: "but" },
    { char: "如果", pinyin: "rúguǒ", english: "if" },
    { char: "跟", pinyin: "gēn", english: "with" },
    { char: "和", pinyin: "hé", english: "and" },
    { char: "給", pinyin: "gěi", english: "give; for" },
    { char: "在", pinyin: "zài", english: "at; in" },
    { char: "從", pinyin: "cóng", english: "from" },
    { char: "到", pinyin: "dào", english: "arrive; to" },
    { char: "往", pinyin: "wǎng", english: "toward" },
    { char: "可以", pinyin: "kěyǐ", english: "can; may" },
    { char: "會", pinyin: "huì", english: "will; can" },
    { char: "應該", pinyin: "yīnggāi", english: "should" },
    { char: "想", pinyin: "xiǎng", english: "want; think" },
    { char: "去", pinyin: "qù", english: "go" },
    { char: "來", pinyin: "lái", english: "come" },
    { char: "看", pinyin: "kàn", english: "look; watch" },
    { char: "學", pinyin: "xué", english: "study" },
    { char: "買", pinyin: "mǎi", english: "buy" },
    { char: "吃", pinyin: "chī", english: "eat" },
    { char: "喝", pinyin: "hē", english: "drink" },
    { char: "說", pinyin: "shuō", english: "speak; say" },
    { char: "聽", pinyin: "tīng", english: "listen" },
    { char: "寫", pinyin: "xiě", english: "write" },
    { char: "讀", pinyin: "dú", english: "read" },
    { char: "做", pinyin: "zuò", english: "do; make" },
    { char: "用", pinyin: "yòng", english: "use" },
    { char: "帶", pinyin: "dài", english: "bring" },
    { char: "走", pinyin: "zǒu", english: "walk; leave" },
    { char: "回", pinyin: "huí", english: "return" },
    { char: "住", pinyin: "zhù", english: "live" },
    { char: "等", pinyin: "děng", english: "wait" },
    { char: "找", pinyin: "zhǎo", english: "look for" },
    { char: "喜歡", pinyin: "xǐhuan", english: "like" },
    { char: "覺得", pinyin: "juéde", english: "feel; think" },
    { char: "知道", pinyin: "zhīdào", english: "know" },
    { char: "認識", pinyin: "rènshi", english: "know; be acquainted with" },
    { char: "準備", pinyin: "zhǔnbèi", english: "prepare" },
    { char: "有", pinyin: "yǒu", english: "have; there is" },
    { char: "沒有", pinyin: "méiyǒu", english: "not have; did not" },
    { char: "是", pinyin: "shì", english: "to be" },
    { char: "不是", pinyin: "bú shì", english: "is not" },
    { char: "好", pinyin: "hǎo", english: "good" },
    { char: "大", pinyin: "dà", english: "big" },
    { char: "小", pinyin: "xiǎo", english: "small" },
    { char: "多", pinyin: "duō", english: "many; much" },
    { char: "少", pinyin: "shǎo", english: "few; little" },
    { char: "高", pinyin: "gāo", english: "tall; high" },
    { char: "新", pinyin: "xīn", english: "new" },
    { char: "老", pinyin: "lǎo", english: "old" },
    { char: "快", pinyin: "kuài", english: "fast" },
    { char: "慢", pinyin: "màn", english: "slow" },
    { char: "忙", pinyin: "máng", english: "busy" },
    { char: "累", pinyin: "lèi", english: "tired" },
    { char: "高興", pinyin: "gāoxìng", english: "happy" },
    { char: "喜歡", pinyin: "xǐhuan", english: "to like" },
    { char: "沒有關係", pinyin: "méi yǒu guānxi", english: "it does not matter" },
    { char: "了", pinyin: "le", english: "completed action particle" }
  ]
};

function loadStorage() {
  const fallback = {
    lessonKey: MandarinContent.lessons[0].id,
    setName: "",
    promptMode: "hanzi",
    queueMode: "lesson",
    theme: "light",
    progress: {}
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return saved ? { ...fallback, ...saved, progress: saved.progress || {} } : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage() {
  storage.lessonKey = appState.lessonKey;
  storage.setName = appState.setName;
  storage.promptMode = appState.promptMode;
  storage.queueMode = appState.queueMode;
  storage.theme = appState.theme;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  localStorage.setItem(THEME_KEY, appState.theme);
}

function currentLesson() {
  return MandarinContent.lessons.find((lesson) => lesson.id === appState.lessonKey) || MandarinContent.lessons[0];
}

function currentSetEntries() {
  const lesson = currentLesson();
  const entries = lesson.sets[appState.setName] || [];
  return entries.map((entry) => ({
    lessonId: lesson.id,
    setName: appState.setName,
    char: entry.char,
    pinyin: entry.pinyin,
    english: entry.english
  }));
}

function currentCard() {
  return appState.queue[appState.currentIndex] || null;
}

function cardKey(card) {
  return `${card.lessonId}:${card.setName}:${card.char}`;
}

function cardProgress(card) {
  const key = cardKey(card);
  if (!storage.progress[key]) {
    storage.progress[key] = { again: 0, hard: 0, good: 0, easy: 0, streak: 0 };
  }
  return storage.progress[key];
}

function populateLessonSelector() {
  dom.lessonSelector.innerHTML = MandarinContent.lessons
    .map((lesson) => `<option value="${lesson.id}">${lesson.title}</option>`)
    .join("");
  dom.lessonSelector.value = appState.lessonKey;
}

function updateSetSelector() {
  const lesson = currentLesson();
  const setNames = Object.keys(lesson.sets);
  if (!setNames.includes(appState.setName)) {
    appState.setName = setNames[0];
  }

  dom.setSelector.innerHTML = setNames
    .map((setName) => `<option value="${setName}">${setName}</option>`)
    .join("");
  dom.setSelector.value = appState.setName;
}

function buildQueue() {
  let cards = [...currentSetEntries()];

  if (appState.queueMode === "shuffle") {
    cards = shuffle(cards);
  }

  if (appState.queueMode === "due") {
    cards = cards.sort((left, right) => getScore(left) - getScore(right));
  }

  appState.queue = cards;
  appState.currentIndex = 0;
  appState.cardFlipped = false;
  saveStorage();
  render();
}

function getScore(card) {
  const progress = cardProgress(card);
  return (progress.again * 4) + (progress.hard * 2) - (progress.good + progress.easy + progress.streak);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", appState.theme === "dark");
  dom.themeToggleButton.textContent = appState.theme === "light" ? "☾" : "☀";
}

function render() {
  const lesson = currentLesson();
  const card = currentCard();

  dom.lessonDisplay.textContent = lesson.title;
  dom.lessonTopic.textContent = appState.setName;
  dom.sessionStatus.textContent = `${appState.currentIndex + 1} of ${appState.queue.length} cards in ${appState.setName}`;
  renderGoals(lesson);
  renderGrammarPreview(lesson);
  renderStats();
  renderCard(card);
  renderGeneratedSentence(card);
  renderQuiz();
  applyTheme();
}

function renderGoals(lesson) {
  dom.lessonGoals.innerHTML = lesson.goals.map((goal) => `<li>${goal}</li>`).join("");
}

function renderGrammarPreview(lesson) {
  const previewItems = MandarinContent.grammarTopics
    .filter((topic) => topic.lessonId === lesson.id)
    .slice(0, 4);

  dom.grammarPreview.innerHTML = previewItems.length
    ? previewItems.map((item) => `<div class="stack-item"><strong>${item.pattern}</strong><span>${item.simple}</span></div>`).join("")
    : `<div class="stack-item"><strong>Lesson vocabulary</strong><span>Use this set in short spoken and written sentences.</span></div>`;
}

function renderStats() {
  const cards = currentSetEntries();
  const total = cards.length;
  const reviewed = cards.filter((card) => {
    const progress = cardProgress(card);
    return progress.again + progress.hard + progress.good + progress.easy > 0;
  }).length;
  const mastered = cards.filter((card) => cardProgress(card).easy > 0).length;
  const weak = cards.filter((card) => cardProgress(card).again > cardProgress(card).good).length;

  const stats = [
    { label: "Cards in set", value: total },
    { label: "Reviewed", value: reviewed },
    { label: "Marked easy", value: mastered },
    { label: "Needs work", value: weak }
  ];

  dom.statsGrid.innerHTML = stats
    .map((stat) => `<div class="stat-card"><span>${stat.label}</span><strong>${stat.value}</strong></div>`)
    .join("");
}

function renderCard(card) {
  if (!card) return;

  const promptLookup = {
    hanzi: { value: card.char, hint: "Say the sound and meaning before flipping." },
    english: { value: card.english, hint: "Recall the Hanzi and pinyin." },
    pinyin: { value: card.pinyin, hint: "Recall the character from the sound." }
  };

  const prompt = promptLookup[appState.promptMode];
  dom.card.classList.toggle("is-flipped", appState.cardFlipped);
  dom.frontPrompt.textContent = prompt.value;
  dom.frontHint.textContent = prompt.hint;
  dom.backChar.textContent = card.char;
  dom.backPinyin.textContent = card.pinyin;
  dom.backMeaning.textContent = card.english;
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getRelatedWords(card) {
  const lesson = currentLesson();
  const currentSet = currentSetEntries().filter((item) => item.char !== card.char);
  const otherSets = Object.entries(lesson.sets)
    .filter(([setName]) => setName !== appState.setName)
    .flatMap(([, entries]) => entries)
    .map((entry) => ({ char: entry.char, pinyin: entry.pinyin, english: entry.english }));

  return [...currentSet, ...otherSets, ...hiddenSentenceDatabase.helperWords];
}

function chooseRelatedWord(card, predicate, fallback) {
  const pool = getRelatedWords(card).filter((item) => item.char !== card.char && predicate(item));
  return pool[appState.currentSentenceSeed % Math.max(1, pool.length)] || fallback;
}

function classifyCard(card) {
  const english = card.english.toLowerCase();
  return {
    isVerb: english.startsWith("to "),
    isPlace: /(park|bookstore|apartment|kitchen|bathroom|living room|airport|hotel|school|center|place|city|town|chinatown|hospital|pharmacy|restaurant)/.test(english),
    isFood: /(soup|dumplings|rice|tea|fish|beef|tofu|vegetable|fruit|duck|cake|cucumber|meal)/.test(english),
    isAdjective: /(cold|warm|hot|comfortable|clean|quiet|dangerous|simple|fat|thin|cute|round|healthy|itchy|clear|sweet|sour|spicy|delicious|interesting|heavy|lazy|wrong)/.test(english),
    isTime: /(hour|minute|summer|winter|spring|autumn|last year|today|tomorrow|day)/.test(english),
    isMeasureWord: english.includes("measure word")
  };
}

function buildDynamicSentenceTemplates(card) {
  const kind = classifyCard(card);
  const place = chooseRelatedWord(card, (item) => /(school|home|park|apartment|bookstore|restaurant|airport|hospital|city|center)/i.test(item.english), { char: "學校", pinyin: "xuéxiào", english: "school" });
  const noun = chooseRelatedWord(card, (item) => !item.english.toLowerCase().startsWith("to "), { char: "中文", pinyin: "Zhōngwén", english: "Chinese language" });
  const verb = chooseRelatedWord(card, (item) => item.english.toLowerCase().startsWith("to "), { char: "學", pinyin: "xué", english: "to study" });
  const adjective = chooseRelatedWord(card, (item) => /(cold|warm|hot|clean|quiet|interesting|dangerous|simple|comfortable|healthy|cute)/i.test(item.english), { char: "好", pinyin: "hǎo", english: "good" });

  const templates = [];

  if (kind.isVerb) {
    templates.push(
      {
        hanzi: `我想${card.char}，可是今天沒有時間。`,
        pinyin: `Wǒ xiǎng ${card.pinyin}, kěshì jīntiān méiyǒu shíjiān.`,
        english: `I want to ${card.english.replace(/^to /, "")}, but I do not have time today.`
      },
      {
        hanzi: `我們明天可以一起${card.char}。`,
        pinyin: `Wǒmen míngtiān kěyǐ yìqǐ ${card.pinyin}.`,
        english: `We can ${card.english.replace(/^to /, "")} together tomorrow.`
      }
    );
  }

  if (kind.isPlace) {
    templates.push(
      {
        hanzi: `${card.char}離${place.char}不遠。`,
        pinyin: `${card.pinyin} lí ${place.pinyin} bù yuǎn.`,
        english: `${card.english} is not far from ${place.english}.`
      },
      {
        hanzi: `我想去${card.char}看看。`,
        pinyin: `Wǒ xiǎng qù ${card.pinyin} kànkan.`,
        english: `I want to go check out the ${card.english}.`
      }
    );
  }

  if (kind.isFood) {
    templates.push(
      {
        hanzi: `今天我想吃${card.char}。`,
        pinyin: `Jīntiān wǒ xiǎng chī ${card.pinyin}.`,
        english: `Today I want to eat ${card.english}.`
      },
      {
        hanzi: `${card.char}和${noun.char}都很受歡迎。`,
        pinyin: `${card.pinyin} hé ${noun.pinyin} dōu hěn shòu huānyíng.`,
        english: `${card.english} and ${noun.english} are both popular.`
      }
    );
  }

  if (kind.isAdjective) {
    templates.push(
      {
        hanzi: `今天真的很${card.char}。`,
        pinyin: `Jīntiān zhēnde hěn ${card.pinyin}.`,
        english: `Today is really ${card.english}.`
      },
      {
        hanzi: `這裡又${card.char}又${adjective.char}。`,
        pinyin: `Zhèlǐ yòu ${card.pinyin} yòu ${adjective.pinyin}.`,
        english: `This place is both ${card.english} and ${adjective.english}.`
      }
    );
  }

  if (card.lessonId === "L11" || card.char === "比" || card.char === "更") {
    templates.push({
      hanzi: `今天比昨天${adjective.char}。`,
      pinyin: `Jīntiān bǐ zuótiān ${adjective.pinyin}.`,
      english: `Today is ${adjective.english} than yesterday.`
    });
  }

  if (card.lessonId === "L17") {
    templates.push({
      hanzi: `要不要去${place.char}看看？`,
      pinyin: `Yào bú yào qù ${place.pinyin} kànkan?`,
      english: `Do you want to go look at the ${place.english}?`
    });
  }

  if (card.lessonId === "L18" && kind.isVerb) {
    templates.push({
      hanzi: `我三天沒有${card.char}了。`,
      pinyin: `Wǒ sān tiān méiyǒu ${card.pinyin} le.`,
      english: `I have not ${card.english.replace(/^to /, "")} for three days.`
    });
  }

  if (card.lessonId === "L15" && (card.char === "把" || kind.isVerb)) {
    templates.push({
      hanzi: `你先把${noun.char}${verb.char}了。`,
      pinyin: `Nǐ xiān bǎ ${noun.pinyin} ${verb.pinyin} le.`,
      english: `First, ${verb.english.replace(/^to /, "")} the ${noun.english}.`
    });
  }

  return templates;
}

function buildSentenceTemplates(card) {
  const sentencePool = lessonSentenceBank[card.lessonId] || [];
  const exactMatches = sentencePool.filter((sentence) => sentence.uses.includes(card.char));
  const englishNeedle = card.english.toLowerCase().split(";")[0].trim();
  const englishMatches = sentencePool.filter((sentence) => sentence.english.toLowerCase().includes(englishNeedle));
  const dynamicMatches = buildDynamicSentenceTemplates(card);

  const merged = uniqueBy([...exactMatches, ...englishMatches, ...dynamicMatches], (item) => item.hanzi);
  if (merged.length) {
    return merged;
  }

  const pool = currentSetEntries().filter((item) => item.char !== card.char);
  const support = pool[appState.currentSentenceSeed % Math.max(1, pool.length)] || card;

  return [
    {
      hanzi: `${card.char}是這一課很重要的詞。`,
      pinyin: `${card.pinyin} shì zhè yí kè hěn zhòngyào de cí.`,
      english: `${card.english} is an important word in this lesson.`
    },
    {
      hanzi: `老師今天又用了${card.char}。`,
      pinyin: `Lǎoshī jīntiān yòu yòng le ${card.pinyin}.`,
      english: `The teacher used ${card.english} again today.`
    },
    {
      hanzi: `${card.char}和${support.char}常常一起出現在這一課。`,
      pinyin: `${card.pinyin} hé ${support.pinyin} chángcháng yìqǐ chūxiàn zài zhè yí kè.`,
      english: `${card.english} and ${support.english} often appear together in this lesson.`
    }
  ];
}

function renderGeneratedSentence(card) {
  if (!card) return;
  const templates = buildSentenceTemplates(card);
  const sentence = templates[appState.currentSentenceSeed % templates.length];
  dom.exampleHan.textContent = sentence.hanzi;
  dom.examplePinyin.textContent = sentence.pinyin;
  dom.exampleEnglish.textContent = sentence.english;
}

function randomQuizCard() {
  const pool = currentSetEntries().filter((item) => {
    const activeCard = currentCard();
    return !activeCard || item.char !== activeCard.char;
  });
  const source = pool.length ? pool : currentSetEntries();
  return source[Math.floor(Math.random() * source.length)];
}

function renderQuiz() {
  const quizCard = randomQuizCard();
  if (!quizCard) return;

  const distractors = shuffle(currentSetEntries().filter((item) => item.char !== quizCard.char)).slice(0, 3);
  const choices = shuffle([quizCard, ...distractors]);

  appState.currentQuiz = {
    char: quizCard.char,
    answer: quizCard.english,
    choices: choices.map((item) => item.english)
  };
  appState.selectedQuizAnswer = null;

  dom.quizPrompt.textContent = `What is the best meaning for ${quizCard.char}?`;
  dom.quizOptions.innerHTML = appState.currentQuiz.choices
    .map((choice, index) => `<button class="quiz-option" data-index="${index}" type="button">${choice}</button>`)
    .join("");
  dom.quizFeedback.textContent = "Choose the best answer and check it.";
}

function moveCard(step) {
  appState.currentIndex = (appState.currentIndex + step + appState.queue.length) % appState.queue.length;
  appState.cardFlipped = false;
  render();
}

function flipCard() {
  appState.cardFlipped = !appState.cardFlipped;
  dom.card.classList.toggle("is-flipped", appState.cardFlipped);
}

function rateCard(rating) {
  const card = currentCard();
  const progress = cardProgress(card);
  progress[rating] += 1;
  progress.streak = rating === "again" ? 0 : progress.streak + 1;
  saveStorage();
  dom.reviewFeedback.textContent = MandarinContent.reviewMessages[rating];
  renderStats();
}

function checkQuiz() {
  if (appState.selectedQuizAnswer === null) {
    dom.quizFeedback.textContent = "Pick one answer first.";
    return;
  }

  const selected = appState.currentQuiz.choices[appState.selectedQuizAnswer];
  const correct = selected === appState.currentQuiz.answer;
  dom.quizFeedback.textContent = correct
    ? "Correct. Nice recall."
    : `Not quite. Correct answer: ${appState.currentQuiz.answer}`;
}

function speakCurrentCard() {
  const card = currentCard();
  if (!card || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(card.char);
  utterance.lang = "zh-TW";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function bindEvents() {
  dom.lessonSelector.addEventListener("change", (event) => {
    appState.lessonKey = event.target.value;
    updateSetSelector();
    buildQueue();
  });

  dom.setSelector.addEventListener("change", (event) => {
    appState.setName = event.target.value;
    buildQueue();
  });

  dom.studyModeSelector.addEventListener("change", (event) => {
    appState.promptMode = event.target.value;
    saveStorage();
    renderCard(currentCard());
  });

  dom.queueSelector.addEventListener("change", (event) => {
    appState.queueMode = event.target.value;
    buildQueue();
  });

  dom.shuffleButton.addEventListener("click", () => {
    appState.queue = shuffle(appState.queue);
    appState.currentIndex = 0;
    render();
  });

  dom.resetProgressButton.addEventListener("click", () => {
    storage.progress = {};
    saveStorage();
    buildQueue();
  });

  dom.themeToggleButton.addEventListener("click", () => {
    appState.theme = appState.theme === "light" ? "dark" : "light";
    saveStorage();
    applyTheme();
  });

  dom.prevCardButton.addEventListener("click", () => moveCard(-1));
  dom.nextCardButton.addEventListener("click", () => moveCard(1));
  dom.flipButton.addEventListener("click", flipCard);
  dom.card.addEventListener("click", flipCard);
  dom.speakButton.addEventListener("click", speakCurrentCard);
  dom.generateSentenceButton.addEventListener("click", () => {
    appState.currentSentenceSeed += 1;
    renderGeneratedSentence(currentCard());
  });
  dom.checkQuizButton.addEventListener("click", checkQuiz);
  dom.newQuizButton.addEventListener("click", renderQuiz);

  document.querySelectorAll(".review-button").forEach((button) => {
    button.addEventListener("click", () => rateCard(button.dataset.rating));
  });

  dom.quizOptions.addEventListener("click", (event) => {
    const button = event.target.closest(".quiz-option");
    if (!button) return;
    appState.selectedQuizAnswer = Number(button.dataset.index);
    [...dom.quizOptions.querySelectorAll(".quiz-option")].forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
}

function init() {
  populateLessonSelector();
  updateSetSelector();
  dom.studyModeSelector.value = appState.promptMode;
  dom.queueSelector.value = appState.queueMode;
  bindEvents();
  buildQueue();
}

init();
