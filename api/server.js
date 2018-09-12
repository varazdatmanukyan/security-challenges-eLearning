import { App } from './app/app';
import fs from "fs";

const options = {
    key: fs.readFileSync(`${__dirname}/../server.key`),
    cert: fs.readFileSync(`${__dirname}/../server.crt`)
};

App.listen(3000, options);

