import React, { FormEvent, useState } from 'react'
import numeral from 'numeral'
import { useApp } from '../App'
import { useMain } from './Main'
import { Type, Types, Frequency, Frequencies } from './helpers'
import { SEED } from '../../constants'

const AddComparison = ({ close }: { close: () => void }) => {
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

    const comparison = !isSaving
      ? { type, symbol, frequency }
      : { type, interest: Number(interest) }

    addComparison(comparison)
    close()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row align-items-center justify-content-end">
        <div className="col-auto text-muted">
          {getSeed(isSaving, frequency)}
        </div>

        <div className="col-auto">
          {Object.entries(Types).map(([key, label]) => (
            <div className="form-check form-check-inline" key={key}>
              <input
                type="radio"
                className="form-check-input"
                id={key}
                value={key}
                onChange={e => setType(e.target.value as Type)}
                checked={key === type}
                disabled={key !== Type.I && !entries.length}
              />
              <label className="form-check-label" htmlFor={key}>
                {label}
              </label>
            </div>
          ))}
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
                {Object.entries(Frequencies).map(([key, { label }]) => (
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
                autoFocus
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

          <button
            type="button"
            className="btn btn-outline-secondary ml-1"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddComparison

/* helper */
const getSeed = (isSaving: boolean, frequency: Frequency) => {
  const { label, times } = Frequencies[!isSaving ? frequency : Frequency.M]
  return `${label} $ ${numeral(SEED * times).format()}`
}
