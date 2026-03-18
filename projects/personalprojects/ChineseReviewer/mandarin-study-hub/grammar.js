const extraGrammarTopics = [
  {
    id: "g6",
    lessonId: "L11",
    title: "更 for stronger comparison",
    pattern: "更 + adjective",
    simple: "Use 更 to say even more.",
    examples: ["明天會更暖和。", "今天比昨天更冷。"],
    challenge: { prompt: "Say this in Chinese: Tomorrow will be even warmer.", answer: "明天會更暖和。" },
    usageNotes: ["更 adds stronger degree.", "It often appears after you already compare two things."]
  },
  {
    id: "g7",
    lessonId: "L12",
    title: "好像 for seeming",
    pattern: "好像 + statement",
    simple: "Use 好像 when something seems true.",
    examples: ["這家飯館兒好像很有名。", "他好像不太餓。"],
    challenge: { prompt: "Say this in Chinese: This seems very spicy.", answer: "這個好像很辣。" },
    usageNotes: ["好像 is useful when you are not fully certain.", "It sounds softer than making a direct claim."]
  },
  {
    id: "g8",
    lessonId: "L12",
    title: "Measure words in food orders",
    pattern: "number + measure word + noun",
    simple: "Use the right measure word when ordering or describing food.",
    examples: ["一碗湯", "兩盤餃子", "一些青菜"],
    challenge: { prompt: "Say this in Chinese: two bowls of soup.", answer: "兩碗湯" },
    usageNotes: ["碗 is common for soup or rice.", "盤 is common for dishes on plates.", "些 means some, not an exact number."]
  },
  {
    id: "g9",
    lessonId: "L13",
    title: "Location with 離 and 近 / 遠",
    pattern: "A 離 B 很近 / 很遠",
    simple: "Use 離 to show distance from one place to another.",
    examples: ["書店離學校很近。", "中國城離這裡很遠嗎？"],
    challenge: { prompt: "Say this in Chinese: The park is far from here.", answer: "公園離這裡很遠。" },
    usageNotes: ["離 marks distance.", "Add 近 or 遠 after it to say near or far."]
  },
  {
    id: "g10",
    lessonId: "L13",
    title: "Direction pattern",
    pattern: "從...一直...往...",
    simple: "Use this to give directions step by step.",
    examples: ["從這裡一直往南走。", "從路口往右拐。"],
    challenge: { prompt: "Say this in Chinese: From here, go straight north.", answer: "從這裡一直往北走。" },
    usageNotes: ["從 means from.", "一直 means straight ahead without turning.", "往 shows the direction you move toward."]
  },
  {
    id: "g11",
    lessonId: "L14",
    title: "最 for superlatives",
    pattern: "最 + adjective / verb",
    simple: "Use 最 for the most or -est.",
    examples: ["她最可愛。", "我最喜歡蛋糕。"],
    challenge: { prompt: "Say this in Chinese: This is the most interesting one.", answer: "這個最有意思。" },
    usageNotes: ["最 marks the top degree.", "It is very common in personal opinions."]
  },
  {
    id: "g12",
    lessonId: "L14",
    title: "像 for resemblance",
    pattern: "A 像 B",
    simple: "Use 像 to say one thing looks like another.",
    examples: ["他像他爸爸。", "這個很像西瓜。"],
    challenge: { prompt: "Say this in Chinese: She looks like her older sister.", answer: "她像她表姐。" },
    usageNotes: ["像 is used for appearance or similarity.", "It can compare people, faces, and styles."]
  },
  {
    id: "g13",
    lessonId: "L15",
    title: "要不然 for otherwise",
    pattern: "..., 要不然 ...",
    simple: "Use 要不然 to show what happens if the first advice is not followed.",
    examples: ["你快休息，要不然會更難受。", "快吃藥，要不然會發燒。"],
    challenge: { prompt: "Say this in Chinese: Go to sleep, otherwise you will be tired.", answer: "快睡覺，要不然你會累。" },
    usageNotes: ["要不然 connects warning or consequence.", "It often follows advice."]
  },
  {
    id: "g14",
    lessonId: "L15",
    title: "越來越 for change over time",
    pattern: "越來越 + adjective / verb",
    simple: "Use this when something becomes more and more something.",
    examples: ["他越來越健康。", "天氣越來越熱。"],
    challenge: { prompt: "Say this in Chinese: I am getting better and better.", answer: "我越來越好了。" },
    usageNotes: ["越來越 shows gradual change.", "Very common in speaking and writing."]
  },
  {
    id: "g15",
    lessonId: "L16",
    title: "就 for emphasis or small amount",
    pattern: "就 + verb / phrase",
    simple: "就 can mean just, only, or show quick result depending on context.",
    examples: ["我們就兩個人。", "明天就去。"],
    challenge: { prompt: "Say this in Chinese: We only have two people.", answer: "我們就兩個人。" },
    usageNotes: ["就 is a small but important word.", "Its meaning depends a lot on the sentence around it."]
  },
  {
    id: "g16",
    lessonId: "L16",
    title: "一言為定 for agreement",
    pattern: "一言為定",
    simple: "Use this fixed phrase when a plan is settled.",
    examples: ["好，明天見，一言為定。", "後天看電影，一言為定。"],
    challenge: { prompt: "Say this in Chinese: Okay, it is settled.", answer: "好，一言為定。" },
    usageNotes: ["This is a set phrase.", "It sounds natural when confirming plans."]
  },
  {
    id: "g17",
    lessonId: "L17",
    title: "連...都...",
    pattern: "連 + noun + 都 ...",
    simple: "Use this to say even something surprising is included.",
    examples: ["連做飯都不方便。", "連家具都有。"],
    challenge: { prompt: "Say this in Chinese: It even has a desk.", answer: "連書桌都有。" },
    usageNotes: ["連 adds surprise or emphasis.", "都 usually follows later in the sentence."]
  },
  {
    id: "g18",
    lessonId: "L19",
    title: "打算 for planning",
    pattern: "打算 + verb / noun",
    simple: "Use 打算 to talk about plans.",
    examples: ["我打算暑假去北京。", "你打算訂票嗎？"],
    challenge: { prompt: "Say this in Chinese: I plan to travel in the summer.", answer: "我打算暑假旅行。" },
    usageNotes: ["打算 is common for future plans.", "It works in both questions and statements."]
  },
  {
    id: "g19",
    lessonId: "L19",
    title: "為了 for purpose",
    pattern: "為了 + goal",
    simple: "Use 為了 to explain purpose: for the sake of.",
    examples: ["為了提高中文水平，我常常看書。", "為了旅行，我先辦簽證。"],
    challenge: { prompt: "Say this in Chinese: For the sake of practice, I study every day.", answer: "為了練習，我每天學習。" },
    usageNotes: ["為了 introduces reason or goal.", "It often comes before the main action."]
  },
  {
    id: "g20",
    lessonId: "L20",
    title: "地 before verbs",
    pattern: "adjective + 地 + verb",
    simple: "Use 地 to turn a describing word into the way an action is done.",
    examples: ["他高興地說。", "孩子傷心地哭。"],
    challenge: { prompt: "Say this in Chinese: She carefully looked after the child.", answer: "她小心地照顧孩子。" },
    usageNotes: ["地 links manner to action.", "It works a bit like -ly in English."]
  },
  {
    id: "g21",
    lessonId: "L20",
    title: "一路平安 as a fixed travel phrase",
    pattern: "一路平安",
    simple: "Use this fixed phrase to wish someone a safe trip.",
    examples: ["祝你一路平安。", "明天出發，一路平安！"],
    challenge: { prompt: "Say this in Chinese: Have a safe trip.", answer: "一路平安。" },
    usageNotes: ["This is a set phrase for travel.", "It is natural at airports and departures."]
  }
];
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

