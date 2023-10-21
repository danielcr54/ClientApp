import { DateTime } from 'luxon';

export function parseDate(dateString?: string) {
  if (!dateString) return void 0;
  const parsedDate = Date.parse(dateString);
  if (isNaN(parsedDate)) return void 0;
  return new Date(parsedDate);
}

export function getPersonAge(dateOfBirth?: Date | string) {
  if (!dateOfBirth) return void 0;
  const dobDateTime =
    typeof dateOfBirth === 'string'
      ? DateTime.fromISO(dateOfBirth)
      : DateTime.fromJSDate(dateOfBirth);
  if (!dobDateTime.isValid) return void 0;

  const units = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

  const age = dobDateTime.diffNow(['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']);
  for (const unit of units) {
    const pluralUnit = `${unit}s`;
    if (age[pluralUnit] !== 0) {
      return {
        age: Math.floor(Math.abs(age[pluralUnit])),
        unit
      };
    }
  }
  return null;
}
