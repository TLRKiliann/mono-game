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
  setCount,
  value,
  setValue}: ValProps): JSX.Element => {

  const [isRolling, setIsRolling] = useState<boolean>(false);

  // throw dice & set count with a new value 
  const rollDice = (id: number): void | number => {
    setIsRolling(true);
    let newVal = Math.floor(Math.random() * 6) + 1;
    setValue(newVal);
    setTimeout(() => {
      setIsRolling(false);
      setValue(newVal);
      setCount((prev) => prev + newVal);
      setPlayers((prevPlayers) => 
        prevPlayers.map((p: PlayerProps) => p.id === id 
          ? { ...p, caseNumber: p.caseNumber + newVal } 
          : p)
      );
      if (activePlayerId === 1) {
        setActivePlayerId(2);
        setCountPlayerOne((prev) => prev + 1);
      } else {
        setActivePlayerId(1);
        setCountPlayerTwo((prev) => prev + 1);
      }
    }, 1000);
  };

  const props = useSpring({
    transform: isRolling ? 'rotate3d(3, -1, -3, 360deg)' : 'rotate3d(0, 1, 0, 0deg)',
    config: { tension: 200, friction: 10 },
  });

  return (
    <div>
    {isRolling ? ( // Vérifiez que isRolling est true
      <div>
        <img src={gifDice} width={120} height={120} className="dice-gif" alt="dice anim" />
        {players.map((play: PlayerProps) => (
          play.id === activePlayerId ? (
            <animated.div 
              key={play.id} 
              style={props} 
              onClick={() => rollDice(play.id)} 
              className="dice"
            >
              {play.name} {value}
            </animated.div>
          ) : (
            <div key={play.id} className="dice">
              {play.name} {play.caseNumber}
            </div>
          )
        ))}
      </div>
    ) : (
      <p>Click on the active player to roll the dice!</p> // Message d'instruction
    )}
  </div>
  );
};

export default Dices;