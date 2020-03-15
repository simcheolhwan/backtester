import { DateTime } from 'luxon'

export default (date: string): number =>
  Number(DateTime.fromISO(date).toFormat('yyyy'))
