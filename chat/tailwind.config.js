module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      'transparent': 'transparent',
      'server': '#2f3136',
      'background': '#23232a',
      'online': '#43b581',
      'chat-bubble': '#7289da',
      'chat': '#36393f',
      'text': '#ffffff',
      'gray': '#99aab5'


    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};