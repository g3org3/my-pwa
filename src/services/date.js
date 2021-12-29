import { DateTime } from 'luxon';

export const formatDate = (textDate) => {
  return DateTime.fromISO(textDate).toFormat('cccc dd - hh:mm a');
};
