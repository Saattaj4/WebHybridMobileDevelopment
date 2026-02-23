import { View, Text, Image } from 'react-native';
import { Pokemon } from '../types/pokemon';

interface Props {
    pokemon: Pokemon;
    totalStats: number;
}

export const PokemonCard = ({ pokemon, totalStats }: Props) => {
    return (
        <View style= {{marginTop: 20 }}>
            <Text style = {{ fontSize: 20, fontWeight: 'bold' }}>
                {pokemon.name.toUpperCase()}
                </Text>

        <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={{ width: 100, height: 100 }}
        />
        <Text> Total Stats: {totalStats} </Text>
        
        </View>
    );
}