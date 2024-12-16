import type { PlayerProps } from '../lib/types';
import { useEffect, useState } from 'react';
import EndOfGame from './EndOfGame';
//import gifDice from "../assets/dice.gif";
import { FaLongArrowAltRight } from "react-icons/fa";
import pawnAudio from '../assets/audio/pawn.mp3';
import endOfGameAudio from '../assets/audio/endOfGame.mp3';
import './styles/Dices.css';


type ValProps = {
  playersChoosen: PlayerProps[];
  setPlayersChoosen: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
  replay: boolean;
  setReplay: React.Dispatch<React.SetStateAction<boolean>>;
  nbPlayer: number;
  nbrOfLap: number;
  selectedOption: string;
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
  replay,
  setReplay,
  nbPlayer,
  nbrOfLap,
  activePlayerId,
  selectedOption,
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

  // action replay if player is in the square of "quiz"
  useEffect(() => {
    const handleReplay = () => {
      const findPlayerToReplay = playersChoosen.map((playerGame: PlayerProps) => playerGame.caseQuiz === true 
        ? rollDice(playerGame.id)
        : playerGame
      );
      return findPlayerToReplay;
    };
    handleReplay();
    return () => console.log("action replay clean-up !");
  }, [replay]);

  // update score to current player
  const rollDice = (id: number): void | JSX.Element => {
    if (isRolling) return;
    setIsRolling(true);
    const newVal = Math.floor(Math.random() * 6) + 1;
    setValue(newVal);

    // reset to false the replay value if player is in the square of "quiz"
    setPlayersChoosen((prevPlayers) => prevPlayers.map((gamer: PlayerProps) => gamer.id === id && gamer.caseQuiz === true 
      ? {...gamer, caseQuiz: false} : gamer
    ));

    setTimeout(() => {
      setIsRolling(false);
      setCount((prev) => prev + newVal);

      // one more lap to go (max 5 laps)
      setPlayersChoosen((prevPlayers) => prevPlayers.map((gamer: PlayerProps) => {
        
        if (gamer.id === id) {
          
          const newCaseNumber = gamer.caseNumber + newVal;
          let newCounter = gamer.lap || 0;

          if (newCaseNumber > 55) {
            newCounter += 1;

            if (newCounter === nbrOfLap) {
              const updatePlayer = { ...gamer, caseNumber: newCaseNumber % 56, lap: newCounter, gameOver: true };
              const audio = new Audio(endOfGameAudio);
              audio.play().catch((error) => {
                console.error("Erreur lors de la lecture du son :", error);
              });
              return updatePlayer;
            }
            return { ...gamer, caseNumber: newCaseNumber % 56, lap: newCounter };
          }
          return { ...gamer, caseNumber: newCaseNumber, lap: newCounter };
        }
        return gamer;
      }));
    
      // change score
      if (activePlayerId === 1) {
        replay === false ? setActivePlayerId(2) : setActivePlayerId(1);
        setCountPlayerOne((prev) => prev + newVal);
      } else if (activePlayerId === 2) {
        if (replay === false) {
          nbPlayer === 2 ? setActivePlayerId(1) : setActivePlayerId(3);
          setCountPlayerTwo((prev) => prev + newVal);
        } else {
          setActivePlayerId(2);
        }
      } else if (activePlayerId === 3) {
        if (replay === false) {
          nbPlayer === 3 ? setActivePlayerId(1) : setActivePlayerId(4);
          setCountPlayerThree((prev) => prev + newVal);
        } else {
          setActivePlayerId(3);
        }
      } else if (activePlayerId === 4) {
        if (replay === false) {
          nbPlayer === 4 ? setActivePlayerId(1) : setActivePlayerId(5);
          setCountPlayerFour((prev) => prev + newVal);
        } else {
          setActivePlayerId(4);
        }
      } else if (activePlayerId === 5) {
        if (replay === false) {
          nbPlayer === 5 ? setActivePlayerId(1) : setActivePlayerId(6);
          setCountPlayerFive((prev) => prev + newVal);
        } else {
          setActivePlayerId(5);
        }
      } else {
        if (replay === true) {
          setActivePlayerId(6);
        } else {
          setActivePlayerId(1);
          setCountPlayerSix((prev) => prev + newVal);
        }
      }
      const audio = new Audio(pawnAudio);
      audio.play().catch((error) => {
        console.error("Erreur lors de la lecture du son :", error);
      });
      setActiveCard({ type: null, cardData: null });
      setReplay(false);
    }, 1000);
  };

  //console.log(replay, "+++ replay +++");

  //console.log(playersChoosen, "playersChoosen from dice");
  //console.log(activePlayerId, "activePlayerId from dice");

  const winner = playersChoosen.find((gamer) => gamer.gameOver === true);
  if (winner) {
    return (
      <div className="div-endofgame">
        <EndOfGame selectedOption={selectedOption} winner={winner.name} />
      </div>
    );
  };

  return (
    <div className='dice-container'>
      {isRolling === true ? (
        <div>
          <div>
            {/* <img src={gifDice} width={120} height={120} className="dice-gif" alt="dice anim" /> */}
          </div>
          <div className='dice-box'>
            {playersChoosen.map((player: PlayerProps) => (
              player.id === activePlayerId ? (
                <div
                  key={player.id}
                  className="dice_2"
                >
                  <div className="front faceOfDice1">
                    <span></span>
                  </div>

                  <div className='back faceOfDice2'>
                    <span className="span-nbr1"></span>
                    <span className="span-nbr2"></span>
                  </div>
                  
                  <div className="left faceOfDice3">
                    <span className='span-nbr1'></span>
                    <span className='span-nbr2'></span>
                    <span className='span-nbr3'></span>
                  </div>

                  <div className="right faceOfDice4">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="top faceOfDice5">
                    <span className='span-nbr'></span>
                    <span className='span-nbr'></span>
                    <span className='span-nbr_3'></span>
                    <span className='span-nbr'></span>
                    <span className='span-nbr'></span>
                  </div>

                  <div className='bottom faceOfDice6'>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
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
                {value === 1 ? <div className='faceOfDice1'><span></span></div> : value === 2 
                  ? <div className='faceOfDice2'><span className="span-nbr1"></span><span className="span-nbr2"></span></div> : value === 3 
                  ? <div className='faceOfDice3'><span className='span-nbr1'></span><span className='span-nbr2'></span><span className='span-nbr3'></span></div> : value === 4 
                  ? <div className='faceOfDice4'><span></span><span></span><span></span><span></span></div> : value === 5 
                  ? <div className='faceOfDice5'><span className='span-nbr'></span><span className='span-nbr'></span><span className='span-nbr_3'></span><span className='span-nbr'></span><span className='span-nbr'></span></div> : value === 6 
                  ? <div className='faceOfDice6'><span></span><span></span><span></span><span></span><span></span><span></span></div> : null}
              </div>
            ) : null
          ))}
        </div>
      )}
      {playersChoosen.map((play: PlayerProps) => ( 
        play.id === activePlayerId ? (
          <div key={play.id} className='dice-player'>
            <p>{selectedOption === "français" ? "Joueur" 
              : selectedOption === "english" ? "Player" 
              : selectedOption === "deutsch" ? "Spieler" 
              : selectedOption === "italiano" ? "Giocatore" : null}&nbsp;
              {play.id}&nbsp;<FaLongArrowAltRight size={44} />&nbsp;case: {play.caseNumber}</p>
          </div> 
        ) : null
      ))}

    </div>
  );
};
export default Dices;
