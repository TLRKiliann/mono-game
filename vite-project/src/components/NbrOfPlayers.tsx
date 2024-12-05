import { useState } from "react";
import "./styles/NbrOfPlayers.css";

type NbPlayerProps = {
    nbPlayer: number;
    setNbPlayer: React.Dispatch<React.SetStateAction<number>>;
};

const NbrOfPlayers = ({nbPlayer, setNbPlayer} : NbPlayerProps): JSX.Element => {

    const [onShowForm, setOnShowForm] = useState<boolean>(true);
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
            setOnShowForm(false);
        } else {
            setError("Veuillez choisir un nombre de joueurs valide.");
        }
    };

    return (        
        <div className={`${onShowForm ? 'player-displayer' : 'player-hidden'}`}>
            <div className="div-labelInputPlayer">
                <label htmlFor="nbPlayer">Choisir entre 2 et 6 joueurs:
                    <input 
                        type="text" 
                        id="nbPlayers" 
                        value="" 
                        onChange={handleNbPlayer}
                        className=""
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
