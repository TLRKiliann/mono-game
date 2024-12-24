import type { BonneActionProps, DefiProps, PlayerProps, QuizProps, SanctionsProps } from "../lib/types";

import { quizQuestions_fr } from "../lib/quiz_fr";
import { quizQuestions_en } from "../lib/quiz_en";
import { quizQuestions_de } from "../lib/quiz_de";
import { quizQuestions_it } from "../lib/quiz_it";
import { defiQuestions_fr } from "../lib/defi_fr";
import { defiQuestions_en } from "../lib/defi_en";
import { defiQuestions_de } from "../lib/defi_de";
import { defiQuestions_it } from "../lib/defi_it";
import { bonneActionQuestions_fr } from "../lib/bonnes-actions_fr";
import { bonneActionQuestions_en } from "../lib/bonnes-actions_en";
import { bonneActionQuestions_de } from "../lib/bonnes-actions_de";
import { bonneActionQuestions_it } from "../lib/bonnes-actions_it";
import { sanctionQuestions_fr } from "../lib/sanctions_fr";
import { sanctionQuestions_en } from "../lib/sanctions_en";
import { sanctionQuestions_de } from "../lib/sanctions_de";
import { sanctionQuestions_it } from "../lib/sanctions_it";

import ComponentBonneAction from "./ComponentBonneAction";
import ComponentDefi from "./ComponentDefi";
import ComponentQuiz from "./ComponentQuiz";
import ComponentSanction from "./ComponentSanction";

export const getRandomNumber = (
    type: string,
    player: PlayerProps,
    selectedOption: string,
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>, 
    setReplay: React.Dispatch<React.SetStateAction<boolean>>) => {
    
    // open card for corresponding player & square
    const allQuizIdToDelete: number[] = [];
    const allDefiIdToDelete: number[] = [];
    const allBonneActionIdToDelete: number[] = [];
    const allSanctionIdToDelete: number[] = [];

    // delete quiz question
    let randomNumQuiz: number;

    do {
        randomNumQuiz = Math.floor(Math.random() * 100) + 1;
    } while (allQuizIdToDelete.includes(randomNumQuiz));

    allQuizIdToDelete.push(randomNumQuiz);

    // delete defi question
    let randomNumDefi: number;

    do {
        randomNumDefi = Math.floor(Math.random() * 20) + 1;
    } while (allDefiIdToDelete.includes(randomNumDefi));

    allDefiIdToDelete.push(randomNumDefi);

    // delete bonneAction question
    let randomNumBonneAction: number;

    do {
        randomNumBonneAction = Math.floor(Math.random() * 25) + 1;
    } while (allBonneActionIdToDelete.includes(randomNumBonneAction));

    allBonneActionIdToDelete.push(randomNumBonneAction);

    // delete sanction question
    let randomNumSanction: number;

    do {
        randomNumSanction = Math.floor(Math.random() * 29) + 1;
    } while (allSanctionIdToDelete.includes(randomNumSanction));

    allSanctionIdToDelete.push(randomNumSanction);

    let findCard: any = null;

    if (selectedOption === "français") {
        findCard = {
            quiz: quizQuestions_fr.find((quiz) => quiz.id === randomNumQuiz),
            defi: defiQuestions_fr.find((defi) => defi.id === randomNumDefi),
            action: bonneActionQuestions_fr.find((action) => action.id === randomNumBonneAction),
            sanction: sanctionQuestions_fr.find((sanction) => sanction.id === randomNumSanction),
        }[type];
    } else if (selectedOption === "english") {
        findCard = {
            quiz: quizQuestions_en.find((quiz) => quiz.id === randomNumQuiz),
            defi: defiQuestions_en.find((defi) => defi.id === randomNumDefi),
            action: bonneActionQuestions_en.find((action) => action.id === randomNumBonneAction),
            sanction: sanctionQuestions_en.find((sanction) => sanction.id === randomNumSanction),
        }[type];
    } else if (selectedOption === "deutsch") {
        findCard = {
            quiz: quizQuestions_de.find((quiz) => quiz.id === randomNumQuiz),
            defi: defiQuestions_de.find((defi) => defi.id === randomNumDefi),
            action: bonneActionQuestions_de.find((action) => action.id === randomNumBonneAction),
            sanction: sanctionQuestions_de.find((sanction) => sanction.id === randomNumSanction),
        }[type];
    } else if (selectedOption === "italiano") {
        findCard = {
            quiz: quizQuestions_it.find((quiz) => quiz.id === randomNumQuiz),
            defi: defiQuestions_it.find((defi) => defi.id === randomNumDefi),
            action: bonneActionQuestions_it.find((action) => action.id === randomNumBonneAction),
            sanction: sanctionQuestions_it.find((sanction) => sanction.id === randomNumSanction),
        }[type];
    }

    if (!findCard) return null;

    switch (type) {
        case "quiz":
            return (
            <ComponentQuiz 
                findCardQuiz={findCard as QuizProps}
                player={player}
                setPlayersChoosen={setPlayersChoosen}
                setReplay={setReplay}
                selectedOption={selectedOption} 
            />
            );
        case "defi":
            return (
            <ComponentDefi
                findCardDefi={findCard as DefiProps}
                player={player}
                setPlayersChoosen={setPlayersChoosen}
                setReplay={setReplay}
                selectedOption={selectedOption}
            />
            );
        case "action":
            return (
            <ComponentBonneAction 
                findCardAction={findCard as BonneActionProps}
                player={player}
                setPlayersChoosen={setPlayersChoosen}
                selectedOption={selectedOption}
            />
            );
        case "sanction":
            return (
            <ComponentSanction 
                findCardSanction={findCard as SanctionsProps}
                player={player}
                setPlayersChoosen={setPlayersChoosen}
                setReplay={setReplay}
                selectedOption={selectedOption} 
            />
            );
        default:
            return null;
    }
};
