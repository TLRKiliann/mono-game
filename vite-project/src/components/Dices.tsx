import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import gifDice from "../assets/dice.gif";
import './Dices.css'

type PlayerProps = {
    id: number;
    name: string;
    caseNumber: number;
};

type ValProps = {
    playerOne: PlayerProps;
    setPlayerOne: React.Dispatch<React.SetStateAction<PlayerProps>>;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

const Dices = ({playerOne, setPlayerOne, setCount, value, setValue}: ValProps): JSX.Element => {

  //const [value, setValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const rollDice = (): void | number => {
    setIsRolling(true);
    let newVal = Math.floor(Math.random() * 6) + 1;
    setValue(newVal);
    setTimeout(() => {
        setIsRolling(false);
        setValue(newVal);
        setCount((prev) => prev + newVal);
        setPlayerOne({ ...playerOne, caseNumber: playerOne.caseNumber + newVal});
    }, 1000);
  };

  const props = useSpring({
    transform: isRolling ? 'rotate3d(3, -1, -3, 360deg)' : 'rotate3d(0, 1, 0, 0deg)',
    config: { tension: 200, friction: 10 },
  });

  return (
    <div>
        {isRolling !== false ? (
                <img src={gifDice} width={120} height={120} className="dice-gif" alt="dice anim" />
            ) : (
                <div>
                    <animated.div style={props} onClick={rollDice} className="dice">
                        {value}
                    </animated.div>
                </div>
            )
        }
    </div>
  );
};

export default Dices;