import { Client } from 'discord.js';
import { registerCommands } from './commands';
import InitializeRoles from './utils/InitializeRoles';

export const SERVER_GUILD = 'Mido Async League';

export default class Mido {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  async start(): Promise<void> {
    const initializeRoles = new InitializeRoles(this.client);

    this.client.on('ready', async () => {
      console.log(`Logged in as ${this.client.user?.tag}!`);
      initializeRoles.initialize();
    });

    registerCommands(this.client);

    this.client.login();
  }
}
