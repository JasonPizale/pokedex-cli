import type { State } from "./state.js";

export function startREPL(state: State) {

  state.rl.prompt();

  state.rl.on("line", async (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];

    if (!command) {
      console.log(`Unknown command`);
      state.rl.prompt();
      return;
    }

    try {
      command.callback(state);
    } catch (err) {
      console.log(err);
    }

    state.rl.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}