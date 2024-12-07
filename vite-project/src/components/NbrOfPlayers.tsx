import type { DisplayCloseProps } from "../lib/types";
import { useState } from "react";
import "./styles/NbrOfPlayers.css";

type NbPlayerProps = {
    selectedOption: string;
    setDisplayCloseBox: React.Dispatch<React.SetStateAction<DisplayCloseProps>>;
    nbPlayer: number;
    setNbPlayer: React.Dispatch<React.SetStateAction<number>>;
};

const NbrOfPlayers = ({selectedOption, setDisplayCloseBox, nbPlayer, setNbPlayer} : NbPlayerProps): JSX.Element => {

    const [error, setError] = useState<string>("");

    const handleNbPlayer = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        const numberValue = parseInt(value, 10);

        if (!isNaN(numberValue) && numberValue >= 2 && numberValue <= 6) {
            setNbPlayer(numberValue);
            setError("");
        } else {
            setError("Choisissez un chiffre entre 2 et 6.");
        }
    };

    const handleValidateNbPlayers = (): void => {
        if (nbPlayer >= 2 && nbPlayer <= 6) {
            console.log("Nombre de joueurs:", nbPlayer);
            setDisplayCloseBox((prev) => ({...prev, closeNbrOfPlayers: false}));
        } else {
            setError("Veuillez choisir un nombre de joueurs valide.");
        }
    };

    return (        
        <div className="player-displayer">
            <div className="div-labelInputPlayer">
                <label htmlFor="nbPlayer">
                    {selectedOption === "français" 
                        ? "Choisir entre 2 et 6 joueurs :" : selectedOption === "english" 
                        ? "Choose between 2 and 6 players :" : selectedOption === "deutsch" 
                        ? "Zwischen 2 und 6 Spielern wählen :" 
                        : "Scegliere tra 2 e 6 giocatori :"}
                    <input 
                        type="text" 
                        id="nbPlayers" 
                        value="" 
                        onChange={handleNbPlayer}
                        placeholder={String(nbPlayer)} 
                    />
                </label>
                
            </div>

            {error && <p className="error">{error}</p>}

            <div className="div-btnPlayer">
                <button type="button" onClick={handleValidateNbPlayers}>Valider</button>
            </div>
        </div>
    );
}

export default NbrOfPlayers;
