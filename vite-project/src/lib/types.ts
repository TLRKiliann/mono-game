export type PlayerProps = {
    id: number;
    name: string;
    bgColor: string;
    caseNumber: number;
    lap: number;
    gameOver: boolean;
    caseQuiz: boolean;
    joker: boolean;
    icon: JSX.Element;
};

type ActiveCard = {
    type: 'quiz' | 'defi' | 'action' | 'sanction' | null;
    cardData: JSX.Element | null;
    isCardActive: boolean;
};

export type SquaresProps = {
    playersChoosen: PlayerProps[];
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
    setReplay: React.Dispatch<React.SetStateAction<boolean>>;
    activeCard: ActiveCard;
    setActiveCard: React.Dispatch<React.SetStateAction<ActiveCard>>;
    activePlayerId: number; 
    selectedOption: string;
};

export type QuizProps = {
    id: number;
    title: string;
    question: string;
    response: string;
};

export type DefiProps = {
    id: number;
    title: string;
    objectif: string;
    criteres: string;
};

export type BonneActionProps = {
    id: number;
    title: string;
    info: string;
    recompense: string | number;
}

export type SanctionsProps = {
    id: number;
    title: string;
    info: string;
    consequence: string | number;
};

export type DisplayCloseProps = {
    closeFullScreen: boolean;
    viewRules: boolean;
    closeNbrOfPlayers: boolean;
    closeNbrOfLap: boolean;
    closeReady: boolean;
};