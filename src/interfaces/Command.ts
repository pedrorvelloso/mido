import { Message } from 'discord.js';

import validateArgsLength from '../validators/validateArgsLength';

interface CommandInterface {
  readonly name: string;
  readonly aliases: string[];
  readonly args: number;

  run(msg: Message, args?: string[]): Promise<void>;
  prepareArgs(args: string[]): string[] | undefined;
  validateArgs(args: string[]): void;
}

export default class Command implements CommandInterface {
  aliases: string[];

  name: string;

  args: number;

  constructor({
    name,
    aliases,
    args = 0,
  }: {
    name: string;
    aliases: string[];
    args?: number;
  }) {
    this.name = name;
    this.aliases = aliases;
    this.args = args;
  }

  async run(_message: Message, _args?: string[]): Promise<void> {
    //
  }

  prepareArgs(args: string[]): string[] | undefined {
    args.shift();

    if (this.args > 0) validateArgsLength(args, this.args);

    return args.length >= 1 ? this.validateArgs(args) : undefined;
  }

  validateArgs(args: string[]): string[] | undefined {
    return args;
  }
}
