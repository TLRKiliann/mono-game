import React from 'react';

type QuizProps = {
    id: number;
    ask: string;
    answer: string;
};

interface ComponentQuizProps {
    findCardQuiz: QuizProps;
};

const ComponentQuiz: React.FC<ComponentQuizProps> = ({ findCardQuiz }) => {
    return (
        <React.Fragment>
            {findCardQuiz?.id}
            {findCardQuiz?.ask}
            {findCardQuiz?.answer}
        </React.Fragment>
    );
};

export default ComponentQuiz;
