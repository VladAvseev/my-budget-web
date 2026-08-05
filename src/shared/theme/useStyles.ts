import { useMemo } from 'react';
import { commonStyles } from './common';
import { darkStyles } from './dark';
import { lightStyles } from './light';

export type ThemeName = 'light' | 'dark';

function getThemeStyles(theme: ThemeName) {
  return theme === 'dark' ? darkStyles : lightStyles;
}

export function useStyles(theme: ThemeName) {
  const themeStyles = getThemeStyles(theme);

  return useMemo(
    () => ({
      ...commonStyles,
      colors: themeStyles.colors,
    }),
    [themeStyles.colors],
  );
}
