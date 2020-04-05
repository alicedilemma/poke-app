import React from 'react'

const Card = ({ pokemon, loading }) => {
  const { 
    name,
    evolvesFrom,
    generation,
    image,
    height,
    weight,
    types,
    moves,
    flavourText
  } = pokemon || {}

  const makeList = arrayOfStrings => {
    return arrayOfStrings.join(', ')
  }
  
  const getMoves = () => {
    return Object.keys(moves).map(
      pp => <ul key={pp}>{pp}: {makeList(moves[pp])}</ul>
    )
  }
  
  return (
    loading ? (
      <p>loading...</p>
    ) : (
      <div>
        <header>
          <h1>
            {`${name} (evolves from ${evolvesFrom})`}
          </h1>
          <h1>
            {generation}
          </h1>
        </header>
        <img alt={`A forward facing ${name}`} src={image} />
        <p>height: {height}</p>
        <p>weight: {weight}</p>
        <p>
          {makeList(types)}
        </p>
        <p> {flavourText}</p>
        <ul>
          {getMoves()}
        </ul>
      </div>)
  )
}

export default Card
