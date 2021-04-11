import formatDuration from "date-fns/formatDuration";
import { Notification } from "element-ui";

export function formatDateDuration(dateObj) {
  const { from, to } = dateObj;
  if (from > to) {
    Notification.error("Выберите правильные даты");
  }
  return formatDuration(dateObj, { zero: true });
}
