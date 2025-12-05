<script>
const questions = [
    {
        question: "Quel mot de passe est le plus sécurisé ?",
        answers: ["123456", "password", "G@7k!9#F2"],
        correct: 2,
        explanation: "Un bon mot de passe doit contenir des majuscules, minuscules, chiffres et symboles."
    },
    {
        question: "Que faire si tu reçois un mail suspect ?",
        answers: ["Cliquer sur les liens", "Le supprimer / le signaler", "Répondre immédiatement"],
        correct: 1,
        explanation: "Ne clique jamais sur un lien suspect : il peut mener à un phishing."
    },
    {
        question: "Quel outil protège contre les virus ?",
        answers: ["Bloc-notes", "Calculatrice", "Antivirus"],
        correct: 2,
        explanation: "Un antivirus détecte et bloque les logiciels malveillants."
    },
    {
        question: "Que signifie HTTPS ?",
        answers: ["Site sécurisé", "Site lent", "Site dangereux"],
        correct: 0,
        explanation: "Le 'S' signifie Secure : les données sont chiffrées."
    },
    {
        question: "Quel est un signe de phishing ?",
        answers: ["Fautes d’orthographe", "Message très professionnel", "Adresse d’envoi fiable"],
        correct: 0,
        explanation: "Les pirates utilisent souvent de mauvais français et des mails mal rédigés."
    },
    {
        question: "Quel est le meilleur lieu pour stocker un mot de passe ?",
        answers: ["Sur un papier", "Dans un gestionnaire de mots de passe", "Dans un SMS"],
        correct: 1,
        explanation: "Les gestionnaires chiffrent et protègent vos mots de passe."
    },
    {
        question: "Une mise à jour sert principalement à…",
        answers: ["Changer la couleur du téléphone", "Corriger des failles de sécurité", "Ajouter de la pub"],
        correct: 1,
        explanation: "Les mises à jour corrigent les vulnérabilités exploitées par les hackers."
    },
    {
        question: "Un réseau Wi-Fi public est…",
        answers: ["100% sécurisé", "À éviter sans VPN", "Plus rapide que le Wi-Fi privé"],
        correct: 1,
        explanation: "Les Wi-Fi publics ne sont pas chiffrés : on peut facilement intercepter vos données."
    },
    {
        question: "Quel est le signe d’un site potentiellement dangereux ?",
        answers: ["Beaucoup de pubs étranges", "HTTPS dans l’URL", "Logo de Google"],
        correct: 0,
        explanation: "Les sites pirates affichent souvent des pubs agressives et des pop-ups."
    },
    {
        question: "Un malware est…",
        answers: ["Un logiciel malveillant", "Une application de musique", "Un antivirus"],
        correct: 0,
        explanation: "Malware = MALicious softWARE, un programme conçu pour nuire."
    }
];

let index = 0;

const btnStart = document.getElementById("btn-start");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");

btnStart.onclick = () => {
    btnStart.style.display = "none";
    quizContainer.style.display = "block";
    afficherQuestion();
};

function afficherQuestion() {
    const q = questions[index];
    questionEl.textContent = q.question;
    progressEl.textContent = `Question ${index + 1} / ${questions.length}`;

    answersEl.innerHTML = "";

    q.answers.forEach((rep, i) => {
        const btn = document.createElement("button");
        btn.className = "btn-answer";
        btn.textContent = rep;

        btn.onclick = () => verifierReponse(btn, i);

        answersEl.appendChild(btn);
    });
}

function verifierReponse(btn, choix) {
    const correcte = questions[index].correct;

    const allButtons = document.querySelectorAll(".btn-answer");
    allButtons.forEach(b => b.disabled = true);

    if (choix === correcte) {
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
        allButtons[correcte].classList.add("correct");
    }

    // Affiche l'explication sous la question
    const explanationBox = document.createElement("p");
    explanationBox.style.marginTop = "20px";
    explanationBox.style.background = "#16204a";
    explanationBox.style.padding = "15px";
    explanationBox.style.borderRadius = "10px";
    explanationBox.innerHTML = "ℹ️ " + questions[index].explanation;
    answersEl.appendChild(explanationBox);
}

nextBtn.onclick = () => {
    index++;
    if (index < questions.length) {
        afficherQuestion();
    } else {
        finDuQuiz();
    }
};

function finDuQuiz() {
    quizContainer.innerHTML = `
        <h2>Bravo ! 🎉</h2>
        <p>Vous avez terminé le quiz débutant !</p>
        <button class="btn-restart" onclick="location.reload()">Recommencer</button>
        <br><br>
        <button class="btn-restart" onclick="window.location.href='apprendre.html'">Retour aux quiz</button>
    `;
}
</script>


