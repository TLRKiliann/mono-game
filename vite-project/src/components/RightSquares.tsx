import type { PlayerProps } from "../lib/types";
import React, { useEffect, useState } from "react";
import { getRandomNumberDefi, getRandomNumberAction, getRandomNumberSanction } from "./functions";
import "./styles/RightSquares.css";

const PlayerSpanRight: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    const [defiCard, setDefiCard] = useState<JSX.Element | null>(null);
    const [actionCard, setActionCard] = useState<JSX.Element | null>(null);
    const [sanctionCard, setSanctionCard] = useState<JSX.Element | null>(null);

    useEffect(() => {
      updateCardsRight(player.caseNumber);
      return () => console.log("clean-up");
    }, [player.caseNumber]);

    // Update card by case & by player
    const updateCardsRight = (caseNum: number): void => {
      if (caseNum === 30) {
        setDefiCard(getRandomNumberDefi("defi"));
      } else if (caseNum === 33) {
        setActionCard(getRandomNumberAction("action"));
      } else if (caseNum === 36) {
        setSanctionCard(getRandomNumberSanction("sanction"));
      }
    };

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id} {defiCard} {actionCard} {sanctionCard}
      </div>
    )
  };

const RightSquares: React.FC<{ caseNumber: number, players: PlayerProps[], additionalContent: React.ReactNode }> = (
  { caseNumber, players, additionalContent }) => (
    <div className={`squares-side squares-rside ${caseNumber === 30 ? "defi-color" : caseNumber === 33 ? "action-color" : caseNumber === 36 
      ? "sanction-color" : null}`}>
      
      <div className="caseNumber">
        {caseNumber}
        {players.map((player: PlayerProps) => player.caseNumber === caseNumber ? <PlayerSpanRight key={player.id} player={player} /> : null)}
      </div>
      {additionalContent}
    </div>
  );

  export default RightSquares;
