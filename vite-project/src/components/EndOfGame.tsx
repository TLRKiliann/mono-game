import { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import "./styles/EndOfGame.css";

type WinnerProps = {
    selectedOption: string;
    winner: string;
};

const EndOfGame = ({selectedOption, winner}: WinnerProps): JSX.Element => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleRestart = (): void => {
        window.location.reload();
    };

    // window update
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // automatically hide confetti after 3s
    useEffect(() => {
        setShowConfetti(true);
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="endofgame-container">

            {showConfetti && <Confetti width={width} height={height} />}

            <div className="game-over">
                
                <h1>Game-Over</h1>
                
                <div className="winner-box">
                    <h2 className="winner">!!! {winner} WIN !!!</h2>
                </div>


                {selectedOption === "français" ? (
                    <p>
                        Vous avez aimé ce jeu ? N'hésitez pas à faire un don à l'association 
                        qui l'a developpé sans aucune aide publique.
                    </p>
                    ) : null
                }

                {selectedOption === "english" ? (
                    <p>
                        Did you enjoy this game? Feel free to make a donation to the organization 
                        that developed it without any public funding.
                    </p>
                    ) : null
                }
                {selectedOption === "deutsch" ? (
                    <p>
                        Hat Ihnen dieses Spiel gefallen? Zögern Sie nicht, einen Beitrag an die 
                        Organisation zu leisten, die es ohne öffentliche Hilfe entwickelt hat.
                    </p>
                    ) : null
                }

                {selectedOption === "italiano" ? (
                    <p>
                        Ti è piaciuto questo gioco? Non esitare a fare una donazione all'associazione 
                        che lo ha sviluppato senza alcun aiuto pubblico.
                    </p>
                    ) : null
                }

                <div className="donation-box">
                    <a href="https://myecobestfriend.com/fr/produit/make-a-donation-to-our-association/" 
                        target="_blank" rel="noopener noreferrer"
                        className="btn-donation"
                    >
                        Donation
                    </a>
                </div>

                <div className="restart-box">
                    <button type="button" onClick={handleRestart} className="btn-restart">Restart the GAME</button>
                </div>
            
            </div>
        </div>
    )
};
export default EndOfGame;