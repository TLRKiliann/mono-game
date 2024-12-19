import type { BonneActionProps, DefiProps, DisplayCloseProps, PlayerProps, QuizProps, SanctionsProps } from "./lib/types";
import React, { useEffect, useState } from "react";
import FullScreen from "./components/FullScreen";
import TranslationComponent from "./components/TranslationComponent";
import RulesComponent from "./components/RulesComponent";
import NbrOfPlayers from "./components/NbrOfPlayers";
import NbrOfLapComponent from "./components/NbrOfLapComponent";
import ReadyComponent from "./components/ReadyComponent";
import Dice from "./components/Dice";
import { quizQuestions_fr } from "./lib/quiz_fr";
import { quizQuestions_en } from "./lib/quiz_en";
import { quizQuestions_de } from "./lib/quiz_de";
import { quizQuestions_it } from "./lib/quiz_it";
import { defiQuestions_fr } from "./lib/defi_fr";
import { defiQuestions_en } from "./lib/defi_en";
import { defiQuestions_de } from "./lib/defi_de";
import { defiQuestions_it } from "./lib/defi_it";
import { bonneActionQuestions_fr } from "./lib/bonnes-actions_fr";
import { bonneActionQuestions_en } from "./lib/bonnes-actions_en";
import { bonneActionQuestions_de } from "./lib/bonnes-actions_de";
import { bonneActionQuestions_it } from "./lib/bonnes-actions_it";
import { sanctionQuestions_fr } from "./lib/sanctions_fr";
import { sanctionQuestions_en } from "./lib/sanctions_en";
import { sanctionQuestions_de } from "./lib/sanctions_de";
import { sanctionQuestions_it } from "./lib/sanctions_it";
import ComponentQuiz from "./components/ComponentQuiz";
import ComponentDefi from "./components/ComponentDefi";
import ComponentBonneAction from "./components/ComponentBonneAction";
import ComponentSanction from "./components/ComponentSanction";
import AudioPlayer from "./components/AudioPlayer";
import { FaChessPawn } from "react-icons/fa6";
import natureImg from "./assets/nature_1.jpg"
import mascotte from "./assets/mascotte-resize.png";
import myEcoBest from "./assets/myecobestfriend-logo.png";

import './App.css';

