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
    //setQuizCard: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    /* onShow: boolean;
    handleClick: () => void; */
};

const ComponentQuiz: React.FC<ComponentQuizProps> = ({ findCardQuiz }) => {

  // Some troubles with click btn to close card !!!
  const [onShow, setOnShow] = useState<boolean>(true);

  const handleClick = () => {
    setOnShow(false);
  };
  
  console.log(onShow, "!! onShow !!");

/*     const imgQuiz: string[] = [img_1, img_2, img_3, img_4, img_5, img_6, 
        img_7, img_8, img_9, img_10, img_11, img_12, img_13, img_14, img_15
    ]; */
    const imgQuiz: string[] = [img_1, img_2, img_3];

    const imgQuizId = imgQuiz[findCardQuiz.id - 1];
    //const imgQuizId = findCardQuiz.id > 0 && findCardQuiz.id <= imgQuiz.length ? imgQuiz[findCardQuiz.id - 1] : null;
    
    console.log(imgQuizId, "imgQuizId");

    return (
        <div className={`${onShow === true ? 'card-displayer' : 'card-hidden'}`}>
            
            <img src={imgQuizId} width={1024} height={1024} alt="no img quiz" className='img-card' />
            
            <div className='para-box-card'>

                <div>
                    <p className='p-card-first'>{findCardQuiz?.id}</p>
                </div>
                
                <div>
                    <p className='p-card-second'>{findCardQuiz?.ask}</p>
                </div>
            
                <div>
                    <p className='p-card-third'>{findCardQuiz?.answer}</p>
                </div>
            
            </div>


            <div className='div-btn'>
                <button onClick={handleClick}>Close</button>
            </div>        
        </div>
    );
};

export default ComponentQuiz;
