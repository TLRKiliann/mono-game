import type { PlayerProps } from "../lib/types";
import React, { useEffect, useState } from "react";
import { getRandomNumberQuiz, getRandomNumberAction, getRandomNumberDefi, getRandomNumberSanction } from "../lib/functions";
import './styles/BottomSquares.css';

const PlayerSpanBottom: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    const [quizCard, setQuizCard] = useState<JSX.Element | null>(null);
    const [defiCard, setDefiCard] = useState<JSX.Element | null>(null);
    const [actionCard, setActionCard] = useState<JSX.Element | null>(null);
    const [sanctionCard, setSanctionCard] = useState<JSX.Element | null>(null);

    useEffect(() => {
      updateCardsBottom(player.caseNumber);
      return () => console.log("clean-up");
    }, [player.caseNumber]);

    // Update card by case & by player
    const updateCardsBottom = (caseNum: number): void => {
      if (caseNum === 15 || caseNum === 27) {
        setQuizCard(getRandomNumberQuiz("quiz"));
      } else if (caseNum === 18) {
        setDefiCard(getRandomNumberDefi("defi"));
      } else if (caseNum === 21) {
        setActionCard(getRandomNumberAction("action"));
      } else if (caseNum === 12 || caseNum === 24) {
        setSanctionCard(getRandomNumberSanction("sanction"));
      }
    };

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id} {quizCard} {defiCard} {actionCard} {sanctionCard}
      </div>
    )
};

const BottomSquares: React.FC<{ caseNumber: number, players: PlayerProps[], additionalContent: React.ReactNode }> = (
    { caseNumber, players, additionalContent }) => (
    <div className={`squares square-bottom ${caseNumber === 12 ? "sanction-color" : caseNumber === 15 ? "quiz-color" : caseNumber === 18 
        ? "defi-color" : caseNumber === 21 ? "action-color" : caseNumber === 24 ? "sanction-color" : caseNumber === 27 ? "quiz-color" : null}`}>
        
        <div className="caseNumber">
        {caseNumber}
        {players.map((player: PlayerProps) => player.caseNumber === caseNumber ? <PlayerSpanBottom key={player.id} player={player} /> : null)}
        </div>
        {additionalContent}
    </div>
);
export default BottomSquares;