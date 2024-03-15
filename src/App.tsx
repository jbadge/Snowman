import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { GameBoard } from './components/GameBoard'
import { Alphabet } from './components/Alphabet'
import words from './words.json'
import FadeIn from 'react-fade-in'

type Board = string[]

type Game = {
  letter: null | string
  word: string[]
  board: Board
  state: string | null
  numOfCorrectLetters: number
  numOfMisses: number
}

// TESTMODE: 0 to turn off, 1 to turn on
let testMode = 0

export function App() {
  const initialState = {
    letter: null,
    word: [],
    board: ['_', '_', '_', '_', '_', '_', '_'],
    state: null,
    numOfCorrectLetters: 0,
    numOfMisses: 0,
  }
  const winnerElement = document.getElementById('winner')
  const loserElement = document.getElementById('loser')
  const bannerElement = document.getElementById('banner')
  const snowElement = document.getElementById('snow')
  const imageElement = document.getElementById('image')
  const imageElement2 = document.getElementById('image2')

  const [snowmanPicCount, setSnowmanPicCount] = useState(0)
  const [game, setGame] = useState<Game>({ ...initialState })

  useEffect(() => {
    toggleButton(game)
  }, [game])

  function pushAlphaButton(value: string) {
    let numOfLettersInWord = 0
    let numOfTries = 0

    if (game.state === null) {
      return
    }
    const tempBoard = [...game.board]
    if (game.word.includes(value)) {
      for (let i in game.word) {
        if (game.word[i] === value) {
          tempBoard[i] = game.word[i]
          numOfLettersInWord++
        }
      }
    } else {
      numOfTries++
    }

    let tempCorrect = game.numOfCorrectLetters + numOfLettersInWord
    let tempMisses = game.numOfMisses + numOfTries
    let tempState = gameStatus(game.state, tempBoard, tempMisses, tempCorrect)

    setSnowmanPicCount(game.numOfMisses + numOfTries)

    setGame({
      ...game,
      letter: value,
      board: tempBoard,
      numOfCorrectLetters: game.numOfCorrectLetters + numOfLettersInWord,
      numOfMisses: game.numOfMisses + numOfTries,
      state: tempState!,
    })
  }

  function makeGame() {
    // TESTMODE: Resets word being displayed in the heading
    if (bannerElement instanceof HTMLHeadingElement && testMode === 1) {
      bannerElement.innerHTML = 'A Hangman-Style Game'
    }

    // Hides all elements to reset to beginning
    if (game.state === 'won' || game.state === 'lost') {
      snowElement?.classList.remove('elementToFadeInSnow')
      snowElement?.classList.add('elementToFadeOutSnow')
      winnerElement?.classList.add('elementToFadeOut')
      loserElement?.classList.add('elementToFadeOut')
      imageElement?.classList.add('elementToFadeOut')
      imageElement2?.classList.remove('hidden')
      imageElement2?.classList.add('elementToFadeIn')
      setTimeout(function () {
        winnerElement?.classList.add('hidden')
        loserElement?.classList.add('hidden')
        imageElement?.classList.remove('elementToFadeOut')
        setSnowmanPicCount(0)
        setTimeout(function () {
          snowElement?.classList.add('hidden')
          snowElement?.classList.remove('elementToFadeOutSnow')
          winnerElement?.classList.remove('elementToFadeOut')
          loserElement?.classList.remove('elementToFadeOut')
          imageElement?.classList.remove('elementToFadeIn')
        }, 4000)
      }, 1000)
    }

    const newGame = { ...initialState }

    let tempState = 'new'
    let tempWord = words[Math.floor(Math.random() * 1024)]
      .toUpperCase()
      .split('')
    setGame({ ...newGame, word: tempWord, state: tempState })

    // TESTMODE: Helper for debugging
    if (testMode === 1) {
      console.log(`The word is ${tempWord.join('')}`)
      console.log(`The state is ${tempState}`)
    }
  }

  function gameStatus(
    status: string | null,
    checkBoard: Array<String>,
    misses: number,
    correct: number
  ) {
    // New or In-Progress Game
    if (status !== null && checkBoard.includes('_') && misses < 7) {
      if (bannerElement instanceof HTMLHeadingElement && testMode === 1) {
        bannerElement.innerHTML = `The word is ${game.word.join('')}`
      }
      // Starts the snow falling
      if (misses > 2 || correct > 2) {
        snowElement?.classList.add('elementToFadeInSnow')
        snowElement?.classList.remove('hidden')
      }
      return 'playing'
    }
    // Won Game
    else if (status === 'playing' && !checkBoard.includes('_')) {
      winnerElement?.classList.remove('hidden')
      return 'won'
    }
    // Lost Game
    else if (status === 'playing' && misses > 6) {
      loserElement?.classList.remove('hidden')
      return 'lost'
    }
  }

  function toggleButton(tempGame: Game) {
    console.log(
      `The state of the game is ${tempGame.state} and the game letter is ${tempGame.letter}`
    )
    // Disable single button
    if (
      (tempGame.state === 'playing' || tempGame.state === 'new') &&
      tempGame.letter !== '' &&
      tempGame.letter !== null
    ) {
      const button = document.getElementById(tempGame.letter)
      button?.setAttribute('disabled', 'true')

      // Disable ALL buttons
    } else if (tempGame.state === 'won' || tempGame.state === 'lost') {
      const newGameButton = document.getElementById('gameButton')
      const buttons = document.querySelectorAll('button')
      buttons.forEach((button) => {
        button.setAttribute('disabled', 'true')
      })
      newGameButton?.removeAttribute('disabled')
    }
    // Enable ALL buttons
    else if (tempGame.state === 'new' && tempGame.letter === null) {
      const buttons = document.querySelectorAll('button')
      buttons.forEach((button) => {
        button.removeAttribute('disabled')
      })
    }
  }

  return (
    <main>
      <FadeIn transitionDuration={700}>
        <Header gameState={game.state} makeGame={makeGame} />
        <GameBoard gameBoard={game.board} picCount={snowmanPicCount} />
        <Alphabet pushAlphaButton={pushAlphaButton} />
      </FadeIn>
    </main>
  )
}
