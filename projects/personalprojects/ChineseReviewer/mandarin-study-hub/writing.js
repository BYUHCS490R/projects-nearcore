const writingDom = {
  modeButtons: document.querySelectorAll(".mode-button"),
  modeDescription: document.querySelector("#modeDescription"),
  writingPromptTitle: document.querySelector("#writingPromptTitle"),
  writingCard: document.querySelector("#writingCard"),
  prevWritingButton: document.querySelector("#prevWritingButton"),
  nextWritingButton: document.querySelector("#nextWritingButton"),
  writingCanvas: document.querySelector("#writingCanvas"),
  clearCanvasButton: document.querySelector("#clearCanvasButton"),
  toggleGuideButton: document.querySelector("#toggleGuideButton")
};

const writingState = {
  mode: "easy",
  index: 0,
  guideVisible: true
};

function currentWritingPrompt() {
  return MandarinContent.writingPrompts[writingState.index];
}

function renderWritingPrompt() {
  const prompt = currentWritingPrompt();
  const mode = MandarinContent.writingModes[writingState.mode];

  writingDom.modeDescription.textContent = mode.description;
  writingDom.writingPromptTitle.textContent = `${mode.title}: ${prompt.char}`;

  let content = "";

  if (writingState.mode === "easy") {
    content = `
      <div class="prompt-big">${prompt.char}</div>
      <div class="prompt-line"><strong>Character:</strong> ${prompt.char}</div>
      <div class="prompt-line"><strong>Pinyin:</strong> ${prompt.pinyin}</div>
      <div class="prompt-line"><strong>Meaning:</strong> ${prompt.english}</div>
      <div class="prompt-line"><strong>Radicals/components:</strong> ${prompt.radicals}</div>
      <div class="prompt-line"><strong>Decomposition:</strong> ${prompt.decomposition}</div>
      <div class="prompt-line"><strong>Stroke support:</strong> ${prompt.strokeSupport}</div>
    `;
  }

  if (writingState.mode === "medium") {
    content = `
      <div class="prompt-big">${prompt.pinyin}</div>
      <div class="prompt-line"><strong>English word:</strong> ${prompt.english}</div>
      <div class="prompt-line"><strong>Character sound:</strong> ${prompt.pinyin}</div>
      <div class="prompt-line">Write the character from memory before checking the next card.</div>
    `;
  }

  if (writingState.mode === "hard") {
    content = `
      <div class="prompt-big">${prompt.pinyin}</div>
      <div class="prompt-line"><strong>Character sound only:</strong> ${prompt.pinyin}</div>
      <div class="prompt-line">No meaning clue here. Try to write the character from memory only from the sound.</div>
    `;
  }

  writingDom.writingCard.innerHTML = content;
}

function moveWriting(step) {
  writingState.index = (writingState.index + step + MandarinContent.writingPrompts.length) % MandarinContent.writingPrompts.length;
  renderWritingPrompt();
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
  writingDom.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      writingState.mode = button.dataset.mode;
      writingDom.modeButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderWritingPrompt();
    });
  });

  writingDom.prevWritingButton.addEventListener("click", () => moveWriting(-1));
  writingDom.nextWritingButton.addEventListener("click", () => moveWriting(1));
}

function initWritingPage() {
  bindWritingEvents();
  initCanvas();
  renderWritingPrompt();
}

initWritingPage();
