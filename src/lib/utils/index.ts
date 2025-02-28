export const formatPin = (pin: string) => {
  const withoutDashes = pin.replace(/-/g, '');
  return withoutDashes.split('').join('-');
};

export const validateSize = (size: number, maxSize: number = 1) => {
  const maxValue = maxSize * 1024 * 1024;
  return size < maxValue;
};

// const terms = [
//   { value: 3, label: '3 Months' },
//   { value: 6, label: '6 Months' },
//   { value: 9, label: '9 Months' },
//   { value: 12, label: '12 Months' },
// ];

// const frequency = [
//   { value: 'monthly', label: 'Monthly' },
//   { value: 'quarterly', label: 'Quarterly' },
//   { value: 'bi-annually', label: 'Bi-Annually' },
//   { value: 'annually', label: 'Annually' },
// ];
