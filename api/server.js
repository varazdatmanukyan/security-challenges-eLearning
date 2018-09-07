import https from 'https';
import fs from 'fs';
import { App } from './app/app';

const options = {
  key: fs.readFileSync(`${__dirname}/../server.key`),
  cert: fs.readFileSync(`${__dirname}/../server.crt`)
};

https.createServer(options, App.callback()).listen(3000);

