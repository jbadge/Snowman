import React from 'react'

const step = 6

export function App() {
  return (
    <div>
      <main>
        <header>
          <h1>Snowman</h1>
          <h2>A Hangman-style game</h2>
        </header>
        <section id="game-board">
          <div className="results-area">
            <div className="snowman-area">
              <div className={`snowman-pic${step}`} />
            </div>
            <div className="revealed-area">
              <ul className="letters-revealed">
                <li className="pressed">C</li>
                <li className="pressed">A</li>
                <li className="pressed">U</li>
                <li className="pressed">T</li>
                <li>_</li>
                <li className="pressed">O</li>
                <li className="pressed">N</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="alphabet">
          <ul className="letters-list">
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
            <li>F</li>
            <li>G</li>
            <li>H</li>
            <li>I</li>
            <li>J</li>
            <li>K</li>
            <li>L</li>
            <li>M</li>
            <li>N</li>
            <li>O</li>
            <li>P</li>
            <li>Q</li>
            <li>R</li>
            <li>S</li>
            <li>T</li>
            <li>U</li>
            <li>V</li>
            <li>W</li>
            <li>X</li>
            <li>Y</li>
            <li>Z</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
