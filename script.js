/* script.js - version debug-friendly */

// utilitaires
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

// simple jeu de questions (extraits pour test rapide)
const questions = {
  enfant: [
    { id: "e1", type: "qcm", question: "Que faut-il faire si quelqu’un te demande ton mot de passe ?", options: ["Le donner","Le garder secret","Le noter sur un post-it public"], correct: 1, explain: "Ton mot de passe est privé : ne le donne jamais." },
    { id: "e2", type: "vf", question: "Il faut partager ses mots de passe avec ses amis.", options: ["Vrai","Faux"], correct: 1, explain: "Ne partage jamais tes mots de passe." }
    // ... ajoute les autres questions comme précédemment
  ],
  adulte: [
    { id: "a1", type: "qcm", question: "Quel protocole chiffre la navigation web ?", options: ["HTTP","FTP","HTTPS"], correct: 2, explain: "HTTPS chiffre les communications entre navigateur et serveur." }
    // ... etc
  ],
  expert: [
    { id: "x1", type: "qcm", question: "Qu'est-ce qu'une attaque 'zero-day' ?", options: ["Une attaque du jour zéro","Une faille inconnue exploitée","Un faux antivirus"], correct: 1, explain: "Zero-day = faille inconnue et exploitée." }
    // ... etc
  ]
};

// état
let state = {
  player: "",
  level: "enfant",
  questionList: [],
  index: 0,
  answers: {},
  startTime: null,
  timer: 0,
  timerInterval: null,
  neon: true,
  showHints: false
};

// init UI
function initUI(){
  console.log("initUI start");
  $all(".level-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      $all(".level-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      state.level = btn.dataset.level;
      console.log("niveau sélectionné:", state.level);
    });
  });

  $("#startQuizBtn").addEventListener("click", startQuiz);
  $("#prevBtn").addEventListener("click", prevQuestion);
  $("#nextBtn").addEventListener("click", nextQuestion);
  $("#submitBtn").addEventListener("click", finishQuiz);
  $("#restartBtn")?.addEventListener("click", ()=>location.reload());
  $("#backToSetupBtn")?.addEventListener("click", backToSetup);
  $("#clearScores").addEventListener("click", ()=>{ localStorage.removeItem("qc_scores"); updateScoreboard(); });
  updateScoreboard();
  console.log("initUI done");
}

document.addEventListener("DOMContentLoaded", initUI);

function startQuiz(){
  console.log("startQuiz clicked");
  const name = $("#playerName").value.trim();
  if(!name){ alert("Indique ton nom pour démarrer."); return; }
  state.player = name;
  state.neon = $("#neonToggle").checked;
  state.showHints = $("#showHints").checked;

  // clone questions
  const list = questions[state.level];
  if(!list || list.length === 0){
    alert("Aucune question pour ce niveau — vérifie script.js");
    console.error("Pas de questions pour", state.level);
    return;
  }
  state.questionList = JSON.parse(JSON.stringify(list));
  shuffle(state.questionList);

  state.index = 0;
  state.answers = {};
  state.startTime = Date.now();

  const t = parseInt($("#timerSelect").value);
  if(t>0){
    state.timer = t;
    startTimer();
  } else {
    $("#timerBox").classList.add("hidden");
  }

  $("#displayName").textContent = state.player;
  $("#displayLevel").textContent = state.level.toUpperCase();
  $("#setup-panel").classList.add("hidden");
  $("#quiz-panel").classList.remove("hidden");
  $("#results-panel").classList.add("hidden");

  renderQuestion();
}

function startTimer(){
  $("#timerBox").classList.remove("hidden");
  $("#timerValue").textContent = state.timer;
  state.timerInterval = setInterval(()=>{
    state.timer--;
    $("#timerValue").textContent = state.timer;
    if(state.timer<=0){ clearInterval(state.timerInterval); finishQuiz(); }
  },1000);
}

function renderQuestion(){
  const qObj = state.questionList[state.index];
  console.log("renderQuestion", state.index, qObj && qObj.id);
  const card = $("#questionCard");
  card.innerHTML = "";

  if(state.neon) card.classList.add("neon"); else card.classList.remove("neon");

  const h = document.createElement("h2");
  h.textContent = `Question ${state.index+1} / ${state.questionList.length}`;
  card.appendChild(h);

  const qt = document.createElement("div");
  qt.className = "question-text";
  qt.textContent = qObj.question;
  card.appendChild(qt);

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  if(qObj.type === "qcm" || qObj.type === "vf" || qObj.type === "situation"){
    qObj.options.forEach((opt,i)=>{
      const lab = document.createElement("label");
      lab.className = "option";
      lab.innerHTML = `<input type="radio" name="opt" value="${i}"><span class="label">${opt}</span>`;
      lab.addEventListener("click", ()=> {
        lab.querySelector("input").checked = true;
        state.answers[qObj.id] = parseInt(lab.querySelector("input").value);
      });
      optionsDiv.appendChild(lab);
    });
  } else if(qObj.type === "multi"){
    qObj.options.forEach((opt,i)=>{
      const lab = document.createElement("label");
      lab.className = "option";
      lab.innerHTML = `<input type="checkbox" name="optMulti" value="${i}"><span class="label">${opt}</span>`;
      lab.addEventListener("click", ()=>{
        const cb = lab.querySelector("input");
        cb.checked = !cb.checked;
        const existing = state.answers[qObj.id] || [];
        const val = parseInt(cb.value);
        if(cb.checked && !existing.includes(val)) existing.push(val);
        if(!cb.checked && existing.includes(val)) state.answers[qObj.id] = existing.filter(x=>x!==val);
        else state.answers[qObj.id] = existing;
      });
      optionsDiv.appendChild(lab);
    });
  } else if(qObj.type === "find"){
    qObj.options.forEach((opt,i)=>{
      const box = document.createElement("div");
      box.className = "option";
      box.textContent = opt;
      box.addEventListener("click", ()=> {
        state.answers[qObj.id] = i;
        $all(".option").forEach(o=>o.style.borderColor="rgba(255,255,255,0.03)");
        box.style.borderColor = "rgba(255,200,0,0.6)";
      });
      optionsDiv.appendChild(box);
    });
  } else if(qObj.type === "drag"){
    // not implemented in this short debug set
    const p = document.createElement("div");
    p.textContent = "Drag & drop non disponible dans ce test.";
    optionsDiv.appendChild(p);
  }

  card.appendChild(optionsDiv);

  // navigation visibility
  $("#prevBtn").disabled = state.index === 0;
  $("#nextBtn").classList.toggle("hidden", state.index >= state.questionList.length-1);
  $("#submitBtn").classList.toggle("hidden", state.index < state.questionList.length-1);
}

