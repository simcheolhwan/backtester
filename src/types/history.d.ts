type Histories = { [key: string]: HistoryData }
type HistoryData = HistoryItem[]

interface HistoryItem {
  date: string
  open: number
}
