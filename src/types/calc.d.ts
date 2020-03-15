/* result */
type Table = Row[]
interface Row {
  date: string
  principal: number
  stocks?: number
  value?: number
  balance?: number
}
