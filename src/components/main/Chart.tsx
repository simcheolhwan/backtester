import React, { useMemo, useRef, useState, useEffect } from 'react'
import ChartJS, { ChartOptions, helpers } from 'chart.js'
import { DateTime } from 'luxon'
import { SEED } from '../../constants'
import { useApp } from '../App'
import { useMain } from './Main'
import calc from './calc'
import { Type } from './helpers'
import { colors, getComparisonLabel } from './helpers'

const Chart = () => {
  const { histories } = useApp()
  const { comparisons, start } = useMain()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [key, setKey] = useState(0)

  /* 데이터 계산 */
  const sources = useMemo(() => {
    console.info('계산')
    setKey(k => k + 1)
    return comparisons.map(comparison => {
      const { type, symbol, frequency, interest } = comparison
      const defaultParams = {
        seed: SEED,
        start: `${start}-01-01`,
        end: DateTime.local().toISO()
      }

      const history = histories[symbol!]
      return {
        label: getComparisonLabel(comparison),
        table:
          type !== Type.I
            ? calc.symbol({ ...defaultParams, history, frequency: frequency! })
            : calc.saving({ ...defaultParams, interest: interest! })
      }
    })
  }, [comparisons, histories, start])

  /* 차트 그리기 */
  useEffect(() => {
    const init = (ctx: CanvasRenderingContext2D) => {
      new ChartJS(ctx, {
        type: 'line',
        options,
        data: {
          labels: sources[0]['table'].map(({ date }) => date),
          datasets: sources.map(({ label, table }, index) => ({
            ...properties,
            borderColor: colors[index],
            backgroundColor: opacity(colors[index]),
            label,
            data: table.map(row => row.value ?? row.balance)
          }))
        }
      })
    }

    const ctx = canvasRef.current?.getContext('2d')
    sources.length && ctx && init(ctx)
  }, [sources])

  return sources.length ? <canvas ref={canvasRef} key={key} /> : null
}

export default Chart

/* helpers */
const opacity = (color: string) =>
  helpers
    .color(color)
    .alpha(0.5)
    .rgbString()

/* constants */
const properties = {
  fill: false,
  borderWidth: 2,
  pointRadius: 0,
  pointHoverRadius: 0,
  lineTension: 0.1
}

const format = (v: any) => {
  const n = Number(v) / 1000
  const r =
    n > 1000
      ? Math.round(n / 100) * 100
      : n > 100
      ? Math.round(n / 10) * 10
      : Math.round(n / 1) * 1

  return r ? r + 'k' : 0
}

const options: ChartOptions = {
  animation: { duration: 0 },
  tooltips: {
    mode: 'index',
    intersect: false,
    caretSize: 0,
    callbacks: {
      title: ([{ label }]) => DateTime.fromISO(label!).toFormat('yyyy년 M월'),
      label: ({ datasetIndex, index }, { datasets }) => {
        const { label, data } = datasets![datasetIndex!]
        const value = format(data![index!])
        return [value, label].join(' ')
      }
    }
  },
  scales: {
    xAxes: [{ type: 'time', time: { unit: 'year' } }],
    yAxes: [{ ticks: { callback: format } }]
  }
}
