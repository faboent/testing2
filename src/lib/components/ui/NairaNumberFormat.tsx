'use client';

import { NumericFormat } from 'react-number-format';

import type { NairaNumberFormatProps } from '~/lib/interfaces/ui.interface';

const NairaNumberFormat = ({
  value,
  isPrefix = true,
  fontSize = '24px',
  color = '#000',
  fontWeight = 400,
  prefix = '₦',
}: NairaNumberFormatProps) => {
  return (
    <NumericFormat
      value={value}
      displayType="text"
      thousandSeparator
      prefix={isPrefix ? prefix : ''}
      style={{
        fontWeight,
        fontSize,
        color,
      }}
    />
  );
};

export default NairaNumberFormat;
