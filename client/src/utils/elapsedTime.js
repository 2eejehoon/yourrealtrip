/* eslint-disable */
export default function elapsed(string) {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  const today = new Date();
  const targetDate = new Date(string);

  const elapsedSec = today.getTime() - targetDate.getTime();
  const elapsedMin = Math.floor(elapsedSec / minute);
  const elapsedHour = Math.floor(elapsedSec / hour);
  const elapsedDay = Math.floor(elapsedSec / day);
  const elapsedMonth = Math.floor(elapsedSec / month);
  const elapsedYear = Math.floor(elapsedSec / year);

  if (elapsedYear > 0) {
    return `${elapsedYear}년 전`;
  }
  if (elapsedMonth > 0) {
    return `${elapsedMonth}개월 전`;
  }
  if (elapsedDay > 0) {
    return `${elapsedDay}일 전`;
  }
  if (elapsedHour > 0) {
    return `${elapsedHour}시간 전`;
  }
  if (elapsedMin > 0) {
    return `${elapsedMin}분 전`;
  }
  if (elapsedSec > 0) {
    return `${Math.round(elapsedSec / 1000)}초 전`;
  }
  return null;
}
