import React, { useState, useEffect, useCallback } from 'react'

import { getPokemonById } from '../api/pokeApi'

import Card from './Card'

const CardView = props => {
  const [pokemon, setPokemon] = useState({})
  const [loading, setLoading] = useState(true)
  
  const getPokemon = useCallback(async () => {
    const pokemonRaw = await getPokemonById(3)
    const { name, height, weight, sprites, types, moves } = pokemonRaw
    // TODO { generation, evolvedFrom, flavorText }
    
    const processTypes = () => (types.map(type => type.type.name))

    const processMoves = () => {
      // show first 10 moves
      const numberOfMoves = 10
      return moves.slice(0, numberOfMoves)
      // TODO sort moves by powerpoints
    }
    
    const pokemon = {
      name,
      evolvedFrom: 'evolvedFrom',
      generation: 'generation',
      image: sprites.front_default,
      height,
      weight,
      types: processTypes(),
      moves: processMoves(),
      flavourText: 'Cool flavour text here',
    }
    console.log(pokemon)
    setPokemon(pokemon)
    setLoading(false)
  }, [])
  
  useEffect(() => {
    getPokemon()
  }, [getPokemon])

  return (
    <Card pokemon={pokemon} loading={loading} />
  )
}

export default CardView
