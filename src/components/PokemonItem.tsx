import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { PokemonsResult } from '../hooks/useFetchPokemons'
import useFetchPokemonsDetails, { PokemonDetailsSprites } from '../hooks/useFetchPokemonDetails'

const getPokemonImageFromSprites = ({other}: PokemonDetailsSprites) => {
  const {front_default} = other?.home
  return front_default

}
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen')

export type PokemonItemProps = PokemonsResult

const PokemonItem = ({url}: PokemonItemProps) => {
const pokemonDetails = useFetchPokemonsDetails(url)
const {name = '', sprites} = pokemonDetails ?? {}
const pokemonImage = sprites && getPokemonImageFromSprites(sprites)

return (
  <View style={styles.container}>
    <Image source={{uri: pokemonImage}} style={styles.image}/>
    <Text>{name}</Text>
  </View>
)
}

export default memo(PokemonItem)

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 6,
  }
})