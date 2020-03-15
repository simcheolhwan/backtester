import { last } from 'ramda'
import { DateTime } from 'luxon'
import { Frequency } from './Comparisons'

/* 주식 */
const symbol = (params: SymbolParams): Table => {
  const { seed, history, frequency, start, end } = params
  const findPrice = (date: string): number | undefined => {
    const result = history.find(item => item.date === date)
    return result?.open
  }

  const calc = (acc: Table, date: string): Table => {
    const { month } = DateTime.fromISO(date)
    const r =
      (frequency === Frequency.Y
        ? month % 12 === 1 && 12
        : frequency === Frequency.Q
        ? month % 3 === 1 && 3
        : 1) || 0

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
    const next = DateTime.fromISO(date).plus({ months: 1 })
    const now = DateTime.fromISO(end)
    return next < now ? calc(table, next.toFormat('yyyy-MM-dd')) : table
  }

  return round(calc([], start))
}

/* 복리 */
const saving = ({ seed, interest, start, end }: SavingParams): Table => {
  const calc = (acc: Table, date: string): Table => {
    const prev = last(acc)
    const row = {
      date,
      principal: (prev?.principal ?? 0) + seed,
      balance: ((prev?.balance ?? 0) * (100 + interest / 12)) / 100 + seed
    }

    const table = [...acc, row]
    const next = DateTime.fromISO(date).plus({ months: 1 })
    const now = DateTime.fromISO(end)
    return next < now ? calc(table, next.toFormat('yyyy-MM-dd')) : table
  }

  return round(calc([], start))
}

export default { symbol, saving }

/* helpers */
const round = (table: Table): Table =>
  table.map(({ stocks, value, balance, ...rest }) =>
    Object.assign(
      {},
      rest,
      stocks && { stocks: Math.round(stocks) },
      value && { value: Math.round(value) },
      balance && { balance: Math.round(balance) }
    )
  )
