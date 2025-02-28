import {
  Select as ChakraSelect,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';

import type { SelectProps } from '~/lib/interfaces/ui.interface';

const Select2 = ({
  name,
  label,
  placeholder,
  options,
  bg = 'white',
  borderRadius = 4,
  borderWidth = 1,
  borderColor = 'border.100',
  fontSize = 14,
  fontWeight = 400,
  color = 'black',
  px,
  py,
  size = 'lg',
  labelFontSize = 14,
  ...rest
}: SelectProps) => {
  return (
    <FormControl>
      <FormLabel
        color="#212429"
        fontWeight={400}
        fontSize={labelFontSize}
        m={0}
      >
        {label}
      </FormLabel>

      <ChakraSelect
        placeholder={placeholder}
        icon={<MdArrowDropDown />}
        bg={bg}
        borderRadius={borderRadius}
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        errorBorderColor="red.500"
        focusBorderColor="brand.200"
        borderColor={borderColor}
        px={px}
        py={py}
        size={size}
        borderWidth={borderWidth}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
};

export default Select2;
