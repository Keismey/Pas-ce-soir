# Pas ce soir

*Videur au Sanglier Borgne.* Trie les aventuriers à la porte, sers-les au comptoir, envoie les meilleurs en quête.
Rachète la taverne à Gustave, puis tiens-la en patron.

Jouer : https://keismey.github.io/Pas-ce-soir/ (ou depuis le hub Keismey Studio : https://keismey.github.io/)
Play in English: https://keismey.github.io/Pas-ce-soir/?lang=en

Un jeu Keismey Studio. Game design : Claude. Développement : Claude Opus 5.5. Images et musiques : Gemini.

## Technique

- Une seule page (`index.html`), sans dépendance ni étape de build côté navigateur.
- `sw.js` : jeu jouable hors ligne. `version.json` : le jeu se met à jour seul à la publication suivante.
- Polices Alegreya et Pirata One hébergées dans `fonts/` (licence SIL OFL, voir `fonts/OFL-*.txt`) : aucune requête vers un service de polices externe.
- Sauvegarde dans le navigateur (`localStorage`, clé `pas-ce-soir-v1`).
- Français et anglais : `?lang=fr` ou `?lang=en` (le choix est retenu), sinon la langue du navigateur.
- Musique : 14 airs en boucle, regroupés par moment de jeu (titre, entre deux soirées, porte, salle, soirées spéciales, mode patron).
- Tests de la logique : ouvrir `index.html?test=1`. Panneau de debug : `index.html?debug=1`.
