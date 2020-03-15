import React from 'react'
import { getYear } from '../../utils'
import { useApp } from '../App'

const Histories = () => {
  const { histories } = useApp()
  return (
    <article>
      <ul>
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
