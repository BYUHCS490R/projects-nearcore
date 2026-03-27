const THEME_KEY = "mandarin-theme";

const grammarDom = {
  grammarLessonFilter: document.querySelector("#grammarLessonFilter"),
  grammarTopicList: document.querySelector("#grammarTopicList"),
  grammarDetails: document.querySelector("#grammarDetails"),
  challengePrompt: document.querySelector("#challengePrompt"),
  challengeAnswer: document.querySelector("#challengeAnswer"),
  showAnswerButton: document.querySelector("#showAnswerButton"),
  themeToggleButton: document.querySelector("#themeToggleButton")
};

const grammarTopics = Unit3Content.grammarTopics;
const lessons = Unit3Content.lessons;

const grammarState = {
  lessonFilter: "all",
  topicId: grammarTopics[0].id,
  theme: localStorage.getItem(THEME_KEY) || "light"
};

function currentGrammarTopic() {
  return grammarTopics.find(t => t.id === grammarState.topicId) || grammarTopics[0];
}

function filteredTopics() {
  return grammarState.lessonFilter === "all"
    ? grammarTopics
    : grammarTopics.filter(t => t.lessonId === grammarState.lessonFilter);
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", grammarState.theme === "dark");
  grammarDom.themeToggleButton.textContent = grammarState.theme === "light" ? "☾" : "☀";
}

function renderLessonFilter() {
  grammarDom.grammarLessonFilter.innerHTML = [
    `<option value="all">All lessons</option>`,
    ...lessons.map(l => `<option value="${l.id}">${l.title}</option>`)
  ].join("");
  grammarDom.grammarLessonFilter.value = grammarState.lessonFilter;
}

function renderGrammarTopics() {
  const topics = filteredTopics();
  if (!topics.find(t => t.id === grammarState.topicId)) {
    grammarState.topicId = topics[0].id;
  }
  const badgeClass = { L17: "badge-l17", L18: "badge-l18" };
  grammarDom.grammarTopicList.innerHTML = topics.map(t => `
    <button class="topic-button ${t.id === grammarState.topicId ? "active" : ""}" data-topic-id="${t.id}" type="button">
      <span class="badge ${badgeClass[t.lessonId] || ''}" style="margin-bottom:6px;font-size:0.7rem">${t.lessonId}</span>
      <strong style="display:block">${t.title}</strong>
      <span style="font-size:0.85rem;color:var(--muted)">${t.pattern}</span>
    </button>
  `).join("");
}

function renderGrammarDetails() {
  const t = currentGrammarTopic();
  grammarDom.grammarDetails.innerHTML = `
    <div class="grammar-card">
      <div class="section-label">Pattern</div>
      <h2>${t.title}</h2>
      <p class="pattern-line" style="font-size:1.1rem;font-weight:600">${t.pattern}</p>
      <p>${t.simple}</p>
      <div class="section-label" style="margin-top:16px">Examples</div>
      <ul class="plain-list">
        ${t.examples.map(e => `<li style="font-size:1.1rem;margin-bottom:4px">${e}</li>`).join("")}
      </ul>
      <div class="section-label" style="margin-top:16px">How to use it</div>
      <ul class="plain-list">
        ${t.usageNotes.map(n => `<li>${n}</li>`).join("")}
      </ul>
    </div>
  `;
  grammarDom.challengePrompt.textContent = t.challenge.prompt;
  grammarDom.challengeAnswer.textContent = t.challenge.answer;
  grammarDom.challengeAnswer.classList.add("hidden");
}

function bindGrammarEvents() {
  grammarDom.grammarLessonFilter.addEventListener("change", e => {
    grammarState.lessonFilter = e.target.value;
    renderGrammarTopics();
    renderGrammarDetails();
  });
  grammarDom.grammarTopicList.addEventListener("click", e => {
    const btn = e.target.closest(".topic-button");
    if (!btn) return;
    grammarState.topicId = btn.dataset.topicId;
    renderGrammarTopics();
    renderGrammarDetails();
  });
  grammarDom.showAnswerButton.addEventListener("click", () => {
    grammarDom.challengeAnswer.classList.toggle("hidden");
  });
  grammarDom.themeToggleButton.addEventListener("click", () => {
    grammarState.theme = grammarState.theme === "light" ? "dark" : "light";
    localStorage.setItem(THEME_KEY, grammarState.theme);
    applyTheme();
  });
}

function initGrammarPage() {
  renderLessonFilter();
  bindGrammarEvents();
  renderGrammarTopics();
  renderGrammarDetails();
  applyTheme();
}

initGrammarPage();
