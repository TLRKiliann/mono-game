# React + TypeScript + Vite

Goals

- 1)Revoir l'algorythmies des pions (simplifier)

#######################################################################################################################################

const PlayerSpan = ({ player }) => (
  <span style={{ background: player.color }} className="span-pawn">
    {player.id}
  </span>
);

const Square = ({ caseNumber, players, additionalContent }) => (
  <div className='squares-side squares-lside'>
    <p>
      {caseNumber} {players.map((player) => player.caseNumber === caseNumber ? <PlayerSpan key={player.id} player={player} /> : null)}
    </p>
    {additionalContent}
  </div>
);

const GameBoard = ({ players }) => (
  <div className='left-frame'>
    <Square caseNumber={1} players={players} />
    <Square caseNumber={2} players={players} />
    <Square caseNumber={3} players={players} additionalContent={<h4>Quiz</h4>} />
    <Square caseNumber={4} players={players} />
    <Square caseNumber={5} players={players} />
    <Square caseNumber={6} players={players} additionalContent={<h4>Defi</h4>} />
    <Square caseNumber={7} players={players} />
    <Square caseNumber={8} players={players} />
    <Square caseNumber={9} players={players} additionalContent={<h4>Bonne Action</h4>} />
    <Square caseNumber={10} players={players} />
  </div>
);

#######################################################################################################################################

- 2)splitter en plrs components (code splitting)
- 
- logo dans le signet en-haut (plus tard)
- cards aux 4 coins (plus tard)

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
