const THEME_KEY = "mandarin-theme";

const testDom = {
  themeToggleButton: document.querySelector("#themeToggleButton"),
  testNav: document.querySelector("#testNav"),
  testContent: document.querySelector("#testContent")
};

const testState = {
  activeSection: "listening",
  theme: localStorage.getItem(THEME_KEY) || "light"
};

const sectionPercentages = {
  listening: "40%",
  translation: "15%",
  reading: "15%",
  shortquestion1: "10%",
  shortquestion2: "5%",
  writing: "15%"
};

function applyTheme() {
  document.body.classList.toggle("dark-mode", testState.theme === "dark");
  testDom.themeToggleButton.textContent = testState.theme === "light" ? "☾" : "☀";
}

function renderNav() {
  testDom.testNav.innerHTML = Unit3Content.testSections.map(sec => `
    <button class="test-nav-button ${sec.id === testState.activeSection ? "active" : ""}" data-id="${sec.id}" type="button">
      <span class="icon">${sec.icon}</span>
      <span>${sec.title.replace(/ — .*%/, "")}</span>
      <span class="pct">${sectionPercentages[sec.id] || ""}</span>
    </button>
  `).join("");
}

function renderListening(sec) {
  return `
    <div class="section-label">${sec.icon} ${sec.title}</div>
    <h2 style="margin-top:8px">Listening — 40% of the test</h2>
    <p class="subtitle">The biggest section. Prepare by finishing ALL listening homework.</p>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Topics you will hear</h3>
      <ul class="plain-list" style="line-height:2">
        ${sec.topics.map(t => `<li>${t}</li>`).join("")}
      </ul>
      <div class="tip-box">💡 ${sec.tip}</div>
    </div>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Key vocabulary to recognize by sound</h3>
      <div class="sports-grid">
        ${[
          { s: "公寓", p: "gōngyù", e: "apartment" },
          { s: "房租", p: "fángzū", e: "rent" },
          { s: "押金", p: "yājīn", e: "deposit" },
          { s: "寵物", p: "chǒngwù", e: "pet" },
          { s: "冰箱", p: "bīngxiāng", e: "refrigerator" },
          { s: "西瓜", p: "xīgua", e: "watermelon" },
          { s: "運動", p: "yùndòng", e: "sports/exercise" },
          { s: "水平", p: "shuǐpíng", e: "level/standard" },
          { s: "提高", p: "tígāo", e: "to improve" },
          { s: "比賽", p: "bǐsài", e: "competition/match" },
          { s: "危險", p: "wēixiǎn", e: "dangerous" },
          { s: "為了", p: "wèile", e: "for the sake of" }
        ].map(v => `
          <div class="sport-pill">
            <div class="s-hanzi">${v.s}</div>
            <div class="s-pinyin">${v.p}</div>
            <div class="s-english">${v.e}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderTranslation(sec) {
  return `
    <div class="section-label">${sec.icon} ${sec.title}</div>
    <h2 style="margin-top:8px">Translation — 15% of the test</h2>
    <p class="subtitle">Know these words in BOTH directions (Chinese → English and English → Chinese).</p>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Must-know vocabulary (7 words)</h3>
      <div class="must-know-grid">
        ${sec.mustKnow.map(v => `
          <div class="vocab-pill">
            <span class="hanzi">${v.hanzi}</span>
            <span class="pinyin">${v.pinyin}</span>
            <span class="meaning">${v.english}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Translate into Chinese (hover/click to reveal)</h3>
      <div class="sentence-challenge">
        ${sec.sentences.map((s, i) => `
          <div class="sentence-pair">
            <div class="prompt">${i + 1}. ${s.prompt}</div>
            <div class="answer hidden-ans" data-revealed="false" title="Click to reveal">${s.answer}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="tip-box" style="margin-top:16px">💡 ${sec.tip}</div>
  `;
}

function renderReading(sec) {
  return `
    <div class="section-label">${sec.icon} ${sec.title}</div>
    <h2 style="margin-top:8px">Reading — 15% of the test</h2>
    <p class="subtitle">15 True/False questions across 3 reading passages. Read carefully — don't rush.</p>

    <div class="test-section-card" style="margin-top:16px">
      <h3>The 3 passages</h3>
      <div class="passage-list">
        ${sec.passages.map((p, i) => `
          <div class="passage-item">
            <div style="font-size:1.5rem;min-width:36px">${["🏠","⚽","📚"][i]}</div>
            <div>
              <div class="pass-title">${p.title}</div>
              <div class="pass-desc">${p.desc}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Key vocabulary for reading</h3>
      <div class="sports-grid">
        ${[
          { s: "宿舍", p: "sùshè", e: "dormitory" },
          { s: "傢俱", p: "jiājù", e: "furniture" },
          { s: "一樣", p: "yīyàng", e: "the same" },
          { s: "水平", p: "shuǐpíng", e: "level/standard" },
          { s: "腳", p: "jiǎo", e: "foot" },
          { s: "手", p: "shǒu", e: "hand" },
          { s: "踢", p: "tī", e: "to kick" },
          { s: "打", p: "dǎ", e: "to play (ball)" },
          { s: "連...都", p: "lián...dōu", e: "even..." },
          { s: "什麼都", p: "shénme dōu", e: "every/any/none" }
        ].map(v => `
          <div class="sport-pill">
            <div class="s-hanzi">${v.s}</div>
            <div class="s-pinyin">${v.p}</div>
            <div class="s-english">${v.e}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="tip-box" style="margin-top:16px">💡 ${sec.tip}</div>
  `;
}

function renderRentalAds(sec) {
  const ads = Unit3Content.rentalAds;
  return `
    <div class="section-label">${sec.icon} ${sec.title}</div>
    <h2 style="margin-top:8px">Renting Ad Short Answer — 10%</h2>
    <p class="subtitle">You will see two apartment ads. Pick ONE and write in Chinese why you want to rent it.</p>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Sample rental ads (for practice)</h3>
      <div class="ads-grid">
        ${ads.map(ad => `
          <div class="ad-card">
            <h4>${ad.title}</h4>
            <div class="ad-subtitle">${ad.subtitle}</div>
            <ul>
              ${ad.lines.map(l => `<li>${l}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="test-section-card" style="margin-top:16px">
      <h3>How to answer</h3>
      <div class="writing-points">
        <div class="writing-point"><span class="num">1</span>State which apartment you choose: 我想租廣告一（或二）。</div>
        <div class="writing-point"><span class="num">2</span>Mention the SIZE: 這個公寓有一房一廳，很大。</div>
        <div class="writing-point"><span class="num">3</span>Mention the RENT: 房租每月八百美元，不太貴。</div>
        <div class="writing-point"><span class="num">4</span>Mention what's INCLUDED: 連冰箱都有。/ 可以養寵物。</div>
        <div class="writing-point"><span class="num">5</span>Give your reason/feeling: 我覺得這個公寓很好，所以我想租。</div>
      </div>
    </div>

    <div class="tip-box" style="margin-top:16px">💡 ${sec.tip}</div>
  `;
}

function renderShortQ(sec) {
  return `
    <div class="section-label">${sec.icon} ${sec.title}</div>
    <h2 style="margin-top:8px">Short Questions — 5%</h2>
    <p class="subtitle">Know these 3 vocabulary words AND be able to write sports names in characters.</p>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Know the meaning of</h3>
      <div class="must-know-grid">
        ${sec.shortVocab.map(v => `
          <div class="vocab-pill">
            <span class="hanzi">${v.hanzi}</span>
            <span class="pinyin">${v.pinyin}</span>
            <span class="meaning">${v.english}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Sports to write in Chinese characters</h3>
      <div class="sports-grid">
        ${sec.sportsWriting.map(s => `
          <div class="sport-pill">
            <div class="s-hanzi">${s.char}</div>
            <div class="s-pinyin">${s.pinyin}</div>
            <div class="s-english">${s.english}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="tip-box" style="margin-top:16px">💡 ${sec.tip}</div>
  `;
}

function renderWriting(sec) {
  return `
    <div class="section-label">${sec.icon} ${sec.title}</div>
    <h2 style="margin-top:8px">Writing — 15% of the test</h2>
    <p class="subtitle">You will see pictures of a person doing sports. Describe what they like and how long they exercise.</p>

    <div class="test-section-card" style="margin-top:16px">
      <h3>What you need to do</h3>
      <div class="writing-points">
        ${sec.writingPoints.map((p, i) => `
          <div class="writing-point"><span class="num">${i + 1}</span>${p}</div>
        `).join("")}
      </div>
    </div>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Sports verbs — memorize these</h3>
      <div class="sports-grid">
        ${[
          { char: "打籃球", pinyin: "dǎ lánqiú", english: "play basketball" },
          { char: "打網球", pinyin: "dǎ wǎngqiú", english: "play tennis" },
          { char: "踢足球", pinyin: "tī zúqiú", english: "play soccer" },
          { char: "游泳", pinyin: "yóuyǒng", english: "swim" },
          { char: "打美式足球", pinyin: "dǎ Měishì zúqiú", english: "play American football" },
          { char: "跑步", pinyin: "pǎo bù", english: "jog/run" }
        ].map(s => `
          <div class="sport-pill">
            <div class="s-hanzi">${s.char}</div>
            <div class="s-pinyin">${s.pinyin}</div>
            <div class="s-english">${s.english}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Time expressions to know</h3>
      <div class="must-know-grid">
        ${[
          { hanzi: "每天", pinyin: "měitiān", english: "every day" },
          { hanzi: "每個星期", pinyin: "měi ge xīngqī", english: "every week" },
          { hanzi: "星期一", pinyin: "xīngqī yī", english: "Monday" },
          { hanzi: "一個小時", pinyin: "yí ge xiǎoshí", english: "one hour" },
          { hanzi: "兩個鐘頭", pinyin: "liǎng ge zhōngtóu", english: "two hours" },
          { hanzi: "半個小時", pinyin: "bàn ge xiǎoshí", english: "half an hour" }
        ].map(v => `
          <div class="vocab-pill">
            <span class="hanzi" style="font-size:1rem">${v.hanzi}</span>
            <span class="pinyin">${v.pinyin}</span>
            <span class="meaning">${v.english}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="test-section-card" style="margin-top:16px">
      <h3>Sample sentence structures</h3>
      <div class="writing-points">
        <div class="writing-point"><span class="num">A</span>我很喜歡打籃球。每個星期我打三次，每次打一個小時。</div>
        <div class="writing-point"><span class="num">B</span>我覺得游泳很好，但是有一點危險。</div>
        <div class="writing-point"><span class="num">C</span>為了健康，他每天跑步。</div>
        <div class="writing-point"><span class="num">D</span>他三個星期沒有游泳了。</div>
      </div>
    </div>

    <div class="tip-box" style="margin-top:16px">💡 ${sec.tip}</div>
    <div style="margin-top:12px;text-align:center">
      <a class="button-link" href="writing.html">→ Open Writing Practice</a>
    </div>
  `;
}

function renderTestContent() {
  const sec = Unit3Content.testSections.find(s => s.id === testState.activeSection);
  if (!sec) return;

  let html = "";
  switch (sec.id) {
    case "listening":     html = renderListening(sec); break;
    case "translation":   html = renderTranslation(sec); break;
    case "reading":       html = renderReading(sec); break;
    case "shortquestion1": html = renderRentalAds(sec); break;
    case "shortquestion2": html = renderShortQ(sec); break;
    case "writing":       html = renderWriting(sec); break;
    default:              html = `<p>Section not found.</p>`;
  }

  testDom.testContent.innerHTML = html;

  // Bind click-to-reveal on hidden answers
  testDom.testContent.querySelectorAll(".hidden-ans").forEach(el => {
    el.addEventListener("click", () => {
      el.classList.remove("hidden-ans");
    });
  });
}

function bindTestEvents() {
  testDom.testNav.addEventListener("click", e => {
    const btn = e.target.closest(".test-nav-button");
    if (!btn) return;
    testState.activeSection = btn.dataset.id;
    renderNav();
    renderTestContent();
  });
  testDom.themeToggleButton.addEventListener("click", () => {
    testState.theme = testState.theme === "light" ? "dark" : "light";
    localStorage.setItem(THEME_KEY, testState.theme);
    applyTheme();
  });
}

function initTestReview() {
  applyTheme();
  renderNav();
  renderTestContent();
  bindTestEvents();
}

initTestReview();
