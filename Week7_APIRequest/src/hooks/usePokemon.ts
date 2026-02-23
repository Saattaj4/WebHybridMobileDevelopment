import { useState } from "react";
import { Pokemon } from "../types/pokemon";

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [evolutionChain, setEvolutionChain] = useState<{ name: string; sprite: string }[]>([]);

    const fetchPokemon = async (name: string) => {
        try {
            setLoading(true);
            setError("");
            setPokemon(null);

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );
            if (!response.ok) {
                throw new Error("Pokemon were not found");
            }
            const data: Pokemon = await response.json();
            setPokemon(data);
            const speciesResponse = await fetch(data.species.url);
            const speciesData = await speciesResponse.json();
            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            const evolutionData = await evolutionResponse.json();

            const evolutions: { name: string; sprite: string }[] = [];
            let current = evolutionData.chain;
            while (current) {
                const evoName = current.species.name;
                const evoResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoName}`);
                const evoData = await evoResponse.json();
                evolutions.push({
                    name: evoName,
                    sprite: evoData.sprites.front_default,
                });
                current = current.evolves_to[0];
            }
            setEvolutionChain(evolutions);

        } catch {
            setError("Couldn't fetch the Pokemon.");
        } finally {
            setLoading(false);
        }
    };
    const totalStats = pokemon ? pokemon.stats.reduce
        ((sum, stat) => sum + stat.base_stat, 0) : 0;

    return {
        pokemon,
        loading,
        error,
        fetchPokemon,
        totalStats,
        evolutionChain
    };
};