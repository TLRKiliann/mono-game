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

export type ActiveCardState = {
    type: 'quiz' | 'defi' | 'action' | 'sanction' | null;
    cardData: JSX.Element | null;
    isCardActive: boolean;
};

export type SquaresProps = {
    selectedOption: string | undefined;
    playersChoosen: PlayerProps[];
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
    activeCard: ActiveCardState;
    setActiveCard: React.Dispatch<React.SetStateAction<ActiveCardState>>;
    activePlayerId: number; 
    setReplay: React.Dispatch<React.SetStateAction<boolean>>;
    lvlQuiz: string;
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
    closeLvl: boolean;
    closeReady: boolean;
};