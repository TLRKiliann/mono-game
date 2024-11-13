import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import gifDice from "../assets/dice.gif";
import './Dices.css';

type PlayerProps = {
  id: number;
  name: string;
  caseNumber: number;
};

type ValProps = {
  players: PlayerProps[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
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
};

const Dices = ({
  players,
  setPlayers,
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
  setValue
}: ValProps): JSX.Element => {

  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = (id: number): void => {
    if (isRolling) return;
    setIsRolling(true);
    const newVal = Math.floor(Math.random() * 6) + 1;
    setValue(newVal);
    setTimeout(() => {
      setIsRolling(false);
      setCount((prev) => prev + newVal);
      // update score to current player
      setPlayers((prevPlayers) => 
        prevPlayers.map((p: PlayerProps) => p.id === id 
          ? { ...p, caseNumber: p.caseNumber + newVal } 
          : p)
      );
      // change score
      if (activePlayerId === 1) {
        setActivePlayerId(2);
        setCountPlayerOne((prev) => prev + newVal);
      } else if (activePlayerId === 2) {
        setActivePlayerId(3);
        setCountPlayerTwo((prev) => prev + newVal);
      } else if (activePlayerId === 3) {
        setActivePlayerId(4);
        setCountPlayerThree((prev) => prev + newVal);
      } else if (activePlayerId === 4) {
        setActivePlayerId(5);
        setCountPlayerFour((prev) => prev + newVal);
      } else if (activePlayerId === 5) {
        setActivePlayerId(6);
        setCountPlayerFive((prev) => prev + newVal);
      } else {
        setActivePlayerId(1);
        setCountPlayerSix((prev) => prev + newVal);
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
          {players.map((play: PlayerProps) => (
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
      {players.slice(0, 6).map((play: PlayerProps) => (
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
