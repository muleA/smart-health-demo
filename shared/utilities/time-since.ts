export default function timeSince(date: any, shorten?: boolean) {
  const intervals: any = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];
  const seconds = Math?.floor((Date.now() - new Date(date)?.getTime()) / 1000);
  const interval = intervals?.find((i: any) => i?.seconds < seconds);
  const count = Math?.floor(seconds / interval?.seconds);
  if (shorten) {
    return `${count} ${interval?.label?.charAt(0)}`;
  } else {
    return `${count} ${interval?.label}${count !== 1 ? 's' : ''} ago`;
  }
}
