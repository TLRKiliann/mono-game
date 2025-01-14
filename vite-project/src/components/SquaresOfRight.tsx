import type { PlayerProps, SquaresProps } from "../lib/types";
import { useEffect } from "react";
import { getRandomNumber } from '../utils/GetRandom';
import './styles/LeftBottomRightTop.css';

const SquaresOfRight = ({
    selectedOption, 
    playersChoosen,
    setPlayersChoosen,
    activeCard, 
    setActiveCard, 
    activePlayerId, 
    setReplay,
    lvlQuizDefi }: SquaresProps): JSX.Element => {

    const PlayerSpanRight: React.FC<{ player: PlayerProps }> = ({ player }) => {
        
        useEffect(() => {
            // triggers card display only if no card is already displayed.
            if (activeCard.isCardActive) return;
        
            if (player.caseNumber === 30 && activeCard.type !== "defi") {
                setActiveCard({
                    type: "defi",
                    cardData: getRandomNumber("defi", player, selectedOption, setPlayersChoosen, setReplay, lvlQuizDefi),
                    isCardActive: true,
                });
            } else if (player.caseNumber === 33 && activeCard.type !== "action") {
                setActiveCard({
                    type: "action",
                    cardData: getRandomNumber("action", player, selectedOption, setPlayersChoosen, setReplay, lvlQuizDefi),
                    isCardActive: true,
                });
            } else if (player.caseNumber === 36 && activeCard.type !== "sanction") {
                setActiveCard({
                    type: "sanction",
                    cardData: getRandomNumber("sanction", player, selectedOption, setPlayersChoosen, setReplay, lvlQuizDefi),
                    isCardActive: true,
                });
            }
        }, [player.caseNumber, activeCard.type]);

        return (
            <div style={{background: activePlayerId === player.id ? player.bgColor : "none"}} className="div-pawn">
                <span className="number-span">
                    {player.id}
                </span>
                <span className="pawn-span">
                    {player.icon}
                </span>
            </div>
        )
    };

    const RightSquare: React.FC<{ caseNumber: number, playersChoosen: PlayerProps[], additionalContent: React.ReactNode }> = (
        { caseNumber, playersChoosen, additionalContent }) => (
            <div className={`squares-side squares-rside ${caseNumber === 30 ? "defi-color" : caseNumber === 33 ? "action-color" 
                : caseNumber === 36 ? "sanction-color" : null}`}>
                <div className="caseNumberpawn-container">
                    <span className="caseNumber-box">{caseNumber}</span>
                    <span className="pawns-box">
                        {playersChoosen.map((player: PlayerProps) => player.caseNumber === caseNumber 
                            ? <PlayerSpanRight
                                key={player.id} 
                                player={player}
                            /> 
                            : null
                        )}
                    </span>
                </div>
                {additionalContent}
            </div>
    );

    return (
        <div className='right-frame'>
            {Array.from({ length: 10 }, (_, index) => {
                const caseNumber = 38 - index;
                let additionalContent;

                switch (caseNumber) {
                case 30:
                    additionalContent = <h4>{selectedOption === "français" ? "Défi"
                    : selectedOption === "english" ? "Challenges" 
                    : selectedOption === "deutsch" ? "Aufgabe" 
                    : selectedOption === "italiano" ? "Sfide" : null}</h4>;
                    break;
                case 33:
                    additionalContent = <h4>{selectedOption === "français" ? "Bonne Action"
                    : selectedOption === "english" ? "Good Deed" 
                    : selectedOption === "deutsch" ? "Gute Tat" 
                    : selectedOption === "italiano" ? "Buona Azione" : null}</h4>;
                    break;
                case 36:
                    additionalContent = <h4>{selectedOption === "français" ? "Sanction" 
                    : selectedOption === "english" ? "Sanction" 
                    : selectedOption === "deutsch" ? "Sanktion" 
                    : selectedOption === "italiano" ? "sanzione" : null}</h4>;
                    break;
                default:
                    additionalContent = null;
                }

                return <RightSquare
                    key={caseNumber}
                    caseNumber={caseNumber}
                    playersChoosen={playersChoosen}
                    additionalContent={additionalContent} 
                />;
            })}
        </div>
    )
}
export default SquaresOfRight;