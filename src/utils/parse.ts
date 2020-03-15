export default (csv: string): HistoryData => {
  const lines = csv.split('\n').slice(1)
  return lines.map(parseLine).filter(({ open }) => !!open)
}

export const parseLine = (line: string): HistoryItem => {
  const [date, open] = line.split(',')
  return { date, open: Number(open) }
}
