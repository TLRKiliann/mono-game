import ecopotGame from "../assets/ecopotimg.png";
/* import ecopotGame from "../assets/dice.gif"; */
import "./styles/FullScreen.css";

type DisplayCloseProps = {
    closeFullScreen: boolean;
    viewRules: boolean;
    closeNbrOfPlayers: boolean;
    closeNbrOfLap: boolean;
    closeReady: boolean;
};

type FullScreenCloseProps = {
    setDisplayCloseBox: React.Dispatch<React.SetStateAction<DisplayCloseProps>>;
};

const FullScreen = ({ setDisplayCloseBox }: FullScreenCloseProps): JSX.Element => {
    
    const handleFullScreen = (): void => {
        
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if ((element as any).mozRequestFullScreen) { // Firefox
            (element as any).mozRequestFullScreen();
        } else if ((element as any).webkitRequestFullscreen) { // Safari
            (element as any).webkitRequestFullscreen();
        } else if ((element as any).msRequestFullscreen) { // IE/Edge
            (element as any).msRequestFullscreen();
        }
        setDisplayCloseBox((prev) => ({
            ...prev,
            closeFullScreen: false
        }));
    };

    return (
        <div className="div-fullscreen">
            
            <div className="main-container">

                <div className="container-h1h2">
                    <div className="div-h1">
                        <h1 className="main-title">
                            ! Bienvenue sur le jeu Mes Eco Potes !
                        </h1>
                    </div>
                    
                    <div className="div-h2">
                        <h2 className="sub-title">
                            Jeu de société sur l'environnement et la nature à jouer en famille, en classe ou entre amis !
                        </h2>
                    </div>
                </div>
                
                <div className="div-imgbtnp">
                    <div className="div-ecopotimg">
                        <img src={ecopotGame} width={850} height={850} className="ecopotimg" alt="ecopot-img" />
                    </div>

                    <div className="div-btn">
                        <button type="button" onClick={handleFullScreen}>Lancer le jeu</button>
                    </div>

                    <div className="div-p">
                        <p>Jeu développé par l'Association sans but lucratif Mon Eco Pote (
                            <a href="https://www.monecopote.com" target="_blank" rel="noopener noreferrer">www.monecopote.com</a> 
                            ) - Tous droits réservés -
                        </p>
                    </div>
                </div>

            </div>
            
        </div>
    )
}
export default FullScreen;