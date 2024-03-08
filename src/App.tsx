import React, { useState } from 'react'
import words from './words.json'

// should this go here/is this how i should have this?
let step = 0

type Board = string[]

type Game = {
  letter: null | string
  word: string[]
  board: Board
  state: string | null
  // state: null | undefined | 'new' | 'playing' | 'won'
  numOfCorrectLetters: null | number
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
    // numOfLetter:7
  })

  function handleClickABCButton(value: string) {
    if (game.state === null) {
      return
    }
    disableButton(value)

    let count = 0

    console.log(`Before: ${game.board}`)

    // const newGameBoard = { ...game }
    const tempBoard = [...game.board]
    if (game.word.includes(value)) {
      for (let i in game.word) {
        if (game.word[i] === value) {
          tempBoard[i] = game.word[i]
          count++
          console.log(game.word)
          console.log(tempBoard)
        }
      }
    }
    step += count

    let tempState = gameStatus(game.state, tempBoard)

    setGame({
      ...game,
      letter: value,
      board: tempBoard,
      numOfCorrectLetters: step,
      state: tempState!,
    })
    consoleMessages()
  }

  async function handleNewGame() {
    enableButtons()
    const newGame = { ...initialState }
    let tempWord = words[Math.floor(Math.random() * 1024)]
      .toUpperCase()
      .split('')
    // game.word = ['L', 'E', 'I', 'E', 'G', 'H', 'A']
    setGame({ ...newGame, word: tempWord, state: 'new' })
    console.log(`The word is ${tempWord.join('')}`)
    console.log(`The board has ${newGame.board.join(' ')}`)
  }

  function gameStatus(status: string | null, board: Array<String>) {
    if (status !== null && board.includes('_')) {
      return 'playing'
    } else if (status === 'playing' && !board.includes('_')) {
      return 'won'
    }
  }

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

  function consoleMessages() {
    console.log(`The letter is ${game.letter}`)
    console.log(`The word is ${game.word.join('')}`)
    console.log(`The board has ${game.board.join(' ')}`)
    console.log(`The state is ${game.state}`)
    console.log(`The numOfCorrectLetters is ${game.numOfCorrectLetters}`)
  }

  //function for 3 different button labels:
  // New Game, Restart Game, Play Again?

  return (
    <div>
      <main>
        <header>
          <h1>Snowman</h1>
          <h2>A Hangman-style game</h2>
          {/* Needs to be fixed to properly display for button */}
          <button onClick={handleNewGame}>
            {game.state === null ||
            game.state === 'new' ||
            game.state === 'playing'
              ? 'New Game'
              : 'Play Again?'}
          </button>
        </header>
        <section id="game-board">
          <div className="results-area">
            <div className="snowman-area">
              <div className={`snowman-pic${game.numOfCorrectLetters}`} />
            </div>
            <div className="revealed-area">
              <ul className="letters-revealed">
                {/* <li className={game.board[0] === '_' ? undefined : 'revealed'}>
                  {game.board[0]}
                </li> */}
                <li>{game.board[0]}</li>
                <li>{game.board[1]}</li>
                <li>{game.board[2]}</li>
                <li>{game.board[3]}</li>
                <li>{game.board[4]}</li>
                <li>{game.board[5]}</li>
                <li>{game.board[6]}</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="alphabet">
          <ul className="letters-list">
            {/* <button onClick={() => handleClickABCButton(0)}>A</button> */}
            {/* Cannot pass just a string/value, like 'A'??? */}
            <button id="A" onClick={() => handleClickABCButton('A')}>
              A
            </button>
            <button id="B" onClick={() => handleClickABCButton('B')}>
              B
            </button>
            <button id="C" onClick={() => handleClickABCButton('C')}>
              C
            </button>
            <button id="D" onClick={() => handleClickABCButton('D')}>
              D
            </button>
            <button id="E" onClick={() => handleClickABCButton('E')}>
              E
            </button>
            <button id="F" onClick={() => handleClickABCButton('F')}>
              F
            </button>
            <button id="G" onClick={() => handleClickABCButton('G')}>
              G
            </button>
            <button id="H" onClick={() => handleClickABCButton('H')}>
              H
            </button>
            <button id="I" onClick={() => handleClickABCButton('I')}>
              I
            </button>
            <button id="J" onClick={() => handleClickABCButton('J')}>
              J
            </button>
            <button id="K" onClick={() => handleClickABCButton('K')}>
              K
            </button>
            <button id="L" onClick={() => handleClickABCButton('L')}>
              L
            </button>
            <button id="M" onClick={() => handleClickABCButton('M')}>
              M
            </button>
            <button id="N" onClick={() => handleClickABCButton('N')}>
              N
            </button>
            <button id="O" onClick={() => handleClickABCButton('O')}>
              O
            </button>
            <button id="P" onClick={() => handleClickABCButton('P')}>
              P
            </button>
            <button id="Q" onClick={() => handleClickABCButton('Q')}>
              Q
            </button>
            <button id="R" onClick={() => handleClickABCButton('R')}>
              R
            </button>
            <button id="S" onClick={() => handleClickABCButton('S')}>
              S
            </button>
            <button id="T" onClick={() => handleClickABCButton('T')}>
              T
            </button>
            <button id="U" onClick={() => handleClickABCButton('U')}>
              U
            </button>
            <button id="V" onClick={() => handleClickABCButton('V')}>
              V
            </button>
            <button id="W" onClick={() => handleClickABCButton('W')}>
              W
            </button>
            <button id="X" onClick={() => handleClickABCButton('X')}>
              X
            </button>
            <button id="Y" onClick={() => handleClickABCButton('Y')}>
              Y
            </button>
            <button id="Z" onClick={() => handleClickABCButton('Z')}>
              Z
            </button>
          </ul>
        </section>
      </main>
    </div>
  )
}
