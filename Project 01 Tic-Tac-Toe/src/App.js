import { useState } from 'react'

function Square({ space, buttonClick, myID, done }) {
  if (!done)
    return (<button className="square" onClick={() => buttonClick(myID)}>{space[myID]}</button>);
  else
    return (<button style={{ backgroundColor: "blue", color: "red" }} className="square" onClick={() => buttonClick(myID)}>{space[myID]}</button>);
}

function isComplete(spaces) {
  for (let row = 0; row < 3; row++) {
    let myChar = spaces[row * 3];
    if (myChar != null && spaces[row * 3 + 1] == myChar && spaces[row * 3 + 2] == myChar) {
      return true;
    }
  }

  for (let col = 0; col < 3; col++) {
    let myChar = spaces[col];
    if (myChar != null && spaces[col + 3] == myChar && spaces[col + 6] == myChar) {
      return true;
    }
  }

  let myChar = spaces[4];
  return (myChar != null) && (spaces[0] == spaces[8] && spaces[0] == myChar || spaces[2] == spaces[6] && spaces[2] == myChar);
}

function Board({ isX, spaces, handleClick }) {
  const [complete, setComplete] = useState(false);

  function buttonClick(myID) {
    if (spaces[myID] != null)
      return;
    const spaceCopy = spaces.slice();
    if (isX)
      spaceCopy[myID] = 'X';
    else
      spaceCopy[myID] = 'O';
    setComplete(isComplete(spaceCopy));
    handleClick(spaceCopy);
    console.log("poopdsadsa");
  }

  return (
    <>
      <div className="board-row">
        <Square done={complete} myID={0} space={spaces} buttonClick={buttonClick} />
        <Square done={complete} myID={1} space={spaces} buttonClick={buttonClick} />
        <Square done={complete} myID={2} space={spaces} buttonClick={buttonClick} />
      </div>

      <div className="board-row">
        <Square done={complete} myID={3} space={spaces} buttonClick={buttonClick} />
        <Square done={complete} myID={4} space={spaces} buttonClick={buttonClick} />
        <Square done={complete} myID={5} space={spaces} buttonClick={buttonClick} />
      </div>

      <div className="board-row">
        <Square done={complete} myID={6} space={spaces} buttonClick={buttonClick} />
        <Square done={complete} myID={7} space={spaces} buttonClick={buttonClick} />
        <Square done={complete} myID={8} space={spaces} buttonClick={buttonClick} />
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isX, setIsX] = useState(true);

  function handleClick(spaces) {
    let historyCopy = (history.slice(0, currentMove + 1));
    historyCopy.push(spaces);
    setHistory(historyCopy);
    console.log(historyCopy);
    console.log("poop");
    setCurrentMove(currentMove + 1);
    setIsX(!isX);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsX(nextMove % 2 == 0);
  }

  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0)
      description = "Go to move #" + move;
    else
      description = "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return (
    <>
      <div className="game">
        <div>
          <Board isX={isX} spaces={history[currentMove]} handleClick={(spaced) => handleClick(spaced)} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>

    </>
  )
}

