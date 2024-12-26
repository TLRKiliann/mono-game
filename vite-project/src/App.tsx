import type { DisplayCloseProps, PlayerProps } from "./lib/types";
import React, { useEffect, useState } from "react";
import FullScreen from "./components/FullScreen";
import TranslationComponent from "./components/TranslationComponent";
import RulesComponent from "./components/RulesComponent";
import NbrOfPlayers from "./components/NbrOfPlayers";
import NbrOfLapComponent from "./components/NbrOfLapComponent";
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

  // hide/display boxes before game start
  const [displayCloseBox, setDisplayCloseBox] = useState<DisplayCloseProps>({
    closeFullScreen: true,
    viewRules: true,
    closeNbrOfPlayers: true,
    closeNbrOfLap: true,
    closeReady: true
  });

  // for translation
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

  // derivated state
  const derivatedStatePlayers: PlayerProps[] = players;

  useEffect(() => {
    setPlayersChoosen(derivatedStatePlayers.slice(0, nbPlayer));
  }, [nbPlayer]);

  useEffect(() => {
    setNbrOfLap(nbrOfLap);
  }, [nbrOfLap])

  const [activeCard, setActiveCard] = useState<{
    type: 'quiz' | 'defi' | 'action' | 'sanction' | null;
    cardData: JSX.Element | null;
    isCardActive: boolean;
  }>({ type: null, cardData: null, isCardActive: false });
  
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

      <SquaresOfTop 
        playersChoosen={playersChoosen}
        setPlayersChoosen={setPlayersChoosen}
        setReplay={setReplay}
        activeCard={activeCard} 
        setActiveCard={setActiveCard} 
        activePlayerId={activePlayerId} 
        selectedOption={selectedOption} 
      />

      <div className="middle-frames">

        <SquaresOfLeft 
          playersChoosen={playersChoosen}
          setPlayersChoosen={setPlayersChoosen}
          setReplay={setReplay}
          activeCard={activeCard} 
          setActiveCard={setActiveCard} 
          activePlayerId={activePlayerId} 
          selectedOption={selectedOption} 
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
                ? "Numero di giri : " + nbrOfLap : null}
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
        
        <SquaresOfRight 
          playersChoosen={playersChoosen}
          setPlayersChoosen={setPlayersChoosen}
          setReplay={setReplay}
          activeCard={activeCard} 
          setActiveCard={setActiveCard} 
          activePlayerId={activePlayerId} 
          selectedOption={selectedOption} 
        />

      </div>
      
      <SquaresOfBottom 
          playersChoosen={playersChoosen}
          setPlayersChoosen={setPlayersChoosen}
          setReplay={setReplay}
          activeCard={activeCard} 
          setActiveCard={setActiveCard} 
          activePlayerId={activePlayerId} 
          selectedOption={selectedOption} 
      />

    </div>
  )
};

export default App;