/* ------------------------------
   Quiz Cybersécurité - script.js
   Mode : par question / neon / scoreboard local
   ------------------------------ */

/* ---------- Configuration des questions ----------
   Chaque question = {
     id: string,
     type: "qcm" | "multi" | "vf" | "situation" | "find" | "drag",
     question: "texte",
     options: [...],
     correct: index or [indexes] or logic,
     explain: "texte",
     hint: "texte" (optionnel)
   }
*/

// ---------- QUESTIONS (exemples nombreux) ----------
const questions = {
  enfant: [
    { id:"e1", type:"qcm", question:"Que faut-il faire si quelqu’un te demande ton mot de passe ?", options:["Le donner","Le garder secret","Le noter sur un post-it public"], correct:1, explain:"Ton mot de passe est privé : ne le donne jamais."},
    { id:"e2", type:"vf", question:"Il faut partager ses mots de passe avec ses amis.", options:["Vrai","Faux"], correct:1, explain:"Ne partage jamais tes mots de passe."},
    { id:"e3", type:"qcm", question:"Que signifie le petit cadenas dans le navigateur ?", options:["Site sécurisé (HTTPS)","Site amusant","Site payant"], correct:0, explain:"Le cadenas indique que les données sont chiffrées (HTTPS)."},
    { id:"e4", type:"situation", question:"Tu reçois un cadeau gratuit par mail, que fais-tu ?", options:["Cliquer sur le lien","Supprimer le message","Partager le coupon"], correct:1, explain:"Les offres inattendues sont souvent des arnaques."},
    { id:"e5", type:"qcm", question:"Quel mot de passe est le plus fort ?", options:["1234","MonPrenom","Pastille!92"], correct:2, explain:"Un mot de passe fort contient lettres, chiffres et symboles."},
    { id:"e6", type:"find", question:"Trouve l'adresse suspecte :", options:["https://google.com","https://g00gle.com","https://example.com"], correct:1, explain:"Le second remplace des lettres par des chiffres (typo-squatting)."},
    { id:"e7", type:"qcm", question:"Faut-il faire les mises à jour du téléphone ?", options:["Oui","Non","Parfois"], correct:0, explain:"Les mises à jour corrigent des failles."},
    { id:"e8", type:"vf", question:"Un antivirus te protège contre toutes les erreurs humaines.", options:["Vrai","Faux"], correct:1, explain:"L'antivirus aide mais les bons comportements comptent."},
    { id:"e9", type:"multi", question:"Quelles actions protègent ton compte ? (choix multiple)", options:["2FA (double-auth)","Utiliser le même mot de passe partout","Choisir un mot de passe unique"], correct:[0,2], explain:"Active 2FA et utilise des mots de passe uniques."},
    { id:"e10", type:"qcm", question:"Quel fichier est potentiellement dangereux ?", options:["photo.jpg","document.pdf","programme.exe"], correct:2, explain:"Les fichiers .exe peuvent exécuter du code malveillant."},
    { id:"e11", type:"qcm", question:"Que faire si un inconnu te demande ton adresse ?", options:["La donner","Ne pas la donner","La publier"], correct:1, explain:"Ne donne pas d'informations personnelles à des inconnus."},
    { id:"e12", type:"situation", question:"Ton ami te demande d'installer une application piratée, tu : ", options:["L'installer","Refuser et expliquer pourquoi","Lui prêter ton téléphone"], correct:1, explain:"Les versions piratées contiennent souvent des logiciels malveillants."},
    { id:"e13", type:"qcm", question:"Quel est un bon réflexe sur Wi-Fi public ?", options:["Faire des achats en ligne","Éviter les actions sensibles","Télécharger des fichiers lourds"], correct:1, explain:"Évite d'entrer des mots de passe sur un Wi-Fi public."},
    { id:"e14", type:"vf", question:"Un site officiel demande toujours des mots de passe par email.", options:["Vrai","Faux"], correct:1, explain:"Les sites officiels ne demandent pas ton mot de passe par email."},
    { id:"e15", type:"qcm", question:"Que signifie '2FA' ?", options:["Deux fois en France","Double authentification","Deux fonctions automatiques"], correct:1, explain:"2FA = double authentification, une seconde vérification pour sécuriser."},
    { id:"e16", type:"qcm", question:"Si un lien semble bizarre tu dois :", options:["Cliquer immédiatement","Vérifier l'adresse avant","Partager"], correct:1, explain:"Vérifie toujours l'URL avant de cliquer."},
    { id:"e17", type:"find", question:"Trouve le comportement dangereux :", options:["Installer une mise à jour officielle","Ouvrir un fichier reçu d'inconnu","Utiliser un gestionnaire de mots de passe"], correct:1, explain:"N'ouvre pas de fichiers envoyés par inconnus."},
    { id:"e18", type:"qcm", question:"Pourquoi ne pas utiliser un mot de passe simple ?", options:["Parce que c'est moche","Parce que c'est facile à deviner","Parce que c'est trop long"], correct:1, explain:"Les mots simples sont faciles à deviner pour un pirate."},
    { id:"e19", type:"vf", question:"Partager une photo privée peut être risqué.", options:["Vrai","Faux"], correct:0, explain:"Réfléchis aux conséquences avant de partager des données privées."},
    { id:"e20", type:"qcm", question:"Qui peut t'aider si tu es victime d'une arnaque en ligne ?", options:["Ta banque / parent / service client","Un inconnu","Personne"], correct:0, explain:"Contacte ta banque ou un adulte responsable rapidement."}
  ],
  adulte: [
    { id:"a1", type:"qcm", question:"Quel protocole chiffre la navigation web ?", options:["HTTP","FTP","HTTPS"], correct:2, explain:"HTTPS chiffre les communications entre navigateur et serveur."},
    { id:"a2", type:"qcm", question:"Qu'est-ce qu'un ransomware ?", options:["Un type d'antivirus","Un logiciel qui chiffre vos fichiers et réclame une rançon","Un outil de sauvegarde"], correct:1, explain:"Le ransomware chiffre les fichiers et demande une rançon."},
    { id:"a3", type:"multi", question:"Quelles pratiques améliorent la sécurité d'un compte ?", options:["Activer 2FA","Partager le mot de passe","Utiliser un gestionnaire de mots de passe"], correct:[0,2], explain:"2FA + gestionnaire = bonne protection."},
    { id:"a4", type:"qcm", question:"Quel est l'objectif d'une attaque DDoS ?", options:["Voler des données","Rendre un service indisponible","Installer un virus"], correct:1, explain:"DDoS vise à submerger un service pour le rendre indisponible."},
    { id:"a5", type:"vf", question:"Une mise à jour peut corriger des failles de sécurité.", options:["Vrai","Faux"], correct:0, explain:"Les mises à jour corrigent souvent des vulnérabilités."},
    { id:"a6", type:"find", question:"Repérez l'URL trompeuse :", options:["https://apple.com","https://apple-support.com.safe","https://applee.com"], correct:2, explain:"applee.com (lettre supplémentaire) est un faux possible."},
    { id:"a7", type:"qcm", question:"Quel outil permet d'éviter de répéter les mots de passe ?", options:["Un gestionnaire de mots de passe","Un antivirus","Un VPN"], correct:0, explain:"Le gestionnaire stocke et génère des mots de passe uniques."},
    { id:"a8", type:"situation", question:"Vous recevez une facture inconnue par mail. Vous :", options:["Payez de suite","Vérifiez l'expéditeur et contactez le fournisseur","Transférez à un ami"], correct:1, explain:"Vérifiez avant de payer : c'est peut-être une arnaque."},
    { id:"a9", type:"qcm", question:"Quelle est une bonne pratique pour les sauvegardes ?", options:["Sauvegarder régulièrement","Ne jamais sauvegarder","Sauvegarder sur le même disque"], correct:0, explain:"Sauvegardes régulières et hors site recommandées."},
    { id:"a10", type:"qcm", question:"Que fait un pare-feu ?", options:["Filtre le trafic réseau","Accélère le processeur","Gère la musique"], correct:0, explain:"Le pare-feu filtre et bloque le trafic suspect."},
    { id:"a11", type:"multi", question:"Quelles sources sont fiables ?", options:["Site officiel","Mail non sollicité","Magasin d'applications officiel"], correct:[0,2], explain:"Privilégie les sites officiels et stores reconnus."},
    { id:"a12", type:"qcm", question:"Qu'est-ce que le social engineering ?", options:["Technique de piratage basée sur la manipulation des personnes","Un logiciel de sécurité","Un type de firewall"], correct:0, explain:"L'ingénierie sociale exploite la confiance humaine."},
    { id:"a13", type:"vf", question:"Un VPN chiffre tout le trafic entre toi et le serveur VPN.", options:["Vrai","Faux"], correct:0, explain:"VPN chiffre la connexion entre ton appareil et le serveur VPN."},
    { id:"a14", type:"qcm", question:"Quelle méthode limite l'exposition des identifiants ?", options:["Utiliser un mot de passe réutilisé","Utiliser des mots de passe uniques","Les écrire dans un fichier texte"], correct:1, explain:"Les mots uniques réduisent l'impact d'une fuite."},
    { id:"a15", type:"find", question:"Trouve l'élément risqué dans une app :", options:["Mots de passe stockés en clair","Authentification forte","Chiffrement des données"], correct:0, explain:"Stocker les mots de passe en clair est dangereux."},
    { id:"a16", type:"qcm", question:"Qu'est-ce qu'une injection SQL cible ?", options:["Le navigateur","La base de données","Le routeur"], correct:1, explain:"L'injection vise les bases de données via des requêtes malformées."},
    { id:"a17", type:"situation", question:"Un collègue te demande d'utiliser son compte pour accéder à des fichiers, tu : ", options:["Accepte","Refuses et demandes son identité","Utilises sans demander"], correct:1, explain:"Ne partage pas de comptes : demande des comptes dédiés."},
    { id:"a18", type:"multi", question:"Que faire après une fuite de données ?", options:["Changer les mots de passe concernés","Ignorer","Surveiller son compte bancaire"], correct:[0,2], explain:"Change les mots de passe et surveille tes comptes."},
    { id:"a19", type:"qcm", question:"Qu'est-ce que le 'typo-squatting' ?", options:["Scrutation d'email","Création de domaines proches pour tromper","Attaque par force brute"], correct:1, explain:"Typo-squatting crée des domaines ressemblants pour piéger."},
    { id:"a20", type:"vf", question:"Les extensions navigateur demandent souvent des permissions sensibles.", options:["Vrai","Faux"], correct:0, explain:"Vérifie les permissions avant d'installer une extension."},
    { id:"a21", type:"qcm", question:"Pourquoi chiffrer les sauvegardes ?", options:["Pour les rendre plus petites","Pour protéger le contenu en cas de vol","Pour les partager facilement"], correct:1, explain:"Le chiffrement protège les données s'il y a fuite/vol."},
    { id:"a22", type:"find", question:"Repère le comportement à risque pour un administrateur :", options:["Utiliser sudo sans vérifier","Documenter les actions","Utiliser des comptes restreints"], correct:0, explain:"Utiliser sudo sans précaution peut causer des incidents."},
    { id:"a23", type:"qcm", question:"Quel logiciel aide à détecter des malwares ?", options:["Un antivirus","Un éditeur de texte","Un gestionnaire de mots"], correct:0, explain:"Les antivirus analysent et détectent des logiciels malveillants."},
    { id:"a24", type:"multi", question:"Quels éléments doivent être sauvegardés ?", options:["Données personnelles","Système d'exploitation téléchargeable","Photos familiales"], correct:[0,2], explain:"Sauvegarde les données critiques et personnelles."},
    { id:"a25", type:"vf", question:"On doit signaler un e-mail de phishing à son service IT.", options:["Vrai","Faux"], correct:0, explain:"Signaler aide à protéger les autres et résoudre l'incident."}
  ],
  expert: [
    { id:"x1", type:"qcm", question:"Qu'est-ce qu'une attaque 'zero-day' ?", options:["Une attaque le jour zéro d'une appli","Utiliser une faille inconnue du fournisseur","Un faux antivirus"], correct:1, explain:"Zero-day = faille inconnue du fabricant et exploitée."},
    { id:"x2", type:"qcm", question:"Quel est le but d'une 'privilege escalation' ?", options:["Obtenir des droits supérieurs","Réduire les droits","Effacer les logs"], correct:0, explain:"Escalade = obtenir des privilèges plus élevés."},
    { id:"x3", type:"multi", question:"Quelles mesures réduisent le risque d'injection SQL ?", options:["Préparer les requêtes","Valider les entrées","Utiliser un pare-feu applicatif"], correct:[0,1,2], explain:"Paramétrer, valider, et WAF aident à prévenir l'injection."},
    { id:"x4", type:"qcm", question:"Que permet un WAF (Web Application Firewall) ?", options:["Filtrer requêtes HTTP malveillantes","Optimiser la vitesse","Gérer les sauvegardes"], correct:0, explain:"Un WAF filtre les requêtes malveillantes sur une app web."},
    { id:"x5", type:"vf", question:"Le 'pen test' simule une attaque pour trouver des failles.", options:["Vrai","Faux"], correct:0, explain:"Les pentests évaluent la sécurité en simulant des attaques."},
    { id:"x6", type:"find", question:"Repère le vecteur d'attaque fréquent :", options:["Pièce jointe inconnue","Exécutable connu","Site officiel"], correct:0, explain:"Les pièces jointes inconnues sont souvent des vecteurs."},
    { id:"x7", type:"qcm", question:"Quelle méthode détecte une exfiltration de données ?", options:["Surveiller les logs réseau","Désinstaller antivirus","Augmenter la RAM"], correct:0, explain:"La surveillance des logs réseau peut révéler exfiltration."},
    { id:"x8", type:"situation", question:"Vous trouvez une clé USB dans un parking. Vous :", options:["La branchez sur votre poste","La donnez au service IT","La gardez"], correct:1, explain:"Ne branchez jamais de clé inconnue : risque d'infection."},
    { id:"x9", type:"qcm", question:"Quelle technique aide au 'recovery' après ransomware ?", options:["Avoir des sauvegardes hors ligne","Payer la rançon immédiatement","Ignorer le problème"], correct:0, explain:"Sauvegardes hors ligne permettent de restaurer sans payer."},
    { id:"x10", type:"multi", question:"Quels contrôles améliorent la sécurité du cloud ?", options:["MFA","Segmentation réseau","Permissions minimales"], correct:[0,1,2], explain:"Ces contrôles réduisent la surface d'attaque en cloud."},
    { id:"x11", type:"qcm", question:"Qu'est-ce qu'une 'supply chain attack' ?", options:["Attaque contre fournisseurs d'un service","Attaque locale sur disque","Attaque par déni de service"], correct:0, explain:"La chaîne d'approvisionnement est compromise pour toucher des clients."},
    { id:"x12", type:"vf", question:"La mise en place d'un inventory aide la sécurité.", options:["Vrai","Faux"], correct:0, explain:"Connaître les actifs facilite la protection et l'analyse."},
    { id:"x13", type:"qcm", question:"Quel protocole pour gestion sécurisée des clés ?", options:["HTTP","SSH","KMIP"], correct:2, explain:"KMIP est un standard pour la gestion des clés (Key Management)."},
    { id:"x14", type:"find", question:"Identifiez le problème de configuration :", options:["Ports ouverts non nécessaires","Chiffrement en place","Logs centralisés"], correct:0, explain:"Ports ouverts exposent des services inutiles."},
    { id:"x15", type:"multi", question:"Quelles actions pour réduire le phishing ?", options:["Formation utilisateurs","DMARC/SPF/DKIM","Ignorer les plaintes"], correct:[0,1], explain:"Formation + politique d'email (SPF,DKIM,DMARC) réduisent le phishing."},
    { id:"x16", type:"qcm", question:"Quel outil analyse le trafic pour anomalies ?", options:["SIEM","Traitement de texte","Client FTP"], correct:0, explain:"Le SIEM collecte et corrèle logs pour détecter anomalies."},
    { id:"x17", type:"situation", question:"Une machine critique présente un comportement bizarre, vous :", options:["Isoler du réseau et analyser","Continuer à travailler","Redémarrer seulement"], correct:0, explain:"Isoler et analyser évite la propagation."},
    { id:"x18", type:"qcm", question:"Qu'est-ce qu'un 'C2' (Command & Control) ?", options:["Serveur de commande pour bots","Type de firewall","Une sauvegarde"], correct:0, explain:"C2 contrôle un botnet et ordonne les machines compromises."},
    { id:"x19", type:"vf", question:"Les mises à jour automatiques peuvent être risquées si non testées.", options:["Vrai","Faux"], correct:0, explain:"En production, tester les mises à jour évite régressions."},
    { id:"x20", type:"qcm", question:"Quel indicateur montre une compromission ?", options:["Pics de sortie réseau inconnus","Temps de réponse normal","État 'OK'"], correct:0, explain:"Pics réseau peuvent indiquer exfiltration ou botnet."},
    { id:"x21", type:"multi", question:"Quelle démarche pour sécuriser une API ?", options:["Authentification forte","Limiter le rate","Retourner toutes les erreurs"], correct:[0,1], explain:"Authentification et rate limiting réduisent abus."},
    { id:"x22", type:"qcm", question:"Que signifie 'least privilege' ?", options:["Donner tous les droits","Donner le minimum de droits nécessaire","Ignorer les droits"], correct:1, explain:"Least privilege = droits minimaux pour opérer."},
    { id:"x23", type:"find", question:"Repérez la mauvaise pratique :", options:["Stocker mots de passe en clair","Hash + salt","Utiliser un KMS"], correct:0, explain:"Stocker en clair est extrêmement risqué."},
    { id:"x24", type:"qcm", question:"Qu'est-ce que 'credential stuffing' ?", options:["Essayer des mots de passe volés sur plusieurs sites","Écrire ses mots de passe","Maintenir un inventaire"], correct:0, explain:"Les attaquants réutilisent identifiants volés pour accéder à d'autres sites."},
    { id:"x25", type:"multi", question:"Quelles sont des sources d'intelligence sur menaces ?", options:["Feeds publics","Partage sectoriel (ISAC)","Rumeurs non vérifiées"], correct:[0,1], explain:"Feeds et ISACs sont sources utiles, pas les rumeurs."},
    { id:"x26", type:"qcm", question:"Quel format pour logs structurés ?", options:["JSON","TXT sans structure","DOCX"], correct:0, explain:"JSON facilite la parsing et l'analyse par outils."},
    { id:"x27", type:"qcm", question:"Que permet le 'segmentation réseau' ?", options:["Limitation propagation d'attaque","Augmenter la bande passante","Stocker les logs"], correct:0, explain:"La segmentation réduit la portée d'une compromission."},
    { id:"x28", type:"situation", question:"Vous découvrez une exfiltration en cours, première mesure :", options:["Couper la connexion cible / isoler","Supprimer les journaux","Éteindre tout poste"], correct:0, explain:"Isoler permet d'arrêter l'exfiltration et préserver les preuves."},
    { id:"x29', type:'qcm', question:'Quel test mesure la résilience d\'une appli ?', options:['Test de charge','Test d\'intrusion (pentest)','Audit marketing'], correct:1, explain:'Le pentest évalue la résilience face aux attaques.'},
    { id:'x30', type:'qcm', question:'Pourquoi documenter les incidents ?', options:['Pour apprendre et améliorer','Pour cacher l\'incident','Pour ralentir la réponse'], correct:0, explain:'La documentation permet d'améliorer la posture et les réponses.']
  ]
};

/* ---------- Variables d'état ---------- */
let state = {
  player: "",
  level: "enfant",
  questionList: [],
  index: 0,
  answers: {},      // id -> user answer format depends on type
  startTime: null,
  timer: 0,
  timerInterval: null,
  neon: true,
  showHints: false
};

/* ---------- Utilitaires ---------- */

function $(sel){return document.querySelector(sel)}
function $all(sel){return Array.from(document.querySelectorAll(sel))}

/* ---------- Initialisation UI ---------- */
function initUI(){
  // level buttons
  $all(".level-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      $all(".level-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      state.level = btn.dataset.level;
    });
  });

  // start button
  $("#startQuizBtn").addEventListener("click", startQuiz);

  // nav
  $("#prevBtn").addEventListener("click", prevQuestion);
  $("#nextBtn").addEventListener("click", nextQuestion);
  $("#submitBtn").addEventListener("click", finishQuiz);

  $("#restartBtn")?.addEventListener("click", ()=>{ location.reload(); });
  $("#backToSetupBtn")?.addEventListener("click", backToSetup);
  $("#clearScores").addEventListener("click", ()=>{ localStorage.removeItem("qc_scores"); updateScoreboard(); });

  updateScoreboard();
}

