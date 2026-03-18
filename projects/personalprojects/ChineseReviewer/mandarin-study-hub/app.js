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
      uses: ["å¤©æ°£", "å†·"],
      hanzi: "ä»Šå¤©å¤©æ°£å¾ˆå†·ã€‚",
      pinyin: "JÄ«ntiÄn tiÄnqÃ¬ hÄ›n lÄ›ng.",
      english: "The weather is cold today."
    },
    {
      uses: ["æ¯”", "æ›´", "æš–å’Œ"],
      hanzi: "æ˜Žå¤©æ¯”ä»Šå¤©æ›´æš–å’Œã€‚",
      pinyin: "MÃ­ngtiÄn bÇ jÄ«ntiÄn gÃ¨ng nuÇŽnhuo.",
      english: "Tomorrow will be even warmer than today."
    },
    {
      uses: ["ä¸‹é›ª", "å…¬åœ’"],
      hanzi: "å¦‚æžœä¸‹é›ªï¼Œæˆ‘å€‘å°±ä¸åŽ»å…¬åœ’äº†ã€‚",
      pinyin: "RÃºguÇ’ xiÃ  xuÄ›, wÇ’men jiÃ¹ bÃº qÃ¹ gÅngyuÃ¡n le.",
      english: "If it snows, we will not go to the park."
    },
    {
      uses: ["é å ±", "ç¶²ä¸Š"],
      hanzi: "æˆ‘å‰›æ‰åœ¨ç¶²ä¸Šçœ‹äº†å¤©æ°£é å ±ã€‚",
      pinyin: "WÇ’ gÄngcÃ¡i zÃ i wÇŽngshang kÃ n le tiÄnqÃ¬ yÃ¹bÃ o.",
      english: "I just checked the weather forecast online."
    },
    {
      uses: ["ä¸ä½†...è€Œä¸”...", "æš–å’Œ"],
      hanzi: "æ˜Žå¤©ä¸ä½†ä¸å†·ï¼Œè€Œä¸”å¾ˆæš–å’Œã€‚",
      pinyin: "MÃ­ngtiÄn bÃºdÃ n bÃ¹ lÄ›ng, Ã©rqiÄ› hÄ›n nuÇŽnhuo.",
      english: "Tomorrow will not only be not cold, but also quite warm."
    }
  ],
  L12: [
    {
      uses: ["é»žèœ", "é¤ƒå­", "é…¸è¾£æ¹¯"],
      hanzi: "æˆ‘å€‘å…ˆé»žä¸€ç›¤é¤ƒå­ï¼Œå†é»žä¸€ç¢—é…¸è¾£æ¹¯ã€‚",
      pinyin: "WÇ’men xiÄn diÇŽn yÃ¬ pÃ¡n jiÇŽozi, zÃ i diÇŽn yÃ¬ wÇŽn suÄnlÃ tÄng.",
      english: "Let us order a plate of dumplings first, then a bowl of hot and sour soup."
    },
    {
      uses: ["å¥½åƒ", "é­š"],
      hanzi: "é€™å€‹é­šå¾ˆå¥½åƒã€‚",
      pinyin: "ZhÃ¨ge yÃº hÄ›n hÇŽochÄ«.",
      english: "This fish is delicious."
    },
    {
      uses: ["è¾£", "æ¹¯"],
      hanzi: "é€™å€‹æ¹¯æœ‰ä¸€é»žè¾£ã€‚",
      pinyin: "ZhÃ¨ge tÄng yÇ’u yÃ¬diÇŽn lÃ .",
      english: "This soup is a little spicy."
    },
    {
      uses: ["æ¸´", "å†°èŒ¶"],
      hanzi: "æˆ‘æœ‰ä¸€é»žæ¸´ï¼Œæƒ³å–å†°èŒ¶ã€‚",
      pinyin: "WÇ’ yÇ’u yÃ¬diÇŽn kÄ›, xiÇŽng hÄ“ bÄ«ngchÃ¡.",
      english: "I am a little thirsty and want to drink iced tea."
    },
    {
      uses: ["è³£å®Œ", "é’èœ"],
      hanzi: "é’èœå‰›å‰›è³£å®Œäº†ã€‚",
      pinyin: "QÄ«ngcÃ i gÄnggÄng mÃ i wÃ¡n le.",
      english: "The green vegetables were just sold out."
    }
  ],
  L13: [
    {
      uses: ["æ›¸åº—", "æ—é‚Š"],
      hanzi: "æ›¸åº—åœ¨é‹å‹•å ´æ—é‚Šã€‚",
      pinyin: "ShÅ«diÃ n zÃ i yÃ¹ndÃ²ngchÇŽng pÃ¡ngbiÄn.",
      english: "The bookstore is next to the sports field."
    },
    {
      uses: ["é›¢", "è¿‘"],
      hanzi: "ä¸­åœ‹åŸŽé›¢é€™è£¡ä¸é ï¼Œå¾ˆè¿‘ã€‚",
      pinyin: "ZhÅngguÃ³chÃ©ng lÃ­ zhÃ¨lÇ bÃ¹ yuÇŽn, hÄ›n jÃ¬n.",
      english: "Chinatown is not far from here; it is quite close."
    },
    {
      uses: ["å¾ž", "ä¸€ç›´", "å¾€", "å—"],
      hanzi: "å¾žé€™è£¡ä¸€ç›´å¾€å—èµ°ã€‚",
      pinyin: "CÃ³ng zhÃ¨lÇ yÃ¬zhÃ­ wÇŽng nÃ¡n zÇ’u.",
      english: "Go straight south from here."
    },
    {
      uses: ["è·¯å£", "å³", "å·¦"],
      hanzi: "åˆ°äº†è·¯å£å…ˆå¾€å³æ‹ï¼Œå†å¾€å·¦èµ°ã€‚",
      pinyin: "DÃ o le lÃ¹kÇ’u xiÄn wÇŽng yÃ²u guÇŽi, zÃ i wÇŽng zuÇ’ zÇ’u.",
      english: "When you reach the intersection, turn right first, then go left."
    },
    {
      uses: ["å‰é¢", "ç´…ç¶ ç‡ˆ"],
      hanzi: "å‰é¢æœ‰ä¸€å€‹ç´…ç¶ ç‡ˆã€‚",
      pinyin: "QiÃ¡nmiÃ n yÇ’u yÃ­ ge hÃ³nglÇœdÄ“ng.",
      english: "There is a traffic light up ahead."
    }
  ],
  L14: [
    {
      uses: ["ç”Ÿæ—¥æ™šæœƒ", "ç¦®ç‰©"],
      hanzi: "æˆ‘æƒ³å¸¶ä¸€å€‹ç¦®ç‰©åŽ»ç”Ÿæ—¥æ™šæœƒã€‚",
      pinyin: "WÇ’ xiÇŽng dÃ i yÃ­ ge lÇwÃ¹ qÃ¹ shÄ“ngrÃ¬ wÇŽnhuÃ¬.",
      english: "I want to bring a gift to the birthday party."
    },
    {
      uses: ["æ°´æžœ", "è›‹ç³•"],
      hanzi: "æ¡Œä¸Šæœ‰æ°´æžœï¼Œä¹Ÿæœ‰è›‹ç³•ã€‚",
      pinyin: "ZhuÅ shÃ ng yÇ’u shuÇguÇ’, yÄ› yÇ’u dÃ ngÄo.",
      english: "There is fruit on the table, and there is cake too."
    },
    {
      uses: ["æœ€", "å¯æ„›"],
      hanzi: "å¤§å®¶éƒ½è¦ºå¾—é‚£å€‹å­©å­æœ€å¯æ„›ã€‚",
      pinyin: "DÃ jiÄ dÅu juÃ©de nÃ ge hÃ¡izi zuÃ¬ kÄ›'Ã i.",
      english: "Everyone thinks that child is the cutest."
    },
    {
      uses: ["åƒ", "è‡‰", "åœ“"],
      hanzi: "å¥¹çš„è‡‰å¾ˆåœ“ï¼Œçœ‹èµ·ä¾†åƒå¥¹åª½åª½ã€‚",
      pinyin: "TÄ de liÇŽn hÄ›n yuÃ¡n, kÃ n qÇlÃ¡i xiÃ ng tÄ mÄma.",
      english: "Her face is round, and she looks like her mother."
    },
    {
      uses: ["é€", "èŠ±"],
      hanzi: "ä»–æƒ³é€å¥¹ä¸€æŠŠèŠ±ã€‚",
      pinyin: "TÄ xiÇŽng sÃ²ng tÄ yÃ¬ bÇŽ huÄ.",
      english: "He wants to give her a bouquet of flowers."
    }
  ],
  L15: [
    {
      uses: ["è‚šå­", "ç–¼"],
      hanzi: "æˆ‘è‚šå­å¾ˆç–¼ï¼Œä»Šå¤©ä¸å¤ªèˆ’æœã€‚",
      pinyin: "WÇ’ dÃ¹zi hÄ›n tÃ©ng, jÄ«ntiÄn bÃº tÃ i shÅ«fu.",
      english: "My stomach hurts a lot, and I do not feel very well today."
    },
    {
      uses: ["æœ€å¥½", "ä¼‘æ¯"],
      hanzi: "ä½ æœ€å¥½å…ˆä¼‘æ¯ä¸€ä¸‹ã€‚",
      pinyin: "NÇ zuÃ¬hÇŽo xiÄn xiÅ«xi yÃ­xiÃ .",
      english: "You had better rest for a bit first."
    },
    {
      uses: ["æŠŠ", "è—¥"],
      hanzi: "ä½ å…ˆæŠŠè—¥åƒäº†ï¼Œå†å›žåŽ»ä¼‘æ¯ã€‚",
      pinyin: "NÇ xiÄn bÇŽ yÃ o chÄ« le, zÃ i huÃ­ qÃ¹ xiÅ«xi.",
      english: "Take the medicine first, then go back and rest."
    },
    {
      uses: ["ç™¼ç‡’", "é†«é™¢"],
      hanzi: "å¦‚æžœä½ ç™¼ç‡’äº†ï¼Œå°±åŽ»é†«é™¢çœ‹ç—…ã€‚",
      pinyin: "RÃºguÇ’ nÇ fÄshÄo le, jiÃ¹ qÃ¹ yÄ«yuÃ n kÃ nbÃ¬ng.",
      english: "If you get a fever, then go to the hospital to see a doctor."
    },
    {
      uses: ["éŽæ•", "è—¥åº—"],
      hanzi: "ä»–å°èŠ±ç²‰éŽæ•ï¼Œæ‰€ä»¥å…ˆåŽ»è—¥åº—ã€‚",
      pinyin: "TÄ duÃ¬ huÄfÄ›n guÃ²mÇn, suÇ’yÇ xiÄn qÃ¹ yÃ odiÃ n.",
      english: "He is allergic to pollen, so he is going to the pharmacy first."
    }
  ],
  L16: [
    {
      uses: ["å¾Œå¤©", "é›»å½±"],
      hanzi: "æˆ‘å€‘å¾Œå¤©ä¸€èµ·åŽ»çœ‹é›»å½±å§ã€‚",
      pinyin: "WÇ’men hÃ²utiÄn yÃ¬qÇ qÃ¹ kÃ n diÃ nyÇng ba.",
      english: "Let us go watch a movie together the day after tomorrow."
    },
    {
      uses: ["å°è±¡", "å¥½"],
      hanzi: "é‚£éƒ¨é›»å½±çµ¦æˆ‘çš„å°è±¡å¾ˆå¥½ã€‚",
      pinyin: "NÃ  bÃ¹ diÃ nyÇng gÄ›i wÇ’ de yÃ¬nxiÃ ng hÄ›n hÇŽo.",
      english: "That movie left a very good impression on me."
    },
    {
      uses: ["å°±", "å€†"],
      hanzi: "ä»Šå¤©å°±æˆ‘å€‘å€†åŽ»ã€‚",
      pinyin: "JÄ«ntiÄn jiÃ¹ wÇ’men liÇŽ qÃ¹.",
      english: "Today it will be just the two of us going."
    },
    {
      uses: ["è¨˜å¾—", "è™Ÿç¢¼"],
      hanzi: "ä½ é‚„è¨˜å¾—ä»–çš„è™Ÿç¢¼å—Žï¼Ÿ",
      pinyin: "NÇ hÃ¡i jÃ¬de tÄ de hÃ omÇŽ ma?",
      english: "Do you still remember his number?"
    },
    {
      uses: ["ä¸€è¨€ç‚ºå®š"],
      hanzi: "å¥½ï¼Œå¾Œå¤©è¦‹ï¼Œä¸€è¨€ç‚ºå®šã€‚",
      pinyin: "HÇŽo, hÃ²utiÄn jiÃ n, yÃ¬ yÃ¡n wÃ©i dÃ¬ng.",
      english: "Okay, see you the day after tomorrow. It is settled."
    }
  ],
  L17: [
    {
      uses: ["å…¬å¯“", "ä¹¾æ·¨"],
      hanzi: "é€™å¥—å…¬å¯“å¾ˆä¹¾æ·¨ï¼Œä¹Ÿå¾ˆå®‰éœã€‚",
      pinyin: "ZhÃ¨ tÃ o gÅngyÃ¹ hÄ›n gÄnjÃ¬ng, yÄ› hÄ›n ÄnjÃ¬ng.",
      english: "This apartment is very clean and also very quiet."
    },
    {
      uses: ["å®¢å»³", "è‡¥å®¤", "å»šæˆ¿"],
      hanzi: "é€™å€‹æˆ¿å­æœ‰å®¢å»³ã€è‡¥å®¤å’Œå»šæˆ¿ã€‚",
      pinyin: "ZhÃ¨ge fÃ¡ngzi yÇ’u kÃ¨tÄ«ng, wÃ²shÃ¬ hÃ© chÃºfÃ¡ng.",
      english: "This place has a living room, a bedroom, and a kitchen."
    },
    {
      uses: ["æˆ¿ç§Ÿ", "æŠ¼é‡‘"],
      hanzi: "æˆ¿ç§Ÿä¸å¤ªè²´ï¼Œä½†æ˜¯è¦å…ˆä»˜æŠ¼é‡‘ã€‚",
      pinyin: "FÃ¡ngzÅ« bÃº tÃ i guÃ¬, dÃ nshÃ¬ yÃ o xiÄn fÃ¹ yÄjÄ«n.",
      english: "The rent is not too expensive, but you need to pay the deposit first."
    },
    {
      uses: ["å‡†", "å¯µç‰©"],
      hanzi: "é€™è£¡ä¸å‡†é¤Šå¯µç‰©ã€‚",
      pinyin: "ZhÃ¨lÇ bÃ¹ zhÇ”n yÇŽng chÇ’ngwÃ¹.",
      english: "Pets are not allowed here."
    },
    {
      uses: ["å·®ä¸å¤š", "äººæ°‘å¹£"],
      hanzi: "é€™å€‹æˆ¿ç§Ÿå·®ä¸å¤šä¸€åƒäººæ°‘å¹£ã€‚",
      pinyin: "ZhÃ¨ge fÃ¡ngzÅ« chÃ buduÅ yÃ¬ qiÄn rÃ©nmÃ­nbÃ¬.",
      english: "The rent is about one thousand RMB."
    }
  ],
  L18: [
    {
      uses: ["è·‘æ­¥", "ç°¡å–®"],
      hanzi: "è·‘æ­¥å¾ˆç°¡å–®ï¼Œå¯æ˜¯è¦æ¯å¤©åšã€‚",
      pinyin: "PÇŽobÃ¹ hÄ›n jiÇŽndÄn, kÄ›shÃ¬ yÃ o mÄ›itiÄn zuÃ².",
      english: "Jogging is simple, but you need to do it every day."
    },
    {
      uses: ["æ¸¸æ³³", "å±éšª"],
      hanzi: "ä¸æœƒæ¸¸æ³³çš„æ™‚å€™ï¼Œä¸‹æ°´å¾ˆå±éšªã€‚",
      pinyin: "BÃº huÃ¬ yÃ³uyÇ’ng de shÃ­hou, xiÃ  shuÇ hÄ›n wÄ“ixiÇŽn.",
      english: "When you do not know how to swim, getting in the water is dangerous."
    },
    {
      uses: ["è¶³çƒ", "æ¯”è³½"],
      hanzi: "ä»–æ¯å€‹æ˜ŸæœŸéƒ½çœ‹è¶³çƒæ¯”è³½ã€‚",
      pinyin: "TÄ mÄ›i ge xÄ«ngqÃ­ dÅu kÃ n zÃºqiÃº bÇsÃ i.",
      english: "He watches soccer matches every week."
    },
    {
      uses: ["æ‡‰è©²", "é‹å‹•æœ"],
      hanzi: "ä½ æ‡‰è©²å…ˆæ›ä¸Šé‹å‹•æœã€‚",
      pinyin: "NÇ yÄ«nggÄi xiÄn huÃ n shÃ ng yÃ¹ndÃ²ngfÃº.",
      english: "You should put on sportswear first."
    },
    {
      uses: ["åŠå¤©", "ç´¯"],
      hanzi: "æˆ‘æ‰“äº†åŠå¤©çƒï¼Œç¾åœ¨å¾ˆç´¯ã€‚",
      pinyin: "WÇ’ dÇŽ le bÃ ntiÄn qiÃº, xiÃ nzÃ i hÄ›n lÃ¨i.",
      english: "I played ball for a long time, and now I am tired."
    }
  ],
  L19: [
    {
      uses: ["æ‰“ç®—", "æ—…è¡Œ"],
      hanzi: "æˆ‘æš‘å‡æ‰“ç®—åŽ»åŒ—äº¬æ—…è¡Œã€‚",
      pinyin: "WÇ’ shÇ”jiÃ  dÇŽsuÃ n qÃ¹ BÄ›ijÄ«ng lÇšxÃ­ng.",
      english: "I plan to travel to Beijing during summer vacation."
    },
    {
      uses: ["è­·ç…§", "ç°½è­‰"],
      hanzi: "å‡ºåœ‹ä»¥å‰è¦å…ˆæº–å‚™è­·ç…§å’Œç°½è­‰ã€‚",
      pinyin: "ChÅ«guÃ³ yÇqiÃ¡n yÃ o xiÄn zhÇ”nbÃ¨i hÃ¹zhÃ o hÃ© qiÄnzhÃ¨ng.",
      english: "Before going abroad, you need to prepare your passport and visa first."
    },
    {
      uses: ["å°ŽéŠ", "é•·åŸŽ"],
      hanzi: "å°ŽéŠæ˜Žå¤©æœƒå¸¶æˆ‘å€‘åŽ»é•·åŸŽã€‚",
      pinyin: "DÇŽoyÃ³u mÃ­ngtiÄn huÃ¬ dÃ i wÇ’men qÃ¹ ChÃ¡ngchÃ©ng.",
      english: "The tour guide will take us to the Great Wall tomorrow."
    },
    {
      uses: ["èˆªç­", "ç›´é£›"],
      hanzi: "é€™å€‹èˆªç­å¯ä»¥ç›´é£›åŒ—äº¬ã€‚",
      pinyin: "ZhÃ¨ge hÃ¡ngbÄn kÄ›yÇ zhÃ­fÄ“i BÄ›ijÄ«ng.",
      english: "This flight can go directly to Beijing."
    },
    {
      uses: ["æ—…é¤¨", "è¨‚"],
      hanzi: "æˆ‘å·²ç¶“è¨‚å¥½äº†æ—…é¤¨ã€‚",
      pinyin: "WÇ’ yÇjÄ«ng dÃ¬ng hÇŽo le lÇšguÇŽn.",
      english: "I have already booked the hotel."
    }
  ],
  L20: [
    {
      uses: ["è¡ŒæŽ", "æ‰˜é‹"],
      hanzi: "é€™å…©ä»¶è¡ŒæŽéƒ½è¦æ‰˜é‹ã€‚",
      pinyin: "ZhÃ¨ liÇŽng jiÃ n xÃ­ngli dÅu yÃ o tuÅyÃ¹n.",
      english: "Both of these pieces of luggage need to be checked."
    },
    {
      uses: ["ç®±å­", "è¶…é‡"],
      hanzi: "é€™å€‹ç®±å­å¤ªé‡äº†ï¼Œå·²ç¶“è¶…é‡äº†ã€‚",
      pinyin: "ZhÃ¨ge xiÄngzi tÃ i zhÃ²ng le, yÇjÄ«ng chÄozhÃ²ng le.",
      english: "This suitcase is too heavy; it is already overweight."
    },
    {
      uses: ["ç™»æ©Ÿç‰Œ", "ç™»æ©Ÿå£"],
      hanzi: "è«‹å…ˆçœ‹ç™»æ©Ÿç‰Œï¼Œå†åŽ»ç™»æ©Ÿå£ã€‚",
      pinyin: "QÇng xiÄn kÃ n dÄ“ngjÄ«pÃ¡i, zÃ i qÃ¹ dÄ“ngjÄ«kÇ’u.",
      english: "Please check the boarding pass first, then go to the gate."
    },
    {
      uses: ["ç…§é¡§", "å°å¿ƒ"],
      hanzi: "è·¯ä¸Šå°å¿ƒï¼Œä¹Ÿè¦ç…§é¡§å¥½è‡ªå·±ã€‚",
      pinyin: "LÃ¹shÃ ng xiÇŽoxÄ«n, yÄ› yÃ o zhÃ ogÃ¹ hÇŽo zÃ¬jÇ.",
      english: "Be careful on the way, and take good care of yourself too."
    },
    {
      uses: ["ä¸€è·¯å¹³å®‰", "æ­¡è¿Ž"],
      hanzi: "ç¥ä½ ä¸€è·¯å¹³å®‰ï¼Œåˆ°äº†åŒ—äº¬å¤§å®¶éƒ½æ­¡è¿Žä½ ã€‚",
      pinyin: "ZhÃ¹ nÇ yÃ­ lÃ¹ pÃ­ng'Än, dÃ o le BÄ›ijÄ«ng dÃ jiÄ dÅu huÄnyÃ­ng nÇ.",
      english: "Have a safe trip; everyone will welcome you when you arrive in Beijing."
    }
  ]
};

