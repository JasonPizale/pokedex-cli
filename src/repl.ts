import { createInterface } from "readline";
import { getCommands } from "./commands.js";

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", async (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const commands = getCommands();
    const command = commands[commandName];

    if (!command) {
      console.log(`Unknown command`);
      rl.prompt();
      return;
    }

    try {
      command.callback(commands);
    } catch (err) {
      console.log(err);
    }

    rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}