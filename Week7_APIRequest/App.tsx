import { useState } from "react";
import { View, TextInput, Button, ActivityIndicator, Text, StyleSheet } from "react-native";
import { usePokemon } from "./src/hooks/usePokemon";
import { PokemonCard } from "./src/components/PokemonCard";

export default function App() {
  const [name, setName] = useState("");
  const { pokemon, loading, error, fetchPokemon, totalStats, evolutionChain } = usePokemon();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Pokemon name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      
      <Button title="Search" onPress={() => fetchPokemon(name)} />
      {loading && <ActivityIndicator size="large" />}
      {error ? <Text>{error}</Text> : null}
      {pokemon && (
        <PokemonCard
          pokemon={pokemon}
          totalStats={totalStats}
          evolutionChain={evolutionChain}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    alignItems: "center",
  },
  input: {
    borderWidth: 5,
    marginBottom: 10,
    padding: 8,
    width: "80%",
  }
})