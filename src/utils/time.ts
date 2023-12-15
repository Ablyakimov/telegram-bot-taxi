import * as moment from 'moment-timezone'

interface getDateAndTimeReturnValue {
  time: string
  date: string
}
export function getDateAndTime(dateFromDb): getDateAndTimeReturnValue {
  
  const date = moment(dateFromDb).format('DD.MM.YYYY')
  const time = moment(dateFromDb).format('HH:mm:ss')
  return { time, date }
}

export function getMoscowTime() {
  return moment.tz('Europe/Moscow')
}