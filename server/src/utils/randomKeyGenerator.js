const keyGenerator = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let key = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    key += alphabet.charAt(randomIndex);
  }

  return key;
}

module.exports = keyGenerator