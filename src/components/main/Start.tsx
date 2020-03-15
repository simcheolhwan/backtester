import React, { FormEvent, useState } from 'react'
import { DateTime } from 'luxon'
import { getYear } from '../../utils'
import { useMain } from './Main'

const Start = ({ genesis }: { genesis: number }) => {
  const { start, setStart } = useMain()

  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStart(Number(value))
    setValue('')
    setIsOpen(false)
  }

  const now = getYear(DateTime.local().toISO())
  const valid = now >= Number(value) && Number(value) >= genesis

  return !isOpen ? (
    <button className="btn btn-link" onClick={() => setIsOpen(true)}>
      Time Period: {start}-{now}
    </button>
  ) : (
    <form className="mt-1" onSubmit={handleSubmit}>
      <div className="form-row align-items-center">
        <div className="col-auto">
          <input
            type="number"
            className="form-control"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>

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
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default Start
