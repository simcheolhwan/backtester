interface App {
  histories: Histories
  addHistory: (symbol: string, history: HistoryData) => void
}
