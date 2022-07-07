import { DateTime } from 'luxon';

export const formatDate = (textDate, done) => {
  if (done)
    return DateTime.fromISO(textDate).toRelativeCalendar({ locale: 'es' });

  if (!DateTime.fromISO(textDate).isValid) {
    return '';
  }

  return (
    DateTime.fromISO(textDate).toFormat('cccc dd', { locale: 'es' }) +
    ' de ' +
    DateTime.fromISO(textDate).toFormat('MMMM - hh:mm a', {
      locale: 'es',
    })
  );
};
