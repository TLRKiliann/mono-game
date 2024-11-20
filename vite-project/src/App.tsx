import type { PlayerProps } from "./lib/types";
import { useEffect, useState } from "react";
import Dices from "./components/Dices";
import { bonneActionOrder, defiQuestions, quizQuestions, sanctionOrder } from "./lib/questions";
import ComponentQuiz from "./components/ComponentQuiz";
import ComponentDefi from "./components/ComponentDefi";
import ComponentBonneAction from "./components/ComponentBonneAction";
import ComponentSanction from "./components/ComponentSanction";
import mascotte from "./assets/mascotte-resize.png";
import myEcoBest from "./assets/myecobestfriend-logo.png";
import './App.css';

type QuizProps = {
  id: number;
  ask: string;
  answer: string;
};

type OrderProps = {
  id: number;
  order: string;
};

function App(): JSX.Element {

  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<number>(1);

  const [countPlayerOne, setCountPlayerOne] = useState<number>(0);
  const [countPlayerTwo, setCountPlayerTwo] = useState<number>(0);
  const [countPlayerThree, setCountPlayerThree] = useState<number>(0);
  const [countPlayerFour, setCountPlayerFour] = useState<number>(0);
  const [countPlayerFive, setCountPlayerFive] = useState<number>(0);
  const [countPlayerSix, setCountPlayerSix] = useState<number>(0);
  
  // counter by player
  const [activePlayerId, setActivePlayerId] = useState<number>(1);
  
  // simulation user's data from db
  const [players, setPlayers] = useState<PlayerProps[]>([
    {
      id: 1,
      name: "Player one",
      color: "lightblue",
      caseNumber: count > 55 ? (count - 55) : count
    },
    {
      id: 2,
      name: "Player two",
      color: "yellow",
      caseNumber: count > 55 ? (count - 55) : count
    },
    {
      id: 3,
      name: "Player three",
      color: "red",
      caseNumber: count > 55 ? (count - 55) : count
    },
    {
      id: 4,
      name: "Player four",
      color: "violet",
      caseNumber: count > 55 ? (count - 55) : count
    },
    {
      id: 5,
      name: "Player five",
      color: "orange",
      caseNumber: count > 55 ? (count - 55) : count
    },
    {
      id: 6,
      name: "Player six",
      color: "green",
      caseNumber: count > 55 ? (count - 55) : count
    }
  ]);

  //---

  const getRandomNumberQuiz = (type: 'quiz'): JSX.Element | null => {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    console.log("random", randomNum);

    const findCardQuiz: QuizProps | undefined = quizQuestions.find((quiz: QuizProps) => quiz.id === randomNum);
    console.log(findCardQuiz, "!!! findCardQuiz !!!");
    
    if (findCardQuiz) {
      return (type === 'quiz' && findCardQuiz) ? <ComponentQuiz findCardQuiz={findCardQuiz} /> : null;
    } else {
      return null;
    }
  }

  const getRandomNumberDefi = (type: 'defi'): JSX.Element | null => {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardDefi: QuizProps | undefined = defiQuestions.find((defi: QuizProps) => defi.id === randomNum);

    if (findCardDefi) {
      return (type === 'defi' && findCardDefi) ? <ComponentDefi findCardDefi={findCardDefi} /> : null;  
    } else {
      return null;
    }
  }

  const getRandomNumberAction = (type: 'action'): JSX.Element | null => {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardAction: OrderProps | undefined = bonneActionOrder.find((action: OrderProps) => action.id === randomNum);

    if (findCardAction) {
      return (type === 'action' && findCardAction) ? <ComponentBonneAction findCardAction={findCardAction} /> : null;
    } else {
      return null;
    }
  }

  const getRandomNumberSanction = (type: 'sanction'): JSX.Element | null => {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardSanction: OrderProps | undefined = sanctionOrder.find((sanction: OrderProps) => sanction.id === randomNum);
    if (findCardSanction) {
      return (type === 'sanction' && findCardSanction) ? <ComponentSanction findCardSanction={findCardSanction} /> : null;
    } else {
      return null;
    }
  };

  //---

  // Top
  const PlayerSpanTop: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    const [quizCard, setQuizCard] = useState<JSX.Element | null>(null);
    const [defiCard, setDefiCard] = useState<JSX.Element | null>(null);
    const [actionCard, setActionCard] = useState<JSX.Element | null>(null);
    const [sanctionCard, setSanctionCard] = useState<JSX.Element | null>(null);

    useEffect(() => {
      updateCardsTop(player.caseNumber);
      return () => console.log("clean-up top side");
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

  // --- --- ---

  // Left CONCENTRATE !!!
  const PlayerSpanLeft: React.FC<{ player: PlayerProps }> = ({ player }) => {

    const [quizCard, setQuizCard] = useState<JSX.Element | null>(null);
    const [defiCard, setDefiCard] = useState<JSX.Element | null>(null);
    const [actionCard, setActionCard] = useState<JSX.Element | null>(null);

    // problem !!!
    useEffect(() => {
      updateCardsLeft(player.caseNumber);
      return () => console.log("clean-up left side");
    }, []);

    const updateCardsLeft = (caseNum: number): void => {
      if (caseNum === 3 && quizCard === null) {
        setQuizCard(getRandomNumberQuiz("quiz"));
      } else if (caseNum === 6 && defiCard === null) {
        setDefiCard(getRandomNumberDefi("defi"));
      } else if (caseNum === 9 && actionCard === null) {
        setActionCard(getRandomNumberAction("action"));
      } else {
        console.log("nothing else to update...");
      }
    };

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id} {defiCard} {actionCard} {actionCard}
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
  
  // --- --- ---

  // Right
  const PlayerSpanRight: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    const [defiCard, setDefiCard] = useState<JSX.Element | null>(null);
    const [actionCard, setActionCard] = useState<JSX.Element | null>(null);
    const [sanctionCard, setSanctionCard] = useState<JSX.Element | null>(null);
    /* const [onShow, setOnShow] = useState<boolean>(true); */

    useEffect(() => {
      updateCardsRight(player.caseNumber);
      return () => console.log("clean-up right side");
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

  //bottom
  const PlayerSpanBottom: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    const [quizCard, setQuizCard] = useState<JSX.Element | null>(null);
    const [defiCard, setDefiCard] = useState<JSX.Element | null>(null);
    const [actionCard, setActionCard] = useState<JSX.Element | null>(null);
    const [sanctionCard, setSanctionCard] = useState<JSX.Element | null>(null);
    /* const [onShow, setOnShow] = useState<boolean>(true); */

    useEffect(() => {
      updateCardsBottom(player.caseNumber);
      return () => console.log("clean-up bottom side");
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

  return (
    <div className='frame'>

      <div className='top-frame'>

        <div className='first-squares square-top'>
          
          <p className="first-squares-pone">0</p>
        
          <p className="first-squares-ptwo">Start</p>
        
        </div>

        {Array.from({ length: 17 }, (_, index) => {
          const caseNumber = 55 - index;
          let additionalContent;

          switch (caseNumber) {
            case 39:
              additionalContent = <h4>Quiz</h4>;
              break;
            case 42:
              additionalContent = <h4>Défi</h4>;
              break;
            case 45:
              additionalContent = <h4>Bonne Action</h4>;
              break;
            case 48:
              additionalContent = <h4>Sanction</h4>;
              break;
            case 51:
              additionalContent = <h4>Quiz</h4>;
              break;
            case 54:
              additionalContent = <h4>Défi</h4>;
              break;
            default:
              additionalContent = null;
          }

          return <TopSquares key={caseNumber} caseNumber={caseNumber} players={players} additionalContent={additionalContent} />;
        })}

      </div>

      <div className="middle-frames">

        <div className='left-frame'>
          {Array.from({ length: 10 }, (_, index) => {
            const caseNumber = index + 1;
            let additionalContent;

            switch (caseNumber) {
              case 3:
                additionalContent = <h4>Quiz</h4>;
                break;
              case 6:
                additionalContent = <h4>Défi</h4>;
                break;
              case 9:
                additionalContent = <h4>Bonne Action</h4>;
                break;
              default:
                additionalContent = null;
            }

            return <LeftSquares key={caseNumber} caseNumber={caseNumber} players={players} additionalContent={additionalContent} />;
          })}
        </div>

        <div className="container-cards">
          
          <div className='cards-box cards-box-left'>
            
            <div className="card">Defis</div>

            <div className="div-jeudesociete">
              <h2>JEU DE SOCIETE</h2>
              <img src={mascotte} width={564} height={564} alt="img mascotte" className="mascotte-img" />
            </div>

            <div className="card">Quiz</div>
          
          </div>
          
          <div className="div-dice">
            <Dices 
              value={value} 
              setValue={setValue} 
              setCount={setCount}
              players={players}
              setPlayers={setPlayers}

              setCountPlayerOne={setCountPlayerOne}
              setCountPlayerTwo={setCountPlayerTwo}
              setCountPlayerThree={setCountPlayerThree}
              setCountPlayerFour={setCountPlayerFour}
              setCountPlayerFive={setCountPlayerFive}
              setCountPlayerSix={setCountPlayerSix}

              activePlayerId={activePlayerId}
              setActivePlayerId={setActivePlayerId}
            />
          </div>

          <div className='cards-box cards-box-right'>
          
            <div className="card">Sanctions</div>
            
            <div className="div-monecopote">
              <h2>MON ECO POTE</h2>
              <img src={myEcoBest} width={564} height={564} alt="img myecobestfriend" className="myecobestfriend-img" />
            </div>

            <div className="card">Bonnes Actions</div>

          </div>

        </div>

        <div className='right-frame'>
          {Array.from({ length: 10 }, (_, index) => {
            const caseNumber = 38 - index;
            let additionalContent;

            switch (caseNumber) {
              case 30:
                additionalContent = <h4>Défi</h4>;
                break;
              case 33:
                additionalContent = <h4>Bonne Action</h4>;
                break;
              case 36:
                additionalContent = <h4>Sanction</h4>;
                break;
              default:
                additionalContent = null;
            }

            return <RightSquares key={caseNumber} caseNumber={caseNumber} players={players} additionalContent={additionalContent} />;
          })}
        </div>

      </div>

      <div className='bottom-frame'>
        {Array.from({ length: 18 }, (_, index) => {
          const caseNumber = index + 11;
          let additionalContent;

          switch (caseNumber) {
            case 12:
              additionalContent = <h4>Sanction</h4>;
              break;
            case 15:
              additionalContent = <h4>Quiz</h4>;
              break;
            case 18:
              additionalContent = <h4>Défi</h4>;
              break;
            case 21:
              additionalContent = <h4>Bonne Action</h4>;
              break;
            case 24:
              additionalContent = <h4>Sanction</h4>;
              break;
            case 27:
              additionalContent = <h4>Quiz</h4>;
              break;
            default:
              additionalContent = null;
          }

          return <BottomSquares key={caseNumber} caseNumber={caseNumber} players={players} additionalContent={additionalContent} />;
        })}

      </div>

    </div>
  )
};

export default App;