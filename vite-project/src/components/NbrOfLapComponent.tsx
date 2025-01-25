import type { DisplayCloseProps } from "../lib/types";
import { useState } from "react";
import "./styles/NbrPlayerNbrLapLvl.css";

type NbrOfLapProps = {
    selectedOption: string;
    nbrOfLap: number;
    setNbrOfLap: React.Dispatch<React.SetStateAction<number>>;
    setDisplayCloseBox: React.Dispatch<React.SetStateAction<DisplayCloseProps>>;
};

const NbrOfLapComponent = ({ selectedOption, nbrOfLap, setNbrOfLap, setDisplayCloseBox }: NbrOfLapProps): JSX.Element => {

    const [error, setError] = useState<string>("");

    const handleNbLap = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        const numberValue = parseInt(value, 10);

        if (!isNaN(numberValue) && numberValue >= 1 && numberValue <= 5) {
            setNbrOfLap(numberValue);
            setError("");
        } else {
            selectedOption === "français" ? setError("Choisissez un chiffre entre 1 et 5 !")
            : selectedOption === "english" ? setError("Choose a number between 1 and 5 !")
            : selectedOption === "deutsch" ? setError("Wählen Sie eine Zahl zwischen 1 und 5 !")
            : selectedOption === "italiano" ? setError("Scegli un numero tra 1 e 5 !")
            : null
        }
    };

    const handleValidateNbLap = (): void => {
        if (nbrOfLap >= 1 && nbrOfLap <= 5) {
            console.log("Nombre de tour :", nbrOfLap);
            setDisplayCloseBox((prev) => ({...prev, closeNbrOfLap: false}));
        } else {
            console.error("nbrOfLap is not valid !");
        }
    };
 
    return (
        <div className="player-displayer">
            <div className="div-labelInputPlayer">
                <label htmlFor="lap">
                    {selectedOption === "français" 
                        ? "Choisir entre 1 et 5 tours :" : selectedOption === "english"
                        ? "Choose between 1 and 5 rounds :" : selectedOption === "deutsch" 
                        ? "Wählen Sie zwischen 1 und 5 Runden :" : selectedOption === "italiano"
                        ? "Scegliere tra 1 e 5 turni :" : null
                    }
                    <input 
                        type="text" 
                        id="lap" 
                        value="" 
                        onChange={handleNbLap}
                        placeholder={String(nbrOfLap)} 
                    />
                </label>
                
            </div>

            {error && <p className="error">{error}</p>}

            <div className="div-btnPlayer">
                <button type="button" onClick={handleValidateNbLap}>
                    {selectedOption === "français" 
                        ? "Valider" : selectedOption === "english" 
                        ? "Validate" : selectedOption === "deutsch" 
                        ? "Validieren" : selectedOption === "italiano" 
                        ? "Validare" : null
                    }
                </button>
            </div>
        </div>
    )
}
export default NbrOfLapComponent;