function prevQuestion(){ if(state.index>0){ state.index--; renderQuestion(); } }
function nextQuestion(){
  const qId = state.questionList[state.index].id;
  if(state.answers[qId] === undefined){
    if(!confirm("Tu n'as pas répondu à cette question. Continuer quand même ?")) return;
  }
  if(state.index < state.questionList.length-1){ state.index++; renderQuestion(); }
}

function finishQuiz(){
  clearInterval(state.timerInterval);
  let correctCount = 0;
  const details = [];
  state.questionList.forEach(q=>{
    const given = state.answers[q.id];
    let ok = false;
    if(q.type === "multi"){
      const exp = Array.isArray(q.correct)? q.correct.slice().sort(): [];
      const got = Array.isArray(given)? given.slice().sort(): [];
      ok = JSON.stringify(exp) === JSON.stringify(got);
    } else {
      ok = (given !== undefined) && (given === q.correct);
    }
    if(ok) correctCount++;
    let block = `<div class="detailed"><strong>${q.question}</strong><br>`;
    if(given === undefined){
      block += `<div class="result-bad">Aucune réponse fournie.</div>`;
      block += `<div>➤ Bonne réponse : ${formatCorrect(q)}</div>`;
    } else if(ok){
      block += `<div class="result-good">✅ Correct</div>`;
    } else {
      block += `<div class="result-bad">❌ Incorrect</div>`;
      block += `<div>➤ Ta réponse : ${formatGiven(q, given)}</div>`;
      block += `<div>➤ Bonne réponse : ${formatCorrect(q)}</div>`;
    }
    block += `<div style="margin-top:8px;color:var(--muted)">${q.explain || ''}</div></div>`;
    details.push(block);
  });

  const elapsed = Math.round((Date.now() - state.startTime)/1000);
  const summary = `<div id="summaryBox">
    <p class="result-good">Score : ${correctCount} / ${state.questionList.length}</p>
    <p>Temps utilisé : ${elapsed}s</p>
    <p>Niveau : ${state.level}</p>
  </div>`;

  $("#resultsSummary").innerHTML = summary;
  $("#detailedResults").innerHTML = details.join("");
  $("#quiz-panel").classList.add("hidden");
  $("#results-panel").classList.remove("hidden");

  saveScoreLocal({ name: state.player, score: correctCount, total: state.questionList.length, level: state.level, time: elapsed, date: (new Date()).toLocaleString() });
  updateScoreboard();
}

function formatCorrect(q){
  if(q.type === "multi") return q.correct.map(i=>q.options[i]).join(", ");
  return q.options && q.options[q.correct] ? q.options[q.correct] : q.correct;
}
function formatGiven(q, given){
  if(q.type === "multi") return (Array.isArray(given)? given.map(i=>q.options[i]).join(", "): given);
  return q.options && q.options[given] ? q.options[given] : given;
}

function saveScoreLocal(entry){
  const key = "qc_scores";
  let arr = JSON.parse(localStorage.getItem(key) || "[]");
  arr.push(entry);
  arr.sort((a,b)=> (b.score - a.score) || (a.time - b.time));
  arr = arr.slice(0,50);
  localStorage.setItem(key, JSON.stringify(arr));
}
function updateScoreboard(){
  const key = "qc_scores";
  const arr = JSON.parse(localStorage.getItem(key) || "[]");
  if(arr.length === 0){
    $("#scoreboard").innerHTML = "<p style='color:var(--muted)'>Aucun score pour l'instant — sois le premier !</p>";
    return;
  }
  let html = `<table><thead><tr><th>Rang</th><th>Nom</th><th>Score</th><th>Niveau</th><th>Temps(s)</th><th>Date</th></tr></thead><tbody>`;
  arr.forEach((e,i)=>{
    html += `<tr><td>${i+1}</td><td>${e.name}</td><td>${e.score}/${e.total||'?'}</td><td>${e.level}</td><td>${e.time}</td><td>${e.date}</td></tr>`;
  });
  html += `</tbody></table>`;
  $("#scoreboard").innerHTML = html;
}

function shuffle(array){ for(let i=array.length-1;i>0;i--){ const j= Math.floor(Math.random()*(i+1)); [array[i],array[j]]=[array[j],array[i]]; } return array; }
function backToSetup(){ $("#results-panel").classList.add("hidden"); $("#setup-panel").classList.remove("hidden"); location.reload(); }
