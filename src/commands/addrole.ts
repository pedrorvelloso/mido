import { Message, Role } from 'discord.js';
import { ROLE_PREFIX } from '../utils/InitializeRoles';

import Command from '../interfaces/Command';

import CheckAvailabeRole from '../validators/CheckAvailabeRole';

export default class AddRole extends Command {
  constructor() {
    super({
      name: 'AddRole',
      aliases: ['addrole'],
      args: 1,
    });
  }

  async run(msg: Message, args: string[]): Promise<void> {
    if (!args) return;

    const [role] = args;
    const getRole = msg.guild?.roles.cache.find(r => r.name === role) as Role;

    msg.member?.roles.add(getRole.id);
  }

  validateArgs(args: string[]): string[] {
    const [role] = args;

    if (!CheckAvailabeRole(role)) throw new Error('✖ Role does not exist');

    return [`${ROLE_PREFIX}-${role}`];
  }
}
