const STORAGE_KEY = "unit3-review-v1";
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

function loadStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch { return {}; }
}

const storage = loadStorage();

const appState = {
  lessonKey: storage.lessonKey || Unit3Content.lessons[0].id,
  setName: storage.setName || "",
  promptMode: storage.promptMode || "hanzi",
  queueMode: storage.queueMode || "lesson",
  theme: localStorage.getItem(THEME_KEY) || "light",
  queue: [],
  currentIndex: 0,
  cardFlipped: false,
  selectedQuizAnswer: null,
  currentQuiz: null
};

function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    lessonKey: appState.lessonKey,
    setName: appState.setName,
    promptMode: appState.promptMode,
    queueMode: appState.queueMode,
    progress: storage.progress || {}
  }));
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", appState.theme === "dark");
  if (dom.themeToggleButton) dom.themeToggleButton.textContent = appState.theme === "light" ? "☾" : "☀";
}

function currentLesson() {
  return Unit3Content.lessons.find(l => l.id === appState.lessonKey) || Unit3Content.lessons[0];
}

function currentSetEntries() {
  const lesson = currentLesson();
  const sets = lesson.sets;
  const setKeys = Object.keys(sets);
  if (!setKeys.includes(appState.setName)) appState.setName = setKeys[0];
  if (appState.setName === "__all__") {
    return setKeys.flatMap(k => sets[k].map(e => ({ ...e, lessonId: lesson.id, setName: k })));
  }
  return (sets[appState.setName] || []).map(e => ({ ...e, lessonId: lesson.id, setName: appState.setName }));
}

function currentCard() {
  return appState.queue[appState.currentIndex] || null;
}

