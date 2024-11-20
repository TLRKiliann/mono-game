export type PlayerProps = {
    id: number;
    name: string;
    color: string;
    caseNumber: number;
    caseQuiz: boolean;
};

export type QuizProps = {
    id: number;
    ask: string;
    answer: string;
};

export type OrderProps = {
    id: number;
    order: string;
};