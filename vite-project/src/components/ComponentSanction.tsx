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
import './styles/CardDisplayer.css';

type ComponentQuizProps = {
    findCardSanction: SanctionsProps;
    player: PlayerProps;
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
};

const ComponentSanction: React.FC<ComponentQuizProps> = ({ findCardSanction, player, setPlayersChoosen }) => {

    const [onShow, setOnShow] = useState<boolean>(true);
    const [response, setResponse] = useState<boolean>(false);

    // cards
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
        setResponse(!response);
    };

    // player must move back to start square if consequence is equal to 0. Otherwise, he must move back of number of squares...
    const handleValidate = (): void => {
        setPlayersChoosen((prev) => prev.map((playerGame: PlayerProps) => playerGame.id === player.id 
                ? {...playerGame, caseNumber: findCardSanction.consequence === "reset" ? 0 : playerGame.caseNumber - Number(findCardSanction.consequence)}
                : playerGame
            )
        );
        setOnShow(false);
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
            
            <div className='para-box-card'>
                <div className='div-card-item'>
                    <p className='p-card-first'>{findCardSanction.id} {findCardSanction.title}</p>
                </div>
                <div className='div-card-item'>
                    <p className='p-card-second'>{findCardSanction.info || "Question indisponible"}</p>
                </div>

                {response === true ? (
                    <div className='div-validateBtn'>
                        <button type="button" onClick={handleValidate}>Validate</button>
                    </div>
                ) : null}
                
                <div className='div-card-item'>

                    {response === true ? (
                        <p className='p-card-third'>{findCardSanction.consequence === "reset" ? "Retour case départ" 
                            : "Reculez de " + findCardSanction.consequence + " case(s)" || "Réponse indisponible"}</p>
                    ) : (
                        <div className='div-responseBtn'>
                            <button type="button" onClick={handleResponse}>Conséquence</button>
                        </div>
                    )}
                    
                </div>
            </div>

        </div>
    );
};

export default ComponentSanction;
