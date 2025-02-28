import type { ReactNode } from 'react';

export type ButtonType = {
  text: string;
  icon?: any;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xs';
  variant?: 'solid' | 'outline' | 'ghost';
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  fontSize?: number;
  fontWeight?: number;
  px?: number;
  py?: number;
  color?: string;
  bg?: string;
  bgHover?: string;
  textHover?: string;
  border?: string;
  borderHover?: string;
  bgDisabled?: string;
  textDisabled?: string;
  borderDisabled?: string;
  type?: 'button' | 'submit' | 'reset';
  borderRadius?: number;
  width?: string;
};

export type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
  label?: string;
  value?: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  bg?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  px?: number;
  py?: number;
  leftIcon?: string;
  rightIcon?: string;
  rightAddOnContent?: ReactNode;
  leftAddOnContent?: ReactNode;
  labelFontSize?: number;
  maxLength?: number;
  readOnly?: boolean;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelColor?: string;
};

export type ServiceCardType = {
  title: string;
  description: string;
  icon: string;
  id?: number;
};

export type DashboardCardType = {
  stat: number;
  description: string;
  icon?: string;
  id?: number;
  isPrefix?: boolean;
  isPercent?: boolean;
};

export type WorkCardType = {
  title: string;
  description: string;
  id?: number;
};

export type ModalType = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: ReactNode;
  footer?: ReactNode;
  fontWeight?: number;
  size?: string;
  p?: number;
  fontSize?: number;
  color?: string;
  textAlign?: any;
};

export type SelectProps = {
  name: string;
  label?: string;
  options: any[];
  placeholder: string;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  bg?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  px?: number;
  py?: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
  labelFontSize?: number;
  labelColor?: string;
};

export type NairaNumberFormatProps = {
  value: any;
  isBold?: boolean;
  isPrefix?: boolean;
  fontSize?: string;
  fontWeight?: number;
  color?: string;
  prefix?: string;
};

// text area props
export type TextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  bg?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  px?: number;
  py?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
  labelFontSize?: number;
  rows?: number;
};
