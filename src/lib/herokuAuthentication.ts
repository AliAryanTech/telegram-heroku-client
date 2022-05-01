import store from "./../store/index";
import Heroku from "heroku-client";
import { Button } from "telegram/tl/custom/button.js";
import client from "..";

async function herokuAuthentication(event) {
  const that = event.message;
  const buttonHerokuAuthorizations = client.buildReplyMarkup(
    Button.url(
      "Heroku Authorizations",
      "https://dashboard.heroku.com/account/applications/authorizations/new"
    )
  );
  const commandListener = /\/.*/g; // /start, /help, etc

  if (
    !that.message.match(commandListener) &&
    !store.isLogin[that.peerId.userId.value]
  ) {
    const heroku = new Heroku({ token: that.message });

    heroku
      .get("/account")
      .then((account) => {
        client.sendMessage(that.peerId.userId.value, {
          message: `Successfully logged in as ${account.email}`,
        });
        store.isLogin[that.peerId.userId.value] = true;
        store.currentUser[that.peerId.userId.value] = account;
      })
      .catch((err) =>
        client.sendMessage(that.peerId.userId.value, {
          message: `Please enter a valid credentials
        
Click here to create an API key`,
          buttons: buttonHerokuAuthorizations,
        })
      );
  }
}

export default herokuAuthentication;
