import { DateTime } from "luxon";

export const formatDate = (date) => {
  const dt = DateTime.fromISO(date);
  return dt.toLocaleString(DateTime.DATE_MED);
};
