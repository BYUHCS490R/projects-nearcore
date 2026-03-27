const WRITING_STORAGE_KEY = "unit3-writing-v1";
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

function loadWritingStorage() {
  try {
    return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || "{}");
  } catch { return {}; }
}

const writingStorage = loadWritingStorage();
const lessons = Unit3Content.lessons;

const writingState = {
  lessonKey: writingStorage.lessonKey || lessons[0].id,
  setName: writingStorage.setName || "",
  mode: writingStorage.mode || "easy",
  theme: localStorage.getItem(THEME_KEY) || "light",
  index: 0,
  guideVisible: true
};

function saveWritingStorage() {
  localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify({
    lessonKey: writingState.lessonKey,
    setName: writingState.setName,
    mode: writingState.mode
  }));
}

function currentWritingLesson() {
  return lessons.find(l => l.id === writingState.lessonKey) || lessons[0];
}

function currentWritingCards() {
  const lesson = currentWritingLesson();
  const setKeys = Object.keys(lesson.sets);
  if (!setKeys.includes(writingState.setName)) writingState.setName = setKeys[0];
  return lesson.sets[writingState.setName] || [];
}

function currentWritingPrompt() {
  const cards = currentWritingCards();
  return cards[writingState.index] || null;
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", writingState.theme === "dark");
  writingDom.themeToggleButton.textContent = writingState.theme === "light" ? "☾" : "☀";
}

function populateWritingSelectors() {
  writingDom.writingLessonSelector.innerHTML = lessons
    .map(l => `<option value="${l.id}">${l.title}</option>`)
    .join("");
  writingDom.writingLessonSelector.value = writingState.lessonKey;

  const lesson = currentWritingLesson();
  const setNames = Object.keys(lesson.sets);
  if (!setNames.includes(writingState.setName)) writingState.setName = setNames[0];
  writingDom.writingSetSelector.innerHTML = setNames
    .map(n => `<option value="${n}">${n}</option>`)
    .join("");
  writingDom.writingSetSelector.value = writingState.setName;
  writingDom.writingModeSelector.value = writingState.mode;
}

function renderWritingPrompt() {
  const prompt = currentWritingPrompt();
  if (!prompt) return;

  const total = currentWritingCards().length;
  const descriptions = {
    easy: "See the full character, pinyin, meaning, and writing tips.",
    medium: "Only pinyin and English. Recall the character yourself.",
    hard: "Press the speaker button. Write what you hear, then check."
  };

  writingDom.modeDescription.textContent = descriptions[writingState.mode];
  writingDom.writingPromptTitle.textContent = `${currentWritingLesson().title} — ${writingState.setName} (${writingState.index + 1}/${total})`;
  writingDom.hardModeAnswer.classList.add("hidden");
  writingDom.playSoundButton.classList.toggle("hidden", writingState.mode !== "hard");
  writingDom.checkCharacterButton.classList.toggle("hidden", writingState.mode !== "hard");

  if (writingState.mode === "easy") {
    writingDom.writingCard.innerHTML = `
      <div class="prompt-big">${prompt.char}</div>
      <div class="prompt-line"><strong>Character:</strong> ${prompt.char}</div>
      <div class="prompt-line"><strong>Pinyin:</strong> ${prompt.pinyin}</div>
      <div class="prompt-line"><strong>Meaning:</strong> ${prompt.english}</div>
      <div class="prompt-line" style="margin-top:10px;padding:10px;border-radius:12px;background:var(--accent-soft);font-size:0.9rem">
        💡 Trace this character on the canvas. Say <em>${prompt.pinyin}</em> aloud as you write.
      </div>
    `;
  } else if (writingState.mode === "medium") {
    writingDom.writingCard.innerHTML = `
      <div class="prompt-big">${prompt.pinyin}</div>
      <div class="prompt-line"><strong>English:</strong> ${prompt.english}</div>
      <div class="prompt-line"><strong>Pinyin:</strong> ${prompt.pinyin}</div>
      <div class="prompt-line" style="color:var(--muted);margin-top:8px">Write the character from memory on the canvas below.</div>
    `;
  } else {
    writingDom.writingCard.innerHTML = `
      <div class="prompt-line" style="margin-top:16px;font-size:1.05rem">Press 🔊 Speak, listen carefully, and write the character from sound only.</div>
    `;
  }
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
  const utt = new SpeechSynthesisUtterance(prompt.char);
  utt.lang = "zh-TW";
  utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
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
    const p = position(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function move(event) {
    if (!drawing) return;
    const p = position(event);
    ctx.strokeStyle = "#202939";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function stop() { drawing = false; }

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
  writingDom.writingLessonSelector.addEventListener("change", e => {
    writingState.lessonKey = e.target.value;
    writingState.index = 0;
    populateWritingSelectors();
    saveWritingStorage();
    renderWritingPrompt();
  });
  writingDom.writingSetSelector.addEventListener("change", e => {
    writingState.setName = e.target.value;
    writingState.index = 0;
    saveWritingStorage();
    renderWritingPrompt();
  });
  writingDom.writingModeSelector.addEventListener("change", e => {
    writingState.mode = e.target.value;
    saveWritingStorage();
    renderWritingPrompt();
  });
  writingDom.prevWritingButton.addEventListener("click", () => moveWriting(-1));
  writingDom.nextWritingButton.addEventListener("click", () => moveWriting(1));
  writingDom.playSoundButton.addEventListener("click", speakPrompt);
  writingDom.checkCharacterButton.addEventListener("click", () => {
    const p = currentWritingPrompt();
    if (!p) return;
    writingDom.hardModeAnswer.textContent = `Correct: ${p.char} (${p.pinyin}) — ${p.english}`;
    writingDom.hardModeAnswer.classList.remove("hidden");
  });
  writingDom.themeToggleButton.addEventListener("click", () => {
    writingState.theme = writingState.theme === "light" ? "dark" : "light";
    localStorage.setItem(THEME_KEY, writingState.theme);
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
