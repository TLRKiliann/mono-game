import type { BonneActionProps, DefiProps, PlayerProps, QuizProps, SanctionsProps } from "./lib/types";
import React, { useEffect, useState } from "react";
import NbrOfPlayers from "./components/NbrOfPlayers";
import Dices from "./components/Dices";
import { quizQuestions } from "./lib/quiz";
import { defiQuestions } from "./lib/defi";
import { bonneActionQuestions } from "./lib/bonnes-actions";
import { sanctionQuestions } from "./lib/sanctions";
import ComponentQuiz from "./components/ComponentQuiz";
import ComponentDefi from "./components/ComponentDefi";
import ComponentBonneAction from "./components/ComponentBonneAction";
import ComponentSanction from "./components/ComponentSanction";
import natureImg from "./assets/nature_1.jpg"
import mascotte from "./assets/mascotte-resize.png";
import myEcoBest from "./assets/myecobestfriend-logo.png";
import './App.css';

function App(): JSX.Element {

  // count nbre of case by player
  const [count, setCount] = useState<number>(0);
  // display value of dice
  const [value, setValue] = useState<number>(1);

  // all players start at 0
  const [, setCountPlayerOne] = useState<number>(0);
  const [, setCountPlayerTwo] = useState<number>(0);
  const [, setCountPlayerThree] = useState<number>(0);
  const [, setCountPlayerFour] = useState<number>(0);
  const [, setCountPlayerFive] = useState<number>(0);
  const [, setCountPlayerSix] = useState<number>(0);
  
  // counter by player after throwing dice
  const [activePlayerId, setActivePlayerId] = useState<number>(1);
  
  // choose players number at the begining of game
  const [nbPlayer, setNbPlayer] = useState<number>(2);

  const [playersChoosen, setPlayersChoosen] = useState<PlayerProps[]>([]);

  // simulation user's data from db - or without db
  const [players] = useState<PlayerProps[]>([
    {
      id: 1,
      name: "Player 1",
      color: "lightblue",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      //caseQuiz: false
    },
    {
      id: 2,
      name: "Player 2",
      color: "yellow",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      //caseQuiz: false
    },
    {
      id: 3,
      name: "Player 3",
      color: "red",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      //caseQuiz: false
    },
    {
      id: 4,
      name: "Player 4",
      color: "violet",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      //caseQuiz: false
    },
    {
      id: 5,
      name: "Player 5",
      color: "orange",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      //caseQuiz: false
    },
    {
      id: 6,
      name: "Player 6",
      color: "green",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      //caseQuiz: false
    }
  ]);

  //---

  // derivated state
  const derivatedStatePlayers: PlayerProps[] = players;

  useEffect(() => {
    //setPlayers(players.slice(0, nbPlayer));
    setPlayersChoosen(derivatedStatePlayers.slice(0, nbPlayer));
  }, [nbPlayer]);

  console.log(nbPlayer, "nb players");
  console.log(playersChoosen, "playersChoosen");

  //---

  const allQuizIdToDelete: number[] = [];
  const allDefiIdToDelete: number[] = [];
  const allBonneActionIdToDelete: number[] = [];
  const allSanctionIdToDelete: number[] = [];

  const [activeCard, setActiveCard] = useState<{
    type: 'quiz' | 'defi' | 'action' | 'sanction' | null;
    cardData: JSX.Element | null;
    isCardActive: boolean;
  }>({ type: null, cardData: null, isCardActive: false });
  
  // choose question by random with 'quiz' | 'defi' | 'action' | 'sanction' to display corresponding card
  const getRandomNumber = (type: string, player: PlayerProps) => {
    
    // delete quiz question
    let randomNumQuiz: number;

    do {
        randomNumQuiz = Math.floor(Math.random() * 100) + 1;
    } while (allQuizIdToDelete.includes(randomNumQuiz));

    allQuizIdToDelete.push(randomNumQuiz);

    // delete defi question
    let randomNumDefi: number;

    do {
        randomNumDefi = Math.floor(Math.random() * 20) + 1;
    } while (allDefiIdToDelete.includes(randomNumDefi));

    allDefiIdToDelete.push(randomNumDefi);

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

    const findCard = {
      quiz: quizQuestions.find((quiz) => quiz.id === randomNumQuiz),
      defi: defiQuestions.find((defi) => defi.id === randomNumDefi),
      action: bonneActionQuestions.find((action) => action.id === randomNumBonneAction),
      sanction: sanctionQuestions.find((sanction) => sanction.id === randomNumSanction),
    }[type];

    if (!findCard) return null;

    switch (type) {
      case "quiz":
        return <ComponentQuiz findCardQuiz={findCard as QuizProps} player={player} setPlayersChoosen={setPlayersChoosen} />;
      case "defi":
        return <ComponentDefi findCardDefi={findCard as DefiProps} player={player} setPlayersChoosen={setPlayersChoosen}/>;
      case "action":
        return <ComponentBonneAction findCardAction={findCard as BonneActionProps} player={player} setPlayersChoosen={setPlayersChoosen}/>;
      case "sanction":
        return <ComponentSanction findCardSanction={findCard as SanctionsProps} player={player} setPlayersChoosen={setPlayersChoosen}/>;
      default:
        return null;
    }
  };

  //---

  // Top
  const PlayerSpanTop: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    useEffect(() => {
      // triggers card display only if no card is already displayed.
      if (activeCard.isCardActive) return;
  
      if (player.caseNumber === 39 || player.caseNumber === 51 && activeCard.type !== "quiz") {
        setActiveCard({
          type: "quiz",
          cardData: getRandomNumber("quiz", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 42 || player.caseNumber === 54 && activeCard.type !== "defi") {
        setActiveCard({
          type: "defi",
          cardData: getRandomNumber("defi", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 45 && activeCard.type !== "action") {
        setActiveCard({
          type: "action",
          cardData: getRandomNumber("action", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 48 && activeCard.type !== "sanction") {
        setActiveCard({
          type: "sanction",
          cardData: getRandomNumber("sanction", player),
          isCardActive: true,
        });
      }
    }, [player.caseNumber, activeCard.type]);

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id}
      </div>
    )
  };

  const TopSquares: React.FC<{ caseNumber: number, playersChoosen: PlayerProps[], additionalContent: React.ReactNode }> = (
    { caseNumber, playersChoosen, additionalContent }) => (
    <div className={`squares square-top ${caseNumber === 39 ? "quiz-color" : caseNumber === 42 ? "defi-color" : caseNumber === 45  
      ? "action-color" : caseNumber === 48 ? "sanction-color" : caseNumber === 51 ? "quiz-color" : caseNumber === 54 ? "defi-color" : null}`}>
      <div className="caseNumber">
        {caseNumber}
        {playersChoosen.map((player: PlayerProps) => player.caseNumber === caseNumber 
          ? <PlayerSpanTop 
              key={player.id} 
              player={player} 
            /> : null)}
      </div>
      {additionalContent}
    </div>
  );

  // --- --- ---
  
  // Left
  const PlayerSpanLeft: React.FC<{ player: PlayerProps }> = ({ player }) => {

    useEffect(() => {
      // triggers card display only if no card is already displayed.
      if (activeCard.isCardActive) return;
  
      if (player.caseNumber === 3 && activeCard.type !== "quiz") {
        setActiveCard({
          type: "quiz",
          cardData: getRandomNumber("quiz", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 6 && activeCard.type !== "defi") {
        setActiveCard({
          type: "defi",
          cardData: getRandomNumber("defi", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 9 && activeCard.type !== "action") {
        setActiveCard({
          type: "action",
          cardData: getRandomNumber("action", player),
          isCardActive: true,
        });
      }
    }, [player.caseNumber, activeCard.type]);
  
    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id}
      </div>
    );
  };
  
  const LeftSquares: React.FC<{ caseNumber: number, playersChoosen: PlayerProps[], additionalContent: React.ReactNode }> = (
    { caseNumber, playersChoosen, additionalContent }) => (
    <div className={`squares-side squares-lside ${caseNumber === 3 ? "quiz-color" : caseNumber === 6 ? "defi-color" : caseNumber === 9 ? "action-color" : null}`}>
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
  
  // --- --- ---

  // Right
  const PlayerSpanRight: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    useEffect(() => {
      // triggers card display only if no card is already displayed.
      if (activeCard.isCardActive) return;
  
      if (player.caseNumber === 30 && activeCard.type !== "defi") {
        setActiveCard({
          type: "defi",
          cardData: getRandomNumber("defi", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 33 && activeCard.type !== "action") {
        setActiveCard({
          type: "action",
          cardData: getRandomNumber("action", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 36 && activeCard.type !== "sanction") {
        setActiveCard({
          type: "sanction",
          cardData: getRandomNumber("sanction", player),
          isCardActive: true,
        });
      }
    }, [player.caseNumber, activeCard.type]);

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id}
      </div>
    )
  };

  const RightSquares: React.FC<{ caseNumber: number, playersChoosen: PlayerProps[], additionalContent: React.ReactNode }> = (
    { caseNumber, playersChoosen, additionalContent }) => (
      <div className={`squares-side squares-rside ${caseNumber === 30 ? "defi-color" : caseNumber === 33 ? "action-color" : caseNumber === 36 
        ? "sanction-color" : null}`}>
        
        <div className="caseNumber">
          {caseNumber}
          {playersChoosen.map((player: PlayerProps) => player.caseNumber === caseNumber 
            ? <PlayerSpanRight
                key={player.id} 
                player={player}
              /> : null)}
        </div>
        {additionalContent}
      </div>
  );

  //bottom
  const PlayerSpanBottom: React.FC<{ player: PlayerProps }> = ({ player }) => {
    
    useEffect(() => {
      // triggers card display only if no card is already displayed.
      if (activeCard.isCardActive) return;
  
      if (player.caseNumber === 18 && activeCard.type !== "defi") {
        setActiveCard({
          type: "defi",
          cardData: getRandomNumber("defi", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 21 && activeCard.type !== "action") {
        setActiveCard({
          type: "action",
          cardData: getRandomNumber("action", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 15 || player.caseNumber === 27 && activeCard.type !== "quiz") {
        setActiveCard({
          type: "quiz",
          cardData: getRandomNumber("quiz", player),
          isCardActive: true,
        });
      } else if (player.caseNumber === 12 || player.caseNumber === 24 && activeCard.type !== "sanction") {
        setActiveCard({
          type: "sanction",
          cardData: getRandomNumber("sanction", player),
          isCardActive: true,
        });
      }
    }, [player.caseNumber, activeCard.type]);

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id}
      </div>
    )
  };

  const BottomSquares: React.FC<{ caseNumber: number, playersChoosen: PlayerProps[], additionalContent: React.ReactNode }> = (
    { caseNumber, playersChoosen, additionalContent }) => (
    <div className={`squares square-bottom ${caseNumber === 12 ? "sanction-color" : caseNumber === 15 ? "quiz-color" : caseNumber === 18 
        ? "defi-color" : caseNumber === 21 ? "action-color" : caseNumber === 24 ? "sanction-color" : caseNumber === 27 ? "quiz-color" : null}`}>
        
        <div className="caseNumber">
        {caseNumber}
        {playersChoosen.map((player: PlayerProps) => player.caseNumber === caseNumber 
          ? <PlayerSpanBottom 
              key={player.id} 
              player={player}
            /> : null)}
        </div>
        {additionalContent}
    </div>
  );

  return (
    <div className='frame'>

      <NbrOfPlayers nbPlayer={nbPlayer} setNbPlayer={setNbPlayer} />

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

          return <TopSquares key={caseNumber} caseNumber={caseNumber} playersChoosen={playersChoosen} additionalContent={additionalContent} />;
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

            return <LeftSquares key={caseNumber} caseNumber={caseNumber} playersChoosen={playersChoosen} additionalContent={additionalContent} />;
          })}
        </div>

        <div className="container-cards">

          <div className="div-bgImg">
            <img src={natureImg} width={1920} height={1080} alt="img nature" className="bg-img" />
          </div>
          
          <div className='cards-box cards-box-left'>
            
            <div className="card card-one">Defis</div>

            <div className="div-jeudesociete">
              <h2>JEU DE SOCIETE</h2>
              <img src={mascotte} width={564} height={564} alt="img mascotte" className="mascotte-img" />
            </div>

            <div className="card card-two">Quiz</div>
          
          </div>
          
          {activeCard.cardData && (
            <div className="overlay">
              {React.cloneElement(activeCard.cardData, { setActiveCard })}
            </div>
          )}

          <div className="div-dice">
            <Dices 
              value={value} 
              setValue={setValue} 
              setCount={setCount}

              nbPlayer={nbPlayer}
              playersChoosen={playersChoosen}
              setPlayersChoosen={setPlayersChoosen}

              setCountPlayerOne={setCountPlayerOne}
              setCountPlayerTwo={setCountPlayerTwo}
              setCountPlayerThree={setCountPlayerThree}
              setCountPlayerFour={setCountPlayerFour}
              setCountPlayerFive={setCountPlayerFive}
              setCountPlayerSix={setCountPlayerSix}

              activePlayerId={activePlayerId}
              setActivePlayerId={setActivePlayerId}
              setActiveCard={setActiveCard}
            />
          </div>

          <div className='cards-box cards-box-right'>
          
            <div className="card card-three">Sanctions</div>
            
            <div className="div-monecopote">
              <h2>MON ECO POTE</h2>
              <img src={myEcoBest} width={564} height={564} alt="img myecobestfriend" className="myecobestfriend-img" />
            </div>

            <div className="card card-four">Bonnes Actions</div>

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

            return <RightSquares key={caseNumber} caseNumber={caseNumber} playersChoosen={playersChoosen} additionalContent={additionalContent} />;
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

          return <BottomSquares key={caseNumber} caseNumber={caseNumber} playersChoosen={playersChoosen} additionalContent={additionalContent} />;
        })}

      </div>

    </div>
  )
};

export default App;