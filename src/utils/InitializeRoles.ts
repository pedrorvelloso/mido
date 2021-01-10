import { Client, Guild } from 'discord.js';

import { SERVER_GUILD } from '../Mido';

interface IRole {
  name: string;
  color: string;
  reason: string;
}

export const roles: IRole[] = [
  {
    name: 'alert',
    color: '#fc0341',
    reason: 'alert new races',
  },
];

export const ROLE_PREFIX = 'mido';

export default class InitializeRoles {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async initialize(): Promise<void> {
    const guild = this.client.guilds.cache.find(g => g.name === SERVER_GUILD);

    if (guild) roles.map(role => this.createRole(role, guild));
  }

  async createRole(role: IRole, guild: Guild): Promise<void> {
    const roleNameWithPrefix = `${ROLE_PREFIX}-${role.name}`;

    const checkRole = guild.roles.cache.find(
      r => r.name === roleNameWithPrefix,
    );

    if (checkRole) {
      console.log(`Role ${roleNameWithPrefix} already exists`);

      return;
    }

    const createdRole = await guild.roles.create({
      data: {
        name: roleNameWithPrefix,
        color: role.color,
      },
      reason: role.reason,
    });

    console.log(`Role ${createdRole.name} created`);
  }
}
