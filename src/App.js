import React from "react";
import Dice from "./components/Dice.js"
import "./style.css";

export default function App() {
  const [diceList, setDiceList] = React.useState(createDice())

  function createDice(len=10){
    return Array.from({length: len}, () => Math.ceil(Math.random()*6));
  }

  function rollDice() {
    const newRoll = createDice();
    setDiceList(newRoll)
  }

  const diceElements = diceList.map(d => <Dice value={d} />)

  const dices = createDice
  return (
    <div>
      <main>
        <div className="dice">
          {diceElements}
        </div>
        <button className="roll--button" onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}
