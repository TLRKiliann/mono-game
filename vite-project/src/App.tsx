import type { ActiveCardState, DisplayCloseProps, PlayerProps } from "./lib/types";
import React, { useEffect, useState } from "react";
import FullScreen from "./components/FullScreen";
import TranslationComponent from "./components/TranslationComponent";
import RulesComponent from "./components/RulesComponent";
import NbrOfPlayers from "./components/NbrOfPlayers";
import NbrOfLapComponent from "./components/NbrOfLapComponent";
import LvlQuizDefi from "./components/LvlQuizDefi";
import ReadyComponent from "./components/ReadyComponent";
import SquaresOfTop from "./components/SquaresOfTop";
import SquaresOfLeft from "./components/SquaresOfLeft";
import SquaresOfRight from "./components/SquaresOfRight";
import SquaresOfBottom from "./components/SquaresOfBottom";
import Dice from "./components/Dice";
import AudioPlayer from "./components/AudioPlayer";
import { FaChessPawn } from "react-icons/fa6";
import natureImg from "./assets/nature_1.jpg";
import mascotte from "./assets/mascotte-resize.png";
import myEcoBest from "./assets/myecobestfriend-logo.png";
import './App.css';

function App(): JSX.Element {

  // hide/display boxes before game start (all states together)
  const [displayCloseBox, setDisplayCloseBox] = useState<DisplayCloseProps>({
    closeFullScreen: true,
    viewRules: true,
    closeNbrOfPlayers: true,
    closeNbrOfLap: true,
    closeLvl: true,
    closeReady: true
  });

  // state for translation
  const [selectedOption, setSelectedOption] = useState<string>("");

  // count nbr of case by player
  const [count, setCount] = useState<number>(0);

  // all players start at square 0
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

  // choose nbr of lap for the game
  const [nbrOfLap, setNbrOfLap] = useState<number>(1);

  // choose lvl for quiz & defi
  const [lvlQuiz, setLvlQuiz] = useState<string>("enfants");

  // player is able to replay
  const [replay, setReplay] = useState<boolean>(false);

  // initial players state (use the state count)
  const [players] = useState<PlayerProps[]>([
    {
      id: 1,
      name: "Player 1",
      bgColor: "#ffc6b1",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={40} className="pawn-player-1" />
    },
    {
      id: 2,
      name: "Player 2",
      bgColor: "#ffff9d",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={40} className="pawn-player-2" />
    },
    {
      id: 3,
      name: "Player 3",
      bgColor: "#dbffa5",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={40} className="pawn-player-3" />
    },
    {
      id: 4,
      name: "Player 4",
      bgColor: "#f7c5f7",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={40} className="pawn-player-4" />
    },
    {
      id: 5,
      name: "Player 5",
      bgColor: "#c1dada",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={40} className="pawn-player-5" />
    },
    {
      id: 6,
      name: "Player 6",
      bgColor: "#bbddff",
      caseNumber: count,
      lap: 0,
      gameOver: false,
      caseQuiz: false,
      joker: false,
      icon: <FaChessPawn size={40} className="pawn-player-6" />
    }
  ]);

  // allows to define number of players
  const [playersChoosen, setPlayersChoosen] = useState<PlayerProps[]>([]);

  // derivated state
  const derivatedStatePlayers: PlayerProps[] = players;

  useEffect(() => {
    setPlayersChoosen(derivatedStatePlayers.slice(0, nbPlayer));
  }, [nbPlayer]);

  const [activeCard, setActiveCard] = useState<ActiveCardState>({ 
    type: null, 
    cardData: null, 
    isCardActive: false
  });

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
          nbPlayer={nbPlayer}
          setNbPlayer={setNbPlayer}
          setDisplayCloseBox={setDisplayCloseBox} 
        />
        ) : null
      }

      {displayCloseBox.closeNbrOfPlayers === false && displayCloseBox.closeNbrOfLap === true ? (
        <NbrOfLapComponent 
          selectedOption={selectedOption}
          nbrOfLap={nbrOfLap} 
          setNbrOfLap={setNbrOfLap}
          setDisplayCloseBox={setDisplayCloseBox} 
        />
        ) : null
      }

      {displayCloseBox.closeNbrOfLap === false && displayCloseBox.closeLvl === true ? (
        <LvlQuizDefi 
          selectedOption={selectedOption}
          setLvlQuiz={setLvlQuiz}
          setDisplayCloseBox={setDisplayCloseBox}
        />
        ) : null
      }

      {displayCloseBox.closeLvl === false && displayCloseBox.closeReady === true ? (
        <ReadyComponent selectedOption={selectedOption} setDisplayCloseBox={setDisplayCloseBox} />
      ) : null}

      <SquaresOfTop 
        selectedOption={selectedOption} 
        playersChoosen={playersChoosen}
        setPlayersChoosen={setPlayersChoosen}
        activeCard={activeCard} 
        setActiveCard={setActiveCard} 
        activePlayerId={activePlayerId} 
        setReplay={setReplay}
        lvlQuiz={lvlQuiz}
      />

      <div className="middle-frames">

        <SquaresOfLeft 
          selectedOption={selectedOption}
          playersChoosen={playersChoosen}
          setPlayersChoosen={setPlayersChoosen}
          activeCard={activeCard} 
          setActiveCard={setActiveCard} 
          activePlayerId={activePlayerId} 
          setReplay={setReplay}
          lvlQuiz={lvlQuiz}
        />

        <div className="container-cards">

          <div className="div-bgImg">
            <img src={natureImg} width={1920} height={1080} alt="img nature" className="bg-img" />
          </div>

          <div className="number-laps">
            <h2>
              {selectedOption === "français" 
                ? "Nombre de tour : " + nbrOfLap : selectedOption === "english" 
                ? "Number of laps : " + nbrOfLap : selectedOption === "deutsch" 
                ? "Rundenzahl : " + nbrOfLap : selectedOption === "italiano" 
                ? "Numero di giri : " + nbrOfLap 
                : null
              }
            </h2>

            {playersChoosen.slice(0, 1).map((playerRound: PlayerProps) => playerRound.lap <= nbrOfLap ? (
              <h3 key={playerRound.id}>
                {selectedOption === "français" ? "(Tour actuel : " + playerRound.lap + ")" 
                  : selectedOption === "english" ? "(Current round : " + playerRound.lap + ")"  
                  : selectedOption === "deutsch" ? "(Aktuelle Tour : " + playerRound.lap + ")" 
                  : selectedOption === "italiano" ? "(Tour attuale : " + playerRound.lap + ")" 
                  : null
                }
              </h3>
              ) : null
            )}
          
          </div>

          <div className="number-lvl">
            <h2>
              Level:&nbsp;
              {selectedOption === "français" ? lvlQuiz 
                : selectedOption === "english" ? lvlQuiz === "adultes" ? "adults" : "children"
                : selectedOption === "deutsch" ? lvlQuiz === "adultes" ? "Erwachsene" : "Kinder"
                : selectedOption === "italiano" ? lvlQuiz === "adultes" ? "adulti" : "bambini"
                : null
              }
            </h2>
          </div>
          
          <div className='cards-box cards-box-left'>
            
            <div className="card card-one">
              {selectedOption === "français" ? "Défi"
                : selectedOption === "english" ? "Challenges" 
                : selectedOption === "deutsch" ? "Aufgabe" 
                : selectedOption === "italiano" ? "Sfide" 
                : null
              }
            </div>

            <div className="div-jeudesociete">
              <h2>
                {selectedOption === "français" ? "JEU DE SOCIETE"
                  : selectedOption === "english" ? "BOARD GAME" 
                  : selectedOption === "deutsch" ? "BRETTSPIEL" 
                  : selectedOption === "italiano" ? "GIOCO DA TAVOLO" 
                  : null
                }
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
              selectedOption={selectedOption}
              nbPlayer={nbPlayer}
              nbrOfLap={nbrOfLap}
              playersChoosen={playersChoosen}
              setPlayersChoosen={setPlayersChoosen}
              replay={replay}
              setReplay={setReplay}
              setCount={setCount}
              activePlayerId={activePlayerId}
              setActivePlayerId={setActivePlayerId}
              setCountPlayerOne={setCountPlayerOne}
              setCountPlayerTwo={setCountPlayerTwo}
              setCountPlayerThree={setCountPlayerThree}
              setCountPlayerFour={setCountPlayerFour}
              setCountPlayerFive={setCountPlayerFive}
              setCountPlayerSix={setCountPlayerSix}
              setActiveCard={setActiveCard}
            />
          </div>

          <div className='cards-box cards-box-right'>
          
            <div className="card card-three">
              {selectedOption === "français" ? "Sanction" 
                : selectedOption === "english" ? "Sanction" 
                : selectedOption === "deutsch" ? "Sanktion" 
                : selectedOption === "italiano" ? "sanzione" 
                : null
              }
            </div>
            
            <div className="div-monecopote">
              <h2>
                {selectedOption === "français" ? "MON ECO POTE"
                  : selectedOption === "english" ? "MY ECO FRIEND" 
                  : selectedOption === "deutsch" ? "MEIN ÖKO-FREUND" 
                  : selectedOption === "italiano" ? "IL MIO AMICO ECOLOGICO" 
                  : null
                }        
                </h2>
              <img src={myEcoBest} width={564} height={564} alt="img myecobestfriend" className="myecobestfriend-img" />
            </div>

            <div className="card card-four">
              {selectedOption === "français" ? "Bonne Action"
                : selectedOption === "english" ? "Good Deed" 
                : selectedOption === "deutsch" ? "Gute Tat" 
                : selectedOption === "italiano" ? "Buona Azione" 
                : null
              }
            </div>
          </div>

        </div>
        
        <SquaresOfRight 
          selectedOption={selectedOption}
          playersChoosen={playersChoosen}
          setPlayersChoosen={setPlayersChoosen}
          activeCard={activeCard} 
          setActiveCard={setActiveCard} 
          activePlayerId={activePlayerId} 
          setReplay={setReplay}
          lvlQuiz={lvlQuiz}
        />

      </div>
      
      <SquaresOfBottom 
        selectedOption={selectedOption}
        playersChoosen={playersChoosen}
        setPlayersChoosen={setPlayersChoosen}
        activeCard={activeCard} 
        setActiveCard={setActiveCard} 
        activePlayerId={activePlayerId} 
        setReplay={setReplay}
        lvlQuiz={lvlQuiz}
      />

    </div>
  )
};

export default App;