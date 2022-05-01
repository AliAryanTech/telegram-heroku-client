import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import "dotenv/config";

const API_ID = +process.env.API_ID;
const API_HASH = process.env.API_HASH;
const STRING_SESSION = "";
const BOT_TOKEN = process.env.BOT_TOKEN;

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
})();
