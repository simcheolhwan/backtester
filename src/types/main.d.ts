interface Main {
  comparisons: Comparison[]
  start: number
  addComparison: (comparison: Comparison) => void
  deleteComparison: (index: number) => void
  setStart: (year: number) => void
}

interface Comparison {
  type: string
  symbol?: string
  frequency?: string
  interest?: number
}
