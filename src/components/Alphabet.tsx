import React from 'react'

type AlphabetProps = {
  pushAlphaButton: (_value: string) => void
}

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

export function Alphabet({ pushAlphaButton }: AlphabetProps) {
  function handleClickABCButton(value: string) {
    pushAlphaButton(value)
  }
  return (
    <section id="alphabet">
      {letters.map((letter) => {
        return (
          <button
            key={letter.toString()}
            id={letter}
            className="abcLetter"
            onClick={() => handleClickABCButton(letter)}
          >
            {letter}
          </button>
        )
      })}
    </section>
  )
}
