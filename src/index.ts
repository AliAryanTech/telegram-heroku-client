import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import "dotenv/config";
import load from "./main";

const API_ID = +process.env.API_ID;
const API_HASH = process.env.API_HASH;
const STRING_SESSION = "";
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_LINK = process.env.CHANNEL_LINK;

const client = new TelegramClient(
  new StringSession(STRING_SESSION),
  API_ID,
  API_HASH,
  { connectionRetries: 5 }
);

(async () => {
  await client.start({
    botAuthToken: BOT_TOKEN,
  });

  load();
})();

export { CHANNEL_LINK };
export default client;
