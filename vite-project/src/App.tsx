import { useState } from "react";
import Dices from "./components/Dices";
import { quizQuestions, defiQuestions, sanctionOrder, bonneActionOrder } from './lib/questions';
import ComponentQuiz from "./components/ComponentQuiz";
import ComponentDefi from "./components/ComponentDefi";
import ComponentBonneAction from './components/ComponentBonneAction';
import ComponentSanction from './components/ComponentSanction';
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

type PlayerProps = {
  id: number;
  name: string;
  color: string;
  caseNumber: number;
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
  
  // for handleClick btn
  const [onShow, setOnShow] = useState<boolean>(true);

  //quiz questions for cards
  /* const quizQuestionsMap = quizQuestions.map((quiz: QuizProps) => quiz.id + " " + quiz.ask + " " + quiz.answer);
  console.log(quizQuestionsMap, "quizQuestionsMap"); */

  // simulation user's data from db
  const [players, setPlayers] = useState<PlayerProps[]>([
    {
      id: 1,
      name: "Player one",
      color: "lightblue",
      caseNumber: count
    },
    {
      id: 2,
      name: "Player two",
      color: "yellow",
      caseNumber: count
    },
    {
      id: 3,
      name: "Player three",
      color: "red",
      caseNumber: count
    },
    {
      id: 4,
      name: "Player four",
      color: "violet",
      caseNumber: count
    },
    {
      id: 5,
      name: "Player five",
      color: "orange",
      caseNumber: count
    },
    {
      id: 6,
      name: "Player six",
      color: "green",
      caseNumber: count
    }
  ]);

  const handleClick = () => {
    setOnShow(false);
  }

  // test avec les cartes !!!
  // ########################################################################################################################################################

  const getRandomNumberQuiz = (type: 'quiz'): JSX.Element | null => {
    
    let randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardQuiz: QuizProps | undefined = quizQuestions.find((quiz: QuizProps) => quiz.id === randomNum);

    switch (count) {
      case 3:
      case 15:
      case 27:
      case 39:
      case 51:
        return type === 'quiz' && findCardQuiz ? <ComponentQuiz findCardQuiz={findCardQuiz} onShow={onShow} handleClick={handleClick} /> : null;
      default:
        console.log("nothing to retrieve");
        return null;
    }
  }

  const getRandomNumberDefi = (type: 'defi'): JSX.Element | null => {
    
    let randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardDefi: QuizProps | undefined = defiQuestions.find((defi: QuizProps) => defi.id === randomNum);

    switch (count) {
      case 6:
      case 18:
      case 30:
      case 42:
      case 54:
        return type === 'defi' && findCardDefi ? <ComponentDefi findCardDefi={findCardDefi} onShow={onShow} handleClick={handleClick} /> : null;
      default:
        console.log("nothing to retrieve");
        return null;
    }
  }

  const getRandomNumberAction = (type: 'action'): JSX.Element | null => {
    
    let randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardAction: OrderProps | undefined = bonneActionOrder.find((action: OrderProps) => action.id === randomNum);

    switch (count) {
      case 9:
      case 21:
      case 33:
      case 45:
        return type === 'action' && findCardAction ? <ComponentBonneAction findCardAction={findCardAction} onShow={onShow} handleClick={handleClick} /> : null;
      default:
        console.log("nothing to retrieve");
        return null;
    }
  };

  const getRandomNumberSanction = (type: 'sanction'): JSX.Element | null => {
    
    let randomNum = Math.floor(Math.random() * 3) + 1;
    const findCardSanction: OrderProps | undefined = sanctionOrder.find((sanction: OrderProps) => sanction.id === randomNum);
    
    switch (count) {
      case 12:
      case 24:
      case 36:
      case 48:
        return type === 'sanction' && findCardSanction ? <ComponentSanction findCardSanction={findCardSanction} onShow={onShow} handleClick={handleClick} /> : null;
      default:
        console.log("nothing to retrieve");
        return null;
    }
  };

  const QuizFunction = () => getRandomNumberQuiz('quiz');
  const DefiFunction = () => getRandomNumberDefi('defi');
  const ActionFunction = () => getRandomNumberAction('action');
  const SanctionFunction = () => getRandomNumberSanction('sanction');

  // ########################################################################################################################################################

  // top side squares onShow true & absolute over / onShow false & absolute under
  const PlayerSpanTop: React.FC<{ player: PlayerProps }> = ({ player }) => (
    <div style={{ background: player.color }} className="span-pawn">
      {player.id} {player.caseNumber === 39 ? QuizFunction() : player.caseNumber === 42 ? DefiFunction() : player.caseNumber === 45 ? ActionFunction() 
        : player.caseNumber === 48 ? SanctionFunction() : player.caseNumber === 51 ? QuizFunction() : player.caseNumber === 54 ? DefiFunction() : null}
    </div>
  );

  const TopSquare: React.FC<{ caseNumber: number, players: PlayerProps[], additionalContent: React.ReactNode }> = (
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

  // left side squares (almost done)
  const PlayerSpanLeft: React.FC<{ player: PlayerProps }> = ({ player }) => (
    <div style={{ background: player.color }} className="span-pawn">
      {player.id} {player.caseNumber === 3 ? QuizFunction() : player.caseNumber === 6 ? DefiFunction() : player.caseNumber === 9 ? ActionFunction() : null}
    </div>
  );

  const LeftSquare: React.FC<{ caseNumber: number, players: PlayerProps[], additionalContent: React.ReactNode }> = (
    { caseNumber, players, additionalContent }) => (
      <div className={`squares-side squares-lside ${caseNumber === 3 ? "quiz-color" : caseNumber === 6 ? "defi-color" : caseNumber === 9 ? "action-color" : null}`}>
        
        <div className="caseNumber">
          {caseNumber}
          {players.map((player: PlayerProps) => player.caseNumber === caseNumber ? <PlayerSpanLeft key={player.id} player={player} /> : null)}
        </div>
        {additionalContent}
      </div>
  );

  // right side squares
  const PlayerSpanRight: React.FC<{ player: PlayerProps }> = ({ player }) => (
    <div style={{ background: player.color }} className="span-pawn">
      {player.id} {player.caseNumber === 30 ? DefiFunction() : player.caseNumber === 33 ? ActionFunction() : player.caseNumber === 36 ? SanctionFunction() : null}
    </div>
  );

  const RightSquare: React.FC<{ caseNumber: number, players: PlayerProps[], additionalContent: React.ReactNode }> = (
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

  // bottom side squares
  const PlayerSpanBottom: React.FC<{ player: PlayerProps }> = ({ player }) => (
    <div style={{ background: player.color }} className="span-pawn">
      {player.id} {player.caseNumber === 12 ? SanctionFunction() : player.caseNumber === 15 ? QuizFunction() : player.caseNumber === 18 ? DefiFunction()
      : player.caseNumber === 21 ? ActionFunction() : player.caseNumber === 24 ? SanctionFunction() : player.caseNumber === 27 ? QuizFunction() : null}
    </div>
  );

  const BottomSquare: React.FC<{ caseNumber: number, players: PlayerProps[], additionalContent: React.ReactNode }> = (
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

  /* console.log(countPlayerOne, "countPlayerOne");
  console.log(countPlayerTwo, "countPlayerTwo");
  console.log(countPlayerThree, "countPlayerThree");
  console.log(countPlayerFour, "countPlayerFour");
  console.log(countPlayerFive, "countPlayerFive");
  console.log(countPlayerSix, "countPlayerSix"); */

  //console.log(count, "count");
  //console.log(value, "value");

  return (
    <div className='frame'>

      <div className='top-frame'>

        <div className='squares square-top first-square'>
          
          <p>0</p>

          {players.map((players: PlayerProps) => (
            <p key={players.id}>{players.name} - {players.caseNumber}</p>
          ))}
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

          return <TopSquare key={caseNumber} caseNumber={caseNumber} players={players} additionalContent={additionalContent} />;
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

            return <LeftSquare key={caseNumber} caseNumber={caseNumber} players={players} additionalContent={additionalContent} />;
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

            return <RightSquare key={caseNumber} caseNumber={caseNumber} players={players} additionalContent={additionalContent} />;
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

          return <BottomSquare key={caseNumber} caseNumber={caseNumber} players={players} additionalContent={additionalContent} />;
        })}

      </div>

    </div>
  )
};

export default App;