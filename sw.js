// Service worker : Pas ce soir jouable hors ligne (musique comprise).
const V = 'pcs-peafe38bb4';
const CORE = ["./", "index.html", "ks-studio.js", "ks-back.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon.png", "img/studio/keismey-studio.webp", "fonts/fonts.css", "fonts/alegreya-400-italic.woff", "fonts/alegreya-400.woff", "fonts/alegreya-700.woff", "fonts/pirata-one-400.woff"];
const ASSETS = ["img/amelio_arriere.webp", "img/amelio_bancs.webp", "img/amelio_barre.webp", "img/amelio_cheminee.webp", "img/amelio_mezzanine.webp", "img/amelio_tentures.webp", "img/amelio_tonneaux.webp", "img/amelio_trophees.webp", "img/badge_arme.webp", "img/badge_bete.webp", "img/badge_blesse.webp", "img/badge_boue.webp", "img/badge_bourse_vide.webp", "img/badge_capuche.webp", "img/badge_garde.webp", "img/badge_ivre.webp", "img/badge_magie.webp", "img/badge_mercenaire.webp", "img/badge_recherche.webp", "img/badge_retour.webp", "img/badge_sceau.webp", "img/badge_veteran.webp", "img/barde_a.webp", "img/barde_b.webp", "img/barde_c.webp", "img/barde_d.webp", "img/bg_atelier.webp", "img/bg_briefing.webp", "img/bg_porte.webp", "img/bg_renvoye.webp", "img/bg_salle_0.webp", "img/bg_salle_1.webp", "img/bg_salle_2.webp", "img/bg_salle_3.webp", "img/bg_titre.webp", "img/boisson_biere.webp", "img/boisson_cidre.webp", "img/boisson_elixir.webp", "img/boisson_hydromel.webp", "img/boisson_lait.webp", "img/boisson_rhum.webp", "img/boisson_sauge.webp", "img/boisson_vin.webp", "img/borin_heros.webp", "img/borin_ivre.webp", "img/bourgmestre.webp", "img/fin_1.webp", "img/fin_2.webp", "img/fin_3.webp", "img/garde_a.webp", "img/garde_b.webp", "img/garde_c.webp", "img/guerrier_a.webp", "img/guerrier_b.webp", "img/guerrier_c.webp", "img/gustave.webp", "img/ico_cle.webp", "img/ico_fouille.webp", "img/incident_bagarre.webp", "img/incident_vol.webp", "img/isolde.webp", "img/jauge_caisse.webp", "img/jauge_places.webp", "img/jauge_reputation.webp", "img/mage_a.webp", "img/mage_b.webp", "img/mage_c.webp", "img/mage_d.webp", "img/mercenaire_a.webp", "img/mercenaire_b.webp", "img/mercenaire_c.webp", "img/mercenaire_d.webp", "img/mercenaire_e.webp", "img/noble_a.webp", "img/noble_b.webp", "img/noble_c.webp", "img/pip.webp", "img/stat_agilite.webp", "img/stat_endurance.webp", "img/stat_esprit.webp", "img/stat_force.webp", "img/voleur_a.webp", "img/voleur_b.webp", "img/voleur_c.webp", "img/voleur_d.webp", "img/cover.webp", "audio/mus_titre.ogg", "audio/mus_entre_a.ogg", "audio/mus_entre_b.ogg", "audio/mus_porte.ogg", "audio/mus_salle.ogg", "audio/mus_presse.ogg", "audio/mus_renvoye.ogg"];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(async c => {
    await c.addAll(CORE);
    for (let i = 0; i < ASSETS.length; i += 20) { try { await c.addAll(ASSETS.slice(i, i + 20)); } catch (err) { /* on réessaiera à l'usage */ } }
  }));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k.startsWith('pcs-')).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (/version\.json$/.test(u.pathname)) return;
  if (u.hostname === 'static.cloudflareinsights.com') return; // suivi Cloudflare : toujours le réseau, jamais le cache
  // la page : réseau d'abord (mises à jour immédiates), cache si hors ligne
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r.url, { cache: 'no-cache', credentials: 'same-origin' }).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put('index.html', cp)); return res; }).catch(() => caches.match('index.html')));
    return;
  }
  // le reste (images, sons, polices) : cache d'abord
  e.respondWith(caches.match(r, { ignoreSearch: u.origin === location.origin }).then(hit => hit || fetch(r).then(res => {
    if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); }
    return res;
  })));
});
