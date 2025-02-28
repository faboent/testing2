import {
  Select as ChakraSelect,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { MdArrowDropDown } from 'react-icons/md';

import type { SelectProps } from '~/lib/interfaces/ui.interface';

const Select = ({
  name,
  label,
  placeholder,
  options,
  bg = '#F0F0F0F0',
  borderRadius = 5,
  borderWidth = 0,
  borderColor = 'border.100',
  fontSize = 14,
  fontWeight = 400,
  color = '#212429',
  px,
  py,
  size = 'md',
  onChange,
  isDisabled,
  labelFontSize = 14,
  labelColor = '#212429',
  ...rest
}: SelectProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel
            color={labelColor}
            fontWeight={400}
            fontSize={labelFontSize}
            m={0}
          >
            {label}
          </FormLabel>

          <ChakraSelect
            {...field}
            placeholder={placeholder}
            icon={<MdArrowDropDown />}
            bg={bg}
            borderRadius={borderRadius}
            color={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
            isInvalid={form.errors[name] && form.touched[name]}
            errorBorderColor="red.500"
            focusBorderColor="brand.200"
            borderColor={borderColor}
            px={px}
            py={py}
            size={size}
            borderWidth={borderWidth}
            onChange={(e) => {
              // Handle Formik's field change
              field.onChange(e);
              // Handle custom onChange if provided
              if (onChange) {
                onChange(e);
              }
            }}
            isDisabled={isDisabled}
            {...rest}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </ChakraSelect>

          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default Select;
