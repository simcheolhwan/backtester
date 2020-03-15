import { Type, Frequency, Types, Frequencies } from './Comparisons'

export const getComparisonLabel = ({
  type,
  symbol,
  frequency,
  interest
}: Comparison) =>
  [
    type === Type.I && Types[type as Type],
    symbol,
    Frequencies[frequency as Frequency],
    interest && `(복리 ${interest}%)`
  ]
    .filter(Boolean)
    .join(' ')
