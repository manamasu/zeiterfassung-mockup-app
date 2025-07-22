import { format } from "date-fns";
import { de } from "date-fns/locale";
export const formatDateToMonthYear = (date: Date) => {
  return format(date, "MMMM yyyy", { locale: de });
};

// Format time to "HH:mm" (24-Hour Time format)
export const formatTimeShort = (date: Date) =>
  format(date, "HH:mm", { locale: de });
