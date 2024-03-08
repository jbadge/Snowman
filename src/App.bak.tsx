import React, { useState } from 'react'
import words from './words.json'

// should this go here/is this how i should have this?
let step = 0

type Board = string[]

type Game = {
  letter: null | string
  word: string[]
  board: Board
  state: null | 'new' | 'playing' | 'won'
  // May have to treat like "Difficulty"
  numOfCorrectLetters: null | number
}

const initialState = {
  letter: null,
  word: [],
  board: ['_', '_', '_', '_', '_', '_', '_'],
  state: null,
  numOfCorrectLetters: null,
}

export function App() {
  const [game, setGame] = useState<Game>({
    letter: null,
    word: [],
    board: ['_', '_', '_', '_', '_', '_', '_'],
    state: null,
    numOfCorrectLetters: null,

    // numOfLetter:7
  })

  function handleClickABCButton(value: string) {
    console.log('Running handleClickABCButton')
    if (game.state === null) {
      return
    }
    disableButton(value)
    let count = 0
    let tempArray = game.board
    // apparently this is also not updating!??
    // setGame({ ...game, letter: value })
    if (game.word.includes(value)) {
      for (let i in game.word) {
        if (game.word[i] === value) {
          tempArray[i] = game.word[i]
          count++
        }
      }
    }
    step += count
    console.log(`The variable step is at ${step}`)
    // numOfCorrectLetters is not updating
    // I guess the below board wasn't being set here!!
    // setGame({ ...game, board: tempArray, numOfCorrectLetters: step })
    // or should I put the change to game state in above setGame?
    // setGame({ ...game, numOfCorrectLetters: step })
    gameStatus(game.state)
    console.log(`The letter is ${game.letter}`)
    console.log(`The word is ${game.word.join('')}`)
    console.log(`The board has ${game.board.join(' ')}`)
    console.log(`The state is ${game.state}`)
    console.log(`The numOfCorrectLetters is ${game.numOfCorrectLetters}`)
  }

  // currently seems to set it back to initial, but not continue new game
  // RESET Does not seem to make the board fresh, but does reset the rest
  function resetGame() {
    console.log('Running resetGame')

    // enable all buttons -- Seems to work
    enableButtons()
    // re-set the game state -- Does not reset the picture, at the very least
    // re-hide all the letter -- seems to mostly work
    setGame({ ...initialState })
    console.log(game)
    console.log(initialState)
  }

  // New Game DOES seem to refresh the entire object
  async function handleNewGame() {
    console.log('Running handleNewGame')

    // Resetting game does not seem to be working fully, 100% of the time

    // If there is a game in progress, and the button is clicked, reset
    // 3/7/24 4:46pm commented out but seemed necessary to work, yesterday, 3/6/24
    // if (game.state !== null) {
    //   resetGame()
    // } else {
    // if there is a new game with null state, follow this
    // game.word
    console.log(game)
    let tempWord = words[Math.floor(Math.random() * 1024)]
      .toUpperCase()
      .split('')
    // TEST WORD WITH 2 OF SAME LETTER
    // game.word = ['L', 'E', 'I', 'E', 'G', 'H', 'A']
    setGame({ ...game, word: tempWord, state: 'new' })
    console.log(tempWord)
    console.log(`The word is ${tempWord.join('')}`)
    console.log(`The board has ${game.board.join(' ')}`)
    console.log(game)
    // }
  }

  function gameStatus(status: string | null) {
    console.log('Running gameStatus')

    if (status !== null && game.board.includes('_')) {
      status = 'playing'
    } else if (!game.board.includes('_')) {
      // do something if won? display cool message or something?
      status = 'won'
    }
    setGame({ ...game, state: game.state })
  }

  // Disabling/Re-enabling seems to be working fine
  function disableButton(letter: string) {
    console.log('Running disableButton')

    const button = document.getElementById(letter)
    button?.setAttribute('disabled', 'true')
  }

  function enableButtons() {
    console.log('Running enableButtons')

    const buttons = document.querySelectorAll('button')
    buttons.forEach((button) => {
      button.removeAttribute('disabled')
    })
  }

  // testing helper function
  function checkGameState() {
    console.log('Running checkGameState')

    console.log(game)
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
          <button onClick={resetGame}>Reset?</button>
          <button onClick={checkGameState}>Check Game State</button>
        </header>
        <section id="game-board">
          <div className="results-area">
            <div className="snowman-area">
              <div className={`snowman-pic${step}`} />
            </div>
            <div className="revealed-area">
              <ul className="letters-revealed">
                <li className={game.board[0] === '_' ? undefined : 'revealed'}>
                  {game.board[0]}
                </li>
                <li className={game.board[1] === '_' ? undefined : 'revealed'}>
                  {game.board[1]}
                </li>
                <li className={game.board[2] === '_' ? undefined : 'revealed'}>
                  {game.board[2]}
                </li>
                <li className={game.board[3] === '_' ? undefined : 'revealed'}>
                  {game.board[3]}
                </li>
                <li className={game.board[4] === '_' ? undefined : 'revealed'}>
                  {game.board[4]}
                </li>
                <li className={game.board[5] === '_' ? undefined : 'revealed'}>
                  {game.board[5]}
                </li>
                <li className={game.board[6] === '_' ? undefined : 'revealed'}>
                  {game.board[6]}
                </li>
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
