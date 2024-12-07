export type PlayerProps = {
    id: number;
    name: string;
    color: string;
    caseNumber: number;
    lap: number;
    gameOver: boolean;
    caseQuiz: boolean;
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