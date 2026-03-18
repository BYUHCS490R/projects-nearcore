const grammarDom = {
  grammarTopicList: document.querySelector("#grammarTopicList"),
  grammarDetails: document.querySelector("#grammarDetails"),
  challengePrompt: document.querySelector("#challengePrompt"),
  challengeAnswer: document.querySelector("#challengeAnswer"),
  showAnswerButton: document.querySelector("#showAnswerButton")
};

const grammarState = {
  topicId: MandarinContent.grammarTopics[0].id
};

function currentGrammarTopic() {
  return MandarinContent.grammarTopics.find((topic) => topic.id === grammarState.topicId) || MandarinContent.grammarTopics[0];
}

function renderGrammarTopics() {
  grammarDom.grammarTopicList.innerHTML = MandarinContent.grammarTopics
    .map((topic) => `
      <button class="topic-button ${topic.id === grammarState.topicId ? "active" : ""}" data-topic-id="${topic.id}" type="button">
        <strong>${topic.title}</strong>
        <span>${topic.pattern}</span>
      </button>
    `)
    .join("");
}

function renderGrammarDetails() {
  const topic = currentGrammarTopic();

  grammarDom.grammarDetails.innerHTML = `
    <div class="grammar-card">
      <div class="section-label">Pattern</div>
      <h2>${topic.title}</h2>
      <p class="pattern-line">${topic.pattern}</p>
      <p>${topic.simple}</p>
      <div class="section-label">Examples</div>
      <ul class="plain-list">
        ${topic.examples.map((example) => `<li>${example}</li>`).join("")}
      </ul>
      <div class="section-label">How to use it</div>
      <ul class="plain-list">
        ${topic.usageNotes.map((note) => `<li>${note}</li>`).join("")}
      </ul>
    </div>
  `;

  grammarDom.challengePrompt.textContent = topic.challenge.prompt;
  grammarDom.challengeAnswer.textContent = topic.challenge.answer;
  grammarDom.challengeAnswer.classList.add("hidden");
}

function bindGrammarEvents() {
  grammarDom.grammarTopicList.addEventListener("click", (event) => {
    const button = event.target.closest(".topic-button");
    if (!button) return;
    grammarState.topicId = button.dataset.topicId;
    renderGrammarTopics();
    renderGrammarDetails();
  });

  grammarDom.showAnswerButton.addEventListener("click", () => {
    grammarDom.challengeAnswer.classList.toggle("hidden");
  });
}

function initGrammarPage() {
  bindGrammarEvents();
  renderGrammarTopics();
  renderGrammarDetails();
}

initGrammarPage();
