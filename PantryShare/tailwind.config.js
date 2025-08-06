/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors based on style guide
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          500: '#4CAF50', // Primary brand color
          600: '#45a049',
          700: '#3d8b40',
          800: '#2e7d2e',
          900: '#1b5e1b',
        },
        secondary: {
          50: '#fff8e7',
          100: '#ffecb3',
          500: '#FF9800', // Secondary brand color
          600: '#f57c00',
          700: '#ef6c00',
          800: '#e65100',
          900: '#bf360c',
        },
        success: '#8BC34A',
        warning: '#FFC107',
        error: '#F44336',
        neutral: {
          300: '#E0E0E0',
          600: '#757575',
          800: '#333333',
        }
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.4', fontWeight: '600' }],
        'h2': ['36px', { lineHeight: '1.4', fontWeight: '500' }],
        'h3': ['24px', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      letterSpacing: {
        'heading': '0.5px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1)',
        'hover': '0 4px 12px rgba(0,0,0,0.15)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'slideUp': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      screens: {
        'xs': '600px',
        'sm': '600px',
        'md': '960px',
        'lg': '1280px',
        'xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
