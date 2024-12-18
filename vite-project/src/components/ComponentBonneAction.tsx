import type { BonneActionProps, PlayerProps } from '../lib/types';
import React, { useState } from 'react';
import img_1 from '../assets/actions/1.jpg';
import img_2 from '../assets/actions/2.jpg';
import img_3 from '../assets/actions/3.jpg';
import img_4 from '../assets/actions/4.jpg';
import img_5 from '../assets/actions/5.jpg';
import img_6 from '../assets/actions/6.jpg';
import img_7 from '../assets/actions/7.jpg';
import img_8 from '../assets/actions/8.jpg';
import img_9 from '../assets/actions/9.jpg';
import img_10 from '../assets/actions/10.jpg';
import img_11 from '../assets/actions/11.jpg';
import img_12 from '../assets/actions/12.jpg';
import img_13 from '../assets/actions/13.jpg';
import img_14 from '../assets/actions/14.jpg';
import img_15 from '../assets/actions/15.jpg';
import img_16 from '../assets/actions/16.jpg';
import img_17 from '../assets/actions/17.jpg';
import img_18 from '../assets/actions/18.jpg';
import img_19 from '../assets/actions/19.jpg';
import img_20 from '../assets/actions/20.jpg';
import img_21 from '../assets/actions/21.jpg';
import img_22 from '../assets/actions/22.jpg';
import img_23 from '../assets/actions/23.jpg';
import img_24 from '../assets/actions/24.jpg';
import img_25 from '../assets/actions/25.jpg';
import bonneActionAudio from '../assets/audio/bonne-action.mp3';
import './styles/CardDisplayer.css';

type ComponentQuizProps = {
    findCardAction: BonneActionProps;
    player: PlayerProps;
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
    selectedOption: string;
};

const ComponentBonneAction: React.FC<ComponentQuizProps> = ({ findCardAction, player, setPlayersChoosen, selectedOption }): JSX.Element => {

    const [onShow, setOnShow] = useState<boolean>(true);
    const [response, setResponse] = useState<boolean>(false);

    // cards img
    const imgBonneActions: string[] = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9, 
        img_10, img_11, img_12, img_13, img_14, img_15, img_16, img_17, img_18, img_19,
        img_20, img_21, img_22, img_23, img_24, img_25
    ];

    // card corresponds of question nbr (25 cards - 25 questions)
    let bonneActionNumber: number = findCardAction.id;
    const imgBonneActionId = imgBonneActions[bonneActionNumber - 1];

    const handleResponse = (): void => {
        setResponse((prev) => !prev);
    };

    // player can stay in square "good action" if "joker". Otherwise, he can advance according to the number of rewards.
    const handleValidate = (): void => {
        setPlayersChoosen((prev) => prev.map((playerGame: PlayerProps) => {
            if (playerGame.id === player.id) {
                if (findCardAction.recompense === "joker" && playerGame.joker === false) {
                    return { ...playerGame, caseNumber: playerGame.caseNumber + 1, joker: !playerGame.joker };
                } else if (findCardAction.recompense === "joker" && playerGame.joker === true) {
                    return { ...playerGame, caseNumber: playerGame.caseNumber + 1 };
                } else {
                    return { ...playerGame, caseNumber: playerGame.caseNumber + Number(findCardAction.recompense) };
                }
            }
            return playerGame;
        }));
        const audio = new Audio(bonneActionAudio);
        audio.play().catch((error) => {
          console.error("Erreur lors de la lecture du son :", error);
        });
        // setDisplayPlayer(true);
        setOnShow(false);
    };

    return (
        <div className={`${onShow === true ? 'card-displayer' : 'card-hidden'}`}>
            <img 
                src={imgBonneActionId} 
                width={1024} 
                height={1024} 
                alt={`Illustration pour la question ${findCardAction.id}`} 
                className='img-card' 
            />
            
            <div className='para-box-card'>
                <div className='div-card-item'>
                    <p className='p-card-first'>{findCardAction.id} {findCardAction.title}</p>
                </div>
                <div className='div-card-item'>
                    <p className='p-card-second'>{findCardAction.info || "Question indisponible"}</p>
                </div>

                <div className={`div-validateBtn ${response ? '' : 'collapsed'}`}>
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

                    <p className={`p-card-third ${response === true ? "" : "collapsed-third"}`}>
                        {findCardAction.recompense === "joker" && selectedOption === "français"  
                            ? "Joker gagné pour une éventuelle sanction + 1"
                            :findCardAction.recompense === "joker" && selectedOption === "english"
                            ? "Wait a little longer"
                            :findCardAction.recompense === "joker" && selectedOption === "deutsch" 
                            ? "War noch ein wenig"
                            :findCardAction.recompense === "joker" && selectedOption === "italiano" 
                            ? "Aspetta ancora un po"
                            : selectedOption === "français"  
                            ? "Avancez de " + findCardAction.recompense + " case(s)" || "Réponse indisponible"
                            : selectedOption === "english"  
                            ? "Move forward " + findCardAction.recompense + " square(s)" || "Response unavailable"
                            : selectedOption === "deutsch"  
                            ? "Vorwärts " + findCardAction.recompense + " Felder zurück" || "Antwort nicht verfügbar"
                            : selectedOption === "italiano"  
                            ? "Avanza di " + findCardAction.recompense + " caselle" || "Risposta non disponibile"
                            : null
                        }
                    </p>

                    {response === false ? (
                        <div className='div-responseBtn'>
                            <button type="button" onClick={handleResponse}>
                                {selectedOption === "français" 
                                    ? "Récompense" 
                                    : selectedOption === "english" 
                                    ? "Reward" 
                                    : selectedOption === "deutsch" 
                                    ? "Belohnung" 
                                    : selectedOption === "italiano" 
                                    ? "Ricompensa" 
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

export default ComponentBonneAction;
