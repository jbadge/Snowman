import React from 'react'

type GameButtonProps = {
  gameState: string | null
  makeGame: () => void
}

export function GameButton({ gameState, makeGame }: GameButtonProps) {
  function handleNewGameClick() {
    makeGame()
  }

  function buttonLabel() {
    if (gameState === null) {
      return 'New Game'
    } else if (gameState === 'new' || gameState === 'playing') {
      return 'Restart Game'
    } else {
      return 'Play Again?'
    }
  }

  return (
    <button id="gameButton" onClick={handleNewGameClick}>
      {buttonLabel()}
    </button>
  )
}
