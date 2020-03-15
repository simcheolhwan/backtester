import React, { useMemo, useRef, useEffect } from 'react'
import ChartJS, { ChartOptions } from 'chart.js'
import { DateTime } from 'luxon'
import { SEED } from '../../constants'
import { useApp } from '../App'
import { useMain } from './Main'
import calc from './calc'
import { Type } from './Comparisons'
import { getComparisonLabel } from './helpers'

const Chart = () => {
  const { histories } = useApp()
  const { comparisons, start } = useMain()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* 데이터 계산 */
  const sources = useMemo(() => {
    console.info('계산')
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
          datasets: sources.map(({ label, table }) => ({
            ...properties,
            label,
            data: table.map(row => row.value ?? row.balance)
          }))
        }
      })
    }

    const ctx = canvasRef.current?.getContext('2d')
    sources.length && ctx && init(ctx)
  }, [sources])

  return sources.length ? <canvas ref={canvasRef} /> : null
}

export default Chart

/* helpers */
const properties = { borderWidth: 1, pointRadius: 0, pointHoverRadius: 0 }
const options: ChartOptions = {
  animation: { duration: 0 },
  tooltips: { mode: 'index', intersect: false },
  scales: { xAxes: [{ type: 'time' }] }
}
