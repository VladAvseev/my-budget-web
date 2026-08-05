export const palette = {
  white: '#ffffff',
  black: '#000000',

  light50: '#f9fafb',
  light100: '#f3f4f6',
  light200: '#e5e7eb',
  light300: '#d1d5db',

  dark400: '#b3b3b3',
  dark500: '#8c8c8c',
  dark700: '#4d4d4d',
  dark800: '#333333',
  dark900: '#242424',
  dark950: '#141414',

  red50: '#fef2f2',
  red500: '#ef4444',
  red700: '#b91c1c',

  orange50: '#fff7ed',
  orange500: '#f97316',
  orange700: '#c2410c',

  green50: '#f0fdf4',
  green500: '#22c55e',
  green700: '#15803d',
} as const;

export const typography = {
  fontFamily: "'Inter', sans-serif",
  fontSize: {
    s: '12px',
    m: '14px',
    l: '16px',
    xl: '20px',
    xxl: '24px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
  },
} as const;

export const spacing = {
  xs: '4px',
  s: '8px',
  m: '12px',
  l: '16px',
  xl: '24px',
  xxl: '32px',
} as const;

export const radius = {
  s: '4px',
  m: '8px',
  l: '12px',
  round: '50%',
} as const;

export const shadow = {
  s: '0 1px 3px rgba(0,0,0,0.12)',
  m: '0 4px 6px rgba(0,0,0,0.15)',
  l: '0 10px 20px rgba(0,0,0,0.2)',
} as const;
