import { formatTimeStamp } from '../date-utils';

test('Date Format: 2020-01-01, 12:00 a.m.', () => {
  expect(formatTimeStamp(new Date(2020, 0, 1, 0, 0, 0, 0), 'en-CA')).toBe(
    '2020-01-01, 12:00 a.m.',
  );
});
