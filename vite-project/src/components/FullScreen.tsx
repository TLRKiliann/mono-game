import "./styles/FullScreen.css";

type FullScreenCloseProps = {
    setCloseFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FullScreen = ({setCloseFullScreen}: FullScreenCloseProps): JSX.Element => {
    
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
        setCloseFullScreen(false);
    };

    return (
        <div className="fullscreen-div">
            <button type="button" onClick={handleFullScreen}>Full Screen Mode</button>
        </div>
    )
}
export default FullScreen;