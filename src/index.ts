import 'dotenv/config';

import './database';

import Mido from './Mido';

const client = new Mido();

client.start();
