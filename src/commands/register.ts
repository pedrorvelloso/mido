import { Message } from 'discord.js';
import isAlphanumeric from 'validator/lib/isAlphanumeric';

import User, { UserAttributes } from '../database/schemas/User';

import Command from '../interfaces/Command';

export default class Register extends Command {
  constructor() {
    super({
      name: 'Register',
      aliases: ['register', 'r'],
      args: 1,
    });
  }

  async run(msg: Message, args: string[]): Promise<void> {
    const [name] = args;

    const { author } = msg;

    await this.register({
      playerDiscordId: author.id,
      name,
    });

    author.send(`You updated your name to ${name}`);
  }

  validateArgs(args: string[]): string[] | undefined {
    const [name] = args;

    if (!isAlphanumeric(name)) throw new Error('please a valid name');

    return args;
  }

  async register({ playerDiscordId, name }: UserAttributes): Promise<void> {
    const checkUser = await User.findOne({
      name: { $regex: new RegExp(name, 'i') },
    });

    if (checkUser) throw new Error('Name already taken');

    await User.findOneAndUpdate(
      { playerDiscordId },
      {
        playerDiscordId,
        name,
      },
      {
        new: true,
        upsert: true,
      },
    );
  }
}
