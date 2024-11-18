import type { PlayerProps } from "./lib/type";
import { useState } from "react";
import Dices from "./components/Dices";
import mascotte from "./assets/mascotte-resize.png";
import myEcoBest from "./assets/myecobestfriend-logo.png";
import TopSquares from "./components/TopSquares";
import LeftSquares from "./components/LeftSquares";
import RightSquares from "./components/RightSquares";
import BottomSquares from "./components/BottomSquares";
import './App.css';



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