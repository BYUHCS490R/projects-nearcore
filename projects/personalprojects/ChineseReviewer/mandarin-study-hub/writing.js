const WRITING_STORAGE_KEY = "mandarin-writing-v2";
const THEME_KEY = "mandarin-theme";

const writingDom = {
  writingLessonSelector: document.querySelector("#writingLessonSelector"),
  writingSetSelector: document.querySelector("#writingSetSelector"),
  writingModeSelector: document.querySelector("#writingModeSelector"),
  modeDescription: document.querySelector("#modeDescription"),
  writingPromptTitle: document.querySelector("#writingPromptTitle"),
  writingCard: document.querySelector("#writingCard"),
  prevWritingButton: document.querySelector("#prevWritingButton"),
  nextWritingButton: document.querySelector("#nextWritingButton"),
  playSoundButton: document.querySelector("#playSoundButton"),
  checkCharacterButton: document.querySelector("#checkCharacterButton"),
  hardModeAnswer: document.querySelector("#hardModeAnswer"),
  themeToggleButton: document.querySelector("#themeToggleButton"),
  writingCanvas: document.querySelector("#writingCanvas"),
  clearCanvasButton: document.querySelector("#clearCanvasButton"),
  toggleGuideButton: document.querySelector("#toggleGuideButton")
};

const writingStorage = loadWritingStorage();

const writingState = {
  lessonKey: writingStorage.lessonKey || MandarinContent.lessons[0].id,
  setName: writingStorage.setName || "",
  mode: writingStorage.mode || "easy",
  theme: localStorage.getItem(THEME_KEY) || writingStorage.theme || "light",
  index: 0,
  guideVisible: true
};

function loadWritingStorage() {
  const fallback = {
    lessonKey: MandarinContent.lessons[0].id,
    setName: "",
    mode: "easy",
    theme: "light"
  };

  try {
    const saved = JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || "null");
    return saved ? { ...fallback, ...saved } : fallback;
  } catch {
    return fallback;
  }
}

function saveWritingStorage() {
  localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify({
    lessonKey: writingState.lessonKey,
    setName: writingState.setName,
    mode: writingState.mode,
    theme: writingState.theme
  }));
  localStorage.setItem(THEME_KEY, writingState.theme);
}

function currentWritingLesson() {
  return MandarinContent.lessons.find((lesson) => lesson.id === writingState.lessonKey) || MandarinContent.lessons[0];
}

function currentWritingCards() {
  const lesson = currentWritingLesson();
  return (lesson.sets[writingState.setName] || []).map((entry) => ({
    ...entry,
    radicals: entry.char === "把" ? "扌 + 巴" : "Not provided",
    decomposition: `Study ${entry.char} by matching its sound ${entry.pinyin} to its meaning ${entry.english}.`,
    strokeSupport: `Trace ${entry.char} while saying ${entry.pinyin} aloud.`
  }));
}

function currentWritingPrompt() {
  return currentWritingCards()[writingState.index] || null;
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", writingState.theme === "dark");
  writingDom.themeToggleButton.textContent = writingState.theme === "light" ? "☾" : "☀";
}

function populateWritingSelectors() {
  writingDom.writingLessonSelector.innerHTML = MandarinContent.lessons
    .map((lesson) => `<option value="${lesson.id}">${lesson.title}</option>`)
    .join("");
  writingDom.writingLessonSelector.value = writingState.lessonKey;

  const lesson = currentWritingLesson();
  const setNames = Object.keys(lesson.sets);
  if (!setNames.includes(writingState.setName)) {
    writingState.setName = setNames[0];
  }

  writingDom.writingSetSelector.innerHTML = setNames
    .map((setName) => `<option value="${setName}">${setName}</option>`)
    .join("");
  writingDom.writingSetSelector.value = writingState.setName;
  writingDom.writingModeSelector.value = writingState.mode;
}

