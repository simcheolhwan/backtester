import React, { useState, useEffect, useMemo } from 'react'
import { equals, remove } from 'ramda'
import { createContext, getYear } from '../../utils'
import { useApp } from '../App'
import { Type, Comparison } from './helpers'
import Comparisons from './Comparisons'
import AddComparison from './AddComparison'
import Start from './Start'
import Chart from './Chart'

interface Main {
  comparisons: Comparison[]
  start: number
  addComparison: (comparison: Comparison) => void
  deleteComparison: (index: number) => void
  setStart: (year: number) => void
}

export const [useMain, MainProvider] = createContext<Main>()

const Main = () => {
  const initComparisons = () => {
    try {
      const local = localStorage.getItem('comparisons')
      return local ? JSON.parse(local) : []
    } catch {
      return []
    }
  }

  const initStart = () => {
    try {
      const local = localStorage.getItem('start')
      return local ? Number(local) : 2000
    } catch {
      return 2000
    }
  }

  const { histories } = useApp()
  const [comparisons, setComparisons] = useState<Comparison[]>(initComparisons)
  const [start, setStart] = useState<number>(initStart)
  const [isOpen, setIsOpen] = useState(false) // Add comparison

  /* 로컬스토리지 */
  useEffect(() => {
    localStorage.setItem('comparisons', JSON.stringify(comparisons))
    localStorage.setItem('start', String(start))
  }, [comparisons, start])

  /* 비교: 중복 걸러내기 */
  const addComparison = (comparison: Comparison) => {
    const valid = comparisons.every(c => !equals(c, comparison))
    valid && setComparisons(comparisons.concat(comparison))
  }

  const deleteComparison = (index: number) => {
    setComparisons(remove(index, 1, comparisons))
  }

  /* 시작: 새 데이터가 기존 선택한 시작 년도와 어긋나는 경우 조정 */
  const genesis = useMemo(() => {
    const years = comparisons
      .filter(({ type }) => type !== Type.I)
      .map(({ symbol }) => {
        const [{ date }] = histories[symbol!]
        return getYear(date)
      })

    return years.length && Math.min(...years)
  }, [comparisons, histories])

  useEffect(() => {
    start < genesis && setStart(genesis)
  }, [start, genesis])

  return (
    <MainProvider
      value={{ comparisons, start, addComparison, deleteComparison, setStart }}
    >
      <Comparisons onToggle={() => setIsOpen(!isOpen)} />

      <div className="d-flex justify-content-between mt-1 mb-1">
        <Start genesis={genesis} />
        {isOpen && <AddComparison close={() => setIsOpen(false)} />}
      </div>

      <Chart />
    </MainProvider>
  )
}

export default Main
