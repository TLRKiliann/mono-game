import { useState } from "react";
import Dices from "./components/Dices";
import mascotte from "./assets/mascotte-resize.png";
import myEcoBest from "./assets/myecobestfriend-logo.png";
import './App.css';

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

  console.log(countPlayerOne, "countPlayerOne");
  console.log(countPlayerTwo, "countPlayerTwo");
  console.log(countPlayerThree, "countPlayerThree");
  console.log(countPlayerFour, "countPlayerFour");
  console.log(countPlayerFive, "countPlayerFive");
  console.log(countPlayerSix, "countPlayerSix");

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
        
        <div className='squares square-top'>
          <p>55</p>
        </div>

        <div className='squares square-top defi-color'>
          <p>54</p>
          <h4>Defi</h4>
        </div>
        
        <div className='squares square-top'>
          <p>53</p>
        </div>
        <div className='squares square-top'>
          <p>52</p>
        </div>
        
        <div className='squares square-top quiz-color'>
          <p>51</p>
          <h4>Quiz</h4>
        </div>
        
        <div className='squares square-top'>
          <p>50</p>
        </div>
        <div className='squares square-top'>
          <p>49</p>
        </div>
        
        <div className='squares square-top sanction-color'>
          <p>48</p>
          <h4>Sanction</h4> 
        </div>
        
        <div className='squares square-top'>
          <p>47</p>
        </div>
        <div className='squares square-top'>
          <p>46</p>
        </div>
        
        <div className='squares square-top action-color'>
          <p>45</p>
          <h4>Bonne Action</h4>
        </div>
        
        <div className='squares square-top'>
          <p>44</p>
        </div>
        <div className='squares square-top'>
          <p>43</p>
        </div>
        
        <div className='squares square-top defi-color'>
          <p>42</p>
          <h4>Defi</h4>
        </div>
        
        <div className='squares square-top'>
          <p>41</p>
        </div>
        <div className='squares square-top'>
          <p>40</p>  
        </div>

        <div className='squares square-top quiz-color'>
          <p>39</p>
          <h4>Quiz</h4>
        </div>

      </div>

      <div className="middle-frames">

        <div className='left-frame'>

          <div className='squares-side squares-lside'>
            <p>1 {players.map((player) => player.caseNumber === 1 ? (
               <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
          </div>
          <div className='squares-side squares-lside'>
            <p>2 {players.map((player) => player.caseNumber === 2 ? (
                <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
          </div>
          
          <div className='squares-side squares-lside quiz-color'>
            <p>3 {players.map((player) => player.caseNumber === 3 ? (
                <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
            <h4>Quiz</h4>
          </div>

          <div className='squares-side squares-lside'>
            <p>4 {players.map((player) => player.caseNumber === 4 ? (
                <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
          </div>
          <div className='squares-side squares-lside'>
            <p>5 {players.map((player) => player.caseNumber === 5 ? (
                <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
          </div>

          <div className='squares-side squares-lside defi-color'>
            <p>6 {players.map((player) => player.caseNumber === 6 ? (
                <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
            <h4>Defi</h4>
          </div>

          <div className='squares-side squares-lside'>
            <p>7 {players.map((player) => player.caseNumber === 7 ? (
                <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
          </div>
          <div className='squares-side squares-lside'>
            <p>8 {players.map((player) => player.caseNumber === 8 ? (
                <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
          </div>

          <div className='squares-side squares-lside action-color'>
            <p>9 {players.map((player) => player.caseNumber === 9 ? (
                <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
            <h4>Bonne Action</h4>
          </div>

          <div className='squares-side squares-lside'>
            <p>10 {players.map((player) => player.caseNumber === 10 ? (
                <span style={{"background": player.color}} className="span-pawn">{player.id}</span>
              ) : null)}
            </p>
          </div>

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

          <div className='squares-side squares-rside'>
            <p>38</p>
          </div>
          <div className='squares-side squares-rside'>
            <p>37</p>
          </div>

          <div className='squares-side squares-rside sanction-color'>
            <p>36</p>
            <h4>Sanction</h4>
          </div>
          
          <div className='squares-side squares-rside'>
            <p>35</p>
          </div>
          <div className='squares-side squares-rside'>
            <p>34</p>
          </div>
          
          <div className='squares-side squares-rside action-color'>
            <p>33</p>
            <h4>Bonne Action</h4>
          </div>

          <div className='squares-side squares-rside'>
            <p>32</p>
          </div>
          <div className='squares-side squares-rside'>
            <p>31</p>
          </div>
          
          <div className='squares-side squares-rside defi-color'>
            <p>30</p>
            <h4>Defi</h4>
          </div>
          
          <div className='squares-side squares-rside'>
            <p>29</p>
          </div>

        </div>

      </div>

      <div className='bottom-frame'>
        
        <div className="squares square-bottom">
          <p>11</p>
        </div>
        
        <div className="squares square-bottom sanction-color">
          <p>12</p>
          <h4>Sanction</h4>
        </div>
        
        <div className="squares square-bottom">
          <p>13</p>
        </div>
        <div className="squares square-bottom">
          <p>14</p>
        </div>

        <div className="squares square-bottom quiz-color">
          <p>15</p>
          <h4>Quiz</h4>
        </div>
        
        <div className="squares square-bottom">
          <p>16</p>  
        </div>
        <div className="squares square-bottom">
          <p>17</p>
        </div>

        <div className="squares square-bottom defi-color">
          <p>18</p>
          <h4>Defi</h4>
        </div>
        
        <div className="squares square-bottom">
          <p>19</p>
        </div>
        <div className="squares square-bottom">
          <p>20</p>  
        </div>
        
        <div className="squares square-bottom action-color">
          <p>21</p>
          <h4>Bonne Action</h4>
        </div>

        <div className="squares square-bottom">
          <p>22</p>
        </div>
        <div className="squares square-bottom">
          <p>23</p>
        </div>

        <div className="squares square-bottom sanction-color">
          <p>24</p>
          <h4>Sanction</h4>
        </div>
        
        <div className="squares square-bottom">
          <p>25</p>
        </div>
        <div className="squares square-bottom">
          <p>26</p>
        </div>

        <div className="squares square-bottom quiz-color">
          <p>27</p>
          <h4>Quiz</h4>
        </div>

        <div className="squares square-bottom">
          <p>28</p>
        </div>

      </div>

    </div>
  )
};

export default App;