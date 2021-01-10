import { Message } from 'discord.js';

import SeedEntrant from '../database/schemas/SeedEntrant';
import SeedGame from '../database/schemas/SeedGame';

import Command from '../interfaces/Command';
import { extractRaceSeed } from '../utils/utils';

export default class Forfeit extends Command {
  constructor() {
    super({
      name: 'Forfeit',
      aliases: ['ff', 'forfeit'],
    });
  }

  async run(msg: Message): Promise<void> {
    const { guild } = msg;

    const currentChannel = guild?.channels.cache.get(msg.channel.id);

    if (currentChannel) {
      const seed = extractRaceSeed(currentChannel.name);

      await this.forfeit(seed, msg.author.id);

      msg.react('✔️');
    }
  }

  async forfeit(seed: number, playerDiscordId: string): Promise<void> {
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
      throw new Error(`You finished this race! Your time: ${seedEntrant.time}`);

    await SeedEntrant.updateOne(
      { playerDiscordId, seedGameId: findSeed._id },
      { forfeit: true },
    );
  }
}
