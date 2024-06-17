import dotenv from 'dotenv';
dotenv.config();

import * as database from './database';
import * as app from './app';
import * as crypto from './crypto';
import * as jwt from './jwt';
import * as messageBroker from './message-broker';
import * as admin from './admin';

export default {
    database,
    app,
    crypto,
    jwt,
    messageBroker,
    admin
}