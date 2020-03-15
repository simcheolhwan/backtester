/* types */
export enum Type {
  S = 'symbol',
  I = 'saving'
}

export enum Frequency {
  M = 'monthly',
  Q = 'quaterly',
  Y = 'yearly'
}

export interface Comparison {
  type: Type
  symbol?: string
  frequency?: Frequency
  interest?: number
}

/* contants */
export const Types = {
  [Type.S]: '투자',
  [Type.I]: '저축'
}

export const Frequencies = {
  [Frequency.M]: { times: 1, label: '매월' },
  [Frequency.Q]: { times: 3, label: '매분기' },
  [Frequency.Y]: { times: 12, label: '매년' }
}

/* 비교 레이블 */
export const getComparisonLabel = ({
  type,
  symbol,
  frequency,
  interest
}: Comparison) =>
  [
    type === Type.I
      ? Types[type as Type]
      : Frequencies[frequency as Frequency]['label'],
    symbol,
    interest && `(복리 ${interest}%)`
  ]
    .filter(Boolean)
    .join(' ')

/* 랜덤 색상 */
const clrs = {
  blue: '#0074D9',
  olive: '#3D9970',
  red: '#FF4136',
  navy: '#001F3F',
  orange: '#FF851B',
  maroon: '#85144B',
  black: '#111111'
}

export const colors = Object.values(clrs)
