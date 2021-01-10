import { Client, Message } from 'discord.js';
import Command from '../interfaces/Command';

import AddRole from './addrole';
import JoinGame from './join';
import Ping from './ping';
import Setseed from './setseed';

const PREFIX = 'm!';

const commands: Command[] = [
  new Ping(),
  new Setseed(),
  new AddRole(),
  new JoinGame(),
];

export function checkCommand(msg: string, aliases: string[]): boolean {
  return !!aliases.find(alias => msg.startsWith(PREFIX) && msg.includes(alias));
}

export function runCommand(msg: Message): void {
  commands.forEach(async c => {
    if (checkCommand(msg.content, c.aliases)) {
      const args = msg.content.split(' ');
      try {
        await c.run(msg, c.args >= 1 ? c.prepareArgs(args) : undefined);
      } catch (e) {
        console.log(e.message);
        msg.channel.stopTyping();
        msg.delete();
        msg.reply(e.message);
      }
    }
  });
}

export function registerCommands(client: Client): void {
  client.on('message', runCommand);
}