import React from 'react';

type OrderProps = {
    id: number;
    order: string;
};

interface ComponentQuizProps {
    findCardAction: OrderProps;
};

const ComponentBonneAction: React.FC<ComponentQuizProps> = ({ findCardAction }) => {
    return (
        <React.Fragment>
            {findCardAction?.id}
            {findCardAction?.order}
        </React.Fragment>
    );
};

export default ComponentBonneAction;
