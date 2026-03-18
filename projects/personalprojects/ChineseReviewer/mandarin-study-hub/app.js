const STORAGE_KEY = "mandarin-study-hub-v2";

const dom = {
  lessonSelector: document.querySelector("#lessonSelector"),
  studyModeSelector: document.querySelector("#studyModeSelector"),
  queueSelector: document.querySelector("#queueSelector"),
  shuffleButton: document.querySelector("#shuffleButton"),
  resetProgressButton: document.querySelector("#resetProgressButton"),
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
  backUse: document.querySelector("#backUse"),
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

const storage = loadStorage();

const appState = {
  lessonKey: storage.lessonKey || MandarinContent.lessons[0].id,
  promptMode: storage.promptMode || "hanzi",
  queueMode: storage.queueMode || "lesson",
  queue: [],
  currentIndex: 0,
  cardFlipped: false,
  selectedQuizAnswer: null,
  currentQuiz: null
};

function loadStorage() {
  const fallback = {
    lessonKey: MandarinContent.lessons[0].id,
    promptMode: "hanzi",
    queueMode: "lesson",
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
  storage.promptMode = appState.promptMode;
  storage.queueMode = appState.queueMode;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

function currentLesson() {
  return MandarinContent.lessons.find((lesson) => lesson.id === appState.lessonKey) || MandarinContent.lessons[0];
}

function currentCard() {
  return appState.queue[appState.currentIndex] || null;
}

function cardKey(card) {
  return `${card.lessonId}:${card.char}`;
}

function cardProgress(card) {
  const key = cardKey(card);
  if (!storage.progress[key]) {
    storage.progress[key] = { again: 0, hard: 0, good: 0, easy: 0, streak: 0 };
  }
  return storage.progress[key];
}

function buildQueue() {
  const lesson = currentLesson();
  let cards = [...lesson.cards];

  if (appState.queueMode === "shuffle") {
    cards = shuffle(cards);
  }

  if (appState.queueMode === "due") {
    cards = cards.sort((left, right) => getScore(left) - getScore(right));
  }

  appState.queue = cards;
  appState.currentIndex = 0;
  appState.cardFlipped = false;
  render();
}

function getScore(card) {
  const progress = cardProgress(card);
  return (progress.again * 4) + (progress.hard * 2) - (progress.good + progress.easy + progress.streak);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function populateSelectors() {
  dom.lessonSelector.innerHTML = MandarinContent.lessons
    .map((lesson) => `<option value="${lesson.id}">${lesson.title}</option>`)
    .join("");

  dom.lessonSelector.value = appState.lessonKey;
  dom.studyModeSelector.value = appState.promptMode;
  dom.queueSelector.value = appState.queueMode;
}

function render() {
  const lesson = currentLesson();
  const card = currentCard();

  dom.lessonDisplay.textContent = lesson.title;
  dom.lessonTopic.textContent = lesson.topic;
  dom.sessionStatus.textContent = `${appState.currentIndex + 1} of ${appState.queue.length} cards in this lesson`;
  renderGoals(lesson);
  renderGrammarPreview(lesson);
  renderStats();
  renderCard(card);
  renderQuiz(card);
}

function renderGoals(lesson) {
  dom.lessonGoals.innerHTML = lesson.goals.map((goal) => `<li>${goal}</li>`).join("");
}

function renderGrammarPreview(lesson) {
  dom.grammarPreview.innerHTML = lesson.grammarFocus
    .map((item) => `<div class="stack-item"><strong>${item.pattern}</strong><span>${item.simple}</span></div>`)
    .join("");
}

function renderStats() {
  const lesson = currentLesson();
  const total = lesson.cards.length;
  const reviewed = lesson.cards.filter((card) => {
    const progress = cardProgress(card);
    return progress.again + progress.hard + progress.good + progress.easy > 0;
  }).length;
  const mastered = lesson.cards.filter((card) => cardProgress(card).easy > 0).length;
  const weak = lesson.cards.filter((card) => cardProgress(card).again > cardProgress(card).good).length;

  const stats = [
    { label: "Cards in lesson", value: total },
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
    pinyin: { value: card.pinyin, hint: "Write or say the Hanzi from the sound." }
  };

  const prompt = promptLookup[appState.promptMode];
  dom.card.classList.toggle("is-flipped", appState.cardFlipped);
  dom.frontPrompt.textContent = prompt.value;
  dom.frontHint.textContent = prompt.hint;
  dom.backChar.textContent = card.char;
  dom.backPinyin.textContent = card.pinyin;
  dom.backMeaning.textContent = card.english;
  dom.backUse.innerHTML = `
    <strong>Usage note</strong>
    <p>${card.usage}</p>
  `;
  dom.exampleHan.textContent = card.example.hanzi;
  dom.examplePinyin.textContent = card.example.pinyin;
  dom.exampleEnglish.textContent = card.example.english;
}

function renderQuiz(card) {
  if (!card) return;

  const pool = shuffle(currentLesson().cards.filter((item) => item.char !== card.char)).slice(0, 3);
  const choices = shuffle([card, ...pool]);

  appState.currentQuiz = {
    answer: card.english,
    choices: choices.map((item) => item.english)
  };
  appState.selectedQuizAnswer = null;

  dom.quizPrompt.textContent = `What is the best meaning for ${card.char}?`;
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
    saveStorage();
    buildQueue();
  });

  dom.studyModeSelector.addEventListener("change", (event) => {
    appState.promptMode = event.target.value;
    saveStorage();
    renderCard(currentCard());
  });

  dom.queueSelector.addEventListener("change", (event) => {
    appState.queueMode = event.target.value;
    saveStorage();
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

  dom.prevCardButton.addEventListener("click", () => moveCard(-1));
  dom.nextCardButton.addEventListener("click", () => moveCard(1));
  dom.flipButton.addEventListener("click", flipCard);
  dom.card.addEventListener("click", flipCard);
  dom.speakButton.addEventListener("click", speakCurrentCard);
  dom.checkQuizButton.addEventListener("click", checkQuiz);
  dom.newQuizButton.addEventListener("click", () => renderQuiz(currentCard()));

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
  populateSelectors();
  bindEvents();
  buildQueue();
}

init();
