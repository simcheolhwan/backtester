import calc from './calc'
import history from './calc.sample.json'
import { Frequency } from './Comparisons'

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
    { date: '2019-07-01', principal: 3000, stocks: 11, value: 3000 },
    { date: '2019-08-01', principal: 3000, stocks: 11, value: 3011 },
    { date: '2019-09-01', principal: 3000, stocks: 11, value: 2934 },
    { date: '2019-10-01', principal: 6000, stocks: 22, value: 6011 },
    { date: '2019-11-01', principal: 6000, stocks: 22, value: 6165 },
    { date: '2019-12-01', principal: 6000, stocks: 22, value: 6363 },
    { date: '2020-01-01', principal: 9000, stocks: 32, value: 9539 },
    { date: '2020-02-01', principal: 9000, stocks: 32, value: 9539 },
    { date: '2020-03-01', principal: 9000, stocks: 32, value: 8801 }
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
    { date: '2018-01-01', principal: 12000, stocks: 49, value: 12000 },
    { date: '2018-02-01', principal: 12000, stocks: 49, value: 12585 },
    { date: '2018-03-01', principal: 12000, stocks: 49, value: 12146 },
    { date: '2018-04-01', principal: 12000, stocks: 49, value: 11756 },
    { date: '2018-05-01', principal: 12000, stocks: 49, value: 11805 },
    { date: '2018-06-01', principal: 12000, stocks: 49, value: 12195 },
    { date: '2018-07-01', principal: 12000, stocks: 49, value: 12049 },
    { date: '2018-08-01', principal: 12000, stocks: 49, value: 12585 },
    { date: '2018-09-01', principal: 12000, stocks: 49, value: 12976 },
    { date: '2018-10-01', principal: 12000, stocks: 49, value: 13073 },
    { date: '2018-11-01', principal: 12000, stocks: 49, value: 12146 },
    { date: '2018-12-01', principal: 12000, stocks: 49, value: 12537 },
    { date: '2019-01-01', principal: 24000, stocks: 102, value: 23024 },
    { date: '2019-02-01', principal: 24000, stocks: 102, value: 25266 },
    { date: '2019-03-01', principal: 24000, stocks: 102, value: 26183 },
    { date: '2019-04-01', principal: 24000, stocks: 102, value: 26590 },
    { date: '2019-05-01', principal: 24000, stocks: 102, value: 27507 },
    { date: '2019-06-01', principal: 24000, stocks: 102, value: 25673 },
    { date: '2019-07-01', principal: 24000, stocks: 102, value: 27711 },
    { date: '2019-08-01', principal: 24000, stocks: 102, value: 27813 },
    { date: '2019-09-01', principal: 24000, stocks: 102, value: 27100 },
    { date: '2019-10-01', principal: 24000, stocks: 102, value: 27813 },
    { date: '2019-11-01', principal: 24000, stocks: 102, value: 28526 },
    { date: '2019-12-01', principal: 24000, stocks: 102, value: 29443 },
    { date: '2020-01-01', principal: 36000, stocks: 142, value: 42258 },
    { date: '2020-02-01', principal: 36000, stocks: 142, value: 42258 },
    { date: '2020-03-01', principal: 36000, stocks: 142, value: 38985 }
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
