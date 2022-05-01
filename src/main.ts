import { NewMessage } from "telegram/events/index.js";
import client from ".";
import start from "./cmd/start";

const commands = [start];

function load() {
  commands.forEach((cmd) => {
    client.addEventHandler(cmd, new NewMessage({}));
  });
}

export default load;
