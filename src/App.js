import React, { useState } from 'react';
import './App.css';
import Board from './Components/Board';
import ScoreBoard from './Components/ScoreBoard';
function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setXisPlaying] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [draw,setDraw] = useState(0);
  const [gameover,setGameover]=useState(false);
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const handleBoxClick = (Boxid) => 
  {
    const updatedBoard = board.map((value, id) => 
    {
      if (id === Boxid)
        return xIsPlaying ? "X" : "O";
      else
        return value;
    });

    setXisPlaying(!xIsPlaying);
    setBoard(updatedBoard);
    console.log("updated", updatedBoard[0]);
    const winner = checkWinner(updatedBoard);

    if(winner)
    {
      if (winner === "X") {
        setXScore(xScore + 1);
      }
      else{
        setOScore(oScore + 1);
      }
    }
    let filled = true;
    updatedBoard.forEach((item)=>{
      if(item===null)
        filled = false;
    })
    if(filled && !winner)
    {
      setDraw(draw+1);
    }
  };

  const reset = () => {
    // setBoard(Array(9).fill(null));

    const newBoard = board.map((value)=>{
      return null;
    })


    setBoard(newBoard);
    setGameover(false);
  }
  const checkWinner = (updatedBoard) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      //Destructuring
      const [x, y, z] = WIN_CONDITIONS[i]; //[0,1,2]

      // if(updatedBoard[x]==='X'&&updatedBoard[y]==='X'&&updatedBoard[z]==='X')
      if (updatedBoard[x] && updatedBoard[x] === updatedBoard[y] && updatedBoard[y] === updatedBoard[z]) 
      {
        console.log("Winner")
        setGameover(true);
        return updatedBoard[x];
      }

    }
  }

  const restart = () => {
    reset();
    setOScore(0);
    setXScore(0);
    setDraw(0);
  }

  return (
    <div className="App">

      <ScoreBoard 

      xScore={xScore} 
      oScore={oScore} 
      draw={draw} 
      playing={xIsPlaying}

      ></ScoreBoard>

      <Board 

      board={board} 
      onClick={!gameover?handleBoxClick:reset}
      
      ></Board>

      <button 
      className='btn' 
      onClick={restart}
      >Restart Game</button>
    </div>
  );
}

export default App;
