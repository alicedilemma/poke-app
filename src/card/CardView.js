import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import { getPokemonById, getPokemonSpeciesById, getMoves } from '../api/pokeApi'

import Card from './Card'

const Buttons = styled.div`
  margin: auto;
  width:  50%;
  text-align: center;
  button {
    margin: 0 10px;
  }
`

const CardView = props => {
  const [pokemonId, setPokemonId] = useState(1)
  const [pokemon, setPokemon] = useState({})
  const [loading, setLoading] = useState(true)
  
  const getPokemon = useCallback(async pokemonId => {
    const pokemonRaw = await getPokemonById(pokemonId)
    const pokemonSpeciesRaw = await getPokemonSpeciesById(pokemonId)
    const { name, height, weight, sprites, types, moves } = pokemonRaw
    const { 
      evolves_from_species, 
      generation, 
      flavor_text_entries 
    } = pokemonSpeciesRaw
    
    const processTypes = () => (types.map(type => type.type.name))

    const processMoves = async () => {
      const movesToShow = 10 // show first 10 moves
      const moveUrls = moves.slice(0, movesToShow).map(move => move.move.url)
      const movesResult = await getMoves(moveUrls)
      
      const groupByPP = moves => {
        return moves.reduce((result, currentMove) => {
          result[currentMove.pp] = result[currentMove.pp] || []
          result[currentMove.pp].push(currentMove.name)
          return result
        }, {})
      }
      
      return groupByPP(movesResult)
    }

    const processFlavourText = () => {
      const englishFlavorText = flavor_text_entries.filter(
        entry => entry.language.name === 'en'
      )

      const randomValue = array => {
        const randomIndex = Math.floor(Math.random() * array.length)
        return array[randomIndex]
      }

      return randomValue(englishFlavorText).flavor_text
    }

    const pokemon = {
      name,
      evolvesFrom: evolves_from_species ? evolves_from_species.name : null,
      generation: generation.name,
      image: sprites.front_default,
      height,
      weight,
      types: processTypes(),
      moves: await processMoves(),
      flavourText: processFlavourText(),
    }

    setPokemon(pokemon)
    setLoading(false)
  }, [])
  
  useEffect(() => {
    getPokemon(pokemonId)
  }, [pokemonId, getPokemon])

  const handleChangePokemon = newId => {
    if (newId < 1) {
      newId = 151
    }
    if (newId > 151) {
      newId = 1
    }
    setLoading(true)
    setPokemonId(newId)
  }

  return (
    <>
      <Buttons>
        <button onClick={() => handleChangePokemon(pokemonId - 1)}>
        &lt;= prev pokemon
        </button>
        <button onClick={() => handleChangePokemon(pokemonId + 1)}>
        next pokemon =&gt;
        </button>
      </Buttons>
      <Card pokemon={pokemon} loading={loading} />
    </>
  )
}

export default CardView