export function getGoogleCalendarUrl(
  title: string,
  description: string,
  location: string,
  startDateStr = '20270211T130000Z', // 18:30 IST is 13:00 UTC
  endDateStr = '20270211T210000Z'
): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location: location,
    dates: `${startDateStr}/${endDateStr}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(
  title: string,
  description: string,
  location: string,
  filename = 'triambak-trisha-wedding.ics'
) {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Triambak and Trisha Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:wedding-triambak-trisha-20270211@shubhweds',
    'SUMMARY:' + title,
    'DESCRIPTION:' + description.replace(/\n/g, '\\n'),
    'LOCATION:' + location,
    'DTSTART:20270211T130000Z',
    'DTEND:20270211T210000Z',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
