import { Message } from 'discord.js';

import SeedGame from '../database/schemas/SeedGame';

import Command from '../interfaces/Command';
import Embed from '../utils/Embed';
import CheckRandomizerUrl from '../validators/CheckRandomizerUrl';

export default class Setseed extends Command {
  constructor() {
    super({
      name: 'seetseed',
      aliases: ['setseed'],
      args: 1,
    });
  }

  async run(msg: Message, args: string[]): Promise<void> {
    if (!args) return;

    const { guild } = msg;
    const [seed] = args;

    msg.channel.startTyping();

    // eslint-disable-next-line radix
    const seedNumber = parseInt(seed.split('=')[1]);

    await this.createGame(seed, seedNumber);

    const embed = Embed({
      title: `Seed ${seedNumber} created!`,
      description: `New seed created by ${msg.author.tag}`,
      fields: [
        {
          title: 'Seed link',
          text: seed,
        },
        {
          title: 'How to join',
          text: `type m!join in this channel to participate`,
        },
        {
          title: 'Record your time',
          text: `type m!done <your_time@0:00:00> in this channel to record your time`,
        },
        {
          title: 'Finish this race',
          text: `After race is finished don't forget to m!record`,
        },
      ],
      url: seed,
      thumbnail: 'oot',
      color: '#386dbb',
    });
    msg.delete({ timeout: 1000 });

    const raceCategory = guild?.channels.cache.find(c => c.name === 'races');
    const raceChannel = await guild?.channels.create(`race-${seedNumber}`, {
      type: 'text',
      topic: `👀 See pined messages for race details\n🌐 ${seed}`,
    });
    const alertRole = guild?.roles.cache.find(
      role => role.name === 'mido-alert',
    );

    if (raceCategory && raceChannel) {
      raceChannel.setParent(raceCategory.id);
      raceChannel.send(embed).then(message => message.pin());
      raceChannel.send(`<@&${alertRole?.id}>`);
      msg.channel
        .send(`New race available at <#${raceChannel.id}>!`)
        .then(() => msg.channel.stopTyping());
    }
  }

  async createGame(seed: string, seedNumber: number): Promise<void> {
    const checkSeedExists = await SeedGame.findOne({ seedId: seedNumber });

    if (checkSeedExists) throw new Error('This seed already exists');

    await SeedGame.create({
      seedId: seedNumber,
      seedUrl: seed,
      type: 'started',
      game: 'oot',
    });
  }

  validateArgs(args: string[]): string[] | undefined {
    const [seed] = args;

    if (!CheckRandomizerUrl(seed)) throw new Error('✖ Bad seed url');

    return args;
  }
}
