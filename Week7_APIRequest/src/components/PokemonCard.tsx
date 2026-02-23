import { View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Pokemon } from '../types/pokemon';

interface Props {
    pokemon: Pokemon;
    totalStats: number;
    evolutionChain: { name: string; sprite: string }[];
}

export const PokemonCard = ({ pokemon, totalStats, evolutionChain }: Props) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                {pokemon.name.toUpperCase()}
            </Text>

            <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={styles.mainSprite}
            />
            <Text> Total Stats: {totalStats} </Text>

            <Text style={styles.evoLabel}>Evolution Line:</Text>
            <View style={styles.evoRow}>
                {evolutionChain.map((evo) => (
                    <View key={evo.name} style={styles.evoItem}>
                        <Image
                            source={{ uri: evo.sprite }}
                            style={styles.evoSprite}
                        />
                        <Text>{evo.name}</Text>
                    </View>
                ))}
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },
    mainSprite: {
        width: 100,
        height: 100,
    },
    evoLabel: {
        marginTop: 10,
        textAlign: "center",
    },
    evoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        flexWrap: "wrap",
    },
    evoItem: {
        alignItems: 'center',
        marginRight: 10,
    },
    evoSprite: {
        width: 50,
        height: 50,
    },
});