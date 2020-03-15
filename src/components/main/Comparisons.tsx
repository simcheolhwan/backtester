import React, { useState } from 'react'
import AddComparison from './AddComparison'
import { useMain } from './Main'
import { getComparisonLabel } from './helpers'

export enum Type {
  S = 'symbol',
  I = 'saving'
}

export enum Frequency {
  M = 'monthly',
  Q = 'quaterly',
  Y = 'yearly'
}

export const Types = {
  [Type.S]: '심볼',
  [Type.I]: '저축'
}

export const Frequencies = {
  [Frequency.M]: '매월',
  [Frequency.Q]: '매분기',
  [Frequency.Y]: '매년'
}

const Comparisons = () => {
  const { comparisons, deleteComparison } = useMain()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="mt-2">
      <div className="card-group">
        {comparisons.map((item, index) => {
          const text = getComparisonLabel(item)
          return (
            <div className="card" key={text}>
              <div className="card-body">
                <p className="card-text">{text}</p>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => deleteComparison(index)}
                >
                  제거
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <button className="btn btn-light mt-2" onClick={() => setIsOpen(!isOpen)}>
        + Add comparison
      </button>

      {isOpen && <AddComparison onSubmit={() => setIsOpen(false)} />}
    </section>
  )
}

export default Comparisons