document.addEventListener("DOMContentLoaded", initUI);

/* ---------- Démarrage du quiz ---------- */
function startQuiz(){
  const name = $("#playerName").value.trim();
  if(!name){ alert("Indique ton nom pour démarrer."); return; }
  state.player = name;
  state.neon = $("#neonToggle").checked;
  state.showHints = $("#showHints").checked;

  // set list
  state.questionList = JSON.parse(JSON.stringify(questions[state.level])); // clone
  // shuffle questions to vary (simple Fisher-Yates)
  shuffle(state.questionList);

  // reset
  state.index = 0;
  state.answers = {};
  state.startTime = Date.now();

  // timer
  const t = parseInt($("#timerSelect").value);
  if(t>0){
    state.timer = t;
    startTimer();
  } else { $("#timerBox").classList.add("hidden"); }

  // show UI
  $("#displayName").textContent = state.player;
  $("#displayLevel").textContent = state.level.toUpperCase();
  $("#setup-panel").classList.add("hidden");
  $("#quiz-panel").classList.remove("hidden");
  $("#results-panel").classList.add("hidden");

  renderQuestion();
}

/* ---------- Timer ---------- */
function startTimer(){
  $("#timerBox").classList.remove("hidden");
  updateTimerDisplay();
  state.timerInterval = setInterval(()=>{
    state.timer--;
    updateTimerDisplay();
    if(state.timer<=0){ clearInterval(state.timerInterval); finishQuiz(); }
  },1000);
}
function updateTimerDisplay(){ $("#timerValue").textContent = state.timer }

