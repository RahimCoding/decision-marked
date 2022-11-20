function generateRandomString(num) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let str = '';
  for (let i = 0; i < num; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
module.exports = { generateRandomString };