function renderWritingPrompt() {
  const prompt = currentWritingPrompt();
  if (!prompt) return;

  const descriptions = {
    easy: "See the full character, meaning, and support details.",
    medium: "Only the pinyin and English appear. Recall the character yourself.",
    hard: "Only use the speaker button. Write what you hear, then check the answer."
  };

  writingDom.modeDescription.textContent = descriptions[writingState.mode];
  writingDom.writingPromptTitle.textContent = `${currentWritingLesson().title} - ${writingState.setName}`;
  writingDom.hardModeAnswer.classList.add("hidden");
  writingDom.playSoundButton.classList.toggle("hidden", writingState.mode !== "hard");
  writingDom.checkCharacterButton.classList.toggle("hidden", writingState.mode !== "hard");

  if (writingState.mode === "easy") {
    writingDom.writingCard.innerHTML = `
      <div class="prompt-big">${prompt.char}</div>
      <div class="prompt-line"><strong>Character:</strong> ${prompt.char}</div>
      <div class="prompt-line"><strong>Pinyin:</strong> ${prompt.pinyin}</div>
      <div class="prompt-line"><strong>Meaning:</strong> ${prompt.english}</div>
      <div class="prompt-line"><strong>Radicals/components:</strong> ${prompt.radicals}</div>
      <div class="prompt-line"><strong>Decomposition:</strong> ${prompt.decomposition}</div>
      <div class="prompt-line"><strong>Stroke support:</strong> ${prompt.strokeSupport}</div>
    `;
    return;
  }

  if (writingState.mode === "medium") {
    writingDom.writingCard.innerHTML = `
      <div class="prompt-big">${prompt.pinyin}</div>
      <div class="prompt-line"><strong>English:</strong> ${prompt.english}</div>
      <div class="prompt-line"><strong>Pinyin:</strong> ${prompt.pinyin}</div>
    `;
    return;
  }

  writingDom.writingCard.innerHTML = `
    <div class="prompt-line">Press the speaker button, listen carefully, and write the character from sound only.</div>
  `;
}

function moveWriting(step) {
  const cards = currentWritingCards();
  writingState.index = (writingState.index + step + cards.length) % cards.length;
  renderWritingPrompt();
}

function speakPrompt() {
  const prompt = currentWritingPrompt();
  if (!prompt || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(prompt.char);
  utterance.lang = "zh-TW";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function initCanvas() {
  const canvas = writingDom.writingCanvas;
  const ctx = canvas.getContext("2d");
  let drawing = false;

  function drawGuide() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fffdf7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (!writingState.guideVisible) return;

    ctx.strokeStyle = "#d3c7b8";
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function position(event) {
    const rect = canvas.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    return {
      x: (point.clientX - rect.left) * (canvas.width / rect.width),
      y: (point.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function start(event) {
    drawing = true;
    const point = position(event);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  }

  function move(event) {
    if (!drawing) return;
    const point = position(event);
    ctx.strokeStyle = "#202939";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }

  function stop() {
    drawing = false;
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", stop);
  canvas.addEventListener("touchstart", start, { passive: true });
  canvas.addEventListener("touchmove", move, { passive: true });
  window.addEventListener("touchend", stop, { passive: true });

  writingDom.clearCanvasButton.addEventListener("click", drawGuide);
  writingDom.toggleGuideButton.addEventListener("click", () => {
    writingState.guideVisible = !writingState.guideVisible;
    drawGuide();
  });

  drawGuide();
}

function bindWritingEvents() {
  writingDom.writingLessonSelector.addEventListener("change", (event) => {
    writingState.lessonKey = event.target.value;
    writingState.index = 0;
    populateWritingSelectors();
    saveWritingStorage();
    renderWritingPrompt();
  });

  writingDom.writingSetSelector.addEventListener("change", (event) => {
    writingState.setName = event.target.value;
    writingState.index = 0;
    saveWritingStorage();
    renderWritingPrompt();
  });

  writingDom.writingModeSelector.addEventListener("change", (event) => {
    writingState.mode = event.target.value;
    saveWritingStorage();
    renderWritingPrompt();
  });

  writingDom.prevWritingButton.addEventListener("click", () => moveWriting(-1));
  writingDom.nextWritingButton.addEventListener("click", () => moveWriting(1));
  writingDom.playSoundButton.addEventListener("click", speakPrompt);
  writingDom.checkCharacterButton.addEventListener("click", () => {
    const prompt = currentWritingPrompt();
    writingDom.hardModeAnswer.textContent = `Correct character: ${prompt.char} (${prompt.pinyin}) - ${prompt.english}`;
    writingDom.hardModeAnswer.classList.remove("hidden");
  });
  writingDom.themeToggleButton.addEventListener("click", () => {
    writingState.theme = writingState.theme === "light" ? "dark" : "light";
    saveWritingStorage();
    applyTheme();
  });
}

function initWritingPage() {
  populateWritingSelectors();
  bindWritingEvents();
  initCanvas();
  applyTheme();
  renderWritingPrompt();
}

initWritingPage();
