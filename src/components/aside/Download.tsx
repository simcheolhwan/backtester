import React, { useState } from 'react'
import qs from 'qs'
import { DateTime } from 'luxon'

interface Props {
  symbol: string
  setSymbol: (symbol: string) => void
}

const Download = ({ symbol, setSymbol }: Props) => {
  const [start, setStart] = useState('2000')

  const getLink = () => {
    const url = `https://query1.finance.yahoo.com/v7/finance/download/${symbol}`
    const params = {
      period1: toSeconds(DateTime.fromISO(`${start}-01-01`)),
      period2: toSeconds(DateTime.local()),
      interval: '1mo',
      events: 'history'
    }

    return [url, qs.stringify(params)].join('?')
  }

  const valid = !!(symbol && start)

  return (
    <form onSubmit={undefined}>
      <div className="form-row">
        <div className="form-group col-6">
          <label htmlFor="symbol">Symbol</label>
          <input
            id="symbol"
            className="form-control"
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
          />
        </div>

        <div className="form-group col-6">
          <label htmlFor="start">Start Year</label>
          <input
            type="number"
            id="start"
            className="form-control"
            value={start}
            onChange={e => setStart(e.target.value)}
          />
        </div>
      </div>

      {valid ? (
        <a href={getLink()} className="btn btn-outline-primary" download>
          Download
        </a>
      ) : (
        <button className="btn btn-outline-primary" disabled>
          Download
        </button>
      )}
    </form>
  )
}

export default Download

/* helpers */
const toSeconds = (dt: DateTime) => Math.floor(dt.toMillis() / 1000)
