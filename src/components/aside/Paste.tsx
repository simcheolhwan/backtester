import React, { FormEvent, useState } from 'react'
import classNames from 'classnames'
import { parse } from '../../utils'
import styles from './Paste.module.scss'
import { useApp } from '../App'

const Paste = ({ symbol }: { symbol: string }) => {
  const { addHistory } = useApp()
  const [data, setData] = useState('')
  const history = parse(data)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addHistory(symbol, history)
    setData('')
  }

  const valid = !!history.length

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h2>Paste csv</h2>
      <div className="form-group">
        <textarea
          className={classNames('form-control', styles.textarea)}
          value={data}
          onChange={e => setData(e.target.value)}
        />
      </div>

      {valid && (
        <div className="card bg-light mb-3">
          <pre className="card-body mb-0 p-1">
            <ul className={classNames('list-unstyled mb-0', styles.preview)}>
              {parse(data).map(({ date, open }) => (
                <li key={date}>
                  <strong className="mr-1">{date}</strong>
                  <span>{open}</span>
                </li>
              ))}
            </ul>
          </pre>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={!valid}
      >
        Add {symbol}
      </button>
    </form>
  )
}

export default Paste
