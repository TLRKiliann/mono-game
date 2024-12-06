import { useState } from "react";
import "./styles/NbrOfPlayers.css";

type NbrOfLapProps = {
    nbrOfLap: number;
    selectedOption: string;
    setNbrOfLap: React.Dispatch<React.SetStateAction<number>>;
    setCloseNbrOfLap: React.Dispatch<React.SetStateAction<boolean>>;
};

const NbrOfLapComponent = ({ selectedOption, nbrOfLap, setNbrOfLap, setCloseNbrOfLap }: NbrOfLapProps): JSX.Element => {

    const [error, setError] = useState<string>("");

    const handleNbLap = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        const numberValue = parseInt(value, 10);

        if (!isNaN(numberValue) && numberValue >= 1 && numberValue <= 5) {
            setNbrOfLap(numberValue);
            setError("");
        } else {
            setError("Choisissez un chiffre entre 1 et 5.");
        }
    };

    const handleValidateNbLap = (): void => {
        if (nbrOfLap >= 1 && nbrOfLap <= 5) {
            console.log("Nombre de tour :", nbrOfLap);
            setCloseNbrOfLap(false);
        } else {
            setError("Veuillez choisir un nombre de tour valide.");
        }
    };
 
    return (
        <div className="player-displayer">
            <div className="div-labelInputPlayer">
                <label htmlFor="nbPlayer">
                    {selectedOption === "français" 
                        ? "Choisir entre 1 et 5 tours pour une partie :" : selectedOption === "english"
                        ? "Choose between 1 and 5 rounds for a game :" : selectedOption === "deutsch" 
                        ? "Wählen Sie zwischen 1 und 5 Runden für ein Spiel :" 
                        : "Scegliere tra 1 e 5 turni per una partita :"}
                    <input 
                        type="text" 
                        id="nbPlayers" 
                        value="" 
                        onChange={handleNbLap}
                        placeholder={String(nbrOfLap)} 
                    />
                </label>
                
            </div>

            {error && <p className="error">{error}</p>}

            <div className="div-btnPlayer">
                <button type="button" onClick={handleValidateNbLap}>Valider</button>
            </div>
        </div>
    )
}
export default NbrOfLapComponent;