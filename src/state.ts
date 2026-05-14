import { createInterface, type Interface } from "readline";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { getCommands } from "./commands.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
   rl: Interface;
   commands: Record<string, CLICommand>; 
   pokeAPI: PokeAPI;
   nextLocationsURL: string;
   prevLocationsURL: string;
   caughtPokemon: Record<string, Pokemon>;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        rl: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(1000 * 60 * 5),
        nextLocationsURL: "",
        prevLocationsURL: "",
        caughtPokemon: {},
    };
}