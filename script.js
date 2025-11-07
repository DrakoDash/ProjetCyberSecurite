function demarrerQuiz() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = `
    <h2>Quiz de Cybersécurité 🧠</h2>
    <p><strong>Question 1 :</strong> Que dois-tu faire si tu reçois un email suspect ?</p>
    <button onclick="bonneReponse(this)">🚫 Ne pas cliquer et le signaler</button>
    <button onclick="mauvaiseReponse(this)">🔗 Cliquer pour voir ce que c’est</button>
    <button onclick="mauvaiseReponse(this)">📤 Le transférer à un ami</button>
  `;
}

function bonneReponse(btn) {
  btn.style.background = "green";
  alert("✅ Bravo ! C’est la bonne réponse !");
}

function mauvaiseReponse(btn) {
  btn.style.background = "red";
  alert("❌ Mauvaise réponse. Ne clique jamais sur un lien suspect !");
}
