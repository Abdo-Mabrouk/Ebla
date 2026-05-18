export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sky: { brand: '#38BDF8' },
        dark: { bg: '#0F1117', card: '#1A1D27', sidebar: '#13151F' }
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif']
      }
    }
  }
}
