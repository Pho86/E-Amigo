import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export default function formatTimeAgo(date: any) {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return timeAgo.format(date)
}