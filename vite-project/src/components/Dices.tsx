import type { PlayerProps } from '../lib/types';
import { useState } from 'react';
//import { useSpring, animated } from 'react-spring';
import gifDice from "../assets/dice.gif";
import './styles/Dices.css';

type ValProps = {
  playersChoosen: PlayerProps[];
  setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
  nbPlayer: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;

  setCountPlayerOne: React.Dispatch<React.SetStateAction<number>>;
  setCountPlayerTwo: React.Dispatch<React.SetStateAction<number>>;
  setCountPlayerThree: React.Dispatch<React.SetStateAction<number>>;
  setCountPlayerFour: React.Dispatch<React.SetStateAction<number>>;
  setCountPlayerFive: React.Dispatch<React.SetStateAction<number>>;
  setCountPlayerSix: React.Dispatch<React.SetStateAction<number>>;

  activePlayerId: number;
  setActivePlayerId: React.Dispatch<React.SetStateAction<number>>;
  setActiveCard: any;
};

const Dices = ({
  playersChoosen,
  setPlayersChoosen,
  nbPlayer,
  activePlayerId,
  
  setActivePlayerId,
  setCountPlayerOne,
  setCountPlayerTwo,
  setCountPlayerThree,
  setCountPlayerFour,
  setCountPlayerFive,
  setCountPlayerSix,

  setCount,
  value,
  setValue,
  setActiveCard
}: ValProps): JSX.Element => {

  const [isRolling, setIsRolling] = useState<boolean>(false);

  //console.log(playersChoosen, "playersChoosen from dice");
  //console.log(activePlayerId, "activePlayerId from dice");

  // update score to current player
  const rollDice = (id: number): void | JSX.Element => {
    if (isRolling) return;
    setIsRolling(true);
    const newVal = Math.floor(Math.random() * 6) + 1;
    setValue(newVal);
    setTimeout(() => {
      setIsRolling(false);
      setCount((prev) => prev + newVal);

      // one more lap to go (max 3 laps)
      setPlayersChoosen((prevPlayers) => prevPlayers.map((gamer: PlayerProps) => {
          if (gamer.id === id) {
            
            const newCaseNumber = gamer.caseNumber + newVal;
            let newCounter = gamer.lap || 0;

            if (newCaseNumber > 55) {
              newCounter += 1;

              if (newCounter === 3) {
                const updatePlayer = { ...gamer, caseNumber: newCaseNumber % 56, lap: newCounter, gameOver: true };
                return updatePlayer;
              }
              return { ...gamer, caseNumber: newCaseNumber % 56, lap: newCounter };
            }
            return { ...gamer, caseNumber: newCaseNumber, lap: newCounter };
          }
          return gamer;
        })
      );
      // change score
      if (activePlayerId === 1) {
        setActivePlayerId(2);
        setCountPlayerOne((prev) => prev + newVal);
      } else if (activePlayerId === 2) {
        nbPlayer === 2 ? setActivePlayerId(1) : setActivePlayerId(3);
        setCountPlayerTwo((prev) => prev + newVal);
      } else if (activePlayerId === 3) {
        nbPlayer === 3 ? setActivePlayerId(1) : setActivePlayerId(4);
        setCountPlayerThree((prev) => prev + newVal);
      } else if (activePlayerId === 4) {
        nbPlayer === 4 ? setActivePlayerId(1) : setActivePlayerId(5);
        setCountPlayerFour((prev) => prev + newVal);
      } else if (activePlayerId === 5) {
        nbPlayer === 5 ? setActivePlayerId(1) : setActivePlayerId(6);
        setCountPlayerFive((prev) => prev + newVal);
      } else {
        setActivePlayerId(1);
        setCountPlayerSix((prev) => prev + newVal);
      }
      setActiveCard({ type: null, cardData: null });
    }, 1000);
  };

  // dice animation
  /* const props = useSpring({
    transform: isRolling ? 'rotate3d(3, -1, -3, 360deg)' : 'rotate3d(0, 1, 0, 0deg)',
    config: { tension: 200, friction: 10 },
  }); */

  const winner = playersChoosen.find((gamer) => gamer.gameOver === true);
  if (winner) {
    return (
      <div className="game-over">
        <p>{winner.name} WIN !</p>
        <p>Game-Over</p>
      </div>
    );
  };

  return (
    <div className='dice-container'>
      {isRolling === true ? (
        <div>
          <div>
            <img src={gifDice} width={120} height={120} className="dice-gif" alt="dice anim" />
          </div>
          <div className='dice-box'>
            {playersChoosen.map((player: PlayerProps) => (
              player.id === activePlayerId ? (
                <div
                  key={player.id}
                  className="dice_2"
                >
                  <div className="front faceOfDice1">
                    <span>O</span>
                  </div>

                  <div className='back faceOfDice2'>
                    <span className="span-nbr1">O</span>
                    <span className="span-nbr2">O</span>
                  </div>
                  
                  <div className="left faceOfDice3">
                    <span className='span-nbr1'>O</span>
                    <span className='span-nbr2'>O</span>
                    <span className='span-nbr3'>O</span>
                  </div>

                  <div className="right faceOfDice4">
                    <span>O</span>
                    <span>O</span>
                    <span>O</span>
                    <span>O</span>
                  </div>

                  <div className="top faceOfDice5">
                    <span className='span-nbr'>O</span>
                    <span className='span-nbr'>O</span>
                    <span className='span-nbr_3'>O</span>
                    <span className='span-nbr'>O</span>
                    <span className='span-nbr'>O</span>
                  </div>

                  <div className='bottom faceOfDice6'>
                      <span>O</span>
                      <span>O</span>
                      <span>O</span>
                      <span>O</span>
                      <span>O</span>
                      <span>O</span>
                  </div>
                
                </div>
              ) : null
            ))}
          </div>
        </div>
      ) : (
        <div className='dice-box'>
          {playersChoosen.map((player: PlayerProps) => (
            player.id === activePlayerId ? (
              <div
                key={player.id}
                className="dice" 
                onClick={() => rollDice(player.id)}
              >
                {value === 1 ? <div className='faceOfDice1'><span>O</span></div> : value === 2 
                  ? <div className='faceOfDice2'><span className="span-nbr1">O</span><span className="span-nbr2">O</span></div> : value === 3 
                  ? <div className='faceOfDice3'><span className='span-nbr1'>O</span><span className='span-nbr2'>O</span><span className='span-nbr3'>O</span></div> : value === 4 
                  ? <div className='faceOfDice4'><span>O</span><span>O</span><span>O</span><span>O</span></div> : value === 5 
                  ? <div className='faceOfDice5'><span className='span-nbr'>O</span><span className='span-nbr'>O</span><span className='span-nbr_3'>O</span><span className='span-nbr'>O</span><span className='span-nbr'>O</span></div> : value === 6 
                  ? <div className='faceOfDice6'><span>O</span><span>O</span><span>O</span><span>O</span><span>O</span><span>O</span></div> : null}
              </div>
            ) : null
          ))}
        </div>
      )}
      {playersChoosen.map((play: PlayerProps) => ( 
        play.id === activePlayerId ? (
          <div key={play.id} className='dice-player'>
            <p>{play.name} {play.caseNumber}</p>
          </div> 
        ) : null
      ))}

    </div>
  );
};
export default Dices;

              {/* <animated.div 
                key={player.id}
                style={props}
                className="dice"
                onClick={() => rollDice(player.id)} 
              >
                {value}
              </animated.div> */}