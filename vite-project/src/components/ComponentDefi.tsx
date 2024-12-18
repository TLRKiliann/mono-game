import type { PlayerProps, DefiProps } from '../lib/types';
import React, { useState } from 'react';
import img_1 from '../assets/defis/1.jpg';
import img_2 from '../assets/defis/2.jpg';
import img_3 from '../assets/defis/3.jpg';
import img_4 from '../assets/defis/4.jpg';
import img_5 from '../assets/defis/5.jpg';
import img_6 from '../assets/defis/6.jpg';
import img_7 from '../assets/defis/7.jpg';
import img_8 from '../assets/defis/8.jpg';
import img_9 from '../assets/defis/9.jpg';
import img_10 from '../assets/defis/10.jpg';
import img_11 from '../assets/defis/11.jpg';
import img_12 from '../assets/defis/12.jpg';
import img_13 from '../assets/defis/13.jpg';
import img_14 from '../assets/defis/14.jpg';
import img_15 from '../assets/defis/15.jpg';
import img_16 from '../assets/defis/16.jpg';
import img_17 from '../assets/defis/17.jpg';
import img_18 from '../assets/defis/18.jpg';
import img_19 from '../assets/defis/19.jpg';
import img_20 from '../assets/defis/20.jpg';
import img_21 from '../assets/defis/21.jpg';
import img_22 from '../assets/defis/22.jpg';
import img_23 from '../assets/defis/23.jpg';
import img_24 from '../assets/defis/24.jpg';
import img_25 from '../assets/defis/25.jpg';
import img_26 from '../assets/defis/26.jpg';
import img_27 from '../assets/defis/27.jpg';
import img_28 from '../assets/defis/28.jpg';
import img_29 from '../assets/defis/29.jpg';
import img_30 from '../assets/defis/30.jpg';
import img_31 from '../assets/defis/31.jpg';
import img_32 from '../assets/defis/32.jpg';
import img_33 from '../assets/defis/33.jpg';
import img_34 from '../assets/defis/34.jpg';
import img_35 from '../assets/defis/35.jpg';
import img_36 from '../assets/defis/36.jpg';
import winFrog from '../assets/win-frog.png';
import lostFrog from '../assets/sad-frog.png';
import winAudio from '../assets/audio/win.mp3';
import lostAudio from '../assets/audio/lost.mp3';
import './styles/CardDisplayer.css';

interface ComponentDefiProps {
    findCardDefi: DefiProps;
    player: PlayerProps;
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
    setReplay: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOption: string;
};