function cardProgress(card) {
  if (!storage.progress) storage.progress = {};
  const key = `${card.lessonId}:${card.char}`;
  if (!storage.progress[key]) storage.progress[key] = { again: 0, hard: 0, good: 0, easy: 0, streak: 0 };
  return storage.progress[key];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQueue() {
  let entries = currentSetEntries();
  if (appState.queueMode === "shuffle") entries = shuffle(entries);
  appState.queue = entries;
  appState.currentIndex = 0;
  appState.cardFlipped = false;
  render();
}

function populateLessonSelector() {
  dom.lessonSelector.innerHTML = Unit3Content.lessons
    .map(l => `<option value="${l.id}">${l.title}</option>`)
    .join("");
  dom.lessonSelector.value = appState.lessonKey;
}

function updateSetSelector() {
  const lesson = currentLesson();
  const setKeys = Object.keys(lesson.sets);
  dom.setSelector.innerHTML = [
    `<option value="__all__">All sets</option>`,
    ...setKeys.map(k => `<option value="${k}">${k}</option>`)
  ].join("");
  if (!setKeys.includes(appState.setName)) appState.setName = setKeys[0];
  dom.setSelector.value = appState.setName;
}

function renderStats() {
  const lesson = currentLesson();
  const all = currentSetEntries();
  const prog = storage.progress || {};
  let studied = 0, easy = 0;
  all.forEach(c => {
    const key = `${c.lessonId}:${c.char}`;
    if (prog[key]) {
      studied++;
      if (prog[key].easy > 0) easy++;
    }
  });
  dom.statsGrid.innerHTML = `
    <div class="stat-card"><span>Total cards</span><strong>${all.length}</strong></div>
    <div class="stat-card"><span>Studied</span><strong>${studied}</strong></div>
    <div class="stat-card"><span>Easy</span><strong>${easy}</strong></div>
    <div class="stat-card"><span>Lesson</span><strong>${lesson.id}</strong></div>
  `;
  dom.lessonGoals.innerHTML = lesson.goals.map(g => `<li>${g}</li>`).join("");
  dom.grammarPreview.innerHTML = lesson.grammarFocus.map(g => `
    <div class="stack-item">
      <strong>${g.pattern}</strong>
      <span>${g.simple}</span>
    </div>
  `).join("");
}

function renderCard(card) {
  if (!card) {
    dom.frontPrompt.textContent = "No cards";
    dom.frontHint.textContent = "";
    dom.backChar.textContent = "";
    dom.backPinyin.textContent = "";
    dom.backMeaning.textContent = "";
    return;
  }

  const mode = appState.promptMode;
  if (mode === "hanzi") {
    dom.frontPrompt.textContent = card.char;
    dom.frontHint.textContent = card.pinyin;
  } else if (mode === "english") {
    dom.frontPrompt.textContent = card.english;
    dom.frontHint.textContent = "";
  } else {
    dom.frontPrompt.textContent = card.pinyin;
    dom.frontHint.textContent = "";
  }

  dom.backChar.textContent = card.char;
  dom.backPinyin.textContent = card.pinyin;
  dom.backMeaning.textContent = card.english;

  // Simple sentence using the card
  const sentences = buildSentence(card);
  if (sentences) {
    dom.exampleHan.textContent = sentences.hanzi;
    dom.examplePinyin.textContent = sentences.pinyin;
    dom.exampleEnglish.textContent = sentences.english;
  } else {
    dom.exampleHan.textContent = card.char;
    dom.examplePinyin.textContent = card.pinyin;
    dom.exampleEnglish.textContent = card.english;
  }
}

const sentenceBank = {
  "公寓": { hanzi: "我想租一套公寓。", pinyin: "Wǒ xiǎng zū yī tào gōngyù.", english: "I want to rent an apartment." },
  "房租": { hanzi: "這裡的房租多少錢？", pinyin: "Zhèlǐ de fángzū duōshǎo qián?", english: "How much is the rent here?" },
  "押金": { hanzi: "要不要付押金？", pinyin: "Yào bú yào fù yājīn?", english: "Do you need to pay a deposit?" },
  "傢俱": { hanzi: "有什麼傢俱？", pinyin: "Yǒu shénme jiājù?", english: "What kind of furniture does it have?" },
  "冰箱": { hanzi: "連冰箱都有。", pinyin: "Lián bīngxiāng dōu yǒu.", english: "There is even a refrigerator." },
  "寵物": { hanzi: "我什麼寵物都不養。", pinyin: "Wǒ shénme chǒngwù dōu bù yǎng.", english: "I don't keep any pets at all." },
  "運動": { hanzi: "你喜歡什麼運動？", pinyin: "Nǐ xǐhuān shénme yùndòng?", english: "What sports do you like?" },
  "危險": { hanzi: "游泳有點危險。", pinyin: "Yóuyǒng yǒudiǎn wēixiǎn.", english: "Swimming is a bit dangerous." },
  "游泳": { hanzi: "你什麼時候開始游泳？", pinyin: "Nǐ shénme shíhou kāishǐ yóuyǒng?", english: "When did you start swimming?" },
  "跑步": { hanzi: "我每天跑步。", pinyin: "Wǒ měitiān pǎobù.", english: "I jog every day." },
  "籃球": { hanzi: "我很喜歡打籃球。", pinyin: "Wǒ hěn xǐhuān dǎ lánqiú.", english: "I really like to play basketball." },
  "足球": { hanzi: "踢足球要用腳。", pinyin: "Tī zúqiú yào yòng jiǎo.", english: "You use your feet to play soccer." },
  "美式足球": { hanzi: "打美式足球很危險。", pinyin: "Dǎ Měishì zúqiú hěn wēixiǎn.", english: "Playing American football is dangerous." },
  "英式足球": { hanzi: "英式足球跟美式足球不一樣。", pinyin: "Yīngshì zúqiú gēn Měishì zúqiú bù yīyàng.", english: "Soccer and American football are not the same." },
  "為了": { hanzi: "為了提高水平，我每天練習。", pinyin: "Wèile tígāo shuǐpíng, wǒ měitiān liànxí.", english: "In order to improve my level, I practice every day." },
  "比賽": { hanzi: "今天有一個比賽。", pinyin: "Jīntiān yǒu yí ge bǐsài.", english: "There is a competition today." },
  "一樣": { hanzi: "這兩個不一樣。", pinyin: "Zhè liǎng ge bù yīyàng.", english: "These two are not the same." },
  "星期": { hanzi: "我每個星期打兩次網球。", pinyin: "Wǒ měi ge xīngqī dǎ liǎng cì wǎngqiú.", english: "I play tennis twice a week." },
  "花錢": { hanzi: "打網球很花錢。", pinyin: "Dǎ wǎngqiú hěn huā qián.", english: "Playing tennis costs a lot." },
  "請問": { hanzi: "請問，這套公寓出租嗎？", pinyin: "Qǐngwèn, zhè tào gōngyù chūzū ma?", english: "Excuse me, is this apartment for rent?" }
};

function buildSentence(card) {
  return sentenceBank[card.char] || null;
}

function render() {
  const card = currentCard();
  const lesson = currentLesson();
  const total = appState.queue.length;
  const idx = appState.currentIndex;

  dom.lessonDisplay.textContent = lesson.title;
  dom.lessonTopic.textContent = lesson.topic;
  dom.sessionStatus.textContent = total ? `Card ${idx + 1} of ${total} — ${currentSetEntries().length} cards in set` : "No cards loaded.";

  dom.card.classList.remove("is-flipped");
  appState.cardFlipped = false;
  renderCard(card);
  renderStats();
  renderQuiz();
}

function renderQuiz() {
  const all = currentSetEntries();
  if (all.length < 2) {
    dom.quizPrompt.textContent = "Need more cards for a quiz.";
    dom.quizOptions.innerHTML = "";
    return;
  }
  const quizCard = all[Math.floor(Math.random() * all.length)];
  const distractors = shuffle(all.filter(c => c.char !== quizCard.char)).slice(0, 3);
  const choices = shuffle([quizCard, ...distractors]);
  appState.currentQuiz = { char: quizCard.char, answer: quizCard.english, choices: choices.map(c => c.english) };
  appState.selectedQuizAnswer = null;
  dom.quizPrompt.textContent = `What is the best meaning for ${quizCard.char}?`;
  dom.quizOptions.innerHTML = appState.currentQuiz.choices
    .map((c, i) => `<button class="quiz-option" data-index="${i}" type="button">${c}</button>`)
    .join("");
  dom.quizFeedback.textContent = "Choose the best answer and check it.";
}

function moveCard(step) {
  appState.currentIndex = (appState.currentIndex + step + appState.queue.length) % appState.queue.length;
  appState.cardFlipped = false;
  dom.card.classList.remove("is-flipped");
  renderCard(currentCard());
  renderStats();
}

function flipCard() {
  appState.cardFlipped = !appState.cardFlipped;
  dom.card.classList.toggle("is-flipped", appState.cardFlipped);
}

function rateCard(rating) {
  const card = currentCard();
  if (!card) return;
  const progress = cardProgress(card);
  progress[rating] += 1;
  progress.streak = rating === "again" ? 0 : progress.streak + 1;
  saveStorage();
  const messages = {
    again: "Bring it back soon. This one needs another pass.",
    hard: "Still shaky, but improving.",
    good: "Solid. Keep seeing it in sentences.",
    easy: "Strong recall. This can come back later."
  };
  dom.reviewFeedback.textContent = messages[rating];
  renderStats();
}

function checkQuiz() {
  if (appState.selectedQuizAnswer === null) {
    dom.quizFeedback.textContent = "Pick one answer first.";
    return;
  }
  const selected = appState.currentQuiz.choices[appState.selectedQuizAnswer];
  const correct = selected === appState.currentQuiz.answer;
  dom.quizFeedback.textContent = correct ? "Correct! Nice recall." : `Not quite. Correct answer: ${appState.currentQuiz.answer}`;
}

function speakCard() {
  const card = currentCard();
  if (!card || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(card.char);
  utt.lang = "zh-TW";
  utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
}

function bindEvents() {
  dom.lessonSelector.addEventListener("change", e => {
    appState.lessonKey = e.target.value;
    updateSetSelector();
    buildQueue();
    saveStorage();
  });
  dom.setSelector.addEventListener("change", e => {
    appState.setName = e.target.value;
    buildQueue();
    saveStorage();
  });
  dom.studyModeSelector.addEventListener("change", e => {
    appState.promptMode = e.target.value;
    saveStorage();
    renderCard(currentCard());
  });
  dom.queueSelector.addEventListener("change", e => {
    appState.queueMode = e.target.value;
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
    localStorage.setItem(THEME_KEY, appState.theme);
    applyTheme();
  });
  dom.prevCardButton.addEventListener("click", () => moveCard(-1));
  dom.nextCardButton.addEventListener("click", () => moveCard(1));
  dom.flipButton.addEventListener("click", flipCard);
  dom.card.addEventListener("click", flipCard);
  dom.speakButton.addEventListener("click", speakCard);
  dom.checkQuizButton.addEventListener("click", checkQuiz);
  dom.newQuizButton.addEventListener("click", renderQuiz);
  document.querySelectorAll(".review-button").forEach(btn => {
    btn.addEventListener("click", () => rateCard(btn.dataset.rating));
  });
  dom.quizOptions.addEventListener("click", e => {
    const btn = e.target.closest(".quiz-option");
    if (!btn) return;
    appState.selectedQuizAnswer = Number(btn.dataset.index);
    dom.quizOptions.querySelectorAll(".quiz-option").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
}

function init() {
  applyTheme();
  populateLessonSelector();
  updateSetSelector();
  dom.studyModeSelector.value = appState.promptMode;
  dom.queueSelector.value = appState.queueMode;
  bindEvents();
  buildQueue();
}

init();
