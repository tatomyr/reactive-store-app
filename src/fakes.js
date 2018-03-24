// Fake response
export const fakeRequest = () => new Promise(resolve => {
  const delay = Math.round(1000 * (Math.random() + Math.random() + Math.random()))
  setTimeout(() => {
  	resolve(delay)
  }, delay)
})
