import React from 'react'
import styled from 'styled-components'

const pokeBallUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'

const CardContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
  border-radius: 8px;
  width: 312px;
  min-height: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const Heading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Name = styled.span`
  text-transform: capitalize;
`

const Image = styled.img`
  height: 150px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
  border-radius: 8px;
`

const Stats = styled.div`
  display: flex;
  justify-content: center;
  p {
    margin 0 5px;
  }
`
const Types = styled.div`
  text-align: center;
  text-transform: capitalize;
`

const Loading = styled.div`
  text-align: center;
`

const Pokeball = styled.img`
  height: 200%;
  animation-name: floating;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  @keyframes floating {
    from { transform: translate(0,  0px); }
    65%  { transform: translate(0, 15px); }
    to   { transform: translate(0, -0px); }    
  }
`

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
      pp => <li key={pp}>{pp}: {makeList(moves[pp])}</li>
    )
  }

  return (
    <CardContainer>
      {loading ? (
        <Loading>
          <Pokeball 
            alt="Poke-ball" 
            src={pokeBallUrl}
          />
          <p>Loading...</p>
        </Loading>
      ) : (
        <>
          <Heading>
            <h1>
              <Name>{name}</Name>
              {evolvesFrom && `(evolves from ${evolvesFrom})`}
            </h1>
            <p>
              <Name>{generation}</Name>
            </p>
          </Heading>
          <Image alt={`A forward facing ${name}`} src={image} />
          <Stats>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
          </Stats>
          <Types>
            <p>
              {makeList(types)}
            </p>
          </Types>
          <p><i>{flavourText}</i></p>
          <ul>
            {getMoves()}
          </ul>
        </>
      )}
    </CardContainer>)
}

export default Card
