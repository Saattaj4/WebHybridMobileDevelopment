import { useState } from "react";
import { Pokemon } from "../types/pokemon";

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [evolutionChain, setEvolutionChain] = useState<string[]>([]);

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
            const evolutionResponse = await fetch ( speciesData.evolution_chain.url);
            const evolutionData = await evolutionResponse.json();
            const evolutions: string[] = [];
            let current = evolutionData.chain;
            while (current) {
                evolutions.push(current.species.name);
                current = current.evolves_to[0];
            }
            setEvolutionChain(evolutions);

        } catch {
            setError("Couldn't fetch the Pokemon.");
        } finally {
            setLoading(false);
        }
        };
        const totalStats = pokemon ? pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0) : 0;

        return { pokemon, loading , error, fetchPokemon, totalStats, evolutionChain};
    };