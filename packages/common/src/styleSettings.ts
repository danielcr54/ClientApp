// Reusable style settings

export const breakpoints = [0, 480, 768, 1024, 1200];
export const screenSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];
export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96, 128];

export interface ScreenSizeQueryMap {
  xsmall: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
  xsmallDown: string;
  smallDown: string;
  mediumDown: string;
  largeDown: string;
  xlargeDown: string;
}

// export const screenSizes: ScreenSizeMap = {
//   xsmall: breakpoints[0],
//   small: breakpoints[1],
//   medium: breakpoints[2],
//   large: breakpoints[3],
//   xlarge: breakpoints[4]
// };

export const deviceScreenQuery = screenSizes.reduce(
  (acc, screenSize, currentIndex) => {
    const currentQuery = `(min-width: ${breakpoints[currentIndex]}px)`;

    const result = {
      ...acc,
      [screenSize]: currentQuery
    };

    const nextIndex = currentIndex + 1;
    if (nextIndex < breakpoints.length) {
      Object.assign(result, {
        [`${screenSize}Down`]: `(max-width: ${breakpoints[nextIndex] - 1}px)`
      });
    }

    return result;
  },
  {}
) as ScreenSizeQueryMap;

export const fonts = {
  main: '"Helvetica", "Helvetica Neue", sans-serif',
  secondary: '"Helvetica", "Helvetica Neue", sans-serif',
  monospace: '"Menlo", "Consolas", monospace'
};

export const colors = {
  default: '#6c45a3',
  main: '#6c45a3',
  brightMain: '#d2a0ff',
  paleMain: '#73608e',
  secondary: '#9c73d7',
  action: '#fe6242',
  warning: '#e6bf00',
  success: '#4e9661',
  danger: '#d43939',
  faded: '#3b3252',
  // faded: '#3e3855',
  // lighterDark: '#363043',
  lighterDark: '#3a3447',
  fadedLighterDark: '#2c273f',
  dark: '#231f32',
  black: '#151515',
  white: '#fff'
};

export const inputColors = {
  bg: colors.faded,
  border: 'transparent',
  text: 'white',
  placeholder: '#b8b4c0',
  bgFocus: '#4d3e74',
  borderFocus: '#d2a0ff',
  textFocus: 'white',
  bgDisabled: colors.faded,
  borderDisabled: 'transparent',
  textDisabled: '#b8b4c0'
};

export const inputSpacing = {
  default: {
    fontSize: 15,
    paddingY: 17,
    paddingX: 20,
    addonPaddingX: 14,
    floatLabelPaddingOffset: 8
  },

  small: {
    fontSize: 13,
    paddingY: 9,
    paddingX: 12,
    addonPaddingX: 10,
    floatLabelPaddingOffset: 0
  },

  xsmall: {
    fontSize: 12,
    paddingY: 4,
    paddingX: 8,
    addonPaddingX: 7,
    floatLabelPaddingOffset: 0
  }
};

export const defaultButtonStyle = {
  background: colors.action,
  foreground: colors.white,
  glow: '#603da0',

  // Interaction states
  hover: {
    background: '#ec4d2c',
    foreground: colors.white
  },

  active: {
    background: colors.white,
    foreground: colors.black
  },

  disabled: {
    background: 'rgba(0, 0, 0, 0.4)',
    foreground: 'rgba(255, 255, 255, 0.4)'
  },

  // Custom states
  inProgress: {
    background: colors.faded,
    foreground: colors.white
  },

  success: {
    background: colors.success,
    foreground: colors.white
  },

  error: {
    background: colors.danger,
    foreground: colors.white
  }
};

export const buttonColors = {
  default: defaultButtonStyle,

  secondary: {
    ...defaultButtonStyle,
    background: colors.main,
    foreground: colors.white,
    glow: '#603da0',

    // Interaction states
    hover: {
      background: '#946fc7',
      foreground: colors.white
    },

    active: {
      background: colors.white,
      foreground: colors.main
    }
  },

  inverse: {
    ...defaultButtonStyle,
    background: colors.white,
    foreground: colors.default,

    hover: {
      background: '#946fc7',
      foreground: colors.white
    },

    active: {
      background: colors.default,
      foreground: colors.white
    },

    disabled: {
      background: 'rgba(255, 255, 255, 0.4)',
      foreground: colors.faded
    }
  },

  transparent: {
    ...defaultButtonStyle,
    background: 'transparent',
    foreground: colors.white,

    hover: {
      background: 'transparent',
      foreground: colors.secondary
    },

    active: {
      background: 'transparent',
      foreground: colors.secondary
    },

    disabled: {
      background: 'transparent',
      foreground: colors.faded
    }
  },

  danger: {
    ...defaultButtonStyle,
    background: colors.danger,
    foreground: colors.white
  }
};

export const linkColors = {
  default: colors.main,
  secondary: colors.secondary
};
