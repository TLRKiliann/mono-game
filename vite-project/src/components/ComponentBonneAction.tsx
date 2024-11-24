import type { PlayerProps, QuizProps } from '../lib/types';
import React, { useState } from 'react';
import img_1 from '../assets/actions/1.jpg';
import img_2 from '../assets/actions/2.jpg';
import img_3 from '../assets/actions/3.jpg';
/* import img_4 from '../assets/actions/4.jpg';
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
import img_25 from '../assets/actions/25.jpg'; */
import './styles/CardDisplayer.css';

type ComponentQuizProps = {
    findCardAction: QuizProps;
    player: PlayerProps;
    setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
};

const ComponentBonneAction: React.FC<ComponentQuizProps> = ({ findCardAction, player, setPlayers }) => {

    const [onShow, setOnShow] = useState<boolean>(true);
    const [response, setResponse] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<string>("");

    /*
    const imgBonneActions: string[] = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9, 
        img_10, img_11, img_12, img_13, img_14, img_15, img_16, img_17, img_18, img_19,
        img_20, img_21, img_22, img_23, img_24, img_25
    ]; */

    const imgBonneActions: string[] = [img_1, img_2, img_3];

    const imgBonneActionId = imgBonneActions[findCardAction.id - 1];
    console.log(imgBonneActionId, "imgBonneActionId");

    const handleClick = () => {
        setOnShow(false);
    };

    const handleResponse = (): void => {
        setResponse(!response);
    };

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const optionValue = event.target.value;
        setIsChecked(optionValue);
    };

    const handleValidate = (): void => {
        if (isChecked === "option1") {
            // player.caseNumber += 4;
            setPlayers((prev) => prev.map((playerGame: PlayerProps) => playerGame.id === player.id 
                ? {...playerGame, caseNumber: playerGame.caseNumber + 4} 
                : playerGame));
        } else {
            setPlayers((prev) => prev.map((playerGame: PlayerProps) => playerGame.id === player.id 
                ? {...playerGame, caseNumber: playerGame.caseNumber - 4} 
                : playerGame));
        }
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
                    <p className='p-card-first'>{findCardAction.id}</p>
                </div>
                <div className='div-card-item'>
                    <p className='p-card-second'>{findCardAction.ask || "Question indisponible"}</p>
                </div>

                {response === true ? (
                    <div className='div-mainValidate'>

                        <div className='validate-error'>
                            <label htmlFor="validate">Juste
                                <input type="radio" id="validate" name="validate" value="option1" checked={isChecked === 'option1'} onChange={handleCheck} />
                            </label>
                        </div>

                        <div className='validate-error'>
                            <label htmlFor="error">Faux
                                <input type="radio" id="error" name="error" value="option2" checked={isChecked === 'option2'} onChange={handleCheck} />
                            </label>
                        </div>

                    </div>
                ) : null}

                {isChecked ? (
                    <div className='div-validateBtn'>
                        <button type="button" onClick={handleValidate}>Validate</button>
                    </div>
                ) : null}
                
                <div className='div-card-item'>

                    {response === true ? (
                        <p className='p-card-third'>{findCardAction.answer || "Réponse indisponible"}</p>
                    ) : (
                        <div className='div-responseBtn'>
                            <button type="button" onClick={handleResponse}>Response</button>
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
