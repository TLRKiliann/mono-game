import { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import "./styles/EndOfGame.css";

type WinnerProps = {
    selectedOption: string;
    winner: number;
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
                
                <h1>
                    {selectedOption === "français" ? "Fin de partie" 
                        : selectedOption === "english" ? "Game-Over"
                        : selectedOption === "deutsch" ? "Spiel vorbei"
                        : selectedOption === "italiano" ? "Gioco finito"
                        : null
                     }
                </h1>
                
                <div className="winner-box">
                    <h2 className="winner">!!!&nbsp;
                        {selectedOption === "français" ? "Joueur" 
                            : selectedOption === "english" ? "Player" 
                            : selectedOption === "deutsch" ? "Spieler" 
                            : selectedOption === "italiano" ? "Giocatore" 
                            : null
                        }
                        &nbsp;{winner}&nbsp;
                        {selectedOption === "français" ? "a gagné"
                            : selectedOption === "english" ? "win"
                            : selectedOption === "deutsch" ? "gewinnt"
                            : selectedOption === "italiano" ? "vince" 
                            : null
                        }
                        &nbsp;!!!</h2>
                </div>

                {selectedOption === "français" ? (
                    <div>
                        <p>
                            Vous avez aimé ce jeu ? N'hésitez pas à faire un don à l'association 
                            qui l'a developpé sans aucune aide publique.
                        <br />
                        <br />
                            L'association est reconnue d'utilité publique en Suisse et vos dons peuvent 
                            être déduits de vos impôts.
                        </p>
                    </div>
                    ) : null
                }

                {selectedOption === "english" ? (
                    <div>
                        <p>
                            Did you enjoy this game? Feel free to make a donation to the organization 
                            that developed it without any public funding.
                        <br />
                        <br />
                            The association is recognized as a public utility in Switzerland and your 
                            donations can be deducted from your taxes.
                        </p>
                    </div>
                    ) : null
                }
                {selectedOption === "deutsch" ? (
                    <div>
                        <p>
                            Hat Ihnen dieses Spiel gefallen? Zögern Sie nicht, einen Beitrag an die 
                            Organisation zu leisten, die es ohne öffentliche Hilfe entwickelt hat.
                        <br />
                        <br />
                            Der Verein ist in der Schweiz als gemeinnützig anerkannt und Ihre Spenden 
                            können von Ihren Steuern abgezogen werden.
                        </p>
                    </div>
                    ) : null
                }

                {selectedOption === "italiano" ? (
                    <div>
                        <p>
                            Ti è piaciuto questo gioco? Non esitare a fare una donazione all'associazione 
                            che lo ha sviluppato senza alcun aiuto pubblico.
                        <br />
                        <br />
                            L'associazione è riconosciuta di pubblica utilità in Svizzera e le vostre donazioni 
                            possono essere dedotte dalle vostre tasse.
                        </p>
                    </div>
                    ) : null
                }

                <div className="donation-box">
                    <a href="https://myecobestfriend.com/fr/produit/make-a-donation-to-our-association/" 
                        target="_blank" rel="noopener noreferrer"
                        className="btn-donation"
                    >
                        {selectedOption === "français" ? "Cliquez ici pour faire un don !" 
                            : selectedOption === "english" ? "Click here to make a donation!"
                            : selectedOption === "deutsch" ? "Klicken Sie hier, um eine Spende zu machen!"
                            : selectedOption === "italiano" ? "Clicca per fare una donazione!" 
                            : null
                        }
                    </a>
                </div>

                <div className="restart-box">
                    <button type="button" onClick={handleRestart} className="btn-restart">
                        {selectedOption === "français" ? "Redémarrer le jeu"
                            : selectedOption === "english" ? "Restart the game"
                            : selectedOption === "deutsch" ? "Spiel neu starten"
                            : selectedOption === "italiano" ? "Riavvia il gioco"
                            : null
                        }
                    </button>
                </div>
            
            </div>
        </div>
    )
};
export default EndOfGame;