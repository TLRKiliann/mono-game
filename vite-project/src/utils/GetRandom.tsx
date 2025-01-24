import type { BonneActionProps, DefiProps, PlayerProps, QuizProps, SanctionsProps } from "../lib/types";
import { quizQuestions_fr_lvl2 } from "../lib/quiz/quiz_fr_lvl2";
import { quizQuestions_fr_lvl1 } from "../lib/quiz/quiz_fr_lvl1";
import { quizQuestions_en_lvl2 } from "../lib/quiz/quiz_en_lvl2";
import { quizQuestions_en_lvl1 } from "../lib/quiz/quiz_en_lvl1";
import { quizQuestions_de_lvl2 } from "../lib/quiz/quiz_de_lvl2";
import { quizQuestions_de_lvl1 } from "../lib/quiz/quiz_de_lvl1";
import { quizQuestions_it_lvl2 } from "../lib/quiz/quiz_it_lvl2";
import { quizQuestions_it_lvl1 } from "../lib/quiz/quiz_it_lvl1";

import { defiQuestions_fr} from "../lib/defi/defi_fr";
import { defiQuestions_en} from "../lib/defi/defi_en";
import { defiQuestions_de} from "../lib/defi/defi_de";
import { defiQuestions_it} from "../lib/defi/defi_it";

import { bonneActionQuestions_fr } from "../lib/bonnes-actions_fr";
import { bonneActionQuestions_en } from "../lib/bonnes-actions_en";
import { bonneActionQuestions_de } from "../lib/bonnes-actions_de";
import { bonneActionQuestions_it } from "../lib/bonnes-actions_it";
import { sanctionQuestions_fr } from "../lib/sanctions_fr";
import { sanctionQuestions_en } from "../lib/sanctions_en";
import { sanctionQuestions_de } from "../lib/sanctions_de";
import { sanctionQuestions_it } from "../lib/sanctions_it";
import ComponentBonneAction from "../components/ComponentBonneAction";
import ComponentDefi from "../components/ComponentDefi";
import ComponentQuiz from "../components/ComponentQuiz";
import ComponentSanction from "../components/ComponentSanction";

export const getRandomNumber = (
    type: string,
    player: PlayerProps,
    selectedOption: string,
    setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>, 
    setReplay: React.Dispatch<React.SetStateAction<boolean>>,
    lvlQuiz: string): JSX.Element | null => {
    
    // avoid to repeat same number/qestion of...
    const allQuizIdToDelete: number[] = [];
    const allDefiIdToDelete: number[] = [];
    const allBonneActionIdToDelete: number[] = [];
    const allSanctionIdToDelete: number[] = [];
    
    // delete quiz question
    let randomNumQuiz: number;
    if (lvlQuiz === "adultes") {
        do {
            randomNumQuiz = Math.floor(Math.random() * 87) + 1;
        } while (allQuizIdToDelete.includes(randomNumQuiz));
        allQuizIdToDelete.push(randomNumQuiz);
    } else {
        // need to be changed
        do {
            randomNumQuiz = Math.floor(Math.random() * 70) + 1;
        } while (allQuizIdToDelete.includes(randomNumQuiz));
        allQuizIdToDelete.push(randomNumQuiz);
    };

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
        lvlQuiz === "adultes" ?
            findCard = {
                quiz: quizQuestions_fr_lvl2.find((quiz: QuizProps) => quiz.id === randomNumQuiz),
                defi: defiQuestions_fr.find((defi: DefiProps) => defi.id === randomNumDefi),
                action: bonneActionQuestions_fr.find((action: BonneActionProps) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_fr.find((sanction: SanctionsProps) => sanction.id === randomNumSanction),
            }[type]
        : lvlQuiz === "enfants" ?
            findCard = {
                quiz: quizQuestions_fr_lvl1.find((quiz: QuizProps) => quiz.id === randomNumQuiz),
                defi: defiQuestions_fr.find((defi: DefiProps) => defi.id === randomNumDefi),
                action: bonneActionQuestions_fr.find((action: BonneActionProps) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_fr.find((sanction: SanctionsProps) => sanction.id === randomNumSanction),
            }[type] 
        : null;
    } else if (selectedOption === "english") {
        lvlQuiz === "adultes" ?
            findCard = {
                quiz: quizQuestions_en_lvl2.find((quiz: QuizProps) => quiz.id === randomNumQuiz),
                defi: defiQuestions_en.find((defi: DefiProps) => defi.id === randomNumDefi),
                action: bonneActionQuestions_en.find((action: BonneActionProps) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_en.find((sanction: SanctionsProps) => sanction.id === randomNumSanction),
            }[type]
        : lvlQuiz === "enfants" ?
            findCard = {
                quiz: quizQuestions_en_lvl1.find((quiz: QuizProps) => quiz.id === randomNumQuiz),
                defi: defiQuestions_en.find((defi: DefiProps) => defi.id === randomNumDefi),
                action: bonneActionQuestions_en.find((action: BonneActionProps) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_en.find((sanction: SanctionsProps) => sanction.id === randomNumSanction),
            }[type] 
        : null;
    } else if (selectedOption === "deutsch") {
        lvlQuiz === "adultes" ?
            findCard = {
                quiz: quizQuestions_de_lvl2.find((quiz: QuizProps) => quiz.id === randomNumQuiz),
                defi: defiQuestions_de.find((defi: DefiProps) => defi.id === randomNumDefi),
                action: bonneActionQuestions_de.find((action: BonneActionProps) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_de.find((sanction: SanctionsProps) => sanction.id === randomNumSanction),
            }[type]
        :lvlQuiz === "enfants" ?
            findCard = {
                quiz: quizQuestions_de_lvl1.find((quiz: QuizProps) => quiz.id === randomNumQuiz),
                defi: defiQuestions_de.find((defi: DefiProps) => defi.id === randomNumDefi),
                action: bonneActionQuestions_de.find((action: BonneActionProps) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_de.find((sanction: SanctionsProps) => sanction.id === randomNumSanction),
            }[type] 
        : null;
    } else if (selectedOption === "italiano") {
        lvlQuiz === "adultes" ?
            findCard = {
                quiz: quizQuestions_it_lvl2.find((quiz: QuizProps) => quiz.id === randomNumQuiz),
                defi: defiQuestions_it.find((defi: DefiProps) => defi.id === randomNumDefi),
                action: bonneActionQuestions_it.find((action: BonneActionProps) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_it.find((sanction: SanctionsProps) => sanction.id === randomNumSanction),
            }[type]
        : lvlQuiz === "enfants" ?
            findCard = {
                quiz: quizQuestions_it_lvl1.find((quiz: QuizProps) => quiz.id === randomNumQuiz),
                defi: defiQuestions_it.find((defi: DefiProps) => defi.id === randomNumDefi),
                action: bonneActionQuestions_it.find((action: BonneActionProps) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_it.find((sanction: SanctionsProps) => sanction.id === randomNumSanction),
            }[type]
        : null;
    };

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
