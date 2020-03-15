import React, { useState } from 'react'
import Download from './Download'
import Paste from './Paste'
import Histories from './Histories'

const History = () => {
  const [symbol, setSymbol] = useState('QQQ')

  return (
    <aside className="mt-2">
      <h1>Historical Data</h1>
      <Download symbol={symbol} setSymbol={setSymbol} />
      <Paste symbol={symbol} />
      <Histories />
    </aside>
  )
}

export default History
