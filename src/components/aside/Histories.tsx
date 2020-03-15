import React from 'react'
import { getYear } from '../../utils'
import { useApp } from '../App'

const Histories = () => {
  const { histories } = useApp()
  return (
    <article className="mt-4">
      <h2>Saved List</h2>
      <ul className="list-unstyled">
        {Object.entries(histories).map(([symbol, [{ date }]]) => (
          <li key={symbol}>
            {symbol} ({getYear(date)})
          </li>
        ))}
      </ul>
    </article>
  )
}

export default Histories
