import React, { ButtonHTMLAttributes } from 'react'
import { useMain } from './Main'
import { getComparisonLabel } from './helpers'

const Comparisons = ({ onToggle }: { onToggle: () => void }) => {
  const { comparisons, deleteComparison } = useMain()

  return (
    <section className="mt-2">
      <div className="card-group">
        {comparisons.map((item, index) => {
          const text = getComparisonLabel(item)
          const button = {
            onClick: () => deleteComparison(index),
            children: '제거'
          }

          return <Card text={text} button={button} key={text} />
        })}

        <Card button={{ onClick: onToggle, children: '추가' }} />
      </div>
    </section>
  )
}

export default Comparisons

/* components */
interface Props {
  text?: string
  button: ButtonHTMLAttributes<HTMLButtonElement>
}

const Card = ({ text, button }: Props) => (
  <div className="card" key={text}>
    <div className="card-body p-1">
      <p className="card-text text-center">
        {text}
        <button className="btn btn-link btn-sm ml-1" {...button} />
      </p>
    </div>
  </div>
)
