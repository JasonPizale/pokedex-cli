import { State } from "./state.js";

export async function commandExplore(
    state: State,
    ...args: string[]
): Promise<void> {
    if (args.length !== 1) {
        console.log("Usage: explore <area-name>");
        return;
    }

    const areaName = args[0];

    console.log(`Exploring ${areaName}...`);

    const location = await state.pokeAPI.fetchLocation(areaName);

    console.log("Found Pokemon:");

    for (const encounter of location.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}