function App(): JSX.Element {

  // hide/display boxes before game start
  const [displayCloseBox, setDisplayCloseBox] = useState<DisplayCloseProps>({
    closeFullScreen: true,
    viewRules: true,
    closeNbrOfPlayers: true,
    closeNbrOfLap: true,
    closeReady: true
  });

  // languages choosen
  //const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  // count nbre of case by player
  const [count, setCount] = useState<number>(0);

  // display value of dice
  const [value, setValue] = useState<number>(1);

  // all players start at square 0
  const [, setCountPlayerOne] = useState<number>(0);
  const [, setCountPlayerTwo] = useState<number>(0);
  const [, setCountPlayerThree] = useState<number>(0);
  const [, setCountPlayerFour] = useState<number>(0);
  const [, setCountPlayerFive] = useState<number>(0);
  const [, setCountPlayerSix] = useState<number>(0);
  
  // counter by player after throwing dice
  const [activePlayerId, setActivePlayerId] = useState<number>(1);
  
  // choose nbr of lap for the game
  const [nbrOfLap, setNbrOfLap] = useState<number>(1);

  // choose players number at the begining of game
  const [nbPlayer, setNbPlayer] = useState<number>(2);

  // player is able to replay
  const [replay, setReplay] = useState<boolean>(false);

  // allows to define number of players
  const [playersChoosen, setPlayersChoosen] = useState<PlayerProps[]>([]);

  // initial players state
  const [players] = useState<PlayerProps[]>([
    {
      id: 1,
      name: "Player 1",
      color: "#A2D2DF",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={16} />
    },
    {
      id: 2,
      name: "Player 2",
      color: "#dcbbdb",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={16} />
    },
    {
      id: 3,
      name: "Player 3",
      color: "#ffb2ae",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={16} />
    },
    {
      id: 4,
      name: "Player 4",
      color: "#cac7ff",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={16} />
    },
    {
      id: 5,
      name: "Player 5",
      color: "#fefee3",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={16} />
    },
    {
      id: 6,
      name: "Player 6",
      color: "#A7D477",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={16} />
    }
  ]);

  //---
  // define number of players to start & nbr of lap for the game.

  // derivated state
  const derivatedStatePlayers: PlayerProps[] = players;

  useEffect(() => {
    setPlayersChoosen(derivatedStatePlayers.slice(0, nbPlayer));
  }, [nbPlayer]);

  useEffect(() => {
    setNbrOfLap(nbrOfLap);
  }, [nbrOfLap])

  //---

  // open card for corresponding player & square
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

    let findCard: any = null;

    if (selectedOption === "français") {
      findCard = {
        quiz: quizQuestions_fr.find((quiz) => quiz.id === randomNumQuiz),
        defi: defiQuestions_fr.find((defi) => defi.id === randomNumDefi),
        action: bonneActionQuestions_fr.find((action) => action.id === randomNumBonneAction),
        sanction: sanctionQuestions_fr.find((sanction) => sanction.id === randomNumSanction),
      }[type];
    } else if (selectedOption === "english") {
      findCard = {
        quiz: quizQuestions_en.find((quiz) => quiz.id === randomNumQuiz),
        defi: defiQuestions_en.find((defi) => defi.id === randomNumDefi),
        action: bonneActionQuestions_en.find((action) => action.id === randomNumBonneAction),
        sanction: sanctionQuestions_en.find((sanction) => sanction.id === randomNumSanction),
      }[type];
    } else if (selectedOption === "deutsch") {
      findCard = {
        quiz: quizQuestions_de.find((quiz) => quiz.id === randomNumQuiz),
        defi: defiQuestions_de.find((defi) => defi.id === randomNumDefi),
        action: bonneActionQuestions_de.find((action) => action.id === randomNumBonneAction),
        sanction: sanctionQuestions_de.find((sanction) => sanction.id === randomNumSanction),
      }[type];
    } else if (selectedOption === "italiano") {
      findCard = {
        quiz: quizQuestions_it.find((quiz) => quiz.id === randomNumQuiz),
        defi: defiQuestions_it.find((defi) => defi.id === randomNumDefi),
        action: bonneActionQuestions_it.find((action) => action.id === randomNumBonneAction),
        sanction: sanctionQuestions_it.find((sanction) => sanction.id === randomNumSanction),
      }[type];
    }

    if (!findCard) return null;

    switch (type) {
      case "quiz":
        return (
          <ComponentQuiz 
            findCardQuiz={findCard as QuizProps}
            player={player}
            setPlayersChoosen={setPlayersChoosen}
            setReplay={setReplay}
            selectedOption={selectedOption} 
          />
        );
      case "defi":
        return (
          <ComponentDefi
            findCardDefi={findCard as DefiProps}
            player={player}
            setPlayersChoosen={setPlayersChoosen}
            setReplay={setReplay}
            selectedOption={selectedOption}
          />
        );
      case "action":
        return (
          <ComponentBonneAction 
            findCardAction={findCard as BonneActionProps}
            player={player}
            setPlayersChoosen={setPlayersChoosen}
            selectedOption={selectedOption}
          />
        );
      case "sanction":
        return (
          <ComponentSanction 
            findCardSanction={findCard as SanctionsProps}
            player={player}
            setPlayersChoosen={setPlayersChoosen}
            setReplay={setReplay}
            selectedOption={selectedOption} 
          />
        );
      default:
        return null;
    }
  };

  // --- --- ---

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
      <div style={{
        background: player.color,
        width: activePlayerId === player.id ? "36px" : "24px",
        height: activePlayerId === player.id ? "36px" : "24px"}} 
        className="span-pawn"
      >
        {player.id} {player.icon}
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
      <div style={{
        background: player.color,
        width: activePlayerId === player.id ? "36px" : "24px",
        height: activePlayerId === player.id ? "36px" : "24px"}} 
        className="span-pawn"
      >
        {player.id} {player.icon}
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
      <div style={{
        background: player.color,
        width: activePlayerId === player.id ? "36px" : "24px",
        height: activePlayerId === player.id ? "36px" : "24px"}} 
        className="span-pawn"
      >
        {player.id} {player.icon}
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

  // --- --- ---

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
      <div style={{
        background: player.color,
        width: activePlayerId === player.id ? "36px" : "24px",
        height: activePlayerId === player.id ? "36px" : "24px"}} 
        className="span-pawn"
      >
        {player.id} {player.icon}
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
              /> 
            : null
          )}
        </div>
        {additionalContent}
    </div>
  );

  //console.log(nbrOfLap, "nbr of lap");

  return (
    <div className='frame'>

      <AudioPlayer />

      {displayCloseBox.closeFullScreen === true ? (
        <FullScreen setDisplayCloseBox={setDisplayCloseBox} />
        ) : null
      }

      {selectedOption === "" && displayCloseBox.closeFullScreen === false ? (
        <TranslationComponent setSelectedOption={setSelectedOption} />
        ) : null
      }

      {selectedOption !== "" && displayCloseBox.viewRules === true ? (
        <RulesComponent selectedOption={selectedOption} setDisplayCloseBox={setDisplayCloseBox} />
        ) : null
      }

      {displayCloseBox.viewRules === false && displayCloseBox.closeNbrOfPlayers === true ? (
        <NbrOfPlayers 
          selectedOption={selectedOption} 
          setDisplayCloseBox={setDisplayCloseBox} 
          nbPlayer={nbPlayer} 
          setNbPlayer={setNbPlayer} 
        />
        ) : null
      }

      {displayCloseBox.closeNbrOfPlayers === false && displayCloseBox.closeNbrOfLap === true ? (
        <NbrOfLapComponent 
          selectedOption={selectedOption}
          setDisplayCloseBox={setDisplayCloseBox} 
          nbrOfLap={nbrOfLap} 
          setNbrOfLap={setNbrOfLap}
        />
        ) : null
      }

      {displayCloseBox.closeNbrOfLap === false && displayCloseBox.closeReady === true ? (
        <ReadyComponent setDisplayCloseBox={setDisplayCloseBox} selectedOption={selectedOption} />
      ) : null}

      <div className='top-frame'>

        <div className='first-squares square-top'>
          
          <p className="first-squares-pone">0</p>
        
          <p className="first-squares-ptwo">Start</p>

          <div className="span-pawn-firstcase">{playersChoosen.map((players: PlayerProps) => {
            if (players.caseNumber === 0) return (
              <p key={players.id} style={{ background: players.color }} className="span-pawn">
                {players.id} {players.icon}
              </p>
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

            return <LeftSquares key={caseNumber} caseNumber={caseNumber} playersChoosen={playersChoosen} additionalContent={additionalContent} />;
          })}
        </div>

        <div className="container-cards">

          <div className="div-bgImg">
            <img src={natureImg} width={1920} height={1080} alt="img nature" className="bg-img" />
          </div>

          <div className="number-laps">
            <h2>
              {selectedOption === "français" 
                ? "Nombre de tour : " + nbrOfLap : selectedOption === "english" 
                ? "Number of laps : " + nbrOfLap : selectedOption === "deutsch" 
                ? "Rundenzahl : " + nbrOfLap : "Numero di giri : " + nbrOfLap
              }
            </h2>
          </div>
          
          <div className='cards-box cards-box-left'>
            
            <div className="card card-one">{selectedOption === "français" ? "Défi"
                  : selectedOption === "english" ? "Challenges" 
                  : selectedOption === "deutsch" ? "Herausforderungen" 
                  : selectedOption === "italiano" ? "Sfide" : null}</div>

            <div className="div-jeudesociete">
              <h2>
                {selectedOption === "français" ? "JEU DE SOCIETE"
                  : selectedOption === "english" ? "BOARD GAME" 
                  : selectedOption === "deutsch" ? "BRETTSPIEL" 
                  : selectedOption === "italiano" ? "GIOCO DA TAVOLO" : null}
              </h2>
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
            <Dice
              value={value} 
              setValue={setValue} 
              setCount={setCount}
              replay={replay}
              setReplay={setReplay}
              nbPlayer={nbPlayer}
              nbrOfLap={nbrOfLap}
              selectedOption={selectedOption}
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
          
            <div className="card card-three">{selectedOption === "français" ? "Sanction" 
                : selectedOption === "english" ? "Sanction" 
                : selectedOption === "deutsch" ? "Sanktion" 
                : selectedOption === "italiano" ? "sanzione" : null}</div>
            
            <div className="div-monecopote">
              <h2>
                {selectedOption === "français" ? "MON ECO POTE"
                  : selectedOption === "english" ? "MY ECO FRIEND" 
                  : selectedOption === "deutsch" ? "MEIN ÖKO-FREUND" 
                  : selectedOption === "italiano" ? "IL MIO AMICO ECOLOGICO" : null}        
                </h2>
              <img src={myEcoBest} width={564} height={564} alt="img myecobestfriend" className="myecobestfriend-img" />
            </div>

            <div className="card card-four">{selectedOption === "français" ? "Bonne Action"
                : selectedOption === "english" ? "Good Deed" 
                : selectedOption === "deutsch" ? "Gute Tat" 
                : selectedOption === "italiano" ? "Buona Azione" : null}</div>
          </div>

        </div>

        <div className='right-frame'>
          {Array.from({ length: 10 }, (_, index) => {
            const caseNumber = 38 - index;
            let additionalContent;

            switch (caseNumber) {
              case 30:
                additionalContent = <h4>{selectedOption === "français" ? "Défi"
                  : selectedOption === "english" ? "Challenges" 
                  : selectedOption === "deutsch" ? "Herausforderungen" 
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
                : selectedOption === "deutsch" ? "Herausforderungen" 
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

          return <BottomSquares key={caseNumber} caseNumber={caseNumber} playersChoosen={playersChoosen} additionalContent={additionalContent} />;
        })}

      </div>

    </div>
  )
};

export default App;