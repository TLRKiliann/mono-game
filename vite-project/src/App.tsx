import type { OrderProps, PlayerProps, QuizProps } from "./lib/types";
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
import React from "react";

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
      caseNumber: count > 55 ? (count - 55) : count,
      caseQuiz: false
    },
    {
      id: 2,
      name: "Player two",
      color: "yellow",
      caseNumber: count > 55 ? (count - 55) : count,
      caseQuiz: false
    },
    {
      id: 3,
      name: "Player three",
      color: "red",
      caseNumber: count > 55 ? (count - 55) : count,
      caseQuiz: false
    },
    {
      id: 4,
      name: "Player four",
      color: "violet",
      caseNumber: count > 55 ? (count - 55) : count,
      caseQuiz: false
    },
    {
      id: 5,
      name: "Player five",
      color: "orange",
      caseNumber: count > 55 ? (count - 55) : count,
      caseQuiz: false
    },
    {
      id: 6,
      name: "Player six",
      color: "green",
      caseNumber: count > 55 ? (count - 55) : count,
      caseQuiz: false
    }
  ]);

  //---

  const [activeCard, setActiveCard] = useState<{
    type: 'quiz' | 'defi' | 'action' | 'sanction' | null;
    cardData: JSX.Element | null;
    isCardActive: boolean;
  }>({ type: null, cardData: null, isCardActive: false });
  
  const getRandomNumber = (type: string) => {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const findCard = {
      quiz: quizQuestions.find((quiz) => quiz.id === randomNum),
      defi: defiQuestions.find((defi) => defi.id === randomNum),
      action: bonneActionOrder.find((action) => action.id === randomNum),
      sanction: sanctionOrder.find((sanction) => sanction.id === randomNum),
    }[type];

    if (!findCard) return null;

    switch (type) {
      case "quiz":
        return <ComponentQuiz findCardQuiz={findCard as QuizProps} />;
      case "defi":
        return <ComponentDefi findCardDefi={findCard as QuizProps} />;
      case "action":
        return <ComponentBonneAction findCardAction={findCard as OrderProps} />;
      case "sanction":
        return <ComponentSanction findCardSanction={findCard as OrderProps} />;
      default:
        return null;
    }
  };

  //---

  // Top
  const PlayerSpanTop: React.FC<{ player: PlayerProps }> = ({ player }) => {
    

    useEffect(() => {
      // Ne déclencher l'affichage de la carte que si aucune carte n'est déjà active
      if (activeCard.isCardActive) return;
  
      if (player.caseNumber === 39 || player.caseNumber === 51 && activeCard.type !== "quiz") {
        setActiveCard({
          type: "quiz",
          cardData: getRandomNumber("quiz"),
          isCardActive: true, // On marque la carte comme active
        });
      } else if (player.caseNumber === 42 || player.caseNumber === 54 && activeCard.type !== "defi") {
        setActiveCard({
          type: "defi",
          cardData: getRandomNumber("defi"),
          isCardActive: true,
        });
      } else if (player.caseNumber === 45 && activeCard.type !== "action") {
        setActiveCard({
          type: "action",
          cardData: getRandomNumber("action"),
          isCardActive: true,
        });
      } else if (player.caseNumber === 48 && activeCard.type !== "sanction") {
        setActiveCard({
          type: "sanction",
          cardData: getRandomNumber("sanction"),
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
    // Fonction de fermeture de la carte, ajout du verrou pour éviter la boucle infinie

    useEffect(() => {
      // Ne déclencher l'affichage de la carte que si aucune carte n'est déjà active
      if (activeCard.isCardActive) return;
  
      if (player.caseNumber === 3 && activeCard.type !== "quiz") {
        setActiveCard({
          type: "quiz",
          cardData: getRandomNumber("quiz"),
          isCardActive: true, // On marque la carte comme active
        });
      } else if (player.caseNumber === 6 && activeCard.type !== "defi") {
        setActiveCard({
          type: "defi",
          cardData: getRandomNumber("defi"),
          isCardActive: true,
        });
      } else if (player.caseNumber === 9 && activeCard.type !== "action") {
        setActiveCard({
          type: "action",
          cardData: getRandomNumber("action"),
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
  
  const LeftSquares: React.FC<{ caseNumber: number, players: PlayerProps[], additionalContent: React.ReactNode }> = (
    { caseNumber, players, additionalContent }) => (
    <div className={`squares-side squares-lside ${caseNumber === 3 ? "quiz-color" : caseNumber === 6 ? "defi-color" : caseNumber === 9 ? "action-color" : null}`}>
        <div className="caseNumber">
          {caseNumber}
          {players.map((player: PlayerProps) => player.caseNumber === caseNumber 
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
      // Ne déclencher l'affichage de la carte que si aucune carte n'est déjà active
      if (activeCard.isCardActive) return;
  
      if (player.caseNumber === 30 && activeCard.type !== "defi") {
        setActiveCard({
          type: "defi",
          cardData: getRandomNumber("defi"),
          isCardActive: true,
        });
      } else if (player.caseNumber === 33 && activeCard.type !== "action") {
        setActiveCard({
          type: "action",
          cardData: getRandomNumber("action"),
          isCardActive: true,
        });
      } else if (player.caseNumber === 36 && activeCard.type !== "sanction") {
        setActiveCard({
          type: "sanction",
          cardData: getRandomNumber("sanction"),
          isCardActive: true, // On marque la carte comme active
        });
      }
    }, [player.caseNumber, activeCard.type]);

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id}
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
    

    useEffect(() => {
      // Ne déclencher l'affichage de la carte que si aucune carte n'est déjà active
      if (activeCard.isCardActive) return;
  
      if (player.caseNumber === 18 && activeCard.type !== "defi") {
        setActiveCard({
          type: "defi",
          cardData: getRandomNumber("defi"),
          isCardActive: true,
        });
      } else if (player.caseNumber === 21 && activeCard.type !== "action") {
        setActiveCard({
          type: "action",
          cardData: getRandomNumber("action"),
          isCardActive: true,
        });
      } else if (player.caseNumber === 15 || player.caseNumber === 27 && activeCard.type !== "quiz") {
        setActiveCard({
          type: "quiz",
          cardData: getRandomNumber("quiz"),
          isCardActive: true,
        });
      } else if (player.caseNumber === 12 || player.caseNumber === 24 && activeCard.type !== "sanction") {
        setActiveCard({
          type: "sanction",
          cardData: getRandomNumber("sanction"),
          isCardActive: true, // On marque la carte comme active
        });
      }
    }, [player.caseNumber, activeCard.type]);

    return (
      <div style={{ background: player.color }} className="span-pawn">
        {player.id}
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