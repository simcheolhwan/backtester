import calc from './calc'
import history from './calc.sample.json'
import { Frequency } from './helpers'

test('매월', () => {
  const input = {
    history,
    frequency: Frequency.M,
    seed: 1000,
    start: '2019-11-01',
    end: '2020-03-15'
  }

  const output = [
    { date: '2019-11-01', principal: 1000, stocks: 4, value: 1000 },
    { date: '2019-12-01', principal: 2000, stocks: 7, value: 2032 },
    { date: '2020-01-01', principal: 3000, stocks: 10, value: 3088 },
    { date: '2020-02-01', principal: 4000, stocks: 14, value: 4088 },
    { date: '2020-03-01', principal: 5000, stocks: 17, value: 4772 }
  ]

  expect(calc.symbol(input)).toEqual(output)
})

test('매분기', () => {
  const input = {
    history,
    frequency: Frequency.Q,
    seed: 1000,
    start: '2019-07-01',
    end: '2020-03-15'
  }

  const output = [
    { date: '2019-07-01' },
    { date: '2019-08-01' },
    { date: '2019-09-01', principal: 3000, stocks: 11, value: 3000 },
    { date: '2019-10-01', principal: 3000, stocks: 11, value: 3079 },
    { date: '2019-11-01', principal: 3000, stocks: 11, value: 3158 },
    { date: '2019-12-01', principal: 6000, stocks: 22, value: 6259 },
    { date: '2020-01-01', principal: 6000, stocks: 22, value: 6433 },
    { date: '2020-02-01', principal: 6000, stocks: 22, value: 6433 },
    { date: '2020-03-01', principal: 9000, stocks: 33, value: 8935 }
  ]

  expect(calc.symbol(input)).toEqual(output)
})

test('매년', () => {
  const input = {
    history,
    frequency: Frequency.Y,
    seed: 1000,
    start: '2018-01-01',
    end: '2020-03-15'
  }

  const output = [
    { date: '2018-01-01' },
    { date: '2018-02-01' },
    { date: '2018-03-01' },
    { date: '2018-04-01' },
    { date: '2018-05-01' },
    { date: '2018-06-01' },
    { date: '2018-07-01' },
    { date: '2018-08-01' },
    { date: '2018-09-01' },
    { date: '2018-10-01' },
    { date: '2018-11-01' },
    { date: '2018-12-01', principal: 12000, stocks: 47, value: 12000 },
    { date: '2019-01-01', principal: 12000, stocks: 47, value: 10553 },
    { date: '2019-02-01', principal: 12000, stocks: 47, value: 11580 },
    { date: '2019-03-01', principal: 12000, stocks: 47, value: 12000 },
    { date: '2019-04-01', principal: 12000, stocks: 47, value: 12187 },
    { date: '2019-05-01', principal: 12000, stocks: 47, value: 12607 },
    { date: '2019-06-01', principal: 12000, stocks: 47, value: 11767 },
    { date: '2019-07-01', principal: 12000, stocks: 47, value: 12700 },
    { date: '2019-08-01', principal: 12000, stocks: 47, value: 12747 },
    { date: '2019-09-01', principal: 12000, stocks: 47, value: 12420 },
    { date: '2019-10-01', principal: 12000, stocks: 47, value: 12747 },
    { date: '2019-11-01', principal: 12000, stocks: 47, value: 13074 },
    { date: '2019-12-01', principal: 24000, stocks: 88, value: 25494 },
    { date: '2020-01-01', principal: 24000, stocks: 88, value: 26200 },
    { date: '2020-02-01', principal: 24000, stocks: 88, value: 26200 },
    { date: '2020-03-01', principal: 24000, stocks: 88, value: 24171 }
  ]

  expect(calc.symbol(input)).toEqual(output)
})

test('복리', () => {
  const input = {
    interest: 8,
    seed: 1000,
    start: '2019-11-01',
    end: '2020-03-15'
  }

  const output = [
    { date: '2019-11-01', principal: 1000, balance: 1000 },
    { date: '2019-12-01', principal: 2000, balance: 2007 },
    { date: '2020-01-01', principal: 3000, balance: 3020 },
    { date: '2020-02-01', principal: 4000, balance: 4040 },
    { date: '2020-03-01', principal: 5000, balance: 5067 }
  ]

  expect(calc.saving(input)).toEqual(output)
})
