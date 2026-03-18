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

function buildSentenceTemplates(card) {
  const pool = currentSetEntries().filter((item) => item.char !== card.char);
  const support = pool[appState.currentSentenceSeed % Math.max(1, pool.length)] || card;

  return [
    {
      hanzi: `我想學會${card.char}這個詞。`,
      pinyin: `Wǒ xiǎng xuéhuì ${card.pinyin} zhège cí.`,
      english: `I want to learn the word ${card.english}.`
    },
    {
      hanzi: `老師今天又用了${card.char}。`,
      pinyin: `Lǎoshī jīntiān yòu yòng le ${card.pinyin}.`,
      english: `The teacher used ${card.english} again today.`
    },
    {
      hanzi: `${card.char}跟${support.char}常常一起出現在這課。`,
      pinyin: `${card.pinyin} gēn ${support.pinyin} chángcháng yìqǐ chūxiàn zài zhè kè.`,
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
