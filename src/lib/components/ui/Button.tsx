import { Button as ChakraButton } from '@chakra-ui/react';

import type { ButtonType } from '~/lib/interfaces/ui.interface';

const Button = (props: ButtonType) => {
  const {
    text: textProp,
    icon,
    iconPosition,
    size = 'lg',
    variant = 'solid',
    isDisabled,
    isLoading,
    onClick,
    fontSize = '16px',
    fontWeight = 700,
    color: text = variant === 'solid' ? 'white' : 'brand.200',
    bg = variant === 'solid' ? 'brand.200' : 'white',
    border = 'brand.200',
    type = 'submit',
    borderRadius = '5px',
    width = '100%',
    px,
    py,
  } = props;

  return (
    <ChakraButton
      size={size}
      variant={variant}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={onClick}
      color={text}
      bg={bg}
      leftIcon={icon && iconPosition === 'left' && icon}
      rightIcon={icon && iconPosition === 'right' && icon}
      borderWidth={variant === 'outline' ? '1px' : '0px'}
      borderColor={border}
      borderRadius={borderRadius}
      _hover={{
        transform: 'scale(1.05)',
        transition: 'all 0.2s ease-in-out',
      }}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily="body"
      type={type}
      width={width}
      px={px}
      py={py}
    >
      {textProp}
    </ChakraButton>
  );
};

export default Button;
