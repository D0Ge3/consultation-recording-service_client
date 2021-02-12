import moment from 'moment'

export const generateTimeTickets = (startTime, endTime, recommended_qnt_students) => {

  let start = moment(startTime)

  let end = moment().set({
    year: startTime.get('year'),
    month: startTime.get('month'),
    date: startTime.get('date'),
    hour: endTime.get('hour'),
    minute: endTime.get('minute'),
    second: endTime.get('second'),
    millisecond: endTime.get('millisecond'),
  })

  let duration = end.diff(start, 'minutes')

  let timeOneStudent = Math.floor(duration / recommended_qnt_students)

  let time = []

  time[0] = start

  for (let i = 1; i < recommended_qnt_students; i++) {
    time[i] = moment(time[i - 1]).add(timeOneStudent, 'm')
  }
  for (let i = 0; i < time.length; i++) {
    time[i] = moment(time[i]).format('LT')
  }

  return {
    timeOneStudent,
    time,
  }
}
