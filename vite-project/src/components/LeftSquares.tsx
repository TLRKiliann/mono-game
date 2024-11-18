import type { PlayerProps } from "../lib/types";
import React, { useEffect, useState } from "react";
import { getRandomNumberQuiz, getRandomNumberAction, getRandomNumberDefi } from "./functions";
import './styles/LeftSquares.css';

const PlayerSpanLeft: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    const [quizCard, setQuizCard] = useState<JSX.Element | null>(null);
    const [defiCard, setDefiCard] = useState<JSX.Element | null>(null);
    const [actionCard, setActionCard] = useState<JSX.Element | null>(null);

    useEffect(() => {
      updateCardsLeft(player.caseNumber);
      return () => console.log("clean-up");
    }, [player.caseNumber]);
    
    const updateCardsLeft = (caseNum: number): void => {
      if (caseNum === 3) {
        setQuizCard(getRandomNumberQuiz("quiz"));
      } else if (caseNum === 6) {
        setDefiCard(getRandomNumberDefi("defi"));
      } else if (caseNum === 9) {
        setActionCard(getRandomNumberAction("action"));
      }
    };

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id} {quizCard} {defiCard} {actionCard}
      </div>
    )
};

const LeftSquares: React.FC<{ caseNumber: number, players: PlayerProps[], additionalContent: React.ReactNode }> = (
    { caseNumber, players, additionalContent }) => (
    <div className={`squares-side squares-lside ${caseNumber === 3 ? "quiz-color" : caseNumber === 6 ? "defi-color" : caseNumber === 9 ? "action-color" : null}`}>
        
        <div className="caseNumber">
          {caseNumber}
          {players.map((player: PlayerProps) => player.caseNumber === caseNumber ? <PlayerSpanLeft key={player.id} player={player} /> : null)}
        </div>
        {additionalContent}
    </div>
);
export default LeftSquares;