const hiddenSentenceDatabase = {
  helperWords: [
    { char: "æˆ‘", pinyin: "wÇ’", english: "I" },
    { char: "ä½ ", pinyin: "nÇ", english: "you" },
    { char: "ä»–", pinyin: "tÄ", english: "he" },
    { char: "å¥¹", pinyin: "tÄ", english: "she" },
    { char: "å®ƒ", pinyin: "tÄ", english: "it" },
    { char: "æˆ‘å€‘", pinyin: "wÇ’men", english: "we" },
    { char: "ä½ å€‘", pinyin: "nÇmen", english: "you plural" },
    { char: "ä»–å€‘", pinyin: "tÄmen", english: "they" },
    { char: "å¤§å®¶", pinyin: "dÃ jiÄ", english: "everyone" },
    { char: "èª°", pinyin: "shÃ©i", english: "who" },
    { char: "ä»€éº¼", pinyin: "shÃ©nme", english: "what" },
    { char: "å“ª", pinyin: "nÇŽ", english: "which" },
    { char: "å“ªè£¡", pinyin: "nÇŽlÇ", english: "where" },
    { char: "å¹¾", pinyin: "jÇ", english: "how many" },
    { char: "æ€Žéº¼", pinyin: "zÄ›nme", english: "how" },
    { char: "ç‚ºä»€éº¼", pinyin: "wÃ¨ishÃ©nme", english: "why" },
    { char: "ä»Šå¤©", pinyin: "jÄ«ntiÄn", english: "today" },
    { char: "æ˜Žå¤©", pinyin: "mÃ­ngtiÄn", english: "tomorrow" },
    { char: "æ˜¨å¤©", pinyin: "zuÃ³tiÄn", english: "yesterday" },
    { char: "å‰å¤©", pinyin: "qiÃ¡ntiÄn", english: "the day before yesterday" },
    { char: "å¾Œå¤©", pinyin: "hÃ²utiÄn", english: "the day after tomorrow" },
    { char: "ç¾åœ¨", pinyin: "xiÃ nzÃ i", english: "now" },
    { char: "æ—©ä¸Š", pinyin: "zÇŽoshang", english: "morning" },
    { char: "ä¸­åˆ", pinyin: "zhÅngwÇ”", english: "noon" },
    { char: "ä¸‹åˆ", pinyin: "xiÃ wÇ”", english: "afternoon" },
    { char: "æ™šä¸Š", pinyin: "wÇŽnshang", english: "evening" },
    { char: "æ˜ŸæœŸ", pinyin: "xÄ«ngqÄ«", english: "week" },
    { char: "æ˜ŸæœŸä¸€", pinyin: "xÄ«ngqÄ«yÄ«", english: "Monday" },
    { char: "æ˜ŸæœŸäºŒ", pinyin: "xÄ«ngqÄ«'Ã¨r", english: "Tuesday" },
    { char: "æ˜ŸæœŸä¸‰", pinyin: "xÄ«ngqÄ«sÄn", english: "Wednesday" },
    { char: "æ˜ŸæœŸå››", pinyin: "xÄ«ngqÄ«sÃ¬", english: "Thursday" },
    { char: "æ˜ŸæœŸäº”", pinyin: "xÄ«ngqÄ«wÇ”", english: "Friday" },
    { char: "æ˜ŸæœŸå…­", pinyin: "xÄ«ngqÄ«liÃ¹", english: "Saturday" },
    { char: "æ˜ŸæœŸå¤©", pinyin: "xÄ«ngqÄ«tiÄn", english: "Sunday" },
    { char: "æ˜ŸæœŸæ—¥", pinyin: "xÄ«ngqÄ«rÃ¬", english: "Sunday" },
    { char: "æœˆ", pinyin: "yuÃ¨", english: "month" },
    { char: "ä¸€æœˆ", pinyin: "yÄ«yuÃ¨", english: "January" },
    { char: "äºŒæœˆ", pinyin: "Ã¨ryuÃ¨", english: "February" },
    { char: "ä¸‰æœˆ", pinyin: "sÄnyuÃ¨", english: "March" },
    { char: "å››æœˆ", pinyin: "sÃ¬yuÃ¨", english: "April" },
    { char: "äº”æœˆ", pinyin: "wÇ”yuÃ¨", english: "May" },
    { char: "å…­æœˆ", pinyin: "liÃ¹yuÃ¨", english: "June" },
    { char: "ä¸ƒæœˆ", pinyin: "qÄ«yuÃ¨", english: "July" },
    { char: "å…«æœˆ", pinyin: "bÄyuÃ¨", english: "August" },
    { char: "ä¹æœˆ", pinyin: "jiÇ”yuÃ¨", english: "September" },
    { char: "åæœˆ", pinyin: "shÃ­yuÃ¨", english: "October" },
    { char: "åä¸€æœˆ", pinyin: "shÃ­yÄ«yuÃ¨", english: "November" },
    { char: "åäºŒæœˆ", pinyin: "shÃ­'Ã¨ryuÃ¨", english: "December" },
    { char: "è™Ÿ", pinyin: "hÃ o", english: "day of month" },
    { char: "æ™‚å€™", pinyin: "shÃ­hou", english: "time; moment" },
    { char: "æ™‚é–“", pinyin: "shÃ­jiÄn", english: "time" },
    { char: "é€™è£¡", pinyin: "zhÃ¨lÇ", english: "here" },
    { char: "é‚£è£¡", pinyin: "nÃ lÇ", english: "there" },
    { char: "é€™å€‹", pinyin: "zhÃ¨ge", english: "this" },
    { char: "é‚£å€‹", pinyin: "nÃ ge", english: "that" },
    { char: "è£¡", pinyin: "lÇ", english: "inside" },
    { char: "å¤–é¢", pinyin: "wÃ imiÃ n", english: "outside" },
    { char: "å‰é¢", pinyin: "qiÃ¡nmiÃ n", english: "in front" },
    { char: "å¾Œé¢", pinyin: "hÃ²umiÃ n", english: "behind" },
    { char: "æ—é‚Š", pinyin: "pÃ¡ngbiÄn", english: "beside" },
    { char: "ä¸Šé¢", pinyin: "shÃ ngmiÃ n", english: "above" },
    { char: "ä¸‹é¢", pinyin: "xiÃ miÃ n", english: "below" },
    { char: "å­¸æ ¡", pinyin: "xuÃ©xiÃ o", english: "school" },
    { char: "å®¶", pinyin: "jiÄ", english: "home" },
    { char: "æ•™å®¤", pinyin: "jiÃ oshÃ¬", english: "classroom" },
    { char: "å•†åº—", pinyin: "shÄngdiÃ n", english: "store" },
    { char: "è·¯", pinyin: "lÃ¹", english: "road" },
    { char: "åœ°æ–¹", pinyin: "dÃ¬fang", english: "place" },
    { char: "åŒ—äº¬", pinyin: "BÄ›ijÄ«ng", english: "Beijing" },
    { char: "ä¸­æ–‡", pinyin: "ZhÅngwÃ©n", english: "Chinese language" },
    { char: "æœ‹å‹", pinyin: "pÃ©ngyou", english: "friend" },
    { char: "è€å¸«", pinyin: "lÇŽoshÄ«", english: "teacher" },
    { char: "å­¸ç”Ÿ", pinyin: "xuÃ©sheng", english: "student" },
    { char: "åª½åª½", pinyin: "mÄma", english: "mother" },
    { char: "çˆ¸çˆ¸", pinyin: "bÃ ba", english: "father" },
    { char: "å¾ˆ", pinyin: "hÄ›n", english: "very" },
    { char: "ä¸€", pinyin: "yÄ«", english: "one" },
    { char: "äºŒ", pinyin: "Ã¨r", english: "two" },
    { char: "ä¸‰", pinyin: "sÄn", english: "three" },
    { char: "å››", pinyin: "sÃ¬", english: "four" },
    { char: "äº”", pinyin: "wÇ”", english: "five" },
    { char: "å…­", pinyin: "liÃ¹", english: "six" },
    { char: "ä¸ƒ", pinyin: "qÄ«", english: "seven" },
    { char: "å…«", pinyin: "bÄ", english: "eight" },
    { char: "ä¹", pinyin: "jiÇ”", english: "nine" },
    { char: "å", pinyin: "shÃ­", english: "ten" },
    { char: "å…©", pinyin: "liÇŽng", english: "two for counting" },
    { char: "ç™¾", pinyin: "bÇŽi", english: "hundred" },
    { char: "åƒ", pinyin: "qiÄn", english: "thousand" },
    { char: "çœŸ", pinyin: "zhÄ“n", english: "really" },
    { char: "å¤ª", pinyin: "tÃ i", english: "too; very" },
    { char: "æœ‰ä¸€é»ž", pinyin: "yÇ’u yÃ¬diÇŽn", english: "a little" },
    { char: "æ¯”è¼ƒ", pinyin: "bÇjiÃ o", english: "relatively; comparatively" },
    { char: "ä¹Ÿ", pinyin: "yÄ›", english: "also" },
    { char: "éƒ½", pinyin: "dÅu", english: "all" },
    { char: "é‚„", pinyin: "hÃ¡i", english: "still; also" },
    { char: "å†", pinyin: "zÃ i", english: "again; then" },
    { char: "å°±", pinyin: "jiÃ¹", english: "then; just" },
    { char: "æ‰", pinyin: "cÃ¡i", english: "only then" },
    { char: "å…ˆ", pinyin: "xiÄn", english: "first" },
    { char: "å†", pinyin: "zÃ i", english: "then again" },
    { char: "ä¸€èµ·", pinyin: "yÃ¬qÇ", english: "together" },
    { char: "å› ç‚º", pinyin: "yÄ«nwÃ¨i", english: "because" },
    { char: "æ‰€ä»¥", pinyin: "suÇ’yÇ", english: "so; therefore" },
    { char: "ä½†æ˜¯", pinyin: "dÃ nshÃ¬", english: "but" },
    { char: "å¦‚æžœ", pinyin: "rÃºguÇ’", english: "if" },
    { char: "è·Ÿ", pinyin: "gÄ“n", english: "with" },
    { char: "å’Œ", pinyin: "hÃ©", english: "and" },
    { char: "çµ¦", pinyin: "gÄ›i", english: "give; for" },
    { char: "åœ¨", pinyin: "zÃ i", english: "at; in" },
    { char: "å¾ž", pinyin: "cÃ³ng", english: "from" },
    { char: "åˆ°", pinyin: "dÃ o", english: "arrive; to" },
    { char: "å¾€", pinyin: "wÇŽng", english: "toward" },
    { char: "å¯ä»¥", pinyin: "kÄ›yÇ", english: "can; may" },
    { char: "æœƒ", pinyin: "huÃ¬", english: "will; can" },
    { char: "æ‡‰è©²", pinyin: "yÄ«nggÄi", english: "should" },
    { char: "æƒ³", pinyin: "xiÇŽng", english: "want; think" },
    { char: "åŽ»", pinyin: "qÃ¹", english: "go" },
    { char: "ä¾†", pinyin: "lÃ¡i", english: "come" },
    { char: "çœ‹", pinyin: "kÃ n", english: "look; watch" },
    { char: "å­¸", pinyin: "xuÃ©", english: "study" },
    { char: "è²·", pinyin: "mÇŽi", english: "buy" },
    { char: "åƒ", pinyin: "chÄ«", english: "eat" },
    { char: "å–", pinyin: "hÄ“", english: "drink" },
    { char: "èªª", pinyin: "shuÅ", english: "speak; say" },
    { char: "è½", pinyin: "tÄ«ng", english: "listen" },
    { char: "å¯«", pinyin: "xiÄ›", english: "write" },
    { char: "è®€", pinyin: "dÃº", english: "read" },
    { char: "åš", pinyin: "zuÃ²", english: "do; make" },
    { char: "ç”¨", pinyin: "yÃ²ng", english: "use" },
    { char: "å¸¶", pinyin: "dÃ i", english: "bring" },
    { char: "èµ°", pinyin: "zÇ’u", english: "walk; leave" },
    { char: "å›ž", pinyin: "huÃ­", english: "return" },
    { char: "ä½", pinyin: "zhÃ¹", english: "live" },
    { char: "ç­‰", pinyin: "dÄ›ng", english: "wait" },
    { char: "æ‰¾", pinyin: "zhÇŽo", english: "look for" },
    { char: "å–œæ­¡", pinyin: "xÇhuan", english: "like" },
    { char: "è¦ºå¾—", pinyin: "juÃ©de", english: "feel; think" },
    { char: "çŸ¥é“", pinyin: "zhÄ«dÃ o", english: "know" },
    { char: "èªè­˜", pinyin: "rÃ¨nshi", english: "know; be acquainted with" },
    { char: "æº–å‚™", pinyin: "zhÇ”nbÃ¨i", english: "prepare" },
    { char: "æœ‰", pinyin: "yÇ’u", english: "have; there is" },
    { char: "æ²’æœ‰", pinyin: "mÃ©iyÇ’u", english: "not have; did not" },
    { char: "æ˜¯", pinyin: "shÃ¬", english: "to be" },
    { char: "ä¸æ˜¯", pinyin: "bÃº shÃ¬", english: "is not" },
    { char: "å¥½", pinyin: "hÇŽo", english: "good" },
    { char: "å¤§", pinyin: "dÃ ", english: "big" },
    { char: "å°", pinyin: "xiÇŽo", english: "small" },
    { char: "å¤š", pinyin: "duÅ", english: "many; much" },
    { char: "å°‘", pinyin: "shÇŽo", english: "few; little" },
    { char: "é«˜", pinyin: "gÄo", english: "tall; high" },
    { char: "æ–°", pinyin: "xÄ«n", english: "new" },
    { char: "è€", pinyin: "lÇŽo", english: "old" },
    { char: "å¿«", pinyin: "kuÃ i", english: "fast" },
    { char: "æ…¢", pinyin: "mÃ n", english: "slow" },
    { char: "å¿™", pinyin: "mÃ¡ng", english: "busy" },
    { char: "ç´¯", pinyin: "lÃ¨i", english: "tired" },
    { char: "é«˜èˆˆ", pinyin: "gÄoxÃ¬ng", english: "happy" },
    { char: "å–œæ­¡", pinyin: "xÇhuan", english: "to like" },
    { char: "æ²’æœ‰é—œä¿‚", pinyin: "mÃ©i yÇ’u guÄnxi", english: "it does not matter" },
    { char: "äº†", pinyin: "le", english: "completed action particle" }
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

function cleanMeaningText(english) {
  return english
    .split(";")[0]
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function bareVerbText(english) {
  return cleanMeaningText(english).replace(/^to\s+/i, "").trim();
}

function capitalizeText(text) {
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : text;
}

function isProperEnglishLabel(text) {
  return /^[A-Z][A-Za-z]*(?:[ -][A-Z][A-Za-z]*)*$/.test(text);
}

function needsArticle(text) {
  return !(
    isProperEnglishLabel(text) ||
    /^(weather|homework|furniture|rice|beef|tofu|tea|coffee|water|sportswear|politics|culture|health|luggage|electricity|insurance|music)$/i.test(text) ||
    /s$/i.test(text)
  );
}

function withIndefiniteArticle(text) {
  if (!needsArticle(text)) return text;
  return /^[aeiou]/i.test(text) ? `an ${text}` : `a ${text}`;
}

function nounPhrase(english, article = "none") {
  const base = cleanMeaningText(english);
  if (article === "the") {
    if (needsArticle(base) && !/^the /i.test(base)) return `the ${base}`;
    return base;
  }

  if (article === "indefinite") {
    return withIndefiniteArticle(base);
  }

  return base;
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", appState.theme === "dark");
  dom.themeToggleButton.textContent = appState.theme === "light" ? "â˜¾" : "â˜€";
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

  const foodPartner = chooseRelatedWord(card, (item) => /(soup|dumplings|rice|tea|fish|beef|tofu|vegetable|fruit|duck|cake|cucumber|meal)/i.test(item.english), { char: "米飯", pinyin: "mǐfàn", english: "rice" });
  const templates = [];

  if (kind.isVerb) {
    templates.push(
      {
        hanzi: `我想${card.char}，可是今天沒有時間。`,
        pinyin: `Wǒ xiǎng ${card.pinyin}, kěshì jīntiān méiyǒu shíjiān.`,
        english: `I would like to ${bareVerbText(card.english)}, but I do not have time today.`
      },
      {
        hanzi: `我們明天可以一起${card.char}。`,
        pinyin: `Wǒmen míngtiān kěyǐ yìqǐ ${card.pinyin}.`,
        english: `We can ${bareVerbText(card.english)} together tomorrow.`
      }
    );
  }

  if (kind.isPlace) {
    templates.push(
      {
        hanzi: `${card.char}離${place.char}不遠。`,
        pinyin: `${card.pinyin} lí ${place.pinyin} bù yuǎn.`,
        english: `${capitalizeText(nounPhrase(card.english, "the"))} is not far from ${nounPhrase(place.english, "the")}.`
      },
      {
        hanzi: `我想去${card.char}看看。`,
        pinyin: `Wǒ xiǎng qù ${card.pinyin} kànkan.`,
        english: `I want to go to ${nounPhrase(card.english, "the")} and look around.`
      }
    );
  }

  if (kind.isFood) {
    templates.push(
      {
        hanzi: `今天我想吃${card.char}。`,
        pinyin: `Jīntiān wǒ xiǎng chī ${card.pinyin}.`,
        english: `I feel like eating ${nounPhrase(card.english)} today.`
      },
      {
        hanzi: `${card.char}和${foodPartner.char}都很受歡迎。`,
        pinyin: `${card.pinyin} hé ${foodPartner.pinyin} dōu hěn shòu huānyíng.`,
        english: `${capitalizeText(nounPhrase(card.english))} and ${nounPhrase(foodPartner.english)} are both popular choices.`
      }
    );
  }

  if (kind.isAdjective) {
    templates.push(
      {
        hanzi: `今天真的很${card.char}。`,
        pinyin: `Jīntiān zhēnde hěn ${card.pinyin}.`,
        english: `It is really ${cleanMeaningText(card.english)} today.`
      },
      {
        hanzi: `這裡又${card.char}又${adjective.char}。`,
        pinyin: `Zhèlǐ yòu ${card.pinyin} yòu ${adjective.pinyin}.`,
        english: `This place feels ${cleanMeaningText(card.english)} and ${cleanMeaningText(adjective.english)}.`
      }
    );
  }

  if (card.char === "比" || card.char === "更") {
    templates.push({
      hanzi: `今天比昨天${adjective.char}。`,
      pinyin: `Jīntiān bǐ zuótiān ${adjective.pinyin}.`,
      english: `Today is ${cleanMeaningText(adjective.english)} than yesterday.`
    });
  }

  if (card.char === "要不要") {
    templates.push({
      hanzi: `要不要去${place.char}看看？`,
      pinyin: `Yào bú yào qù ${place.pinyin} kànkan?`,
      english: `Do you want to go see ${nounPhrase(place.english, "the")}?`
    });
  }

  if (card.lessonId === "L18" && kind.isVerb) {
    templates.push({
      hanzi: `我三天沒有${card.char}了。`,
      pinyin: `Wǒ sān tiān méiyǒu ${card.pinyin} le.`,
      english: `I have not had a chance to ${bareVerbText(card.english)} in three days.`
    });
  }

  if (card.lessonId === "L15" && (card.char === "把" || kind.isVerb)) {
    templates.push({
      hanzi: `你先把${noun.char}${verb.char}好。`,
      pinyin: `Nǐ xiān bǎ ${noun.pinyin} ${verb.pinyin} hǎo.`,
      english: `First, ${bareVerbText(verb.english)} ${nounPhrase(noun.english, "the")} well.`
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

  const merged = uniqueBy([...exactMatches, ...englishMatches, ...dynamicMatches], (item) => item.hanzi)
    .filter((item) => item.hanzi.includes(card.char));
  if (merged.length) {
    return merged;
  }

  const pool = currentSetEntries().filter((item) => item.char !== card.char);
  const support = pool[appState.currentSentenceSeed % Math.max(1, pool.length)] || card;

  return [
    {
      hanzi: `${card.char}是這一課很重要的詞。`,
      pinyin: `${card.pinyin} shì zhè yí kè hěn zhòngyào de cí.`,
      english: `"${card.char}" is one of the key words in this lesson.`
    },
    {
      hanzi: `老師今天又用了${card.char}。`,
      pinyin: `Lǎoshī jīntiān yòu yòng le ${card.pinyin}.`,
      english: `The teacher used "${card.char}" again in class today.`
    },
    {
      hanzi: `${card.char}和${support.char}常常一起出現在這一課。`,
      pinyin: `${card.pinyin} hé ${support.pinyin} chángcháng yìqǐ chūxiàn zài zhè yí kè.`,
      english: `"${card.char}" often appears with "${support.char}" in this lesson.`
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
