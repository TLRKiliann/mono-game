import { useEffect, useRef, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { FaStopCircle } from "react-icons/fa";
import "./styles/AudioPlayer.css";

const AudioPlayer = (): JSX.Element => {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioSrc = new URL('../assets/audio/Colorful-Flowers.mp3', import.meta.url).href;

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const musicName = "Colorful-Flowers.mp3";

    useEffect(() => {
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                } catch (error) {
                    console.error('Erreur lors de la lecture automatique :', error);
                }
            }
        };
        playAudio();
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const onEnded = () => {
        console.log('Musique is finished.');
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    const handleVisibility = (): void => {
        setIsVisible((prev) => !prev);
    };

    return (
        <div className="audio-container">
            
            <div onMouseEnter={handleVisibility} onMouseLeave={handleVisibility} className={`${isVisible ? "audio-display" : "audio-hide"}`}>

                <audio ref={audioRef} src={audioSrc} onEnded={onEnded}></audio>

                <div className="box-params">

                    <div className="div-audiop">
                        <p>Music</p>
                    </div>

                    <div className="params">
                        <span onClick={play}><FaCirclePlay size={24} /></span>
                        <span onClick={pause}><FaCirclePause size={24} /></span>
                        <span onClick={stop}><FaStopCircle size={24} /></span>
                        <p>{musicName}</p>
                    </div>

                </div>

            </div>

        </div>
    )
};
export default AudioPlayer;