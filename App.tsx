import { StatusBar } from 'expo-status-bar';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PokemonItem from './src/components/PokemonItem';
import useFetchPokemons, {PokemonsResult} from './src/hooks/useFetchPokemons';

const renderItem = ({item}: {item: PokemonsResult})  => {
 return <PokemonItem {...item} />
}

const keyExtractor = (item: PokemonsResult)  => {
  return item.url
 }

export default function App() {
  const [data, {goToNextPage}] = useFetchPokemons()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList<PokemonsResult>
        data={data}
        style={{flex: 1}}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={goToNextPage}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
