class DateService {
  static formatTime(date) {
    return new Date(date)
      .toLocaleTimeString('en-US', { timeStyle: 'short' })
      .toLowerCase();
  }
}

export default DateService;
