import type { DisplayCloseProps } from "../lib/types";
import "./styles/RulesComponent.css";

type RulesProps = {
    selectedOption: string;
    setDisplayCloseBox: React.Dispatch<React.SetStateAction<DisplayCloseProps>>;
};

const RulesComponent = ({ selectedOption, setDisplayCloseBox }: RulesProps): JSX.Element => {
    
    const handleRules = (): void => {
        setDisplayCloseBox((prev) => ({...prev, viewRules: false}));
    };

    return (
        <div className="rules-div">
            <h1>{selectedOption === "français" ? "Règles du jeu:" 
                : selectedOption === "english" ? "Rules of game:" 
                : selectedOption === "deutsch" ? "Spielregel:" 
                : "Regola del gioco:"}
            </h1>

            {selectedOption === "français" ? (
                <div className="div-explanations">
                    <li>Choisissez le nombre de joueurs.</li>
                    <li>Choisissez les nombre de tour pour une partie.</li>
                    <li>Le joueur 1 commence par lancé le dés.</li>
                    <li>
                        Les cases "Quiz", "Défi", "Sanction", "Bonne Action" affichent une carte dont le joueur doit 
                        soit répondre à une question, soit faire un défi, soit subir une sanction, soit bénéficier d'une récompense.                    
                    </li>
                    <li>5. Le joueur qui fini en premier remporte la partie.</li>
                </div>
                ) : null
            }

            {selectedOption === "english" ? (
                <div className="div-explanations">
                    <li>Choose the number of players.</li>
                    <li>Choose the number of rounds for a game.</li>
                    <li>Player 1 starts by rolling the dice.</li>
                    <li>
                        The "Quiz," "Challenge," "Penalty," and "Good Action" spaces display a card that the player must either answer a question, complete a challenge, face a penalty, or receive a reward.
                    </li>
                    <li>The player who finishes first wins the game.</li>
                </div>
                ) : null
            }

            {selectedOption === "deutsch" ? (
                <div className="div-explanations">
                    <li>Wählen Sie die Anzahl der Spieler.</li>
                    <li>Wählen Sie die Anzahl der Runden für ein Spiel.</li>
                    <li>Spieler 1 beginnt, indem er die Würfel wirft.</li>
                    <li>
                        Die Felder "Quiz", "Herausforderung", "Strafe" und "Gute Tat" zeigen eine Karte an, auf die der Spieler entweder eine Frage beantworten, eine Herausforderung annehmen, eine Strafe erleiden oder eine Belohnung erhalten muss.
                    </li>
                    <li>Der Spieler, der zuerst fertig ist, gewinnt das Spiel.</li>
                </div>
                ) : null
            }

            {selectedOption === "italiano" ? (
                <div className="div-explanations">
                    <li>Scegli il numero di giocatori.</li>
                    <li>Scegli il numero di turni per una partita.</li>
                    <li>Il giocatore 1 inizia lanciando i dadi.</li>
                    <li>
                        Le caselle "Quiz", "Sfida", "Sanzione" e "Buona Azione" mostrano una carta che il giocatore deve o rispondere a una domanda, o affrontare una sfida, o subire una sanzione, o ricevere una ricompensa.
                    </li>
                    <li>Il giocatore che finisce per primo vince la partita.</li>
                </div>
                ) : null
            }

            <button type="button" onClick={handleRules}>
                {selectedOption === "français" 
                    ? "Fermer" : selectedOption === "english" 
                    ? "Close" : selectedOption === "deutsch" 
                    ? "Schließen" : "Chiudere"}
            </button>
        </div>
    )
}
export default RulesComponent;