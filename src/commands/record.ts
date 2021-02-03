import { Message } from 'discord.js';

import SeedEntrant from '../database/schemas/SeedEntrant';
import SeedGame from '../database/schemas/SeedGame';

import Command from '../interfaces/Command';
import { extractRaceSeed } from '../utils/utils';

export default class Record extends Command {
  constructor() {
    super({
      name: 'Record',
      aliases: ['record'],
    });
  }

  async run(msg: Message): Promise<void> {
    const { guild } = msg;

    const currentChannel = guild?.channels.cache.get(msg.channel.id);

    msg.author.send('a?');

    if (currentChannel) {
      const seed = extractRaceSeed(currentChannel.name);
      this.record(seed);
    }
  }

  async record(seed: number): Promise<void> {
    const findSeed = await SeedGame.findOne({ seedId: seed });

    if (!findSeed)
      throw new Error(
        "Oops, seems like we're having troubles finding this seed! Please try again",
      );

    const players = await SeedEntrant.find({
      seedGameId: findSeed._id,
    });

    const playersUndone = players.filter(
      player => player.forfeit === false && !player.time,
    );

    console.log(playersUndone);
  }
}