const ComponentQuiz: React.FC<ComponentDefiProps> = ({ findCardDefi, player, setPlayersChoosen, setReplay, selectedOption }): JSX.Element => {

    const [onShow, setOnShow] = useState<boolean>(true);
    const [response, setResponse] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<string>("");
    const [result, setResult] = useState<"win" | "loose" | null>(null);

    // cards img
    const imgDefis: string[] = [
        img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9, img_10, 
        img_11, img_12, img_13, img_14, img_15, img_16, img_17, img_18, img_19, 
        img_20, img_21, img_22, img_23, img_24, img_25, img_26, img_27, img_28, 
        img_29, img_30, img_31, img_32, img_33, img_34, img_35, img_36
    ];

    // card corresponds of question nbr (36 cards - 20 questions)
    let defiNumber: number = findCardDefi.id;
    const imgDefiId = imgDefis[defiNumber - 1];
    
    const handleResponse = (): void => {
        setResponse((prev) => !prev);
    };

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const optionValue = event.target.value;
        setIsChecked(optionValue);
    };

    const handleWin = (): JSX.Element => {
        return (
            <div className='display-winloose'>
                <img src={winFrog} width={460} height={620} alt="win frog img" />
            </div>
        )
    };

    const handleLoose = (): JSX.Element => {
        return (
            <div className='display-winloose'>
                <img src={lostFrog} width={460} height={620} alt="lost frog img" />
            </div>
        )
    };

    // throw dice again automatically, if response is correct. Otherwise, he must move back to 4 squares. 
    const handleValidate = (): void => {
        if (isChecked === "option1") {
            setPlayersChoosen((prev) => prev.map((playerGame: PlayerProps) => playerGame.id === player.id 
                ? {...playerGame, caseNumber: playerGame.caseNumber, caseQuiz: true}
                : playerGame
            ));
            setReplay(true);
            const audio = new Audio(winAudio);
            audio.play().catch((error) => {
              console.error("Erreur lors de la lecture du son :", error);
            });
            setResult("win");
        } else {
            setPlayersChoosen((prev) => prev.map((playerGame: PlayerProps) => playerGame.id === player.id 
                ? {...playerGame, caseNumber: playerGame.caseNumber - 4}
                : playerGame
            ));
            const audio = new Audio(lostAudio);
            audio.play().catch((error) => {
                console.error("Erreur lors de la lecture du son :", error);
            });
            setResult("loose");
        }
        // setDisplayPlayer(true);
        setTimeout(() => {
            setOnShow(false);
            setResult(null);
        }, 3000)
    };

    if (!imgDefiId) {
        return <p>Image non trouvée pour cette question.</p>;
    };

    console.log(player.caseNumber, "player.caseNumber");

    return (
        <div className={`${onShow === true ? 'card-displayer' : 'card-hidden'}`}>
            <img 
                src={imgDefiId} 
                width={1024} 
                height={1024} 
                alt={`Illustration pour la question ${findCardDefi.id}`} 
                className='img-card' 
            />

            <div>
                {result === "win" && handleWin()}
                {result === "loose" && handleLoose()}
            </div>

            <div className='para-box-card'>
                <div className='div-card-item'>
                    <p className='p-card-first'>{findCardDefi.id} {findCardDefi.title}</p>
                </div>
                <div className='div-card-item'>
                    <p className='p-card-second'>{findCardDefi.objectif || "Question indisponible"}</p>
                </div>


                <div className={`div-mainValidate ${response === true ? "" : "collapsed-second"}`}>

                    <div className='validate-error'>
                        <label htmlFor="validate">
                            {selectedOption === "français" 
                                ? "Juste" 
                                : selectedOption === "english" 
                                ? "Correct" 
                                : selectedOption === "deutsch" 
                                ? "Gerecht" 
                                : selectedOption === "italiano" 
                                ? "Giusto" 
                                : null
                            }
                            <input
                                type="radio"
                                id="validate"
                                name="validate"
                                value="option1"
                                checked={isChecked === 'option1'} 
                                onChange={handleCheck} 
                            />
                        </label>
                    </div>

                    <div className='validate-error'>
                        <label htmlFor="error">
                            {selectedOption === "français" 
                                ? "Faux" 
                                : selectedOption === "english" 
                                ? "Wrong" 
                                : selectedOption === "deutsch" 
                                ? "Falsch" 
                                : selectedOption === "italiano" 
                                ? "Falso" 
                                : null
                            }
                            <input
                                type="radio"
                                id="error"
                                name="error"
                                value="option2"
                                checked={isChecked === 'option2'} 
                                onChange={handleCheck}
                            />
                        </label>
                    </div>

                </div>

                <div className={`div-validateBtn ${isChecked ? '' : 'collapsed'}`}>
                    <button type="button" onClick={handleValidate}>
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
      
                    <p className={`p-card-third ${response === true ? "" : "collapsed-third"}`}>{findCardDefi.criteres || "Réponse indisponible"}</p>

                    {response === false ? (
                        <div className='div-responseBtn'>
                            <button type="button" onClick={handleResponse}>
                                {selectedOption === "français" 
                                    ? "Critères" 
                                    : selectedOption === "english" 
                                    ? "Criteria" 
                                    : selectedOption === "deutsch" 
                                    ? "Kriterien" 
                                    : selectedOption === "italiano" 
                                    ? "Criteri" 
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

export default ComponentQuiz;
