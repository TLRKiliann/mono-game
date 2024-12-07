import type { DisplayCloseProps } from "../lib/types";
import "./styles/ReadyComponent.css";

type SelectOptionProps = {
    setDisplayCloseBox: React.Dispatch<React.SetStateAction<DisplayCloseProps>>; 
    selectedOption: string;
};

const ReadyComponent = ({setDisplayCloseBox, selectedOption}: SelectOptionProps): JSX.Element => {

    const handleCloseReady = (): void => {
        setDisplayCloseBox((prev) => ({...prev, closeReady: false}));
    };

    return (
        <div className="div-ready">

            {selectedOption === "français" ? (
                <div className="div-contentready">
                    <h1>Joueur "1" c'est ton tour !</h1>
                    <h2>Lance le dés !!!</h2>
                </div>
                ) : null 
            }
            {selectedOption === "english" ? (
                <div className="div-contentready">
                    <h1>Player "ONE" is your turn !</h1>
                    <h2>Roll the dice !!!</h2>
                </div>
                ) : null 
            }
            {selectedOption === "deutsch" ? (
                <div className="div-contentready">
                    <h1>Spieler 1, du bist dran !</h1>
                    <h2>Wirf die Würfel !!!</h2>
                </div>
                ) : null 
            }
            {selectedOption === "italiano" ? (
                <div className="div-contentready">
                    <h1>Giocatore 1, tocca a te !</h1>
                    <h2>Fai rotolare i dadi !!!</h2>
                </div>
                ) : null 
            }

            <div className="div-btnready">
                <button type="button" onClick={handleCloseReady}>
                    Close
                </button>
            </div>

        </div>
    )
}
export default ReadyComponent;