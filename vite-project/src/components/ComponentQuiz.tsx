import React, { useState } from 'react';
import img_1 from '../assets/quiz/1.jpg';
import img_2 from '../assets/quiz/2.jpg';
import img_3 from '../assets/quiz/3.jpg';
/* import img_4 from '../assets/quiz/4.jpg';
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
import img_15 from '../assets/quiz/15.jpg'; */
import './styles/CardDisplayer.css';

type QuizProps = {
    id: number;
    ask: string;
    answer: string;
};

interface ComponentQuizProps {
    findCardQuiz: QuizProps;
};

const ComponentQuiz: React.FC<ComponentQuizProps> = ({ findCardQuiz }) => {

    const [onShow, setOnShow] = useState<boolean>(true);

    const handleClick = () => {
      setOnShow(false);
    };

    const imgQuiz: string[] = [img_1, img_2, img_3];
    const imgQuizId = imgQuiz[findCardQuiz.id - 1] ?? "";

    if (!imgQuizId) {
        return <p>Image non trouvée pour cette question.</p>;
    }

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
                <div>
                    <p className='p-card-first'>{findCardQuiz.id}</p>
                </div>
                <div>
                    <p className='p-card-second'>{findCardQuiz.ask || "Question indisponible"}</p>
                </div>
                <div>
                    <p className='p-card-third'>{findCardQuiz.answer || "Réponse indisponible"}</p>
                </div>
            </div>

            <div className='div-btn'>
                <button onClick={handleClick}>Close</button>
            </div>
        </div>
    );
};

export default ComponentQuiz;
