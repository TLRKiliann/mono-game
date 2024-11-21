import React, { useState } from 'react';
import img_1 from '../assets/defis/1.jpg';
import img_2 from '../assets/defis/2.jpg';
import img_3 from '../assets/defis/3.jpg';
/* import img_4 from '../assets/defis/4.jpg';
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
import img_30 from '../assets/defis/10.jpg';
import img_31 from '../assets/defis/11.jpg';
import img_32 from '../assets/defis/12.jpg';
import img_33 from '../assets/defis/13.jpg';
import img_34 from '../assets/defis/14.jpg';
import img_35 from '../assets/defis/15.jpg';
import img_36 from '../assets/defis/16.jpg'; */
import './styles/CardDisplayer.css';

type QuizProps = {
    id: number;
    ask: string;
    answer: string;
};

interface ComponentDefiProps {
    findCardDefi: QuizProps;
};

const ComponentQuiz: React.FC<ComponentDefiProps> = ({ findCardDefi }) => {

    const [onShow, setOnShow] = useState<boolean>(true);
    const [response, setResponse] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<string>("");

    const handleClick = () => {
      setOnShow(false);
    };
    
    const handleResponse = (): void => {
        setResponse(!response);
    }

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setIsChecked(event.target.value);
    }

    const handleValidate = (): void => {
        console.log("Change case number by gamer !!!");
        setOnShow(false);
    }

    /* const imgDefis: string[] = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9, 
        img_10, img_11, img_12, img_13, img_14, img_15, img_16, img_17, img_18, img_19,
        img_20, img_21, img_22, img_23, img_24, img_25, img_26, img_27, img_28, img_29,
        img_30, img_31, img_32, img_33, img_34, img_35, img_36
    ]; */

    const imgDefis: string[] = [img_1, img_2, img_3];

    const imgDefiId = imgDefis[findCardDefi.id - 1];
    console.log(imgDefiId, "imgDefi");

    return (
        <div className={`${onShow === true ? 'card-displayer' : 'card-hidden'}`}>
            <img 
                src={imgDefiId} 
                width={1024} 
                height={1024} 
                alt={`Illustration pour la question ${findCardDefi.id}`} 
                className='img-card' 
            />

            <div className='para-box-card'>
                <div className='div-card-item'>
                    <p className='p-card-first'>{findCardDefi.id}</p>
                </div>
                <div className='div-card-item'>
                    <p className='p-card-second'>{findCardDefi.ask || "Question indisponible"}</p>
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
                    <div className='div-validatecase'>
                        <button type="button" onClick={handleValidate}>Validate</button>
                    </div>
                ) : null}
                
                <div className='div-card-item'>
                    {response === true ? (
                        <p className='p-card-third'>{findCardDefi.answer || "Réponse indisponible"}</p>
                    ) : (
                        <div className='div-response'>
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
