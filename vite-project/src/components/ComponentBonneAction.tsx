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
import './styles/CardDisplayer.css';

type ComponentQuizProps = {
    findCardAction: BonneActionProps;
    player: PlayerProps;
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
};

const ComponentBonneAction: React.FC<ComponentQuizProps> = ({ findCardAction, player, setPlayersChoosen }) => {

    const [onShow, setOnShow] = useState<boolean>(true);
    const [response, setResponse] = useState<boolean>(false);

    // cards
    const imgBonneActions: string[] = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9, 
        img_10, img_11, img_12, img_13, img_14, img_15, img_16, img_17, img_18, img_19,
        img_20, img_21, img_22, img_23, img_24, img_25
    ];

    // card corresponds of question nbr (25 cards - 25 questions)
    let bonneActionNumber: number = findCardAction.id;
    const imgBonneActionId = imgBonneActions[bonneActionNumber - 1];

    const handleClick = (): void => {
        setOnShow(false);
    };

    const handleResponse = (): void => {
        setResponse(!response);
    };

    // player can stay in square "bonne action" if "joker". Otherwise, he can advance according to the number of rewards.
    const handleValidate = (): void => {
        setPlayersChoosen((prev) => prev.map((playerGame: PlayerProps) => playerGame.id === player.id 
            ? {...playerGame, caseNumber: findCardAction.recompense === "joker" 
                ? playerGame.caseNumber 
                : playerGame.caseNumber + Number(findCardAction.recompense)}
            : playerGame));
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

                {response === true ? (
                    <div className='div-validateBtn'>
                        <button type="button" onClick={handleValidate}>Validate</button>
                    </div>
                ) : null}
                
                <div className='div-card-item'>

                    {response === true ? (
                        <p className='p-card-third'>{findCardAction.recompense === "joker" 
                            ? "Attendez encore un peu" : "Avancez de " + findCardAction.recompense + " case(s)" || "Réponse indisponible"}</p>
                    ) : (
                        <div className='div-responseBtn'>
                            <button type="button" onClick={handleResponse}>Recompense</button>
                        </div>
                    )}
                    
                </div>
            </div>

            <div className='div-closeBtn'>
                <button onClick={handleClick}>Close</button>
            </div>
        </div>
    );
};

export default ComponentBonneAction;
