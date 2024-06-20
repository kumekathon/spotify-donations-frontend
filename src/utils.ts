export function generateRandomString(length: number) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


const getProvider = () => {
  if ('phantom' in window) {
    // @ts-ignore
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
};
