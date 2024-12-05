# React + TypeScript + Vite

## Rules

1. Un defi gagné permet de pouvoir rejouer.
  
2. Un Quiz bien repondu permet de rejouer

3. Un sanction vous fait reculer de 5 cases

4. Un bonne cause vous fait avancer de 5 cases.

5. Principe du jeu est de faire X fois le tour du jeu (A decider à l'avance selon la longueur du jeu).

Pour les défis, si vous refusez de jouer, vous reculez de 4 cases

"good actions" et "sanctions" tu verras pour chacun la conséquence. il faudrait donc une regle par carte.
Récompense quiz et défi => rejouer.

---

- quiz réussi - le même player peut rejouer.
- quiz loupé - ???

- défi réussi - le même player peut rejouer - (ou + 4 ?)
## défi loupé - 4 ? (applied)

## sanction loupé - 5 (applied)
- sanction réussi - nbre de case à avancer

## bonne action réussi + 5 (applied)
- bonne action loupé - ???

1) splitter en plrs components (code splitting)

2) favicon dans le signet en-haut (plus tard)

3) Menu plrs languages + 1er msg de bienvenue

4) rules of games

5) player one is your turn

6) Choice of lap 1-5

7) dice en blanc et points noirs


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
