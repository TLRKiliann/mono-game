import ecopotGame from "../assets/ecopotimg.png";
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
        } else if (element.mozRequestFullScreen) { // Firefox
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Safari
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // IE/Edge
            element.msRequestFullscreen();
        }
        setDisplayCloseBox((prev) => ({
            ...prev,
            closeFullScreen: false
        }));
    };

    return (
        <div className="fullscreen-div">
            <div className="div-ecopotimg">
                <img src={ecopotGame} width={850} height={850} className="ecopotGame" alt="ecopot-img" />
            </div>
            <button type="button" onClick={handleFullScreen}>Full Screen Mode</button>
        </div>
    )
}
export default FullScreen;