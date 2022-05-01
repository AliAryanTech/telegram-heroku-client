import { Button } from "telegram/tl/custom/button.js";
import client, { CHANNEL_LINK } from "..";

async function start(event) {
  const that = event.message;
  const buttonSubscribeChannel = client.buildReplyMarkup(
    Button.url("Subscribe Channel", CHANNEL_LINK)
  );

  if (that.message === "/start") {
    await client.sendMessage(that.peerId.userId.value, {
      message: `I can help you create and manage Heroku apps 
        
Please send me your <strong><a href="https://dashboard.heroku.com/account/applications/authorizations/new">API KEY</a></strong>`,
      buttons: buttonSubscribeChannel,
      parseMode: "html",
    });
  }
}

export default start;
