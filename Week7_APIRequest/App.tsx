import { useState } from "react";
import { View, TextInput, Button, ActivityIndicator, Text } from "react-native";
import { usePokemon } from "./src/hooks/usePokemon";
import { PokemonCard } from "./src/components/PokemonCard";

export default function App() {
  const [name, setName] = useState("");
  const { pokemon, loading, error, fetchPokemon, totalStats } = usePokemon();

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <TextInput
        placeholder="Enter Pokemon name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        
      />

      <Button title="Search" onPress={() => fetchPokemon(name)} />

      {loading && <ActivityIndicator size="large" />}
      {error ? <Text>{error}</Text> : null}

      {pokemon && (
        <PokemonCard pokemon={pokemon} totalStats={totalStats} />
        
      )}
    </View>
  );
}