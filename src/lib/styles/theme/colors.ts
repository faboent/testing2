import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  brand: {
    100: '#E7906B',
    200: '#00395B',
    300: '#80AAC4',
    400: '#007CB9',
    500: '#E7906B1F',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  headText: {
    100: '#004872',
    200: '#1E1E1E',
    300: '#002B45',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  bodyText: {
    100: '#444444',
    200: '#696969',
    300: '#797C7F',
    400: '#658884',
    500: '#B4B4B4',
    600: '#F4F4F4',
    700: '#2B729D',
    800: '#8E8E8E',
    900: '',
  },
  background: {
    100: '#FBFCFF',
    200: '#CCE5F1',
    300: '#F6F8FE',
    400: '#E7EEEC',
    500: '#EEEBF4',
    600: '#D4D4D4',
    700: '#FBFDFF',
    800: '',
    900: '',
  },
  border: {
    100: '#B4B4B4',
    200: '#558EB0',
    300: '#E5E5E5',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  grey: {
    100: '',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  customRed: {
    100: '',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  customGreen: {
    100: '',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
