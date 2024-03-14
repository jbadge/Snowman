import React from 'react'
import FadeIn from 'react-fade-in'
import { v4 as uuidv4 } from 'uuid'
import snow from '../../images/transparent_images/snow.gif'
import step_1 from '../../images/transparent_images/step_1.png'
import step_2 from '../../images/transparent_images/step_2.png'
import step_3 from '../../images/transparent_images/step_3.png'
import step_4 from '../../images/transparent_images/step_4.png'
import step_5 from '../../images/transparent_images/step_5.png'
import step_6 from '../../images/transparent_images/step_6.png'
import step_7 from '../../images/transparent_images/step_7.png'

type GameBoardProps = {
  gameBoard: string[]
  picCount: number
}

const snowmanPicArray = [step_1, step_2, step_3, step_4, step_5, step_6, step_7]

export function GameBoard({ gameBoard, picCount }: GameBoardProps) {
  return (
    <section id="game-board">
      <div className="results-area">
        <FadeIn delay={150} transitionDuration={700}>
          <div className="snowman-area">
            <iframe id="snow" className="gif hidden" src={snow}></iframe>
            <img
              id="image"
              src={snowmanPicArray[picCount]}
              alt="Image of snowman"
            />
            <svg id="winner" className="text hidden" viewBox="0 0 130 50">
              <path
                id="curve"
                fill="transparent"
                d="M 6.377 40.098 C 52.771 23.525 86.934 31.201 123.769 40.729"
              />
              <text>
                <textPath startOffset="20" href="#curve">
                  You Won!
                </textPath>
              </text>
            </svg>
          </div>
          <div className="revealed-area">
            <ul className="letters-revealed">
              {gameBoard.map((boardIndex) => {
                return <li key={uuidv4()}>{boardIndex}</li>
              })}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
