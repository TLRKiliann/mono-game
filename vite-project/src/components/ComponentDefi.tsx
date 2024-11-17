import React from 'react';

type QuizProps = {
    id: number;
    ask: string;
    answer: string;
};

interface ComponentDefiProps {
    findCardDefi: QuizProps;
};

const ComponentQuiz: React.FC<ComponentDefiProps> = ({ findCardDefi }) => {
    return (
        <React.Fragment>
            {findCardDefi?.id}
            {findCardDefi?.ask}
            {findCardDefi?.answer}
        </React.Fragment>
    );
};

export default ComponentQuiz;