const grammarTopics = [...MandarinContent.grammarTopics, ...extraGrammarTopics];

const grammarState = {
  lessonFilter: "all",
  topicId: grammarTopics[0].id,
  theme: localStorage.getItem(THEME_KEY) || "light"
};

function currentGrammarTopic() {
  return grammarTopics.find((topic) => topic.id === grammarState.topicId) || grammarTopics[0];
}

function filteredTopics() {
  return grammarState.lessonFilter === "all"
    ? grammarTopics
    : grammarTopics.filter((topic) => topic.lessonId === grammarState.lessonFilter);
}

function applyTheme() {
  document.body.classList.toggle("dark-mode", grammarState.theme === "dark");
  grammarDom.themeToggleButton.textContent = grammarState.theme === "light" ? "☾" : "☀";
}

function renderLessonFilter() {
  const options = [
    `<option value="all">All lessons</option>`,
    ...MandarinContent.lessons.map((lesson) => `<option value="${lesson.id}">${lesson.title}</option>`)
  ];
  grammarDom.grammarLessonFilter.innerHTML = options.join("");
  grammarDom.grammarLessonFilter.value = grammarState.lessonFilter;
}

function renderGrammarTopics() {
  const topics = filteredTopics();
  if (!topics.find((topic) => topic.id === grammarState.topicId)) {
    grammarState.topicId = topics[0].id;
  }

  grammarDom.grammarTopicList.innerHTML = topics
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
  grammarDom.grammarLessonFilter.addEventListener("change", (event) => {
    grammarState.lessonFilter = event.target.value;
    renderGrammarTopics();
    renderGrammarDetails();
  });

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
