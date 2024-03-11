import React, { useState } from 'react'
import FadeIn from 'react-fade-in'
import { v4 as uuidv4 } from 'uuid'

import step_0 from '../images/transparent_images/step_0.png'
import step_1 from '../images/transparent_images/step_1.png'
import step_2 from '../images/transparent_images/step_2.png'
import step_3 from '../images/transparent_images/step_3.png'
import step_4 from '../images/transparent_images/step_4.png'
import step_5 from '../images/transparent_images/step_5.png'
import step_6 from '../images/transparent_images/step_6.png'
import step_7 from '../images/transparent_images/step_7.png'
import snow from '../images/transparent_images/snow.gif'
import words from './words.json'

const testMode = true
type Board = string[]
type Game = {
  letter: null | string
  word: string[]
  board: Board
  state: string | null
  numOfCorrectLetters: number
}

const initialState = {
  letter: null,
  word: [],
  board: ['_', '_', '_', '_', '_', '_', '_'],
  state: undefined,
  numOfCorrectLetters: 0,
}

export function App() {
  const [game, setGame] = useState<Game>({
    letter: null,
    word: [],
    board: ['_', '_', '_', '_', '_', '_', '_'],
    state: null,
    numOfCorrectLetters: 0,
  })

  const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]

  const snowmanPicArray = [
    step_0,
    step_1,
    step_2,
    step_3,
    step_4,
    step_5,
    step_6,
    step_7,
  ]

  const [snowmanPicCount, setSnowmanPicCount] = useState(7)

  // useEffect(() => {
  //   // Generate unique IDs for list items
  //   const updatedItems = Array(5).fill().map(() => ({
  //     id: crypto.randomUUID(),
  //     name: 'Example Item',
  //   }));
  //   setItems(updatedItems);
  // }, []);

  function handleClickABCButton(value: string) {
    let count = 0
    disableButton(value)

    if (game.state === null) {
      return
    }
    const tempBoard = [...game.board]
    if (game.word.includes(value)) {
      for (let i in game.word) {
        if (game.word[i] === value) {
          tempBoard[i] = game.word[i]
          count++
        }
      }
    }

    let tempState = gameStatus(game.state, tempBoard)
    setSnowmanPicCount(game.numOfCorrectLetters + count)

    setGame({
      ...game,
      letter: value,
      board: tempBoard,
      numOfCorrectLetters: game.numOfCorrectLetters + count,
      state: tempState!,
    })

    if (testMode === true) {
      consoleMessages()
    }
  }

  async function handleNewGame() {
    document.getElementById('iframeWrapper')?.classList.add('won')

    setSnowmanPicCount(0)
    enableButtons()
    const newGame = { ...initialState }
    let tempWord = words[Math.floor(Math.random() * 1024)]
      .toUpperCase()
      .split('')
    setGame({ ...newGame, word: tempWord, state: 'new' })

    if (testMode === true) {
      //////////////////////////////////////////////////////////
      // Testing - New game console messages to expedite finishing game
      console.log(`The word is ${tempWord.join('')}`)
      console.log(`The board has ${newGame.board.join(' ')}`)
    }
  }

  function gameStatus(status: string | null, board: Array<String>) {
    if (status !== null && board.includes('_')) {
      return 'playing'
    } else if (status === 'playing' && !board.includes('_')) {
      document.getElementById('iframeWrapper')?.classList.remove('won')
      return 'won'
    }
  }

  //////////////////////////////////////////////////////////
  // Disabling/Re-enabling seems to be working fine
  function disableButton(letter: string) {
    const button = document.getElementById(letter)
    button?.setAttribute('disabled', 'true')
  }

  function enableButtons() {
    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
      button.removeAttribute('disabled')
    })
  }

  //////////////////////////////////////////////////////////
  // Testing - Game console messages to expedite finishing game
  function consoleMessages() {
    console.log(`The letter is ${game.letter}`)
    console.log(`The word is ${game.word.join('')}`)
    console.log(`The board has ${game.board.join(' ')}`)
    console.log(`The state is ${game.state}`)
    console.log(`The numOfCorrectLetters is ${game.numOfCorrectLetters}`)
  }

  function buttonLabel() {
    if (game.state === null) {
      return 'New Game'
    } else if (game.state === 'new' || game.state === 'playing') {
      return 'Restart Game'
    } else {
      return 'Play Again?'
    }
  }

  return (
    <div>
      <main>
        <header>
          <h1>Snowman</h1>
          <h2>A Hangman-style game</h2>
          <button id="gameButton" onClick={handleNewGame}>
            {buttonLabel()}
          </button>
        </header>
        <section id="game-board">
          <div className="results-area">
            <FadeIn delay={150} transitionDuration={700}>
              <div className="snowman-area">
                <iframe src={snow} className="gif"></iframe>
                <img
                  src={snowmanPicArray[snowmanPicCount]}
                  alt="Image of snowman"
                />
              </div>
              <div className="revealed-area">
                <ul className="letters-revealed">
                  {game.board.map((boardIndex) => {
                    return <li key={uuidv4()}>{boardIndex}</li>
                  })}
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>
        <section id="alphabet">
          {letters.map((letter) => {
            return (
              <button
                key={letter.toString()}
                id={letter}
                className="abcLetter"
                onClick={() => handleClickABCButton(letter)}
              >
                {letter}
              </button>
            )
          })}
        </section>
      </main>
    </div>
  )
}
