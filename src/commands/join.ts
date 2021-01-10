import { Message } from 'discord.js';

import Command from '../interfaces/Command';
import SeedEntrant from '../database/schemas/SeedEntrant';
import SeedGame from '../database/schemas/SeedGame';

import { extractRaceSeed } from '../utils/utils';

export default class JoinGame extends Command {
  constructor() {
    super({
      name: 'JoinGame',
      aliases: ['join'],
    });
  }

  async run(msg: Message): Promise<void> {
    const currentChannel = msg.guild?.channels.cache.get(msg.channel.id);

    if (currentChannel) {
      const seed = extractRaceSeed(currentChannel.name);

      await this.joinGame(seed, msg.author.id);

      msg.react('✔️');
    }
  }

  async joinGame(seed: number, playerDiscordId: string): Promise<void> {
    const findSeed = await SeedGame.findOne({ seedId: seed });

    if (!findSeed)
      throw new Error(
        "Oops, seems like we're having troubles finding this seed! Please try again",
      );

    const alreadyJoined = await SeedEntrant.findOne({
      seedGameId: findSeed._id,
      playerDiscordId,
    });

    if (alreadyJoined) throw new Error('you already joined this race');

    await SeedEntrant.create({
      seedGameId: findSeed._id,
      playerDiscordId,
    });
  }
}
