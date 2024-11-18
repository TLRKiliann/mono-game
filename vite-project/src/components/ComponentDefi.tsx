import React from 'react';
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
import './CardDisplayer.css';

type QuizProps = {
    id: number;
    ask: string;
    answer: string;
};

interface ComponentDefiProps {
    findCardDefi: QuizProps;
    onShow: boolean;
    handleClick: () => void;
};

const ComponentQuiz: React.FC<ComponentDefiProps> = ({ findCardDefi, onShow, handleClick }) => {


    /* const imgDefis: string[] = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9, 
        img_10, img_11, img_12, img_13, img_14, img_15, img_16, img_17, img_18, img_19,
        img_20, img_21, img_22, img_23, img_24, img_25, img_26, img_27, img_28, img_29,
        img_30, img_31, img_32, img_33, img_34, img_35, img_36
    ]; */

    const imgDefis: string[] = [img_1, img_2, img_3];

    const imgDefi = imgDefis[findCardDefi.id - 1];
    console.log(imgDefi, "imgDefi");

    return (
        <div className={`${onShow === true ? 'card-displayer' : 'card-hidden'}`}>

            <img src={imgDefi} width={512} height={512} alt="no img defi" className='img-card' />

            <p className='p-card'>{findCardDefi?.id}</p>
            <p className='p-card'>{findCardDefi?.ask}</p>
            <p className='p-card'>{findCardDefi?.answer}</p>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default ComponentQuiz;
