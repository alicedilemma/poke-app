import React from 'react'

const Card = ({ pokemon, loading }) => {
  const { 
    name,
    evolvedFrom,
    generation,
    image,
    height,
    weight,
    types,
    moves,
    flavourText
  } = pokemon || {}

  const getTypes =() => {
    if (types) {
      return types.map(type => <span key={type}>{type},</span>)
    }
  }
  
  const getMoves = () => {
    if (moves) {
      return moves.map(move => <ul key={move.move.name}>{move.move.name},</ul>)
    }
  }
  
  return (
    loading ? (
      <p>loading...</p>
    ) :
      (<div>
        <header>
          <h1>
            {`${name} (evolves from ${evolvedFrom})`}
          </h1>
          <h1>
            {generation}
          </h1>
        </header>
        <img alt={`A forward facing ${name}`} src={image} />
        <p>height: {height}</p>
        <p>weight: {weight}</p>
        <p>
          {getTypes()}
        </p>
        <p> {flavourText}</p>
        <ul>
          {getMoves()}
        </ul>
      </div>)
  )
}

export default Card
