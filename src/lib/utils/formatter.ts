import moment from 'moment';

export const formatRelativeTime = (date: string, isMessage = false) => {
  const now = moment();
  const inputDate = moment(date);
  const diffInMinutes = now.diff(inputDate, 'minutes');

  if (diffInMinutes < 1) {
    return 'just now';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  if (diffInMinutes < 1440) {
    const diffInHours = now.diff(inputDate, 'hours');
    return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
  }
  if (isMessage) {
    return inputDate.format('DD/MM/YYYY');
  }
  const diffInDays = now.diff(inputDate, 'days');
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

export const formatNumber = (num: number) => {
  if (!num) return 0;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrency = (num: number | string | undefined) => {
  if (!num) return '₦0';

  // Convert string to number if needed
  const numericValue = typeof num === 'string' ? parseFloat(num) : num;

  // Format the number with commas and proper decimals
  const formatted = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericValue);

  return `₦${formatted}`;
};

export const formatPercentage = (num: number) => {
  return `${num}%`;
};

export const shortenText = (
  text: string | undefined | null,
  maxLength: number
) => {
  if (!text) {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};

// format time from 2021-09-01T12:00:00Z to July 2, 2020 03:29 PM
export const formatTime = (time: string) => {
  return moment(time).format('MMMM D, YYYY hh:mm A');
};

// Valid Until 5.16.20
export const formatValidUntil = (date: any) => {
  return moment(date).format('MM.DD.YY');
};

// Sun, 01 Sep 2024 01:02:40 GMT
export const formatDate = (date: string) => {
  return moment(date).format('ddd, DD MMM YYYY HH:mm:ss');
};

export const formatDate2 = (date: string) => {
  return moment(date).format('DD MMM YYYY');
};

// Thur, 6th August
export const formatDate3 = (date: string) => {
  return moment(date).format('ddd, DD MMM');
};
