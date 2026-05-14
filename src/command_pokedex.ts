import { State } from "./state.js";

export async function commandPokedex(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length !== 0) {
    console.log("Usage: pokedex");
    return;
  }

  console.log("Your Pokedex:");

  const pokemonList = Object.values(state.caughtPokemon);

  for (const pokemon of pokemonList) {
    console.log(` - ${pokemon.name}`);
  }
}