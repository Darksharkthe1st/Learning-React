import { useState } from 'react'

function Square() {
  const [val, setVal] = useState("");

  function onClick() {
    setVal("X");
  }

  return <button className="square" onClick={onClick}>{val}</button>
}

export default function Board() {
  const [isX, setIsX] = useState(true);
  const [spaces, setSpaces] = useState(Array.of(...9: null))
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>

    </>
  )
}