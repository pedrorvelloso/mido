import { Message } from 'discord.js';

import SeedEntrant from '../database/schemas/SeedEntrant';
import SeedGame from '../database/schemas/SeedGame';

import Command from '../interfaces/Command';
import { extractRaceSeed } from '../utils/utils';

import isTime from '../validators/isTime';

export default class Done extends Command {
  constructor() {
    super({
      name: 'Done',
      aliases: ['done'],
      args: 1,
    });
  }

  async run(msg: Message, args: string[]): Promise<void> {
    const { author, guild, channel } = msg;

    const [time] = args;

    const currentChannel = guild?.channels.cache.get(channel.id);

    if (currentChannel) {
      const seed = extractRaceSeed(currentChannel.name);
      await this.done(time, seed, author.id);

      msg.delete();

      channel.send(`<@${author.id}> finished with a time of ${time}!`);
    }
  }

  validateArgs(args: string[]): string[] | undefined {
    const [time] = args;

    if (!isTime(time)) throw new Error('please inform a correct time');

    const correctTime = time.startsWith('0') ? time.slice(1) : time;

    return [correctTime];
  }

  async done(
    time: string,
    seed: number,
    playerDiscordId: string,
  ): Promise<void> {
    const findSeed = await SeedGame.findOne({ seedId: seed });

    if (!findSeed)
      throw new Error(
        "Oops, seems like we're having troubles finding this seed! Please try again",
      );

    const seedEntrant = await SeedEntrant.findOne({
      playerDiscordId,
      seedGameId: findSeed._id,
    });

    if (!seedEntrant) throw new Error("You're not in this race");

    if (seedEntrant.forfeit) throw new Error('Already forfeited');

    if (seedEntrant.time)
      throw new Error(
        `You already finished this race! Your time: ${seedEntrant.time}`,
      );

    await SeedEntrant.updateOne(seedEntrant, { time });
  }
}
