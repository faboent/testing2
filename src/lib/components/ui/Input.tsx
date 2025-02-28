/* eslint-disable no-nested-ternary */
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  IconButton,
  Image,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { useState } from 'react';

import type { InputProps } from '~/lib/interfaces/ui.interface';

const Input = ({
  type,
  name = 'input',
  placeholder,
  label,
  bg = 'white',
  borderRadius = 5,
  borderWidth = 0.1,
  borderColor = 'border.100',
  fontSize = 16,
  fontWeight = 400,
  color = 'black',
  px,
  py,
  size = 'lg',
  leftIcon,
  rightIcon,
  rightAddOnContent,
  leftAddOnContent,
}: InputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel color="headText.300" fontWeight={500} fontSize={18} mb={1}>
            {label}
          </FormLabel>
          <InputGroup>
            {leftAddOnContent && (
              <InputLeftAddon
                h="auto"
                bg="white"
                borderWidth={borderWidth}
                borderColor={borderColor}
              >
                {leftAddOnContent}
              </InputLeftAddon>
            )}

            {leftIcon && (
              <InputLeftElement
                pointerEvents="none"
                position="absolute"
                top="5px"
              >
                <Image src={leftIcon} alt={label} boxSize="22px" />
              </InputLeftElement>
            )}
            <ChakraInput
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
              isInvalid={form.errors[name] && form.touched[name]}
              errorBorderColor="red.300"
              focusBorderColor="brand.100"
              type={type === 'password' ? (show ? 'text' : 'password') : type}
              _placeholder={{
                color: 'bodyText.500',
                fontSize: 16,
                fontWeight: 400,
              }}
            />

            {type === 'password' && (
              <InputRightElement position="absolute" top="5px">
                <IconButton
                  aria-label={show ? 'Hide' : 'Show'}
                  variant="ghost"
                  colorScheme="primary"
                  size="sm"
                  onClick={handleClick}
                  icon={
                    show ? (
                      <Image src="/images/eye.svg" alt="hide" boxSize="22px" />
                    ) : (
                      <Image src="/images/eye.svg" alt="show" boxSize="22px" />
                    )
                  }
                />
              </InputRightElement>
            )}

            {rightIcon && (
              <InputRightElement
                pointerEvents="none"
                position="absolute"
                top="5px"
              >
                <Image src={rightIcon} alt={label} boxSize="22px" />
              </InputRightElement>
            )}

            {rightAddOnContent && (
              <InputRightAddon h="auto" bg="white">
                {rightAddOnContent}
              </InputRightAddon>
            )}
          </InputGroup>

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

export default Input;
