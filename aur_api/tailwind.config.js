module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '100': '32rem',
        '128': '48rem'
      },
      height: {
        '100': '32rem',
        '128': '48rem'
      },
      inset: {
        '100': '32rem',
        '128': '48rem',
        '-100': '-32rem',
        '-128': '-48rem'
      },
      textColor: {
        'primary': '#eaeaea',
      },
      colors: {
        "blue-light":"#422AD5",
        "cyan-light":"#27A4FD",
        "purple-light":"#8F00DF",
        "50CE8D-light":"#50CE8D",
        "pink-light":"#D81159",
        "deep":"#1A182B",
        "darker":"#0E0E0E",
        "dark":"#232323",
        "light":"#EAEAEA"
      },
      fontFamily: {
        'sans': ['LeagueGothic']
      },
      gridTemplateRows: {
       '8': 'repeat(8, minmax(0, 1fr))',
       'layout': '200px minmax(900px, 1fr) 100px',
      },
      gridRowStart: {
        '3':'3',
        '4':'4',
        '5':'5',
        '6':'6',
        '7':'7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
       },
       gridRowEnd: {
        '3':'3',
        '4':'4',
        '5':'5',
        '6':'6',
        '7':'7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
       },
       gridRow: {
        'span-3': 'span 3 / span 3',
        'span-4': 'span 4 / span 4',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
       }
    },
  },
  variants: {
    extend: {},
  }
}
