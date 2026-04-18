// pwa.js - détection PWA, enregistrement SW, sons et activation d'animations

function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true
    || new URLSearchParams(location.search).get('source') === 'pwa';
}

// Enregistrer le service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/ProjetCyberSecurite/service-worker.js')
    .then(() => console.log('Service Worker enregistré'))
    .catch(err => console.warn('Erreur enregistrement SW', err));
}

// Ajouter classe CSS si en PWA
document.addEventListener('DOMContentLoaded', () => {
  if (isPWA()) {
    document.documentElement.classList.add('pwa-active');
  }
});

// Préparer le son de navigation
const navSound = new Audio('/ProjetCyberSecurite/assets/bbbb.mp3');
navSound.preload = 'auto';
navSound.volume = 0.18;

// Jouer le son uniquement en PWA et sur interaction utilisateur
document.addEventListener('click', e => {
  const target = e.target.closest('a, button');
  if (!target) return;
  if (isPWA()) {
    navSound.currentTime = 0;
    navSound.play().catch(()=>{/* autoplay bloqué, silencieux */});
  }
});
