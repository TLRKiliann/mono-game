import type { BonneActionProps, DefiProps, PlayerProps, QuizProps, SanctionsProps } from "../lib/types";
import { quizQuestions_fr_lvl3 } from "../lib/quiz/quiz_fr_lvl3";
import { quizQuestions_fr_lvl2 } from "../lib/quiz/quiz_fr_lvl2";
import { quizQuestions_fr_lvl1 } from "../lib/quiz/quiz_fr_lvl1";

import { quizQuestions_en_lvl3 } from "../lib/quiz/quiz_en_lvl3";
import { quizQuestions_en_lvl2 } from "../lib/quiz/quiz_en_lvl2";
import { quizQuestions_en_lvl1 } from "../lib/quiz/quiz_en_lvl1";

import { quizQuestions_de_lvl3 } from "../lib/quiz/quiz_de_lvl3";
import { quizQuestions_de_lvl2 } from "../lib/quiz/quiz_de_lvl2";
import { quizQuestions_de_lvl1 } from "../lib/quiz/quiz_de_lvl1";

import { quizQuestions_it_lvl3 } from "../lib/quiz/quiz_it_lvl3";
import { quizQuestions_it_lvl2 } from "../lib/quiz/quiz_it_lvl2";
import { quizQuestions_it_lvl1 } from "../lib/quiz/quiz_it_lvl1";

import { defiQuestions_fr_lvl3 } from "../lib/defi/defi_fr_lvl3";
import { defiQuestions_fr_lvl2 } from "../lib/defi/defi_fr_lvl2";
import { defiQuestions_fr_lvl1 } from "../lib/defi/defi_fr_lvl1";

import { defiQuestions_en_lvl3 } from "../lib/defi/defi_en_lvl3";
import { defiQuestions_en_lvl2 } from "../lib/defi/defi_en_lvl2";
import { defiQuestions_en_lvl1 } from "../lib/defi/defi_en_lvl1";

import { defiQuestions_de_lvl3 } from "../lib/defi/defi_de_lvl3";
import { defiQuestions_de_lvl2 } from "../lib/defi/defi_de_lvl2";
import { defiQuestions_de_lvl1 } from "../lib/defi/defi_de_lvl1";

import { defiQuestions_it_lvl3 } from "../lib/defi/defi_it_lvl3";
import { defiQuestions_it_lvl2 } from "../lib/defi/defi_it_lvl2";
import { defiQuestions_it_lvl1 } from "../lib/defi/defi_it_lvl1";

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
    lvlQuizDefi: number) => {
    
    // open card for corresponding player & square
    const allQuizIdToDelete: number[] = [];
    const allDefiIdToDelete: number[] = [];
    const allBonneActionIdToDelete: number[] = [];
    const allSanctionIdToDelete: number[] = [];

    // delete quiz question
    let randomNumQuiz: number;

    if (lvlQuizDefi === 3) {
        do {
            randomNumQuiz = Math.floor(Math.random() * 100) + 1;
        } while (allQuizIdToDelete.includes(randomNumQuiz));
    
        allQuizIdToDelete.push(randomNumQuiz);
    } else if (lvlQuizDefi === 2) {
        // need to be changed
        do {
            randomNumQuiz = Math.floor(Math.random() * 3) + 1;
        } while (allQuizIdToDelete.includes(randomNumQuiz));
    
        allQuizIdToDelete.push(randomNumQuiz);
    } else {
        // need to be changed
        do {
            randomNumQuiz = Math.floor(Math.random() * 3) + 1;
        } while (allQuizIdToDelete.includes(randomNumQuiz));
    
        allQuizIdToDelete.push(randomNumQuiz);
    };

    // delete defi question
    let randomNumDefi: number;

    if (lvlQuizDefi === 3) {
        do {
            randomNumDefi = Math.floor(Math.random() * 20) + 1;
        } while (allDefiIdToDelete.includes(randomNumDefi));
    
        allDefiIdToDelete.push(randomNumDefi);
    } else if (lvlQuizDefi === 2) {
        // need to be changed
        do {
            randomNumDefi = Math.floor(Math.random() * 3) + 1;
        } while (allDefiIdToDelete.includes(randomNumDefi));
    
        allDefiIdToDelete.push(randomNumDefi);
    } else {
        // need to be changed
        do {
            randomNumDefi = Math.floor(Math.random() * 3) + 1;
        } while (allDefiIdToDelete.includes(randomNumDefi));
    
        allDefiIdToDelete.push(randomNumDefi);
    };

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
        lvlQuizDefi === 3 ?
            findCard = {
                quiz: quizQuestions_fr_lvl3.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_fr_lvl3.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_fr.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_fr.find((sanction) => sanction.id === randomNumSanction),
            }[type] 
        : lvlQuizDefi === 2 ?
            findCard = {
                quiz: quizQuestions_fr_lvl2.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_fr_lvl2.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_fr.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_fr.find((sanction) => sanction.id === randomNumSanction),
            }[type] 
        : lvlQuizDefi === 1 ?
            findCard = {
                quiz: quizQuestions_fr_lvl1.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_fr_lvl1.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_fr.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_fr.find((sanction) => sanction.id === randomNumSanction),
            }[type] 
        : null;
    } else if (selectedOption === "english") {
        lvlQuizDefi === 3 ?
            findCard = {
                quiz: quizQuestions_en_lvl3.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_en_lvl3.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_en.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_en.find((sanction) => sanction.id === randomNumSanction),
            }[type]
        : lvlQuizDefi === 2 ?
            findCard = {
                quiz: quizQuestions_en_lvl2.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_en_lvl2.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_en.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_en.find((sanction) => sanction.id === randomNumSanction),
            }[type]
        : lvlQuizDefi === 1 ?
            findCard = {
                quiz: quizQuestions_en_lvl1.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_en_lvl1.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_en.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_en.find((sanction) => sanction.id === randomNumSanction),
            }[type] 
        : null;
    } else if (selectedOption === "deutsch") {
        lvlQuizDefi === 3 ?
            findCard = {
                quiz: quizQuestions_de_lvl3.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_de_lvl3.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_de.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_de.find((sanction) => sanction.id === randomNumSanction),
            }[type]
        : lvlQuizDefi === 2 ?
            findCard = {
                quiz: quizQuestions_de_lvl2.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_de_lvl2.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_de.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_de.find((sanction) => sanction.id === randomNumSanction),
            }[type]
        :lvlQuizDefi === 1 ?
            findCard = {
                quiz: quizQuestions_de_lvl1.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_de_lvl1.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_de.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_de.find((sanction) => sanction.id === randomNumSanction),
            }[type] 
        : null;
    } else if (selectedOption === "italiano") {
        lvlQuizDefi === 3 ?
            findCard = {
                quiz: quizQuestions_it_lvl3.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_it_lvl3.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_it.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_it.find((sanction) => sanction.id === randomNumSanction),
            }[type]
        : lvlQuizDefi === 2 ?
            findCard = {
                quiz: quizQuestions_it_lvl2.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_it_lvl2.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_it.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_it.find((sanction) => sanction.id === randomNumSanction),
            }[type]
        : lvlQuizDefi === 1 ?
            findCard = {
                quiz: quizQuestions_it_lvl1.find((quiz) => quiz.id === randomNumQuiz),
                defi: defiQuestions_it_lvl1.find((defi) => defi.id === randomNumDefi),
                action: bonneActionQuestions_it.find((action) => action.id === randomNumBonneAction),
                sanction: sanctionQuestions_it.find((sanction) => sanction.id === randomNumSanction),
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
