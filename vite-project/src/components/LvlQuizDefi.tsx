import type { DisplayCloseProps } from "../lib/types";
import { useState } from "react";
import "./styles/NbrPlayerNbrLapLvl.css";

type LevelProps = {
    selectedOption: string;
    setLvlQuiz: React.Dispatch<React.SetStateAction<string>>;
    setDisplayCloseBox: React.Dispatch<React.SetStateAction<DisplayCloseProps>>;
};

const LvlQuizDefi = ({selectedOption, setLvlQuiz, setDisplayCloseBox} : LevelProps): JSX.Element => {

    const [isCheck, setIsCheck] = useState<string>("enfants");

    const derivatedCheck: string = isCheck;

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const optionValue = event.target.value;
        console.log(optionValue, "optionValue");
        setIsCheck(optionValue);
    };

    const handleValidateLevel = (): void => {
        setLvlQuiz(derivatedCheck);
        setDisplayCloseBox((prev) => ({...prev, closeLvl: false}));
    };

    return (        
        <div className="player-displayer">

            <h1 className="lvl-title">
                {selectedOption === "français" 
                    ? "Choisissez votre level :" : selectedOption === "english" 
                    ? "Choose your level :" : selectedOption === "deutsch" 
                    ? "Wählen Sie Ihr Niveau :" : selectedOption === "italiano"
                    ? "Scegli il tuo livello :" : null
                }
            </h1>

            <div className="lvl-container">

                <div className='validate-children'>
                    <label htmlFor="validate">
                        {selectedOption === "français" 
                            ? "enfants" 
                            : selectedOption === "english" 
                            ? "children" 
                            : selectedOption === "deutsch" 
                            ? "Kinder" 
                            : selectedOption === "italiano" 
                            ? "bambini" 
                            : null
                        }
                    </label>
                    <input
                        type="radio"
                        id="enfants"
                        name="enfants"
                        value="enfants"
                        checked={isCheck === 'enfants'} 
                        onChange={handleCheck}
                    />

                </div>

                <div className='validate-adultes'>
                    <label htmlFor="adultes">
                        {selectedOption === "français" 
                            ? "adultes" 
                            : selectedOption === "english" 
                            ? "adults" 
                            : selectedOption === "deutsch" 
                            ? "Erwachsene" 
                            : selectedOption === "italiano" 
                            ? "adulti" 
                            : null
                        }
                    </label>
                    <input
                        type="radio"
                        id="adultes"
                        name="adultes"
                        value="adultes"
                        checked={isCheck === 'adultes'} 
                        onChange={handleCheck}
                    />
                </div>

            </div>

            <div className="div-btnPlayer">
                <button type="button" onClick={handleValidateLevel}>
                    {selectedOption === "français" 
                        ? "Valider" : selectedOption === "english" 
                        ? "Validate" : selectedOption === "deutsch" 
                        ? "Validieren" : selectedOption === "italiano" 
                        ? "Validare" : null
                    }
                </button>
            </div>
        </div>
    );
}
export default LvlQuizDefi;
