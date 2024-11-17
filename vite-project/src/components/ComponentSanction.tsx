import React from 'react';

type OrderProps = {
    id: number;
    order: string;
};

interface ComponentQuizProps {
    findCardSanction: OrderProps;
};

const ComponentSanction: React.FC<ComponentQuizProps> = ({ findCardSanction }) => {
    return (
        <React.Fragment>
            {findCardSanction?.id}
            {findCardSanction?.order}
        </React.Fragment>
    );
};

export default ComponentSanction;
