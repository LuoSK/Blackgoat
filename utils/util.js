const formatTime = (date, hasTime) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  let result = [year, month, day].map(formatNumber).join('/')
  if (hasTime) {
    result = result + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  return result
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const findDate = (year, month, day, def_Date) => {

  let flag = def_Date.indexOf(function(item, index, arr) {
    return item.year == year && item.month == month && item.day == day
  })
  if (flag == -1) {
    return false

  } else {
    return true

  }

}

module.exports = {
  formatTime: formatTime,
  uuid: uuid,
  findDate: findDate
}