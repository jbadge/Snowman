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

export function App() {
  const banner = document.querySelector('h2')
  const [snowmanPicCount, setSnowmanPicCount] = useState(0)
  const [game, setGame] = useState<Game>({ ...initialState })

  function pushAlphaButton(value: string) {
    let count = 0
    toggleButton(value)

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
    if (snowmanPicCount < 6) {
      setSnowmanPicCount(game.numOfCorrectLetters + count)
    }

    setGame({
      ...game,
      letter: value,
      board: tempBoard,
      numOfCorrectLetters: game.numOfCorrectLetters + count,
      state: tempState!,
    })
  }

  async function makeGame() {
    if (banner instanceof HTMLHeadingElement) {
      banner.innerHTML = 'A Hangman-Style Game'
    }
    document.getElementById('snow')?.classList.add('hidden')
    document.getElementById('snow')?.classList.remove('won')

    setSnowmanPicCount(0)
    toggleButton()
    const newGame = { ...initialState }
    let tempWord = words[Math.floor(Math.random() * 1024)]
      .toUpperCase()
      .split('')
    setGame({ ...newGame, word: tempWord, state: 'new' })
    document.getElementById('gameButton')?.classList.add('hidden')
    console.log(`The word is ${tempWord.join('')}`)
  }

  function gameStatus(status: string | null, board: Array<String>) {
    if (status !== null && board.includes('_')) {
      document.getElementById('gameButton')?.classList.remove('hidden')
      return 'playing'
    } else if (status === 'playing' && !board.includes('_')) {
      document.getElementById('snow')?.classList.remove('hidden')
      document.getElementById('snow')?.classList.add('won')
      if (banner instanceof HTMLHeadingElement) {
        banner.innerHTML = 'You won!'
      }
      return 'won'
    }
  }

  function toggleButton(letter: string = '') {
    if (letter !== '') {
      const button = document.getElementById(letter)
      button?.setAttribute('disabled', 'true')
    } else {
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

const initialState = {
  letter: null,
  word: [],
  board: ['_', '_', '_', '_', '_', '_', '_'],
  state: null,
  numOfCorrectLetters: 0,
}
