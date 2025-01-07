import type { PlayerProps, SanctionsProps } from '../lib/types';
import React, { useState } from 'react';
import img_1 from '../assets/sanctions/1.jpg';
import img_2 from '../assets/sanctions/2.jpg';
import img_3 from '../assets/sanctions/3.jpg';
import img_4 from '../assets/sanctions/4.jpg';
import img_5 from '../assets/sanctions/5.jpg';
import img_6 from '../assets/sanctions/6.jpg';
import img_7 from '../assets/sanctions/7.jpg';
import img_8 from '../assets/sanctions/8.jpg';
import img_9 from '../assets/sanctions/9.jpg';
import img_10 from '../assets/sanctions/10.jpg';
import img_11 from '../assets/sanctions/11.jpg';
import img_12 from '../assets/sanctions/12.jpg';
import img_13 from '../assets/sanctions/13.jpg';
import img_14 from '../assets/sanctions/14.jpg';
import img_15 from '../assets/sanctions/15.jpg';
import img_16 from '../assets/sanctions/16.jpg';
import img_17 from '../assets/sanctions/17.jpg';
import img_18 from '../assets/sanctions/18.jpg';
import img_19 from '../assets/sanctions/19.jpg';
import img_20 from '../assets/sanctions/20.jpg';
import img_21 from '../assets/sanctions/21.jpg';
import img_22 from '../assets/sanctions/22.jpg';
import img_23 from '../assets/sanctions/23.jpg';
import img_24 from '../assets/sanctions/24.jpg';
import img_25 from '../assets/sanctions/25.jpg';
import img_26 from '../assets/sanctions/26.jpg';
import img_27 from '../assets/sanctions/27.jpg';
import img_28 from '../assets/sanctions/28.jpg';
import img_29 from '../assets/sanctions/29.jpg';
import bonneActionAudio from '../assets/audio/bonne-action.mp3';
import sanctionAudio from '../assets/audio/sanctions.mp3';
import resetAudio from '../assets/audio/reset.mp3';
import './styles/CardDisplayer.css';

type ComponentQuizProps = {
    findCardSanction: SanctionsProps;
    player: PlayerProps;
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
    setReplay: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOption: string;
};

