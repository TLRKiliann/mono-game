import type { PlayerProps, SquaresProps } from "../lib/types";
import { useEffect } from "react";
import { getRandomNumber } from '../utils/GetRandom';
import './styles/LeftBottomRightTop.css';

const SquaresOfTop = ({
    selectedOption,
    playersChoosen,
    setPlayersChoosen,
    activeCard,
    setActiveCard,
    activePlayerId,
    setReplay,
    lvlQuizDefi }: SquaresProps): JSX.Element => {

    const PlayerSpanTop: React.FC<{ player: PlayerProps }> = ({ player }) => {
        
        useEffect(() => {
            // triggers card display only if no card is already displayed.
            if (activeCard.isCardActive) return;
        
            if (player.caseNumber === 39 || player.caseNumber === 51 && activeCard.type !== "quiz") {
                setActiveCard({
                    type: "quiz",
                    cardData: getRandomNumber("quiz", player, selectedOption, setPlayersChoosen, setReplay, lvlQuizDefi),
                    isCardActive: true,
                });
            } else if (player.caseNumber === 42 || player.caseNumber === 54 && activeCard.type !== "defi") {
                setActiveCard({
                    type: "defi",
                    cardData: getRandomNumber("defi", player, selectedOption, setPlayersChoosen, setReplay, lvlQuizDefi),
                    isCardActive: true,
                });
            } else if (player.caseNumber === 45 && activeCard.type !== "action") {
                setActiveCard({
                    type: "action",
                    cardData: getRandomNumber("action", player, selectedOption, setPlayersChoosen, setReplay, lvlQuizDefi),
                    isCardActive: true,
                });
            } else if (player.caseNumber === 48 && activeCard.type !== "sanction") {
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

    const TopSquare: React.FC<{ caseNumber: number, playersChoosen: PlayerProps[], additionalContent: React.ReactNode }> = (
        { caseNumber, playersChoosen, additionalContent }) => (
            <div className={`squares square-top ${caseNumber === 39 ? "quiz-color" : caseNumber === 42 ? "defi-color" 
                : caseNumber === 45 ? "action-color" : caseNumber === 48 ? "sanction-color" : caseNumber === 51 ? "quiz-color" 
                : caseNumber === 54 ? "defi-color" : null}`}>
                    <div className="caseNumber">
                        {caseNumber}
                        {playersChoosen.map((player: PlayerProps) => player.caseNumber === caseNumber 
                            ? <PlayerSpanTop 
                                key={player.id} 
                                player={player} 
                            /> 
                            : null)}
                    </div>
                {additionalContent}
            </div>
    );

    return (
        <div className='top-frame'>

            <div className='first-squares square-top'>
            
                <p className="first-squares-pone">0</p>
                
                <p className="first-squares-ptwo">Start</p>

                <div className="span-pawn-firstcase">
                    {playersChoosen.map((player: PlayerProps) => {
                        if (player.caseNumber === 0) return (
                            <div key={player.id} className="div-pawn">
                                <span className="number-span">
                                    {player.id}
                                </span> 
                                <span className="pawn-span">
                                    {player.icon}
                                </span>
                            </div>
                        );
                        else return null;
                    })}
                </div>
            
            </div>

            {Array.from({ length: 17 }, (_, index) => {
                const caseNumber = 55 - index;
                let additionalContent;

                switch (caseNumber) {
                    case 39:
                    additionalContent = <h4>Quiz</h4>;
                    break;
                    case 42:
                    additionalContent = <h4>{selectedOption === "français" ? "Défi"
                        : selectedOption === "english" ? "Challenges" 
                        : selectedOption === "deutsch" ? "Herausforderungen" 
                        : selectedOption === "italiano" ? "Sfide" : null}</h4>;
                    break;
                    case 45:
                    additionalContent = <h4>{selectedOption === "français" ? "Bonne Action"
                        : selectedOption === "english" ? "Good Deed" 
                        : selectedOption === "deutsch" ? "Gute Tat" 
                        : selectedOption === "italiano" ? "Buona Azione" : null}</h4>;
                    break;
                    case 48:
                    additionalContent = <h4>{selectedOption === "français" ? "Sanction" 
                        : selectedOption === "english" ? "Sanction" 
                        : selectedOption === "deutsch" ? "Sanktion" 
                        : selectedOption === "italiano" ? "sanzione" : null}</h4>;
                    break;
                    case 51:
                    additionalContent = <h4>Quiz</h4>;
                    break;
                    case 54:
                    additionalContent = <h4>{selectedOption === "français" ? "Défi"
                        : selectedOption === "english" ? "Challenges" 
                        : selectedOption === "deutsch" ? "Herausforderungen" 
                        : selectedOption === "italiano" ? "Sfide" : null}</h4>;
                    break;
                    default:
                    additionalContent = null;
                }

                return <TopSquare
                    key={caseNumber}
                    caseNumber={caseNumber}
                    playersChoosen={playersChoosen}
                    additionalContent={additionalContent}
                />;
            })}
        </div>
    )
};
export default SquaresOfTop;