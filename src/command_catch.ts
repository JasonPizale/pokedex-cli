import type { State } from "./state.js";

export async function commandCatch(
    state: State,
    ...args: string[]
): Promise<void> {
    if (args.length !== 1) {
        console.log("Usage: catch <pokemond-name>");
        return;
    }

    const pokemonName = args[0];

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

    const chance = Math.random() * pokemon.base_experience;

    if (chance < 40) {
        console.log(`${pokemon.name} was caught!`);

        state.caughtPokemon[pokemon.name] = pokemon;
    } else {
        console.log(`${pokemon.name} escaped!`);
    }
}
