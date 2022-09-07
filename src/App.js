import React from "react";
import Dice from "./components/Dice.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import "./style.css";

export default function App() {
  const [diceList, setDiceList] = React.useState(createDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() =>{
    checkTenzies();
  },[diceList])

  function checkTenzies(){
    const isSameValue = (d) => d.value == diceList[0].value && d.isHeld==true;
    if(diceList.every(isSameValue)){
      setTenzies(true)
    }
  }
 

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
    if(!tenzies){
      setDiceList(oldRoll => oldRoll.map(d => {
        return d.isHeld ?
          d
          : {...d, value:  Math.ceil(Math.random()*6)}
      }))
    }
    else{
      setDiceList(createDice);
      setTenzies(false);
    }
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
        {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice">
          {diceElements}
        </div>
        <button className="roll--button" onClick={rollDice}>{tenzies ? "New Game": "Roll"}</button>
      </main>
    </div>
  );
}
