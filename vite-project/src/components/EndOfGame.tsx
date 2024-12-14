import "./styles/EndOfGame.css";

type WinnerProps = {
    selectedOption: string;
    winner: string;
};

const EndOfGame = ({selectedOption, winner}: WinnerProps): JSX.Element => {

    const handleRestart = (): void => {
        window.location.reload();
    };

    return (
        <div className="game-over">
            
            <h1>Game-Over</h1>
            
            <h2>!!! {winner} WIN !!!</h2>

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
            
            <a href="https://myecobestfriend.com/fr/produit/make-a-donation-to-our-association/" 
                target="_blank" rel="noopener noreferrer"
            >
                Donation
            </a>

            <button type="button" onClick={handleRestart}>Restart the GAME</button>
        
        </div>
    )
};
export default EndOfGame;