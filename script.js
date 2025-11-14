// ------------------------------
// BASE DE DONNÉES DU QUIZ
// ------------------------------

const quizData = [
    {
        type: "qcm",
        question: "Qu'est-ce que le phishing ?",
        options: [
            "Une attaque qui tente de tromper l'utilisateur",
            "Une mise à jour Windows",
            "Un logiciel de nettoyage"
        ],
        correct: 0,
        explain: "Le phishing vise à voler des informations via de faux messages/pièges."
    },
    {
        type: "qcm",
        question: "Quel mot de passe est le plus sécurisé ?",
        options: ["12345678", "Martin2024", "R#8!eT9pQ2?"],
        correct: 2,
        explain: "Il contient lettres, chiffres et symboles."
    },
    {
        type: "vf",
        question: "Les Wi-Fi publics sont 100% sûrs.",
        options: ["Vrai", "Faux"],
        correct: 1,
        explain: "Les Wi-Fi publics peuvent être espionnés : éviter les données sensibles."
    },
    // (Tu peux ajouter encore + de questions ici)
];

// ------------------------------
// VARIABLES
// ------------------------------

let timerValue = 0;
let timerInterval = null;

// ------------------------------
// AFFICHAGE DU QUIZ
// ------------------------------

function displayQuiz() {
    const quizContainer = document.getElementById("quiz");

    quizData.forEach((q, i) => {
        let html = `
        <div class="question-box">
            <h3>${i + 1}. ${q.question}</h3>
        `;

        q.options.forEach((opt, j) => {
            html += `
                <label>
                    <input type="radio" name="q${i}" value="${j}">
                    ${opt}
                </label><br>
            `;
        });

        html += "</div>";
        quizContainer.innerHTML += html;
    });
}

// ------------------------------
// CHRONOMÈTRE
// ------------------------------

function startTimer(seconds) {
    const timerBox = document.getElementById("timer-box");
    const timerDisplay = document.getElementById("timer");

    timerValue = seconds;
    timerDisplay.textContent = timerValue;

    timerBox.classList.remove("hidden");

    timerInterval = setInterval(() => {
        timerValue--;
        timerDisplay.textContent = timerValue;

        if (timerValue <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

// ------------------------------
// BOUTON DE DÉMARRAGE
// ------------------------------

document.getElementById("start-btn").addEventListener("click", () => {
    const name = document.getElementById("player-name").value.trim();
    const timeOption = parseInt(document.getElementById("timer-choice").value);

    if (!name) {
        alert("Veuillez entrer votre nom.");
        return;
    }

    document.getElementById("start-menu").classList.add("hidden");

    displayQuiz();

    document.getElementById("finish-btn").classList.remove("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    if (timeOption > 0) startTimer(timeOption);
});

// ------------------------------
// CORRECTIONS
// ------------------------------

function finishQuiz() {
    clearInterval(timerInterval);

    let score = 0;
    let resultsHTML = "<h2>Résultats</h2>";

    quizData.forEach((q, i) => {
        const answer = document.querySelector(`input[name='q${i}']:checked`);

        if (!answer) {
            resultsHTML += `<p class="bad">${i + 1}. Aucune réponse donnée.</p>`;
            return;
        }

        const value = parseInt(answer.value);

        if (value === q.correct) {
            score++;
            resultsHTML += `<p class="good"><b>${i + 1}. Correct</b> — ${q.explain}</p>`;
        } else {
            resultsHTML += `<p class="bad"><b>${i + 1}. Mauvais</b><br>Bonne réponse : ${q.options[q.correct]}<br>${q.explain}</p>`;
        }
    });

    resultsHTML += `<h2>Score final : ${score} / ${quizData.length}</h2>`;

    document.getElementById("results").innerHTML = resultsHTML;
    document.getElementById("results").classList.remove("hidden");

    saveScore(score);
    updateScoreboard();

    window.scrollTo(0, document.body.scrollHeight);
}

document.getElementById("finish-btn").addEventListener("click", finishQuiz);

// ------------------------------
// CLASSEMENT LOCAL
// ------------------------------

function saveScore(score) {
    const name = document.getElementById("player-name").value;
    const date = new Date().toLocaleDateString();
    const time = timerValue > 0 ? timerValue : "Sans chrono";

    const entry = { name, score, date, time };

    let board = JSON.parse(localStorage.getItem("scoreboard")) || [];
    board.push(entry);

    board.sort((a, b) => b.score - a.score);

    localStorage.setItem("scoreboard", JSON.stringify(board));
}

function updateScoreboard() {
    const boardDiv = document.getElementById("scoreboard");
    let board = JSON.parse(localStorage.getItem("scoreboard")) || [];

    let html = "<table><tr><th>Nom</th><th>Score</th><th>Date</th><th>Temps</th></tr>";

    board.forEach(e => {
        html += `<tr>
            <td>${e.name}</td>
            <td>${e.score}</td>
            <td>${e.date}</td>
            <td>${e.time}</td>
        </tr>`;
    });

    html += "</table>";
    boardDiv.innerHTML = html;
}

updateScoreboard();
