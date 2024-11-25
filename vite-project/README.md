# React + TypeScript + Vite

## Goals

100) Le code splitting ne semble pas avoir satisfait react... A revoir...

- 1) Cases special puis sortir une carte !!!

Sort la carte arrive sur la case et la carte est lisible pour tous ?
Ou seulement pour le joueur qui arrive sur la case ? (Tous sur le même écran)
Local et online ? Online ???

nbre de carte = questions => non !!!

Click btn ferme la carte !!!
Ok la carte se ferme, mais elle apparaît de nouveau quand un autre joueur lance le dés...
Parce que le joueur de la case spécial reste sur la même case lors du refresh !

## Solution
+1 case si réussi ???
-1 case si erreur ???

## Rules

1. Pour defis, si le defi a deja eu lieu, interdit de repeter les memes reponses, exemples 
2. Un defi gagné permet de pouvoir rejouer.
3. Un Quiz bien repondu permet de rejouer

4. Un sanction vous fait reculer de 6 cases

5. Un bonne cause vous fait avancer de 6 cases.

6. Principe du jeu est de faire X fois le tour du jeu (A decider à l'avance selon la longueur du jeu.

Pour les défis, si vous refusez de jouer, vous reculez de 3 cases

Mais pour les sanctions et bonnes actions en fait il y a a chaque fois une recompense et consequence 
pour chaque "carte" si tu regardes dans les onglets "good actions" et "sanctions" tu verras pour chacun 
la conseéquence. il faudrait donc une regle par "carte en fait".
Juste pour le quiz et defis, si ceux-ci sont reussi ben on peut juste "rejouer".

---

- choix du nbre de players : 2 à 6
- éviter les même questions !!!

- quiz réussi - le même player peut rejouer.
- quiz loupé - ???

- défi réussi - le même player peut rejouer ou + 4 ?
## défi loupé - 4 ? (applied)

## sanction loupé - 5 (applied)
- sanction réussi - nbre de case à avancer ou + 5 ?

## bonne action réussi + 5 (applied)
- bonne action loupé - ???

- 3x tour du jeu


- 2) Les questions doivent être supprimées après avoir été utilisées => ALGO ! et réinitialisées 1x le jeu terminé. 

- 3) Choisir le nbre de player avant que le jeu commence (min 2 & max 6).

- 3) splitter en plrs components (code splitting)

- 4) logo dans le signet en-haut (plus tard)

- 5) cards aux 4 coins (plus tard)

- 6) Btn close des cartes => utilité à vérifier !

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
