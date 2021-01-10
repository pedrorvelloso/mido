import isURL from 'validator/lib/isURL';

export default (url: string): boolean => {
  const checkURL = isURL(url);

  const checkOotRandomizerUrl = url.match(
    /^https:\/\/ootrandomizer\.com?\/seed\/get\?id=[0-9]{2,9}$/,
  );

  return checkURL && !!checkOotRandomizerUrl;
};
