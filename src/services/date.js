import { DateTime } from 'luxon';

export const formatDate = (textDate) => {
  return DateTime.fromISO(textDate).toFormat('ccc dd t');
};
