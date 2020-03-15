import React, { FormEvent, useState } from 'react'
import numeral from 'numeral'
import { useApp } from '../App'
import { useMain } from './Main'
import { Type, Types, Frequency, Frequencies } from './Comparisons'
import { SEED } from '../../constants'

const AddComparison = ({ onSubmit }: { onSubmit: () => void }) => {
  const { histories } = useApp()
  const { addComparison } = useMain()
  const entries = Object.entries(histories)

  const [type, setType] = useState<Type>(entries.length ? Type.S : Type.I)
  const [symbol, setSymbol] = useState('')
  const [frequency, setFrequency] = useState<Frequency>(Frequency.M)
  const [interest, setInterest] = useState('')

  const isSaving = type === Type.I
  const valid = !isSaving ? !!symbol : !!interest

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addComparison(
      !isSaving
        ? { type, symbol, frequency }
        : { type, interest: Number(interest) }
    )
    onSubmit()
  }

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div className="form-row align-items-center">
        <div className="col-auto">
          <select
            className="form-control"
            value={type}
            onChange={e => setType(e.target.value as Type)}
          >
            {Object.entries(Types).map(([key, label]) => (
              <option
                value={key}
                key={key}
                disabled={key !== Type.I && !entries.length}
              >
                {label}
              </option>
            ))}
          </select>
        </div>

        {!isSaving ? (
          <>
            <div className="col-auto">
              <select
                className="form-control"
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
              >
                <option value="" disabled>
                  Select a symbol...
                </option>

                {entries.map(([symbol]) => (
                  <option value={symbol} key={symbol}>
                    {symbol}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-auto">
              <select
                className="form-control"
                value={frequency}
                onChange={e => setFrequency(e.target.value as Frequency)}
              >
                {Object.entries(Frequencies).map(([key, label]) => (
                  <option value={key} key={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <div className="col-auto">
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={interest}
                onChange={e => setInterest(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">%</div>
              </div>
            </div>
          </div>
        )}

        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-outline-primary"
            disabled={!valid}
          >
            Submit
          </button>
        </div>

        <div className="col-auto text-muted">
          {!isSaving ? Frequencies[frequency] : Frequencies[Frequency.M]} ${' '}
          {numeral(SEED).format()}
        </div>
      </div>
    </form>
  )
}

export default AddComparison
