const FORMAT_ISO = 'YYYY-MM-DD[T]HH:mm:ss.SSSZZ'
export class TimeOps {
  static FORMAT_ISO = FORMAT_ISO

  //-------------------------------------------------------------
  
  static nowLocal(offsetMillis=0) {
    return moment(moment.now()+offsetMillis).local()
  }

  static nowUtc(offsetMillis=0) {
    return moment(moment.now()+offsetMillis).utc()
  }

  static nowMillis(offsetMillis=0) {
    return moment.now() + offsetMillis
  }

  static nowTimestampLocal(offsetMillis=0, outputFormat=FORMAT_ISO) {
    return moment(moment.now() + offsetMillis).local().format(outputFormat)
  }

  static nowTimestampUtc(offsetMillis=0, outputFormat=FORMAT_ISO) {
    return moment(moment.now() + offsetMillis).utc().format(outputFormat)
  }

  //-------------------------------------------------------------

  static timestampToMillis(timestamp, format=FORMAT_ISO) {
    return moment(timestamp, format).valueOf()
  }

  //-------------------------------------------------------------

  static millisToLocalTimestamp(millis, outputFormat=FORMAT_ISO) {
    return moment(millis).local().format(outputFormat)
  }

  static millisToUtcTimestamp(millis, outputFormat=FORMAT_ISO) {
    return moment(millis).utc().format(outputFormat)
  }

  static timestampToLocalTimestamp(timestamp, inputFormat=FORMAT_ISO, outputFormat=FORMAT_ISO) {
    return moment(timestamp, inputFormat).local().format(outputFormat)
  }

  static timestampToUtcTimestamp(timestamp, inputFormat=FORMAT_ISO, outputFormat=FORMAT_ISO) {
    return moment(timestamp, inputFormat).utc().format(outputFormat)
  }

  //keep same timezone
  static timestampToTimestamp(timestamp, inputFormat=FORMAT_ISO, outputFormat=FORMAT_ISO) {
    const m = moment(timestamp, inputFormat)
    m.utcOffset(timestamp) //set timestamp of moment object from original timestamp input
    return m.format(outputFormat)
  }

  //returns offset in milliseconds
  //ex. 32400000 for JST (+0900)
  static getTimestampOffset(timestamp, inputFormat=FORMAT_ISO) {
    const m = moment(timestamp, inputFormat)
    m.utcOffset(timestamp) //set timestamp of moment object from original timestamp input
    return m.utcOffset() * 60000
  }

  //-------------------------------------------------------------

  static timestampToMoment(timestamp, format=FORMAT_ISO) {
    return moment(timestamp, format) //by default is in local timezone
  }

  //data can be millis, moment object, or timestamp (use native moment format deciphering)
  static toLocalDate(data) {
    const copy = moment(data) //copy date
    return copy.local() //modify date timezone and return the new date object
  }

  //data can be millis, moment object, or timestamp (use native moment format deciphering)
  static toUtcDate(data) {
    const copy = moment(data) //copy date
    return copy.utc() //modify date timezone and return the new date object
  }

  //-------------------------------------------------------------

  static toDigMinuteFormat(millis) {
    let seconds = millis / 1000
    let mins = parseInt(seconds / 60)
    let secs = parseInt(seconds % 60)
    return this.padZeros(mins, 2) + ':' + this.padZeros(secs, 2)
  }

  static padZeros(data, n) {
    data = data + ''
    while(data.length < n)
      data = '0' + data
    return data
  }
}