/* ---------- Render question (une par page) ---------- */
function renderQuestion(){
  const qObj = state.questionList[state.index];
  const card = $("#questionCard");
  card.innerHTML = "";

  // neon class toggle
  if(state.neon) card.classList.add("neon"); else card.classList.remove("neon");

  // header
  const h = document.createElement("h2");
  h.textContent = `Question ${state.index+1} / ${state.questionList.length}`;
  card.appendChild(h);

  const qt = document.createElement("div");
  qt.className = "question-text";
  qt.textContent = qObj.question;
  card.appendChild(qt);

  if(qObj.hint && state.showHints){
    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = "Indice : " + qObj.hint;
    card.appendChild(hint);
  }

  // options area
  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  // render by type
  if(qObj.type === "qcm" || qObj.type === "vf"){
    qObj.options.forEach((opt, i)=>{
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
    qObj.options.forEach((opt, i)=>{
      const lab = document.createElement("label");
      lab.className = "option";
      lab.innerHTML = `<input type="checkbox" name="optMulti" value="${i}"><span class="label">${opt}</span>`;
      lab.addEventListener("click", ()=>{
        const cb = lab.querySelector("input");
        cb.checked = !cb.checked;
        // update answers array
        const existing = state.answers[qObj.id] || [];
        const val = parseInt(cb.value);
        if(cb.checked && !existing.includes(val)) existing.push(val);
        if(!cb.checked && existing.includes(val)) state.answers[qObj.id] = existing.filter(x=>x!==val);
        else state.answers[qObj.id] = existing;
      });
      optionsDiv.appendChild(lab);
    });
  } else if(qObj.type === "find"){
    // clickable options: choose the suspicious one
    qObj.options.forEach((opt, i)=>{
      const box = document.createElement("div");
      box.className = "option";
      box.textContent = opt;
      box.addEventListener("click", ()=> {
        state.answers[qObj.id] = i;
        // highlight selection
        $all(".option").forEach(o=>o.style.borderColor="rgba(255,255,255,0.03)");
        box.style.borderColor = "rgba(255,200,0,0.6)";
      });
      optionsDiv.appendChild(box);
    });
  } else if(qObj.type === "situation"){
    // situation = qcm style but emphasize context
    qObj.options.forEach((opt, i)=>{
      const lab = document.createElement("label");
      lab.className = "option";
      lab.innerHTML = `<input type="radio" name="opt" value="${i}"><span class="label">${opt}</span>`;
      lab.addEventListener("click", ()=> {
        lab.querySelector("input").checked = true;
        state.answers[qObj.id] = parseInt(lab.querySelector("input").value);
      });
      optionsDiv.appendChild(lab);
    });
  } else if(qObj.type === "drag"){
    // simple drag & drop: items and targets
    // options = items, correct = mapping or index
    const dragArea = document.createElement("div");
    dragArea.className = "drag-area";

    // create draggable items
    qObj.options.forEach((opt, i)=>{
      const el = document.createElement("div");
      el.className = "draggable";
      el.draggable = true;
      el.id = `drag-${qObj.id}-${i}`;
      el.textContent = opt;
      el.addEventListener("dragstart",(e)=>{ e.dataTransfer.setData("text/plain", el.id) });
      dragArea.appendChild(el);
    });

    // create drop target(s). If qObj.targets provided use them else single target
    const target = document.createElement("div");
    target.className = "drop-target";
    target.textContent = qObj.prompt || "Dépose l'élément suspect ici";
    target.addEventListener("dragover",(e)=>e.preventDefault());
    target.addEventListener("drop",(e)=>{
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const dragged = document.getElementById(id);
      if(!dragged) return;
      // mark answer as index parsed from id
      const idx = parseInt(id.split("-").pop());
      state.answers[qObj.id] = idx;
      // visually move
      target.textContent = dragged.textContent;
      target.style.borderColor = "rgba(0,212,255,0.4)";
    });

    optionsDiv.appendChild(dragArea);
    optionsDiv.appendChild(target);
  }

  card.appendChild(optionsDiv);

  // show previously selected answer if exist
  const prev = state.answers[qObj.id];
  if(prev !== undefined){
    // set poll inputs etc
    if(qObj.type === "qcm" || qObj.type === "vf" || qObj.type === "situation"){
      const input = card.querySelector(`input[type="radio"][value="${prev}"]`);
      if(input) input.checked = true;
    } else if(qObj.type === "multi"){
      (prev || []).forEach(v=>{
        const c = card.querySelector(`input[type="checkbox"][value="${v}"]`);
        if(c) c.checked = true;
      })
    } else if(qObj.type === "find"){
      const boxes = card.querySelectorAll(".option");
      if(boxes[prev]) boxes[prev].style.borderColor = "rgba(255,200,0,0.6)";
    } else if(qObj.type === "drag"){
      // handled by drop when placed
    }
  }

  // show hint toggles etc
  // navigation visibility
  $("#prevBtn").disabled = state.index === 0;
  $("#nextBtn").classList.toggle("hidden", state.index >= state.questionList.length-1);
  $("#submitBtn").classList.toggle("hidden", state.index < state.questionList.length-1);
}

/* ---------- Navigation ---------- */
function prevQuestion(){ if(state.index>0){ state.index--; renderQuestion(); } }
function nextQuestion(){
  // optional: require answer before next
  const qId = state.questionList[state.index].id;
  if(state.answers[qId] === undefined){
    if(!confirm("Tu n'as pas répondu à cette question. Continuer quand même ?")) return;
  }
  if(state.index < state.questionList.length-1){ state.index++; renderQuestion(); }
}

/* ---------- Finish & scoring ---------- */
function finishQuiz(){
  clearInterval(state.timerInterval);
  // compute score
  let correctCount = 0;
  const details = [];

  state.questionList.forEach(q=>{
    const given = state.answers[q.id];
    let ok = false;

    if(q.type === "qcm" || q.type === "vf" || q.type === "situation" || q.type === "find" || q.type === "drag"){
      ok = (given !== undefined) && (given === q.correct);
    } else if(q.type === "multi"){
      const expected = Array.isArray(q.correct)? q.correct.slice().sort(): [];
      const got = Array.isArray(given)? given.slice().sort(): [];
      ok = JSON.stringify(expected) === JSON.stringify(got);
    }

    if(ok) correctCount++;

    // prepare explanation block
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

  // show summary
  const elapsed = Math.round((Date.now() - state.startTime)/1000);
  const timerUsed = ($("#timerSelect").value>0) ? (parseInt($("#timerSelect").value) - state.timer) : elapsed;

  const summary = `<div id="summaryBox">
    <p class="result-good">Score : ${correctCount} / ${state.questionList.length}</p>
    <p>Temps utilisé : ${timerUsed}s</p>
    <p>Niveau : ${state.level}</p>
  </div>`;

  $("#resultsSummary").innerHTML = summary;
  $("#detailedResults").innerHTML = details.join("");
  $("#quiz-panel").classList.add("hidden");
  $("#results-panel").classList.remove("hidden");

  saveScoreLocal({ name: state.player, score: correctCount, total: state.questionList.length, level: state.level, time: timerUsed, date: (new Date()).toLocaleString() });
  updateScoreboard();
}

/* ---------- Format helpers ---------- */
function formatCorrect(q){
  if(q.type === "multi") return q.correct.map(i=>q.options[i]).join(", ");
  if(Array.isArray(q.correct)) return q.correct.join(", ");
  return q.options && q.options[q.correct] ? q.options[q.correct] : q.correct;
}
function formatGiven(q, given){
  if(q.type === "multi") return (Array.isArray(given)? given.map(i=>q.options[i]).join(", "): given);
  return q.options && q.options[given] ? q.options[given] : given;
}

/* ---------- Scoreboard local ---------- */
function saveScoreLocal(entry){
  const key = "qc_scores";
  let arr = JSON.parse(localStorage.getItem(key) || "[]");
  arr.push(entry);
  // sort by score desc then time asc
  arr.sort((a,b)=> (b.score - a.score) || (a.time - b.time));
  // keep top 50
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

/* ---------- Utilities ---------- */
function shuffle(array){ for(let i=array.length-1;i>0;i--){ const j= Math.floor(Math.random()*(i+1)); [array[i],array[j]]=[array[j],array[i]]; } return array; }
function backToSetup(){ $("#results-panel").classList.add("hidden"); $("#setup-panel").classList.remove("hidden"); location.reload(); }

/* ---------- small safety / UI glue ---------- */
window.addEventListener("beforeunload", (e)=>{
  if(Object.keys(state.answers).length>0 && !$("#results-panel").classList.contains("hidden")){
    e.preventDefault();
    e.returnValue = '';
  }
});
