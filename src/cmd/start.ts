import { NewMessage } from "telegram/events/index.js";
import store from "../store";
import { Button } from "telegram/tl/custom/button.js";
import client, { CHANNEL_LINK } from "..";
import herokuAuthentication from "../lib/herokuAuthentication";

async function start(event) {
  const that = event.message;
  const buttonSubscribeChannel = client.buildReplyMarkup(
    Button.url("Subscribe Channel", CHANNEL_LINK)
  );

  if (that.message === "/start") {
    if (store.isLogin[that.peerId.userId.value]) {
      await client.sendMessage(that.peerId.userId.value, {
        message: `Hi ${store.currentUser[that.peerId.userId.value].email}!`,
      });
    } else {
      await client.sendMessage(that.peerId.userId.value, {
        message: `I can help you create and manage Heroku apps 
          
Please send me your <a href="https://dashboard.heroku.com/account/applications/authorizations/new">API Key</a>`,
        buttons: buttonSubscribeChannel,
        parseMode: "html",
      });
      client.addEventHandler(herokuAuthentication, new NewMessage({}));
    }
  }
}

export default start;
