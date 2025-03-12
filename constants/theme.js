export const COLORS = {
    primary: {
      light: '#E8E8B0',
      DEFAULT: '#A6A746',
      dark: '#858738'
    },
    secondary: {
      light: '#F9F9FA',
      DEFAULT: '#96A0AA',
      dark: '#4A5568'
    },
    background: {
      light: '#FFFFFF',
      DEFAULT: '#F7F7F7',
      dark: '#EAEAEA'
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#4A5568',
      tertiary: '#718096',
      light: '#A0AEC0'
    },
    border: {
      light: '#E2E8F0',
      DEFAULT: '#CBD5E0',
      dark: '#A0AEC0'
    },
    success: {
      light: '#9AE6B4',
      DEFAULT: '#48BB78',
      dark: '#2F855A'
    },
    warning: {
      light: '#FFD700',
      DEFAULT: '#ECC94B',
      dark: '#D69E2E'
    }
  };
  
  export const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  };
  
  export const FONTS = {
    regular: {
      fontFamily: 'Inter-Regular',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Inter-Medium',
      fontWeight: '500',
    },
    semibold: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: '600',
    },
    bold: {
      fontFamily: 'Inter-Bold',
      fontWeight: '700',
    },
  };
  
  export const SIZES = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  };
  
  const theme = { COLORS, SHADOWS, FONTS, SIZES };
  
  export default theme; 