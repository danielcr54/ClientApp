import { DateTime } from 'luxon';

// Date validation helpers

const ISO_DATE_FORMAT = 'yyyy-MM-dd';

export function isDateStringValid(
  dateString: string,
  format: string = ISO_DATE_FORMAT
) {
  const dateTime = DateTime.fromFormat(dateString, format);
  return dateTime.isValid;
}
