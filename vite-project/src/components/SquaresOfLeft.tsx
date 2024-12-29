import type { PlayerProps, SquaresProps } from "../lib/types";
import { useEffect } from "react";
import { getRandomNumber } from '../utils/GetRandom';
import './styles/LeftBottomRightTop.css';

const SquaresOfLeft = ({
    selectedOption, 
    playersChoosen,
    setPlayersChoosen,
    activeCard,
    setActiveCard,
    activePlayerId,
    setReplay,
    lvlQuizDefi }: SquaresProps): JSX.Element => {

    const PlayerSpanLeft: React.FC<{ player: PlayerProps }> = ({ player }) => {

        useEffect(() => {
            // triggers card display only if no card is already displayed.
            if (activeCard.isCardActive) return;
        
            if (player.caseNumber === 3 && activeCard.type !== "quiz") {
                setActiveCard({
                    type: "quiz",
                    cardData: getRandomNumber("quiz", player, selectedOption, setPlayersChoosen, setReplay, lvlQuizDefi),
                    isCardActive: true,
                });
            } else if (player.caseNumber === 6 && activeCard.type !== "defi") {
                setActiveCard({
                    type: "defi",
                    cardData: getRandomNumber("defi", player, selectedOption, setPlayersChoosen, setReplay, lvlQuizDefi),
                    isCardActive: true,
                });
            } else if (player.caseNumber === 9 && activeCard.type !== "action") {
                setActiveCard({
                    type: "action",
                    cardData: getRandomNumber("action", player, selectedOption, setPlayersChoosen, setReplay, lvlQuizDefi),
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
        );
    };
  
    const LeftSquare: React.FC<{ caseNumber: number, playersChoosen: PlayerProps[], additionalContent: React.ReactNode }> = (
        { caseNumber, playersChoosen, additionalContent }) => (
            <div className={`squares-side squares-lside ${caseNumber === 3 ? "quiz-color" : caseNumber === 6 ? "defi-color" 
                : caseNumber === 9 ? "action-color" : null}`}>
                <div className="caseNumber">
                    {caseNumber}
                    {playersChoosen.map((player: PlayerProps) => player.caseNumber === caseNumber 
                        ? <PlayerSpanLeft 
                            key={player.id} 
                            player={player}
                        /> 
                        : null
                    )}
                </div>
                {additionalContent}
            </div>
    );

    return (
        <div className='left-frame'>
            {Array.from({ length: 10 }, (_, index) => {
                const caseNumber = index + 1;
                let additionalContent;

                switch (caseNumber) {
                case 3:
                    additionalContent = <h4>Quiz</h4>;
                    break;
                case 6:
                    additionalContent = <h4>{selectedOption === "français" ? "Défi"
                    : selectedOption === "english" ? "Challenges" 
                    : selectedOption === "deutsch" ? "Herausforderungen" 
                    : selectedOption === "italiano" ? "Sfide" : null}</h4>;
                    break;
                case 9:
                    additionalContent = <h4>{selectedOption === "français" ? "Bonne Action"
                    : selectedOption === "english" ? "Good Deed" 
                    : selectedOption === "deutsch" ? "Gute Tat" 
                    : selectedOption === "italiano" ? "Buona Azione" : null}</h4>;
                    break;
                default:
                    additionalContent = null;
                }

                return <LeftSquare
                    key={caseNumber}
                    caseNumber={caseNumber}
                    playersChoosen={playersChoosen}
                    additionalContent={additionalContent} 
                />;
            })}
        </div>
    )
}
export default SquaresOfLeft;