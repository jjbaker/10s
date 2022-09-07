import React from "react";
import Dice from "./components/Dice.js"
import "./style.css";

export default function App() {
  const [diceList, setDiceList] = React.useState(createDice())

  function createDice(){
    return Array.from({length: 10}, () => Math.ceil(Math.random()*6));
  }

  const diceElements = diceList.map(d => <Dice value={d} />)

  const dices = createDice
  return (
    <div>
      <main>
        <div className="dice">
          {diceElements}
        </div>
      </main>
    </div>
  );
}
