export const dateFormat = (inputDate, format = 'yyyy-MM-ddThh:mm') => {
  const date = new Date(inputDate)
  
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  
  format = format.replace('yyyy', year.toString())
  format = format.replace('MM', month.toString().padStart(2, '0'))
  format = format.replace('dd', day.toString().padStart(2, '0'))
  format = format.replace('hh', hours.toString().padStart(2, '0'))
  format = format.replace('mm', minutes.toString().padStart(2, '0'))

  return format
}