const ComponentSanction: React.FC<ComponentQuizProps> = ({
    findCardSanction,
    player,
    setPlayersChoosen,
    setReplay,
    selectedOption }): JSX.Element => {

    const [onShow, setOnShow] = useState<boolean>(true);
    const [response, setResponse] = useState<boolean>(false);
    const [displayJoker, setDisplayJoker] = useState<boolean>(false);

    // cards img
    const imgSanctions: string[] = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, 
        img_9, img_10, img_11, img_12, img_13, img_14, img_15, img_16, img_17, img_18, img_19,
        img_20, img_21, img_22, img_23, img_24, img_25, img_26, img_27, img_28, img_29
    ];

    // card corresponds of question nbr (29 cards - 36 questions)
    let sanctionNumber: number = findCardSanction.id;
    let imgSanctionId: string;

    if (sanctionNumber && sanctionNumber > 29) {
        const imgRandom = Math.floor(Math.random() * 29);
        imgSanctionId = imgSanctions[imgRandom];
        console.log(imgSanctionId);
    } else {
        imgSanctionId = imgSanctions[sanctionNumber - 1];
        console.log(imgSanctionId);
    };

    const handleResponse = (): void => {
        setResponse((prev) => !prev);
    };

    // if jocker display it !
    const handleDisplayJoker = (): JSX.Element => {
        return (
            <div className='display-joker'>
                <h2>!!! JOKER !!!</h2>
            </div>
        )
    };

    /* 
        The player can choose whether to use his joker or not, whether there is a reset or not. 
        If the player refuses to use his joker, he must return to the starting square if the consequence 
        is equal to “reset”, otherwise he must move back a number of squares...
        If the player uses his joker, the value of the joker changes to false.
    */
    const handleValidate = (id: number): any => {
        const playAudio = (audioSrc: string) => {
            const audio = new Audio(audioSrc);
            audio.play().catch((error) => {
                console.error("Erreur lors de la lecture du son :", error);
            });
        };
        const confirmJokerUsage = () => {
            return confirm(selectedOption === "français" ? "Voulez-vous utiliser le joker ?" 
                : selectedOption === "english" ? "Do you want to use the joker?" 
                : selectedOption === "deutsch" ? "Möchten Sie den Joker verwenden?" 
                : selectedOption === "italiano" ? "Vuoi usare il jolly?" : "something went wrong");
        };
        setPlayersChoosen((prev) => prev.map((playerGame: PlayerProps) => {
            if (playerGame.id === id) {
                if (playerGame.joker === true) {
                    const useJoker = confirmJokerUsage();
                    if (useJoker) {
                        setReplay(true);
                        setDisplayJoker((prev) => !prev);
                        playAudio(bonneActionAudio);
                        return {...playerGame, caseNumber: playerGame.caseNumber, caseQuiz: true, joker: false};
                    } else {
                        if (findCardSanction.consequence === "reset") {
                            setReplay(true);
                            playAudio(resetAudio);
                            return {...playerGame, caseNumber: 0};
                        } else {
                            playAudio(sanctionAudio);
                            return {...playerGame, caseNumber: playerGame.caseNumber - Number(findCardSanction.consequence)};
                        }
                    }
                } else if (findCardSanction.consequence === "reset") {
                    setReplay(true);
                    playAudio(resetAudio);
                    return {...playerGame, caseNumber: 0};
                } else {
                    playAudio(sanctionAudio);
                    return {...playerGame, caseNumber: playerGame.caseNumber - Number(findCardSanction.consequence)};
                }
            }
            return playerGame;
        }));
        // à revoir !
        if (displayJoker === true) {
            setTimeout(() => {
                setDisplayJoker(false);
                setOnShow(false);
            }, 3000);
        } else {
            setOnShow(false);
        }
    };

    return (
        <div className={`${onShow === true ? 'card-displayer' : 'card-hidden'}`}>
            <img 
                src={imgSanctionId} 
                width={1024} 
                height={1024} 
                alt={`Illustration pour la question ${findCardSanction.id}`} 
                className='img-card' 
            />

            <div>
                {displayJoker === true ? handleDisplayJoker() : null}
            </div>
            
            <div className='para-box-card'>
                <div className='div-card-item'>
                    <p className='p-card-first'>{findCardSanction.id} {findCardSanction.title}</p>
                </div>

                <div className='div-card-item'>
                    <p className='p-card-second'>{findCardSanction.info || "Question indisponible"}</p>
                </div>

                <div className={`div-validateBtn ${response ? '' : 'collapsed'}`}>
                    <button type="button" onClick={() => handleValidate(player.id)}>
                        {selectedOption === "français" 
                            ? "Valider" 
                            : selectedOption === "english" 
                            ? "Validate" 
                            : selectedOption === "deutsch" 
                            ? "Validieren" 
                            : selectedOption === "italiano" 
                            ? "Validare" 
                            : null
                        }
                    </button>
                </div>
                
                <div className='div-card-item'>

                    <p className={`p-card-third ${response === true ? "" : "collapsed-third"}`}>
                        {findCardSanction.consequence === "reset" && selectedOption === "français" 
                            ? "Retour case départ" 
                            : findCardSanction.consequence === "reset" && selectedOption === "english" 
                            ? "Go back to square start" 
                            : findCardSanction.consequence === "reset" && selectedOption === "deutsch" 
                            ? "Zurück zum Ausgangspunkt"
                            : findCardSanction.consequence === "reset" && selectedOption === "italiano" 
                            ? "Torna al punto di partenza"
                            : selectedOption === "français" 
                            ? "Reculez de " + findCardSanction.consequence + " case(s)" || "Réponse indisponible" 
                            : selectedOption === "english" 
                            ? "Move back " + findCardSanction.consequence + " square(s)" || "Response unavailable"
                            : selectedOption === "deutsch" 
                            ? "Gehe " + findCardSanction.consequence + " Felder zurück" || "Antwort nicht verfügbar"
                            : selectedOption === "italiano" 
                            ? "Torna indietro di " + findCardSanction.consequence + " caselle" || "Risposta non disponibile"
                            : null
                        }
                    </p>

                    {response === false ? (
                        <div className='div-responseBtn'>
                            <button type="button" onClick={handleResponse}>
                                {selectedOption === "français" 
                                    ? "Conséquence" 
                                    : selectedOption === "english" 
                                    ? "Consequence" 
                                    : selectedOption === "deutsch" 
                                    ? "Konsequenz" 
                                    : selectedOption === "italiano" 
                                    ? "Conseguenza" 
                                    : null
                                }
                            </button>
                        </div>
                    ) : null}
                    
                </div>
            </div>
        </div>
    );
};

export default ComponentSanction;
