import isRaceChannel from '../validators/isRaceChannel';

const extractRaceSeed = (channelName: string): number => {
  if (!isRaceChannel(channelName)) throw new Error('Not a race channel!');

  return parseInt(channelName.split('-')[1]);
};

export { extractRaceSeed };
