import type { DisplayCloseProps } from "../lib/types";
import { useState } from "react";
import "./styles/NbrPlayerNbrLapLvl.css";

type LevelProps = {
    selectedOption: string;
    lvlQuizDefi: number;
    setLvlQuizDefi: React.Dispatch<React.SetStateAction<number>>;
    setDisplayCloseBox: React.Dispatch<React.SetStateAction<DisplayCloseProps>>;
};

const LvlQuizDefi = ({selectedOption, lvlQuizDefi, setLvlQuizDefi, setDisplayCloseBox} : LevelProps): JSX.Element => {

    const [error, setError] = useState<string>("");

    const handleLevel = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        const numberValue = parseInt(value, 10);

        if (!isNaN(numberValue) && numberValue >= 1 && numberValue <= 3) {
            setLvlQuizDefi(numberValue);
            setError("");
        } else {
            setError("Choisissez un chiffre entre 1 et 3.");
        }
    };

    const handleValidateLevel = (): void => {
        if (lvlQuizDefi >= 1 && lvlQuizDefi <= 3) {
            console.log("Level choosen:", lvlQuizDefi);
            setDisplayCloseBox((prev) => ({...prev, closeLvl: false}));
        } else {
            setError("Veuillez choisir un level valide.");
        }
    };

    return (        
        <div className="player-displayer">
            <div className="div-labelInputPlayer">
                <label htmlFor="level">
                    {selectedOption === "français" 
                        ? "Choisir le level entre 1 et 3 :" : selectedOption === "english" 
                        ? "Choose level between 1 & 3 :" : selectedOption === "deutsch" 
                        ? "Wählen Sie das Level zwischen 1 und 3 :" : selectedOption === "italiano"
                        ? "Scegli il livello tra 1 e 3 :" : null}
                    <input 
                        type="text" 
                        id="level" 
                        value="" 
                        onChange={handleLevel}
                        placeholder={String(lvlQuizDefi)} 
                    />
                </label>
                
            </div>

            {error && <p className="error">{error}</p>}

            <div className="div-btnPlayer">
                <button type="button" onClick={handleValidateLevel}>
                    {selectedOption === "français" 
                        ? "Valider" : selectedOption === "english" 
                        ? "Validate" : selectedOption === "deutsch" 
                        ? "Validieren" : selectedOption === "italiano" 
                        ? "Validare" : null}
                </button>
            </div>
        </div>
    );
}
export default LvlQuizDefi;
