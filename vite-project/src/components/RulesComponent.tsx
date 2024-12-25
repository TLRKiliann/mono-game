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
                : selectedOption === "italiano" ? "Regola del gioco:" : null}
            </h1>

            {selectedOption === "français" ? (
                <div className="div-explanations">
                    <ol>
                        <li>Choisissez le nombre de joueurs.</li>
                        <li>Choisissez les nombre de tour pour une partie.</li>
                        <li>Le joueur 1 commence par lancé le dés.</li>
                        <li>
                            Les cases "Quiz", "Défi", "Sanction", "Bonne Action" affichent une carte dont le joueur doit 
                            soit répondre à une question, soit faire un défi, soit subir une sanction, soit bénéficier d'une récompense
                            ou d'un joker (prochaine case sanction annulée).                    
                        </li>
                        <li>Le joueur qui fini en premier remporte la partie.</li>
                    </ol>
                </div>
                ) : null
            }

            {selectedOption === "english" ? (
                <div className="div-explanations">
                    <ol>
                        <li>Choose the number of players.</li>
                        <li>Choose the number of rounds for a game.</li>
                        <li>Player 1 starts by rolling the dice.</li>
                        <li>
                            The "Quiz," "Challenge," "Penalty," and "Good Action" boxes display a card that the player must either answer 
                            a question, complete a challenge, face a penalty, or receive a reward or a joker (next penalty box canceled).
                        </li>
                        <li>The player who finishes first wins the game.</li>
                    </ol>
                </div>
                ) : null
            }

            {selectedOption === "deutsch" ? (
                <div className="div-explanations">
                    <ol>
                        <li>Wählen Sie die Anzahl der Spieler.</li>
                        <li>Wählen Sie die Anzahl der Runden für ein Spiel.</li>
                        <li>Spieler 1 beginnt, indem er die Würfel wirft.</li>
                        <li>
                            Die Felder "Quiz", "Herausforderung", "Strafe" und "Gute Tat" zeigen eine Karte an, auf die der Spieler entweder 
                            eine Frage beantworten, eine Herausforderung meistern, eine Strafe erleiden oder eine Belohnung oder einen Joker 
                            erhalten muss (nächstes Straf-Feld annulliert).
                        </li>
                        <li>Der Spieler, der zuerst fertig ist, gewinnt das Spiel.</li>
                    </ol>
                </div>
                ) : null
            }

            {selectedOption === "italiano" ? (
                <div className="div-explanations">
                    <ol>
                        <li>Scegli il numero di giocatori.</li>
                        <li>Scegli il numero di turni per una partita.</li>
                        <li>Il giocatore 1 inizia lanciando i dadi.</li>
                        <li>
                            Le caselle "Quiz", "Sfida", "Sanzione" e "Buona Azione" mostrano una carta alla quale il giocatore deve 
                            rispondere a una domanda, completare una sfida, subire una sanzione o ricevere una ricompensa o un jolly 
                            (prossima casella sanzione annullata).
                        </li>
                        <li>Il giocatore che finisce per primo vince la partita.</li>
                    </ol>
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