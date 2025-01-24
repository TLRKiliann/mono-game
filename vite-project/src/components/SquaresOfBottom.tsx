import type { PlayerProps, SquaresProps } from "../lib/types";
import { useEffect } from "react";
import { getRandomNumber } from '../utils/GetRandom';
import './styles/LeftBottomRightTop.css';

const SquaresOfBottom = ({
    selectedOption, 
    playersChoosen,
    setPlayersChoosen,
    activeCard, 
    setActiveCard, 
    activePlayerId, 
    setReplay,
    lvlQuiz }: SquaresProps): JSX.Element => {

    const PlayerSpanBottom: React.FC<{ player: PlayerProps }> = ({ player }) => {
        
        useEffect(() => {
            // triggers card display only if no card is already displayed.
            if (activeCard.isCardActive) return;
        
            if (player.caseNumber === 18 && activeCard.type !== "defi") {
                setActiveCard({
                type: "defi",
                cardData: getRandomNumber("defi", player, selectedOption, setPlayersChoosen, setReplay, lvlQuiz),
                isCardActive: true,
                });
            } else if (player.caseNumber === 21 && activeCard.type !== "action") {
                setActiveCard({
                type: "action",
                cardData: getRandomNumber("action", player, selectedOption, setPlayersChoosen, setReplay, lvlQuiz),
                isCardActive: true,
                });
            } else if (player.caseNumber === 15 || player.caseNumber === 27 && activeCard.type !== "quiz") {
                setActiveCard({
                type: "quiz",
                cardData: getRandomNumber("quiz", player, selectedOption, setPlayersChoosen, setReplay, lvlQuiz),
                isCardActive: true,
                });
            } else if (player.caseNumber === 12 || player.caseNumber === 24 && activeCard.type !== "sanction") {
                setActiveCard({
                type: "sanction",
                cardData: getRandomNumber("sanction", player, selectedOption, setPlayersChoosen, setReplay, lvlQuiz),
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

    const BottomSquare: React.FC<{ caseNumber: number, playersChoosen: PlayerProps[], additionalContent: React.ReactNode }> = (
        { caseNumber, playersChoosen, additionalContent }) => (
        <div className={`squares square-bottom ${caseNumber === 12 ? "sanction-color" : caseNumber === 15 
            ? "quiz-color" : caseNumber === 18 ? "defi-color" : caseNumber === 21 ? "action-color" : caseNumber === 24 
            ? "sanction-color" : caseNumber === 27 ? "quiz-color" : null}`}>
            
            <div className="caseNumberpawn-container">
                <span className="caseNumber-box">{caseNumber}</span>
                <span className="pawns-box">
                    {playersChoosen.map((player: PlayerProps) => player.caseNumber === caseNumber 
                        ? <PlayerSpanBottom 
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
        <div className='bottom-frame'>
            {Array.from({ length: 18 }, (_, index) => {
                const caseNumber = index + 11;
                let additionalContent;

                switch (caseNumber) {
                    case 12:
                    additionalContent = <h4>{selectedOption === "français" ? "Sanction" 
                        : selectedOption === "english" ? "Sanction" 
                        : selectedOption === "deutsch" ? "Sanktion" 
                        : selectedOption === "italiano" ? "sanzione" : null}</h4>;
                    break;
                    case 15:
                    additionalContent = <h4>Quiz</h4>;
                    break;
                    case 18:
                    additionalContent = <h4>{selectedOption === "français" ? "Défi"
                        : selectedOption === "english" ? "Challenges" 
                        : selectedOption === "deutsch" ? "Aufgabe" 
                        : selectedOption === "italiano" ? "Sfide" : null}</h4>;
                    break;
                    case 21:
                    additionalContent = <h4>{selectedOption === "français" ? "Bonne Action"
                        : selectedOption === "english" ? "Good Deed" 
                        : selectedOption === "deutsch" ? "Gute Tat" 
                        : selectedOption === "italiano" ? "Buona Azione" : null}</h4>;
                    break;
                    case 24:
                    additionalContent = <h4>{selectedOption === "français" ? "Sanction" 
                        : selectedOption === "english" ? "Sanction" 
                        : selectedOption === "deutsch" ? "Sanktion" 
                        : selectedOption === "italiano" ? "sanzione" : null}</h4>;
                    break;
                    case 27:
                    additionalContent = <h4>Quiz</h4>;
                    break;
                    default:
                    additionalContent = null;
                }

                return (
                    <BottomSquare 
                        key={caseNumber}
                        caseNumber={caseNumber}
                        playersChoosen={playersChoosen}
                        additionalContent={additionalContent}
                    />
                )
            })}
        </div>
    )
}
export default SquaresOfBottom;