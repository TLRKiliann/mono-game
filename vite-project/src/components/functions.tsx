import { useState } from 'react';
import { quizQuestions, defiQuestions, sanctionOrder, bonneActionOrder } from '../lib/questions';
import ComponentQuiz from "./ComponentQuiz";
import ComponentDefi from "./ComponentDefi";
import ComponentBonneAction from './ComponentBonneAction';
import ComponentSanction from './ComponentSanction';

type QuizProps = {
    id: number;
    ask: string;
    answer: string;
};

type OrderProps = {
    id: number;
    order: string;
};

export const getRandomNumberQuiz = (type: 'quiz'): JSX.Element | null => {
    // for handleClick btn
    const [onShow, setOnShow] = useState<boolean>(true);

    const handleClick = () => {
        setOnShow(false);
    }

    const randomNum = Math.floor(Math.random() * 3) + 1;
    console.log("random", randomNum);
    
    const findCardQuiz: QuizProps | undefined = quizQuestions.find((quiz: QuizProps) => quiz.id === randomNum);
    console.log(findCardQuiz, "!!! findCardQuiz !!!");
    
    if (findCardQuiz) {
        setOnShow(true);
    } else {
        console.log("onShow is ", onShow);
    };

    return (type === 'quiz' && findCardQuiz) ? <ComponentQuiz findCardQuiz={findCardQuiz} onShow={onShow} handleClick={handleClick} /> : null;
}

export const getRandomNumberDefi = (type: 'defi'): JSX.Element | null => {
    const [onShow, setOnShow] = useState<boolean>(true);

    const handleClick = () => {
        setOnShow(false);
    }
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardDefi: QuizProps | undefined = defiQuestions.find((defi: QuizProps) => defi.id === randomNum);

    return (type === 'defi' && findCardDefi) ? <ComponentDefi findCardDefi={findCardDefi} onShow={onShow} handleClick={handleClick} /> : null;
}

export const getRandomNumberAction = (type: 'action'): JSX.Element | null => {
    const [onShow, setOnShow] = useState<boolean>(true);

    const handleClick = () => {
        setOnShow(false);
    }
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardAction: OrderProps | undefined = bonneActionOrder.find((action: OrderProps) => action.id === randomNum);

    return (type === 'action' && findCardAction) ? <ComponentBonneAction findCardAction={findCardAction} onShow={onShow} handleClick={handleClick} /> : null;
};

export const getRandomNumberSanction = (type: 'sanction'): JSX.Element | null => {
    const [onShow, setOnShow] = useState<boolean>(true);

    const handleClick = () => {
        setOnShow(false);
    }
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardSanction: OrderProps | undefined = sanctionOrder.find((sanction: OrderProps) => sanction.id === randomNum);

    return (type === 'sanction' && findCardSanction) ? <ComponentSanction findCardSanction={findCardSanction} onShow={onShow} handleClick={handleClick} /> : null;
};
