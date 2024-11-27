import type { PlayerProps } from '../lib/types';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
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

  /* setPlayers((prevPlayers) => prevPlayers.map((p: PlayerProps) => p.id === id 
      ? { ...p, caseNumber: p.caseNumber + newVal } 
      : p)
  ); */
  console.log(playersChoosen, "playersChoosen from dice");
  console.log(activePlayerId, "activePlayerId from dice");

  // update score to current player
  const rollDice = (id: number): void => {
    if (isRolling) return;
    setIsRolling(true);
    const newVal = Math.floor(Math.random() * nbPlayer) + 1;
    setValue(newVal);
    setTimeout(() => {
      setIsRolling(false);
      setCount((prev) => prev + newVal);
      // one more lap to go
      setPlayersChoosen((prevPlayers) => prevPlayers.map((p: PlayerProps) => {
          if (p.id === id) {
            const newCaseNumber = p.caseNumber + newVal;
            return { ...p, caseNumber: newCaseNumber > 55 ? newCaseNumber % 56 : newCaseNumber };
          }
          return p;
        })
      );
      // change score
      if (activePlayerId === 1) {
        setActivePlayerId(2);
        setActiveCard({ type: null, cardData: null });
        setCountPlayerOne((prev) => prev + newVal);
      } else if (activePlayerId === 2) {
        setActivePlayerId(3);
        setCountPlayerTwo((prev) => prev + newVal);
        setActiveCard({ type: null, cardData: null });
      } else if (activePlayerId === 3) {
        if (nbPlayer === 3) {
          setActivePlayerId(1);
        } else {
          setActivePlayerId(4);
        }
        setCountPlayerThree((prev) => prev + newVal);
        setActiveCard({ type: null, cardData: null });
      } else if (activePlayerId === 4) {
        if (nbPlayer === 4) {
          setActivePlayerId(1);
        } else {
          setActivePlayerId(5);
        }
        //setActivePlayerId(5);
        setCountPlayerFour((prev) => prev + newVal);
        setActiveCard({ type: null, cardData: null });
      } else if (activePlayerId === 5) {
        if (nbPlayer === 5) {
          setActivePlayerId(1);
        } else {
          setActivePlayerId(6);
        }
        //setActivePlayerId(6);
        setCountPlayerFive((prev) => prev + newVal);
        setActiveCard({ type: null, cardData: null });
      } else {
        setActivePlayerId(1);
        setCountPlayerSix((prev) => prev + newVal);
        setActiveCard({ type: null, cardData: null });
      }
    }, 1000);
  };

  // dice animation
  const props = useSpring({
    transform: isRolling ? 'rotate3d(3, -1, -3, 360deg)' : 'rotate3d(0, 1, 0, 0deg)',
    config: { tension: 200, friction: 10 },
  });

  return (
    <div className='dice-container'>
      {isRolling === true ? (
        <div>
          <img src={gifDice} width={120} height={120} className="dice-gif" alt="dice anim" />
        </div>
      ) : (
        <div className='dice-box'>
          {playersChoosen.map((play: PlayerProps) => (
            play.id === activePlayerId ? (
              <animated.div 
                key={play.id}
                style={props}
                className="dice"
                onClick={() => rollDice(play.id)} 
              >
                {value}
              </animated.div>
            ) : null
          ))}
        </div>
      )}
      {playersChoosen.map((play: PlayerProps) => ( 
        play.id === activePlayerId ? (
          <div key={play.id} className='dice-indicator'>
            <p>{play.name} {play.caseNumber}</p>
          </div> 
        ) : null
      ))}
    </div>
  );
};
export default Dices;
/* {playersChoosen.map((play: PlayerProps) => ( */