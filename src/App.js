import React from "react";
import Dice from "./components/Dice.js"
import {nanoid} from "nanoid"
import "./style.css";

export default function App() {
  const [diceList, setDiceList] = React.useState(createDice())
 

  function createDice(){
    const newDice=[]
    for(let i = 0; i <10; i++){
      newDice.push({
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function rollDice() {
    setDiceList(oldRoll => oldRoll.map(d => {
      return d.isHeld ?
        d
        : {...d, value:  Math.ceil(Math.random()*6)}
    }))
  }
  function holdDice(id){
    setDiceList(oldRoll => oldRoll.map(d => {
      return d.id ==id ?
        {...d, isHeld: !d.isHeld}
        : d
    }))
  }

  const diceElements = diceList.map(d => <Dice key={d.id} value={d.value} id={d.id} onClick={() => holdDice(d.id)} isHeld={d.isHeld} />)

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
