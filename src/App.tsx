import { Header } from './components/Header'
import React, { useState } from 'react'
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
}

let testMode = 0
export function App() {
  const initialState = {
    letter: null,
    word: [],
    board: ['_', '_', '_', '_', '_', '_', '_'],
    state: null,
    numOfCorrectLetters: 0,
  }
  const winnerElement = document.getElementById('winner')
  const bannerElement = document.getElementById('banner')
  const snowElement = document.getElementById('snow')
  const imageElement = document.getElementById('image')
  const imageElement2 = document.getElementById('image2')

  const [snowmanPicCount, setSnowmanPicCount] = useState(0)
  const [game, setGame] = useState<Game>({ ...initialState })

  function pushAlphaButton(value: string) {
    let numOfLettersInWord = 0
    toggleButton(value)

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
    }

    let tempState = gameStatus(game.state, tempBoard)
    if (snowmanPicCount < 7) {
      setSnowmanPicCount(game.numOfCorrectLetters + numOfLettersInWord)
    }

    setGame({
      ...game,
      letter: value,
      board: tempBoard,
      numOfCorrectLetters: game.numOfCorrectLetters + numOfLettersInWord,
      state: tempState!,
    })
  }

  async function makeGame() {
    // Resets word being displayed in the heading in testMode
    if (bannerElement instanceof HTMLHeadingElement && testMode === 1) {
      bannerElement.innerHTML = 'A Hangman-Style Game'
    }

    // Hides the snow, the win, and the snowman
    if (!snowElement?.classList.contains('hidden')) {
      snowElement?.classList.remove('elementToFadeInSnow')
      snowElement?.classList.add('elementToFadeOutSnow')
      winnerElement?.classList.add('elementToFadeOut')
      imageElement?.classList.add('elementToFadeOut')
      imageElement2?.classList.remove('hidden')
      imageElement2?.classList.add('elementToFadeIn')

      setTimeout(function () {
        winnerElement?.classList.add('hidden')
        imageElement?.classList.remove('elementToFadeOut')
        setSnowmanPicCount(0)
        setTimeout(function () {
          snowElement?.classList.add('hidden')
          snowElement?.classList.remove('elementToFadeOutSnow')
          winnerElement?.classList.remove('elementToFadeOut')
          imageElement?.classList.remove('elementToFadeIn')
        }, 4000)
      }, 1000)
    }

    toggleButton()
    const newGame = { ...initialState }

    let tempWord = words[Math.floor(Math.random() * 1024)]
      .toUpperCase()
      .split('')
    setGame({ ...newGame, word: tempWord, state: 'new' })

    // Helper for debugging
    if (testMode === 1) {
      console.log(`The word is ${tempWord.join('')}`)
    }
  }

  function gameStatus(status: string | null, board: Array<String>) {
    // New Game
    if (status !== null && board.includes('_')) {
      if (bannerElement instanceof HTMLHeadingElement && testMode === 1) {
        bannerElement.innerHTML = `The word is ${game.word.join('')}`
      }
      return 'playing'
      // Won Game
    } else if (status === 'playing' && !board.includes('_')) {
      snowElement?.classList.add('elementToFadeInSnow')
      winnerElement?.classList.remove('hidden')
      snowElement?.classList.remove('hidden')
      return 'won'
    }
  }

  function toggleButton(letter: string = '') {
    // Disable button
    if (letter !== '') {
      const button = document.getElementById(letter)
      button?.setAttribute('disabled', 'true')
    } else {
      // Enable button
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
