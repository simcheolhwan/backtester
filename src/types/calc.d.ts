interface DefaultParams {
  seed: number

  /** ISO (2000-01-01) */
  start: string

  /** ISO (2020-12-31) */
  end: string
}

interface SymbolParams extends DefaultParams {
  history: HistoryData
  frequency: Frequency
}

interface SavingParams extends DefaultParams {
  interest: number
}

/* result */
type Table = Row[]
interface Row {
  date: string
  principal: number
  stocks?: number
  value?: number
  balance?: number
}
