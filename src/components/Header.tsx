import React from 'react'
import { GameButton } from './GameButton'

type HeaderProps = {
  gameState: string | null
  makeGame: () => void
}

export function Header({ gameState, makeGame }: HeaderProps) {
  return (
    <header>
      <h1>Snowman</h1>
      <h2 id="banner">A Hangman-Style Game</h2>
      <GameButton gameState={gameState} makeGame={makeGame} />
    </header>
  )
}
