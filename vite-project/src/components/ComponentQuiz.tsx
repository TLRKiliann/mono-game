import type { PlayerProps, QuizProps } from '../lib/types';
import React, { useEffect, useState } from 'react';
import img_1 from '../assets/quiz/1.jpg';
import img_2 from '../assets/quiz/2.jpg';
import img_3 from '../assets/quiz/3.jpg';
import img_4 from '../assets/quiz/4.jpg';
import img_5 from '../assets/quiz/5.jpg';
import img_6 from '../assets/quiz/6.jpg';
import img_7 from '../assets/quiz/7.jpg';
import img_8 from '../assets/quiz/8.jpg';
import img_9 from '../assets/quiz/9.jpg';
import img_10 from '../assets/quiz/10.jpg';
import img_11 from '../assets/quiz/11.jpg';
import img_12 from '../assets/quiz/12.jpg';
import img_13 from '../assets/quiz/13.jpg';
import img_14 from '../assets/quiz/14.jpg';
import img_15 from '../assets/quiz/15.jpg';
import './styles/CardDisplayer.css';

type ComponentQuizProps = {
    findCardQuiz: QuizProps;
    player: PlayerProps;
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
};

const ComponentQuiz: React.FC<ComponentQuizProps> = ({ findCardQuiz, player, setPlayersChoosen }) => {

    const [onShow, setOnShow] = useState<boolean>(true);
    const [response, setResponse] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<string>("");

    // cards
    const imgQuiz: string[] = [
        img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, 
        img_9, img_10, img_11, img_12, img_13, img_14, img_15
    ];

    // card corresponds of question nbr (15 cards - 100 questions) !
    let quizNumber: number = findCardQuiz.id;
    
    const [imgQuizId, setImgQuizId] = useState<string>("");

    // avoid to change card in every render
    useEffect(() => {
        if (quizNumber && quizNumber > 15) {
            const imgRandom = Math.floor(Math.random() * 15);
            const imgQuizId = imgQuiz[imgRandom];
            setImgQuizId(imgQuizId);
        } else {
            const imgQuizId = imgQuiz[quizNumber - 1];
            setImgQuizId(imgQuizId);
        };
    }, [quizNumber]);

    const handleClick = (): void => {
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
            setPlayersChoosen((prev) => prev.map((playerGame: PlayerProps) => playerGame.id === player.id 
                ? {...playerGame, caseNumber: playerGame.caseNumber + 4} // player should be able to replay
                : playerGame));
        } else {
            // A tester !
            setPlayersChoosen((prev) => prev.map((playerGame: PlayerProps) => playerGame.id === player.id 
                ? {...playerGame, caseNumber: playerGame.caseNumber === 3 ? playerGame.caseNumber - 3 : playerGame.caseNumber - 4}
                : playerGame));
        };
        setOnShow(false);
    };

    if (!imgQuizId) {
        return <p>Image non trouvée pour cette question.</p>;
    };

    console.log(player.caseNumber, "player.caseNumber");

    return (
        <div className={`${onShow === true ? 'card-displayer' : 'card-hidden'}`}>
            <img 
                src={imgQuizId} 
                width={1024} 
                height={1024} 
                alt={`Illustration pour la question ${findCardQuiz.id}`} 
                className='img-card' 
            />
            
            <div className='para-box-card'>
                <div className='div-card-item'>
                    <p className='p-card-first'>{findCardQuiz.id} {findCardQuiz.title}</p>
                </div>
                <div className='div-card-item'>
                    <p className='p-card-second'>{findCardQuiz.question || "Question indisponible"}</p>
                </div>

                {response === true ? (
                    <div className='div-mainValidate'>

                        <div className='validate-error'>
                            <label htmlFor="validate">Juste
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
                            <label htmlFor="error">Faux
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
                ) : null}

                {isChecked ? (
                    <div className='div-validateBtn'>
                        <button type="button" onClick={handleValidate}>Validate</button>
                    </div>
                ) : null}
                
                <div className='div-card-item'>

                    {response === true ? (
                        <p className='p-card-third'>{findCardQuiz.response || "Réponse indisponible"}</p>
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

export default ComponentQuiz;
