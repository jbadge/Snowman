import React from 'react'

type GameButtonProps = {
  gameState: string | null
  makeGame: () => void
}

export function GameButton({ gameState, makeGame }: GameButtonProps) {
  const button = document.getElementById('gameButton')

  function handleNewGameClick() {
    makeGame()
  }

  function buttonLabel() {
    if (gameState === null) {
      return 'New Game'
    } else if (gameState === 'new') {
      // Fade Out
      setTimeout(function () {
        button?.classList.add('elementToFadeOut')
        setTimeout(function () {
          button?.classList.add('hidden')
          return 'Restart Game'
        }, 1000)
      }, 1000)
      return 'New Game'
    } else if (gameState === 'playing') {
      // Fade In
      if (button?.classList.contains('hidden')) {
        setTimeout(function () {
          button?.classList.remove('hidden')
          button?.classList.remove('elementToFadeOut')
          button?.classList.add('elementToFadeIn')
        }, 1000)
        button?.classList.remove('elementToFadeIn')
      }
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
