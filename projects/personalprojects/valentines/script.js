document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Setup
    const questions = [
        {
            q: "When is our first anniversary?",
            options: ["053021", "090821", "090822"],
            answer: "090822"
        },
        {
            q: "What is our favorite snack?",
            options: ["pancit canton", "o-puffs", "gulay"],
            answer: ["pancit canton", "o-puffs"]
        },
        {
            q: "Our most favorite season is:",
            options: ["Christmas Season", "Valentines Season", "Halloween Season"],
            answer: "Christmas Season"
        }
    ];

    let currentStep = 0;

    // 2. Element Selectors
    const introScreen = document.getElementById('intro-screen');
    const quizBox = document.getElementById('quiz-box');
    const congratsScreen = document.getElementById('congrats-screen');
    const finalAsk = document.getElementById('final-ask');
    const successMessage = document.getElementById('success-message');
    
    const startBtn = document.getElementById('start-btn');
    const congratsNextBtn = document.getElementById('congrats-next-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // 3. STEP 1: Proceed Logic
    startBtn.onclick = () => {
        introScreen.classList.add('hidden');
        quizBox.classList.remove('hidden');
        
        // Reveal Photos
        document.querySelectorAll('.corner-img').forEach(img => {
            img.classList.add('reveal');
        });
        
        loadQuestion();
    };

    // 4. STEP 2: Quiz Engine
    function loadQuestion() {
        const qData = questions[currentStep];
        const qText = document.getElementById('question-text');
        const container = document.getElementById('options-container');
        
        qText.innerText = qData.q;
        container.innerHTML = '';

        qData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.className = 'option-btn';
            btn.onclick = () => {
                const isCorrect = Array.isArray(qData.answer) 
                    ? qData.answer.includes(opt) 
                    : opt === qData.answer;
                    
                if (isCorrect) {
                    currentStep++;
                    if (currentStep < questions.length) {
                        loadQuestion(); 
                    } else {
                        quizBox.classList.add('hidden');
                        congratsScreen.classList.remove('hidden');
                    }
                } else {
                    qData.options.reverse(); 
                    loadQuestion();
                }
            };
            container.appendChild(btn);
        });
    }

    // 5. STEP 3: Congrats to Proposal Transition
    congratsNextBtn.onclick = () => {
        congratsScreen.classList.add('hidden');
        finalAsk.classList.remove('hidden');
    };

    // 6. STEP 4: Evasive Button Logic
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 100);
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
        noBtn.style.position = 'fixed'; // Makes it jump around the whole screen
    });

    // 7. STEP 5: Final YES
    yesBtn.onclick = () => {
        finalAsk.classList.add('hidden');
        successMessage.classList.remove('hidden');
    };
});