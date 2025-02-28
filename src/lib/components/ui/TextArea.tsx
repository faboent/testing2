import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Textarea as ChakraTextarea,
} from '@chakra-ui/react';
import { Field } from 'formik';

interface TextAreaProps {
  name?: string;
  placeholder?: string;
  label?: string;
  bg?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  px?: number | string;
  py?: number | string;
  size?: 'sm' | 'md' | 'lg';
  labelFontSize?: number;
  maxLength?: number;
  readOnly?: boolean;
  isDisabled?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  labelColor?: string;
}

const TextArea = ({
  name = 'textarea',
  placeholder,
  label,
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
  labelFontSize = 14,
  maxLength,
  readOnly,
  isDisabled,
  rows = 4,
  onChange,
  labelColor = '#212429',
}: TextAreaProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          {label && (
            <FormLabel
              color={labelColor}
              fontWeight={400}
              fontSize={labelFontSize}
              m={0}
            >
              {label}
            </FormLabel>
          )}

          <ChakraTextarea
            {...field}
            size={size}
            placeholder={placeholder}
            bg={bg}
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            borderColor={borderColor}
            color={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
            px={px}
            py={py}
            rows={rows}
            isInvalid={form.errors[name] && form.touched[name]}
            errorBorderColor="red.300"
            focusBorderColor="brand.100"
            _placeholder={{
              color: '#212429',
              fontSize: 14,
              fontWeight: 400,
            }}
            maxLength={maxLength}
            readOnly={readOnly}
            isDisabled={isDisabled}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
          />

          <FormErrorMessage
            color="red.500"
            fontWeight={400}
            fontSize={12}
            mt={1}
          >
            {form.errors[name]}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default TextArea;
