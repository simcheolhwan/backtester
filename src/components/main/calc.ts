import { last } from 'ramda'
import { DateTime } from 'luxon'
import { Frequency, Frequencies } from './helpers'

interface DefaultParams {
  seed: number

  /** ISO (2000-01-01) */
  start: string

  /** ISO (2020-12-31) */
  end: string
}

const FMT = 'yyyy-MM-dd'

/* 주식 */
interface SymbolParams extends DefaultParams {
  history: HistoryData
  frequency: Frequency
}

const symbol = (params: SymbolParams): Table => {
  const { seed, history, frequency, start, end } = params
  const findPrice = (date: string): number | undefined => {
    const result = history.find(item => item.date === date)
    return result?.open
  }

  const calc = (acc: Table, date: string): Table => {
    const { month } = DateTime.fromISO(date)
    const { times } = Frequencies[frequency]
    const r = !(month % times) ? times : 0
    const money = seed * r

    const prev = last(acc)
    const price = findPrice(date)
    const stocks = (prev?.stocks ?? 0) + (price ? money / price : 0)
    const row = {
      date,
      stocks,
      principal: (prev?.principal ?? 0) + money,
      value: (price ?? 0) * stocks
    }

    const table = [...acc, row]
    const nextDT = DateTime.fromISO(date).plus({ months: 1 })
    const endDT = DateTime.fromISO(end)
    return nextDT < endDT ? calc(table, nextDT.toFormat(FMT)) : table
  }

  return round(calc([], start))
}

/* 복리 */
interface SavingParams extends DefaultParams {
  interest: number
}

const saving = ({ seed, interest, start, end }: SavingParams): Table => {
  const calc = (acc: Table, date: string): Table => {
    const prev = last(acc)
    const row = {
      date,
      principal: (prev?.principal ?? 0) + seed,
      balance: ((prev?.balance ?? 0) * (100 + interest / 12)) / 100 + seed
    }

    const table = [...acc, row]
    const nextDT = DateTime.fromISO(date).plus({ months: 1 })
    const endDT = DateTime.fromISO(end)
    return nextDT < endDT ? calc(table, nextDT.toFormat(FMT)) : table
  }

  return round(calc([], start))
}

export default { symbol, saving }

/* helpers */
const round = (table: Table): Table =>
  table.map(({ principal, stocks, value, balance, ...rest }) =>
    Object.assign(
      {},
      rest,
      !!principal && { principal: Math.round(principal) },
      !!stocks && { stocks: Math.round(stocks) },
      !!value && { value: Math.round(value) },
      !!balance && { balance: Math.round(balance) }
    )
  )
