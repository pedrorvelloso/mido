import { Message } from 'discord.js';

import Command from '../interfaces/Command';

export default class Ping extends Command {
  constructor() {
    super({
      name: 'ping',
      aliases: ['ping'],
    });
  }

  async run(msg: Message): Promise<void> {
    msg.reply('Pong');
  }
}
