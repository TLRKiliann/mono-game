import type { PlayerProps } from "../lib/type";
import React, { useEffect, useState } from "react";
import { getRandomNumberQuiz, getRandomNumberAction, getRandomNumberDefi, getRandomNumberSanction } from "../lib/functions";

// top side squares onShow true & absolute over / onShow false & absolute under
const PlayerSpanTop: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    const [quizCard, setQuizCard] = useState<JSX.Element | null>(null);
    const [defiCard, setDefiCard] = useState<JSX.Element | null>(null);
    const [actionCard, setActionCard] = useState<JSX.Element | null>(null);
    const [sanctionCard, setSanctionCard] = useState<JSX.Element | null>(null);
    
    useEffect(() => {
      updateCardsTop(player.caseNumber);
      return () => console.log("clean-up");
    }, [player.caseNumber]);

    // Update card by case & by player
    const updateCardsTop = (caseNum: number): void => {
      if (caseNum === 39 || caseNum === 51) {
        setQuizCard(getRandomNumberQuiz("quiz"));
      } else if (caseNum === 42 || caseNum === 54) {
        setDefiCard(getRandomNumberDefi("defi"));
      } else if (caseNum === 45) {
        setActionCard(getRandomNumberAction("action"));
      } else if (caseNum === 48) {
        setSanctionCard(getRandomNumberSanction("sanction"));
      }
    };

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id} {quizCard} {defiCard} {actionCard} {sanctionCard}
      </div>
    )
};

const TopSquares: React.FC<{ caseNumber: number, players: PlayerProps[], additionalContent: React.ReactNode }> = (
    { caseNumber, players, additionalContent }) => (
    <div className={`squares square-top ${caseNumber === 39 ? "quiz-color" : caseNumber === 42 ? "defi-color" : caseNumber === 45  
        ? "action-color" : caseNumber === 48 ? "sanction-color" : caseNumber === 51 ? "quiz-color" : caseNumber === 54 ? "defi-color" : null}`}>
        <div className="caseNumber">
          {caseNumber}
          {players.map((player: PlayerProps) => player.caseNumber === caseNumber ? <PlayerSpanTop key={player.id} player={player} /> : null)}
        </div>
        {additionalContent}
    </div>
);
export default TopSquares;