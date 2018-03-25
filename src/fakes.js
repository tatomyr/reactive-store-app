// Fake response
export const fakeRequest = () => new Promise(resolve => {
  const delay = Math.round(1000 * (Math.random() + Math.random() + Math.random()))
  setTimeout(() => {
  	resolve(delay)
  }, delay)
})

// Color highlighting or rerender
function getRandomColor() {
  var letters = '89ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
}

export const highlight = () => `style="background-color: ${getRandomColor()};"`
